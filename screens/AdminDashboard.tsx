
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { supabase, handleSupabaseError, OperationType } from '../lib/supabase';
import { subjectsInfo, curriculumData } from '../data';
import { STUDENTS_SEED_DATA } from '../src/students_to_seed';
import { Subject } from '../types';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { exportToPDF } from '../lib/pdfUtils';
import { 
  Users, BookOpen, MessageSquare, Loader2, X, Save, 
  Home, ShieldCheck, Trash2, Search, Award,
  Clock, Send, BrainCircuit, Sparkles, FileText, CheckCircle2,
  Filter, Download, GraduationCap, ChevronRight, ClipboardEdit, 
  BarChart3, Printer, Wand2, Library, ListChecks, Database,
  Sun, Moon, Presentation, ClipboardList, LogOut, Pencil, Eye, UserCircle, RotateCw
} from 'lucide-react';

// =====================================================================
// Cache global de fotos + carregamento batched
// =====================================================================
// Cada photo_url é base64 de até 1.5 MB. Carregar 376 alunos
// simultaneamente entupe a fila de conexões do navegador (~6 por host)
// e bloqueia outras requests (incluindo o histórico de anotações).
//
// Solução em 3 camadas:
//   1) IntersectionObserver — só busca fotos de cards visíveis na viewport
//   2) Batch fetch — agrupa N pedidos em 1 query .in('id', [...])
//   3) Cache global em Map — uma foto carregada nunca é re-buscada
// =====================================================================
const photoCache: Map<string, string | null> = new Map();
const photoQueue: Set<string> = new Set();
const photoSubscribers: Map<string, ((url: string | null) => void)[]> = new Map();
let photoFlushTimer: any = null;

function flushPhotoQueue() {
  const ids = Array.from(photoQueue);
  photoQueue.clear();
  photoFlushTimer = null;
  if (ids.length === 0) return;

  // Lotes de 30 IDs (URL fica curta o suficiente; payload manejável)
  const chunkSize = 30;
  for (let i = 0; i < ids.length; i += chunkSize) {
    const chunk = ids.slice(i, i + chunkSize);
    supabase
      .from('students')
      .select('id,photo_url')
      .in('id', chunk)
      .then(({ data }) => {
        const found = new Set<string>();
        (data || []).forEach((row: any) => {
          found.add(row.id);
          photoCache.set(row.id, row.photo_url || null);
          const subs = photoSubscribers.get(row.id) || [];
          subs.forEach(cb => cb(row.photo_url || null));
          photoSubscribers.delete(row.id);
        });
        // IDs do batch que não voltaram → marca como sem foto
        chunk.forEach(id => {
          if (!found.has(id)) {
            photoCache.set(id, null);
            const subs = photoSubscribers.get(id) || [];
            subs.forEach(cb => cb(null));
            photoSubscribers.delete(id);
          }
        });
      });
  }
}

function requestPhoto(studentId: string, callback: (url: string | null) => void): () => void {
  let cancelled = false;
  if (photoCache.has(studentId)) {
    callback(photoCache.get(studentId) ?? null);
    return () => { cancelled = true; };
  }
  const wrapped = (url: string | null) => { if (!cancelled) callback(url); };
  if (!photoSubscribers.has(studentId)) photoSubscribers.set(studentId, []);
  photoSubscribers.get(studentId)!.push(wrapped);
  photoQueue.add(studentId);
  if (photoFlushTimer) clearTimeout(photoFlushTimer);
  photoFlushTimer = setTimeout(flushPhotoQueue, 250);
  return () => { cancelled = true; };
}

// Avatar do aluno: lazy load via IntersectionObserver + batch fetch
const StudentAvatar: React.FC<{ studentId?: string; studentName: string; photoUrl?: string | null }> = ({ studentId, studentName, photoUrl }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [photo, setPhoto] = useState<string | null>(photoUrl ?? null);
  const [loading, setLoading] = useState(!photoUrl && !!studentId);

  useEffect(() => {
    if (photoUrl) { setPhoto(photoUrl); setLoading(false); return; }
    if (!studentId) { setLoading(false); return; }
    if (photoCache.has(studentId)) {
      setPhoto(photoCache.get(studentId) ?? null);
      setLoading(false);
      return;
    }
    if (!ref.current) return;
    let cancelUnmount: (() => void) | null = null;
    const obs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        obs.disconnect();
        cancelUnmount = requestPhoto(studentId, (url) => {
          setPhoto(url);
          setLoading(false);
        });
      }
    }, { rootMargin: '300px' });
    obs.observe(ref.current);
    return () => {
      obs.disconnect();
      if (cancelUnmount) cancelUnmount();
    };
  }, [studentId, photoUrl]);

  return (
    <div ref={ref} className="w-full h-full">
      {loading ? (
        <div className="w-full h-full bg-slate-100 dark:bg-slate-800 animate-pulse" />
      ) : photo ? (
        <img src={photo} alt={studentName} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full bg-tocantins-blue/10 dark:bg-tocantins-yellow/10 flex items-center justify-center text-tocantins-blue dark:text-tocantins-yellow font-black text-xl">
          {studentName ? studentName.charAt(0) : '?'}
        </div>
      )}
    </div>
  );
};

