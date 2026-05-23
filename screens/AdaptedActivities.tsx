// =====================================================================
// AdaptedActivities — tela pública para gerar atividades adaptadas
// =====================================================================
// Fluxo (uma rota só, com estado interno):
//   gallery  → escolha do estudante
//   builder  → tema + componente + tipo + duração
//   result   → atividade gerada + export PDF/DOCX + imprimir
// =====================================================================

import React, { useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search, Filter, Sun, Moon, ChevronLeft, Sparkles, Loader2,
  FileText, Printer, RotateCw, Download, BookOpen, Heart,
  AlertTriangle, Target, Lightbulb, History as HistoryIcon, Trash2,
} from 'lucide-react';
import {
  NEURO_STUDENTS, NeuroStudent, avatarUrl, allDiagnoses,
} from '../data_students_neuro';
import {
  AdaptedActivity, GenerateRequest, generateAdaptedActivity,
  loadHistory, saveToHistory, clearHistory, HistoryEntry,
} from '../services/adaptedActivityService';
import { BlocksRenderer } from '../components/AdaptedActivities/BlocksRenderer';
import { PasscodeGate } from '../components/AdaptedActivities/PasscodeGate';
import { exportActivityPDF, exportActivityDOCX } from '../services/adaptedActivityExport';

// ---------------------------------------------------------------------
// Cores por accent
// ---------------------------------------------------------------------
const ACCENT_BG: Record<NeuroStudent['accent'], string> = {
  pink:    'from-vibe-pink to-vibe-magenta',
  purple:  'from-vibe-purple to-vibe-indigo',
  cyan:    'from-vibe-cyan to-vibe-blue',
  lime:    'from-vibe-lime to-vibe-cyan',
  orange:  'from-vibe-orange to-vibe-pink',
  magenta: 'from-vibe-magenta to-vibe-purple',
  blue:    'from-vibe-blue to-vibe-indigo',
  indigo:  'from-vibe-indigo to-vibe-purple',
};

// ---------------------------------------------------------------------
// Component principal
// ---------------------------------------------------------------------

type Step = 'gallery' | 'builder' | 'result';

export const AdaptedActivities: React.FC = () => {
  const [step, setStep] = useState<Step>('gallery');
  const [selected, setSelected] = useState<NeuroStudent | null>(null);
  const [activity, setActivity] = useState<AdaptedActivity | null>(null);
  const [lastReq, setLastReq] = useState<GenerateRequest | null>(null);

  return (
    <PasscodeGate>
    <div className="min-h-[80vh] bg-mesh-bg dark:bg-slate-950">
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <PageHeader />

        {step === 'gallery' && (
          <Gallery
            onPick={(s) => { setSelected(s); setStep('builder'); }}
          />
        )}

        {step === 'builder' && selected && (
          <Builder
            student={selected}
            onBack={() => setStep('gallery')}
            onGenerated={(act, req) => {
              setActivity(act);
              setLastReq(req);
              setStep('result');
            }}
          />
        )}

        {step === 'result' && selected && activity && lastReq && (
          <Result
            student={selected}
            activity={activity}
            request={lastReq}
            onBack={() => setStep('builder')}
            onNew={() => { setStep('gallery'); setSelected(null); setActivity(null); }}
            onRegenerate={async () => {
              setStep('builder');
            }}
          />
        )}
      </div>
    </div>
    </PasscodeGate>
  );
};

// =====================================================================
// PageHeader
// =====================================================================
const PageHeader: React.FC = () => (
  <div className="mb-8">
    <Link
      to="/"
      className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-500 hover:text-vibe-purple mb-4"
    >
      <ChevronLeft className="w-4 h-4" /> Voltar ao portal
    </Link>
    <div className="flex items-start gap-4">
      <div className="w-16 h-16 rounded-3xl bg-gradient-vibe shadow-glow-purple flex items-center justify-center text-3xl shrink-0">
        ✨
      </div>
      <div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight font-display text-slate-900 dark:text-white">
          Atividades <span className="text-gradient-vibe">Adaptadas</span>
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-1 max-w-2xl">
          Gere atividades pedagógicas individualizadas para os estudantes neurodivergentes
          do Colégio Estadual Frederico José Pedreira Neto. Cada atividade é construída
          a partir do PEI do aluno e do tema da sua aula.
        </p>
      </div>
    </div>
  </div>
);

