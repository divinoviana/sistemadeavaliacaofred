// =====================================================================
// Vercel Serverless Function — geração de atividades adaptadas
// =====================================================================
// Endpoint:  POST /api/generate-adapted-activity
//
// Recebe:    { student: NeuroStudent, theme, subject, activityType, duration,
//              additionalNotes? }
// Devolve:   { activity: AdaptedActivity }   (JSON estruturado)
//
// Por que serverless e não chamar a API direto do navegador:
//   1) ANTHROPIC_API_KEY fica no server, nunca exposto no bundle
//   2) Permite trocar de provedor (Claude, Gemini, OpenAI) sem rebuild
//   3) Permite adicionar rate limit / cache no servidor depois
//
// CONFIGURAÇÃO NO VERCEL:
//   Settings → Environment Variables:
//     ANTHROPIC_API_KEY = sk-ant-api03-...
//   Escopo: Production + Preview + Development
//   Depois: Deployments → Redeploy
// =====================================================================

const ANTHROPIC_URL = 'https://api.anthropic.com/v1/messages';
const MODEL = 'claude-sonnet-4-5';
const MAX_TOKENS = 4096;

// ---------------------------------------------------------------------
// System prompt — o "pedagogo especialista"
// (versão refinada do prompt que o usuário forneceu, com schema JSON)
// ---------------------------------------------------------------------
const SYSTEM_PROMPT = `Você é um pedagogo especialista em educação inclusiva, com prática em adaptação curricular para estudantes neurodivergentes da escola pública brasileira (Ensino Médio do Tocantins).

ÁREAS DE ESPECIALIZAÇÃO:
- Deficiência Intelectual e Transtornos do Desenvolvimento Intelectual
- Transtornos da Comunicação
- Transtorno do Espectro Autista (TEA - todos os níveis)
- TDAH
- Transtornos Específicos da Aprendizagem (Dislexia, Discalculia)
- Transtornos Motores
- Síndrome de Down e síndromes associadas

DIRETRIZES OBRIGATÓRIAS:

1. ADAPTAÇÃO PEDAGÓGICA
   - Mesmo o aluno estando no Ensino Médio, adapte ao seu NÍVEL PEDAGÓGICO REAL informado
   - Linguagem, complexidade e tamanho proporcionais ao perfil
   - Instruções curtas, claras, objetivas (uma por linha)
   - Tarefas longas → divididas em etapas pequenas e numeradas

2. ACESSIBILIDADE
   - Recursos visuais sempre que possível (emojis simples, descrições de imagem)
   - Palavras-chave destacadas (use **negrito** com moderação)
   - Frases curtas. Evite sobrecarga cognitiva.

3. LUDICIDADE
   - Quando o tipo de atividade pedir: jogo, associação, escolha, pintura, cruzadinha, caça-palavras, recorte, interpretação de imagem
   - Use os INTERESSES e AFINIDADES do aluno como gancho temático

4. CONTEXTO ESCOLA PÚBLICA
   - Use poucos materiais: papel, lápis, quadro, papel colorido
   - Sem dependência de internet, computador ou recursos caros

5. PERSONALIZAÇÃO RADICAL
   - Use os interesses específicos do aluno (ex: se gosta de Mario Bros, use o universo Mario; se gosta de futebol, contextualize com futebol)
   - Respeite as barreiras (ex: aluno não alfabetizado → não pedir leitura/escrita longa; baixa visão → letra ampliada; sensibilidade auditiva → atividades silenciosas)
   - Aproveite as habilidades JÁ consolidadas (ex: marcar X, pintar, parear)

FORMATO DE SAÍDA OBRIGATÓRIO:
Retorne APENAS um JSON válido (sem cercas markdown, sem comentários) seguindo EXATAMENTE este schema:

{
  "title": "Título curto e atrativo da atividade",
  "objective": "Objetivo pedagógico (1-2 frases) escrito para o professor",
  "skill": "Habilidade BNCC ou competência trabalhada (1 frase)",
  "teacherInstructions": "Orientações ao professor: como aplicar, mediar, reforço, sinais de fadiga, tempo estimado, materiais. Use marcadores com '- '.",
  "studentBlocks": [
    {
      "type": "instruction" | "text" | "association" | "multiple_choice" | "fill_blank" | "draw_paint" | "wordsearch" | "crossword" | "image_description" | "matching_pairs" | "sequence",
      "title": "Título do bloco (opcional)",
      "content": "Conteúdo principal — para 'instruction' e 'text'",
      "items": ["..."],
      "leftColumn": ["..."],
      "rightColumn": ["..."],
      "options": [{"label": "A", "text": "..."}, ...],
      "correctIndex": 0,
      "blanks": [{"sentence": "frase com ___", "answer": "palavra"}],
      "drawPrompt": "O que pintar / desenhar",
      "words": ["palavra1", "palavra2"],
      "imageEmoji": "🎨",
      "imageDescription": "Descrição da cena",
      "pairs": [{"left": "...", "right": "..."}]
    }
  ],
  "adaptationsUsed": ["Lista de adaptações pedagógicas que foram aplicadas, em bullets curtos"],
  "ludicElements": ["Lista dos elementos lúdicos incorporados"],
  "estimatedTime": "15 minutos" | "30 minutos" | "45 minutos",
  "materials": ["lápis", "papel", ...]
}

REGRAS ESSENCIAIS:
- O campo "studentBlocks" é a atividade que o aluno verá. Inclua de 2 a 6 blocos.
- Para cada bloco, preencha SOMENTE os campos relevantes ao "type" (deixe os outros omitidos).
- Quando "type" for "wordsearch" ou "crossword", forneça as PALAVRAS na chave "words" (entre 4 e 8 palavras simples, MAIÚSCULAS, sem acento). O frontend renderiza a grade.
- Para "association"/"matching_pairs": no máximo 5 pares.
- Para "multiple_choice": no máximo 4 alternativas, e SEMPRE com correctIndex.
- NUNCA invente diagnósticos ou características que não estejam nos dados do aluno.
- Tom: empático, claro, profissional. Sem clichês acadêmicos.`;