// Componente principal do Painel Administrativo
export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { student, teacherSubject, logoutTeacher, isLoading: isAuthLoading } = useAuth();
  const isSuper = student?.email === 'admin@admin.com' || student?.email === 'divinoviana@gmail.com';

  // Estados principais
  const [activeTab, setActiveTab] = useState<'question_bank' | 'submissions' | 'students' | 'messages' | 'lessons_list' | 'exam_generator' | 'essays' | 'reports' | 'evaluations'>('lessons_list');
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterClass, setFilterClass] = useState('all');
  const [filterGrade, setFilterGrade] = useState('all');
  const [filterSubject, setFilterSubject] = useState<string>(teacherSubject || 'all');
  
  // Dados do Banco
  const [questionBank, setQuestionBank] = useState<any[]>([]);
  const [activityBank, setActivityBank] = useState<any[]>([]);
  const [lessonOverrides, setLessonOverrides] = useState<Record<string, any>>({});
  const [students, setStudents] = useState<any[]>([]);
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [savedActivities, setSavedActivities] = useState<string[]>([]);
  
  // Chat e Mensagens
  const [chatSessions, setChatSessions] = useState<any[]>([]);
  const [selectedChatStudentId, setSelectedChatStudentId] = useState<string | null>(null);
  const [selectedChatMessages, setSelectedChatMessages] = useState<any[]>([]);
  const [teacherReplyText, setTeacherReplyText] = useState('');
  const [isSendingReply, setIsSendingReply] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // Estados de Editores e Modais
  const [isLessonEditorOpen, setIsLessonEditorOpen] = useState(false);
  const [isActivityEditorOpen, setIsActivityEditorOpen] = useState(false);
  const [selectedLessonForEdit, setSelectedLessonForEdit] = useState<any | null>(null);
  const [selectedStudentEval, setSelectedStudentEval] = useState<any | null>(null);
  const [lessonTitleDraft, setLessonTitleDraft] = useState('');
  const [lessonTheoryDraft, setLessonTheoryDraft] = useState('');
  const [isSavingLesson, setIsSavingLesson] = useState(false);
  
  // Editor de Atividades (Questões)
  const [activityQuestionsDraft, setActivityQuestionsDraft] = useState<any[]>([]);
  const [isSavingActivity, setIsSavingActivity] = useState(false);
  const [newQuestion, setNewQuestion] = useState<any>({
    type: 'objective',
    question_text: '',
    options: { a: '', b: '', c: '', d: '', e: '' },
    correct_option: 'a'
  });

  // Simulados e Relatórios
  const [examGrade, setExamGrade] = useState('1');
  const [examBimester, setExamBimester] = useState('1');
  const [examClass, setExamClass] = useState('all');
  const [examTopics, setExamTopics] = useState('');
  const [examTitle, setExamTitle] = useState('');
  const [examQuestionsDraft, setExamQuestionsDraft] = useState<any[]>([]);
  const [examNewQuestion, setExamNewQuestion] = useState<any>({
    type: 'objective',
    textFragment: '',
    questionText: '',
    options: { a: '', b: '', c: '', d: '', e: '' },
    correctOption: 'a',
    difficulty: 'Médio',
    explanation: '',
  });
  const [isGeneratingExam, setIsGeneratingExam] = useState(false);
  const [isPublishingExam, setIsPublishingExam] = useState(false);
  const [publishedExams, setPublishedExams] = useState<any[]>([]);

  // ── Banco de Temas ─────────────────────────────
  const [bankSelectedSubject, setBankSelectedSubject] = useState<string | null>(null);
  const [bankSelectedTopic, setBankSelectedTopic] = useState<string | null>(null);
  const [reuseModalQuestion, setReuseModalQuestion] = useState<any | null>(null);
  const [reuseTargetLessonId, setReuseTargetLessonId] = useState<string>('');
  const [isReusing, setIsReusing] = useState(false);

  // ── Redação ────────────────────────────────────
  const [essayTitle, setEssayTitle] = useState('');
  const [essayGrade, setEssayGrade] = useState('1');
  const [essayBimester, setEssayBimester] = useState('1');
  const [essayClass, setEssayClass] = useState('all');
  const [essayInstructions, setEssayInstructions] = useState('');
  const [isPublishingEssay, setIsPublishingEssay] = useState(false);
  const [publishedEssays, setPublishedEssays] = useState<any[]>([]);
  
  const [reportTarget, setReportTarget] = useState<'student' | 'class'>('student');
  const [selectedReportStudent, setSelectedReportStudent] = useState('');
  const [aiReportResult, setAiReportResult] = useState<string | null>(null);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);

  // Modal de Visualização de Submissão
  const [viewingSubmission, setViewingSubmission] = useState<any | null>(null);
  const [manualFeedback, setManualFeedback] = useState('');
  const [isSavingFeedback, setIsSavingFeedback] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any | null>(null);

  const [isSeedingStudents, setIsSeedingStudents] = useState(false);

  // Modais da aba Estudantes (carômetro)
  const [notesModalStudent, setNotesModalStudent] = useState<any | null>(null);
  const [studentNotes, setStudentNotes] = useState<any[]>([]);
  const [newNoteText, setNewNoteText] = useState('');
  const [newNoteCategory, setNewNoteCategory] = useState<'comportamento' | 'destaque' | 'pedagogico' | 'familiar' | 'saude'>('comportamento');
  const [isSavingNote, setIsSavingNote] = useState(false);
  const [isLoadingNotes, setIsLoadingNotes] = useState(false);


  useEffect(() => {
    if (!isAuthLoading && !teacherSubject && !isSuper) {
      navigate('/admin/login');
    }
  }, [teacherSubject, isSuper, navigate, isAuthLoading]);

  useEffect(() => {
    if (!isAuthLoading && (teacherSubject || isSuper)) {
      fetchQuestionBank();
      fetchSavedActivities();
      fetchLessonOverrides();
      fetchStudents();
      fetchSubmissions();
      fetchChatSessions();
      fetchPublishedExams();
    }
  }, [teacherSubject, isSuper, isAuthLoading]);

  useEffect(() => {
    if (!selectedChatStudentId) return;

    let cancelled = false;
    const fetchChat = async () => {
      let qb = supabase
        .from('messages')
        .select('*')
        .or(`sender_id.eq.${selectedChatStudentId},receiver_id.eq.${selectedChatStudentId}`)
        .order('created_at', { ascending: true });
      if (!isSuper && teacherSubject) qb = qb.eq('subject', teacherSubject);
      const { data, error } = await qb;
      if (cancelled) return;
      if (error) { console.error('chat fetch error', error); return; }
      setSelectedChatMessages(data || []);
    };
    fetchChat();

    const channel = supabase
      .channel(`admin-chat-${selectedChatStudentId}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages' },
        (payload) => {
          const m: any = payload.new;
          if (m.sender_id === selectedChatStudentId || m.receiver_id === selectedChatStudentId) {
            if (!isSuper && teacherSubject && m.subject !== teacherSubject) return;
            fetchChat();
          }
        }
      )
      .subscribe();

    return () => {
      cancelled = true;
      supabase.removeChannel(channel);
    };
  }, [selectedChatStudentId, isSuper, teacherSubject]);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedChatMessages]);

  const fetchQuestionBank = async () => {
    try {
      let qb = supabase.from('questions').select('*').order('created_at', { ascending: false });
      if (!isSuper && teacherSubject) qb = qb.eq('subject', teacherSubject);
      const { data, error } = await qb;
      if (error) throw error;
      setQuestionBank(data || []);
    } catch (e) {
      console.error("Erro ao buscar banco de questões:", e);
    }
  };

  const fetchSavedActivities = async () => {
    try {
      let qb = supabase.from('activities').select('*').order('created_at', { ascending: false });
      // tabela activities não tem coluna `subject` em todos os modelos; filtra só se admin de matéria
      const { data, error } = await qb;
      if (error) throw error;
      const activities = (data || []).filter((a: any) =>
        isSuper || !teacherSubject || a.subject === undefined || a.subject === teacherSubject
      );
      setActivityBank(activities);
      setSavedActivities(activities.map((a: any) => a.lesson_id).filter(Boolean));
    } catch (e) {
      console.error("Erro ao buscar atividades salvas:", e);
    }
  };

  const fetchStudents = async () => {
    try {
      // CRÍTICO: NÃO selecionar photo_url aqui. Cada foto é base64 ~1.5 MB;
      // 383 alunos × 1.5 MB = ~580 MB que estoura/trunca o response.
      // A foto é carregada sob demanda no <StudentAvatar/> quando o card aparece.
      const { data, error } = await supabase
        .from('students')
        .select('id,name,email,school_class,grade,role,created_at')
        .order('name', { ascending: true });
      if (error) throw error;
      setStudents(data || []);
    } catch (e) {
      console.error("Erro ao buscar estudantes:", e);
    }
  };

  const fetchSubmissions = async () => {
    try {
      let qb = supabase.from('submissions').select('*');
      if (!isSuper && teacherSubject) qb = qb.eq('subject', teacherSubject);
      const { data, error } = await qb;
      if (error) throw error;

      const list = (data || []).slice().sort((a: any, b: any) => {
        const ta = new Date(a.submitted_at || a.submission_date || 0).getTime();
        const tb = new Date(b.submitted_at || b.submission_date || 0).getTime();
        return tb - ta;
      });
      setSubmissions(list);
    } catch (e) {
      console.error("Erro ao buscar submissões:", e);
    }
  };

  const fetchChatSessions = async () => {
    try {
      let qb = supabase.from('messages').select('*').order('created_at', { ascending: false });
      if (!isSuper && teacherSubject) qb = qb.eq('subject', teacherSubject);
      const { data, error } = await qb;
      if (error) throw error;

      const sessionsMap: Record<string, any> = {};
      (data || []).forEach((m: any) => {
        const sid = m.sender_id || m.receiver_id;
        if (!sid) return;
        if (!sessionsMap[sid]) {
          sessionsMap[sid] = {
            studentId: sid,
            studentName: m.sender_name || m.student_name || 'Aluno',
            lastMessage: m.content,
            timestamp: m.created_at,
          };
        }
      });
      setChatSessions(Object.values(sessionsMap));
    } catch (e) {
      console.error('Erro ao buscar sessões de chat:', e);
    }
  };

  const fetchLessonOverrides = async () => {
    try {
      const { data, error } = await supabase.from('lesson_overrides').select('*');
      if (error) throw error;
      const overrides: Record<string, any> = {};
      (data || []).forEach((row: any) => {
        // suporta tanto modelo {id, data:{...}} quanto {id, title, theory, ...}
        const payload = row.data && typeof row.data === 'object' ? row.data : row;
        overrides[row.id] = { id: row.id, ...payload };
      });
      setLessonOverrides(overrides);
    } catch (e) {
      console.error("Erro ao buscar overrides de aulas:", e);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await Promise.all([
        fetchStudents(),
        fetchSubmissions(),
        fetchQuestionBank(),
        fetchSavedActivities(),
        fetchLessonOverrides(),
        fetchChatSessions()
      ]);
    } catch (e) {
      console.error("Erro ao atualizar:", e);
    } finally {
      setIsRefreshing(false);
    }
  };

  // ============================================================
  // ANOTAÇÕES SOBRE O ESTUDANTE (student_notes)
  // ============================================================
  const openNotesModal = async (st: any) => {
    setNotesModalStudent(st);
    setNewNoteText('');
    setStudentNotes([]);
    setIsLoadingNotes(true);
    const t0 = Date.now();
    try {
      // Trazer só as colunas que precisamos + limite máximo (proteção contra
      // alunos com centenas de anotações antigas).
      const queryPromise = supabase
        .from('student_notes')
        .select('id,student_id,subject,teacher_subject,category,content,created_at')
        .eq('student_id', st.id)
        .order('created_at', { ascending: false })
        .limit(200);

      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Tempo esgotado ao carregar anotações (8s).')), 8000)
      );

      const result: any = await Promise.race([queryPromise, timeoutPromise]);
      console.log(`[notes] fetch em ${Date.now() - t0}ms, count: ${result?.data?.length}`);

      if (result.error) throw result.error;
      setStudentNotes(result.data || []);
    } catch (e: any) {
      console.error('Erro ao buscar anotações:', e);
      // Não bloqueia o usuário — abre o modal mesmo assim para ele poder criar
      // novas anotações. Só avisa do problema com o histórico.
      const msg = e?.message || 'erro desconhecido';
      if (msg.includes('Tempo esgotado')) {
        alert('Histórico demorou demais para carregar. Você pode adicionar novas anotações normalmente — recarregue a página depois para ver as antigas.');
      } else {
        alert('Não foi possível carregar o histórico: ' + msg);
      }
      setStudentNotes([]);
    } finally {
      setIsLoadingNotes(false);
    }
  };

  /** Insert com timeout de 10s — se a request travar, não fica spinner pra sempre. */
  async function insertNoteWithTimeout(payload: any): Promise<any> {
    const t0 = Date.now();
    const insertPromise = supabase.from('student_notes').insert(payload).select('*').single();
    const timeout = new Promise((_, reject) => setTimeout(() => reject(new Error('Tempo esgotado (10s). Verifique sua conexão.')), 10000));
    const result: any = await Promise.race([insertPromise, timeout]);
    console.log(`[notes] insert em ${Date.now() - t0}ms`, result?.error ? '❌ ' + result.error.message : '✅');
    return result;
  }

  const handleAddNote = async (category?: string) => {
    if (!notesModalStudent || !newNoteText.trim() || isSavingNote) return;
    const targetCategory = category || newNoteCategory;
    setIsSavingNote(true);
    try {
      const subjectTag = teacherSubject || 'geral';
      const payload: any = {
        student_id: notesModalStudent.id,
        category: targetCategory,
        subject: subjectTag,
        teacher_subject: subjectTag,
        content: newNoteText.trim(),
      };

      let result: any = await insertNoteWithTimeout(payload);

      // Fallback inteligente: se erro de schema, retenta sem o campo problemático
      if (result.error) {
        const msg = result.error.message || '';
        if (/teacher_subject/i.test(msg)) {
          delete payload.teacher_subject;
          result = await insertNoteWithTimeout(payload);
        } else if (/category/i.test(msg)) {
          const legacy = {
            student_id: notesModalStudent.id,
            subject: subjectTag,
            teacher_subject: subjectTag,
            content: `[${targetCategory}] ${newNoteText.trim()}`,
          };
          result = await insertNoteWithTimeout(legacy);
        } else if (/subject/i.test(msg)) {
          delete payload.subject;
          result = await insertNoteWithTimeout(payload);
        }
      }

      if (result.error) throw result.error;
      setStudentNotes([result.data, ...studentNotes]);
      setNewNoteText('');
      // mantém a categoria selecionada para o prof poder fazer várias da mesma seguidas
    } catch (e: any) {
      console.error('Erro ao salvar anotação:', e);
      alert('Não foi possível salvar: ' + (e?.message || 'tente novamente.'));
    } finally {
      setIsSavingNote(false);
    }
  };

  const handleDeleteNote = async (noteId: string) => {
    if (!confirm('Excluir esta anotação?')) return;
    try {
      const { error } = await supabase.from('student_notes').delete().eq('id', noteId);
      if (error) throw error;
      setStudentNotes(studentNotes.filter(n => n.id !== noteId));
    } catch (e: any) {
      alert('Erro ao excluir: ' + (e?.message || ''));
    }
  };

  // Configurações do estudante foram removidas a pedido do professor.
  // - Reset de senha → aluno faz via "Esqueceu a senha?" no login
  // - Exclusão de estudante → operação administrativa do banco/Supabase
  // No carômetro o professor só anota e envia mensagens.

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!teacherReplyText.trim() || !selectedChatStudentId || isSendingReply) return;

    setIsSendingReply(true);
    try {
      const studentObj = students.find(s => s.id === selectedChatStudentId);
      // Schema real de messages:
      //   sender_id, sender_name, receiver_id (opcional), school_class, grade,
      //   content, is_from_teacher, subject, read_at, created_at
      // (NÃO tem student_id/student_name — esses campos foram removidos)
      const payload: any = {
        sender_id: student?.id,
        sender_name: student?.name || 'Professor',
        receiver_id: selectedChatStudentId,
        school_class: studentObj?.school_class || null,
        grade: studentObj?.grade || null,
        content: teacherReplyText.trim(),
        is_from_teacher: true,
        subject: teacherSubject || 'Geral',
      };

      // Tolerante a schemas variantes — se receiver_id ou outra coluna faltar,
      // remove e tenta de novo (até 4 tentativas)
      let attempts = 0;
      let lastError: any = null;
      while (attempts < 4) {
        const r = await supabase.from('messages').insert(payload);
        if (!r.error) { lastError = null; break; }
        lastError = r.error;
        const m = String(r.error.message || '').match(/'([^']+)' column of/i);
        const missingCol = m?.[1];
        if (missingCol && (missingCol in payload)) {
          console.warn(`[messages] coluna ${missingCol} faltando — removendo`);
          delete payload[missingCol];
          attempts++;
        } else {
          break;
        }
      }
      if (lastError) throw lastError;
      setTeacherReplyText('');
    } catch (err: any) {
      console.error("Erro ao enviar mensagem:", err);
      alert("Não foi possível enviar a mensagem: " + (err?.message || ''));
    } finally {
      setIsSendingReply(false);
    }
  };

  const handleOpenLessonEditor = (lesson: any) => {
    const override = lessonOverrides[lesson.id];
    setSelectedLessonForEdit(lesson);
    setLessonTitleDraft(override?.title || lesson.title);
    setLessonTheoryDraft(override?.theory || lesson.theory || '');
    setIsLessonEditorOpen(true);
  };

  const handleSaveLessonOverride = async () => {
    if (!selectedLessonForEdit || isSavingLesson) return;
    setIsSavingLesson(true);
    try {
      const payload = {
        title: lessonTitleDraft,
        theory: lessonTheoryDraft,
        teacher_id: student?.id || 'admin',
      };
      const { error } = await supabase
        .from('lesson_overrides')
        .upsert({ id: selectedLessonForEdit.id, data: payload }, { onConflict: 'id' });
      if (error) throw error;
      alert("Conteúdo da aula salvo com sucesso!");
      fetchLessonOverrides();
      setIsLessonEditorOpen(false);
    } catch (e: any) {
      handleSupabaseError(e, OperationType.UPDATE, 'lesson_overrides');
    } finally {
      setIsSavingLesson(false);
    }
  };

  const handleDeleteLessonOverride = async (lessonId: string) => {
    if (!confirm("Isso irá remover o conteúdo customizado desta aula e voltar ao padrão oficial. Confirmar?")) return;
    try {
      const { error } = await supabase.from('lesson_overrides').delete().eq('id', lessonId);
      if (error) throw error;
      alert("Conteúdo customizado removido.");
      fetchLessonOverrides();
    } catch (e: any) {
      alert("Erro ao remover: " + e.message);
    }
  };

  const handleOpenActivityEditor = async (lesson: any) => {
    const override = lessonOverrides[lesson.id];
    const displayTitle = override?.title || lesson.title;
    setSelectedLessonForEdit({ ...lesson, title: displayTitle });
    setIsActivityEditorOpen(true);
    setActivityQuestionsDraft([]);

    try {
      const { data, error } = await supabase
        .from('questions')
        .select('*')
        .eq('topic', displayTitle)
        .eq('subject', lesson.subject)
        .order('created_at', { ascending: true });
      if (error) throw error;
      setActivityQuestionsDraft(data || []);
    } catch (e) {
      console.error("Erro ao carregar questões existentes:", e);
    }
  };

  const handleAddQuestionToDraft = async () => {
    if (!newQuestion.question_text.trim() || isSavingActivity) return;
    // Discursiva não precisa de alternativas válidas
    if (newQuestion.type === 'objective') {
      const filled = Object.values(newQuestion.options || {}).filter((v: any) => (v || '').trim()).length;
      if (filled < 2) { alert('Preencha pelo menos 2 alternativas.'); return; }
      if (!newQuestion.options?.[newQuestion.correct_option]?.trim()) {
        alert('A alternativa marcada como correta está vazia.');
        return;
      }
    }
    setIsSavingActivity(true);
    try {
      const qData: any = {
        ...newQuestion,
        subject: selectedLessonForEdit.subject,
        topic: selectedLessonForEdit.title,
        lesson_id: selectedLessonForEdit.id,
      };
      // Discursiva: limpa campos que só fazem sentido em objetiva
      if (newQuestion.type === 'discursive') {
        qData.options = null;
        qData.correct_option = null;
      }

      const { data: insertedQ, error: insertErr } = await supabase
        .from('questions')
        .insert(qData)
        .select('*')
        .single();
      if (insertErr) throw insertErr;
      setActivityQuestionsDraft([...activityQuestionsDraft, insertedQ]);

      if (!savedActivities.includes(selectedLessonForEdit.id)) {
        const { error: actErr } = await supabase.from('activities').insert({
          lesson_id: selectedLessonForEdit.id,
          title: `Atividade: ${selectedLessonForEdit.title}`,
        });
        if (actErr) console.warn('Falha ao criar atividade vínculo:', actErr);
        fetchSavedActivities();
      }

      setNewQuestion({
        type: 'objective',
        question_text: '',
        options: { a: '', b: '', c: '', d: '', e: '' },
        correct_option: 'a'
      });
      fetchQuestionBank();
    } catch (e: any) {
      alert("Erro ao salvar questão: " + e.message);
    } finally {
      setIsSavingActivity(false);
    }
  };

  const handleRemoveQuestionFromDraft = async (qId: string) => {
    if (!confirm("Excluir esta questão permanentemente?")) return;
    try {
      const { error } = await supabase.from('questions').delete().eq('id', qId);
      if (error) throw error;
      setActivityQuestionsDraft(activityQuestionsDraft.filter(q => q.id !== qId));
      fetchQuestionBank();
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteActivity = async (lessonId: string) => {
    if (!confirm("Isso irá excluir a atividade e TODAS as questões vinculadas a este tópico do banco. Confirmar?")) return;
    setLoading(true);
    try {
      const [actDel, qDel] = await Promise.all([
        supabase.from('activities').delete().eq('lesson_id', lessonId),
        supabase.from('questions').delete().eq('lesson_id', lessonId),
      ]);
      if (actDel.error) throw actDel.error;
      if (qDel.error) throw qDel.error;
      alert("Atividade e questões removidas com sucesso.");
      fetchSavedActivities();
      fetchQuestionBank();
    } catch (e: any) {
      console.error(e);
      alert("Erro ao remover atividade: " + (e.message || "Erro desconhecido"));
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteQuestion = async (id: string) => {
    if (!confirm("Excluir questão permanentemente?")) return;
    try {
      const { error } = await supabase.from('questions').delete().eq('id', id);
      if (error) throw error;
      alert("Questão removida com sucesso.");
      fetchQuestionBank();
    } catch (e: any) {
      console.error(e);
      alert("Erro ao remover questão: " + (e.message || "Erro desconhecido"));
    }
  };

  const handleSeedStudents = async () => {
    if (!confirm("Deseja migrar todos os estudantes pré-cadastrados para o banco de dados?")) return;
    setIsSeedingStudents(true);
    try {
      const rows = STUDENTS_SEED_DATA.map((s: any) => {
        const grade = s.grade || (s.school_class ? String(s.school_class).charAt(0) : '1');
        return { ...s, grade: String(grade) };
      });
      // Upsert em lotes para evitar payload gigante
      const chunkSize = 100;
      for (let i = 0; i < rows.length; i += chunkSize) {
        const chunk = rows.slice(i, i + chunkSize);
        const { error } = await supabase.from('students').upsert(chunk, { onConflict: 'email' });
        if (error) throw error;
      }
      alert("Migração concluída!");
      fetchStudents();
    } catch (e) {
      console.error(e);
    } finally {
      setIsSeedingStudents(false);
    }
  };

  // Lista todos os simulados e redações já publicados (filtrados por matéria do prof).
  // bimonthly_exams.type ∈ {'exam','essay'} — separa nos dois states.
  const fetchPublishedExams = async () => {
    try {
      let qb = supabase.from('bimonthly_exams').select('*').order('created_at', { ascending: false });
      if (!isSuper && teacherSubject) qb = qb.eq('subject', teacherSubject);
      const { data, error } = await qb;
      if (error) throw error;
      const all = data || [];
      // Quando a coluna `type` não existe (schema antigo), tudo conta como 'exam'.
      setPublishedExams(all.filter((e: any) => (e.type || 'exam') === 'exam'));
      setPublishedEssays(all.filter((e: any) => e.type === 'essay'));
    } catch (e) {
      console.error('Erro ao buscar simulados/redações:', e);
    }
  };

  // ============================================================
  // BANCO DE TEMAS — Reutilizar questão em outra aula
  // ============================================================
  // Duplica a questão pra uma aula alvo, criando nova row em `questions`
  // (a original permanece intacta).
  const handleReuseQuestion = async () => {
    if (!reuseModalQuestion || !reuseTargetLessonId || isReusing) return;

    // Resolve nome da aula alvo (do curriculumData) para gravar como `topic`
    let targetLesson: any = null;
    for (const g of curriculumData) {
      for (const b of g.bimesters) {
        const l = b.lessons.find(x => x.id === reuseTargetLessonId);
        if (l) { targetLesson = l; break; }
      }
      if (targetLesson) break;
    }
    if (!targetLesson) { alert('Aula alvo não encontrada.'); return; }

    setIsReusing(true);
    try {
      // 1) Cria a nova questão vinculada à aula alvo
      const newQ: any = {
        subject: targetLesson.subject,
        topic: lessonOverrides[targetLesson.id]?.title || targetLesson.title,
        lesson_id: targetLesson.id,
        type: reuseModalQuestion.type,
        difficulty: reuseModalQuestion.difficulty || 'Médio',
        question_text: reuseModalQuestion.question_text,
        options: reuseModalQuestion.options || null,
        correct_option: reuseModalQuestion.correct_option || null,
        explanation: reuseModalQuestion.explanation || null,
      };
      const { error: insertErr } = await supabase.from('questions').insert(newQ);
      if (insertErr) throw insertErr;

      // 2) Garante que a activity da aula alvo exista (pra aluno enxergar)
      if (!savedActivities.includes(targetLesson.id)) {
        const { error: actErr } = await supabase.from('activities').insert({
          lesson_id: targetLesson.id,
          title: `Atividade: ${targetLesson.title}`,
        });
        if (actErr) console.warn('Falha ao criar activity:', actErr);
      }

      alert(`Questão reutilizada na aula "${targetLesson.title}".`);
      setReuseModalQuestion(null);
      setReuseTargetLessonId('');
      fetchQuestionBank();
      fetchSavedActivities();
    } catch (e: any) {
      alert('Erro ao reutilizar: ' + (e?.message || ''));
      console.error(e);
    } finally {
      setIsReusing(false);
    }
  };

  // ============================================================
  // REDAÇÃO — Publicação + listagem + remoção
  // ============================================================
  const handlePublishEssay = async () => {
    if (isPublishingEssay) return;
    const title = essayTitle.trim();
    if (!title) { alert('Digite o título da redação.'); return; }
    if (!confirm(`Publicar a redação "${title}" para os alunos?`)) return;
    setIsPublishingEssay(true);
    try {
      const payload: any = {
        subject: teacherSubject || 'Geral',
        grade: String(essayGrade),
        bimester: String(essayBimester),
        type: 'essay',
        title,
        school_class: essayClass === 'all' ? null : essayClass,
        topics: [],
        // Pra reusar a infra do simulado, guardamos a redação como
        // uma única "questão" do tipo essay com o título no enunciado.
        questions: [{
          id: 1,
          type: 'essay',
          questionText: title,
          instructions: essayInstructions.trim() || null,
          lines: 30,
        }],
      };

      // Tolerante a schema sem coluna `type`
      let attempts = 0;
      let lastError: any = null;
      while (attempts < 6) {
        const r = await supabase.from('bimonthly_exams').insert(payload);
        if (!r.error) { lastError = null; break; }
        lastError = r.error;
        const m = String(r.error.message || '').match(/'([^']+)' column of/i);
        const missingCol = m?.[1];
        if (missingCol && (missingCol in payload)) {
          console.warn(`[essay] coluna ${missingCol} faltando — removendo do payload`);
          delete payload[missingCol];
          attempts++;
        } else break;
      }
      if (lastError) throw lastError;

      alert('Redação publicada! Os alunos já podem fazer.');
      setEssayTitle('');
      setEssayInstructions('');
      fetchPublishedExams();
    } catch (e: any) {
      alert('Erro ao publicar redação: ' + (e?.message || ''));
      console.error(e);
    } finally {
      setIsPublishingEssay(false);
    }
  };

  const handleDeletePublishedEssay = async (id: string) => {
    if (!confirm('Excluir esta redação? Respostas dos alunos serão mantidas.')) return;
    try {
      const { error } = await supabase.from('bimonthly_exams').delete().eq('id', id);
      if (error) throw error;
      fetchPublishedExams();
    } catch (e: any) {
      alert('Erro ao excluir: ' + e.message);
    }
  };

  // Adiciona a questão atual ao rascunho do simulado
  const handleAddExamQuestion = () => {
    if (!examNewQuestion.questionText.trim()) {
      alert('Preencha o enunciado da questão.');
      return;
    }
    if (examNewQuestion.type === 'objective') {
      const opts = examNewQuestion.options || {};
      const filled = ['a','b','c','d','e'].filter(k => (opts[k] || '').trim()).length;
      if (filled < 2) { alert('Preencha pelo menos 2 alternativas.'); return; }
      if (!opts[examNewQuestion.correctOption]?.trim()) {
        alert('A alternativa correta marcada não foi preenchida.');
        return;
      }
    }
    const next = {
      ...examNewQuestion,
      id: examQuestionsDraft.length + 1,
    };
    setExamQuestionsDraft([...examQuestionsDraft, next]);
    setExamNewQuestion({
      type: examNewQuestion.type,
      textFragment: '',
      questionText: '',
      options: { a: '', b: '', c: '', d: '', e: '' },
      correctOption: 'a',
      difficulty: 'Médio',
      explanation: '',
    });
  };

  const handleRemoveExamQuestion = (idx: number) => {
    if (!confirm('Remover esta questão do simulado?')) return;
    const next = examQuestionsDraft.filter((_, i) => i !== idx).map((q, i) => ({ ...q, id: i + 1 }));
    setExamQuestionsDraft(next);
  };

  // Assistente IA opcional: usa a IA para SUGERIR questões e popular o draft
  const handleGenerateExam = async () => {
    if (!examTopics.trim()) { alert('Liste os tópicos do bimestre antes de pedir sugestão à IA.'); return; }
    setIsGeneratingExam(true);
    try {
      const { generateBimonthlyEvaluation } = await import('../services/aiService');
      const exam = await generateBimonthlyEvaluation(
        teacherSubject || 'Geral',
        examGrade,
        examBimester,
        examTopics.split(',').map(t => t.trim()).filter(Boolean)
      );
      // Converte para o formato do draft (mantendo os flags type)
      const suggested = (exam.questions || []).map((q: any, i: number) => ({
        id: examQuestionsDraft.length + i + 1,
        type: 'objective',
        textFragment: q.textFragment || '',
        questionText: q.questionText || q.question_text || '',
        options: q.options || { a: '', b: '', c: '', d: '', e: '' },
        correctOption: (q.correctOption || q.correct_option || 'a').toLowerCase(),
        difficulty: q.difficulty || 'Médio',
        explanation: q.explanation || '',
      }));
      setExamQuestionsDraft([...examQuestionsDraft, ...suggested]);
      if (!examTitle && exam.subject) setExamTitle(`Simulado de ${exam.subject} - ${examBimester}º Bimestre`);
    } catch (e: any) {
      alert('Erro ao sugerir questões: ' + e.message);
    } finally {
      setIsGeneratingExam(false);
    }
  };

  // Publica o simulado: salva em bimonthly_exams para os alunos verem
  const handlePublishExam = async () => {
    if (isPublishingExam) return;
    if (examQuestionsDraft.length === 0) {
      alert('Adicione pelo menos uma questão antes de publicar.');
      return;
    }
    if (!confirm(`Publicar este simulado? ${examQuestionsDraft.length} questões serão liberadas para os alunos.`)) return;
    setIsPublishingExam(true);
    try {
      const payload: any = {
        subject: teacherSubject || 'Geral',
        grade: String(examGrade),
        bimester: String(examBimester),
        type: 'exam',
        title: examTitle.trim() || `Simulado - ${examBimester}º Bimestre`,
        school_class: examClass === 'all' ? null : examClass,
        topics: examTopics.split(',').map(t => t.trim()).filter(Boolean),
        questions: examQuestionsDraft,
      };

      // Insere em modo "tolerante a schema": se uma coluna não existir,
      // remove dinamicamente e tenta de novo. Cobre instalações que
      // ainda não rodaram supabase/fix_all.sql.
      const compatColumns: string[] = [];
      let attempts = 0;
      let lastError: any = null;
      while (attempts < 6) {
        const r = await supabase.from('bimonthly_exams').insert(payload);
        if (!r.error) { lastError = null; break; }
        lastError = r.error;
        const m = String(r.error.message || '').match(/'([^']+)' column of/i);
        const missingCol = m?.[1];
        if (missingCol && (missingCol in payload)) {
          console.warn(`[exam] coluna ${missingCol} faltando no schema — removendo do payload`);
          compatColumns.push(missingCol);
          delete payload[missingCol];
          attempts++;
        } else {
          break;
        }
      }
      if (lastError) throw lastError;

      if (compatColumns.length > 0) {
        alert(
          `Simulado publicado em modo de compatibilidade (sem ${compatColumns.join(', ')}).\n\n` +
          '⚠️ Para suportar todos os campos, rode supabase/fix_all.sql no SQL Editor do Supabase.'
        );
      } else {
        alert('Simulado publicado com sucesso! Os alunos já podem realizá-lo.');
      }
      // Reset
      setExamQuestionsDraft([]);
      setExamTitle('');
      setExamTopics('');
      fetchPublishedExams();
    } catch (e: any) {
      alert('Erro ao publicar: ' + (e?.message || ''));
      console.error('publishExam error:', e);
    } finally {
      setIsPublishingExam(false);
    }
  };

  const handleDeletePublishedExam = async (examId: string) => {
    if (!confirm('Excluir este simulado? Submissões já realizadas pelos alunos NÃO serão apagadas.')) return;
    try {
      const { error } = await supabase.from('bimonthly_exams').delete().eq('id', examId);
      if (error) throw error;
      fetchPublishedExams();
    } catch (e: any) {
      alert('Erro ao excluir: ' + e.message);
    }
  };

  const handleGenerateFullReport = async () => {
    setIsGeneratingReport(true);
    try {
      const { generatePedagogicalSummary } = await import('../services/aiService');

      // Resolve nome do aluno selecionado (caso individual)
      const targetStudent = reportTarget === 'student'
        ? students.find(s => s.id === selectedReportStudent)
        : null;

      // Submissões relevantes para o relatório
      const relevant = submissions.filter(s => {
        if (reportTarget === 'student') {
          return s.student_id === selectedReportStudent
              || (targetStudent && s.student_name?.toLowerCase().trim() === targetStudent.name?.toLowerCase().trim());
        }
        return filterClass === 'all' || s.school_class === filterClass;
      });

      // Buscar anotações (student_notes) + extrair categoria pra enriquecer
      // o cruzamento da IA. Cada categoria vira um sinal pedagógico distinto.
      let behaviorNotes: string[] = [];
      try {
        let qb = supabase.from('student_notes').select('*').order('created_at', { ascending: false });
        if (reportTarget === 'student' && selectedReportStudent) qb = qb.eq('student_id', selectedReportStudent);
        const { data: notes } = await qb;
        behaviorNotes = (notes || []).map((n: any) => {
          // Tenta extrair categoria da coluna ou do prefixo "[categoria] texto"
          let cat = (n.category || '').toLowerCase();
          let content = n.content || '';
          if (!cat) {
            const m = String(content).match(/^\[([^\]]+)\]\s*(.*)$/s);
            if (m) { cat = m[1].toLowerCase(); content = m[2]; }
          }
          const subj = n.subject || n.teacher_subject || 'geral';
          const date = n.created_at ? new Date(n.created_at).toLocaleDateString('pt-BR') : '';
          return `[${cat || 'geral'} • ${subj} • ${date}] ${content}`;
        });
      } catch (e) {
        console.warn('Falha ao buscar student_notes:', e);
      }

      const activities = relevant.map((s: any) => ({
        title: s.lesson_title,
        score: Number(s.score) || 0,
        bimester: (s.lesson_id ? lessonToBimesterMap[s.lesson_id] : null) || lessonToBimesterMap[s.lesson_title] || undefined,
        date: s.submitted_at || s.submission_date,
        subject: s.subject,
      }));

      const result = await generatePedagogicalSummary(
        reportTarget === 'student' ? 'INDIVIDUAL' : 'TURMA',
        {
          subject: teacherSubject || 'Geral',
          grades: relevant.map(s => Number(s.score) || 0),
          notes: relevant.map(s => s.teacher_feedback || '').filter(Boolean),
          studentName: targetStudent?.name,
          schoolClass: filterClass,
          activities,
          behaviorNotes,
        }
      );
      setAiReportResult(result);
    } catch (e: any) {
      alert("Erro ao gerar relatório: " + e.message);
    } finally {
      setIsGeneratingReport(false);
    }
  };

  const handleSaveFeedback = async () => {
    if (!viewingSubmission || isSavingFeedback) return;
    setIsSavingFeedback(true);
    try {
      const { error } = await supabase
        .from('submissions')
        .update({ teacher_feedback: manualFeedback })
        .eq('id', viewingSubmission.id);
      if (error) throw error;
      alert("Feedback enviado com sucesso!");
      fetchSubmissions();
    } catch (e) {
      console.error(e);
    } finally {
      setIsSavingFeedback(false);
    }
  };

  const filteredStudents = useMemo(() => {
    return students.filter(st => {
      const matchesSearch = st.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesClass = filterClass === 'all' || st.school_class === filterClass;
      const studentGrade = String(st.grade || st.school_class?.charAt(0) || '');
      const matchesGrade = filterGrade === 'all' || studentGrade === filterGrade;
      return matchesSearch && matchesClass && matchesGrade;
    });
  }, [students, searchTerm, filterClass, filterGrade]);

  const filteredSubmissions = useMemo(() => {
    return submissions.filter(sub => {
      const matchesSearch = searchTerm === '' || 
        sub.student_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.lesson_title?.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Fallback: se a submissão não tiver turma, procuramos no perfil atual do estudante
      const studentProfile = students.find(s => 
        (sub.student_id && s.id === sub.student_id) || 
        (sub.student_name && s.name?.toLowerCase().trim() === sub.student_name.toLowerCase().trim())
      );
      const studentClass = sub.school_class || studentProfile?.school_class;
      const matchesClass = filterClass === 'all' || studentClass === filterClass;
      
      const studentGrade = String(sub.grade || studentProfile?.grade || studentClass?.charAt(0) || '');
      const matchesGrade = filterGrade === 'all' || studentGrade === filterGrade;
      
      const matchesSubject = filterSubject === 'all' || sub.subject === filterSubject;
      
      return matchesSearch && matchesClass && matchesSubject && matchesGrade;
    });
  }, [submissions, students, searchTerm, filterClass, filterGrade, filterSubject]);

  const lessonToBimesterMap = useMemo(() => {
    const map: Record<string, number> = {};
    curriculumData.forEach(grade => {
      grade.bimesters.forEach(bimester => {
        bimester.lessons.forEach(lesson => {
          map[lesson.title] = bimester.id;
          map[lesson.id] = bimester.id;
        });
      });
    });
    return map;
  }, []);

  const studentsWithSubmissions = useMemo(() => {
    // 1) Lista base: TODOS os estudantes que passam nos filtros de turma/série
    //    Cada um começa com 0 submissões — quem não enviou ainda também aparece.
    const map: Record<string, any> = {};
    students
      .filter(st => st.role !== 'admin') // não mostra os 7 admins na grade de notas
      .filter(st => {
        const matchesClass = filterClass === 'all' || st.school_class === filterClass;
        const studentGrade = String(st.grade || st.school_class?.charAt(0) || '');
        const matchesGrade = filterGrade === 'all' || studentGrade === filterGrade;
        return matchesClass && matchesGrade;
      })
      .forEach(st => {
        map[st.id] = {
          ...st,
          submissionCount: 0,
          bimesterGrades: { 1: 0, 2: 0, 3: 0, 4: 0 },
          activities: [],
        };
      });

    // Extrai número do bimestre a partir do título do simulado/aula
    const bimesterFromTitle = (title?: string) => {
      if (!title) return null;
      const m = String(title).match(/(\d)\s*º\s*bimestre/i);
      return m ? Number(m[1]) : null;
    };

    // 2) Enriquecer com submissões (filtradas por matéria do professor)
    submissions
      .filter(sub => filterSubject === 'all' || sub.subject === filterSubject)
      .forEach(sub => {
        // Match prioritário por student_id; fallback por nome
        let entry = sub.student_id ? map[sub.student_id] : null;
        if (!entry && sub.student_name) {
          const fallback = Object.values(map).find((s: any) =>
            s.name?.toLowerCase().trim() === sub.student_name.toLowerCase().trim()
          );
          if (fallback) entry = fallback as any;
        }
        if (!entry) return;

        entry.submissionCount += 1;
        // Bimester: tenta lesson_id curricular → título → "Xº Bimestre" no título
        const bimester =
          (sub.lesson_id ? lessonToBimesterMap[sub.lesson_id] : null) ||
          lessonToBimesterMap[sub.lesson_title] ||
          bimesterFromTitle(sub.lesson_title) ||
          1;
        entry.bimesterGrades[bimester] = (entry.bimesterGrades[bimester] || 0) + (Number(sub.score) || 0);
        entry.activities.push({
          id: sub.lesson_id,
          title: sub.lesson_title,
          subject: sub.subject,
          score: sub.score,
          bimester,
          isExam: String(sub.lesson_title || '').toLowerCase().includes('avaliação bimestral') || String(sub.lesson_title || '').toLowerCase().includes('simulado'),
          date: sub.submitted_at || sub.submission_date,
        });
      });

    return Object.values(map).sort((a: any, b: any) => a.name.localeCompare(b.name, 'pt-BR'));
  }, [submissions, students, filterClass, filterGrade, filterSubject, lessonToBimesterMap]);

  // Turmas disponíveis: filtra null/admin, e quando uma série está selecionada
  // mostra apenas as turmas daquela série (ex.: filtro 1ª → só 13.xx).
  const classOptions = useMemo(() => {
    const classes = students
      .filter(s => s.role !== 'admin')
      .map(s => s.school_class)
      .filter((c: any): c is string => Boolean(c) && c !== 'N/A');

    const filtered = filterGrade === 'all'
      ? classes
      : classes.filter(c => c.charAt(0) === filterGrade);

    return Array.from(new Set(filtered)).sort();
  }, [students, filterGrade]);

  // Quando o prof muda de série, se a turma atual não pertence à nova série,
  // volta para "Todas".
  useEffect(() => {
    if (filterClass !== 'all' && filterGrade !== 'all' && filterClass.charAt(0) !== filterGrade) {
      setFilterClass('all');
    }
  }, [filterGrade, filterClass]);

  const handleDownloadActivity = async (lesson: any) => {
    setLoading(true);
    try {
      // 1. Buscar questões da aula
      const { data: questions, error: qErr } = await supabase
        .from('questions')
        .select('*')
        .eq('lesson_id', lesson.id);
      if (qErr) throw qErr;

      if (!questions || questions.length === 0) {
        alert("Esta atividade não possui questões cadastradas para exportar.");
        return;
      }

      // 2. Gerar PDF usando jsPDF
      const { default: jsPDF } = await import('jspdf');
      const docPdf = new jsPDF();
      let yOffset = 20;

      // Cabeçalho
      docPdf.setFontSize(18);
      docPdf.text('Atividade de fixação', 105, yOffset, { align: 'center' });
      yOffset += 10;
      
      docPdf.setFontSize(14);
      docPdf.text(`${subjectsInfo[lesson.subject as Subject]?.name || lesson.subject}`, 105, yOffset, { align: 'center' });
      yOffset += 10;
      
      docPdf.setFontSize(12);
      docPdf.text(`Tema: ${lesson.title}`, 20, yOffset);
      yOffset += 15;

      // Questões
      questions.forEach((q: any, index: number) => {
        if (yOffset > 270) {
          docPdf.addPage();
          yOffset = 20;
        }

        docPdf.setFont('helvetica', 'bold');
        const textLines = docPdf.splitTextToSize(`${index + 1}. ${q.question_text}`, 170);
        docPdf.text(textLines, 20, yOffset);
        yOffset += (textLines.length * 7);

        if (q.type === 'objective' && q.options) {
          docPdf.setFont('helvetica', 'normal');
          ['a', 'b', 'c', 'd', 'e'].forEach(key => {
            const val = q.options[key];
            if (val) {
              const optLines = docPdf.splitTextToSize(`${key.toUpperCase()}) ${val}`, 160);
              docPdf.text(optLines, 25, yOffset);
              yOffset += (optLines.length * 6);
            }
          });
        }
        yOffset += 5;
      });

      docPdf.save(`Atividade_${lesson.title.replace(/\s+/g, '_')}.pdf`);
    } catch (e: any) {
      console.error("Erro ao exportar PDF:", e);
      alert("Erro ao exportar PDF: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex transition-colors duration-300 relative">
      <div className="absolute inset-0 bg-mesh-bg opacity-40 dark:opacity-15 pointer-events-none"></div>

      {/* Sidebar — gradient brand */}
      <aside className="w-72 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-r dark:border-slate-800 flex flex-col transition-colors relative z-10">
        <div className="p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-gradient-vibe rounded-[18px] flex items-center justify-center text-white shadow-glow-purple animate-float">
              <GraduationCap size={26} strokeWidth={2.5}/>
            </div>
            <div>
              <h1 className="font-black text-xl tracking-tighter font-display">
                <span className="text-gradient-vibe">Área Docente</span>
              </h1>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] mt-0.5">CHSA · TO</p>
            </div>
          </div>

          <nav className="space-y-1">
            {[
              { id: 'lessons_list',   icon: BookOpen,     label: 'Plano de Aulas',   grad: 'bg-gradient-aurora',  glow: 'shadow-glow-cyan' },
              { id: 'question_bank',  icon: Database,     label: 'Banco de Temas',   grad: 'bg-gradient-cosmic',  glow: 'shadow-glow-purple' },
              { id: 'submissions',    icon: FileText,     label: 'Submissões',       grad: 'bg-gradient-ocean',   glow: 'shadow-glow-cyan' },
              { id: 'evaluations',    icon: Award,        label: 'Notas',            grad: 'bg-gradient-fire',    glow: 'shadow-glow-orange' },
              { id: 'students',       icon: UserCircle,   label: 'Estudantes',       grad: 'bg-gradient-vibe',    glow: 'shadow-glow-pink' },
              { id: 'messages',       icon: MessageSquare,label: 'Mensagens',        grad: 'bg-gradient-mint',    glow: 'shadow-glow-lime' },
              { id: 'exam_generator', icon: BrainCircuit, label: 'Simulados',        grad: 'bg-gradient-sunset',  glow: 'shadow-glow-pink' },
              { id: 'essays',         icon: FileText,     label: 'Redação',          grad: 'bg-gradient-fire',    glow: 'shadow-glow-orange' },
              { id: 'reports',        icon: BarChart3,    label: 'Relatórios IA',    grad: 'bg-gradient-cosmic',  glow: 'shadow-glow-purple' },
            ].map(item => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all cursor-pointer ${
                    isActive
                      ? `${item.grad} text-white ${item.glow} translate-x-2 scale-[1.02]`
                      : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:translate-x-1'
                  }`}
                >
                  <item.icon size={18} strokeWidth={isActive ? 2.5 : 2}/> {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto p-8 border-t dark:border-slate-800">
           <button
             onClick={logoutTeacher}
             className="w-full flex items-center gap-3 px-4 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.25em] text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 hover:scale-105 transition-all cursor-pointer"
           >
             <LogOut size={18}/> Sair do Painel
           </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto h-screen p-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header Superior */}
          <header className="flex flex-wrap justify-between items-center gap-6 mb-10">
            <div>
              <h2 className="text-4xl font-black tracking-tighter leading-none font-display">
                <span className="text-gradient-vibe">
                  {activeTab === 'lessons_list' && '📚 Gestão de Conteúdo'}
                  {activeTab === 'question_bank' && '🗂️ Banco de Temas'}
                  {activeTab === 'submissions' && '📥 Retorno dos Alunos'}
                  {activeTab === 'evaluations' && '🏆 Diário de Classe'}
                  {activeTab === 'students' && '👥 Carômetro'}
                  {activeTab === 'messages' && '💬 Central de Dúvidas'}
                  {activeTab === 'exam_generator' && '🎯 Simulados'}
                  {activeTab === 'essays' && '✍️ Redação'}
                  {activeTab === 'reports' && '📊 Análise de Progresso'}
                </span>
              </h2>
              <div className="text-slate-400 dark:text-slate-500 font-bold uppercase text-[10px] tracking-[0.25em] mt-2 flex items-center gap-2">
                 <ShieldCheck size={14} className="text-vibe-cyan"/>
                 {isSuper ? (
                   <span className="text-slate-500">Ambiente administrativo geral</span>
                 ) : (
                   <div className="flex items-center gap-2">
                     <span className="text-slate-500">Docente de</span>
                     <span className={`px-3 py-1 rounded-full text-white text-[10px] font-black tracking-widest shadow-md ${subjectsInfo[teacherSubject as Subject]?.gradient || subjectsInfo[teacherSubject as Subject]?.color || 'bg-slate-600'}`}>
                       {subjectsInfo[teacherSubject as Subject]?.icon} {subjectsInfo[teacherSubject as Subject]?.name || teacherSubject}
                     </span>
                   </div>
                 )}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
                {['students', 'submissions', 'evaluations', 'question_bank', 'lessons_list'].includes(activeTab) && (
                  <>
                    <div className="relative group">
                       <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-tocantins-blue transition-colors" size={16}/>
                       <input 
                         type="text" 
                         placeholder="Buscar por nome ou tema..."
                         value={searchTerm}
                         onChange={e => setSearchTerm(e.target.value)}
                         className="bg-white dark:bg-slate-900 border dark:border-slate-800 pl-12 pr-6 py-4 rounded-3xl text-sm font-bold text-slate-700 dark:text-slate-200 shadow-sm focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/20 outline-none w-64 transition-all"
                       />
                    </div>

                    <div className="flex items-center gap-2">
                       <div className="flex items-center gap-2 bg-white dark:bg-slate-900 border dark:border-slate-800 rounded-3xl px-4 py-2 shadow-sm">
                          <Filter size={14} className="text-slate-400"/>
                          <select 
                            value={filterGrade}
                            onChange={e => setFilterGrade(e.target.value)}
                            className="bg-transparent text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-300 outline-none cursor-pointer"
                          >
                             <option value="all">Série: Todas</option>
                             <option value="1">1ª Série</option>
                             <option value="2">2ª Série</option>
                             <option value="3">3ª Série</option>
                          </select>
                       </div>

                       <div className="flex items-center gap-2 bg-white dark:bg-slate-900 border dark:border-slate-800 rounded-3xl px-4 py-2 shadow-sm">
                          <Users size={14} className="text-slate-400"/>
                          <select 
                            value={filterClass}
                            onChange={e => setFilterClass(e.target.value)}
                            className="bg-transparent text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-300 outline-none cursor-pointer"
                          >
                             <option value="all">Turma: Todas</option>
                             {classOptions.map(c => <option key={c} value={c}>Turma: {c}</option>)}
                          </select>
                       </div>

                       <button 
                         onClick={handleRefresh}
                         disabled={isRefreshing}
                         className={`p-3 rounded-full bg-white dark:bg-slate-900 border dark:border-slate-800 shadow-sm transition-all hover:scale-110 active:scale-95 ${isRefreshing ? 'animate-spin cursor-not-allowed' : 'cursor-pointer hover:bg-slate-50'}`}
                         title="Atualizar Dados"
                       >
                         <RotateCw size={16} className="text-tocantins-blue dark:text-tocantins-yellow" />
                       </button>
                    </div>
                  </>
                )}
            </div>
          </header>

          {/* Conteúdo das Abas */}
          {activeTab === 'lessons_list' && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {curriculumData
                .filter(gradeData => filterGrade === 'all' || String(gradeData.id) === filterGrade)
                .map((gradeData, gIdx) => {
                  // Pra cada série, conta totais (aulas, com teoria, com atividade) — só na matéria do prof
                  const allowedSubjects: Subject[] = (isSuper
                    ? (['historia','geografia','sociologia','filosofia'] as Subject[])
                    : (teacherSubject ? [teacherSubject as Subject] : []));
                  const totalLessonsGrade = gradeData.bimesters.flatMap(b =>
                    b.lessons.filter(l => allowedSubjects.includes(l.subject as Subject))
                  );
                  const publishedTheoryGrade = totalLessonsGrade.filter(l => lessonOverrides?.[l.id]).length;
                  const publishedActivityGrade = totalLessonsGrade.filter(l => savedActivities.includes(l.id)).length;

                  return (
                    <details key={gIdx} className="bg-white dark:bg-slate-900 rounded-[32px] border dark:border-slate-800 shadow-sm overflow-hidden group/grade" open={filterGrade !== 'all'}>
                      <summary className="cursor-pointer p-5 sm:p-6 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors list-none flex items-center gap-4">
                        <div className="w-14 h-14 bg-gradient-cosmic rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-glow-purple ring-4 ring-purple-50 dark:ring-purple-900/10 shrink-0">
                          {gradeData.id}º
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg sm:text-xl font-black text-slate-800 dark:text-white tracking-tight font-display">
                            {gradeData.id}ª Série · {gradeData.title}
                          </h3>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">
                            {totalLessonsGrade.length} aulas · {publishedTheoryGrade} com teoria · {publishedActivityGrade} com atividade
                          </p>
                        </div>
                        <ChevronRight size={22} className="text-slate-300 dark:text-slate-700 group-open/grade:rotate-90 transition-transform shrink-0"/>
                      </summary>

                      <div className="border-t dark:border-slate-800 p-4 sm:p-6 space-y-3 bg-slate-50/40 dark:bg-slate-800/20">
                        {gradeData.bimesters.map((bimester, bIdx) => {
                          const bimesterLessons = bimester.lessons.filter(l => allowedSubjects.includes(l.subject as Subject));
                          if (bimesterLessons.length === 0) return null;
                          const bimPublishedTheory = bimesterLessons.filter(l => lessonOverrides?.[l.id]).length;
                          const bimPublishedAct = bimesterLessons.filter(l => savedActivities.includes(l.id)).length;

                          return (
                            <details key={bIdx} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden group/bim">
                              <summary className="cursor-pointer p-4 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors list-none flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-fire rounded-xl flex items-center justify-center text-white font-black text-sm shadow-md shrink-0">
                                  B{bimester.id}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="text-sm font-black text-slate-800 dark:text-slate-100 tracking-tight">
                                    {bimester.id}º Bimestre
                                  </h4>
                                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-0.5">
                                    {bimesterLessons.length} aulas · {bimPublishedTheory} com teoria · {bimPublishedAct} com atividade
                                  </p>
                                </div>
                                <ChevronRight size={18} className="text-slate-300 dark:text-slate-700 group-open/bim:rotate-90 transition-transform shrink-0"/>
                              </summary>

                              <div className="border-t dark:border-slate-800 p-3 space-y-3 bg-slate-50/30 dark:bg-slate-800/10">
                                {allowedSubjects.map((subjId) => {
                                  const lessonsOfSubj = bimesterLessons.filter(l => l.subject === subjId);
                                  if (lessonsOfSubj.length === 0) return null;
                                  return (
                                    <div key={subjId} className="space-y-2">
                                      <div className="flex items-center gap-2 px-1">
                                        <span className={`inline-flex items-center justify-center text-base ${subjectsInfo[subjId]?.color || 'bg-slate-400'} w-7 h-7 rounded-lg text-white shadow-sm`}>
                                          {subjectsInfo[subjId]?.icon}
                                        </span>
                                        <h5 className="text-[10px] font-black text-slate-700 dark:text-slate-200 uppercase tracking-widest">
                                          {subjectsInfo[subjId]?.name}
                                        </h5>
                                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">· {lessonsOfSubj.length} aulas</span>
                                      </div>

                                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                                        {lessonsOfSubj.map((lesson) => {
                                          const hasTheory = !!lessonOverrides?.[lesson.id];
                                          const hasActivity = savedActivities.includes(lesson.id);
                                          return (
                                            <div
                                              key={lesson.id}
                                              className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-100 dark:border-slate-800 hover:border-vibe-purple/30 transition-all group"
                                            >
                                              <div className="flex items-start justify-between gap-3">
                                                <div className="flex-1 min-w-0">
                                                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">{lesson.id}</p>
                                                  <h6 className="text-sm font-bold text-slate-800 dark:text-slate-100 leading-snug group-hover:text-vibe-purple transition-colors line-clamp-2">
                                                    {lessonOverrides?.[lesson.id]?.title || lesson.title}
                                                  </h6>
                                                </div>
                                                <div className="flex flex-col gap-1.5 shrink-0">
                                                  {hasTheory && (
                                                    <button
                                                      onClick={() => handleDeleteLessonOverride(lesson.id)}
                                                      className="p-2 bg-red-50 dark:bg-red-900/10 text-red-400 hover:text-red-600 rounded-lg border border-red-100 dark:border-red-900/30 transition-all"
                                                      title="Remover teoria postada"
                                                    >
                                                      <Trash2 size={14}/>
                                                    </button>
                                                  )}
                                                  <button
                                                    onClick={() => handleOpenLessonEditor(lesson)}
                                                    className={`p-2 rounded-lg border transition-all ${hasTheory ? 'bg-tocantins-blue text-white border-tocantins-blue shadow-md' : 'bg-white dark:bg-slate-800 text-slate-400 hover:text-tocantins-blue border-slate-200 dark:border-slate-700'}`}
                                                    title={hasTheory ? 'Editar teoria' : 'Adicionar teoria'}
                                                  >
                                                    <Presentation size={14}/>
                                                  </button>
                                                  <button
                                                    onClick={() => handleOpenActivityEditor(lesson)}
                                                    className={`p-2 rounded-lg border transition-all ${hasActivity ? 'bg-emerald-500 text-white border-emerald-500 shadow-md' : 'bg-white dark:bg-slate-800 text-slate-400 hover:text-vibe-purple border-slate-200 dark:border-slate-700'}`}
                                                    title={hasActivity ? 'Editar atividade' : 'Criar atividade'}
                                                  >
                                                    {hasActivity ? <CheckCircle2 size={14}/> : <ClipboardList size={14}/>}
                                                  </button>
                                                </div>
                                              </div>

                                              {hasActivity && (
                                                <div className="mt-3 pt-3 border-t border-dashed dark:border-slate-700 flex items-center justify-between">
                                                  <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest flex items-center gap-1">
                                                    <Save size={10}/> Publicada
                                                  </span>
                                                  <div className="flex gap-2">
                                                    <button
                                                      onClick={() => handleDownloadActivity(lesson)}
                                                      className="text-[9px] font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-300 uppercase tracking-widest transition-all"
                                                    >
                                                      Exportar
                                                    </button>
                                                    <button
                                                      onClick={() => handleDeleteActivity(lesson.id)}
                                                      className="text-[9px] font-bold text-red-500 hover:text-red-700 uppercase tracking-widest transition-all"
                                                    >
                                                      Limpar
                                                    </button>
                                                  </div>
                                                </div>
                                              )}
                                            </div>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </details>
                          );
                        })}
                      </div>
                    </details>
                  );
                })}
            </div>
          )}

          {activeTab === 'question_bank' && (() => {
            // === BANCO DE TEMAS — navegação em 3 níveis ===
            //   1) Disciplinas (cards das 4 matérias)
            //   2) Tópicos (cards com contagem de questões por tópico)
            //   3) Questões do tópico (lista expansível com ações)

            // Filtra questões pelo prof logado (se não-super)
            const visibleQs = questionBank.filter((q: any) => isSuper || !teacherSubject || q.subject === teacherSubject);

            // Agrupa por subject → topic
            const bySubject: Record<string, any[]> = {};
            visibleQs.forEach((q: any) => {
              const subj = q.subject || 'outros';
              if (!bySubject[subj]) bySubject[subj] = [];
              bySubject[subj].push(q);
            });

            const subjectsToShow = (Object.keys(subjectsInfo) as Subject[])
              .filter(s => isSuper || !teacherSubject || s === teacherSubject);

            // Tópicos da disciplina selecionada
            const topicsForSelected: Record<string, any[]> = {};
            if (bankSelectedSubject) {
              (bySubject[bankSelectedSubject] || []).forEach((q: any) => {
                const t = q.topic || 'Sem tópico';
                if (!topicsForSelected[t]) topicsForSelected[t] = [];
                topicsForSelected[t].push(q);
              });
            }

            const selectedSubjectInfo = bankSelectedSubject ? subjectsInfo[bankSelectedSubject as Subject] : null;

            return (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.25em]">
                  <button
                    onClick={() => { setBankSelectedSubject(null); setBankSelectedTopic(null); }}
                    className={`px-3 py-1.5 rounded-full transition-all ${!bankSelectedSubject ? 'bg-gradient-cosmic text-white shadow-glow-purple' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:scale-105'}`}
                  >
                    📚 Disciplinas
                  </button>
                  {bankSelectedSubject && (
                    <>
                      <span className="text-slate-400">›</span>
                      <button
                        onClick={() => setBankSelectedTopic(null)}
                        className={`px-3 py-1.5 rounded-full text-white shadow-md ${selectedSubjectInfo?.gradient || selectedSubjectInfo?.color}`}
                      >
                        {selectedSubjectInfo?.icon} {selectedSubjectInfo?.name}
                      </button>
                    </>
                  )}
                  {bankSelectedTopic && (
                    <>
                      <span className="text-slate-400">›</span>
                      <span className="px-3 py-1.5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 truncate max-w-md">
                        {bankSelectedTopic}
                      </span>
                    </>
                  )}
                </div>

                {/* NÍVEL 1: Disciplinas */}
                {!bankSelectedSubject && (
                  <>
                    <div className="text-center py-6">
                      <h2 className="text-3xl font-black tracking-tighter font-display mb-2">
                        <span className="text-gradient-cosmic">🗂️ Banco de Temas</span>
                      </h2>
                      <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">{visibleQs.length} questões salvas · escolha uma disciplina pra explorar</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {subjectsToShow.map((s) => {
                        const info = subjectsInfo[s];
                        const qs = bySubject[s] || [];
                        const topicCount = new Set(qs.map((q: any) => q.topic)).size;
                        return (
                          <button
                            key={s}
                            onClick={() => setBankSelectedSubject(s)}
                            disabled={qs.length === 0}
                            className={`relative overflow-hidden rounded-[32px] p-1 transition-all group ${
                              qs.length > 0
                                ? `${info.gradient || info.color} ${info.glow || 'shadow-xl'} hover:-translate-y-2 hover:scale-[1.02]`
                                : 'bg-slate-200/60 dark:bg-slate-800/60 opacity-60 cursor-not-allowed'
                            }`}
                          >
                            <div className="bg-white dark:bg-slate-900 rounded-[28px] p-6 text-left h-full">
                              <div className={`w-14 h-14 ${info.gradient || info.color} rounded-2xl flex items-center justify-center text-2xl mb-4 shadow-md ${qs.length === 0 && 'grayscale'} group-hover:rotate-6 group-hover:scale-110 transition-transform`}>
                                {info.icon}
                              </div>
                              <h3 className="text-lg font-black text-slate-800 dark:text-slate-100 font-display tracking-tight mb-1">{info.name}</h3>
                              {qs.length > 0 ? (
                                <p className="text-[10px] font-black uppercase tracking-widest text-vibe-purple">
                                  {qs.length} questões · {topicCount} tópicos
                                </p>
                              ) : (
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Banco vazio</p>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </>
                )}

                {/* NÍVEL 2: Tópicos da disciplina selecionada */}
                {bankSelectedSubject && !bankSelectedTopic && (
                  <div className={`relative overflow-hidden ${selectedSubjectInfo?.gradient || selectedSubjectInfo?.color} p-1 rounded-[36px] ${selectedSubjectInfo?.glow || 'shadow-xl'}`}>
                    <div className="bg-white dark:bg-slate-900 rounded-[32px] p-6">
                      <div className="flex items-center justify-between mb-5">
                        <div>
                          <h3 className="font-black text-slate-800 dark:text-white uppercase tracking-tight text-lg flex items-center gap-2">
                            <span className="text-2xl">{selectedSubjectInfo?.icon}</span> {selectedSubjectInfo?.name} · Tópicos
                          </h3>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">
                            {Object.keys(topicsForSelected).length} tópicos · {(bySubject[bankSelectedSubject] || []).length} questões
                          </p>
                        </div>
                        <button
                          onClick={() => setBankSelectedSubject(null)}
                          className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-vibe-pink transition-all px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800"
                        >
                          ← Voltar
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {Object.entries(topicsForSelected)
                          .sort(([a], [b]) => a.localeCompare(b, 'pt-BR'))
                          .map(([topic, qs]) => (
                          <button
                            key={topic}
                            onClick={() => setBankSelectedTopic(topic)}
                            className="text-left p-4 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-vibe-purple/40 transition-all group flex items-center justify-between gap-3"
                          >
                            <div className="min-w-0 flex-1">
                              <p className="font-black text-slate-800 dark:text-slate-100 text-sm leading-tight truncate group-hover:text-vibe-purple">{topic}</p>
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">
                                {qs.length} questões · {qs.filter(q => q.type === 'objective').length} obj · {qs.filter(q => q.type === 'discursive').length} disc
                              </p>
                            </div>
                            <ChevronRight className="text-slate-300 dark:text-slate-700 group-hover:text-vibe-pink group-hover:translate-x-1 transition-all shrink-0" size={18}/>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* NÍVEL 3: Questões do tópico */}
                {bankSelectedSubject && bankSelectedTopic && (
                  <div className="bg-white dark:bg-slate-900 rounded-[36px] border dark:border-slate-800 shadow-sm">
                    <div className="p-6 border-b dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/20">
                      <div className="min-w-0 flex-1">
                        <p className="text-[10px] font-black text-vibe-purple uppercase tracking-widest mb-1">{selectedSubjectInfo?.icon} {selectedSubjectInfo?.name}</p>
                        <h3 className="font-black text-slate-800 dark:text-white text-lg leading-tight tracking-tight truncate">{bankSelectedTopic}</h3>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">
                          {(topicsForSelected[bankSelectedTopic] || []).length} questões neste tópico
                        </p>
                      </div>
                      <button
                        onClick={() => setBankSelectedTopic(null)}
                        className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-vibe-pink transition-all px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 shrink-0"
                      >
                        ← Tópicos
                      </button>
                    </div>

                    <div className="divide-y dark:divide-slate-800">
                      {(topicsForSelected[bankSelectedTopic] || [])
                        .filter(q => searchTerm === '' || q.question_text.toLowerCase().includes(searchTerm.toLowerCase()))
                        .map((q: any, idx: number) => (
                        <details key={q.id} className="group">
                          <summary className="cursor-pointer p-5 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors list-none flex items-start gap-3">
                            <span className="bg-gradient-cosmic text-white w-7 h-7 rounded-lg flex items-center justify-center font-black text-xs shrink-0">{idx + 1}</span>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest ${q.type === 'objective' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400'}`}>
                                  {q.type === 'objective' ? 'OBJETIVA' : 'DISCURSIVA'}
                                </span>
                                {q.difficulty && <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{q.difficulty}</span>}
                              </div>
                              <p className="text-sm font-bold text-slate-700 dark:text-slate-200 leading-snug line-clamp-2">{q.question_text}</p>
                            </div>
                            <ChevronRight size={16} className="text-slate-300 dark:text-slate-700 group-open:rotate-90 transition-transform shrink-0 mt-1"/>
                          </summary>

                          {/* Conteúdo expandido */}
                          <div className="px-5 pb-5 pl-[68px] space-y-3">
                            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">{q.question_text}</p>

                            {q.type === 'objective' && q.options && (
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {['a','b','c','d','e'].map(key => {
                                  const val = q.options?.[key];
                                  if (!val) return null;
                                  const isCorrect = key === q.correct_option;
                                  return (
                                    <div key={key} className={`p-3 rounded-xl text-xs font-medium border flex items-center gap-3 ${isCorrect ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300' : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'}`}>
                                      <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-black uppercase shrink-0 ${isCorrect ? 'bg-emerald-500 text-white' : 'bg-white dark:bg-slate-900 text-slate-400'}`}>{key}</span>
                                      <span className="leading-snug">{val}</span>
                                    </div>
                                  );
                                })}
                              </div>
                            )}

                            {q.explanation && (
                              <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-xl p-3">
                                <p className="text-[9px] font-black text-blue-700 dark:text-blue-300 uppercase tracking-widest mb-1">💡 Comentário</p>
                                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">{q.explanation}</p>
                              </div>
                            )}

                            <div className="flex flex-wrap items-center gap-2 pt-2">
                              <button
                                onClick={() => { setReuseModalQuestion(q); setReuseTargetLessonId(''); }}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-vibe text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-glow-purple hover:scale-105 transition-all"
                              >
                                ♻️ Reutilizar em outra aula
                              </button>
                              <button
                                onClick={() => handleDeleteQuestion(q.id)}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-xl font-black text-[10px] uppercase tracking-widest border border-red-200 dark:border-red-800/40 transition-all"
                              >
                                <Trash2 size={12}/> Excluir
                              </button>
                              {q.lesson_id && (
                                <span className="ml-auto text-[9px] font-black text-slate-400 uppercase tracking-widest">
                                  Vinculada a: {q.lesson_id}
                                </span>
                              )}
                            </div>
                          </div>
                        </details>
                      ))}
                    </div>
                  </div>
                )}

                {/* Empty state global */}
                {visibleQs.length === 0 && (
                  <div className="bg-white dark:bg-slate-900 rounded-[40px] border-2 border-dashed dark:border-slate-800 p-12 text-center">
                    <Database className="mx-auto text-slate-300 dark:text-slate-700 mb-3" size={40}/>
                    <p className="font-black text-slate-700 dark:text-slate-200 tracking-tight">Banco vazio</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">
                      Vá em <strong>Plano de Aulas</strong> → escolha uma aula → <strong>Editar Atividade</strong> para começar a cadastrar questões.
                    </p>
                  </div>
                )}
              </div>
            );
          })()}

          {activeTab === 'submissions' && (() => {
            // Agrupa submissões por estudante (id → nome+turma fallback)
            const grouped: Record<string, { key: string; name: string; school_class: string; subs: any[] }> = {};
            filteredSubmissions.forEach((sub: any) => {
              const key = sub.student_id || `name:${(sub.student_name || 'sem-nome').toLowerCase().trim()}`;
              if (!grouped[key]) {
                grouped[key] = {
                  key,
                  name: sub.student_name || '—',
                  school_class: sub.school_class || '—',
                  subs: [],
                };
              }
              grouped[key].subs.push(sub);
            });
            const groups = Object.values(grouped).sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));

            return (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center justify-between px-2">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    {groups.length} {groups.length === 1 ? 'estudante' : 'estudantes'} · {filteredSubmissions.length} entregas
                  </p>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest hidden sm:block">
                    Clique no estudante para expandir
                  </p>
                </div>

                {groups.length === 0 ? (
                  <div className="bg-white dark:bg-slate-900 rounded-[40px] border-2 border-dashed dark:border-slate-800 p-12 text-center">
                    <FileText className="mx-auto text-slate-300 dark:text-slate-700 mb-3" size={40}/>
                    <p className="font-black text-slate-700 dark:text-slate-200 tracking-tight">Nenhuma submissão</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">Os envios aparecerão aqui quando os alunos terminarem suas atividades.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {groups.map((g, gIdx) => {
                      const sortedSubs = [...g.subs].sort((a, b) => {
                        const ta = new Date(a.submitted_at || a.submission_date || 0).getTime();
                        const tb = new Date(b.submitted_at || b.submission_date || 0).getTime();
                        return tb - ta;
                      });
                      const totalScore = sortedSubs.reduce((acc, s) => acc + (Number(s.score) || 0), 0);
                      const avgScore = sortedSubs.length > 0 ? totalScore / sortedSubs.length : 0;
                      const avgClass = avgScore >= 7 ? 'bg-emerald-100 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400' : avgScore >= 5 ? 'bg-amber-100 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400' : 'bg-red-100 dark:bg-red-950/30 text-red-600 dark:text-red-400';
                      const studentId = g.key.startsWith('name:') ? undefined : g.key;
                      // Última entrega + quantas ainda sem feedback do prof
                      const lastDate = sortedSubs[0]?.submitted_at || sortedSubs[0]?.submission_date;
                      const pendingFeedback = sortedSubs.filter(s => !s.teacher_feedback).length;

                      return (
                        <details key={g.key} className="bg-white dark:bg-slate-900 rounded-3xl border dark:border-slate-800 shadow-sm group overflow-hidden" open={gIdx === 0 && groups.length === 1}>
                          <summary className="cursor-pointer p-4 sm:p-5 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors list-none flex items-center gap-3 sm:gap-4">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest w-6 text-center shrink-0">{gIdx + 1}</span>
                            <div className="w-11 h-11 rounded-xl overflow-hidden shadow-sm ring-2 ring-slate-100 dark:ring-slate-800 shrink-0">
                              <StudentAvatar studentId={studentId} studentName={g.name} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-black text-slate-800 dark:text-slate-100 text-sm truncate">{g.name}</p>
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-0.5">
                                Turma {g.school_class} · {sortedSubs.length} {sortedSubs.length === 1 ? 'entrega' : 'entregas'}
                                {pendingFeedback > 0 && <span className="text-amber-600 dark:text-amber-400"> · {pendingFeedback} sem feedback</span>}
                                {lastDate && ` · última em ${new Date(lastDate).toLocaleDateString('pt-BR')}`}
                              </p>
                            </div>
                            <div className="hidden sm:flex flex-col items-end gap-0.5 shrink-0">
                              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Média</p>
                              <span className={`px-3 py-1 rounded-full text-xs font-black ${avgClass}`}>
                                {avgScore.toFixed(1)} / 10
                              </span>
                            </div>
                            <ChevronRight size={18} className="text-slate-300 dark:text-slate-700 group-open:rotate-90 transition-transform shrink-0"/>
                          </summary>

                          {/* Conteúdo expandido — lista de entregas */}
                          <div className="border-t dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20">
                            <div className="divide-y dark:divide-slate-800">
                              {sortedSubs.map((sub: any) => {
                                const isEssay = sub.ai_feedback?.type === 'essay_enem' || String(sub.lesson_title || '').startsWith('Redação:');
                                const isExam = !isEssay && (String(sub.lesson_title || '').toLowerCase().includes('avaliação bimestral') || String(sub.lesson_title || '').toLowerCase().includes('simulado'));
                                const score = Number(sub.score) || 0;
                                const scoreClass = score >= 7 ? 'bg-emerald-100 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400' : score >= 5 ? 'bg-amber-100 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400' : 'bg-red-100 dark:bg-red-950/30 text-red-600 dark:text-red-400';
                                const subjInfo = subjectsInfo[sub.subject as Subject];
                                return (
                                  <div key={sub.id} className="p-4 sm:p-5 flex items-center gap-3 sm:gap-4 hover:bg-white dark:hover:bg-slate-900 transition-colors">
                                    {/* Tipo (badge) */}
                                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-white shrink-0 shadow-sm ${isEssay ? 'bg-gradient-fire' : isExam ? 'bg-gradient-cosmic' : (subjInfo?.gradient || subjInfo?.color || 'bg-slate-400')}`}>
                                      <span className="text-base">{isEssay ? '✍️' : isExam ? '🎯' : subjInfo?.icon || '📚'}</span>
                                    </div>
                                    {/* Título + matéria + data */}
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center gap-2 mb-0.5">
                                        {isEssay && <span className="px-1.5 py-0.5 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded text-[8px] font-black uppercase tracking-widest shrink-0">Redação</span>}
                                        {isExam && <span className="px-1.5 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded text-[8px] font-black uppercase tracking-widest shrink-0">Simulado</span>}
                                        {!sub.teacher_feedback && !isEssay && <span className="px-1.5 py-0.5 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded text-[8px] font-black uppercase tracking-widest shrink-0">Pendente</span>}
                                      </div>
                                      <p className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200 leading-tight truncate">{sub.lesson_title}</p>
                                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-0.5">
                                        {subjInfo?.name || sub.subject} · {sub.submitted_at ? new Date(sub.submitted_at).toLocaleDateString('pt-BR') : (sub.submission_date ? new Date(sub.submission_date).toLocaleDateString('pt-BR') : '—')}
                                      </p>
                                    </div>
                                    {/* Nota */}
                                    <div className={`hidden sm:inline-flex items-center px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest shrink-0 ${scoreClass}`}>
                                      {score.toFixed(1)} / 10
                                    </div>
                                    {/* Botão Avaliar */}
                                    <button
                                      onClick={() => {
                                        setViewingSubmission(sub);
                                        setManualFeedback(sub.teacher_feedback || '');
                                      }}
                                      className="flex items-center gap-1.5 px-3 py-2 bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-xl text-vibe-purple hover:bg-gradient-vibe hover:text-white hover:border-transparent transition-all cursor-pointer font-black text-[10px] uppercase tracking-widest shrink-0"
                                    >
                                      <Eye size={14}/> <span className="hidden sm:inline">Avaliar</span>
                                    </button>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </details>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })()}

          {activeTab === 'evaluations' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
               <div className="bg-white dark:bg-slate-900 rounded-[40px] border dark:border-slate-800 p-8 shadow-sm">
                  <div className="flex items-center justify-between mb-8">
                     <div>
                        <h2 className="font-black text-slate-800 dark:text-white uppercase tracking-tighter text-xl">Mapa de Aproveitamento</h2>
                        <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1">Consolidado de desempenho por estudante</p>
                     </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                     {studentsWithSubmissions.length === 0 ? (
                       <div className="col-span-full py-20 text-center">
                         <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 opacity-50">
                           <Users size={32} className="text-slate-400" />
                         </div>
                         <p className="text-slate-400 dark:text-slate-500 font-bold uppercase text-[10px] tracking-widest">Nenhum estudante encontrado com submissões nesta turma/série.</p>
                       </div>
                     ) : (
                       studentsWithSubmissions.map((s: any) => (
                        <button 
                          key={s.id} 
                          onClick={() => setSelectedStudentEval(s)}
                          className="w-full text-left bg-slate-50 dark:bg-slate-800/50 p-6 rounded-[32px] border border-slate-100 dark:border-slate-800 flex flex-col gap-4 group hover:border-tocantins-blue/30 hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer"
                        >
                           <div className="flex items-center gap-4">
                             <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-md ring-4 ring-white dark:ring-slate-900">
                                <StudentAvatar studentId={s.id} studentName={s.name} />
                             </div>
                             <div className="flex-1 min-w-0">
                                <h4 className="font-black text-slate-800 dark:text-slate-100 truncate text-sm uppercase tracking-tight">{s.name}</h4>
                                <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">{s.grade}ª Série • {s.school_class}</span>
                             </div>
                           </div>

                           <div className="grid grid-cols-4 gap-2 mt-2">
                             {[1, 2, 3, 4].map(b => (
                               <div key={b} className="bg-white dark:bg-slate-900 p-2 rounded-xl border dark:border-slate-800 text-center">
                                 <p className="text-[8px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-tighter">B{b}</p>
                                 <p className={`text-[10px] font-bold ${s.bimesterGrades?.[b] > 0 ? 'text-tocantins-blue dark:text-tocantins-yellow' : 'text-slate-300 dark:text-slate-700'}`}>
                                   {s.bimesterGrades?.[b]?.toFixed(1) || '0.0'}
                                 </p>
                               </div>
                             ))}
                           </div>

                           <div className="pt-4 border-t dark:border-slate-800 flex justify-between items-center">
                             <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                               {s.submissionCount} Atividades
                             </span>
                             <div className="flex items-center gap-1 text-emerald-500">
                               <Award size={14} />
                               <span className="text-xs font-black">
                                 {(Object.values(s.bimesterGrades || {}) as number[]).reduce((a, b) => a + b, 0).toFixed(1)}
                               </span>
                             </div>
                           </div>
                        </button>
                      ))
                     )}
                  </div>
               </div>
            </div>
          )}

          {activeTab === 'students' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
               <div className="flex justify-end gap-2 mb-4">
                  {isSuper && (
                    <button 
                      onClick={handleSeedStudents}
                      disabled={isSeedingStudents}
                      className="flex items-center gap-2 px-6 py-3 bg-emerald-500 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-600 transition-all cursor-pointer shadow-lg shadow-emerald-500/20 disabled:opacity-50"
                    >
                      {isSeedingStudents ? <Loader2 className="animate-spin" size={16}/> : <Users size={16}/>}
                      Sincronizar Estudantes
                    </button>
                  )}
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                 {filteredStudents.map((st: any) => (
                   <div key={st.id} className="bg-white dark:bg-slate-900 p-6 rounded-[32px] border dark:border-slate-800 shadow-sm group hover:shadow-xl transition-all">
                      <div className="flex flex-col items-center text-center">
                         <button
                           onClick={() => openNotesModal(st)}
                           title="Clique para anotar comportamento, destaques, observações"
                           className="w-20 h-20 rounded-3xl overflow-hidden mb-4 shadow-lg ring-4 ring-slate-50 dark:ring-slate-800 group-hover:scale-110 transition-transform cursor-pointer hover:ring-tocantins-blue dark:hover:ring-tocantins-yellow relative"
                         >
                            <StudentAvatar studentId={st.id} studentName={st.name} />
                            <span className="absolute inset-0 bg-tocantins-blue/0 hover:bg-tocantins-blue/30 dark:hover:bg-tocantins-yellow/30 transition-colors flex items-center justify-center opacity-0 hover:opacity-100">
                              <Pencil size={20} className="text-white drop-shadow-lg"/>
                            </span>
                         </button>
                         <h4 className="font-black text-slate-800 dark:text-white uppercase tracking-tighter text-sm mb-1">{st.name}</h4>
                         <span className="text-[10px] font-black text-tocantins-blue dark:text-tocantins-yellow uppercase tracking-widest">{st.grade}ª Série • {st.school_class}</span>

                         <div className="mt-4 flex gap-2">
                            <button
                              onClick={() => openNotesModal(st)}
                              title="Anotações sobre o estudante"
                              className="p-2 text-slate-400 hover:text-tocantins-blue dark:hover:text-tocantins-yellow transition-colors cursor-pointer"
                            >
                               <Pencil size={18}/>
                            </button>
                            <button
                              onClick={() => {
                                setSelectedChatStudentId(st.id);
                                setActiveTab('messages');
                              }}
                              title="Conversar com o estudante"
                              className="p-2 text-slate-400 hover:text-tocantins-blue dark:hover:text-tocantins-yellow transition-colors cursor-pointer"
                            >
                               <MessageSquare size={18}/>
                            </button>
                         </div>
                      </div>
                   </div>
                 ))}
               </div>
            </div>
          )}

          {activeTab === 'messages' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500 h-[calc(100vh-250px)]">
               {/* Lista de Conversas */}
               <div className="bg-white dark:bg-slate-900 rounded-[40px] border dark:border-slate-800 overflow-hidden flex flex-col shadow-sm">
                  <div className="p-6 border-b dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20">
                     <h3 className="font-black text-slate-800 dark:text-white uppercase tracking-widest text-xs">Conversas Ativas</h3>
                  </div>
                  <div className="flex-1 overflow-y-auto">
                     {chatSessions.length === 0 ? (
                       <div className="p-8 text-center text-slate-400 font-bold uppercase text-[10px] tracking-widest">Nenhuma mensagem recebida.</div>
                     ) : (
                       chatSessions.map((chat: any) => (
                         <button 
                           key={chat.studentId}
                           onClick={() => setSelectedChatStudentId(chat.studentId)}
                           className={`w-full p-6 flex items-center gap-4 text-left border-b dark:border-slate-800 transition-all ${selectedChatStudentId === chat.studentId ? 'bg-tocantins-blue/5 dark:bg-tocantins-yellow/5 border-l-4 border-l-tocantins-blue dark:border-l-tocantins-yellow' : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}
                         >
                            <div className="w-12 h-12 rounded-2xl overflow-hidden shadow-sm">
                               <StudentAvatar studentName={chat.studentName} studentId={chat.studentId} />
                            </div>
                            <div className="flex-1 min-w-0">
                               <h4 className="font-bold text-slate-800 dark:text-slate-100 text-sm truncate uppercase tracking-tight">{chat.studentName}</h4>
                               <p className="text-xs text-slate-400 truncate mt-1">{chat.lastMessage}</p>
                            </div>
                         </button>
                       ))
                     )}
                  </div>
               </div>

               {/* Chat Aberto */}
               <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-[40px] border dark:border-slate-800 overflow-hidden flex flex-col shadow-sm">
                   {selectedChatStudentId ? (
                     <>
                       <div className="p-6 border-b dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/50">
                          <div className="flex items-center gap-3">
                             <div className="w-10 h-10 rounded-xl overflow-hidden shadow-sm">
                                <StudentAvatar 
                                  studentName={students.find(s => s.id === selectedChatStudentId)?.name || 'Estudante'} 
                                  studentId={selectedChatStudentId}
                                />
                             </div>
                             <div>
                                <h3 className="font-bold text-slate-800 dark:text-white uppercase tracking-tight text-sm">
                                  {students.find(s => s.id === selectedChatStudentId)?.name || 'Estudante'}
                                </h3>
                                <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">Online para suporte</p>
                             </div>
                          </div>
                       </div>

                       <div className="flex-1 overflow-y-auto p-8 space-y-4">
                          {selectedChatMessages.map((msg: any) => (
                            <div key={msg.id} className={`flex ${msg.is_from_teacher ? 'justify-end' : 'justify-start'}`}>
                               <div className={`max-w-[70%] p-4 rounded-3xl text-sm font-bold shadow-sm ${
                                 msg.is_from_teacher 
                                   ? 'bg-tocantins-blue text-white rounded-tr-none' 
                                   : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-tl-none'
                               }`}>
                                  {msg.content}
                                  <div className={`text-[9px] mt-1 uppercase font-black tracking-widest ${msg.is_from_teacher ? 'text-white/50' : 'text-slate-400'}`}>
                                     {msg.created_at?.toDate ? msg.created_at.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '...'}
                                  </div>
                               </div>
                            </div>
                          ))}
                          <div ref={chatEndRef} />
                       </div>

                       <div className="p-6 border-t dark:border-slate-800">
                          <form onSubmit={handleSendMessage} className="flex gap-4">
                             <input 
                               type="text" 
                               value={teacherReplyText}
                               onChange={e => setTeacherReplyText(e.target.value)}
                               placeholder="Digite sua orientação pedagógica..."
                               className="flex-1 bg-slate-50 dark:bg-slate-800/50 border dark:border-slate-700 rounded-2xl px-6 py-4 text-sm font-bold text-slate-700 dark:text-slate-200 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/10 outline-none"
                             />
                             <button 
                               type="submit"
                               disabled={isSendingReply || !teacherReplyText.trim()}
                               className="bg-tocantins-blue dark:bg-tocantins-yellow text-white dark:text-slate-950 p-4 rounded-2xl shadow-lg hover:scale-105 transition-all disabled:opacity-50 cursor-pointer"
                             >
                                <Send size={24}/>
                             </button>
                          </form>
                       </div>
                     </>
                   ) : (
                     <div className="flex-1 flex flex-col items-center justify-center text-slate-400 text-center p-12">
                        <MessageSquare size={64} className="mb-4 opacity-20"/>
                        <p className="font-black uppercase tracking-widest text-[10px]">Selecione um estudante ao lado para iniciar a tutoria.</p>
                     </div>
                   )}
               </div>
            </div>
          )}

          {activeTab === 'exam_generator' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto">
              {/* MÓDULO 1: META + IA opcional */}
              <div className="bg-white dark:bg-slate-900 rounded-[40px] border dark:border-slate-800 p-8 shadow-sm">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-tocantins-blue/10 dark:bg-tocantins-yellow/10 rounded-2xl flex items-center justify-center text-tocantins-blue dark:text-tocantins-yellow shadow-inner">
                    <ClipboardEdit size={24}/>
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-slate-800 dark:text-white uppercase tracking-tighter">Compor Simulado Bimestral</h2>
                    <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1">Crie manualmente as questões. Ao publicar, vira avaliação para os alunos.</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Título do simulado (ex.: Simulado: Indivíduo e Sociedade)"
                    value={examTitle}
                    onChange={e => setExamTitle(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border dark:border-slate-700 rounded-2xl px-5 py-4 text-sm font-bold text-slate-700 dark:text-slate-200 outline-none focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/10"
                  />
                  <input
                    type="text"
                    placeholder="Tópicos do bimestre (separados por vírgula)"
                    value={examTopics}
                    onChange={e => setExamTopics(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border dark:border-slate-700 rounded-2xl px-5 py-4 text-sm font-bold text-slate-700 dark:text-slate-200 outline-none focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/10"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <select value={examGrade} onChange={e => setExamGrade(e.target.value)} className="bg-slate-50 dark:bg-slate-800 border dark:border-slate-700 rounded-2xl px-4 py-4 text-sm font-bold text-slate-700 dark:text-slate-200 outline-none">
                      <option value="1">1ª Série</option><option value="2">2ª Série</option><option value="3">3ª Série</option>
                    </select>
                    <select value={examBimester} onChange={e => setExamBimester(e.target.value)} className="bg-slate-50 dark:bg-slate-800 border dark:border-slate-700 rounded-2xl px-4 py-4 text-sm font-bold text-slate-700 dark:text-slate-200 outline-none">
                      <option value="1">1º Bimestre</option><option value="2">2º Bimestre</option><option value="3">3º Bimestre</option><option value="4">4º Bimestre</option>
                    </select>
                    <select value={examClass} onChange={e => setExamClass(e.target.value)} className="bg-slate-50 dark:bg-slate-800 border dark:border-slate-700 rounded-2xl px-4 py-4 text-sm font-bold text-slate-700 dark:text-slate-200 outline-none">
                      <option value="all">Todas as Turmas</option>
                      {classOptions.map(c => <option key={c} value={c}>Turma {c}</option>)}
                    </select>
                  </div>
                  <button
                    onClick={handleGenerateExam}
                    disabled={isGeneratingExam}
                    className="w-full bg-tocantins-blue/10 dark:bg-tocantins-yellow/10 text-tocantins-blue dark:text-tocantins-yellow py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-tocantins-blue/20 dark:hover:bg-tocantins-yellow/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isGeneratingExam ? <Loader2 className="animate-spin" size={14}/> : <Sparkles size={14}/>}
                    {isGeneratingExam ? 'Pedindo sugestão à IA...' : 'Sugerir questões com IA (opcional, baseado nos tópicos)'}
                  </button>
                </div>
              </div>

              {/* MÓDULO 2: Editor de questão */}
              <div className="bg-white dark:bg-slate-900 rounded-[40px] border dark:border-slate-800 p-8 shadow-sm">
                <h3 className="font-black text-slate-800 dark:text-white uppercase text-sm tracking-tight mb-6 flex items-center gap-2">
                  <Pencil size={16}/> Adicionar Questão
                </h3>
                <div className="space-y-3">
                  <div className="flex gap-2">
                    {(['objective','discursive'] as const).map(t => (
                      <button
                        key={t}
                        onClick={() => setExamNewQuestion({...examNewQuestion, type: t})}
                        className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${examNewQuestion.type === t ? 'bg-tocantins-blue text-white border-tocantins-blue' : 'bg-white dark:bg-slate-800 text-slate-400 dark:text-slate-500 border-slate-200 dark:border-slate-700'}`}
                      >
                        {t === 'objective' ? 'Objetiva (A-E)' : 'Discursiva'}
                      </button>
                    ))}
                  </div>

                  <textarea
                    placeholder="Texto-base / fragmento (opcional)"
                    rows={3}
                    value={examNewQuestion.textFragment}
                    onChange={e => setExamNewQuestion({...examNewQuestion, textFragment: e.target.value})}
                    className="w-full bg-slate-50 dark:bg-slate-800 border dark:border-slate-700 rounded-2xl px-4 py-3 text-sm text-slate-700 dark:text-slate-200 outline-none italic"
                  />

                  <textarea
                    placeholder="Enunciado da questão"
                    rows={3}
                    value={examNewQuestion.questionText}
                    onChange={e => setExamNewQuestion({...examNewQuestion, questionText: e.target.value})}
                    className="w-full bg-slate-50 dark:bg-slate-800 border dark:border-slate-700 rounded-2xl px-4 py-3 text-sm font-bold text-slate-700 dark:text-slate-200 outline-none"
                  />

                  {examNewQuestion.type === 'objective' && (
                    <div className="space-y-2">
                      {(['a','b','c','d','e'] as const).map(letter => (
                        <div key={letter} className="flex gap-2 items-center">
                          <button
                            onClick={() => setExamNewQuestion({...examNewQuestion, correctOption: letter})}
                            className={`w-10 h-10 rounded-xl font-black text-xs uppercase shrink-0 transition-all ${examNewQuestion.correctOption === letter ? 'bg-emerald-500 text-white shadow-lg' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}
                            title="Marcar como correta"
                          >
                            {letter}
                          </button>
                          <input
                            type="text"
                            placeholder={`Alternativa ${letter.toUpperCase()}`}
                            value={examNewQuestion.options[letter]}
                            onChange={e => setExamNewQuestion({...examNewQuestion, options: {...examNewQuestion.options, [letter]: e.target.value}})}
                            className="flex-1 bg-slate-50 dark:bg-slate-800 border dark:border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-700 dark:text-slate-200 outline-none"
                          />
                        </div>
                      ))}
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest pl-1">Clique na letra para marcar a resposta correta</p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <select
                      value={examNewQuestion.difficulty}
                      onChange={e => setExamNewQuestion({...examNewQuestion, difficulty: e.target.value})}
                      className="bg-slate-50 dark:bg-slate-800 border dark:border-slate-700 rounded-2xl px-4 py-3 text-sm font-bold text-slate-700 dark:text-slate-200 outline-none"
                    >
                      <option value="Fácil">Dificuldade: Fácil</option>
                      <option value="Médio">Dificuldade: Médio</option>
                      <option value="Difícil">Dificuldade: Difícil</option>
                    </select>
                    <input
                      type="text"
                      placeholder="Comentário pedagógico (opcional)"
                      value={examNewQuestion.explanation}
                      onChange={e => setExamNewQuestion({...examNewQuestion, explanation: e.target.value})}
                      className="bg-slate-50 dark:bg-slate-800 border dark:border-slate-700 rounded-2xl px-4 py-3 text-sm text-slate-700 dark:text-slate-200 outline-none"
                    />
                  </div>

                  <button
                    onClick={handleAddExamQuestion}
                    className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-950 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 size={14}/> Adicionar ao Simulado
                  </button>
                </div>
              </div>

              {/* MÓDULO 3: Lista de questões no rascunho */}
              {examQuestionsDraft.length > 0 && (
                <div className="bg-white dark:bg-slate-900 rounded-[40px] border dark:border-slate-800 p-8 shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="font-black text-slate-800 dark:text-white uppercase text-sm tracking-tight">Questões do Simulado</h3>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{examQuestionsDraft.length} questões adicionadas</p>
                    </div>
                    <button
                      onClick={handlePublishExam}
                      disabled={isPublishingExam}
                      className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-2 disabled:opacity-50"
                    >
                      {isPublishingExam ? <Loader2 className="animate-spin" size={14}/> : <Send size={14}/>}
                      Publicar para Alunos
                    </button>
                  </div>

                  <div className="space-y-3">
                    {examQuestionsDraft.map((q, idx) => (
                      <div key={idx} className="bg-slate-50 dark:bg-slate-800/50 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 flex gap-4 items-start">
                        <span className="bg-tocantins-blue text-white w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs shrink-0">{idx + 1}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`px-2 py-1 rounded text-[8px] font-black uppercase tracking-widest ${q.type === 'objective' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400'}`}>
                              {q.type === 'objective' ? 'OBJETIVA' : 'DISCURSIVA'}
                            </span>
                            <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{q.difficulty}</span>
                          </div>
                          {q.textFragment && <p className="text-xs italic text-slate-500 mb-2 line-clamp-2">"{q.textFragment}"</p>}
                          <p className="text-sm font-bold text-slate-700 dark:text-slate-200 leading-tight">{q.questionText}</p>
                          {q.type === 'objective' && (
                            <p className="text-[10px] font-black text-emerald-500 mt-2 uppercase tracking-widest">Resposta: opção {q.correctOption?.toUpperCase()}</p>
                          )}
                        </div>
                        <button
                          onClick={() => handleRemoveExamQuestion(idx)}
                          className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                          title="Remover"
                        >
                          <Trash2 size={16}/>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* MÓDULO 4: Simulados publicados */}
              {publishedExams.length > 0 && (
                <div className="bg-white dark:bg-slate-900 rounded-[40px] border dark:border-slate-800 p-8 shadow-sm">
                  <h3 className="font-black text-slate-800 dark:text-white uppercase text-sm tracking-tight mb-6 flex items-center gap-2">
                    <Library size={16}/> Simulados Publicados ({publishedExams.length})
                  </h3>
                  <div className="space-y-3">
                    {publishedExams.map((exam: any) => (
                      <div key={exam.id} className="bg-slate-50 dark:bg-slate-800/50 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4 flex-1 min-w-0">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-md ${subjectsInfo[exam.subject as Subject]?.color || 'bg-slate-500'}`}>
                            <Award size={20}/>
                          </div>
                          <div className="min-w-0">
                            <p className="font-bold text-slate-800 dark:text-slate-100 text-sm truncate">
                              {exam.title || `Simulado ${subjectsInfo[exam.subject as Subject]?.name || exam.subject}`}
                            </p>
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                              {exam.bimester}º Bimestre • {exam.grade}ª Série • {exam.school_class || 'Todas as turmas'} • {(exam.questions?.length || 0)} questões
                              {exam.created_at && ` • ${new Date(exam.created_at).toLocaleDateString('pt-BR')}`}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleDeletePublishedExam(exam.id)}
                          className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                          title="Excluir simulado"
                        >
                          <Trash2 size={16}/>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'essays' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-3xl mx-auto">
              {/* Editor */}
              <div className="relative overflow-hidden bg-gradient-fire p-1 rounded-[40px] shadow-glow-orange">
                <div className="bg-white dark:bg-slate-900 rounded-[36px] p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-fire rounded-2xl flex items-center justify-center text-white shadow-glow-orange shrink-0">
                      <Pencil size={22}/>
                    </div>
                    <div>
                      <h2 className="text-2xl font-black tracking-tighter font-display">
                        <span className="text-gradient-sunset">✍️ Nova Redação</span>
                      </h2>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] mt-1">Crie só o título; o aluno escreve em 30 linhas</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2 mb-1 block">Título da Redação</label>
                      <input
                        type="text"
                        placeholder='Ex.: "O papel da juventude na transformação social"'
                        value={essayTitle}
                        onChange={e => setEssayTitle(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-800 border dark:border-slate-700 rounded-2xl px-5 py-4 text-sm font-bold text-slate-700 dark:text-slate-200 outline-none focus:ring-4 focus:ring-orange-100"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2 mb-1 block">Instruções (opcional)</label>
                      <textarea
                        placeholder="Orientações pro aluno (gênero textual, perspectiva, número de linhas mínimo etc.)…"
                        rows={3}
                        value={essayInstructions}
                        onChange={e => setEssayInstructions(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-800 border dark:border-slate-700 rounded-2xl px-5 py-3 text-sm text-slate-700 dark:text-slate-200 outline-none focus:ring-4 focus:ring-orange-100"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <select value={essayGrade} onChange={e => setEssayGrade(e.target.value)} className="bg-slate-50 dark:bg-slate-800 border dark:border-slate-700 rounded-2xl px-4 py-4 text-sm font-bold text-slate-700 dark:text-slate-200 outline-none">
                        <option value="1">1ª Série</option>
                        <option value="2">2ª Série</option>
                        <option value="3">3ª Série</option>
                      </select>
                      <select value={essayBimester} onChange={e => setEssayBimester(e.target.value)} className="bg-slate-50 dark:bg-slate-800 border dark:border-slate-700 rounded-2xl px-4 py-4 text-sm font-bold text-slate-700 dark:text-slate-200 outline-none">
                        <option value="1">1º Bimestre</option>
                        <option value="2">2º Bimestre</option>
                        <option value="3">3º Bimestre</option>
                        <option value="4">4º Bimestre</option>
                      </select>
                      <select value={essayClass} onChange={e => setEssayClass(e.target.value)} className="bg-slate-50 dark:bg-slate-800 border dark:border-slate-700 rounded-2xl px-4 py-4 text-sm font-bold text-slate-700 dark:text-slate-200 outline-none">
                        <option value="all">Todas as Turmas</option>
                        {classOptions.map(c => <option key={c} value={c}>Turma {c}</option>)}
                      </select>
                    </div>

                    <button
                      onClick={handlePublishEssay}
                      disabled={isPublishingEssay || !essayTitle.trim()}
                      className="w-full bg-gradient-vibe text-white py-5 rounded-2xl font-black uppercase text-xs tracking-[0.25em] shadow-glow-purple hover:scale-[1.02] hover:shadow-glow-pink transition-all flex items-center justify-center gap-3 disabled:opacity-50 cursor-pointer"
                    >
                      {isPublishingEssay ? <Loader2 className="animate-spin" size={18}/> : <Send size={18}/>}
                      ✨ Publicar Redação para Alunos
                    </button>
                  </div>
                </div>
              </div>

              {/* Aviso de segurança */}
              <div className="bg-amber-50 dark:bg-amber-900/10 border-2 border-amber-200 dark:border-amber-800/40 rounded-3xl p-5">
                <p className="text-xs text-amber-700 dark:text-amber-300 font-bold leading-relaxed flex items-start gap-2">
                  <span className="text-lg">🛡️</span>
                  <span><strong>Segurança da redação:</strong> a tela do aluno bloqueia colar texto externo e conta quantas vezes ele sai da janela / muda de aba durante a escrita. Esse número aparece na submissão pra você avaliar.</span>
                </p>
              </div>

              {/* Lista de redações publicadas */}
              {publishedEssays.length > 0 && (
                <div className="bg-white dark:bg-slate-900 rounded-[40px] border dark:border-slate-800 p-6 shadow-sm">
                  <h3 className="font-black text-slate-800 dark:text-white uppercase text-sm tracking-tight mb-4 flex items-center gap-2">
                    <Library size={16} className="text-vibe-orange"/> Redações Publicadas ({publishedEssays.length})
                  </h3>
                  <div className="space-y-3">
                    {publishedEssays.map((es: any) => (
                      <div key={es.id} className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                          <div className="w-11 h-11 bg-gradient-fire rounded-xl flex items-center justify-center text-white shadow-md shrink-0">
                            <Pencil size={18}/>
                          </div>
                          <div className="min-w-0">
                            <p className="font-black text-slate-800 dark:text-slate-100 text-sm truncate">{es.title}</p>
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-0.5">
                              {es.bimester}º Bimestre · {es.grade}ª Série · {es.school_class || 'Todas as turmas'}
                              {es.created_at && ` · ${new Date(es.created_at).toLocaleDateString('pt-BR')}`}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleDeletePublishedEssay(es.id)}
                          className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                          title="Excluir redação"
                        >
                          <Trash2 size={16}/>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'reports' && (
             <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto">
                <div className="bg-white dark:bg-slate-900 rounded-[40px] border dark:border-slate-800 p-10 shadow-sm">
                   <div className="text-center mb-10">
                      <div className="w-16 h-16 bg-tocantins-yellow/10 rounded-2xl flex items-center justify-center text-tocantins-yellow mx-auto mb-6">
                         <BarChart3 size={32}/>
                      </div>
                      <h2 className="text-2xl font-black text-slate-800 dark:text-white uppercase tracking-tighter">Relatórios de Desempenho</h2>
                      <p className="text-slate-400 font-bold text-xs mt-2 uppercase tracking-widest">Análise pedagógica baseada em IA</p>
                   </div>

                   <div className="space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border dark:border-slate-800">
                         <label className="flex items-center gap-3 p-4 bg-white dark:bg-slate-900 rounded-2xl cursor-pointer shadow-sm">
                            <input 
                              type="radio" 
                              name="report_type" 
                              checked={reportTarget === 'student'} 
                              onChange={() => setReportTarget('student')}
                              className="accent-tocantins-blue"
                            />
                            <span className="font-bold text-slate-700 dark:text-slate-200 text-xs uppercase tracking-widest">Por Estudante</span>
                         </label>
                         <label className="flex items-center gap-3 p-4 bg-white dark:bg-slate-900 rounded-2xl cursor-pointer shadow-sm">
                            <input 
                              type="radio" 
                              name="report_type" 
                              checked={reportTarget === 'class'} 
                              onChange={() => setReportTarget('class')}
                              className="accent-tocantins-blue"
                            />
                            <span className="font-bold text-slate-700 dark:text-slate-200 text-xs uppercase tracking-widest">Por Turma</span>
                         </label>
                      </div>

                      <div className="space-y-1">
                         <label className="text-[10px] font-black text-slate-400 uppercase ml-4 tracking-widest">Alvo da Análise</label>
                         {reportTarget === 'student' ? (
                           <select 
                             value={selectedReportStudent}
                             onChange={e => setSelectedReportStudent(e.target.value)}
                             className="w-full bg-slate-50 dark:bg-slate-800 border dark:border-slate-700 rounded-2xl px-6 py-4 text-sm font-bold text-slate-700 dark:text-slate-200 outline-none focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/10"
                           >
                              <option value="">Selecione um Estudante...</option>
                              {students.map(s => <option key={s.id} value={s.name}>{s.name} ({s.school_class})</option>)}
                           </select>
                         ) : (
                           <select 
                             value={filterClass}
                             onChange={e => setFilterClass(e.target.value)}
                             className="w-full bg-slate-50 dark:bg-slate-800 border dark:border-slate-700 rounded-2xl px-6 py-4 text-sm font-bold text-slate-700 dark:text-slate-200 outline-none focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/10"
                           >
                              <option value="all">Todas as Turmas Ativas</option>
                              {classOptions.map(c => <option key={c} value={c}>Turma: {c}</option>)}
                           </select>
                         )}
                      </div>

                      <button 
                        onClick={handleGenerateFullReport}
                        disabled={isGeneratingReport || (reportTarget === 'student' && !selectedReportStudent)}
                        className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-950 py-5 rounded-3xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50 cursor-pointer"
                      >
                         {isGeneratingReport ? <Loader2 className="animate-spin" size={20}/> : <BrainCircuit size={20}/>}
                         {isGeneratingReport ? 'Analisando Submissões...' : 'Gerar Laudo Pedagógico'}
                      </button>
                   </div>
                </div>

                {aiReportResult && (
                  <div className="bg-white dark:bg-slate-900 rounded-[40px] border dark:border-slate-800 p-12 shadow-sm animate-in zoom-in duration-500 whitespace-pre-wrap font-serif text-slate-700 dark:text-slate-200 leading-relaxed text-lg border-l-8 border-l-tocantins-yellow prose dark:prose-invert max-w-none">
                     <h3 className="font-sans font-black text-tocantins-blue dark:text-tocantins-yellow uppercase tracking-tighter mb-8 flex items-center gap-3 not-prose">
                        <Award size={24}/> Diagnóstico Interpretativo IA
                     </h3>
                     {aiReportResult}
                  </div>
                )}
             </div>
          )}
        </div>

      {/* Modais de Edição e Visualização */}
      
      {/* Modal: Editor de Aula */}
      {isLessonEditorOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-6 animate-in fade-in duration-300">
           <div className="bg-white dark:bg-slate-900 w-full max-w-4xl rounded-[40px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
              <div className="p-8 border-b dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-tocantins-blue rounded-2xl flex items-center justify-center text-white shadow-lg">
                       <Presentation size={24}/>
                    </div>
                    <div>
                       <h3 className="font-black text-slate-800 dark:text-white uppercase tracking-tighter text-xl">Editor de Conteúdo Base</h3>
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Personalize a teoria disponibilizada aos alunos</p>
                    </div>
                 </div>
                 <button onClick={() => setIsLessonEditorOpen(false)} className="p-3 bg-slate-100 dark:bg-slate-800 rounded-2xl text-slate-500 hover:text-red-500 transition-all cursor-pointer"><X size={20}/></button>
              </div>

              <div className="flex-1 overflow-y-auto p-10 space-y-8">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase ml-4 tracking-widest">Nome do Tópico</label>
                    <input 
                      type="text" 
                      value={lessonTitleDraft}
                      onChange={e => setLessonTitleDraft(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-800 border dark:border-slate-700 rounded-3xl px-8 py-5 text-lg font-black text-slate-800 dark:text-white outline-none focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/10 transition-all"
                    />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase ml-4 tracking-widest">Fundamentação Teórica (Markdown)</label>
                    <textarea 
                      value={lessonTheoryDraft}
                      onChange={e => setLessonTheoryDraft(e.target.value)}
                      placeholder="Insira o texto base para estudo..."
                      className="w-full h-80 bg-slate-50 dark:bg-slate-800 border dark:border-slate-700 rounded-[32px] px-8 py-6 text-sm font-bold text-slate-700 dark:text-slate-200 outline-none focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/10 transition-all resize-none leading-relaxed"
                    />
                 </div>
              </div>

              <div className="p-8 bg-slate-50 dark:bg-slate-800/50 border-t dark:border-slate-800 flex justify-end gap-3">
                  <button 
                    onClick={() => setIsLessonEditorOpen(false)}
                    className="px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
                  >
                    Descartar
                  </button>
                  <button 
                    onClick={handleSaveLessonOverride}
                    disabled={isSavingLesson}
                    className="px-10 py-4 bg-tocantins-blue dark:bg-tocantins-yellow text-white dark:text-slate-950 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-blue-500/20 dark:shadow-none hover:scale-105 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSavingLesson ? <Loader2 className="animate-spin" size={14}/> : <Save size={14}/>}
                    Confirmar e Salvar
                  </button>
              </div>
           </div>
        </div>
      )}

      {/* Modal: Editor de Atividades */}
      {isActivityEditorOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-6 animate-in fade-in duration-300">
           <div className="bg-white dark:bg-slate-900 w-full max-w-5xl rounded-[40px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
              <div className="p-8 border-b dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-lg">
                       <ClipboardList size={24}/>
                    </div>
                    <div>
                       <h3 className="font-black text-slate-800 dark:text-white uppercase tracking-tighter text-xl">Curadoria de Questões</h3>
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{selectedLessonForEdit?.title}</p>
                    </div>
                 </div>
                 <button onClick={() => setIsActivityEditorOpen(false)} className="p-3 bg-slate-100 dark:bg-slate-800 rounded-2xl text-slate-500 hover:text-red-500 transition-all cursor-pointer"><X size={20}/></button>
              </div>

              <div className="flex-1 overflow-y-auto p-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
                 {/* Coluna: Questões Atuais */}
                 <div className="space-y-6">
                    <h4 className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest flex items-center gap-2">
                       <CheckCircle2 size={14}/> Itens no Banco ({activityQuestionsDraft.length})
                    </h4>
                    
                    <div className="space-y-4">
                       {activityQuestionsDraft.length === 0 ? (
                         <div className="p-12 text-center border border-dashed dark:border-slate-800 rounded-3xl">
                            <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Nenhuma questão atribuída ainda.</p>
                         </div>
                       ) : (
                         activityQuestionsDraft.map((q: any, idx) => (
                           <div key={q.id || idx} className="p-6 bg-slate-50 dark:bg-slate-800/20 rounded-3xl border border-slate-100 dark:border-slate-800 group transition-all">
                              <div className="flex justify-between items-start gap-4">
                                 <div className="flex-1">
                                    <p className="text-sm font-bold text-slate-700 dark:text-slate-200 leading-relaxed mb-3">{q.question_text}</p>
                                    {q.type === 'objective' && q.options && (
                                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                         {['a', 'b', 'c', 'd', 'e'].map(opt => q.options[opt] && (
                                            <div key={opt} className={`p-2 rounded-xl text-[10px] font-bold border flex items-center gap-2 ${opt === q.correct_option ? 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 text-emerald-600' : 'bg-white dark:bg-slate-800 border-slate-100 text-slate-500'}`}>
                                               <span className={`w-5 h-5 rounded-lg flex items-center justify-center uppercase ${opt === q.correct_option ? 'bg-emerald-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>{opt}</span>
                                               <span className="truncate">{q.options[opt]}</span>
                                            </div>
                                         ))}
                                      </div>
                                    )}
                                 </div>
                                 <button onClick={() => handleRemoveQuestionFromDraft(q.id)} className="p-2 text-slate-300 hover:text-red-500 transition-all cursor-pointer">
                                    <Trash2 size={16}/>
                                 </button>
                              </div>
                           </div>
                         ))
                       )}
                    </div>
                 </div>

                 {/* Coluna: Nova Questão */}
                 <div className="space-y-6 bg-slate-50/50 dark:bg-slate-800/30 p-8 rounded-[32px] border dark:border-slate-800 self-start">
                    <h4 className="text-[10px] font-black text-tocantins-blue dark:text-tocantins-yellow uppercase tracking-widest flex items-center gap-2">
                       <Wand2 size={14}/> Cadastrar Novo Item
                    </h4>

                    <div className="space-y-4">
                       {/* Toggle tipo de questão */}
                       <div className="flex gap-2">
                         {(['objective','discursive'] as const).map(t => (
                           <button
                             key={t}
                             onClick={() => setNewQuestion({...newQuestion, type: t})}
                             className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${newQuestion.type === t ? 'bg-tocantins-blue text-white border-tocantins-blue' : 'bg-white dark:bg-slate-800 text-slate-400 dark:text-slate-500 border-slate-200 dark:border-slate-700'}`}
                           >
                             {t === 'objective' ? '☑️ Objetiva (A–E)' : '✍️ Discursiva'}
                           </button>
                         ))}
                       </div>

                       <div className="space-y-1">
                          <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest">Enunciado</label>
                          <textarea
                            value={newQuestion.question_text}
                            onChange={e => setNewQuestion({...newQuestion, question_text: e.target.value})}
                            placeholder={newQuestion.type === 'discursive' ? 'Pergunta argumentativa que o aluno responderá com texto livre…' : 'Escreva a pergunta aqui…'}
                            className="w-full bg-white dark:bg-slate-900 border dark:border-slate-700 rounded-2xl px-4 py-4 text-sm font-bold text-slate-700 dark:text-slate-200 outline-none focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/10 min-h-[100px]"
                          />
                       </div>

                       {newQuestion.type === 'objective' && (
                         <div className="space-y-3">
                            <p className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest mb-1 italic">Dica: Clique na letra para marcar a correta</p>
                            {['a', 'b', 'c', 'd', 'e'].map(opt => (
                              <div key={opt} className="flex items-center gap-3">
                                 <button
                                   onClick={() => setNewQuestion({...newQuestion, correct_option: opt})}
                                   className={`w-10 h-10 rounded-xl font-black text-xs shadow-sm transition-all ${newQuestion.correct_option === opt ? 'bg-emerald-500 text-white' : 'bg-white dark:bg-slate-800 text-slate-400'}`}
                                 >
                                   {opt.toUpperCase()}
                                 </button>
                                 <input
                                   type="text"
                                   value={newQuestion.options[opt]}
                                   onChange={e => setNewQuestion({
                                     ...newQuestion,
                                     options: {...newQuestion.options, [opt]: e.target.value}
                                   })}
                                   placeholder={`Opção ${opt.toUpperCase()}`}
                                   className="flex-1 bg-white dark:bg-slate-900 border dark:border-slate-700 rounded-xl px-4 py-3 text-xs font-bold text-slate-700 dark:text-slate-200 outline-none focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/10"
                                 />
                              </div>
                            ))}
                         </div>
                       )}
                       {newQuestion.type === 'discursive' && (
                         <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/40 rounded-2xl p-4">
                           <p className="text-[11px] text-amber-700 dark:text-amber-300 font-bold leading-relaxed">
                             ✍️ <strong>Questão discursiva:</strong> o aluno responderá com texto livre. A IA fará a correção inicial; você poderá revisar a nota depois.
                           </p>
                         </div>
                       )}

                       <button 
                         onClick={handleAddQuestionToDraft}
                         disabled={isSavingActivity || !newQuestion.question_text.trim()}
                         className="w-full mt-4 bg-tocantins-blue dark:bg-tocantins-yellow text-white dark:text-slate-950 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-blue-500/20 dark:shadow-none hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50 cursor-pointer"
                       >
                         {isSavingActivity ? <Loader2 className="animate-spin" size={16}/> : <Save size={16}/>}
                         Adicionar Questão ao Banco
                       </button>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* Modal: Reutilizar Questão em outra aula */}
      {reuseModalQuestion && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-6 animate-in fade-in duration-300"
          style={{ background: 'rgba(2, 6, 23, 0.85)', backdropFilter: 'blur(16px)' }}
          onClick={(e) => { if (e.target === e.currentTarget) setReuseModalQuestion(null); }}
        >
          <div
            className="relative bg-white dark:bg-slate-900 w-full max-w-lg rounded-[32px] shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 max-h-[85vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative p-5 text-white" style={{ background: 'linear-gradient(135deg, #FF3D8A 0%, #8B5CF6 50%, #22D3EE 100%)' }}>
              <div className="flex justify-between items-center">
                <div className="min-w-0">
                  <p className="text-[9px] font-black text-white/85 uppercase tracking-[0.3em] mb-1">♻️ Reutilizar Questão</p>
                  <h3 className="font-black text-white text-base truncate">Escolha a aula alvo</h3>
                </div>
                <button onClick={() => setReuseModalQuestion(null)} className="p-2 bg-white/15 hover:bg-white/25 rounded-xl text-white shrink-0">
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-3">
              <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                <p className="text-[9px] font-black text-vibe-purple uppercase tracking-widest mb-2">Questão a reutilizar:</p>
                <p className="text-sm text-slate-700 dark:text-slate-200 font-medium line-clamp-3">{reuseModalQuestion.question_text}</p>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">
                  {subjectsInfo[reuseModalQuestion.subject as Subject]?.icon} {subjectsInfo[reuseModalQuestion.subject as Subject]?.name} · {reuseModalQuestion.type === 'objective' ? 'Objetiva' : 'Discursiva'}
                </p>
              </div>

              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-widest mb-2 block">Aula alvo</label>
                <select
                  value={reuseTargetLessonId}
                  onChange={e => setReuseTargetLessonId(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border dark:border-slate-700 rounded-2xl px-4 py-4 text-sm font-bold text-slate-700 dark:text-slate-200 outline-none focus:ring-4 focus:ring-purple-100"
                >
                  <option value="">— Selecione a aula —</option>
                  {curriculumData.flatMap(grade =>
                    grade.bimesters.flatMap(b =>
                      b.lessons
                        .filter(l => l.subject === reuseModalQuestion.subject)
                        .map(l => (
                          <option key={l.id} value={l.id}>
                            {grade.id}ª Série · B{b.id} · {(lessonOverrides[l.id]?.title || l.title).slice(0, 80)}
                          </option>
                        ))
                    )
                  )}
                </select>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2 ml-2 italic">
                  A questão será DUPLICADA pra aula escolhida. A original permanece intacta.
                </p>
              </div>
            </div>

            <div className="p-5 border-t dark:border-slate-800 flex gap-3">
              <button
                onClick={() => setReuseModalQuestion(null)}
                className="flex-1 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-black text-[10px] uppercase tracking-widest hover:scale-[1.02] transition-all"
              >
                Cancelar
              </button>
              <button
                onClick={handleReuseQuestion}
                disabled={!reuseTargetLessonId || isReusing}
                className="flex-1 py-3 rounded-2xl bg-gradient-vibe text-white font-black text-[10px] uppercase tracking-widest shadow-glow-purple hover:scale-[1.02] hover:shadow-glow-pink transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isReusing ? <Loader2 className="animate-spin" size={14}/> : '♻️'} Reutilizar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Anotações sobre o Estudante — agora com 5 abas independentes */}
      {notesModalStudent && (() => {
        const CATEGORIES = [
          { v: 'comportamento', label: 'Comportamento', emoji: '🟡', color: 'amber',   placeholder: 'Ex.: Conversa muito durante a aula, mexe no celular durante explicações.' },
          { v: 'destaque',      label: 'Destaque',      emoji: '🟢', color: 'emerald', placeholder: 'Ex.: Excelente argumentação no debate, lidera trabalhos em grupo.' },
          { v: 'pedagogico',    label: 'Pedagógico',    emoji: '🔵', color: 'blue',    placeholder: 'Ex.: Não entrega tarefas no prazo, dificuldade em interpretação de texto.' },
          { v: 'familiar',      label: 'Familiar',      emoji: '🟣', color: 'purple',  placeholder: 'Ex.: Pais separados há pouco tempo, cuida do irmão menor.' },
          { v: 'saude',         label: 'Saúde',         emoji: '🔴', color: 'red',     placeholder: 'Ex.: Possui laudo de TDAH, faz uso de medicamento controlado.' },
        ] as const;

        const colorClasses: Record<string, { bg: string; text: string; ring: string; tab: string; border: string; }> = {
          amber:   { bg: 'bg-amber-50 dark:bg-amber-900/10',     text: 'text-amber-600 dark:text-amber-400',     ring: 'ring-amber-200 dark:ring-amber-800',     tab: 'bg-amber-500',     border: 'border-amber-200 dark:border-amber-800/40' },
          emerald: { bg: 'bg-emerald-50 dark:bg-emerald-900/10', text: 'text-emerald-600 dark:text-emerald-400', ring: 'ring-emerald-200 dark:ring-emerald-800', tab: 'bg-emerald-500',   border: 'border-emerald-200 dark:border-emerald-800/40' },
          blue:    { bg: 'bg-blue-50 dark:bg-blue-900/10',       text: 'text-blue-600 dark:text-blue-400',       ring: 'ring-blue-200 dark:ring-blue-800',       tab: 'bg-blue-500',      border: 'border-blue-200 dark:border-blue-800/40' },
          purple:  { bg: 'bg-purple-50 dark:bg-purple-900/10',   text: 'text-purple-600 dark:text-purple-400',   ring: 'ring-purple-200 dark:ring-purple-800',   tab: 'bg-purple-500',    border: 'border-purple-200 dark:border-purple-800/40' },
          red:     { bg: 'bg-red-50 dark:bg-red-900/10',         text: 'text-red-600 dark:text-red-400',         ring: 'ring-red-200 dark:ring-red-800',         tab: 'bg-red-500',       border: 'border-red-200 dark:border-red-800/40' },
        };

        // Agrupa as anotações por categoria
        const grouped: Record<string, any[]> = { comportamento: [], destaque: [], pedagogico: [], familiar: [], saude: [] };
        studentNotes.forEach((note: any) => {
          let cat: string = note.category || '';
          let content: string = note.content || '';
          if (!cat) {
            const m = String(content).match(/^\[([^\]]+)\]\s*(.*)$/s);
            if (m) { cat = m[1]; content = m[2]; }
          }
          cat = (cat || 'comportamento').toLowerCase();
          if (!grouped[cat]) grouped[cat] = [];
          grouped[cat].push({ ...note, _category: cat, _content: content });
        });

        const activeCat = CATEGORIES.find(c => c.v === newNoteCategory) || CATEGORIES[0];
        const activeColors = colorClasses[activeCat.color];
        const activeNotes = grouped[activeCat.v] || [];

        return (
          <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-2xl z-[60] flex items-center justify-center p-6 animate-in fade-in duration-300">
            <div className="absolute -top-32 -left-20 w-96 h-96 bg-vibe-pink/20 rounded-full blur-3xl animate-blob"></div>
            <div className="absolute -bottom-32 -right-20 w-96 h-96 bg-vibe-cyan/20 rounded-full blur-3xl animate-blob" style={{ animationDelay: '3s' }}></div>
            <div className="relative bg-white dark:bg-slate-900 w-full max-w-3xl rounded-[40px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border border-white/20 z-10">
              {/* Header com gradient */}
              <div className="relative p-6 bg-gradient-vibe text-white overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-white/20 rounded-full blur-3xl"></div>
                <div className="relative z-10 flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-glow-pink ring-4 ring-white/30">
                      <StudentAvatar studentId={notesModalStudent.id} studentName={notesModalStudent.name} />
                    </div>
                    <div>
                      <h3 className="font-black text-white tracking-tight text-xl leading-tight font-display drop-shadow">{notesModalStudent.name}</h3>
                      <p className="text-[10px] font-black text-white/85 uppercase tracking-[0.25em] mt-1">
                        {notesModalStudent.grade}ª Série · Turma {notesModalStudent.school_class} · ✏️ {studentNotes.length} {studentNotes.length === 1 ? 'anotação' : 'anotações'}
                      </p>
                    </div>
                  </div>
                  <button onClick={() => setNotesModalStudent(null)} className="p-3 bg-white/15 hover:bg-white/25 hover:rotate-90 hover:scale-110 rounded-2xl text-white transition-all duration-300 cursor-pointer backdrop-blur-md">
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Abas das categorias */}
              <div className="px-6 pt-4 border-b dark:border-slate-800 bg-white dark:bg-slate-900">
                <div className="flex gap-1 overflow-x-auto -mb-px">
                  {CATEGORIES.map(c => {
                    const count = grouped[c.v]?.length || 0;
                    const isActive = newNoteCategory === c.v;
                    const colors = colorClasses[c.color];
                    return (
                      <button
                        key={c.v}
                        onClick={() => setNewNoteCategory(c.v as any)}
                        className={`flex items-center gap-2 px-4 py-3 rounded-t-xl text-[10px] font-black uppercase tracking-widest border-b-2 transition-all whitespace-nowrap ${
                          isActive
                            ? `${colors.bg} ${colors.text} border-current shadow-sm`
                            : 'border-transparent text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                        }`}
                      >
                        <span>{c.emoji}</span>
                        <span>{c.label}</span>
                        {count > 0 && (
                          <span className={`px-2 py-0.5 rounded-full text-[9px] ${isActive ? colors.tab + ' text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'}`}>
                            {count}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Form de nova anotação na categoria ativa */}
              <div className={`p-6 border-b dark:border-slate-800 ${activeColors.bg}`}>
                <h4 className={`font-black uppercase text-xs tracking-tight mb-3 flex items-center gap-2 ${activeColors.text}`}>
                  <Pencil size={14} /> Nova anotação em <span className="font-black">{activeCat.label}</span>
                </h4>
                <textarea
                  value={newNoteText}
                  onChange={e => setNewNoteText(e.target.value)}
                  placeholder={activeCat.placeholder}
                  rows={3}
                  className="w-full bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-2xl px-4 py-3 text-sm text-slate-700 dark:text-slate-200 outline-none focus:ring-4 focus:ring-slate-200 dark:focus:ring-slate-700 mb-3"
                />
                <button
                  onClick={() => handleAddNote(activeCat.v)}
                  disabled={isSavingNote || !newNoteText.trim()}
                  className={`w-full ${activeColors.tab} text-white py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer shadow-md`}
                >
                  {isSavingNote ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                  Salvar em {activeCat.label}
                </button>
              </div>

              {/* Histórico SÓ da categoria ativa */}
              <div className="flex-1 overflow-y-auto p-6 space-y-3 bg-slate-50/30 dark:bg-slate-950/30">
                <h4 className="font-black text-slate-700 dark:text-slate-200 uppercase text-xs tracking-tight mb-3 flex items-center gap-2">
                  <ClipboardList size={14} /> Histórico — {activeCat.label} ({activeNotes.length})
                </h4>
                {isLoadingNotes ? (
                  <div className="text-center py-12 flex flex-col items-center gap-3">
                    <Loader2 className="animate-spin text-tocantins-blue dark:text-tocantins-yellow" />
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Carregando histórico...</p>
                  </div>
                ) : activeNotes.length === 0 ? (
                  <div className="text-center py-8 space-y-3">
                    <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">
                      Nenhuma anotação de {activeCat.label.toLowerCase()} ainda. Use o formulário acima para registrar.
                    </p>
                    <button
                      onClick={() => openNotesModal(notesModalStudent)}
                      className="text-[10px] font-black text-tocantins-blue dark:text-tocantins-yellow uppercase tracking-widest hover:underline cursor-pointer inline-flex items-center gap-1"
                    >
                      <RotateCw size={12} /> Recarregar histórico
                    </button>
                  </div>
                ) : (
                  activeNotes
                    .slice()
                    .sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime())
                    .map((note: any) => (
                      <div key={note.id} className={`bg-white dark:bg-slate-800 p-4 rounded-2xl border ${activeColors.border} group hover:shadow-md transition-all`}>
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                            {(note.subject || note.teacher_subject) && `${note.subject || note.teacher_subject} • `}
                            {note.created_at ? new Date(note.created_at).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : ''}
                          </span>
                          <button
                            onClick={() => handleDeleteNote(note.id)}
                            className="p-1.5 text-red-300 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
                            title="Excluir anotação"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                        <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed whitespace-pre-wrap">{note._content}</p>
                      </div>
                    ))
                )}
              </div>
            </div>
          </div>
        );
      })()}

      {/* Modal: Detalhamento de Notas do Estudante */}
      {selectedStudentEval && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[60] flex items-center justify-center p-6 animate-in fade-in duration-300">
           <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-[40px] shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
              <div className="p-8 border-b dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
                 <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-tocantins-blue rounded-2xl flex items-center justify-center text-white shadow-lg overflow-hidden ring-4 ring-white dark:ring-slate-900">
                       <StudentAvatar studentId={selectedStudentEval.id} studentName={selectedStudentEval.name} />
                    </div>
                    <div>
                       <h3 className="font-black text-slate-800 dark:text-white uppercase tracking-tighter text-xl">{selectedStudentEval.name}</h3>
                       <p className="text-[10px] font-black text-tocantins-blue dark:text-tocantins-yellow uppercase tracking-widest mt-1">
                         {selectedStudentEval.grade}ª Série • Turma {selectedStudentEval.school_class}
                       </p>
                    </div>
                 </div>
                 <button onClick={() => setSelectedStudentEval(null)} className="p-3 bg-slate-100 dark:bg-slate-800 rounded-2xl text-slate-500 hover:text-red-500 transition-all cursor-pointer shadow-sm hover:rotate-90 duration-300"><X size={20}/></button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-8">
                 <div className="grid grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map(b => (
                      <div key={b} className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-3xl border border-slate-100 dark:border-slate-800 text-center">
                         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{b}º Bimestre</p>
                         <p className="text-2xl font-black text-tocantins-blue dark:text-tocantins-yellow">
                           {selectedStudentEval.bimesterGrades?.[b]?.toFixed(1) || '0.0'}
                         </p>
                      </div>
                    ))}
                 </div>

                 <div className="space-y-4">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Histórico de Atividades</h4>
                    <div className="space-y-3">
                       {[...selectedStudentEval.activities]
                         .sort((a: any, b: any) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime())
                         .map((act: any, idx: number) => (
                         <div key={idx} className={`p-4 rounded-2xl border flex justify-between items-center group transition-all ${act.isExam ? 'bg-amber-50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-800/30 hover:border-amber-400' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-tocantins-blue/30'}`}>
                            <div className="flex-1 flex items-center gap-3">
                               {act.isExam && (
                                 <span className="px-2 py-1 bg-amber-500 text-white rounded text-[8px] font-black uppercase tracking-widest shrink-0">
                                   Simulado
                                 </span>
                               )}
                               <div className="min-w-0">
                                 <p className="font-bold text-slate-700 dark:text-slate-100 text-sm leading-tight truncate">{act.title}</p>
                                 <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                                   {act.bimester}º Bimestre
                                   {act.subject && ` • ${act.subject}`}
                                   {act.date && ` • ${new Date(act.date).toLocaleDateString('pt-BR')}`}
                                 </span>
                               </div>
                            </div>
                            <div className="text-right shrink-0 ml-3">
                               <div className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-black ${act.isExam ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400' : 'bg-blue-50 dark:bg-blue-900/20 text-tocantins-blue dark:text-tocantins-yellow'}`}>
                                 {Number(act.score || 0).toFixed(1)}
                               </div>
                            </div>
                         </div>
                       ))}
                       {selectedStudentEval.activities.length === 0 && (
                         <p className="text-center py-8 text-slate-400 font-bold text-xs">Nenhum registro encontrado.</p>
                       )}
                    </div>
                 </div>
              </div>

              <div className="p-8 border-t dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 flex justify-between items-center">
                 <div className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Aproveitamento Total</div>
                 <div className="flex items-center gap-2 bg-tocantins-blue dark:bg-tocantins-yellow px-6 py-3 rounded-2xl shadow-xl shadow-blue-500/20 dark:shadow-none">
                    <Award size={18} className="text-white dark:text-slate-950"/>
                    <span className="text-lg font-black text-white dark:text-slate-950 tracking-tighter">
                      {(Object.values(selectedStudentEval.bimesterGrades || {}) as number[]).reduce((a, b) => a + b, 0).toFixed(1)} Pts
                    </span>
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* Modal: Visualizar e Avaliar Submissão */}
      {viewingSubmission && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-6 animate-in fade-in duration-300">
           <div className="bg-white dark:bg-slate-900 w-full max-w-4xl rounded-[40px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
              <div className="p-8 border-b dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-tocantins-blue rounded-2xl flex items-center justify-center text-white shadow-lg overflow-hidden">
                       <StudentAvatar studentName={viewingSubmission.student_name} />
                    </div>
                    <div>
                       <h3 className="font-black text-slate-800 dark:text-white uppercase tracking-tighter text-xl">{viewingSubmission.student_name}</h3>
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{viewingSubmission.lesson_title}</p>
                    </div>
                 </div>
                 <button onClick={() => setViewingSubmission(null)} className="p-3 bg-slate-100 dark:bg-slate-800 rounded-2xl text-slate-500 hover:text-red-500 transition-all cursor-pointer"><X size={20}/></button>
              </div>

              <div className="flex-1 overflow-y-auto p-10 space-y-10">
                 {/* Correção ENEM (Redação) — quando aplicável */}
                 {viewingSubmission.ai_feedback?.enem && (
                   <div className="bg-gradient-fire p-1 rounded-[32px] shadow-glow-orange">
                     <div className="bg-white dark:bg-slate-900 p-8 rounded-[28px]">
                       <div className="flex items-center justify-between mb-5">
                         <div className="flex items-center gap-2">
                           <Award className="text-vibe-orange" size={20}/>
                           <h4 className="text-sm font-black text-slate-800 dark:text-white tracking-tight">📋 Correção ENEM (IA)</h4>
                         </div>
                         <div className="flex items-baseline gap-2">
                           <span className="text-3xl font-black text-vibe-orange">{viewingSubmission.ai_feedback.enem.totalScore}</span>
                           <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">/ 1000</span>
                         </div>
                       </div>

                       {/* 5 competências */}
                       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 mb-5">
                         {(['c1','c2','c3','c4','c5'] as const).map((k, i) => {
                           const c = viewingSubmission.ai_feedback.enem[k];
                           const pct = (c.score / 200) * 100;
                           const labels = ['Norma culta','Tema','Argumentação','Coesão','Intervenção'];
                           return (
                             <div key={k} className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-3 border border-slate-100 dark:border-slate-800">
                               <div className="flex items-center justify-between mb-1">
                                 <span className="text-[9px] font-black text-vibe-orange uppercase tracking-widest">C{i+1}</span>
                                 <span className="text-sm font-black text-slate-800 dark:text-slate-100">{c.score}<span className="text-[9px] text-slate-400">/200</span></span>
                               </div>
                               <p className="text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">{labels[i]}</p>
                               <div className="h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mb-2">
                                 <div className="h-full bg-gradient-fire" style={{ width: `${pct}%` }}></div>
                               </div>
                               <p className="text-[10px] text-slate-600 dark:text-slate-400 leading-snug">{c.feedback}</p>
                             </div>
                           );
                         })}
                       </div>

                       {viewingSubmission.ai_feedback.enem.generalComment && (
                         <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-2xl p-4 mb-3">
                           <p className="text-[9px] font-black text-blue-700 dark:text-blue-300 uppercase tracking-widest mb-1">Comentário Geral</p>
                           <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">{viewingSubmission.ai_feedback.enem.generalComment}</p>
                         </div>
                       )}

                       <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                         {viewingSubmission.ai_feedback.enem.strengths?.length > 0 && (
                           <div className="bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/30 rounded-xl p-3">
                             <p className="text-[9px] font-black text-emerald-700 dark:text-emerald-300 uppercase tracking-widest mb-1">✨ Pontos Fortes</p>
                             <ul className="space-y-1">{viewingSubmission.ai_feedback.enem.strengths.map((s: string, i: number) => <li key={i} className="text-[10px] text-slate-700 dark:text-slate-300">• {s}</li>)}</ul>
                           </div>
                         )}
                         {viewingSubmission.ai_feedback.enem.weaknesses?.length > 0 && (
                           <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/30 rounded-xl p-3">
                             <p className="text-[9px] font-black text-amber-700 dark:text-amber-300 uppercase tracking-widest mb-1">⚠️ A Melhorar</p>
                             <ul className="space-y-1">{viewingSubmission.ai_feedback.enem.weaknesses.map((s: string, i: number) => <li key={i} className="text-[10px] text-slate-700 dark:text-slate-300">• {s}</li>)}</ul>
                           </div>
                         )}
                         {viewingSubmission.ai_feedback.enem.improvementTips?.length > 0 && (
                           <div className="bg-purple-50 dark:bg-purple-900/10 border border-purple-100 dark:border-purple-900/30 rounded-xl p-3">
                             <p className="text-[9px] font-black text-purple-700 dark:text-purple-300 uppercase tracking-widest mb-1">💡 Dicas</p>
                             <ul className="space-y-1">{viewingSubmission.ai_feedback.enem.improvementTips.map((s: string, i: number) => <li key={i} className="text-[10px] text-slate-700 dark:text-slate-300">• {s}</li>)}</ul>
                           </div>
                         )}
                       </div>

                       {(viewingSubmission.content?.[0]?.tab_switches > 0 || viewingSubmission.content?.[0]?.paste_attempts > 0) && (
                         <div className="mt-3 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/40 rounded-xl p-3">
                           <p className="text-[10px] text-amber-700 dark:text-amber-300 font-bold leading-relaxed flex items-center gap-2">
                             🛡️ <strong>Sinais de integridade:</strong> aluno saiu da tela {viewingSubmission.content[0].tab_switches || 0}× e tentou colar texto externo {viewingSubmission.content[0].paste_attempts || 0}× durante a escrita.
                           </p>
                         </div>
                       )}
                     </div>
                   </div>
                 )}

                 {/* Feedback da IA (questões objetivas/discursivas — não-redação) */}
                 {viewingSubmission.ai_feedback && !viewingSubmission.ai_feedback?.enem && (
                   <div className="bg-indigo-50 dark:bg-indigo-900/10 p-8 rounded-[32px] border border-indigo-100 dark:border-indigo-800/30">
                      <div className="flex items-center gap-2 mb-4">
                         <Sparkles className="text-indigo-600 dark:text-indigo-400" size={18}/>
                         <h4 className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">Análise Automática da IA</h4>
                      </div>
                      <p className="text-slate-700 dark:text-slate-300 italic text-sm mb-4 leading-relaxed">"{viewingSubmission.ai_feedback.generalComment}"</p>

                      {viewingSubmission.ai_feedback.corrections?.length > 0 && (
                        <div className="space-y-3 mt-6">
                           <h5 className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Detalhamento da IA:</h5>
                           {viewingSubmission.ai_feedback.corrections.map((c: any, idx: number) => (
                             <div key={idx} className="p-4 bg-white dark:bg-slate-900 rounded-2xl border dark:border-slate-800">
                                <div className="flex justify-between items-start mb-2">
                                   <p className="text-[10px] font-bold text-slate-500 max-w-[70%]">{c.question}</p>
                                   <span className={`text-[10px] font-black uppercase ${c.isCorrect ? 'text-emerald-500' : 'text-amber-500'}`}>
                                      {c.isCorrect ? 'Correta' : 'Incorreta'} • Nota {c.score}
                                   </span>
                                </div>
                                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">{c.feedback}</p>
                             </div>
                           ))}
                        </div>
                      )}
                   </div>
                 )}

                 {/* Lista de Respostas */}
                 <div className="space-y-6">
                    <h4 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-4">Respostas do Estudante</h4>
                    <div className="space-y-4">
                       {(viewingSubmission.content || viewingSubmission.answers)?.map((ans: any, idx: number) => (
                         <div key={idx} className="p-8 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-slate-800">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 inline-block">Questão {idx + 1} ({ans.activityTitle || 'Atividade'})</span>
                            <p className="font-bold text-slate-700 dark:text-slate-200 text-sm mb-4 leading-relaxed">P: {ans.question || ans.question_text}</p>
                            <p className="text-sm font-medium text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-900 p-4 rounded-2xl border dark:border-slate-800 italic">R: {ans.answer || ans.student_answer}</p>
                         </div>
                       ))}
                    </div>
                 </div>

                 {/* Feedback do Professor */}
                 <div className="space-y-4 bg-slate-50 dark:bg-slate-800/30 p-8 rounded-[32px] border-2 border-tocantins-blue/10">
                    <div className="flex items-center gap-2 mb-2">
                       <MessageSquare className="text-tocantins-blue" size={18}/>
                       <h4 className="text-[10px] font-black text-tocantins-blue uppercase tracking-widest">Feedback Pedagógico</h4>
                    </div>
                    <textarea 
                      value={manualFeedback}
                      onChange={e => setManualFeedback(e.target.value)}
                      placeholder="Escreva orientações de melhoria para o aluno..."
                      className="w-full h-32 bg-white dark:bg-slate-900 border dark:border-slate-700 rounded-2xl px-6 py-4 text-sm font-bold text-slate-700 dark:text-slate-200 outline-none focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/10 transition-all resize-none"
                    />
                    <div className="flex justify-end">
                       <button 
                         onClick={handleSaveFeedback}
                         disabled={isSavingFeedback}
                         className="flex items-center gap-2 px-8 py-3 bg-tocantins-blue text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-blue-500/20 hover:scale-105 transition-all cursor-pointer disabled:opacity-50"
                       >
                          {isSavingFeedback ? <Loader2 className="animate-spin" size={14}/> : <Send size={14}/>}
                          Enviar Retorno
                       </button>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      )}
      </main>
    </div>
    </>
  );
};
