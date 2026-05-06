// =====================================================================
// Cliente frontend para a Vercel Function /api/generate-adapted-activity
// =====================================================================

import { NeuroStudent } from '../data_students_neuro';
import { getStoredPasscode } from '../components/AdaptedActivities/PasscodeGate';

// ----------------- Tipos ---------------------------------------------

export type StudentBlock =
  | { type: 'instruction'; content: string; title?: string }
  | { type: 'text';        content: string; title?: string }
  | { type: 'association' | 'matching_pairs'; title?: string; pairs?: { left: string; right: string }[]; leftColumn?: string[]; rightColumn?: string[] }
  | { type: 'multiple_choice'; title?: string; content?: string; options: { label: string; text: string }[]; correctIndex?: number }
  | { type: 'fill_blank'; title?: string; blanks: { sentence: string; answer: string }[] }
  | { type: 'draw_paint'; title?: string; drawPrompt: string; imageEmoji?: string }
  | { type: 'wordsearch'; title?: string; words: string[] }
  | { type: 'crossword'; title?: string; words: string[]; clues?: string[] }
  | { type: 'image_description'; title?: string; imageEmoji: string; imageDescription: string; content?: string }
  | { type: 'sequence'; title?: string; items: string[] };

export interface AdaptedActivity {
  title: string;
  objective: string;
  skill: string;
  teacherInstructions: string;
  studentBlocks: StudentBlock[];
  adaptationsUsed: string[];
  ludicElements: string[];
  estimatedTime: string;
  materials: string[];
}

export interface GenerateRequest {
  student: NeuroStudent;
  theme: string;
  subject: 'História' | 'Geografia' | 'Filosofia' | 'Sociologia' | 'Ciências Humanas';
  activityType:
    | 'Atividade simples'
    | 'Caça-palavras'
    | 'Palavras-cruzadas'
    | 'Jogo de associação'
    | 'Pintura/recorte'
    | 'Avaliação curta'
    | 'Interpretação de imagem';
  duration: '15 minutos' | '30 minutos' | '45 minutos';
  additionalNotes?: string;
}

// ----------------- Chamada ao endpoint --------------------------------

export async function generateAdaptedActivity(req: GenerateRequest): Promise<AdaptedActivity> {
  const passcode = getStoredPasscode();
  const res = await fetch('/api/generate-adapted-activity', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Header lido pela serverless function. A validação real é no servidor —
      // sem o passcode correto, a IA não responde (protege a chave Anthropic).
      ...(passcode ? { 'x-passcode': passcode } : {}),
    },
    body: JSON.stringify(req),
  });

  if (!res.ok) {
    let detail = '';
    try { detail = (await res.json())?.error || ''; } catch {}
    throw new Error(detail || `Falha ao gerar atividade (${res.status})`);
  }
  const data = await res.json();
  return data.activity as AdaptedActivity;
}

// ----------------- Histórico local (sem DB) ---------------------------

const LS_KEY = 'chsa.adaptedActivities.history.v1';

export interface HistoryEntry {
  id: string;
  studentId: string;
  studentName: string;
  createdAt: string;
  theme: string;
  subject: string;
  activityType: string;
  activity: AdaptedActivity;
}

export function loadHistory(): HistoryEntry[] {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as HistoryEntry[];
  } catch {
    return [];
  }
}

export function saveToHistory(entry: HistoryEntry) {
  const list = loadHistory();
  list.unshift(entry);
  localStorage.setItem(LS_KEY, JSON.stringify(list.slice(0, 30)));
}

export function clearHistory() {
  localStorage.removeItem(LS_KEY);
}