// ---------------------------------------------------------------------
// Tipos do payload de entrada
// ---------------------------------------------------------------------
interface RequestPayload {
  student: {
    fullName: string;
    firstName: string;
    grade: string;
    className: string;
    diagnoses: string[];
    conditionSummary: string;
    strengths: string[];
    interests: string[];
    barriers: string[];
    adaptations: string[];
    autonomyLevel: string;
    pedagogicalLevel: string;
  };
  theme: string;
  subject: string;
  activityType: string;
  duration: string;
  additionalNotes?: string;
}

// ---------------------------------------------------------------------
// Helper: normaliza extração de JSON (caso modelo devolva com markdown)
// ---------------------------------------------------------------------
function extractJson(raw: string): any {
  let s = (raw || '').trim();
  s = s.replace(/^```(?:json)?\s*/i, '').replace(/```$/i, '').trim();
  const first = s.indexOf('{');
  const last = s.lastIndexOf('}');
  if (first !== -1 && last > first) s = s.slice(first, last + 1);
  return JSON.parse(s);
}

// ---------------------------------------------------------------------
// Construção do prompt do usuário
// ---------------------------------------------------------------------
function buildUserPrompt(p: RequestPayload): string {
  const s = p.student;
  const pedLevel: Record<string, string> = {
    inicio_alfabetizacao: 'INÍCIO DA ALFABETIZAÇÃO (nível Educação Infantil / 1º ano EF)',
    alfabetizado_basico: 'ALFABETIZADO BÁSICO (nível 2º-3º ano EF)',
    fundamental_anos_iniciais: 'ANOS INICIAIS DO EF (nível 4º-5º ano)',
    fundamental_anos_finais: 'ANOS FINAIS DO EF (nível 6º-9º ano)',
  };
  return `Crie uma ATIVIDADE ADAPTADA seguindo o JSON-schema descrito no system prompt.

═══════════ DADOS DO ESTUDANTE ═══════════
Nome: ${s.firstName} (${s.fullName})
Série oficial: ${s.grade} | Turma: ${s.className}
Nível pedagógico REAL: ${pedLevel[s.pedagogicalLevel] || s.pedagogicalLevel}
Autonomia: ${s.autonomyLevel}

Diagnósticos: ${s.diagnoses.join(' · ')}

Resumo da condição:
${s.conditionSummary}

Conhecimentos / habilidades já consolidadas:
${s.strengths.map(x => '- ' + x).join('\n')}

Interesses e afinidades (use como gancho temático!):
${s.interests.map(x => '- ' + x).join('\n')}

Barreiras (evitar / adaptar):
${s.barriers.map(x => '- ' + x).join('\n')}

Adaptações sugeridas no PEI:
${s.adaptations.map(x => '- ' + x).join('\n')}

═══════════ PEDIDO DO PROFESSOR ═══════════
Tema da aula: ${p.theme}
Componente curricular: ${p.subject}
Formato desejado: ${p.activityType}
Duração: ${p.duration}
${p.additionalNotes ? `\nObservações extras: ${p.additionalNotes}` : ''}

═══════════ INSTRUÇÕES FINAIS ═══════════
- Adapte o tema "${p.theme}" ao NÍVEL PEDAGÓGICO REAL do aluno (não ao Ensino Médio formal).
- INCORPORE pelo menos UM interesse específico do aluno como contexto/gancho.
- RESPEITE rigorosamente as barreiras listadas (ex: se aluno não alfabetizado, NÃO pedir leitura ou escrita longa).
- O formato "${p.activityType}" deve guiar o tipo dos blocos em studentBlocks.
- Devolva SOMENTE o JSON, sem texto explicativo antes ou depois.`;
}

