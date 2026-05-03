
import React, { Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { Header } from './components/Header';
import { TEACHER_INFO, TEACHER_EMAILS } from './data_admin';
import { Mail, Lock } from 'lucide-react';

// Telas carregadas sob demanda — chunks separados para a primeira tela
// (Home + Login) carregar rapidamente. Cada rota baixa só seu pedaço.
const Login          = lazy(() => import('./screens/Login').then(m => ({ default: m.Login })));
const Home           = lazy(() => import('./screens/Home').then(m => ({ default: m.Home })));
const GradeView      = lazy(() => import('./screens/GradeView').then(m => ({ default: m.GradeView })));
const LessonView     = lazy(() => import('./screens/LessonView').then(m => ({ default: m.LessonView })));
const Contact        = lazy(() => import('./screens/Contact').then(m => ({ default: m.Contact })));
const AdminDashboard = lazy(() => import('./screens/AdminDashboard').then(m => ({ default: m.AdminDashboard })));
const MyActivities   = lazy(() => import('./screens/MyActivities').then(m => ({ default: m.MyActivities })));
const EvaluationView = lazy(() => import('./screens/EvaluationView').then(m => ({ default: m.EvaluationView })));
const Profile        = lazy(() => import('./screens/Profile').then(m => ({ default: m.Profile })));

// Spinner padrão enquanto a tela carrega
const RouteFallback = () => (
  <div className="h-[60vh] flex items-center justify-center">
    <div className="w-8 h-8 border-4 border-slate-200 border-t-tocantins-blue rounded-full animate-spin"></div>
  </div>
);

const StudentRoute = ({ children }: { children?: React.ReactNode }) => {
  const { student, isLoading } = useAuth();
  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-50">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-tocantins-blue rounded-full animate-spin"></div>
      </div>
    );
  }
  if (!student) return <Navigate to="/login" replace />;

  // Aluno autenticado mas SEM perfil completo (típico do 1º login Google):
  // manda para /login para o formulário de "Completar Perfil" (turma + série).
  const adminEmails = ['admin@admin.com', 'divinoviana@gmail.com', ...Object.values(TEACHER_EMAILS)];
  const isAdminEmail = adminEmails.includes(String(student.email || '').toLowerCase());
  const profileIncomplete = !student.grade || !student.school_class || student.grade === 'N/A' || student.school_class === 'N/A';
  if (profileIncomplete && !isAdminEmail) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

function AppContent() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col font-sans transition-colors duration-300">
      <Header />
      <main className="flex-grow">
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/admin/login" element={<Login adminMode={true} />} />
            <Route path="/" element={<StudentRoute><Home /></StudentRoute>} />
            <Route path="/grade/:id" element={<StudentRoute><GradeView /></StudentRoute>} />
            <Route path="/lesson/:lessonId" element={<StudentRoute><LessonView /></StudentRoute>} />
            <Route path="/evaluation/:examId" element={<StudentRoute><EvaluationView /></StudentRoute>} />
            <Route path="/contact" element={<StudentRoute><Contact /></StudentRoute>} />
            <Route path="/my-activities" element={<StudentRoute><MyActivities /></StudentRoute>} />
            <Route path="/profile" element={<StudentRoute><Profile /></StudentRoute>} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </Suspense>
      </main>
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center text-center md:text-left border-b border-slate-800 pb-8 mb-8">
            <div>
              <h4 className="text-white font-bold mb-2">Portal de Ciências Humanas</h4>
              <p className="text-sm">Conectando o conhecimento à realidade juvenil do Tocantins.</p>
            </div>
            
            <div className="flex flex-col md:items-end gap-4">
              <Link to="/contact" className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 rounded-xl text-tocantins-yellow hover:bg-slate-700 transition-colors text-sm font-bold">
                <Mail className="w-4 h-4" /> Contato
              </Link>
              <Link to="/admin" className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 rounded-xl text-white/60 hover:text-white transition-colors text-xs">
                <Lock className="w-3 h-3" /> Painel Admin
              </Link>
            </div>
          </div>
          <div className="text-center text-xs space-y-2 opacity-80">
            <p>© 2026 {TEACHER_INFO.department} - Tocantins</p>
            <p>{TEACHER_INFO.role}: <a href="http://lattes.cnpq.br/7639474934278364" target="_blank" rel="noopener noreferrer" className="text-slate-100 font-black hover:text-tocantins-yellow transition-all underline decoration-slate-700 underline-offset-4 decoration-2">{TEACHER_INFO.name}</a></p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
