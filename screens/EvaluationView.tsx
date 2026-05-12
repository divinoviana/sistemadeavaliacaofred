
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { subjectsInfo } from '../data';
import { Subject } from '../types';
import { ArrowLeft, BrainCircuit, CheckCircle2, Clock, Send, Loader2, Award, Info, Lock, AlertTriangle, Pencil, ShieldAlert } from 'lucide-react';
import { VisualActivityRenderer } from '../components/VisualActivityRenderer';

export const EvaluationView: React.FC = () => {
  const { examId } = useParams<{ examId: string }>();
  const navigate = useNavigate();
  const { student, isLoading: isAuthLoading } = useAuth();

  const [exam, setExam] = useState<any>(null);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [alreadyDone, setAlreadyDone] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);
  // Segurança das redações: contar saídas de aba/janela
  const [tabSwitches, setTabSwitches] = useState(0);
  const [pasteAttempts, setPasteAttempts] = useState(0);
  const isEssay = exam?.type === 'essay' || (exam?.questions?.[0]?.type === 'essay');

  useEffect(() => {
    if (!isAuthLoading && !student) {
      navigate('/login');
    } else if (examId && student) {
      checkAttemptAndFetchExam();
    }
  }, [examId, student, isAuthLoading]);

  // Segurança da redação: contar saídas da aba/janela enquanto a tela
  // estiver aberta e o aluno ainda não enviou. Só ativa quando é
  // redação (isEssay).
  useEffect(() => {
    if (!isEssay || isFinished) return;
    const onVis = () => {
      if (document.visibilityState === 'hidden') {
        setTabSwitches(n => n + 1);
      }
    };
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, [isEssay, isFinished]);

  const checkAttemptAndFetchExam = async () => {
    if (!examId || !student) return;
    setCheckingStatus(true);
    try {
      const { data: examData, error: examErr } = await supabase
        .from('bimonthly_exams')
        .select('*')
        .eq('id', examId)
        .maybeSingle();
      if (examErr) throw examErr;
      if (!examData) {
        alert("Avaliação não encontrada.");
        navigate('/');
        return;
      }
      setExam(examData);

      // Detecta tipo (redação vs simulado) e monta o título esperado da submissão
      const isEssayExam = examData.type === 'essay' || (examData.questions?.[0]?.type === 'essay');
      const expectedTitle = isEssayExam
        ? `Redação: ${(examData.title || 'Redação').trim()}`
        : (examData.title?.trim() || `Avaliação Bimestral: ${examData.bimester}º Bimestre`);

      // Checa por submissão prévia: tenta pelo lesson_id do exame (mais confiável);
      // se nada, fallback pelo título.
      let existing: any[] | null = null;
      const r1 = await supabase
        .from('submissions')
        .select('score')
        .eq('student_id', student.id)
        .eq('lesson_id', examId!)
        .limit(1);
      if (!r1.error && r1.data && r1.data.length > 0) {
        existing = r1.data;
      } else {
        const r2 = await supabase
          .from('submissions')
          .select('score')
          .eq('student_id', student.id)
          .eq('subject', examData.subject)
          .eq('lesson_title', expectedTitle)
          .limit(1);
        if (r2.error) throw r2.error;
        existing = r2.data;
      }

      if (existing && existing.length > 0) {
        setScore(existing[0].score ?? 0);
        setAlreadyDone(true);
        setIsFinished(true);
      }
    } catch (e: any) {
      console.error('Erro ao validar tentativa:', e);
    } finally {
      setCheckingStatus(false);
    }
  };

  const handleOptionSelect = (questionId: number, option: string) => {
    if (isFinished) return;
    setAnswers(prev => ({ ...prev, [questionId]: option }));
  };

  // Submissão específica de Redação (texto livre, sem correção automática)
  const handleSubmitEssay = async () => {
    const essayText = String(answers[1] || '').trim();
    if (essayText.length < 200) {
      alert('Sua redação está muito curta (mínimo de 200 caracteres). Desenvolva mais o texto.');
      return;
    }
    if (!confirm('Tem certeza que quer enviar? Você só tem UMA tentativa para esta redação.')) return;
    setIsSubmitting(true);
    try {
      const nowIso = new Date().toISOString();
      const title = exam.title || 'Redação';
      const wordCount = essayText.split(/\s+/).filter(Boolean).length;
      const charCount = essayText.length;

      const { error } = await supabase.from('submissions').insert({
        student_id: student.id,
        student_name: student.name.trim(),
        school_class: student.school_class.trim(),
        grade: student.grade,
        lesson_id: examId,
        lesson_title: `Redação: ${title}`,
        subject: exam.subject,
        score: 0, // Professor avalia depois
        content: [{
          question: title,
          answer: essayText,
          tab_switches: tabSwitches,
          paste_attempts: pasteAttempts,
          word_count: wordCount,
          char_count: charCount,
        }],
        ai_feedback: {
          generalComment: `Redação enviada. ${wordCount} palavras, ${charCount} caracteres. Aluno saiu da tela ${tabSwitches} ${tabSwitches === 1 ? 'vez' : 'vezes'} e tentou colar texto externo ${pasteAttempts} ${pasteAttempts === 1 ? 'vez' : 'vezes'}.`,
          corrections: [],
        },
        teacher_feedback: null,
        submitted_at: nowIso,
        submission_date: nowIso,
        status: 'pending',
      });
      if (error) throw error;
      setIsFinished(true);
    } catch (err: any) {
      alert('Falha ao enviar redação: ' + (err?.message || 'tente novamente.'));
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async () => {
    // Redação: caminho próprio (sem corrigir)
    if (isEssay) return handleSubmitEssay();

    // Conta quantas questões devem ter resposta (todas as do exam)
    const totalQuestions = exam.questions.length;
    const answeredCount = exam.questions.filter((q: any) => {
      const v = answers[q.id];
      return v !== undefined && v !== null && String(v).trim() !== '';
    }).length;

    if (answeredCount < totalQuestions) {
      alert(`Responda todas as ${totalQuestions} questões antes de finalizar. (${answeredCount}/${totalQuestions})`);
      return;
    }

    if (!confirm("Tem certeza que deseja enviar? Você só tem UMA tentativa para esta avaliação.")) return;

    setIsSubmitting(true);

    // 1) Corrige OBJETIVAS localmente (precisão 100%)
    const objectiveQs = exam.questions.filter((q: any) => q.type !== 'discursive' && q.options && q.correctOption);
    const discursiveQs = exam.questions.filter((q: any) => q.type === 'discursive' || !q.options || !q.correctOption);

    let objectiveCorrect = 0;
    const correctionDetails: any[] = [];

    objectiveQs.forEach((q: any) => {
      const studentLetter = String(answers[q.id] || '').toLowerCase();
      const correctLetter = String(q.correctOption || '').toLowerCase();
      const isCorrect = studentLetter === correctLetter;
      if (isCorrect) objectiveCorrect++;
      correctionDetails.push({
        questionId: q.id,
        type: 'objective',
        question: q.questionText,
        studentAnswer: `Opção ${studentLetter.toUpperCase()}: ${q.options?.[studentLetter] || ''}`,
        correctAnswer: `Opção ${correctLetter.toUpperCase()}: ${q.options?.[correctLetter] || ''}`,
        isCorrect,
        score: isCorrect ? 10 : 0,
        feedback: isCorrect ? 'Correto.' : `A alternativa correta era ${correctLetter.toUpperCase()}.`,
      });
    });

    // 2) Corrige DISCURSIVAS via IA (com fallback se IA cair)
    let aiGeneralComment: string | null = null;
    let discursiveTotalScore = 0;
    if (discursiveQs.length > 0) {
      try {
        const { evaluateActivities } = await import('../services/aiService');
        const aiInput = discursiveQs.map((q: any) => ({
          question: q.questionText,
          answer: String(answers[q.id] || ''),
          // sem correctAnswer → força a IA a avaliar densidade conceitual
        }));
        const aiRes = await evaluateActivities(
          `${exam.title || 'Simulado Bimestral'} (${exam.bimester}º Bimestre)`,
          (exam.topics || []).join(', '),
          aiInput
        );
        aiGeneralComment = aiRes.generalComment;
        aiRes.corrections.forEach((c, i) => {
          const q = discursiveQs[i];
          discursiveTotalScore += Number(c.score) || 0;
          correctionDetails.push({
            questionId: q?.id,
            type: 'discursive',
            question: c.question,
            studentAnswer: c.studentAnswer,
            isCorrect: c.isCorrect,
            score: c.score,
            feedback: c.feedback,
          });
        });
      } catch (e) {
        console.warn('IA falhou nas discursivas; aplicando fallback:', e);
        discursiveQs.forEach((q: any) => {
          const ans = String(answers[q.id] || '').trim();
          const score = ans.length >= 30 ? 6 : 0;
          discursiveTotalScore += score;
          correctionDetails.push({
            questionId: q.id,
            type: 'discursive',
            question: q.questionText,
            studentAnswer: ans || '(não respondida)',
            isCorrect: score >= 6,
            score,
            feedback: score >= 6
              ? 'Resposta registrada. Aguardando avaliação detalhada do professor.'
              : 'Resposta muito breve ou ausente. O professor irá revisar.',
          });
        });
      }
    }

    // 3) Calcula nota final 0–10 considerando objetivas + discursivas
    const objectiveScoreAvg = objectiveQs.length > 0 ? (objectiveCorrect / objectiveQs.length) * 10 : 0;
    const discursiveScoreAvg = discursiveQs.length > 0 ? (discursiveTotalScore / discursiveQs.length) : 0;

    let finalScore: number;
    if (objectiveQs.length > 0 && discursiveQs.length > 0) {
      // Peso proporcional ao número de questões de cada tipo
      const totalQ = objectiveQs.length + discursiveQs.length;
      finalScore = (objectiveScoreAvg * objectiveQs.length + discursiveScoreAvg * discursiveQs.length) / totalQ;
    } else if (objectiveQs.length > 0) {
      finalScore = objectiveScoreAvg;
    } else {
      finalScore = discursiveScoreAvg;
    }
    finalScore = Math.round(finalScore * 10) / 10; // 1 casa decimal
    setScore(finalScore);

    const generalComment = aiGeneralComment ||
      `Simulado finalizado. Objetivas: ${objectiveCorrect}/${objectiveQs.length} acertos. Discursivas: nota média ${discursiveScoreAvg.toFixed(1)}.`;

    try {
      const nowIso = new Date().toISOString();
      const examTitle = exam.title || `Avaliação Bimestral: ${exam.bimester}º Bimestre`;
      const { error } = await supabase.from('submissions').insert({
        student_id: student.id,
        student_name: student.name.trim(),
        school_class: student.school_class.trim(),
        grade: student.grade,
        lesson_id: examId,
        lesson_title: examTitle.trim(),
        subject: exam.subject,
        score: finalScore,
        content: correctionDetails.map(c => ({
          question: c.question,
          answer: c.studentAnswer,
          correctAnswer: c.correctAnswer,
        })),
        ai_feedback: { generalComment, corrections: correctionDetails },
        teacher_feedback: null,
        submitted_at: nowIso,
        submission_date: nowIso,
        status: 'completed',
      });
      if (error) throw error;

      setIsFinished(true);
    } catch (err: any) {
      console.error('Erro ao salvar avaliação:', err);
      alert('Falha ao salvar: ' + (err?.message || 'tente novamente.'));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (checkingStatus) return (
    <div className="h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 gap-4 transition-colors duration-300">
      <Loader2 className="animate-spin text-tocantins-blue dark:text-tocantins-yellow" size={40} />
      <p className="text-slate-400 dark:text-slate-500 font-bold uppercase text-[10px] tracking-widest">Validando sua tentativa...</p>
    </div>
  );

  if (!exam) return null;

  const subjectInfo = subjectsInfo[exam.subject as Subject];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans pb-32 transition-colors duration-300">
      <div className={`${subjectInfo.color} text-white py-12 px-4 shadow-lg border-b border-white/5`}>
        <div className="container mx-auto max-w-3xl">
           <button onClick={() => navigate('/')} className="flex items-center gap-2 text-white/80 hover:text-white mb-6 text-sm font-bold transition-all">
             <ArrowLeft size={16}/> Voltar ao Início
           </button>
           <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-white/20 rounded-[30px] flex items-center justify-center text-4xl shadow-inner border border-white/20">
                 {subjectInfo.icon}
              </div>
              <div>
                 <h1 className="text-3xl font-black uppercase tracking-tighter">Avaliação: {subjectInfo.name}</h1>
                 <p className="text-white/70 font-bold uppercase tracking-widest text-[10px]">{exam.bimester}º Bimestre • {student.grade}ª Série</p>
              </div>
           </div>
        </div>
      </div>

      <div className="container mx-auto max-w-3xl px-4 -mt-8">
        {!isFinished && isEssay ? (
          /* ============== REDAÇÃO ============== */
          <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
            {/* Aviso de regras de segurança */}
            <div className="bg-gradient-fire p-1 rounded-3xl shadow-glow-orange">
              <div className="bg-white dark:bg-slate-900 p-6 rounded-[20px]">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-gradient-fire rounded-2xl flex items-center justify-center text-white shadow-glow-orange shrink-0">
                    <ShieldAlert size={22}/>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-black text-slate-800 dark:text-white text-base tracking-tight">⚠️ Modo Redação · Atenção</h3>
                    <ul className="text-xs text-slate-600 dark:text-slate-400 font-medium mt-2 space-y-1 leading-relaxed">
                      <li>• <strong>Não é permitido colar texto</strong> de fora (a área bloqueia automaticamente).</li>
                      <li>• Cada vez que você sair desta janela / mudar de aba, fica registrado e o professor é avisado.</li>
                      <li>• Você tem <strong>uma única tentativa</strong>. Escreva com calma.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Card principal da redação */}
            <div className="bg-white dark:bg-slate-900 rounded-[40px] shadow-xl border border-slate-100 dark:border-slate-800 overflow-hidden">
              <div className="p-6 border-b dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20">
                <p className="text-[10px] font-black text-vibe-orange uppercase tracking-[0.3em] mb-1">✍️ Tema da Redação</p>
                <h2 className="text-2xl md:text-3xl font-black text-slate-800 dark:text-white tracking-tight leading-tight font-display">
                  {exam.title || exam.questions?.[0]?.questionText || 'Redação'}
                </h2>
                {exam.questions?.[0]?.instructions && (
                  <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/10 rounded-2xl border border-blue-100 dark:border-blue-900/30">
                    <p className="text-xs font-bold text-blue-900 dark:text-blue-200 leading-relaxed whitespace-pre-wrap">{exam.questions[0].instructions}</p>
                  </div>
                )}
              </div>

              <div className="p-6">
                {/* Métricas em tempo real */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3 px-2">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                      {String(answers[1] || '').length} caracteres · {String(answers[1] || '').split(/\s+/).filter(Boolean).length} palavras
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {tabSwitches > 0 && (
                      <span className="inline-flex items-center gap-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">
                        <AlertTriangle size={11}/> {tabSwitches} saída{tabSwitches > 1 ? 's' : ''} de tela
                      </span>
                    )}
                    {pasteAttempts > 0 && (
                      <span className="inline-flex items-center gap-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">
                        🚫 {pasteAttempts} tentativa{pasteAttempts > 1 ? 's' : ''} de colar
                      </span>
                    )}
                  </div>
                </div>

                {/* Textarea com bloqueio de paste e tracking */}
                <textarea
                  value={String(answers[1] || '')}
                  onChange={e => setAnswers(prev => ({ ...prev, 1: e.target.value }))}
                  onPaste={(e) => {
                    e.preventDefault();
                    setPasteAttempts(n => n + 1);
                    alert('🚫 Não é permitido colar texto na redação. Digite o seu próprio texto.');
                  }}
                  onDrop={(e) => { e.preventDefault(); }}
                  onContextMenu={(e) => e.preventDefault()}
                  placeholder="Escreva aqui sua redação… (mínimo 200 caracteres)"
                  rows={30}
                  spellCheck={true}
                  autoCorrect="off"
                  autoComplete="off"
                  className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl p-5 text-base text-slate-700 dark:text-slate-200 outline-none focus:border-vibe-orange focus:ring-4 focus:ring-orange-100 dark:focus:ring-orange-900/10 leading-loose font-serif"
                  style={{ minHeight: '650px' }}
                />
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full bg-gradient-fire text-white py-6 rounded-[32px] font-black uppercase tracking-[0.25em] text-sm shadow-glow-orange hover:scale-[1.02] transition-all active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? <Loader2 className="animate-spin"/> : <Send size={20}/>}
              ✍️ Enviar Redação ao Professor
            </button>
          </div>
        ) : !isFinished ? (
           <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
              <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-xl flex items-center justify-between border-2 border-indigo-100 dark:border-indigo-900 transition-colors duration-300">
                 <div className="flex items-center gap-3">
                    <Info className="text-indigo-500 dark:text-indigo-400" size={20}/>
                    <p className="text-xs font-bold text-slate-600 dark:text-slate-400">Atenção: Você só pode realizar esta prova uma única vez.</p>
                 </div>
                 <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800 px-4 py-2 rounded-2xl font-black text-slate-400 dark:text-slate-500 text-xs">
                    <Clock size={14}/> QUESTÕES: {Object.keys(answers).length}/{exam.questions.length}
                 </div>
              </div>

              {exam.visualContent && (
                 <div className="bg-white dark:bg-slate-900 rounded-[40px] shadow-xl border border-slate-100 dark:border-slate-800 p-8 mb-8 transition-colors duration-300">
                    <VisualActivityRenderer content={exam.visualContent} />
                 </div>
              )}

              {exam.questions && Array.isArray(exam.questions) && exam.questions.map((q: any, idx: number) => {
                const isDiscursive = q.type === 'discursive' || !q.options || !q.correctOption;
                return (
                 <div key={idx} className="bg-white dark:bg-slate-900 rounded-[40px] shadow-xl border border-slate-100 dark:border-slate-800 overflow-hidden transition-colors duration-300">
                    <div className="p-8 border-b dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20 flex items-center justify-between">
                       <span className="bg-slate-900 dark:bg-slate-950 text-white w-10 h-10 rounded-xl flex items-center justify-center font-black">
                          {idx + 1}
                       </span>
                       <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg ${isDiscursive ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400' : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'}`}>
                         {isDiscursive ? 'Discursiva' : 'Objetiva (A–E)'}
                       </span>
                    </div>
                    <div className="p-8 space-y-6">
                       {q.textFragment && q.textFragment.trim() && (
                         <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-3xl border-l-4 border-indigo-400 italic text-sm text-slate-600 dark:text-slate-400 leading-relaxed shadow-inner">
                            "{q.textFragment}"
                         </div>
                       )}
                       <p className="text-lg font-bold text-slate-800 dark:text-slate-100 leading-tight">{q.questionText}</p>

                       {!isDiscursive ? (
                         <div className="space-y-3">
                            {['a', 'b', 'c', 'd', 'e'].map(key => q.options[key as keyof typeof q.options] && (
                               <button
                                 key={key}
                                 onClick={() => handleOptionSelect(q.id, key)}
                                 className={`w-full text-left p-5 rounded-2xl border-2 transition-all flex items-start gap-4 ${answers[q.id] === key ? 'border-tocantins-blue dark:border-tocantins-yellow bg-blue-50 dark:bg-blue-900/20 shadow-md ring-2 ring-blue-100 dark:ring-blue-900/40' : 'border-slate-50 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 hover:border-slate-200 dark:hover:border-slate-600'}`}
                               >
                                  <span className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 font-black uppercase text-xs ${answers[q.id] === key ? 'bg-tocantins-blue dark:bg-tocantins-yellow text-white dark:text-slate-950' : 'bg-white dark:bg-slate-900 text-slate-400 dark:text-slate-500 border dark:border-slate-700'}`}>
                                     {key}
                                  </span>
                                  <span className={`text-sm leading-relaxed ${answers[q.id] === key ? 'text-blue-900 dark:text-blue-100 font-bold' : 'text-slate-600 dark:text-slate-400 font-medium'}`}>
                                     {q.options[key as keyof typeof q.options] as string}
                                  </span>
                               </button>
                            ))}
                         </div>
                       ) : (
                         <div>
                           <textarea
                             value={String(answers[q.id] || '')}
                             onChange={e => setAnswers(prev => ({ ...prev, [q.id]: e.target.value }))}
                             placeholder="Digite sua resposta argumentativa aqui (mínimo 30 caracteres)..."
                             rows={6}
                             className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl p-5 text-sm text-slate-700 dark:text-slate-200 outline-none focus:border-tocantins-blue dark:focus:border-tocantins-yellow focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/10 leading-relaxed"
                           />
                           <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-2 ml-2">
                             {String(answers[q.id] || '').length} caracteres • Avaliada por IA + revisão do professor
                           </p>
                         </div>
                       )}
                    </div>
                 </div>
               );
              })}

              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full bg-gradient-cosmic text-white py-6 rounded-[32px] font-black uppercase tracking-[0.25em] text-sm shadow-glow-purple hover:shadow-glow-pink hover:scale-[1.02] transition-all active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50 cursor-pointer"
              >
                 {isSubmitting ? <Loader2 className="animate-spin"/> : <Send size={20}/>}
                 🚀 Finalizar e Bloquear Tentativa
              </button>
           </div>
        ) : (
           <div className={`relative overflow-hidden ${alreadyDone ? 'bg-gradient-aurora' : 'bg-gradient-fire'} p-1 rounded-[44px] ${alreadyDone ? 'shadow-glow-cyan' : 'shadow-glow-orange'} animate-in zoom-in duration-500`}>
            {/* confete-style blobs decorativos */}
            {!alreadyDone && (
              <>
                <div className="absolute top-10 left-10 w-32 h-32 bg-vibe-lime/40 rounded-full blur-2xl animate-blob"></div>
                <div className="absolute top-1/3 right-10 w-32 h-32 bg-vibe-pink/40 rounded-full blur-2xl animate-blob" style={{ animationDelay: '2s' }}></div>
                <div className="absolute bottom-10 left-1/3 w-32 h-32 bg-vibe-cyan/40 rounded-full blur-2xl animate-blob" style={{ animationDelay: '4s' }}></div>
              </>
            )}
            <div className="relative bg-white dark:bg-slate-900 rounded-[40px] p-12 text-center">
              <div className={`w-28 h-28 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl animate-float ${alreadyDone ? 'bg-gradient-aurora text-white shadow-glow-cyan' : isEssay ? 'bg-gradient-fire text-white shadow-glow-orange' : 'bg-gradient-fire text-white shadow-glow-orange'}`}>
                 {alreadyDone ? <Lock size={48}/> : isEssay ? <Pencil size={48} strokeWidth={2.5}/> : <CheckCircle2 size={56} strokeWidth={2.5}/>}
              </div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-3 font-display">
                <span className={alreadyDone ? 'text-gradient-aurora' : 'text-gradient-sunset'}>
                  {alreadyDone
                    ? (isEssay ? '🔒 Redação já Enviada' : '🔒 Prova já Realizada')
                    : (isEssay ? '✍️ Redação Enviada!' : '🎉 Mandou bem!')}
                </span>
              </h2>
              <p className="text-slate-500 dark:text-slate-400 font-bold text-sm tracking-wide mb-2 max-w-md mx-auto">
                {alreadyDone
                  ? 'Você já usou sua única chance.'
                  : isEssay
                    ? 'Sua redação foi enviada. O professor vai avaliar em breve.'
                    : 'Sua resposta foi enviada e a IA já corrigiu!'}
              </p>
              {!alreadyDone && !isEssay && score > 0 && (
                <div className="inline-flex items-center gap-3 bg-gradient-fire text-white px-8 py-4 rounded-full shadow-glow-orange mt-4 mb-8 animate-pulse-glow">
                  <Award size={24}/>
                  <span className="text-3xl font-black tracking-tighter">{score.toFixed(1)}</span>
                  <span className="text-[10px] font-black uppercase tracking-widest opacity-90">/ 10</span>
                </div>
              )}
              {!alreadyDone && isEssay && tabSwitches > 0 && (
                <div className="inline-flex items-center gap-2 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 px-5 py-2.5 rounded-full mt-4 mb-2 text-xs font-black uppercase tracking-widest">
                  <AlertTriangle size={14}/> Você saiu da tela {tabSwitches} {tabSwitches === 1 ? 'vez' : 'vezes'}
                </div>
              )}
              {alreadyDone && (
                <p className="text-slate-400 dark:text-slate-500 font-black uppercase text-[10px] tracking-[0.3em] mb-8">{isEssay ? 'Aguardando avaliação do professor' : 'Sua nota já está no histórico'}</p>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-md mx-auto">
                 <button onClick={() => navigate('/')} className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 py-4 rounded-2xl font-black uppercase text-[10px] tracking-[0.25em] hover:scale-105 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">🏠 Início</button>
                 <Link to="/my-activities" className="bg-gradient-vibe text-white py-4 rounded-2xl font-black uppercase text-[10px] tracking-[0.25em] shadow-glow-purple hover:scale-105 hover:shadow-glow-pink transition-all">📚 Ver Histórico</Link>
              </div>
            </div>
           </div>
        )}
      </div>
    </div>
  );
};
