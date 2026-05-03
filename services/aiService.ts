// =====================================================================
// Serviço de IA — DeepSeek (API compatível com OpenAI)
// =====================================================================
// Funções:
//   - evaluateActivities()        → corrige envios dos alunos
//   - generateLessonActivity()    → gera atividades 5+2 para uma aula
//   - generateBimonthlyEvaluation() → gera simulado bimestral
//   - generateLessonPlan()        → gera plano de aula
//   - generatePedagogicalSummary() → relatório pedagógico (cruza notas + obs.)
// =====================================================================

import { ChartData, TableData, CrosswordData, ActivityImage } from "../types";

// ----------------------------------------------------------------------
// Tipagens
// ----------------------------------------------------------------------
export interface CorrectionResult {
  question: string;
  studentAnswer: string;
  isCorrect: boolean;
  score: number;
  feedback: string;
}

export interface AIResponse {
  generalComment: string;
  corrections: CorrectionResult[];
}

export interface EvaluationQuestion {
  id: number;
  textFragment: string;
  questionText: string;
  options: { a: string; b: string; c: string; d: string; e: string };
  correctOption: string;
  difficulty: 'Fácil' | 'Médio' | 'Difícil';
  explanation: string;
}

export interface GeneratedEvaluation {
  subject: string;
  grade: string;
  bimester: string;
  questions: EvaluationQuestion[];
  visualContent?: { type: 'image' | 'chart' | 'table' | 'crossword'; data: any };
}

export interface LessonPlan {
  title: string;
  objectives: string[];
  theory: string;
  methodology: { introduction: string; development: string; conclusion: string };
  suggestedActivity: string;
}

export interface ObjectiveQuestion {
  id: string;
  question: string;
  options: { a: string; b: string; c: string; d: string; e: string };
  correctOption: string;
}

export interface DiscursiveQuestion { id: string; question: string }

export interface LessonActivity {
  objectives: ObjectiveQuestion[];
  discursives: DiscursiveQuestion[];
  visualContent?: { type: 'image' | 'chart' | 'table' | 'crossword'; data: any };
}

export interface EvaluationQuestionItem {
  question: string;
  answer: string;
  correctAnswer?: string;
}

// ----------------------------------------------------------------------
// Cliente DeepSeek (REST, formato OpenAI)
// ----------------------------------------------------------------------
const DEEPSEEK_BASE_URL = 'https://api.deepseek.com/v1';

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

function getApiKey(): string | null {
  // Aceita várias formas: process.env (injetado pelo vite.config.ts via define),
  // import.meta.env (variáveis VITE_*) e fallback de runtime.
  const fromProcess = (typeof process !== 'undefined' && (process as any).env)
    ? (process as any).env.API_KEY || (process as any).env.DEEPSEEK_API_KEY || (process as any).env.GEMINI_API_KEY
    : undefined;
  const fromImport = (import.meta as any).env || {};
  const key =
    fromProcess ||
    fromImport.VITE_API_KEY ||
    fromImport.VITE_DEEPSEEK_API_KEY ||
    fromImport.API_KEY ||
    fromImport.VITE_GEMINI_API_KEY;
  if (!key || key === 'undefined' || key === '') return null;
  return key as string;
}

interface DeepSeekOpts {
  model?: 'deepseek-chat' | 'deepseek-reasoner';
  json?: boolean;
  temperature?: number;
  maxTokens?: number;
  systemPrompt?: string;
}

