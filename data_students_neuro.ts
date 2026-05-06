// =====================================================================
// Banco de dados dos estudantes neurodivergentes
// Colégio Estadual Frederico José Pedreira Neto - Palmas/TO
// =====================================================================
// Dados extraídos dos PEIs (Plano de Ensino Individualizado) elaborados
// pelos pedagogos da escola. Usados para gerar atividades adaptadas via IA.
//
// ATENÇÃO LGPD: estes dados contêm informações sensíveis de menores. A
// página `/atividades-adaptadas` é pública. Avalie restringir o acesso
// (passcode, IP, ou substituir sobrenomes por iniciais) antes de
// disponibilizar o link a terceiros fora da equipe pedagógica.
// =====================================================================

export type Turno = 'matutino' | 'vespertino';
export type Serie = '1º ano' | '2º ano' | '3º ano';

export interface NeuroStudent {
  /** ID estável (slug do nome) — usado em URLs e localStorage */
  id: string;
  /** Nome completo, como no PEI */
  fullName: string;
  /** Primeiro nome — usado nos cards/atividades */
  firstName: string;
  /** Iniciais (para avatares e versões anonimizadas) */
  initials: string;
  /** Turma no formato "13.02" */
  className: string;
  /** Série derivada da turma */
  grade: Serie;
  turno: Turno;
  /** Diagnósticos principais — strings curtas para exibir em badges */
  diagnoses: string[];
  /** Resumo da condição (1–2 frases) */
  conditionSummary: string;
  /** Conhecimentos consolidados — habilidades que o aluno JÁ tem */
  strengths: string[];
  /** Afinidades / interesses — usar como gancho lúdico */
  interests: string[];
  /** Barreiras principais — o que evitar / o que adaptar */
  barriers: string[];
  /** Sugestões pedagógicas de adaptação (do próprio PEI) */
  adaptations: string[];
  /** Nível de autonomia escolar */
  autonomyLevel: 'baixa' | 'media' | 'alta';
  /** Nível pedagógico real (séries do EF) — orienta complexidade */
  pedagogicalLevel: 'inicio_alfabetizacao' | 'alfabetizado_basico' | 'fundamental_anos_iniciais' | 'fundamental_anos_finais';
  /** Cor do avatar/card (paleta Tailwind do app) */
  accent: 'pink' | 'purple' | 'cyan' | 'lime' | 'orange' | 'magenta' | 'blue' | 'indigo';
  /** Estilo do avatar DiceBear */
  avatarStyle: 'avataaars' | 'fun-emoji' | 'bottts-neutral' | 'big-smile' | 'lorelei' | 'micah';
  /** Emoji representativo (mascote) — referência ao interesse do aluno */
  mascot: string;
}

// Helper para gerar slug
const slug = (s: string) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()
   .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const initials = (full: string) =>
  full.split(/\s+/).map(p => p[0]).filter(Boolean).slice(0, 3).join('').toUpperCase();

const make = (s: Omit<NeuroStudent, 'id' | 'firstName' | 'initials'>): NeuroStudent => ({
  id: slug(s.fullName),
  firstName: s.fullName.split(' ')[0],
  initials: initials(s.fullName),
  ...s,
});

