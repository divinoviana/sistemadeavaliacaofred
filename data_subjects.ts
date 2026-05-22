
import { Subject } from './types';

export const subjectsInfo: Record<Subject, { name: string; color: string; gradient: string; glow: string; icon: string; area: string }> = {
  // ── Ciências Humanas e Sociais Aplicadas ─────────────────────────────
  geografia: {
    name: 'Geografia',
    color: 'bg-emerald-500',
    gradient: 'bg-gradient-to-br from-emerald-400 via-cyan-400 to-blue-500',
    glow: 'shadow-glow-cyan',
    icon: '🌍',
    area: 'Ciências Humanas',
  },
  historia: {
    name: 'História',
    color: 'bg-amber-600',
    gradient: 'bg-gradient-to-br from-orange-400 via-pink-500 to-rose-500',
    glow: 'shadow-glow-orange',
    icon: '⏳',
    area: 'Ciências Humanas',
  },
  filosofia: {
    name: 'Filosofia',
    color: 'bg-indigo-600',
    gradient: 'bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500',
    glow: 'shadow-glow-purple',
    icon: '🧠',
    area: 'Ciências Humanas',
  },
  sociologia: {
    name: 'Sociologia',
    color: 'bg-rose-500',
    gradient: 'bg-gradient-to-br from-pink-500 via-rose-500 to-orange-500',
    glow: 'shadow-glow-pink',
    icon: '✊',
    area: 'Ciências Humanas',
  },

  // ── Ciências da Natureza e suas Tecnologias ──────────────────────────
  quimica: {
    name: 'Química',
    color: 'bg-purple-600',
    gradient: 'bg-gradient-to-br from-purple-500 via-violet-500 to-indigo-600',
    glow: 'shadow-glow-purple',
    icon: '⚗️',
    area: 'Ciências da Natureza',
  },
  fisica: {
    name: 'Física',
    color: 'bg-cyan-600',
    gradient: 'bg-gradient-to-br from-cyan-400 via-sky-500 to-blue-600',
    glow: 'shadow-glow-cyan',
    icon: '⚡',
    area: 'Ciências da Natureza',
  },
  biologia: {
    name: 'Biologia',
    color: 'bg-green-600',
    gradient: 'bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600',
    glow: 'shadow-glow-cyan',
    icon: '🧬',
    area: 'Ciências da Natureza',
  },

  // ── Linguagens, Códigos e suas Tecnologias ───────────────────────────
  portugues: {
    name: 'Português',
    color: 'bg-yellow-600',
    gradient: 'bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-500',
    glow: 'shadow-glow-orange',
    icon: '📖',
    area: 'Linguagens',
  },
  redacao: {
    name: 'Redação',
    color: 'bg-orange-600',
    gradient: 'bg-gradient-to-br from-orange-400 via-red-500 to-rose-500',
    glow: 'shadow-glow-orange',
    icon: '✍️',
    area: 'Linguagens',
  },
  ingles: {
    name: 'Inglês',
    color: 'bg-blue-600',
    gradient: 'bg-gradient-to-br from-blue-400 via-indigo-500 to-violet-600',
    glow: 'shadow-glow-purple',
    icon: '🇬🇧',
    area: 'Linguagens',
  },
  artes: {
    name: 'Artes',
    color: 'bg-pink-600',
    gradient: 'bg-gradient-to-br from-pink-400 via-fuchsia-500 to-purple-600',
    glow: 'shadow-glow-pink',
    icon: '🎨',
    area: 'Linguagens',
  },
  educacao_fisica: {
    name: 'Ed. Física',
    color: 'bg-red-500',
    gradient: 'bg-gradient-to-br from-red-400 via-orange-500 to-amber-500',
    glow: 'shadow-glow-orange',
    icon: '🏃',
    area: 'Linguagens',
  },

  // ── Matemática e suas Tecnologias ────────────────────────────────────
  matematica: {
    name: 'Matemática',
    color: 'bg-slate-700',
    gradient: 'bg-gradient-to-br from-slate-500 via-blue-700 to-indigo-800',
    glow: 'shadow-glow-purple',
    icon: '📐',
    area: 'Matemática',
  },
};

export const subjectAreas: { area: string; subjects: Subject[] }[] = [
  {
    area: 'Ciências Humanas',
    subjects: ['historia', 'geografia', 'filosofia', 'sociologia'],
  },
  {
    area: 'Ciências da Natureza',
    subjects: ['quimica', 'fisica', 'biologia'],
  },
  {
    area: 'Linguagens',
    subjects: ['portugues', 'redacao', 'ingles', 'artes', 'educacao_fisica'],
  },
  {
    area: 'Matemática',
    subjects: ['matematica'],
  },
];

export const allSubjects: Subject[] = subjectAreas.flatMap(a => a.subjects);
