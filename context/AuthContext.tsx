import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface AuthContextType {
  student: any | null;
  teacherSubject: string | null;
  loginStudent: (data: any) => void;
  logoutStudent: () => Promise<void>;
  updateStudentData: (newData: any) => void;
  loginTeacher: (subject: string) => void;
  logoutTeacher: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [student, setStudent] = useState<any | null>(null);
  const [teacherSubject, setTeacherSubject] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadStudent(userId: string, fallbackEmail?: string | null, fallbackName?: string | null) {
      try {
        // CRÍTICO: NÃO selecionar photo_url no login. Cada foto é base64
        // de ~1.5 MB e deixa o login lento. A foto é carregada sob demanda
        // por quem precisar (Header, Profile, StudentAvatar).
        const { data, error } = await supabase
          .from('students')
          .select('id,name,email,school_class,grade,role,created_at')
          .eq('id', userId)
          .maybeSingle();

        if (!mounted) return;

        if (data) {
          setStudent(data);
          // Foto em background — carrega da tabela dedicada student_photos
          supabase
            .from('student_photos')
            .select('photo_url')
            .eq('student_id', userId)
            .maybeSingle()
            .then(({ data: ph }) => {
              if (mounted && ph?.photo_url) {
                setStudent((prev: any) => prev ? { ...prev, photo_url: ph.photo_url } : prev);
              }
            });
        } else if (!error) {
          // Autenticado mas sem registro em students (ex.: admin via Google)
          setStudent({ id: userId, email: fallbackEmail || '', name: fallbackName || 'Usuário' });
        } else {
          console.warn('Falha ao buscar student:', error.message);
          setStudent({ id: userId, email: fallbackEmail || '', name: fallbackName || 'Usuário' });
        }
      } catch (err) {
        console.error('Erro inesperado ao buscar student:', err);
        if (mounted) setStudent({ id: userId, email: fallbackEmail || '', name: fallbackName || 'Usuário' });
      }
    }

    // Restaura sessão atual — com timeout de segurança para nunca travar o spinner
    const safetyTimeout = setTimeout(() => {
      if (mounted) setIsLoading(false);
    }, 8000);

    supabase.auth.getSession()
      .then(({ data: { session } }) => {
        if (!mounted) return;
        if (session?.user) {
          loadStudent(
            session.user.id,
            session.user.email,
            session.user.user_metadata?.full_name || session.user.user_metadata?.name
          ).finally(() => {
            if (mounted) {
              clearTimeout(safetyTimeout);
              setIsLoading(false);
            }
          });
        } else {
          clearTimeout(safetyTimeout);
          setIsLoading(false);
        }

        const savedTeacher = sessionStorage.getItem('CHSA_TEACHER_SESSION');
        if (savedTeacher && mounted) setTeacherSubject(savedTeacher);
      })
      .catch((err) => {
        console.error('[Auth] getSession falhou:', err);
        if (mounted) {
          clearTimeout(safetyTimeout);
          setIsLoading(false);
        }
      });

    // Listener de mudanças de auth
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!mounted) return;
      if (session?.user) {
        loadStudent(
          session.user.id,
          session.user.email,
          session.user.user_metadata?.full_name || session.user.user_metadata?.name
        );
      } else {
        setStudent(null);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const loginStudent = (data: any) => {
    setStudent(data);
  };

  const updateStudentData = (newData: any) => {
    setStudent((prev: any) => ({ ...(prev || {}), ...newData }));
  };

  const logoutStudent = async () => {
    await supabase.auth.signOut();
    setStudent(null);
  };

  const loginTeacher = (subject: string) => {
    sessionStorage.setItem('CHSA_TEACHER_SESSION', subject);
    setTeacherSubject(subject);
  };

  const logoutTeacher = () => {
    sessionStorage.removeItem('CHSA_TEACHER_SESSION');
    setTeacherSubject(null);
  };

  return (
    <AuthContext.Provider value={{
      student,
      teacherSubject,
      loginStudent,
      logoutStudent,
      updateStudentData,
      loginTeacher,
      logoutTeacher,
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  return context;
};