export const NEURO_STUDENTS: NeuroStudent[] = [
  // ============== MATUTINO ==============
  make({
    fullName: 'Yasmin Solino',
    className: '13.02',
    grade: '1º ano',
    turno: 'matutino',
    diagnoses: ['TEA Nível 1', 'Transtorno de Ansiedade Generalizada'],
    conditionSummary: 'TEA leve com ansiedade. Sem comprometimento intelectual. Hipersensibilidade auditiva (gritos, palmas) pode causar crises. Necessita previsibilidade e ambiente emocionalmente seguro.',
    strengths: ['boa leitura', 'capacidade argumentativa', 'desenho/pintura/massinha como autorregulação', 'canto afinado', 'compreensão de temas sociais e políticos'],
    interests: ['arte', 'desenho', 'pintura', 'massinha', 'música/canto', 'temas sociais e políticos', 'mapas mentais', 'filmes'],
    barriers: ['ironia e regras sociais implícitas', 'hipersensibilidade auditiva', 'rigidez cognitiva', 'ansiedade em prova (Matemática)', 'mudanças de rotina'],
    adaptations: ['avisar mudanças com antecedência', 'reduzir estímulos sonoros', 'usar mapas mentais', 'permitir produções autorais (resenha, vídeo)', 'aceitar respostas em formato visual ou oral'],
    autonomyLevel: 'alta',
    pedagogicalLevel: 'fundamental_anos_finais',
    accent: 'magenta',
    avatarStyle: 'lorelei',
    mascot: '🎨',
  }),
  make({
    fullName: 'Yasmin Carvalho',
    className: '13.02',
    grade: '1º ano',
    turno: 'matutino',
    diagnoses: ['Síndrome de Down'],
    conditionSummary: 'Síndrome de Down. Verbal, mas com baixa iniciativa comunicativa. Sensibilidade a sons intensos. Necessita mediação para transições e ida ao banheiro.',
    strengths: ['lê palavras e frases simples', 'reconhece números até 10', 'soma e subtração com pequenas quantidades', 'usa letra bastão', 'pinta, marca, circula com X'],
    interests: ['dança', 'música', 'teatro', 'expressão corporal', 'inglês', 'trabalhos em grupo'],
    barriers: ['iniciativa comunicativa', 'cópia do quadro (não copia)', 'hipersensibilidade sonora', 'percepção de risco', 'perde habilidades após recesso'],
    adaptations: ['material impresso (não pedir cópia do quadro)', 'letra bastão', 'frases curtas e comandos objetivos', 'apoio visual', 'X / circular / pintar / marcar', 'tempo ampliado'],
    autonomyLevel: 'media',
    pedagogicalLevel: 'inicio_alfabetizacao',
    accent: 'pink',
    avatarStyle: 'big-smile',
    mascot: '💃',
  }),
  make({
    fullName: 'Janaína Labre',
    className: '13.02',
    grade: '1º ano',
    turno: 'matutino',
    diagnoses: ['Transtorno do Desenvolvimento Intelectual', 'Distúrbio de Atenção', 'Síndrome Epiléptica', 'Transtorno de Aprendizagem'],
    conditionSummary: 'TDI com lentificação no processamento. Comprometimento visual (alto grau). Reconhece números até 100, alfabeto, cores e formas geométricas, mas não domina as quatro operações.',
    strengths: ['reconhece letras do alfabeto', 'números até 100', 'cores e formas geométricas', 'pinta, marca, liga com segurança', 'comunicação verbal', 'boa em atividades em grupo'],
    interests: ['atividades em grupo', 'tarefas estruturadas com pintura/marcação', 'instruções claras'],
    barriers: ['lentificação cognitiva', 'quatro operações matemáticas', 'comprometimento visual (precisa fonte ampliada)', 'organização do raciocínio'],
    adaptations: ['letra ampliada', 'instruções objetivas e curtas', 'tempo ampliado', 'mediação constante', 'pintar / marcar / ligar', 'apoio visual'],
    autonomyLevel: 'media',
    pedagogicalLevel: 'inicio_alfabetizacao',
    accent: 'cyan',
    avatarStyle: 'big-smile',
    mascot: '🌷',
  }),
  make({
    fullName: 'Pietro Pinheiro Tavares Vieira',
    className: '13.04',
    grade: '1º ano',
    turno: 'matutino',
    diagnoses: ['Deficiência Intelectual Moderada', 'TDAH', 'Transtornos de Aprendizagem', 'Ansiedade'],
    conditionSummary: 'DI Moderada + TDAH + ansiedade. Atenção sustentada comprometida. Linguagem simples e objetiva é essencial. Histórico de bullying familiar afetando autoestima.',
    strengths: ['flexibilidade cognitiva quando bem mediado', 'engajamento alto em propostas estruturadas', 'comunicação clara em temas de interesse'],
    interests: ['futebol', 'jogos', 'atividades estruturadas', 'temas concretos e práticos'],
    barriers: ['atenção sustentada', 'linguagem abstrata/complexa', 'compreensão de regras sociais', 'autoestima fragilizada'],
    adaptations: ['linguagem simples', 'apoio visual sempre', 'reforço positivo', 'temas conectados a futebol/jogos', 'instruções uma de cada vez'],
    autonomyLevel: 'media',
    pedagogicalLevel: 'inicio_alfabetizacao',
    accent: 'lime',
    avatarStyle: 'avataaars',
    mascot: '⚽',
  }),
  make({
    fullName: 'Daniel Antônio Rocha de Castro',
    className: '23.01',
    grade: '2º ano',
    turno: 'matutino',
    diagnoses: ['Deficiência Intelectual', 'TEA', 'Epilepsia de difícil controle'],
    conditionSummary: 'DI + TEA + epilepsia. Não alfabetizado. Memória, atenção e coordenação motora comprometidas. Vigilância constante necessária por crises epilépticas (sinais de alerta: sede, ansiedade, vontade de banheiro).',
    strengths: ['comunicação verbal funcional', 'engajamento em recursos audiovisuais', 'pintura (especialmente tinta a óleo)', 'interesse por música e instrumentos'],
    interests: ['música', 'instrumentos musicais', 'pintura', 'tinta a óleo', 'recursos audiovisuais'],
    barriers: ['não alfabetizado', 'fraqueza muscular nas mãos (motricidade fina)', 'isolamento social', 'risco de crise epiléptica', 'não domina números além de 10'],
    adaptations: ['atividades sonoras/musicais como gancho', 'pintura como atividade central', 'sem demanda de leitura/escrita extensa', 'apoio visual concreto', 'mediação constante', 'cuidado especial com epilepsia'],
    autonomyLevel: 'baixa',
    pedagogicalLevel: 'inicio_alfabetizacao',
    accent: 'orange',
    avatarStyle: 'fun-emoji',
    mascot: '🎵',
  }),
  make({
    fullName: 'Josué Pereira de Sá',
    className: '23.01',
    grade: '2º ano',
    turno: 'matutino',
    diagnoses: ['Transtorno de Aprendizagem', 'Déficit de atenção', 'Déficit de memória de reconhecimento'],
    conditionSummary: 'Sem deficiência intelectual. Dificuldade significativa de leitura, atenção e memória. Cognição preservada em raciocínio lógico-estratégico (xadrez). Engaja-se MUITO mais quando há menos leitura.',
    strengths: ['xadrez (planejamento e estratégia)', 'jogos de tabuleiro', 'compreensão verbal', 'autonomia funcional', 'habilidades sociais', 'esportes'],
    interests: ['basquete', 'xadrez', 'jogos de memória', 'dominó', 'jogos de estratégia', 'venda de doces', 'religiosidade'],
    barriers: ['leitura (ritmo abaixo do esperado, trocas fonêmicas)', 'compreensão textual', 'atenção concentrada/alternada/dividida', 'habilidades visuoespaciais', 'cálculos matemáticos'],
    adaptations: ['reduzir leitura ao mínimo', 'preferir formato jogo / estratégia', 'usar contexto de basquete e xadrez como ganchos', 'comandos verbais > escritos', 'enunciados curtos'],
    autonomyLevel: 'alta',
    pedagogicalLevel: 'fundamental_anos_iniciais',
    accent: 'blue',
    avatarStyle: 'avataaars',
    mascot: '🏀',
  }),
  make({
    fullName: 'Lucas de Oliveira Soares',
    className: '23.01',
    grade: '2º ano',
    turno: 'matutino',
    diagnoses: ['TEA'],
    conditionSummary: 'TEA verbal. Lê palavras, frases e textos curtos. Habilidades cognitivas preservadas, com forte interesse em Matemática. Dificuldades motoras finas (escrita prolongada).',
    strengths: ['boa memória', 'matemática', 'leitura de palavras/frases/textos curtos', 'reconhece símbolos e comandos simples', 'engajamento com tablets/computadores'],
    interests: ['números', 'matemática', 'jogos pedagógicos', 'tablets e computadores', 'apps interativos', 'pintura', 'recursos visuais'],
    barriers: ['interação social em grupo', 'inferência social', 'transições entre atividades', 'motricidade fina (escrita prolongada)', 'cópia do quadro'],
    adaptations: ['reduzir escrita à mão', 'preferir marcação de alternativas', 'apoio visual concreto', 'instruções estruturadas', 'tempo ampliado', 'atividades curtas e segmentadas'],
    autonomyLevel: 'media',
    pedagogicalLevel: 'fundamental_anos_iniciais',
    accent: 'indigo',
    avatarStyle: 'avataaars',
    mascot: '🧮',
  }),
  make({
    fullName: 'Heytor Ambrosio',
    className: '23.04',
    grade: '2º ano',
    turno: 'matutino',
    diagnoses: ['TEA Nível 3 de Suporte (não verbal)'],
    conditionSummary: 'TEA Nível 3, com baixa comunicação verbal. Em consolidação da alfabetização. Tem ABA Escolar com Acompanhante Terapêutico. Receptivo, mas não sustenta interação contínua.',
    strengths: ['lê palavras de 2 e 3 sílabas', 'escreve seu nome', 'soma e subtração simples sem reserva', 'jogos de memória e pega-vareta', 'tranquilo e receptivo'],
    interests: ['jogos de memória', 'pega-vareta', 'atividades estruturadas com regras claras'],
    barriers: ['comunicação espontânea', 'coordenação motora fina', 'respostas verbais espontâneas', 'demandas pedagógicas longas'],
    adaptations: ['atividades curtíssimas', 'palavras de 2-3 sílabas no máximo', 'formato jogo de memória / pareamento', 'pictogramas e imagens', 'sem necessidade de fala'],
    autonomyLevel: 'baixa',
    pedagogicalLevel: 'inicio_alfabetizacao',
    accent: 'purple',
    avatarStyle: 'bottts-neutral',
    mascot: '🧩',
  }),
  make({
    fullName: 'Maria Carolina',
    className: '33.02',
    grade: '3º ano',
    turno: 'matutino',
    diagnoses: ['Síndrome de Down', 'TEA', 'Miopia severa (>20º)'],
    conditionSummary: 'Síndrome de Down + TEA + miopia severa. Pronuncia poucas palavras (oi, não, tchau, mamãe). Reconhece sílabas por associação de imagem. Faz terapias múltiplas desde os 13 anos.',
    strengths: ['identifica letras do próprio nome (M-A-R-I-A C-A-R-O-L-I-N-A)', 'associa número/quantidade até 5', 'segura lápis, pincel e tesoura adaptada', 'pinturas com guache', 'reconhece cores, formas, animais, partes do corpo'],
    interests: ['pintura com guache', 'dobraduras simples', 'recortes', 'figuras de animais', 'cores'],
    barriers: ['baixa visão (miopia >20º — letra MUITO ampliada)', 'permanência sentada', 'distrai-se com objetos na carteira', 'comunicação verbal muito limitada'],
    adaptations: ['letra MUITO ampliada (bastão maiúscula)', 'instruções breves e simples', 'pareamento de imagens', 'colorir conforme cor indicada', 'completar sílabas com imagem-âncora', 'ligar imagem ao nome', 'ambiente sem distratores'],
    autonomyLevel: 'baixa',
    pedagogicalLevel: 'inicio_alfabetizacao',
    accent: 'pink',
    avatarStyle: 'big-smile',
    mascot: '🌸',
  }),
  make({
    fullName: 'Lucas de Oliveira',
    className: '33.03',
    grade: '3º ano',
    turno: 'matutino',
    diagnoses: ['TEA Nível 1'],
    conditionSummary: 'TEA leve. Falou aos 6 anos. Lê textos curtos (até 10 linhas). Ampla afinidade com tecnologia e desenho. Compreende metáforas e piadas.',
    strengths: ['lê textos curtos', 'desenho', 'matemática', 'caça-palavras', 'quebra-cabeça', 'memória visual', 'manuseio de computador/celular', 'compreende metáforas'],
    interests: ['desenho', 'caça-palavras', 'quebra-cabeça', 'objetos de montar', 'matemática', 'cantar em inglês', 'tecnologia'],
    barriers: ['escrita prolongada', 'leitura mais longa', 'conversar em grupo', 'novas amizades', 'compreensão do conteúdo de aula'],
    adaptations: ['caça-palavras como formato preferencial', 'quebra-cabeça conceitual', 'reduzir escrita longa', 'usar imagens e diagramas', 'inglês como gancho ocasional'],
    autonomyLevel: 'alta',
    pedagogicalLevel: 'fundamental_anos_finais',
    accent: 'cyan',
    avatarStyle: 'avataaars',
    mascot: '🧩',
  }),
  make({
    fullName: 'Laerte',
    className: '33.04',
    grade: '3º ano',
    turno: 'matutino',
    diagnoses: ['Síndrome de Down', 'TEA', 'TDAH', 'Cardiopatia'],
    conditionSummary: 'Síndrome de Down + TEA + TDAH + cardiopatia. Em fase de alfabetização. Atividades em nível de educação infantil. Necessidade de apoio substancial.',
    strengths: ['marca X, circula e pinta', 'pareamento'],
    interests: ['jogar bola', 'massa de modelar', 'tinta guache'],
    barriers: ['permanência em sala de aula', 'em fase de alfabetização', 'cuidados cardíacos'],
    adaptations: ['pintura', 'imagens conforme conteúdo', 'colagem', 'identificação (X, circular)', 'pareamento', 'matemática em nível EI: pareamento numérico, número-quantidade', 'completar palavras com imagem', 'leitura de palavras simples com figura'],
    autonomyLevel: 'baixa',
    pedagogicalLevel: 'inicio_alfabetizacao',
    accent: 'orange',
    avatarStyle: 'big-smile',
    mascot: '⚽',
  }),

  // ============== VESPERTINO ==============
  make({
    fullName: 'Amanda Margarida Almeida Menezes',
    className: '13.05',
    grade: '1º ano',
    turno: 'vespertino',
    diagnoses: ['TEA', 'Deficiência Intelectual'],
    conditionSummary: 'TEA + DI. Histórico de anóxia neonatal. Insegurança e medo no ambiente escolar — pode não conseguir expressar necessidades fisiológicas. Iniciativa social muito reduzida.',
    strengths: ['boa coordenação motora fina (canhota)', 'pintura e artes visuais', 'jogos de memória', 'quebra-cabeça', 'marca alternativas', 'avanço progressivo na escrita'],
    interests: ['pintura', 'artes visuais', 'jogos de memória', 'quebra-cabeça'],
    barriers: ['medo de socializar', 'iniciativa social', 'atenção, memória e raciocínio prejudicados', 'expressão de necessidades em situação de medo'],
    adaptations: ['ambiente acolhedor', 'pintura como entrada motivacional', 'jogo de memória conceitual', 'atividades individuais (não exigir grupo)', 'mediação de adulto presente'],
    autonomyLevel: 'baixa',
    pedagogicalLevel: 'inicio_alfabetizacao',
    accent: 'magenta',
    avatarStyle: 'lorelei',
    mascot: '🎨',
  }),
  make({
    fullName: 'Vinicius Rabelo Alves Sales',
    className: '13.05',
    grade: '1º ano',
    turno: 'vespertino',
    diagnoses: ['TEA Nível 3 de Suporte'],
    conditionSummary: 'TEA Nível 3. Não alfabetizado. Acompanhamento multidisciplinar (fono, TO, psico, neuro). Resistência a atividades manuais como pintura.',
    strengths: ['reconhece números até 50', 'letras', 'formas geométricas e cores', 'escreve nome completo em letra bastão', 'marca alternativas', 'liga elementos'],
    interests: ['músicas', 'mapas', 'festas', 'água'],
    barriers: ['baixa interação social', 'iniciativa social', 'resistência a pintura', 'leitura e matemática (não alfabetizado)', 'permanência em sala', 'autoestimulação', 'lateralidade e noção espacial'],
    adaptations: ['música como entrada', 'mapas (mesmo simples) como gancho', 'tema "água" como motivador', 'atividades curtas (5-10 min)', 'marcação > escrita', 'pareamento de imagens'],
    autonomyLevel: 'baixa',
    pedagogicalLevel: 'inicio_alfabetizacao',
    accent: 'blue',
    avatarStyle: 'bottts-neutral',
    mascot: '🗺️',
  }),
  make({
    fullName: 'Isadora Alencar Lima',
    className: '13.06',
    grade: '1º ano',
    turno: 'vespertino',
    diagnoses: ['Deficiência Intelectual', 'Má formação cerebral', 'Histórico de crises convulsivas'],
    conditionSummary: 'DI + má formação cerebral. Comunicação verbal limitada (dificuldade na pronúncia). Risco de crises convulsivas. Tranquila com colegas. Adora personagens infantis.',
    strengths: ['boa coordenação motora fina', 'reconhece o alfabeto', 'escreve seu nome', 'compreende números até 30', 'interage tranquilamente'],
    interests: ['Peppa Pig', 'Barbie', 'Patrulha Canina', 'pintura', 'desenho'],
    barriers: ['pronúncia das palavras', 'comunicação verbal clara', 'higienização pessoal (autonomia)', 'risco de crise convulsiva'],
    adaptations: ['usar personagens infantis (Peppa, Barbie, Patrulha Canina) como contexto das atividades', 'pintura como formato', 'números até 30 no máximo', 'palavras curtas e familiares', 'atividades de gestos e desenho'],
    autonomyLevel: 'baixa',
    pedagogicalLevel: 'inicio_alfabetizacao',
    accent: 'pink',
    avatarStyle: 'big-smile',
    mascot: '🐶',
  }),
  make({
    fullName: 'João Gabriel Marques Delmondes',
    className: '13.06',
    grade: '1º ano',
    turno: 'vespertino',
    diagnoses: ['TEA'],
    conditionSummary: 'TEA com sensibilidade auditiva. Lê textos curtos e copia do quadro. Comunicação verbal presente, mas precisa mediação para iniciar/concluir diálogos. Forte interesse em Mario Bros.',
    strengths: ['lê textos curtos', 'cópia do quadro', 'interpreta passagens pequenas', 'boa coordenação motora ampla', 'pega adequada do lápis', 'interage melhor com crianças'],
    interests: ['Mario Bros (universo)', 'recursos tecnológicos', 'jogos eletrônicos'],
    barriers: ['déficits de atenção e concentração', 'sensibilidade auditiva (ambientes coletivos)', 'cálculos com elementos abstratos (letras)', 'iniciar/concluir conversas', 'lentidão em destreza fina (calçar sapato)'],
    adaptations: ['contexto Mario Bros como recurso motivacional', 'reduzir ruído', 'cálculos APENAS com números (sem álgebra)', 'textos curtos e diretos', 'redirecionamento atencional frequente'],
    autonomyLevel: 'media',
    pedagogicalLevel: 'fundamental_anos_iniciais',
    accent: 'orange',
    avatarStyle: 'avataaars',
    mascot: '🍄',
  }),
  make({
    fullName: 'Emanuel Cunha Carvalho',
    className: '23.05',
    grade: '2º ano',
    turno: 'vespertino',
    diagnoses: ['Síndrome de Down'],
    conditionSummary: 'Síndrome de Down. Trocas fonêmicas, comunica-se melhor com apoio gestual. Reconhece alfabeto, números 1-10 e escreve o nome. Bom em motricidade fina.',
    strengths: ['reconhece alfabeto', 'números 1-10', 'escreve o próprio nome', 'quebra-cabeça com peças pequenas', 'jogo da memória', 'pareamento e associação', 'expressa sentimentos'],
    interests: ['quebra-cabeça', 'jogo da memória', 'pareamento', 'manipulação de materiais concretos'],
    barriers: ['fala funcional (trocas fonêmicas)', 'organização temporal (calendário)', 'lateralidade e senso de direção'],
    adaptations: ['apoio visual', 'comandos simples', 'previsibilidade nas tarefas', 'formato jogo da memória / pareamento conceitual', 'manipulativos quando possível'],
    autonomyLevel: 'media',
    pedagogicalLevel: 'inicio_alfabetizacao',
    accent: 'lime',
    avatarStyle: 'big-smile',
    mascot: '🧩',
  }),
  make({
    fullName: 'Thomas James',
    className: '23.06',
    grade: '2º ano',
    turno: 'vespertino',
    diagnoses: ['Deficiência Intelectual (QIT=60)'],
    conditionSummary: 'DI confirmada (QIT=60). Memória operacional comprometida. Leitura pausada, lenta, sem compreensão. Letra cursiva difícil. Mas é carinhoso e gosta da escola.',
    strengths: ['atenção concentrada média (foco prolongado)', 'gosta de estar com pessoas', 'raciocínio com palavras médio', 'carinhoso'],
    interests: ['interação social', 'estar entre pessoas', 'frequenta a escola com prazer'],
    barriers: ['raciocínio analógico e abstração', 'fluência verbal e semântica', 'compreensão (grave)', 'leitura/escrita muito difícil (cursiva ilegível)', 'frases complexas', 'comandos longos'],
    adaptations: ['letra de imprensa/bastão SEMPRE', 'frases simples (sujeito-verbo-objeto)', 'comandos repetidos', 'sem demanda de cursiva', 'evitar abstração — usar concreto e visual', 'reforço positivo'],
    autonomyLevel: 'media',
    pedagogicalLevel: 'inicio_alfabetizacao',
    accent: 'blue',
    avatarStyle: 'avataaars',
    mascot: '😊',
  }),
  make({
    fullName: 'Davi Santos da Silva',
    className: '33.08',
    grade: '3º ano',
    turno: 'vespertino',
    diagnoses: ['TEA (em investigação)'],
    conditionSummary: 'Em investigação para TEA. Faz psicoterapia e nutrição. Lê e interpreta textos simples, digita com facilidade, copia do quadro. Adora cultura pop e tecnologia.',
    strengths: ['leitura/interpretação de textos simples', 'digitação', 'manuseia computador', 'soma e subtração com reservas', 'cálculo mental simples', 'cópia do quadro', 'operações com decimais (dinheiro)'],
    interests: ['Sonic', 'Homem-Aranha', 'Naruto / animes', 'tecnologia', 'quadrinhos', 'vídeos musicais', 'filmes', 'produz seus próprios vídeos'],
    barriers: ['comunicação e socialização', 'concentração e retenção', 'compreensão de comandos longos', 'multiplicação e sistema monetário complexo'],
    adaptations: ['usar Sonic, Homem-Aranha e Naruto como personagens nos enunciados', 'permitir resposta digitada', 'contextos de cultura pop / quadrinhos', 'matemática com dinheiro real (R$)'],
    autonomyLevel: 'media',
    pedagogicalLevel: 'fundamental_anos_iniciais',
    accent: 'cyan',
    avatarStyle: 'avataaars',
    mascot: '🦔',
  }),
  make({
    fullName: 'Kauã Martins de Oliveira Machado',
    className: '33.05',
    grade: '3º ano',
    turno: 'vespertino',
    diagnoses: ['Síndrome de Down'],
    conditionSummary: 'Síndrome de Down. Cognitivamente: memória, atenção e funções executivas insatisfatórias. Boa interação social. Comunica-se verbalmente. Padrão de rigidez e baixa tolerância à frustração.',
    strengths: ['interação social com colegas e professores', 'comunicação verbal', 'gosta de música como expressão', 'conta de 1 a 20', 'lê e escreve palavras simples', 'escreve nome completo', 'reconhece cores'],
    interests: ['tablet e jogos', 'Woody e Jessie (Toy Story)', 'instrumentos musicais', 'bola', 'brinquedos musicais'],
    barriers: ['atenção sustentada e alternada (insatisfatória)', 'memória operacional', 'flexibilidade cognitiva', 'planejamento', 'inibição comportamental', 'motricidade fina (lápis jumbo)', 'rigidez e baixa tolerância à frustração'],
    adaptations: ['lápis jumbo / espaços amplos', 'palavras simples e familiares', 'contexto Toy Story (Woody, Jessie)', 'música como recurso', 'tarefa estruturada e previsível (sem surpresa)', 'evitar avaliações abertas', 'reforço positivo constante'],
    autonomyLevel: 'baixa',
    pedagogicalLevel: 'inicio_alfabetizacao',
    accent: 'purple',
    avatarStyle: 'big-smile',
    mascot: '🤠',
  }),
  make({
    fullName: 'Ana Iza Mendes Silva',
    className: '33.05',
    grade: '3º ano',
    turno: 'vespertino',
    diagnoses: ['Deficiência Intelectual Moderada', 'TEA', 'Transtorno Afetivo Bipolar', 'Depressão', 'Ansiedade', 'Síndrome de Ehlers-Danlos'],
    conditionSummary: 'Quadro complexo: DI Moderada + TEA + Bipolar + Depressão + Ansiedade. Histórico de internações psiquiátricas, ideação suicida e automutilação. Hipersensibilidade sonora. Restrições alimentares severas. Acompanhamento contínuo no CAPSi.',
    strengths: ['conhecimentos básicos de leitura e escrita', 'desempenha bem em atividades estruturadas', 'responde a explicações simples e repetidas'],
    interests: ['ambientes calmos e acolhedores'],
    barriers: ['crises de ansiedade (falta de ar, choro, desmaios)', 'oscilações de humor', 'tristeza profunda', 'vulnerabilidade emocional', 'leitura/escrita/matemática lentas', 'hipersensibilidade sonora', 'cansaço físico (Ehlers-Danlos)', 'insegurança em exposição'],
    adaptations: ['atividades ESTRUTURADAS, calmas, sem pressão de tempo', 'explicações simples e repetidas', 'evitar exposição em grupo', 'tom acolhedor sempre', 'sem temas pesados/violentos', 'pausas previstas', 'reforço emocional positivo'],
    autonomyLevel: 'media',
    pedagogicalLevel: 'fundamental_anos_iniciais',
    accent: 'magenta',
    avatarStyle: 'lorelei',
    mascot: '🌷',
  }),
];

// =====================================================================
// Helpers de consulta
// =====================================================================

export const getStudentById = (id: string) =>
  NEURO_STUDENTS.find(s => s.id === id);

export const studentsByTurno = (turno: Turno) =>
  NEURO_STUDENTS.filter(s => s.turno === turno);

export const allDiagnoses = (): string[] => {
  const set = new Set<string>();
  NEURO_STUDENTS.forEach(s => s.diagnoses.forEach(d => set.add(d)));
  return Array.from(set).sort();
};

/** URL do avatar DiceBear, gerado pelo nome (estável e gratuito). */
export const avatarUrl = (s: NeuroStudent, size = 200) =>
  `https://api.dicebear.com/7.x/${s.avatarStyle}/svg?seed=${encodeURIComponent(s.fullName)}&size=${size}&backgroundType=gradientLinear&radius=20`;
