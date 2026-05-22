
import { Lesson } from './types';
import { createLesson } from './data_helpers';

// Química 1ª Série: 18 aulas por bimestre (Total 72)
export const quiLessonsB1: Lesson[] = [
  createLesson('g1-qui-b1-l1', 'L1: O que é Química e sua Importância', 'quimica',
    'A Química é a ciência que estuda a composição, estrutura, propriedades e transformações da matéria. Ela está presente em tudo ao nosso redor: nos alimentos, medicamentos, plásticos, combustíveis e até no ar que respiramos. No Brasil, a indústria química é um dos pilares da economia, presente em setores como agronegócio, saúde e energia.',
    ['Por que a Química é considerada uma ciência central e interligada às demais ciências?', 'Cite três exemplos do cotidiano em que a Química está presente na sua vida.']),

  createLesson('g1-qui-b1-l2', 'L2: Matéria, Massa e Volume', 'quimica',
    'Matéria é tudo que tem massa e ocupa espaço. A massa mede a quantidade de matéria de um corpo e é medida em gramas ou quilogramas. O volume indica o espaço ocupado pela matéria. Essas grandezas são fundamentais para a Química quantitativa e para cálculos envolvendo substâncias.',
    ['Qual a diferença entre massa e peso?', 'Como você calcularia a densidade de um objeto sabendo sua massa e volume?']),

  createLesson('g1-qui-b1-l3', 'L3: Propriedades Gerais e Específicas da Matéria', 'quimica',
    'As propriedades gerais da matéria são comuns a todas as substâncias: massa, volume, inércia e divisibilidade. Já as propriedades específicas identificam e distinguem cada substância, como ponto de fusão, ponto de ebulição, densidade e solubilidade. Essas propriedades são usadas para identificar materiais em laboratório.',
    ['O que são propriedades específicas da matéria e para que servem?', 'Por que o ponto de ebulição da água é diferente no litoral e em Brasília?']),

  createLesson('g1-qui-b1-l4', 'L4: Substâncias Puras e Misturas', 'quimica',
    'Uma substância pura tem composição definida e propriedades constantes: pode ser simples (um único elemento, como O₂) ou composta (dois ou mais elementos, como H₂O). Já a mistura é a junção de duas ou mais substâncias. O ar que respiramos, o sangue e o leite são exemplos de misturas presentes no cotidiano brasileiro.',
    ['Qual a diferença entre substância simples e substância composta?', 'O suco de laranja natural é uma substância pura ou mistura? Justifique.']),

  createLesson('g1-qui-b1-l5', 'L5: Misturas Homogêneas e Heterogêneas', 'quimica',
    'Uma mistura homogênea (solução) tem aparência uniforme e fase única visível, como o sal dissolvido em água. Uma mistura heterogênea tem mais de uma fase visível, como areia em água ou azeite com vinagre. A distinção é feita visualmente e com auxílio do microscópio.',
    ['Como você distingue visualmente uma mistura homogênea de uma heterogênea?', 'O granito (pedra muito usada na construção civil brasileira) é uma mistura homo ou heterogênea? Por quê?']),

  createLesson('g1-qui-b1-l6', 'L6: Métodos de Separação de Misturas I', 'quimica',
    'Existem vários métodos físicos para separar misturas. A filtração separa sólidos de líquidos (ex: café coado). A decantação aproveita a diferença de densidade (ex: areia e água). A catação e a levigação também separam sólidos. Esses métodos são usados em estações de tratamento de água no Brasil.',
    ['Por que o método de filtração não serve para separar uma mistura homogênea?', 'Como funciona o processo de decantação nas estações de tratamento de água?']),

  createLesson('g1-qui-b1-l7', 'L7: Métodos de Separação de Misturas II', 'quimica',
    'Para separar misturas homogêneas, usamos métodos como a destilação (separa líquidos por diferença de ponto de ebulição — usada na produção de etanol no Brasil), a evaporação (retira a água de uma solução, como na produção de sal marinho no Nordeste) e a cristalização.',
    ['Como a destilação é aplicada na produção de álcool combustível no Brasil?', 'Por que o sal marinho é produzido por evaporação e não por filtração?']),

  createLesson('g1-qui-b1-l8', 'L8: Cromatografia e Centrifugação', 'quimica',
    'A cromatografia separa componentes de uma mistura com base na diferença de afinidade com um solvente e um suporte (fase estacionária). É usada em laboratórios forenses e na análise de alimentos. A centrifugação usa força centrífuga para separar componentes de densidades diferentes, como no processamento do leite.',
    ['Como a cromatografia pode ser usada para detectar doping em atletas?', 'Por que a centrifugação é usada para separar o creme do leite?']),

  createLesson('g1-qui-b1-l9', 'L9: Estados Físicos da Matéria', 'quimica',
    'A matéria existe em três estados físicos principais: sólido (forma e volume definidos), líquido (volume definido, forma variável) e gasoso (sem forma nem volume definidos). Em condições especiais existe também o plasma. As moléculas se movem mais rapidamente no estado gasoso e mais lentamente no sólido.',
    ['O que determina o estado físico de uma substância em determinada temperatura?', 'Por que a água é tão especial ao existir nas três formas no planeta Terra?']),

  createLesson('g1-qui-b1-l10', 'L10: Mudanças de Estado Físico', 'quimica',
    'Ao ganhar ou perder energia (calor), a matéria muda de estado. As mudanças são: fusão (sólido→líquido), solidificação (líquido→sólido), vaporização (líquido→gás), condensação (gás→líquido), sublimação (sólido→gás) e deposição (gás→sólido). O ciclo da água na natureza exemplifica várias dessas mudanças.',
    ['O que acontece com as moléculas durante a mudança de estado físico?', 'Por que a naftalina (repelente de traças) desaparece com o tempo sem deixar líquido?']),

  createLesson('g1-qui-b1-l11', 'L11: Transformações Físicas e Químicas', 'quimica',
    'Uma transformação física altera o estado ou a forma da matéria sem mudar sua composição (ex: gelo derretendo). Uma transformação química (reação) produz novas substâncias com propriedades diferentes (ex: ferro enferrujando, alimento cozinhando). Os fogos de artifício usados no carnaval são exemplos espetaculares de reações químicas.',
    ['Como diferenciar uma transformação física de uma química no cotidiano?', 'Por que a queima do carvão para churrascos é uma transformação química e não física?']),

  createLesson('g1-qui-b1-l12', 'L12: Energia nas Transformações Químicas', 'quimica',
    'As reações químicas envolvem variação de energia. Reações exotérmicas liberam calor para o ambiente (como a combustão do gás de cozinha). Reações endotérmicas absorvem calor do ambiente (como a fotossíntese). A energia química armazenada nos alimentos e combustíveis é fundamental para a vida e a civilização.',
    ['Por que sentimos calor ao queimar gás de cozinha mas frio ao colocar bicarbonato em vinagre?', 'Como a fotossíntese das plantas do Cerrado contribui para o equilíbrio climático do Tocantins?']),

  createLesson('g1-qui-b1-l13', 'L13: Fenômenos Naturais e Química', 'quimica',
    'A Química explica muitos fenômenos naturais: a chuva ácida (reação de SO₂ e NO₂ com água), a formação de estalactites (dissolução e precipitação de carbonato de cálcio), as cores do arco-íris (refração da luz por gotas d\'água). O queimadas no Cerrado tocantinense produzem gases como CO₂ e CO que afetam o clima.',
    ['Como a queima de combustíveis fósseis contribui para a chuva ácida?', 'Qual a relação entre as queimadas no Cerrado e as mudanças climáticas globais?']),

  createLesson('g1-qui-b1-l14', 'L14: Introdução à Química de Laboratório', 'quimica',
    'O laboratório de Química tem regras de segurança essenciais: uso de jaleco, óculos, luvas e máscara. Equipamentos básicos incluem béquer, erlenmeyer, proveta, pipeta, bico de Bunsen e balança. Reagentes devem ser manuseados com cuidado, evitando contato com pele e mucosas.',
    ['Por que é obrigatório usar equipamentos de proteção individual no laboratório?', 'O que fazer em caso de acidente com ácido em laboratório?']),

  createLesson('g1-qui-b1-l15', 'L15: Grandezas e Unidades de Medida em Química', 'quimica',
    'A Química utiliza o Sistema Internacional (SI) de unidades. As principais grandezas são: massa (kg/g), volume (L/mL), temperatura (K e °C), pressão (Pa/atm) e quantidade de matéria (mol). Conversões entre unidades são fundamentais para os cálculos estequiométricos.',
    ['Como converter 500 mL para litros e para metros cúbicos?', 'Por que os cientistas usam a escala Kelvin em vez de Celsius para temperatura?']),

  createLesson('g1-qui-b1-l16', 'L16: Notação Científica em Química', 'quimica',
    'A notação científica expressa números muito grandes ou muito pequenos de forma compacta: N × 10ⁿ. Em Química, é usada para expressar dimensões atômicas (10⁻¹⁰ m) e números de partículas (constante de Avogadro: 6,02 × 10²³). Facilita cálculos e evita erros de arredondamento.',
    ['Expresse o número 0,000000150 em notação científica.', 'Por que a Constante de Avogadro (6,02×10²³) é tão importante para a Química?']),

  createLesson('g1-qui-b1-l17', 'L17: A Química no Agronegócio Brasileiro', 'quimica',
    'O Brasil é o maior exportador mundial de soja, carne e etanol. A Química é fundamental nesse setor: fertilizantes (NPK) aumentam a produtividade, agrotóxicos combatem pragas (com riscos ambientais), e o etanol de cana-de-açúcar é um biocombustível produzido por fermentação e destilação.',
    ['Quais são os riscos ambientais do uso excessivo de agrotóxicos na agricultura do Tocantins?', 'Como o etanol de cana é produzido e por que ele é considerado mais sustentável que a gasolina?']),

  createLesson('g1-qui-b1-l18', 'L18: Química Verde e Sustentabilidade', 'quimica',
    'A Química Verde propõe princípios para desenvolver processos químicos menos poluentes: usar matérias-primas renováveis, minimizar resíduos, evitar solventes tóxicos e tornar os processos mais eficientes em energia. No Brasil, o bioplástico produzido com cana-de-açúcar e o biodiesel são exemplos de aplicação.',
    ['O que são os 12 princípios da Química Verde?', 'Como a produção de bioplástico a partir da cana-de-açúcar contribui para a sustentabilidade no Brasil?']),
];

