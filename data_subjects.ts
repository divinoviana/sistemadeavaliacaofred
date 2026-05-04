
import { Subject } from './types';

export const subjectsInfo: Record<Subject, { name: string; color: string; gradient: string; glow: string; icon: string }> = {
  geografia: {
    name: 'Geografia',
    color: 'bg-emerald-500',
    gradient: 'bg-gradient-to-br from-emerald-400 via-cyan-400 to-blue-500',
    glow: 'shadow-glow-cyan',
    icon: '🌍',
  },
  historia: {
    name: 'História',
    color: 'bg-amber-600',
    gradient: 'bg-gradient-to-br from-orange-400 via-pink-500 to-rose-500',
    glow: 'shadow-glow-orange',
    icon: '⏳',
  },
  filosofia: {
    name: 'Filosofia',
    color: 'bg-indigo-600',
    gradient: 'bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500',
    glow: 'shadow-glow-purple',
    icon: '🧠',
  },
  sociologia: {
    name: 'Sociologia',
    color: 'bg-rose-500',
    gradient: 'bg-gradient-to-br from-pink-500 via-rose-500 to-orange-500',
    glow: 'shadow-glow-pink',
    icon: '✊',
  },
};
