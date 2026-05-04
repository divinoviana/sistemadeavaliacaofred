
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { subjectsInfo } from '../data';
import { TEACHER_INFO } from '../data_admin';
import { BookOpen, GraduationCap, ChevronRight, BrainCircuit, BellRing, Loader2, Clock } from 'lucide-react';
import { Subject } from '../types';
import { curriculumData } from '../data';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { student, isLoading } = useAuth();
  const [exams, setExams] = useState<any[]>([]);
  const [finishedExamTitles, setFinishedExamTitles] = useState<string[]>([]);
  const [publishedCountBySubject, setPublishedCountBySubject] = useState<Record<string, number>>({});

  useEffect(() => {
    if (!isLoading && !student) {
      navigate('/login');
    } else if (student) {
      fetchExamsAndHistory();
    }
  }, [student, isLoading, navigate]);

  const fetchExamsAndHistory = async () => {
    if (!student) return;

    try {
      // bimonthly_exams.grade pode estar guardado como text ou number; tentamos ambos
      const gradeStr = String(student.grade);
      const { data: examsData, error: examsErr } = await supabase
        .from('bimonthly_exams')
        .select('*')
        .eq('grade', gradeStr)
        .order('created_at', { ascending: false });
      if (examsErr) throw examsErr;

      const examData = (examsData || []).filter((exam: any) =>
        !exam.school_class || exam.school_class === String(student.school_class).trim()
      );

      const { data: subsData, error: subsErr } = await supabase
        .from('submissions')
        .select('lesson_title')
        .eq('student_id', student.id);
      if (subsErr) throw subsErr;

      const subData = (subsData || [])
        .map((s: any) => (s.lesson_title || '').trim())
        .filter((title: string) => title.startsWith('Avaliação Bimestral'));

      setExams(examData);
      setFinishedExamTitles(subData);

      // Conta atividades publicadas por matéria, restritas à série do aluno
      const myGradeNum = Number(student.grade);
      const lessonIdsOfMyGrade = new Set<string>();
      const lessonSubjectMap: Record<string, string> = {};
      curriculumData.forEach((g) => {
        if (g.id !== myGradeNum) return;
        g.bimesters.forEach((b) => {
          b.lessons.forEach((l) => {
            lessonIdsOfMyGrade.add(l.id);
            lessonSubjectMap[l.id] = l.subject;
          });
        });
      });

      const [actsRes, qsRes] = await Promise.all([
        supabase.from('activities').select('lesson_id'),
        supabase.from('questions').select('lesson_id'),
      ]);

      const lessonIdsWithQuestions = new Set<string>();
      (qsRes.data || []).forEach((row: any) => {
        if (row.lesson_id) lessonIdsWithQuestions.add(row.lesson_id);
      });

      const counts: Record<string, number> = {};
      (actsRes.data || []).forEach((row: any) => {
        const lid = row.lesson_id;
        if (!lid || !lessonIdsOfMyGrade.has(lid) || !lessonIdsWithQuestions.has(lid)) return;
        const subj = lessonSubjectMap[lid];
        if (!subj) return;
        counts[subj] = (counts[subj] || 0) + 1;
      });
      setPublishedCountBySubject(counts);
    } catch (e: any) {
      // Log detalhado: imprime mensagem, código e detalhes do erro Supabase
      console.error('Erro ao buscar provas e histórico:',
        e?.message || e, e?.code ? `(code: ${e.code})` : '',
        e?.details ? `details: ${e.details}` : '',
        e?.hint ? `hint: ${e.hint}` : ''
      );
    }
  };

  if (isLoading) return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin"/></div>;
  if (!student) return null;

  // Filtra apenas provas que ele AINDA NÃO fez
  const pendingExams = exams.filter(e => {
    const title = `Avaliação Bimestral: ${e.bimester}º Bimestre`;
    return !finishedExamTitles.includes(title.trim());
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 animate-in fade-in duration-500 pb-20 transition-colors duration-300 relative overflow-hidden">
      {/* Mesh gradient sutil de fundo */}
      <div className="absolute inset-0 bg-mesh-bg opacity-60 dark:opacity-20 pointer-events-none"></div>

      <div className="relative bg-gradient-cosmic border-b border-white/10 text-white py-20 px-4 overflow-hidden">
        {/* Blobs decorativos */}
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-vibe-cyan/30 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute -bottom-20 left-1/4 w-72 h-72 bg-vibe-pink/30 rounded-full blur-3xl animate-blob" style={{ animationDelay: '3s' }}></div>
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <p className="text-[11px] font-black uppercase tracking-[0.3em] text-white/70 mb-3">✨ Bem-vindo de volta</p>
          <h2 className="text-5xl md:text-6xl font-black mb-4 font-display tracking-tighter">Olá, <span className="text-vibe-lime drop-shadow-[0_0_30px_rgba(163,230,53,0.6)]">{student.name.split(' ')[0]}</span> 👋</h2>
          <p className="text-white/80 text-lg font-medium">Suas atividades da <span className="text-vibe-lime font-black">{student.grade}ª Série</span></p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl -mt-10 space-y-12 relative z-10">
        {pendingExams.length > 0 && (
           <div className="relative overflow-hidden bg-gradient-fire p-1 rounded-[40px] shadow-glow-orange animate-in zoom-in duration-500">
            <div className="bg-white dark:bg-slate-900 rounded-[36px] p-8">
              <div className="flex items-center gap-4 mb-6">
                 <div className="w-14 h-14 bg-gradient-fire rounded-2xl flex items-center justify-center text-white shadow-glow-orange animate-pulse-glow">
                    <BrainCircuit size={26}/>
                 </div>
                 <div>
                    <h3 className="text-2xl font-black tracking-tighter font-display">
                      <span className="text-gradient-sunset">🔥 Avaliações Pendentes</span>
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-[0.25em] mt-1">Simulados bimestrais te esperando</p>
                 </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {pendingExams.map(exam => (
                    <Link 
                      key={exam.id} 
                      to={`/evaluation/${exam.id}`}
                      className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-amber-100 dark:border-amber-900 hover:border-amber-400 dark:hover:border-amber-600 hover:shadow-lg transition-all group flex items-center justify-between"
                    >
                       <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 ${subjectsInfo[exam.subject as Subject].color} rounded-xl flex items-center justify-center text-white text-xl`}>
                             {subjectsInfo[exam.subject as Subject].icon}
                          </div>
                          <div>
                             <h4 className="font-bold text-slate-800 dark:text-slate-100 text-sm">Simulado {subjectsInfo[exam.subject as Subject].name}</h4>
                             <p className="text-[10px] font-black text-slate-400 uppercase">{exam.bimester}º Bimestre • {exam.school_class || 'Público Geral'}</p>
                          </div>
                       </div>
                       <ChevronRight className="text-amber-200 dark:text-amber-800 group-hover:text-vibe-pink group-hover:translate-x-1 transition-all" />
                    </Link>
                 ))}
              </div>
            </div>
           </div>
        )}

        {Object.values(publishedCountBySubject).reduce((a: number, b: number) => a + b, 0) === 0 && (
          <div className="relative overflow-hidden bg-gradient-aurora p-1 rounded-[40px] shadow-glow-cyan">
            <div className="bg-white dark:bg-slate-900 rounded-[36px] p-12 text-center">
              <div className="w-20 h-20 bg-gradient-aurora rounded-full flex items-center justify-center mx-auto mb-5 shadow-glow-cyan animate-float">
                <Clock className="text-white" size={36} />
              </div>
              <h3 className="text-2xl font-black tracking-tighter font-display mb-2">
                <span className="text-gradient-aurora">🌟 Em breve, em breve…</span>
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-xs font-bold tracking-wide">
                Seu professor ainda não publicou nada. Quando publicar, vai aparecer aqui na hora.
              </p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {(Object.keys(subjectsInfo) as Subject[]).map((key) => {
            const info = subjectsInfo[key];
            const count = publishedCountBySubject[key] || 0;
            const hasActivities = count > 0;
            return (
              <Link
                key={key}
                to={`/grade/${student.grade}?subject=${key}`}
                className={`relative overflow-hidden rounded-[32px] p-1 transition-all group ${
                  hasActivities
                    ? `${info.gradient || info.color} ${info.glow || 'shadow-xl'} hover:-translate-y-2 hover:scale-[1.02]`
                    : 'bg-slate-200/60 dark:bg-slate-800/60 opacity-70 hover:opacity-100'
                }`}
              >
                <div className="bg-white dark:bg-slate-900 rounded-[28px] p-7 h-full flex flex-col">
                  <div className={`w-16 h-16 ${hasActivities ? (info.gradient || info.color) : 'bg-slate-200 dark:bg-slate-800'} rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-md ${!hasActivities && 'grayscale'} group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300`}>
                    <span className="drop-shadow">{info.icon}</span>
                  </div>
                  <h3 className="text-xl font-black text-slate-800 dark:text-slate-100 mb-2 font-display tracking-tight">{info.name}</h3>
                  {hasActivities ? (
                    <div className="flex items-center justify-between mt-auto pt-4">
                      <span className="text-[10px] font-black uppercase tracking-widest bg-gradient-to-r from-vibe-pink to-vibe-purple bg-clip-text text-transparent">
                        {count} {count === 1 ? 'atividade' : 'atividades'} 🔥
                      </span>
                      <ChevronRight size={18} className="text-slate-400 group-hover:text-vibe-pink group-hover:translate-x-1 transition-all" />
                    </div>
                  ) : (
                    <div className="flex items-center text-slate-400 dark:text-slate-500 font-bold text-[10px] uppercase tracking-widest mt-auto pt-4">
                      Aguardando · em breve
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};
