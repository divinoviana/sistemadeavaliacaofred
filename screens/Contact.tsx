
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, MessageCircle, Loader2, UserCircle, BellRing, ChevronRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { subjectsInfo } from '../data';
import { Subject } from '../types';
import { useAuth } from '../context/AuthContext';

export const Contact: React.FC = () => {
  const navigate = useNavigate();
  const { student, isLoading: isAuthLoading } = useAuth();
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isAuthLoading && !student) {
      navigate('/login');
    }
  }, [student, isAuthLoading, navigate]);

  useEffect(() => {
    if (!selectedSubject || !student) return;

    let isMounted = true;
    setLoadingMessages(true);

    const fetchMessages = async () => {
      // Mensagens do aluno (enviou) + mensagens do professor para sua turma+matéria
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .or(`sender_id.eq.${student.id},and(is_from_teacher.eq.true,school_class.eq.${student.school_class},subject.eq.${selectedSubject})`)
        .eq('subject', selectedSubject)
        .order('created_at', { ascending: true });
      if (!isMounted) return;
      if (error) {
        console.error('Erro ao buscar mensagens:', error);
        setLoadingMessages(false);
        return;
      }
      setMessages(data || []);
      setLoadingMessages(false);
    };

    fetchMessages();

    // Realtime: escuta INSERTs em messages e refaz fetch quando relevante
    const channel = supabase
      .channel(`messages-${student.id}-${selectedSubject}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages' },
        (payload) => {
          const m: any = payload.new;
          const isMine = m.sender_id === student.id && m.subject === selectedSubject;
          const isTeacherForClass = m.is_from_teacher && m.subject === selectedSubject && m.school_class === student.school_class;
          if (isMine || isTeacherForClass) fetchMessages();
        }
      )
      .subscribe();

    return () => {
      isMounted = false;
      supabase.removeChannel(channel);
    };
  }, [selectedSubject, student]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !student || !selectedSubject) return;
    setSending(true);
    try {
      const { error } = await supabase.from('messages').insert({
        sender_id: student.id,
        sender_name: student.name,
        school_class: student.school_class,
        grade: student.grade,
        content: newMessage.trim(),
        is_from_teacher: false,
        subject: selectedSubject,
      });
      if (error) throw error;
      setNewMessage('');
    } catch (e: any) {
      console.error('Erro ao enviar mensagem:', e);
      alert('Não foi possível enviar: ' + (e?.message || 'tente novamente.'));
    } finally { setSending(false); }
  };

  if (isAuthLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
        <div className="w-10 h-10 border-4 border-slate-200 dark:border-slate-800 border-t-tocantins-blue dark:border-t-tocantins-yellow rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!student) return null;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl min-h-[85vh] font-sans transition-colors duration-300 relative">
      <div className="absolute inset-0 bg-mesh-bg opacity-50 dark:opacity-15 pointer-events-none"></div>
      <div className="flex items-center justify-between mb-8 relative z-10">
        <Link to="/" className="inline-flex items-center bg-white dark:bg-slate-900 px-4 py-2 rounded-full shadow-md text-slate-500 dark:text-slate-400 hover:text-vibe-pink hover:scale-105 font-black text-[10px] uppercase tracking-[0.3em] transition-all">
          <ArrowLeft className="w-4 h-4 mr-2" /> Voltar
        </Link>
        <h2 className="text-3xl font-black tracking-tighter font-display">
          <span className="text-gradient-vibe">💬 Central de Dúvidas</span>
        </h2>
      </div>

      {!selectedSubject ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
              <div className="md:col-span-2 mb-2">
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-bold">Escolha o professor pra começar:</p>
              </div>
              {(Object.entries(subjectsInfo) as [Subject, any][]).map(([key, info]) => (
                  <button key={key} onClick={() => setSelectedSubject(key)} className={`relative overflow-hidden rounded-3xl p-1 ${info.gradient || info.color} ${info.glow || 'shadow-xl'} hover:-translate-y-1 hover:scale-[1.02] transition-all text-left group`}>
                    <div className="bg-white dark:bg-slate-900 rounded-[20px] p-6 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-14 h-14 ${info.gradient || info.color} rounded-2xl flex items-center justify-center text-2xl shadow-md group-hover:rotate-6 group-hover:scale-110 transition-transform`}>{info.icon}</div>
                        <div>
                            <h3 className="font-black text-slate-800 dark:text-slate-100 text-base">Prof. de {info.name}</h3>
                            <p className="text-[10px] text-slate-400 dark:text-slate-500 font-black uppercase tracking-widest mt-0.5">Toque pra abrir o chat 💬</p>
                        </div>
                      </div>
                      <ChevronRight className="text-slate-300 dark:text-slate-700 group-hover:text-vibe-pink group-hover:translate-x-1 transition-all" />
                    </div>
                  </button>
              ))}
          </div>
      ) : (
          <div className="bg-white dark:bg-slate-900 rounded-[40px] shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col h-[70vh] animate-in zoom-in-95 duration-300 relative z-10">
            <div className={`${subjectsInfo[selectedSubject].gradient || subjectsInfo[selectedSubject].color} p-5 text-white flex items-center justify-between shadow-lg relative overflow-hidden`}>
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/20 rounded-full blur-3xl animate-blob"></div>
              <div className="flex items-center gap-3 relative z-10">
                <button onClick={() => setSelectedSubject(null)} className="p-2.5 bg-white/15 hover:bg-white/25 hover:scale-110 rounded-full backdrop-blur-md transition-all"><ArrowLeft size={18}/></button>
                <div className="w-11 h-11 rounded-full bg-white/20 flex items-center justify-center border border-white/30 shadow-inner backdrop-blur-md text-2xl">{subjectsInfo[selectedSubject].icon}</div>
                <div>
                  <h3 className="font-black text-sm leading-tight">Prof. de {subjectsInfo[selectedSubject].name}</h3>
                  <p className="text-[10px] text-white/80 font-black uppercase tracking-widest">Canal de Dúvidas</p>
                </div>
              </div>
              <span className="bg-vibe-lime/90 text-slate-950 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest hidden sm:flex items-center gap-1.5 shadow-md relative z-10">
                <span className="w-1.5 h-1.5 bg-emerald-700 rounded-full animate-pulse"></span> Online
              </span>
            </div>

            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/50 dark:bg-slate-950/20">
              {loadingMessages && messages.length === 0 ? (
                <div className="flex flex-col justify-center items-center h-full gap-2"><Loader2 className="animate-spin text-vibe-purple" /><p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Conectando…</p></div>
              ) : messages.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-gradient-vibe rounded-full flex items-center justify-center mx-auto mb-4 shadow-glow-purple animate-float">
                    <MessageCircle className="text-white" size={40} />
                  </div>
                  <p className="font-black text-slate-700 dark:text-slate-200 text-sm tracking-tight">Comece a conversa! 👋</p>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest mt-1">Mande um "Oi" pro seu professor</p>
                </div>
              ) : (
                messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.is_from_teacher ? 'justify-start' : 'justify-end'} animate-in slide-in-from-bottom-2 duration-300`}>
                    {msg.is_from_teacher ? (
                      <div className="max-w-[85%] bg-white dark:bg-slate-800 px-5 py-4 rounded-[24px] rounded-tl-md shadow-md text-sm leading-relaxed text-slate-700 dark:text-slate-200 border-l-4 border-vibe-purple">
                        <p className="text-[8px] font-black text-vibe-purple uppercase mb-1 tracking-[0.25em]">📢 Professor</p>
                        <p className="break-words font-medium">{msg.content}</p>
                        <p className="text-[9px] mt-2 font-bold flex justify-end text-slate-400 dark:text-slate-500">{msg.created_at ? new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}</p>
                      </div>
                    ) : (
                      <div className="max-w-[85%] bg-gradient-vibe text-white px-5 py-4 rounded-[24px] rounded-tr-md shadow-glow-purple text-sm leading-relaxed">
                        <p className="break-words font-medium drop-shadow">{msg.content}</p>
                        <p className="text-[9px] mt-2 font-bold flex justify-end text-white/80">{msg.created_at ? new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}</p>
                      </div>
                    )}
                  </div>
                ))
              )}
              <div ref={chatEndRef} />
            </div>

            <form onSubmit={handleSendMessage} className="p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex gap-2">
              <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Manda sua dúvida aqui… ✏️" className="flex-1 px-5 py-4 bg-slate-100 dark:bg-slate-800 border-none rounded-2xl text-sm focus:ring-4 focus:ring-vibe-purple/20 outline-none transition dark:text-white placeholder:text-slate-400" disabled={sending} />
              <button type="submit" disabled={sending || !newMessage.trim()} className="bg-gradient-vibe text-white w-14 h-14 rounded-2xl hover:scale-110 hover:shadow-glow-pink transition-all shadow-glow-purple flex items-center justify-center disabled:opacity-50 active:scale-95 cursor-pointer">{sending ? <Loader2 size={22} className="animate-spin" /> : <Send size={22} />}</button>
            </form>
          </div>
      )}
    </div>
  );
};