export const quiLessonsB2: Lesson[] = [
  createLesson('g1-qui-b2-l1', 'L1: Modelos Atômicos — Dalton', 'quimica',
    'John Dalton (1808) propôs que a matéria é formada por átomos indivisíveis e indestrutíveis, como pequenas esferas maciças. Cada elemento tem átomos com massa característica. Embora superado, o modelo de Dalton foi fundamental para estabelecer a Teoria Atômica moderna e explicar as leis das reações químicas.',
    ['Quais foram as limitações do modelo atômico de Dalton?', 'Por que o modelo de Dalton foi importante mesmo sendo incompleto?']),

  createLesson('g1-qui-b2-l2', 'L2: Modelo Atômico de Thomson', 'quimica',
    'J. J. Thomson descobriu o elétron em 1897 através de experimentos com tubos de raios catódicos. Propôs o modelo do "pudim de passas": o átomo seria uma esfera positiva com elétrons espalhados como passas em um pudim. Esse modelo reconheceu que o átomo tem partículas subatômicas.',
    ['Como o experimento de Thomson com raios catódicos provou a existência do elétron?', 'Por que o modelo de Thomson foi chamado de "pudim de passas"?']),

  createLesson('g1-qui-b2-l3', 'L3: Modelo Atômico de Rutherford', 'quimica',
    'Ernest Rutherford (1911) bombardeou uma fina lâmina de ouro com partículas alfa. A maioria passou direto, mas algumas desviaram muito ou voltaram. Concluiu que o átomo tem um núcleo pequeno, denso e positivo, com elétrons ao redor em grande espaço vazio. Esse modelo ficou conhecido como "modelo planetário".',
    ['O que o experimento da lâmina de ouro provou sobre a estrutura do átomo?', 'Qual a grande limitação do modelo de Rutherford que ainda precisava ser explicada?']),

  createLesson('g1-qui-b2-l4', 'L4: Modelo Atômico de Bohr', 'quimica',
    'Niels Bohr (1913) propôs que os elétrons orbitam o núcleo em órbitas circulares com energias definidas (camadas ou níveis de energia: K, L, M, N, O, P, Q). Ao ganhar energia, o elétron salta para uma camada mais externa. Ao perder energia, emite luz de cor específica. Esse modelo explica o espectro do hidrogênio.',
    ['O que é um "salto quântico" no modelo de Bohr?', 'Por que fogos de artifício de diferentes cores usam metais diferentes?']),

  createLesson('g1-qui-b2-l5', 'L5: Partículas Subatômicas: Prótons, Nêutrons e Elétrons', 'quimica',
    'O núcleo atômico contém prótons (carga +1, massa ~1 u.m.a.) e nêutrons (carga 0, massa ~1 u.m.a.). Os elétrons (carga -1, massa desprezível) orbitam o núcleo. O número atômico (Z) é o número de prótons, que define o elemento. O número de massa (A) é a soma de prótons e nêutrons.',
    ['Como o número de prótons define a identidade de um elemento químico?', 'Se um átomo tem 17 prótons e 18 nêutrons, qual é seu número atômico e de massa?']),

  createLesson('g1-qui-b2-l6', 'L6: Íons e Isótopos', 'quimica',
    'Íons são átomos que ganham ou perdem elétrons: cátions (+ carga, perdem elétrons) e ânions (- carga, ganham elétrons). Isótopos são átomos do mesmo elemento com diferentes números de nêutrons (ex: ¹²C e ¹⁴C). O isótopo ¹⁴C é usado na datação de fósseis, incluindo os encontrados no Tocantins.',
    ['Qual a diferença entre um átomo neutro e um íon?', 'Como o carbono-14 é usado para determinar a idade de fósseis arqueológicos?']),

  createLesson('g1-qui-b2-l7', 'L7: Tabela Periódica — Histórico e Organização', 'quimica',
    'Dmitri Mendeleev organizou os elementos por massa atômica crescente em 1869, prevendo a existência de elementos ainda não descobertos. A tabela moderna organiza 118 elementos por número atômico crescente, em 7 períodos (linhas) e 18 famílias/grupos (colunas). As famílias reúnem elementos com propriedades químicas semelhantes.',
    ['Por que Mendeleev deixou "lacunas" em sua tabela periódica?', 'O que os elementos de uma mesma família da tabela periódica têm em comum?']),

  createLesson('g1-qui-b2-l8', 'L8: Famílias e Grupos da Tabela Periódica', 'quimica',
    'Grupos importantes: metais alcalinos (Família IA: Na, K — muito reativos), metais alcalino-terrosos (Família IIA: Ca, Mg), halogênios (Família VIIA: F, Cl, Br — formam sais), gases nobres (Família 0/VIII A: He, Ne, Ar — pouco reativos, usados em lâmpadas). Os metais de transição incluem Fe, Cu, Au, Ag.',
    ['Por que os gases nobres raramente fazem ligações químicas?', 'Qual a aplicação do sódio (Na) e do potássio (K) no corpo humano?']),

  createLesson('g1-qui-b2-l9', 'L9: Propriedades Periódicas I — Raio Atômico e Eletronegatividade', 'quimica',
    'Raio atômico é o tamanho do átomo: aumenta de cima para baixo nos grupos (mais camadas) e diminui da esquerda para a direita nos períodos (mais prótons atraem mais elétrons). Eletronegatividade é a capacidade de atrair elétrons numa ligação: aumenta da esquerda para a direita e de baixo para cima. O flúor é o mais eletronegativo.',
    ['Por que o flúor é o elemento mais eletronegativo da tabela periódica?', 'Em que direção o raio atômico aumenta nos períodos e por quê?']),

  createLesson('g1-qui-b2-l10', 'L10: Propriedades Periódicas II — Energia de Ionização e Afinidade Eletrônica', 'quimica',
    'Energia de ionização é a energia necessária para remover um elétron de um átomo no estado gasoso. Aumenta da esquerda para a direita e de baixo para cima. Afinidade eletrônica é a energia liberada quando um átomo neutro ganha um elétron. Os halogênios têm alta afinidade eletrônica e formam ânions facilmente.',
    ['Por que os metais alcalinos têm baixa energia de ionização?', 'Qual a relação entre afinidade eletrônica e a formação de ânions?']),

  createLesson('g1-qui-b2-l11', 'L11: Ligações Químicas — Conceito e Tipos', 'quimica',
    'Ligações químicas são as forças que unem os átomos para formar moléculas e compostos. Existem três tipos principais: iônica (entre metal e ametal, transferência de elétrons), covalente (entre ametais, compartilhamento de elétrons) e metálica (entre metais, elétrons livres). A Regra do Octeto diz que átomos tendem a completar 8 elétrons na última camada.',
    ['O que é a Regra do Octeto e quais as exceções mais comuns?', 'Qual tipo de ligação une o sódio ao cloro no sal de cozinha?']),

  createLesson('g1-qui-b2-l12', 'L12: Ligação Iônica', 'quimica',
    'Na ligação iônica, um átomo de metal cede elétrons para um ametal, formando íons com cargas opostas que se atraem. Os compostos iônicos formam cristais sólidos com altos pontos de fusão, são solúveis em água e conduzem eletricidade quando dissolvidos. O cloreto de sódio (NaCl — sal de cozinha) é o exemplo mais conhecido.',
    ['Por que o sal de cozinha conduz eletricidade quando dissolvido em água mas não no estado sólido?', 'Como se forma o íon Na⁺ durante a ligação iônica no NaCl?']),

  createLesson('g1-qui-b2-l13', 'L13: Ligação Covalente', 'quimica',
    'Na ligação covalente, átomos compartilham pares de elétrons para completar o octeto. Pode ser simples (1 par), dupla (2 pares) ou tripla (3 pares). Exemplos: H₂O (água — 2 ligações simples), O₂ (oxigênio — ligação dupla), N₂ (nitrogênio — ligação tripla). Moléculas covalentes formam a base da Química Orgânica.',
    ['Qual a diferença entre uma ligação covalente simples e uma dupla?', 'Por que a molécula de água (H₂O) tem geometria angular e não linear?']),

  createLesson('g1-qui-b2-l14', 'L14: Ligação Metálica e Propriedades dos Metais', 'quimica',
    'Na ligação metálica, os elétrons da última camada se desprendem dos átomos e ficam livres, formando uma "nuvem" ou "mar de elétrons". Isso explica as propriedades dos metais: boa condução de eletricidade e calor, maleabilidade, ductilidade e brilho. O ferro, alumínio e cobre são os metais mais usados na indústria brasileira.',
    ['Por que os metais são bons condutores de eletricidade em função da ligação metálica?', 'Qual metal é mais usado na construção civil no Brasil e por quê?']),

  createLesson('g1-qui-b2-l15', 'L15: Polaridade das Ligações e das Moléculas', 'quimica',
    'Uma ligação é polar quando há diferença de eletronegatividade entre os átomos ligados: o átomo mais eletronegativo atrai mais os elétrons. Uma molécula é polar (dipolo) quando as cargas positiva e negativa não se cancelam (ex: H₂O). Moléculas apolares têm distribuição simétrica de cargas (ex: CO₂ linear, CCl₄).',
    ['Por que a água é uma molécula polar mesmo tendo ligações O-H polares?', 'Por que óleo e água não se misturam em relação à polaridade molecular?']),

  createLesson('g1-qui-b2-l16', 'L16: Forças Intermoleculares', 'quimica',
    'Forças intermoleculares são atrações entre moléculas (mais fracas que ligações químicas). As pontes de hidrogênio (entre H e F, O ou N) são as mais fortes — explicam a alta temperatura de ebulição da água. As forças de dipolo-dipolo atuam entre moléculas polares. As forças de London (dispersão) atuam entre todas as moléculas.',
    ['Por que a água tem ponto de ebulição muito mais alto que o metano (CH₄), sendo ambos covalentes?', 'Como as pontes de hidrogênio mantêm a estrutura do DNA?']),

  createLesson('g1-qui-b2-l17', 'L17: Geometria Molecular', 'quimica',
    'A geometria molecular é determinada pela Teoria VSEPR (repulsão dos pares de elétrons). Exemplos: BeCl₂ (linear), BF₃ (trigonal plana), CH₄ (tetraédrica), NH₃ (piramidal), H₂O (angular). A geometria influencia as propriedades físicas e químicas das substâncias e é fundamental na Química Orgânica.',
    ['Por que o CO₂ é linear enquanto o SO₂ é angular, mesmo tendo estruturas similares?', 'Como a geometria da molécula de água influencia suas propriedades únicas?']),

  createLesson('g1-qui-b2-l18', 'L18: Revisão — Tabela Periódica e Ligações Químicas', 'quimica',
    'Os modelos atômicos evoluíram de Dalton (esfera maciça) a Bohr (órbitas quantizadas), culminando no modelo quântico atual. As propriedades periódicas seguem tendências lógicas. As ligações iônica, covalente e metálica explicam a imensa variedade de materiais ao nosso redor. Essa base é essencial para entender todas as reações químicas.',
    ['Como os modelos atômicos foram evoluindo à medida que novas evidências experimentais surgiam?', 'Qual tipo de ligação você encontraria em: sal de cozinha, diamante e prego de ferro?']),
];

