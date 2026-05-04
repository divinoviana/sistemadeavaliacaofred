
import React, { useState, useEffect } from 'react';
import { BookOpen, Home, History, MessageCircle, Settings, Sun, Moon } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { student, logoutStudent } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (student) {
      fetchUnreadCount(student.id);
    }
  }, [student, location.pathname]);

  const fetchUnreadCount = async (studentId: string) => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('id')
        .eq('receiver_id', studentId)
        .eq('is_from_teacher', true)
        .order('created_at', { ascending: false })
        .limit(1);

      if (error) throw error;

      if ((data?.length ?? 0) > 0 && location.pathname !== '/contact') {
        setUnreadCount(1);
      } else {
        setUnreadCount(0);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleExit = () => {
    logoutStudent();
    navigate('/login');
  };

  return (
    <header className="bg-slate-900/85 dark:bg-slate-950/85 backdrop-blur-2xl text-white shadow-2xl sticky top-0 z-[100] border-b border-white/5">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-3 hover:opacity-90 transition group">
          <div className="bg-gradient-vibe w-9 h-9 rounded-2xl flex items-center justify-center shadow-glow-purple group-hover:scale-110 group-hover:rotate-6 transition-transform">
            <BookOpen className="w-5 h-5 text-white" strokeWidth={2.5} />
          </div>
          <div className="hidden xs:block">
            <h1 className="text-lg font-black leading-tight tracking-tight font-display">
              <span className="text-gradient-vibe">CHSA</span>
            </h1>
            <p className="text-[9px] text-slate-400 uppercase tracking-[0.25em] font-bold">Ensino Médio · TO</p>
          </div>
        </Link>

        {student && (
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-white/10 text-slate-200 hover:bg-white/20 hover:scale-110 transition-all"
              title={theme === 'light' ? 'Modo escuro' : 'Modo claro'}
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            <Link
              to="/contact"
              className={`relative p-2.5 rounded-xl transition-all hover:scale-110 ${location.pathname === '/contact' ? 'bg-gradient-aurora text-white shadow-glow-cyan' : 'bg-white/10 text-slate-200 hover:bg-white/20'}`}
            >
              <MessageCircle size={18} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-vibe-pink text-[10px] font-black flex items-center justify-center rounded-full border-2 border-slate-900 animate-pulse-glow">
                  !
                </span>
              )}
            </Link>

            <Link
              to="/my-activities"
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 hover:bg-gradient-sunset hover:shadow-glow-pink transition-all text-xs font-bold hover:scale-105"
            >
              <History size={14} />
              <span className="hidden md:inline">Histórico</span>
            </Link>

            <div className="flex items-center gap-2 border-l border-white/10 pl-2 sm:pl-3">
              <Link to="/profile" className="flex items-center gap-2 group">
                <div className="hidden sm:flex flex-col items-end mr-1">
                  <span className="text-[11px] font-black text-white group-hover:text-vibe-cyan transition-colors truncate max-w-[100px]">{student.name.split(' ')[0]}</span>
                  <span className="text-[9px] text-slate-400 font-bold tracking-wider">{student.school_class}</span>
                </div>
                <div className="relative">
                  <img src={student.photo_url} className="w-9 h-9 rounded-full object-cover shadow-md ring-2 ring-vibe-cyan/40 group-hover:ring-vibe-pink group-hover:ring-4 transition-all" alt="Perfil" />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-vibe-lime rounded-full border-2 border-slate-900 animate-pulse-glow"></span>
                </div>
              </Link>

              <button
                onClick={handleExit}
                className="p-2.5 ml-1 hover:bg-red-500/20 rounded-xl transition-all text-slate-400 hover:text-red-400 flex items-center justify-center cursor-pointer hover:scale-110"
                title="Sair"
              >
                <Home size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