// =====================================================================
// Gallery — grid de estudantes
// =====================================================================
const Gallery: React.FC<{ onPick: (s: NeuroStudent) => void }> = ({ onPick }) => {
  const [search, setSearch] = useState('');
  const [turno, setTurno] = useState<'all' | 'matutino' | 'vespertino'>('all');
  const [serie, setSerie] = useState<string>('all');
  const [diag, setDiag] = useState<string>('all');
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>(() => loadHistory());

  const filtered = useMemo(() => {
    return NEURO_STUDENTS.filter(s => {
      if (search && !s.fullName.toLowerCase().includes(search.toLowerCase())) return false;
      if (turno !== 'all' && s.turno !== turno) return false;
      if (serie !== 'all' && s.grade !== serie) return false;
      if (diag !== 'all' && !s.diagnoses.some(d => d === diag)) return false;
      return true;
    });
  }, [search, turno, serie, diag]);

  const grouped = useMemo(() => {
    const m = filtered.filter(s => s.turno === 'matutino');
    const v = filtered.filter(s => s.turno === 'vespertino');
    return { m, v };
  }, [filtered]);

  return (
    <div>
      {/* Filtros */}
      <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border-2 border-slate-200/70 dark:border-slate-800 rounded-3xl p-4 sm:p-5 mb-6 shadow-lg">
        <div className="flex flex-col lg:flex-row gap-3 lg:items-center">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Buscar por nome…"
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-vibe-purple"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <select value={turno} onChange={e => setTurno(e.target.value as any)}
              className="px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:border-vibe-purple">
              <option value="all">Todos os turnos</option>
              <option value="matutino">☀️ Matutino</option>
              <option value="vespertino">🌙 Vespertino</option>
            </select>
            <select value={serie} onChange={e => setSerie(e.target.value)}
              className="px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:border-vibe-purple">
              <option value="all">Todas as séries</option>
              <option value="1º ano">1º ano</option>
              <option value="2º ano">2º ano</option>
              <option value="3º ano">3º ano</option>
            </select>
            <select value={diag} onChange={e => setDiag(e.target.value)}
              className="px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:border-vibe-purple">
              <option value="all">Todos os diagnósticos</option>
              {allDiagnoses().map(d => <option key={d} value={d}>{d}</option>)}
            </select>
            <button
              onClick={() => setShowHistory(s => !s)}
              className={`px-4 py-2.5 rounded-xl border-2 text-sm font-black uppercase tracking-widest flex items-center gap-2 transition ${showHistory ? 'bg-vibe-purple text-white border-vibe-purple' : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-vibe-purple'}`}
            >
              <HistoryIcon className="w-4 h-4" /> Histórico ({history.length})
            </button>
          </div>
        </div>
      </div>

      {/* Histórico */}
      {showHistory && (
        <div className="mb-8 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-black text-slate-900 dark:text-white">Atividades recentes (deste navegador)</h3>
            {history.length > 0 && (
              <button
                onClick={() => { clearHistory(); setHistory([]); }}
                className="px-3 py-1.5 rounded-lg text-xs font-bold text-red-600 hover:bg-red-50 flex items-center gap-1"
              >
                <Trash2 className="w-3 h-3" /> Limpar
              </button>
            )}
          </div>
          {history.length === 0 ? (
            <p className="text-sm text-slate-500 italic">Nenhuma atividade gerada ainda.</p>
          ) : (
            <ul className="space-y-2">
              {history.map(h => (
                <li key={h.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-sm">
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-slate-900 dark:text-white truncate">{h.activity.title}</p>
                    <p className="text-xs text-slate-500 truncate">
                      {h.studentName} · {h.subject} · {h.activityType} · {new Date(h.createdAt).toLocaleString('pt-BR')}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Grid de estudantes */}
      {grouped.m.length > 0 && (
        <Section title="☀️ Matutino" count={grouped.m.length}>
          <Grid students={grouped.m} onPick={onPick} />
        </Section>
      )}
      {grouped.v.length > 0 && (
        <Section title="🌙 Vespertino" count={grouped.v.length}>
          <Grid students={grouped.v} onPick={onPick} />
        </Section>
      )}
      {filtered.length === 0 && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border-2 border-dashed border-slate-300 dark:border-slate-700">
          <p className="text-slate-500 font-bold">Nenhum estudante corresponde aos filtros.</p>
        </div>
      )}
    </div>
  );
};

const Section: React.FC<{ title: string; count: number; children: React.ReactNode }> = ({ title, count, children }) => (
  <section className="mb-10">
    <div className="flex items-center gap-3 mb-4">
      <h2 className="text-xl font-black text-slate-900 dark:text-white">{title}</h2>
      <span className="px-2.5 py-1 rounded-full bg-slate-200 dark:bg-slate-800 text-xs font-black text-slate-600 dark:text-slate-300">
        {count}
      </span>
    </div>
    {children}
  </section>
);

const Grid: React.FC<{ students: NeuroStudent[]; onPick: (s: NeuroStudent) => void }> = ({ students, onPick }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
    {students.map(s => <StudentCard key={s.id} s={s} onPick={onPick} />)}
  </div>
);

const StudentCard: React.FC<{ s: NeuroStudent; onPick: (s: NeuroStudent) => void }> = ({ s, onPick }) => (
  <button
    onClick={() => onPick(s)}
    className={`group relative overflow-hidden text-left bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-5 hover:border-vibe-purple hover:-translate-y-1 hover:shadow-2xl transition-all duration-300`}
  >
    <div className={`absolute -top-12 -right-12 w-40 h-40 rounded-full bg-gradient-to-br ${ACCENT_BG[s.accent]} opacity-10 group-hover:opacity-20 group-hover:scale-110 transition`} />

    <div className="relative flex items-start gap-3 mb-3">
      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${ACCENT_BG[s.accent]} p-0.5 shadow-lg shrink-0`}>
        <div className="w-full h-full rounded-2xl bg-white overflow-hidden">
          <img
            src={avatarUrl(s, 200)}
            alt={s.firstName}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-black text-slate-900 dark:text-white truncate text-base leading-tight">
          {s.firstName}
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
          {s.fullName.split(' ').slice(1).join(' ')}
        </p>
        <p className="text-[10px] uppercase tracking-widest font-black text-slate-400 mt-1">
          {s.grade} · Turma {s.className} · {s.turno === 'matutino' ? '☀️' : '🌙'}
        </p>
      </div>
      <span className="text-2xl">{s.mascot}</span>
    </div>

    <div className="flex flex-wrap gap-1.5 mb-3">
      {s.diagnoses.slice(0, 3).map(d => (
        <span key={d} className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] font-black text-slate-700 dark:text-slate-300 uppercase tracking-wide">
          {d}
        </span>
      ))}
      {s.diagnoses.length > 3 && (
        <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] font-black text-slate-500">
          +{s.diagnoses.length - 3}
        </span>
      )}
    </div>

    <div className="flex items-center gap-1.5 text-xs">
      <span className="text-slate-400">Gerar atividade</span>
      <Sparkles className="w-3.5 h-3.5 text-vibe-purple group-hover:text-vibe-pink group-hover:rotate-12 transition" />
    </div>
  </button>
);

// =====================================================================
// Builder — formulário com resumo do PEI
// =====================================================================

const Builder: React.FC<{
  student: NeuroStudent;
  onBack: () => void;
  onGenerated: (a: AdaptedActivity, r: GenerateRequest) => void;
}> = ({ student, onBack, onGenerated }) => {
  const [theme, setTheme] = useState('');
  const [subject, setSubject] = useState<GenerateRequest['subject']>('História');
  const [activityType, setActivityType] = useState<GenerateRequest['activityType']>('Atividade simples');
  const [duration, setDuration] = useState<GenerateRequest['duration']>('30 minutos');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!theme.trim()) {
      setError('Informe o tema da aula.');
      return;
    }
    setLoading(true);
    setError(null);
    const req: GenerateRequest = {
      student, theme: theme.trim(), subject, activityType, duration,
      additionalNotes: notes.trim() || undefined,
    };
    try {
      const act = await generateAdaptedActivity(req);
      saveToHistory({
        id: `${student.id}-${Date.now()}`,
        studentId: student.id,
        studentName: student.fullName,
        createdAt: new Date().toISOString(),
        theme: req.theme,
        subject: req.subject,
        activityType: req.activityType,
        activity: act,
      });
      onGenerated(act, req);
    } catch (e: any) {
      setError(e?.message || 'Erro desconhecido ao gerar atividade.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={onBack} className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-500 hover:text-vibe-purple mb-4">
        <ChevronLeft className="w-4 h-4" /> Trocar estudante
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* PEI à esquerda */}
        <aside className="lg:col-span-2">
          <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden sticky top-20">
            <div className={`bg-gradient-to-br ${ACCENT_BG[student.accent]} p-6 text-white`}>
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-2xl bg-white/30 p-1 shrink-0">
                  <img src={avatarUrl(student, 200)} alt={student.firstName} className="w-full h-full rounded-xl bg-white" />
                </div>
                <div className="min-w-0">
                  <h2 className="text-2xl font-black truncate">{student.firstName}</h2>
                  <p className="text-sm opacity-90 truncate">{student.fullName.split(' ').slice(1).join(' ')}</p>
                  <p className="text-xs uppercase font-black tracking-widest opacity-80 mt-1">
                    {student.grade} · {student.className} · {student.turno === 'matutino' ? '☀️ Matutino' : '🌙 Vespertino'}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5 space-y-5 max-h-[60vh] lg:max-h-none overflow-y-auto">
              <PEIBlock icon={<BookOpen className="w-3.5 h-3.5" />} label="Diagnósticos" tone="purple">
                <div className="flex flex-wrap gap-1.5">
                  {student.diagnoses.map(d => (
                    <span key={d} className="px-2 py-1 rounded-full bg-vibe-purple/10 text-vibe-purple text-[10px] font-black uppercase tracking-widest">
                      {d}
                    </span>
                  ))}
                </div>
              </PEIBlock>

              <PEIBlock icon={<Lightbulb className="w-3.5 h-3.5" />} label="Resumo da condição" tone="cyan">
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{student.conditionSummary}</p>
              </PEIBlock>

              <PEIBlock icon={<Heart className="w-3.5 h-3.5" />} label="Interesses" tone="pink">
                <div className="flex flex-wrap gap-1.5">
                  {student.interests.map(i => (
                    <span key={i} className="px-2 py-0.5 rounded-md bg-vibe-pink/10 text-vibe-pink text-[11px] font-bold">{i}</span>
                  ))}
                </div>
              </PEIBlock>

              <PEIBlock icon={<Target className="w-3.5 h-3.5" />} label="Pontos fortes" tone="lime">
                <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1 list-disc list-inside">
                  {student.strengths.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
              </PEIBlock>

              <PEIBlock icon={<AlertTriangle className="w-3.5 h-3.5" />} label="Barreiras" tone="orange">
                <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1 list-disc list-inside">
                  {student.barriers.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
              </PEIBlock>
            </div>
          </div>
        </aside>

        {/* Form à direita */}
        <div className="lg:col-span-3 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8">
          <h2 className="text-2xl font-black mb-1">Configurar atividade</h2>
          <p className="text-sm text-slate-500 mb-6">A IA vai usar os dados do PEI ao lado para personalizar.</p>

          <div className="space-y-5">
            <Field label="Tema da aula" required>
              <input
                type="text"
                value={theme}
                onChange={e => setTheme(e.target.value)}
                placeholder="ex.: Iluminismo · Cultura indígena · Geografia do Tocantins"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-base font-medium text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-vibe-purple"
              />
            </Field>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Componente curricular">
                <select value={subject} onChange={e => setSubject(e.target.value as any)} className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-base font-medium text-slate-900 dark:text-white focus:outline-none focus:border-vibe-purple">
                  <option>História</option>
                  <option>Geografia</option>
                  <option>Filosofia</option>
                  <option>Sociologia</option>
                  <option>Ciências Humanas</option>
                </select>
              </Field>

              <Field label="Duração">
                <select value={duration} onChange={e => setDuration(e.target.value as any)} className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-base font-medium text-slate-900 dark:text-white focus:outline-none focus:border-vibe-purple">
                  <option>15 minutos</option>
                  <option>30 minutos</option>
                  <option>45 minutos</option>
                </select>
              </Field>
            </div>

            <Field label="Tipo de atividade">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {(['Atividade simples', 'Caça-palavras', 'Palavras-cruzadas', 'Jogo de associação', 'Pintura/recorte', 'Avaliação curta', 'Interpretação de imagem'] as const).map(t => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setActivityType(t)}
                    className={`px-3 py-2.5 rounded-xl border-2 text-xs font-black uppercase tracking-wider transition ${activityType === t ? 'bg-vibe-purple text-white border-vibe-purple shadow-glow-purple' : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-vibe-purple'}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </Field>

            <Field label="Observações para a IA (opcional)">
              <textarea
                value={notes}
                onChange={e => setNotes(e.target.value)}
                rows={3}
                placeholder="ex.: Quero focar em vocabulário visual; o aluno hoje está mais agitado; usar tema Tocantins."
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-base text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-vibe-purple"
              />
            </Field>

            {error && (
              <div className="rounded-xl bg-red-50 border-2 border-red-200 text-red-700 text-sm p-4 font-medium">
                {error}
              </div>
            )}

            <button
              onClick={handleGenerate}
              disabled={loading || !theme.trim()}
              className="w-full px-6 py-4 rounded-2xl bg-gradient-vibe text-white font-black uppercase tracking-widest text-sm shadow-glow-purple disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] transition"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> Gerando atividade…
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" /> Gerar atividade adaptada
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Field: React.FC<{ label: string; required?: boolean; children: React.ReactNode }> = ({ label, required, children }) => (
  <div>
    <label className="block text-xs font-black uppercase tracking-widest text-slate-600 dark:text-slate-400 mb-1.5">
      {label} {required && <span className="text-vibe-pink">*</span>}
    </label>
    {children}
  </div>
);

const PEIBlock: React.FC<{ icon: React.ReactNode; label: string; tone: 'purple' | 'cyan' | 'pink' | 'lime' | 'orange'; children: React.ReactNode }> = ({ icon, label, tone, children }) => {
  const colors: Record<string, string> = {
    purple: 'text-vibe-purple', cyan: 'text-vibe-cyan', pink: 'text-vibe-pink',
    lime: 'text-vibe-lime', orange: 'text-vibe-orange',
  };
  return (
    <div>
      <div className={`flex items-center gap-1.5 ${colors[tone]} mb-1.5`}>
        {icon}
        <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
      </div>
      {children}
    </div>
  );
};

// =====================================================================
// Result — atividade gerada
// =====================================================================

const Result: React.FC<{
  student: NeuroStudent;
  activity: AdaptedActivity;
  request: GenerateRequest;
  onBack: () => void;
  onNew: () => void;
  onRegenerate: () => Promise<void>;
}> = ({ student, activity, request, onBack, onNew }) => {
  const printRef = useRef<HTMLDivElement>(null);
  const [showAnswers, setShowAnswers] = useState(false);
  const [exporting, setExporting] = useState<'pdf' | 'docx' | null>(null);

  const handlePDF = async () => {
    setExporting('pdf');
    try {
      await exportActivityPDF(student, activity, request, { showAnswers });
    } catch (e) {
      alert('Falha ao gerar PDF: ' + (e as any)?.message);
    } finally {
      setExporting(null);
    }
  };
  const handleDOCX = async () => {
    setExporting('docx');
    try {
      await exportActivityDOCX(student, activity, request, { showAnswers });
    } catch (e) {
      alert('Falha ao gerar DOCX: ' + (e as any)?.message);
    } finally {
      setExporting(null);
    }
  };
  const handlePrint = () => window.print();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 print:hidden">
        <button onClick={onBack} className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-500 hover:text-vibe-purple">
          <ChevronLeft className="w-4 h-4" /> Refinar
        </button>

        <div className="flex flex-wrap gap-2">
          <label className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 text-xs font-black uppercase tracking-widest cursor-pointer">
            <input type="checkbox" checked={showAnswers} onChange={e => setShowAnswers(e.target.checked)} />
            Mostrar gabarito
          </label>
          <button onClick={handlePrint} className="px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 text-xs font-black uppercase tracking-widest hover:border-vibe-purple flex items-center gap-2">
            <Printer className="w-4 h-4" /> Imprimir
          </button>
          <button onClick={handleDOCX} disabled={!!exporting} className="px-4 py-2 rounded-xl bg-vibe-blue text-white text-xs font-black uppercase tracking-widest disabled:opacity-50 flex items-center gap-2">
            {exporting === 'docx' ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileText className="w-4 h-4" />} DOCX
          </button>
          <button onClick={handlePDF} disabled={!!exporting} className="px-4 py-2 rounded-xl bg-vibe-pink text-white text-xs font-black uppercase tracking-widest disabled:opacity-50 flex items-center gap-2">
            {exporting === 'pdf' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />} PDF
          </button>
          <button onClick={onNew} className="px-4 py-2 rounded-xl bg-gradient-vibe text-white text-xs font-black uppercase tracking-widest flex items-center gap-2">
            <RotateCw className="w-4 h-4" /> Novo aluno
          </button>
        </div>
      </div>

      {/* Conteúdo imprimível */}
      <div ref={printRef} id="activity-print-area" className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 print:border-0 print:p-0 print:shadow-none">
        {/* Cabeçalho da escola */}
        <div className="border-b-2 border-slate-300 pb-4 mb-6 text-center print:border-slate-400">
          <p className="text-[10px] uppercase tracking-widest font-black text-slate-500">Estado do Tocantins · Secretaria da Educação</p>
          <p className="text-sm font-bold text-slate-700 print:text-black">Escola Estadual Frederico José Pedreira Neto</p>
          <p className="text-[10px] text-slate-500 mt-0.5">Atividade Pedagógica Adaptada · {new Date().toLocaleDateString('pt-BR')}</p>
        </div>

        {/* Identificação */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6 text-sm">
          <Identif label="Estudante" value={student.fullName} />
          <Identif label="Turma · Série" value={`${student.className} · ${student.grade}`} />
          <Identif label="Componente" value={`${request.subject} · ${request.duration}`} />
        </div>

        {/* Título da atividade */}
        <div className="mb-6">
          <p className="text-[10px] uppercase tracking-widest font-black text-vibe-purple mb-1 print:text-black">
            {request.activityType} · Tema: {request.theme}
          </p>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white print:text-black font-display tracking-tight">
            {activity.title}
          </h1>
        </div>

        {/* Objetivo + habilidade */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <Card label="🎯 Objetivo" tone="purple">{activity.objective}</Card>
          <Card label="📚 Habilidade trabalhada" tone="cyan">{activity.skill}</Card>
        </div>

        {/* Instruções para o professor */}
        <div className="rounded-2xl bg-slate-50 dark:bg-slate-800/50 border-2 border-slate-200 dark:border-slate-700 p-5 mb-8 print:bg-transparent">
          <p className="text-xs uppercase tracking-widest font-black text-slate-600 dark:text-slate-400 mb-2 print:text-black">
            👩‍🏫 Instruções para o professor
          </p>
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap print:text-black">
            {activity.teacherInstructions}
          </p>
        </div>

        {/* Divisor */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-slate-300 print:bg-slate-400" />
          <span className="text-xs uppercase tracking-widest font-black text-slate-500">Atividade do(a) aluno(a)</span>
          <div className="flex-1 h-px bg-slate-300 print:bg-slate-400" />
        </div>

        {/* Blocos da atividade */}
        <div className="mb-8">
          <BlocksRenderer blocks={activity.studentBlocks} showAnswers={showAnswers} />
        </div>

        {/* Adaptações usadas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 print:hidden">
          <Card label="✨ Adaptações utilizadas" tone="lime">
            <ul className="space-y-1">
              {activity.adaptationsUsed.map((a, i) => <li key={i}>· {a}</li>)}
            </ul>
          </Card>
          {activity.ludicElements?.length > 0 && (
            <Card label="🎲 Elementos lúdicos" tone="orange">
              <ul className="space-y-1">
                {activity.ludicElements.map((a, i) => <li key={i}>· {a}</li>)}
              </ul>
            </Card>
          )}
        </div>

        {/* Materiais */}
        {activity.materials?.length > 0 && (
          <div className="mt-4 text-xs text-slate-500 print:text-black">
            <strong className="uppercase tracking-widest">Materiais:</strong> {activity.materials.join(' · ')}
          </div>
        )}
      </div>
    </div>
  );
};

const Identif: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="border-2 border-slate-200 rounded-xl px-3 py-2 print:border-slate-400">
    <p className="text-[9px] uppercase tracking-widest font-black text-slate-500 print:text-black">{label}</p>
    <p className="text-sm font-bold text-slate-800 print:text-black truncate">{value}</p>
  </div>
);

const Card: React.FC<{ label: string; tone: 'purple' | 'cyan' | 'lime' | 'orange'; children: React.ReactNode }> = ({ label, tone, children }) => {
  const map: Record<string, string> = {
    purple: 'border-vibe-purple/30 bg-vibe-purple/5',
    cyan:   'border-vibe-cyan/30 bg-vibe-cyan/5',
    lime:   'border-vibe-lime/30 bg-vibe-lime/5',
    orange: 'border-vibe-orange/30 bg-vibe-orange/5',
  };
  return (
    <div className={`rounded-2xl border-2 ${map[tone]} p-4 print:bg-transparent print:border-slate-400`}>
      <p className="text-[10px] uppercase tracking-widest font-black text-slate-700 dark:text-slate-300 mb-2 print:text-black">{label}</p>
      <div className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed print:text-black">{children}</div>
    </div>
  );
};

export default AdaptedActivities;