export const quiLessonsB3: Lesson[] = [
  createLesson('g1-qui-b3-l1', 'L1: Funções Inorgânicas — Conceito e Classificação', 'quimica',
    'Funções inorgânicas são grupos de substâncias inorgânicas com propriedades químicas semelhantes. As quatro principais são: ácidos, bases (hidróxidos), sais e óxidos. O estudo das funções inorgânicas é fundamental para entender reações de neutralização, dissolução e formação de sais utilizados na indústria e na medicina.',
    ['O que são funções inorgânicas e por que agrupamos substâncias em funções?', 'Cite um ácido, uma base, um sal e um óxido presente no seu cotidiano.']),

  createLesson('g1-qui-b3-l2', 'L2: Ácidos — Teoria de Arrhenius', 'quimica',
    'Segundo Arrhenius, ácido é toda substância que, dissolvida em água, libera H⁺ (íon hidrônio) como único cátion. Exemplos: HCl (ácido clorídrico — presente no suco gástrico), H₂SO₄ (ácido sulfúrico — usado em baterias de carros), H₃PO₄ (ácido fosfórico — nos refrigerantes). Os ácidos têm sabor azedo e são corrosivos.',
    ['Qual a definição de ácido segundo Arrhenius?', 'Por que o ácido clorídrico é produzido no estômago e qual sua função na digestão?']),

  createLesson('g1-qui-b3-l3', 'L3: Ácidos — Classificação e Nomenclatura', 'quimica',
    'Os ácidos são classificados por: número de hidrogênios ionizáveis (monoprótico: HCl; diprótico: H₂SO₄; triprótico: H₃PO₄), presença de oxigênio (hidrácidos sem O₂: HCl, H₂S; oxiácidos com O₂: H₂SO₄, HNO₃) e força (ácidos fortes: HCl, H₂SO₄, HNO₃; ácidos fracos: H₂CO₃, CH₃COOH).',
    ['Qual a diferença entre um hidrácido e um oxiácido? Dê exemplos.', 'Por que o ácido acético (vinagre) é considerado um ácido fraco?']),

  createLesson('g1-qui-b3-l4', 'L4: Bases — Teoria de Arrhenius', 'quimica',
    'Base (hidróxido) é, segundo Arrhenius, a substância que libera OH⁻ como único ânion em água. Exemplos: NaOH (soda cáustica — usada em sabão e papel), Ca(OH)₂ (cal extinta — construção civil), Mg(OH)₂ (leite de magnésia — antiácido). As bases têm sabor amargo, textura escorregadia e são corrosivas.',
    ['Qual a diferença entre uma base forte e uma base fraca?', 'Por que o hidróxido de magnésio (leite de magnésia) é usado como antiácido estomacal?']),

  createLesson('g1-qui-b3-l5', 'L5: Bases — Classificação e Nomenclatura', 'quimica',
    'As bases são nomeadas como "hidróxido de + nome do metal". Classificam-se por solubilidade (solúveis: NaOH, KOH; insolúveis: Cu(OH)₂, Fe(OH)₃), por número de hidroxilas (monobase, dibase, tribase) e por força (fortes: NaOH, Ca(OH)₂; fracas: NH₄OH). A maioria das bases insolúveis tem cor característica.',
    ['Como nomear corretamente o Ca(OH)₂ e o Fe(OH)₃?', 'Por que o hidróxido de cobre [Cu(OH)₂] tem cor azul enquanto o de ferro [Fe(OH)₃] é alaranjado?']),

  createLesson('g1-qui-b3-l6', 'L6: Escala de pH e Indicadores', 'quimica',
    'O pH mede a concentração de íons H⁺ em solução, variando de 0 a 14. pH < 7 é ácido, pH = 7 é neutro, pH > 7 é básico. Indicadores ácido-base mudam de cor conforme o pH: tornassol, fenolftaleína e repolho roxo (caseiro). O pH do solo do Cerrado é tipicamente ácido, sendo corrigido com calcário (CaCO₃).',
    ['Por que é importante conhecer o pH do solo para a agricultura no Cerrado?', 'Como fazer um indicador natural de pH em casa usando repolho roxo?']),

  createLesson('g1-qui-b3-l7', 'L7: Sais — Formação e Nomenclatura', 'quimica',
    'Sais são compostos iônicos formados pela reação entre ácido e base (neutralização). A nomenclatura segue o padrão: "ânion + de + cátion". Exemplo: NaCl = cloreto de sódio; CaCO₃ = carbonato de cálcio. Sais são usados em alimentação (sal de cozinha), fertilizantes (sulfato de amônio), medicina e indústria.',
    ['Como se forma um sal por reação de neutralização entre ácido e base?', 'Quais sais são usados como fertilizantes na agricultura e por quê?']),

  createLesson('g1-qui-b3-l8', 'L8: Sais — Propriedades e Hidrólise', 'quimica',
    'Os sais formam cristais sólidos iônicos em temperatura ambiente. Dissolvidos em água, podem ser neutros, ácidos ou básicos dependendo da força do ácido e da base que os geraram. Essa "hidrólise salina" explica por que o bicarbonato de sódio (NaHCO₃) é básico e o cloreto de amônio (NH₄Cl) é ácido.',
    ['Por que o bicarbonato de sódio (NaHCO₃) pode ser usado para neutralizar a acidez estomacal?', 'Como a hidrólise salina explica o pH de diferentes soluções de sais em água?']),

  createLesson('g1-qui-b3-l9', 'L9: Óxidos — Conceito e Classificação', 'quimica',
    'Óxidos são compostos binários formados por oxigênio e outro elemento. Classificam-se em: ácidos (reagem com água formando ácido: CO₂ + H₂O → H₂CO₃), básicos (reagem com água formando base: CaO + H₂O → Ca(OH)₂), anfóteros (reagem com ácidos e bases: Al₂O₃, ZnO) e neutros (não reagem: CO, NO).',
    ['Por que o CO₂ lançado na atmosfera é chamado de "óxido ácido" e contribui para o efeito estufa?', 'O que é um óxido anfótero e qual sua importância industrial?']),

  createLesson('g1-qui-b3-l10', 'L10: Óxidos — Nomenclatura', 'quimica',
    'A nomenclatura dos óxidos usa: "óxido de + nome do elemento" (para metais com valência única: CaO = óxido de cálcio) ou prefixos gregos indicando a quantidade de átomos de oxigênio (para ametais e metais com múltiplas valências: CO = monóxido de carbono; CO₂ = dióxido de carbono; Fe₂O₃ = trióxido de diferro).',
    ['Qual a nomenclatura correta do Fe₂O₃ (ferrugem) e qual sua importância econômica?', 'Por que o monóxido de carbono (CO) é tão perigoso para a saúde humana?']),

  createLesson('g1-qui-b3-l11', 'L11: Reações de Neutralização', 'quimica',
    'A neutralização é a reação entre um ácido e uma base, produzindo sal e água. A equação geral é: Ácido + Base → Sal + H₂O. Exemplos: HCl + NaOH → NaCl + H₂O. A neutralização total ocorre quando todo o ácido reage com toda a base, atingindo pH 7 (para reações de ácidos fortes com bases fortes).',
    ['Por que tomar antiácido (base) alivia a azia causada pelo excesso de ácido no estômago?', 'Como calcular o volume de NaOH 1M necessário para neutralizar completamente 100 mL de HCl 1M?']),

  createLesson('g1-qui-b3-l12', 'L12: Reações Ácido-Base de Brønsted-Lowry', 'quimica',
    'A teoria de Brønsted-Lowry amplia o conceito: ácido é doador de próton (H⁺) e base é receptor de próton. Isso explica reações ácido-base que ocorrem sem água. Pares conjugados ácido-base são fundamentais nessa teoria. O NH₃ (amônia) é uma base de Brønsted-Lowry clássica.',
    ['Por que a teoria de Brønsted-Lowry é mais ampla que a de Arrhenius?', 'Identifique o par conjugado ácido-base na reação: HCl + NH₃ → NH₄⁺ + Cl⁻']),

  createLesson('g1-qui-b3-l13', 'L13: Reações de Precipitação', 'quimica',
    'Em reações de precipitação, dois sais solúveis reagem em solução aquosa e formam um sal insolúvel (precipitado). Usa-se a tabela de solubilidade para prever se ocorre precipitação. Exemplo: Pb(NO₃)₂ + 2KI → PbI₂↓ (amarelo) + 2KNO₃. Reações de precipitação são usadas em análise química qualitativa e tratamento de efluentes.',
    ['Como a tabela de solubilidade ajuda a prever se uma reação de precipitação vai ocorrer?', 'Como o tratamento de efluentes industriais usa reações de precipitação para remover metais pesados?']),

  createLesson('g1-qui-b3-l14', 'L14: Soluções Tampão', 'quimica',
    'Soluções tampão resistem a variações de pH quando pequenas quantidades de ácido ou base são adicionadas. São formadas por ácido fraco + seu sal (ou base fraca + seu sal). O sangue humano é uma solução tampão (pH 7,35–7,45), tamponado principalmente pelo sistema H₂CO₃/HCO₃⁻. Variações nesse pH são fatais.',
    ['Por que o pH do sangue humano deve ser mantido entre 7,35 e 7,45?', 'Como uma solução tampão de acetato resiste a variações de pH?']),

  createLesson('g1-qui-b3-l15', 'L15: Funções Inorgânicas na Indústria Brasileira', 'quimica',
    'O ácido sulfúrico (H₂SO₄) é o produto químico mais produzido no mundo e base da indústria de fertilizantes, baterias e refino de minérios. O Brasil, maior produtor mundial de minério de ferro, usa ácidos e óxidos extensivamente. A Petrobras emprega reações ácido-base no refino do petróleo.',
    ['Por que o ácido sulfúrico é chamado de "o termômetro da indústria" de um país?', 'Como o minério de ferro brasileiro é processado quimicamente para produzir o aço?']),

  createLesson('g1-qui-b3-l16', 'L16: Análise Qualitativa — Identificando Substâncias', 'quimica',
    'A análise qualitativa usa reações específicas para identificar íons em solução. O teste da chama identifica metais: Na (amarelo), K (violeta), Ca (laranja-vermelho), Cu (verde-azul). O teste com AgNO₃ identifica halogênios. Essas técnicas são usadas em criminalística, análise de alimentos e controle de qualidade.',
    ['Como o teste de chama pode identificar a presença de sódio numa substância desconhecida?', 'Como a análise qualitativa é usada na criminalística para analisar cenas de crime?']),

  createLesson('g1-qui-b3-l17', 'L17: Funções Inorgânicas e Saúde', 'quimica',
    'Muitas funções inorgânicas têm aplicações médicas: HCl no suco gástrico, NaHCO₃ como antiácido, Ca(OH)₂ na odontologia, NaCl em soro fisiológico, KMnO₄ como antisséptico. O desequilíbrio de íons inorgânicos no organismo causa acidose, alcalose e outras doenças. A hidratação com sais minerais é fundamental em esportes.',
    ['Por que o soro fisiológico tem concentração específica de NaCl (0,9%)?', 'O que é acidose metabólica e como o equilíbrio ácido-base do organismo tenta corrigi-la?']),

  createLesson('g1-qui-b3-l18', 'L18: Revisão — Funções Inorgânicas', 'quimica',
    'As funções inorgânicas são a base para entender as reações da Química Geral. Ácidos (liberam H⁺), bases (liberam OH⁻), sais (íon positivo + negativo) e óxidos (elemento + O) se inter-relacionam por reações de neutralização, precipitação e formação. Compreender essas funções é fundamental para a estequiometria e a Química Orgânica.',
    ['Quais são as quatro principais funções inorgânicas e como elas se relacionam entre si?', 'Dado o ácido H₂SO₄ e a base Ca(OH)₂, escreva e balance a reação de neutralização completa.']),
];