// ---------------------------------------------------------------------
// Handler Vercel (Node runtime)
// ---------------------------------------------------------------------
export default async function handler(req: any, res: any) {
  // CORS para chamadas em dev
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-passcode');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Use POST' });
  }

  // ----- Passcode LGPD -----
  // Se ACCESS_PASSCODE estiver definida no servidor, exigimos o header.
  // Se não estiver definida, o gate é pulado (modo dev / staging livre).
  const expectedPasscode = (process.env.ACCESS_PASSCODE || '').trim();
  if (expectedPasscode) {
    const provided = String(req.headers['x-passcode'] || '').trim();
    if (provided !== expectedPasscode) {
      return res.status(401).json({
        error: 'Acesso negado. Código inválido ou ausente.',
      });
    }
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({
      error: 'ANTHROPIC_API_KEY não configurada no Vercel. Settings → Environment Variables → adicione ANTHROPIC_API_KEY.',
    });
  }

  let payload: RequestPayload;
  try {
    payload = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  } catch {
    return res.status(400).json({ error: 'JSON inválido no body.' });
  }

  if (!payload?.student || !payload?.theme || !payload?.activityType) {
    return res.status(400).json({
      error: 'Campos obrigatórios: student, theme, activityType.',
    });
  }

  try {
    const anthropicRes = await fetch(ANTHROPIC_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: MAX_TOKENS,
        system: SYSTEM_PROMPT,
        messages: [{ role: 'user', content: buildUserPrompt(payload) }],
      }),
    });

    if (!anthropicRes.ok) {
      const errText = await anthropicRes.text().catch(() => anthropicRes.statusText);
      return res.status(anthropicRes.status).json({
        error: `Anthropic API ${anthropicRes.status}: ${errText.slice(0, 500)}`,
      });
    }

    const data = await anthropicRes.json();
    const text = data?.content?.[0]?.text;
    if (!text) {
      return res.status(502).json({ error: 'Resposta vazia do modelo.' });
    }

    let activity: any;
    try {
      activity = extractJson(text);
    } catch (e: any) {
      return res.status(502).json({
        error: 'Resposta do modelo não pôde ser parseada como JSON.',
        raw: text.slice(0, 1000),
      });
    }

    return res.status(200).json({ activity });
  } catch (err: any) {
    return res.status(500).json({ error: err?.message || 'Erro desconhecido' });
  }
}
