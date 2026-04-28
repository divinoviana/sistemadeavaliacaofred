
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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 animate-in fade-in duration-500 pb-20 transition-colors duration-300">
      <div className="bg-slate-900 border-b border-white/5 text-white py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-serif font-bold mb-4">Olá, {student.name.split(' ')[0]}!</h2>
          <p className="text-slate-400">Suas atividades da <span className="text-tocantins-yellow font-bold">{student.grade}ª Série</span>.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl -mt-10 space-y-12">
        {pendingExams.length > 0 && (
           <div className="bg-amber-50 dark:bg-amber-950/20 border-2 border-amber-200 dark:border-amber-800 rounded-[40px] p-8 shadow-xl animate-in bounce-in duration-700">
              <div className="flex items-center gap-4 mb-6">
                 <div className="w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center text-white shadow-lg">
                    <BrainCircuit size={24}/>
                 </div>
                 <div>
                    <h3 className="text-xl font-black text-amber-900 dark:text-amber-100 uppercase tracking-tighter">Avaliações Pendentes</h3>
                    <p className="text-amber-700 dark:text-amber-400 text-xs font-bold uppercase tracking-widest">Você possui simulados bimestrais disponíveis</p>
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
                       <ChevronRight className="text-amber-200 dark:text-amber-800 group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors" />
                    </Link>
                 ))}
              </div>
           </div>
        )}

        {Object.values(publishedCountBySubject).reduce((a: number, b: number) => a + b, 0) === 0 && (
          <div className="bg-white dark:bg-slate-900 rounded-[40px] border-2 border-dashed border-slate-200 dark:border-slate-800 p-10 text-center shadow-sm">
            <Clock className="mx-auto text-slate-300 dark:text-slate-700 mb-4" size={40} />
            <h3 className="font-black text-slate-700 dark:text-slate-200 uppercase tracking-tight mb-1">Nenhuma atividade lançada ainda</h3>
            <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
              Aguarde seu professor publicar atividades. Você será avisado aqui.
            </p>
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
                className={`bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-8 border transition-all group ${
                  hasActivities
                    ? 'border-slate-200 dark:border-slate-800 hover:-translate-y-2'
                    : 'border-slate-100 dark:border-slate-800 opacity-60 hover:opacity-90'
                }`}
              >
                <div className={`w-16 h-16 ${info.color} rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-lg ${!hasActivities && 'grayscale'}`}>{info.icon}</div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2 group-hover:text-tocantins-blue dark:group-hover:text-tocantins-yellow transition-colors">{info.name}</h3>
                {hasActivities ? (
                  <div className="flex items-center text-tocantins-blue dark:text-tocantins-yellow font-bold text-xs uppercase tracking-widest mt-4">
                    {count} {count === 1 ? 'atividade disponível' : 'atividades disponíveis'} <ChevronRight size={14} className="ml-1" />
                  </div>
                ) : (
                  <div className="flex items-center text-slate-400 dark:text-slate-500 font-bold text-[10px] uppercase tracking-widest mt-4">
                    Aguardando lançamento
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};