export const quiLessonsB4: Lesson[] = [
  createLesson('g1-qui-b4-l1', 'L1: Reações Químicas — Conceito e Evidências', 'quimica',
    'Uma reação química é um processo em que substâncias (reagentes) se transformam em novas substâncias (produtos) com propriedades diferentes. As evidências de uma reação incluem: mudança de cor, formação de precipitado, liberação de gás, variação de temperatura e emissão de luz. A corrosão do ferro e a queima do gás são exemplos cotidianos.',
    ['Quais são as principais evidências de que uma reação química ocorreu?', 'Como distinguir uma mudança física de uma reação química ao observar uma vela acendendo?']),

  createLesson('g1-qui-b4-l2', 'L2: Equação Química e Balanceamento', 'quimica',
    'A equação química representa graficamente uma reação usando fórmulas dos reagentes e produtos. O balanceamento garante que o número de átomos de cada elemento seja igual nos dois lados (Lei de Lavoisier). Usa-se o método das tentativas ou de análise por elemento. Ex: 2H₂ + O₂ → 2H₂O.',
    ['Por que uma equação química precisa ser balanceada?', 'Balance a equação: Fe + O₂ → Fe₂O₃ (formação de ferrugem).']),

  createLesson('g1-qui-b4-l3', 'L3: Lei de Lavoisier — Conservação da Massa', 'quimica',
    'Antoine Lavoisier (1789) enunciou: "a matéria não é criada nem destruída, apenas transformada." Em um sistema fechado, a massa dos reagentes é sempre igual à massa dos produtos. Essa lei foi comprovada por experimentos precisos de pesagem e é a base de todos os cálculos estequiométricos.',
    ['Como a Lei de Lavoisier explica por que o carvão parece "desaparecer" ao queimar mas na verdade não some?', 'Um recipiente fechado contém 20g de reagentes. Após a reação, qual será a massa dos produtos?']),

  createLesson('g1-qui-b4-l4', 'L4: Lei de Proust — Proporções Definidas', 'quimica',
    'Proust (1801) afirmou que numa substância composta pura, os elementos se combinam em proporções fixas de massa. Ex: a água sempre tem 1g de H para cada 8g de O (razão 1:8). Essa lei prova que os compostos químicos têm fórmulas definidas. É a base para calcular massas em reações.',
    ['O que a Lei de Proust diz sobre a composição da água?', 'Se tenho 4g de H₂, quantos gramas de O₂ precisarei para formar água segundo a Lei de Proust?']),

  createLesson('g1-qui-b4-l5', 'L5: Tipos de Reações Químicas — Síntese e Análise', 'quimica',
    'As reações químicas se classificam em 4 tipos principais. Síntese (adição): A + B → AB (formação de um composto a partir de dois reagentes simples, ex: 2H₂ + O₂ → 2H₂O). Análise (decomposição): AB → A + B (um composto se divide em substâncias mais simples, ex: eletrólise da água).',
    ['Cite um exemplo de reação de síntese e um de análise presentes no seu cotidiano.', 'Por que a eletrólise da água é classificada como reação de análise?']),

  createLesson('g1-qui-b4-l6', 'L6: Tipos de Reações — Deslocamento e Dupla Troca', 'quimica',
    'Deslocamento (simples troca): um elemento desloca outro de um composto: A + BC → AC + B. Ex: Zn + H₂SO₄ → ZnSO₄ + H₂↑. Dupla troca (metátese): troca de íons entre dois compostos: AB + CD → AD + CB. Ex: NaCl + AgNO₃ → AgCl↓ + NaNO₃. Ambas são fundamentais na indústria.',
    ['Por que o zinco consegue deslocar o hidrogênio do ácido sulfúrico?', 'Identifique o tipo de reação: BaCl₂ + Na₂SO₄ → BaSO₄ + 2NaCl.']),

  createLesson('g1-qui-b4-l7', 'L7: Reações de Combustão', 'quimica',
    'Combustão é a reação de um combustível com oxigênio (comburente), liberando calor e luz. Na combustão completa do carbono: C + O₂ → CO₂. Na combustão completa de hidrocarbonetos: CₙHₘ + O₂ → CO₂ + H₂O. A combustão incompleta produz CO (monóxido de carbono — tóxico) e fuligem. O etanol (biocombustível brasileiro) queima de forma mais limpa.',
    ['Qual a diferença entre combustão completa e incompleta?', 'Por que o monóxido de carbono (CO) gerado em combustões incompletas é perigoso para a saúde?']),

  createLesson('g1-qui-b4-l8', 'L8: Reações de Oxirredução (Redox)', 'quimica',
    'Reações de oxidação-redução (redox) envolvem transferência de elétrons. Oxidação: perda de elétrons (aumento do número de oxidação - NOX). Redução: ganho de elétrons (diminuição do NOX). O agente oxidante se reduz, e o agente redutor se oxida. A ferrugem, as baterias, a fotossíntese e a respiração celular são reações redox.',
    ['O que acontece com o número de oxidação do ferro quando ele enferruja?', 'Nas pilhas e baterias, qual eletrodo sofre oxidação e qual sofre redução?']),

  createLesson('g1-qui-b4-l9', 'L9: Cálculo do Número de Oxidação (NOX)', 'quimica',
    'O número de oxidação (NOX) é uma carga hipotética atribuída a um átomo nas reações redox. Regras: elemento livre = 0; íon monoatômico = carga do íon; O = -2 (exceto peróxidos); H = +1 (exceto hidretos); soma dos NOX numa molécula = 0; numa espécie iônica = carga do íon.',
    ['Qual o NOX do manganês no KMnO₄?', 'Qual o NOX do cromo no K₂Cr₂O₇ (importante em galvanoplastia)?']),

  createLesson('g1-qui-b4-l10', 'L10: Estequiometria — Conceito de Mol', 'quimica',
    'O mol é a unidade de quantidade de matéria no SI. 1 mol contém 6,02 × 10²³ partículas (Constante de Avogadro). A massa de 1 mol de uma substância em gramas é igual à sua massa molar (em g/mol), numericamente igual à massa atômica ou molecular. Ex: 1 mol de O₂ = 32 g; 1 mol de H₂O = 18 g.',
    ['Por que os químicos usam o conceito de "mol" em vez de contar átomos individualmente?', 'Quantas moléculas existem em 36 g de água (H₂O)?']),

  createLesson('g1-qui-b4-l11', 'L11: Cálculos Estequiométricos — Relações entre Reagentes e Produtos', 'quimica',
    'A estequiometria calcula as quantidades de reagentes e produtos em uma reação. Os coeficientes da equação balanceada indicam as proporções em mols. Passos: converter para mols, usar proporção estequiométrica, converter para a unidade desejada (g, L, número de partículas). A estequiometria é essencial na indústria para não desperdiçar reagentes.',
    ['Na reação 2H₂ + O₂ → 2H₂O, quantos gramas de água são produzidos a partir de 4g de H₂?', 'Por que a estequiometria é economicamente importante na produção industrial de produtos químicos?']),

  createLesson('g1-qui-b4-l12', 'L12: Reagente Limitante e Reagente em Excesso', 'quimica',
    'O reagente limitante é o que é consumido primeiro numa reação, determinando a quantidade máxima de produto. O reagente em excesso é o que sobra após a reação. Para identificar o limitante, calcula-se a quantidade teórica de produto gerada por cada reagente: o que gerar menos produto é o limitante.',
    ['Por que identificar o reagente limitante é importante para a produção eficiente de produtos químicos?', 'Em uma reação com 10g de H₂ e 80g de O₂, qual é o reagente limitante?']),

  createLesson('g1-qui-b4-l13', 'L13: Rendimento de uma Reação', 'quimica',
    'O rendimento percentual de uma reação compara a quantidade de produto obtida experimentalmente com a quantidade teórica máxima. Rendimento (%) = (massa real / massa teórica) × 100. Reações raramente têm 100% de rendimento por perdas, impurezas e reações secundárias. Na indústria, maximizar o rendimento reduz custos.',
    ['Por que as reações industriais raramente atingem 100% de rendimento?', 'Uma reação que deveria produzir 50g de produto produziu 40g. Qual foi o rendimento?']),

  createLesson('g1-qui-b4-l14', 'L14: Estequiometria de Gases', 'quimica',
    'Nas condições normais (CNTP: 0°C e 1 atm), 1 mol de qualquer gás ocupa 22,4 L (volume molar). Na temperatura e pressão padrão (TPE: 25°C e 1 atm), 1 mol ocupa 24,5 L. A Lei de Gay-Lussac dos volumes diz que gases se combinam em volumes simples. Exemplos: combustão de hidrocarbonetos gera CO₂ gasoso.',
    ['Se 2 mols de H₂ reagem com 1 mol de O₂, qual é o volume total de H₂O produzida em forma de vapor (CNTP)?', 'Por que os volumes molares de gases são iguais independentemente do tipo de gás (nas mesmas condições)?']),

  createLesson('g1-qui-b4-l15', 'L15: Pureza de Reagentes', 'quimica',
    'Reagentes industriais raramente são 100% puros. A pureza é expressa em porcentagem. Nos cálculos estequiométricos: massa do reagente puro = massa da amostra × (% pureza / 100). Em laboratório, reagentes P.A. (pro análise) têm alta pureza; em indústrias, usa-se grau técnico. A pureza afeta o rendimento e a qualidade do produto final.',
    ['Se um minério de ferro tem 70% de pureza, quantos gramas de Fe puro existem em 200g do minério?', 'Por que a pureza do reagente afeta o cálculo do rendimento de uma reação?']),

  createLesson('g1-qui-b4-l16', 'L16: Aplicações da Estequiometria na Indústria Brasileira', 'quimica',
    'A estequiometria tem aplicações diretas na indústria brasileira: na Petrobras, calcula-se a quantidade de catalisadores para refino do petróleo; na Vale, calcula-se a redução do minério de ferro com coque; nas usinas de etanol, calcula-se a fermentação da sacarose. Essas aplicações otimizam recursos e reduzem custos.',
    ['Como a estequiometria é usada no processo de produção do etanol nas usinas canavieiras do Centro-Oeste?', 'Qual a importância do controle estequiométrico na produção de fertilizantes para o agronegócio brasileiro?']),

  createLesson('g1-qui-b4-l17', 'L17: Poluição Química e Química Ambiental', 'quimica',
    'A poluição química afeta ar, água e solo. O CO₂ e metano intensificam o efeito estufa. SOₓ e NOₓ formam chuva ácida. Metais pesados (Pb, Hg, Cd) contaminam solos e rios. No Brasil, o garimpo ilegal no Pará e no Tocantins contamina rios com mercúrio, afetando populações ribeirinhas e indígenas.',
    ['Como o garimpo ilegal de ouro contamina rios com mercúrio e afeta populações locais?', 'O que é o efeito estufa e quais as principais substâncias químicas responsáveis pelo seu agravamento?']),

  createLesson('g1-qui-b4-l18', 'L18: Revisão Final — Reações Químicas e Estequiometria', 'quimica',
    'As reações químicas são o coração da Química. Entender os tipos de reações, as leis ponderais (Lavoisier e Proust) e os cálculos estequiométricos (mol, massa molar, reagente limitante, rendimento) é essencial para qualquer aplicação industrial, laboratorial ou ambiental. Esses conceitos se aplicam em toda a vida profissional.',
    ['Quais são os quatro tipos principais de reações químicas e um exemplo de cada?', 'Descreva os passos para resolver um problema estequiométrico do início ao fim.']),
];