async function callDeepSeek(userPrompt: string, opts: DeepSeekOpts = {}): Promise<string> {
  const apiKey = getApiKey();
  if (!apiKey) throw new Error('IA Desabilitada: Chave API não configurada.');

  const body: any = {
    model: opts.model || 'deepseek-chat',
    messages: [
      ...(opts.systemPrompt ? [{ role: 'system', content: opts.systemPrompt }] : []),
      { role: 'user', content: userPrompt },
    ],
    temperature: opts.temperature ?? 0.7,
    max_tokens: opts.maxTokens || 8192,
    stream: false,
  };
  if (opts.json) body.response_format = { type: 'json_object' };

  const res = await fetch(`${DEEPSEEK_BASE_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => res.statusText);
    throw new Error(`DeepSeek ${res.status}: ${text}`);
  }

  const data = await res.json();
  const content = data?.choices?.[0]?.message?.content;
  if (!content) throw new Error('DeepSeek retornou resposta vazia.');
  return content as string;
}

/**
 * Wrapper com retry exponencial para erros 429 / quota / 5xx.
 */
async function withRetry<T>(fn: () => Promise<T>, retries = 3, delay = 2000): Promise<T> {
  try {
    return await fn();
  } catch (error: any) {
    const msg = String(error?.message || '');
    const retriable = /429|503|502|504|RESOURCE_EXHAUSTED|rate limit|timeout/i.test(msg);
    if (retriable && retries > 0) {
      console.warn(`[DeepSeek] Erro retriável. Reenviando em ${delay / 1000}s... (${retries} tentativas restantes)`);
      await sleep(delay);
      return withRetry(fn, retries - 1, delay * 2);
    }
    throw error;
  }
}

/** Extrai JSON de uma string que pode vir com ```json ... ``` ou texto extra. */
function extractJson<T = any>(raw: string): T {
  let trimmed = (raw || '').trim();
  // remove cercas markdown
  trimmed = trimmed.replace(/^```(?:json)?\s*/i, '').replace(/```$/i, '').trim();
  // pega do primeiro { até o último }
  const first = trimmed.indexOf('{');
  const last = trimmed.lastIndexOf('}');
  if (first !== -1 && last > first) trimmed = trimmed.slice(first, last + 1);
  return JSON.parse(trimmed) as T;
}

// ----------------------------------------------------------------------
// IMAGEM — DeepSeek não gera imagens. Mantemos a função por compatibilidade,
// retornando string vazia. Os fluxos que esperavam imagem caem em fallback.
// ----------------------------------------------------------------------
export const generateActivityImage = async (_prompt: string): Promise<string> => {
  console.info('[IA] Geração de imagem não disponível com DeepSeek — pulando.');
  return '';
};

// ----------------------------------------------------------------------
// FALLBACK ESTÁTICO de atividade
// ----------------------------------------------------------------------
export const generateFallbackActivity = (title: string, _theory: string, defaultQuestions?: string[]): LessonActivity => {
  const q1 = defaultQuestions?.[0] || `Explique com suas palavras o conceito principal de: ${title.split(':')[0]}.`;
  const q2 = defaultQuestions?.[1] || `Como o tema "${title}" se relaciona com a sociedade atual?`;
  return {
    objectives: [
      {
        id: 'obj1',
        question: `Sobre o tema "${title}", qual das alternativas abaixo melhor resume o conceito principal abordado na teoria?`,
        options: {
          a: 'A teoria destaca a importância de analisar criticamente os fatos e contextos apresentados.',
          b: 'O tema abordado não possui relevância prática para a compreensão da sociedade.',
          c: 'A teoria se limita a descrever eventos isolados sem conexão com o presente.',
          d: 'Os conceitos apresentados são exclusivos de outras áreas do conhecimento.',
          e: 'A análise do tema deve ser feita de forma superficial e sem embasamento.',
        },
        correctOption: 'a',
      },
      {
        id: 'obj2',
        question: 'De acordo com os conceitos fundamentais desta aula, é correto afirmar que:',
        options: {
          a: 'As mudanças sociais ocorrem de forma isolada e sem influência do passado.',
          b: 'A compreensão do tema exige uma visão ampla e conectada com diferentes realidades.',
          c: 'O estudo deste assunto serve apenas para memorização de dados históricos ou geográficos.',
          d: 'Não há evidências que comprovem a importância deste tema na atualidade.',
          e: 'A teoria apresentada contraria os princípios básicos das Ciências Humanas.',
        },
        correctOption: 'b',
      },
      {
        id: 'obj3',
        question: 'Qual a principal importância de compreender os conceitos discutidos nesta aula?',
        options: {
          a: 'Permitir a repetição de informações sem necessidade de reflexão crítica.',
          b: 'Desconsiderar as diferentes perspectivas e focar em uma única visão de mundo.',
          c: 'Desenvolver uma análise crítica e aprofundada sobre as dinâmicas sociais e humanas.',
          d: 'Limitar o conhecimento a fatos que não interferem no nosso cotidiano.',
          e: 'Ignorar as transformações históricas e focar apenas no momento presente.',
        },
        correctOption: 'c',
      },
    ],
    discursives: [
      { id: 'disc1', question: q1 },
      { id: 'disc2', question: q2 },
    ],
  };
};

// ----------------------------------------------------------------------
// 1) GERA ATIVIDADE DE AULA (5 objetivas + 2 discursivas)
// ----------------------------------------------------------------------
export const generateLessonActivity = async (lessonTitle: string, theory: string): Promise<LessonActivity> => {
  return withRetry(async () => {
    const prompt = `Você está gerando uma atividade JSON estrita.
Tema da aula: "${lessonTitle}"
Referencial teórico (resumo): "${(theory || '').substring(0, 3000)}"

Devolva APENAS um JSON válido com este formato exato (sem markdown, sem comentários):
{
  "objectives": [
    { "id": "obj1", "question": "...", "options": { "a": "...", "b": "...", "c": "...", "d": "...", "e": "..." }, "correctOption": "a" },
    ... (EXATAMENTE 5 itens)
  ],
  "discursives": [
    { "id": "disc1", "question": "..." },
    { "id": "disc2", "question": "..." }
  ],
  "visualContent": {
    "type": "table" | "chart" | "crossword",
    "data": { ...estruturado conforme o tipo... }
  }
}

Critérios:
- 5 questões objetivas no padrão ENEM/Vestibular avançado, com texto-base denso e distratores plausíveis.
- 2 discursivas que exijam argumentação fundamentada e relação com o cotidiano (idealmente Tocantins).
- Vocabulário técnico-acadêmico, sem clichês.
- correctOption é obrigatoriamente a, b, c, d ou e.`;

    const raw = await callDeepSeek(prompt, {
      model: 'deepseek-chat',
      json: true,
      temperature: 0.6,
      systemPrompt: 'Você é um professor doutor em Ciências Humanas. Sua única saída é JSON válido seguindo o schema solicitado.',
    });
    return extractJson<LessonActivity>(raw);
  });
};

// ----------------------------------------------------------------------
// 2) GERA PLANO DE AULA
// ----------------------------------------------------------------------
export const generateLessonPlan = async (subject: string, theme: string, grade: string): Promise<LessonPlan> => {
  return withRetry(async () => {
    const prompt = `Crie um plano de aula em JSON para a disciplina de ${subject}, ${grade}ª série, sobre o tema "${theme}".

Formato exato (apenas JSON, sem markdown):
{
  "title": "string",
  "objectives": ["...", "...", "..."],
  "theory": "texto longo de no mínimo 800 palavras, com citações e exemplos",
  "methodology": {
    "introduction": "10 min — provocação inicial",
    "development": "30 min — exposição dialogada",
    "conclusion": "10 min — síntese e gancho"
  },
  "suggestedActivity": "proposta prática de aplicação"
}

Critérios: rigor acadêmico, BNCC, pensamento crítico, conexão com a realidade do Tocantins.`;
    const raw = await callDeepSeek(prompt, {
      model: 'deepseek-chat',
      json: true,
      temperature: 0.6,
      maxTokens: 8192,
      systemPrompt: 'Você é um mentor pedagógico doutor. Devolva apenas JSON válido.',
    });
    return extractJson<LessonPlan>(raw);
  });
};

// ----------------------------------------------------------------------
// 3) GERA AVALIAÇÃO BIMESTRAL
// ----------------------------------------------------------------------
export const generateBimonthlyEvaluation = async (
  subjectName: string,
  grade: string,
  bimester: string,
  topics: string[]
): Promise<GeneratedEvaluation> => {
  return withRetry(async () => {
    const prompt = `Gere um simulado bimestral em JSON para ${subjectName}, ${grade}ª Série, ${bimester}º Bimestre.
Tópicos: ${topics.join(', ')}.

Formato exato (apenas JSON):
{
  "subject": "${subjectName}",
  "grade": "${grade}",
  "bimester": "${bimester}",
  "questions": [
    {
      "id": 1,
      "textFragment": "trecho de obra/artigo/notícia (3-6 linhas)",
      "questionText": "enunciado",
      "options": { "a": "...", "b": "...", "c": "...", "d": "...", "e": "..." },
      "correctOption": "a",
      "difficulty": "Fácil" | "Médio" | "Difícil",
      "explanation": "comentário pedagógico explicando a resposta"
    }
    ... (EXATAMENTE 5 questões)
  ],
  "visualContent": { "type": "table" | "chart" | "crossword", "data": {} }
}

Critérios: padrão ENEM/Vestibular elite, distratores inteligentes, recurso visual indispensável para uma das questões.`;
    const raw = await callDeepSeek(prompt, {
      model: 'deepseek-chat',
      json: true,
      temperature: 0.6,
      maxTokens: 8192,
      systemPrompt: 'Você é um especialista em avaliação educacional. Devolva apenas JSON válido.',
    });
    return extractJson<GeneratedEvaluation>(raw);
  });
};

// ----------------------------------------------------------------------
// 4) AVALIA RESPOSTAS DO ALUNO
// ----------------------------------------------------------------------
export const evaluateActivities = async (
  lessonTitle: string,
  theoryContext: string,
  questionsAndAnswers: EvaluationQuestionItem[]
): Promise<AIResponse> => {
  return withRetry(async () => {
    const prompt = `Você corrige respostas de alunos do Ensino Médio.

Aula: "${lessonTitle}"
Contexto teórico (resumo): "${(theoryContext || '').substring(0, 2000)}"

Respostas a avaliar (JSON com pergunta, resposta do aluno e — quando houver — resposta correta esperada):
${JSON.stringify(questionsAndAnswers)}

Devolva APENAS o JSON neste formato exato:
{
  "generalComment": "balanço geral do desempenho, pontos fortes e fracos",
  "corrections": [
    {
      "question": "(repita o enunciado)",
      "studentAnswer": "(repita a resposta do aluno)",
      "isCorrect": true | false,
      "score": (número 0–10),
      "feedback": "feedback detalhado, corrigindo erros conceituais e sugerindo aprofundamento"
    }
    ... (uma entrada por pergunta enviada)
  ]
}

Regras de pontuação:
- Se "correctAnswer" estiver presente e a resposta do aluno coincidir (ignorando caixa/acentos), score = 10 e isCorrect = true.
- Se "correctAnswer" estiver presente e diferente, score = 0 e isCorrect = false. Mas o feedback deve explicar a opção correta.
- Para questões discursivas (sem correctAnswer), avalie de 0 a 10 conforme densidade conceitual e coerência. isCorrect = true se score ≥ 6.`;

    const raw = await callDeepSeek(prompt, {
      model: 'deepseek-chat',
      json: true,
      temperature: 0.3,
      maxTokens: 4096,
      systemPrompt: 'Você é um tutor acadêmico rigoroso e construtivo. Devolva apenas JSON válido.',
    });
    return extractJson<AIResponse>(raw);
  });
};

// ----------------------------------------------------------------------
// 5) RELATÓRIO PEDAGÓGICO (cruza notas + observações + comportamento)
// ----------------------------------------------------------------------
export interface PedagogicalSummaryInput {
  subject: string;
  grades: number[];
  notes: string[];
  studentName?: string;
  schoolClass: string;
  /** Atividades detalhadas (opcional): permite análise por aula/bimestre */
  activities?: Array<{ title: string; score: number; bimester?: number; date?: string; subject?: string }>;
  /** Anotações de comportamento (opcional) */
  behaviorNotes?: string[];
}

export const generatePedagogicalSummary = async (
  context: 'INDIVIDUAL' | 'TURMA',
  data: PedagogicalSummaryInput
): Promise<string> => {
  return withRetry(async () => {
    const target = context === 'INDIVIDUAL' ? `Aluno: ${data.studentName}` : `Turma: ${data.schoolClass}`;
    const avg = data.grades.length ? (data.grades.reduce((a, b) => a + b, 0) / data.grades.length).toFixed(2) : 'sem registros';
    const max = data.grades.length ? Math.max(...data.grades).toFixed(1) : '-';
    const min = data.grades.length ? Math.min(...data.grades).toFixed(1) : '-';

    const prompt = `Atue como Coordenador Pedagógico. Gere um relatório em **Markdown** para o contexto:
${target}
Disciplina: ${data.subject}
Turma de referência: ${data.schoolClass}

Estatísticas das notas:
- Quantidade de avaliações: ${data.grades.length}
- Média: ${avg}
- Maior nota: ${max}
- Menor nota: ${min}
- Notas brutas: ${JSON.stringify(data.grades)}

Anotações pedagógicas do professor:
${(data.notes || []).map((n, i) => `${i + 1}. ${n}`).join('\n') || '(nenhuma)'}

${data.behaviorNotes && data.behaviorNotes.length ? `Anotações de comportamento:\n${data.behaviorNotes.map((n,i) => `${i+1}. ${n}`).join('\n')}` : ''}

${data.activities && data.activities.length ? `Atividades detalhadas:\n${JSON.stringify(data.activities)}` : ''}

Estrutura obrigatória do relatório:
## 1. Análise de Desempenho
Interprete as notas: tendência, dispersão, evolução por bimestre, pontos de atenção.

## 2. Síntese Qualitativa
O que as anotações pedagógicas e (se houver) as observações de comportamento revelam sobre engajamento, dificuldades e potencialidades.

## 3. Cruzamento de Indicadores
Conecte notas, comportamento e observações: há padrão? aluno com queda nas notas e queda de engajamento? boa nota mas comportamento de risco?

## 4. Plano de Intervenção Pedagógica
3 a 5 ações concretas, mensuráveis e com prazo (curto/médio prazo). Inclua:
- Estratégias de sala de aula específicas
- Recursos e mediação familiar quando necessário
- Indicadores que mostrem se a intervenção está funcionando

Tom: profissional, empático, focado em soluções.`;

    return callDeepSeek(prompt, {
      model: 'deepseek-chat',
      temperature: 0.5,
      maxTokens: 4096,
      systemPrompt: 'Você é um Coordenador Pedagógico experiente. Produza relatórios analíticos em Markdown bem estruturado, sem inventar dados que não estejam na entrada.',
    });
  });
};
