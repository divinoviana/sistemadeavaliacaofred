import { Lesson } from './types';
import { createLesson } from './data_helpers';

// Física 2ª Série: 18 aulas por bimestre (Total 72)

export const fisLessonsB1: Lesson[] = [
  createLesson('g2-fis-b1-l1', 'L1: Pressão — Conceito e Unidades', 'fisica',
    'Pressão (p = F/A) é a razão entre a força aplicada e a área sobre a qual ela age. A unidade no SI é o Pascal (Pa = N/m²). Quanto menor a área, maior a pressão para a mesma força — por isso facas cortam e agulhas perfuram facilmente. Na medicina, a pressão arterial é medida em mmHg; em pneus, em kgf/cm² ou PSI.',
    ['Por que saltos agulha causam mais dano ao piso do que tênis planos, mesmo pesando menos?', 'Como o conceito de pressão é aplicado no dimensionamento de fundações de edificações no Brasil?']),

  createLesson('g2-fis-b1-l2', 'L2: Pressão Hidrostática', 'fisica',
    'A pressão hidrostática (p = ρ·g·h) é a pressão exercida por um fluido em repouso sobre um ponto a profundidade h. Ela depende da densidade do fluido (ρ), da aceleração da gravidade (g) e da profundidade (h), mas não da forma do recipiente. A cada 10 m de profundidade no mar, a pressão aumenta em 1 atm — importante para mergulhadores.',
    ['Por que a pressão em grandes profundidades oceânicas pode destruir equipamentos não projetados para isso?', 'Como mergulhadores profissionais da Marinha brasileira gerenciam a pressão ao realizar operações subaquáticas?']),

  createLesson('g2-fis-b1-l3', 'L3: Princípio de Pascal', 'fisica',
    'O Princípio de Pascal afirma que uma variação de pressão aplicada a um fluido em repouso e confinado é transmitida igualmente e sem diminuição a todos os pontos do fluido e às paredes do recipiente. Este princípio fundamenta os freios hidráulicos de automóveis, as prensas hidráulicas industriais e os macacos hidráulicos usados em postos de gasolina no Brasil.',
    ['Como o sistema de freios hidráulico de um carro usa o Princípio de Pascal para multiplicar a força?', 'Por que uma pequena força aplicada em um êmbolo pequeno pode levantar um carro em um macaco hidráulico?']),

  createLesson('g2-fis-b1-l4', 'L4: Vasos Comunicantes', 'fisica',
    'Em vasos comunicantes ligados na base e contendo o mesmo líquido, a superfície livre fica no mesmo nível horizontal, independente da forma ou volume dos vasos. Se os líquidos forem diferentes, os níveis se ajustam de acordo com as densidades. Sistemas de abastecimento de água, caixas d\'água e o nível de mar são aplicações deste princípio.',
    ['Por que caixas d\'água em diferentes partes de uma cidade precisam estar à mesma altura para ter pressão igual?', 'Como o Princípio dos Vasos Comunicantes é usado para nivelar construções sem equipamentos sofisticados?']),

  createLesson('g2-fis-b1-l5', 'L5: Empuxo e Princípio de Arquimedes', 'fisica',
    'O Princípio de Arquimedes afirma que um corpo imerso (total ou parcialmente) em um fluido recebe uma força de impulsão (empuxo) vertical para cima igual ao peso do fluido deslocado: E = ρfluido·g·V. Se E > Peso, o objeto flutua; se E < Peso, afunda; se E = Peso, fica em equilíbrio. Navios, submarinos e balões seguem esse princípio.',
    ['Por que um navio de aço flutua, mas um pedaço sólido do mesmo aço afunda?', 'Como os submarinos da Marinha do Brasil controlam a profundidade de imersão usando o Princípio de Arquimedes?']),

  createLesson('g2-fis-b1-l6', 'L6: Flotação e Densidade', 'fisica',
    'Um corpo flutua quando sua densidade média é menor que a do fluido. Para objetos ocos (como navios), a densidade média inclui o ar interno. A fração submersa de um objeto que flutua é igual à razão entre sua densidade e a do fluido: fsub = ρobj/ρfluido. Icebergs têm aproximadamente 9/10 de seu volume abaixo d\'água, pois a densidade do gelo é 0,9 g/cm³.',
    ['Por que o Rio Amazonas tem água menos densa que o oceano, e como isso afeta a navegação fluvial?', 'Como submarinos conseguem afundar e subir controlando sua densidade média?']),

  createLesson('g2-fis-b1-l7', 'L7: Pressão Atmosférica', 'fisica',
    'A atmosfera terrestre exerce pressão sobre todas as superfícies. A pressão atmosférica padrão é 1 atm = 101.325 Pa ≈ 760 mmHg. Ela diminui com a altitude — no topo do Pico da Neblina (AM, 2.994 m), é bem menor que no nível do mar. A pressão atmosférica explica por que canudos funcionam, a exaustão de motores e o funcionamento de ventosas.',
    ['Por que água ferve a temperaturas mais baixas em locidades de altitude elevada, como Brasília (1.172 m)?', 'Como pilotos de aviões e alpinistas lidam com a baixa pressão atmosférica em grandes altitudes?']),

  createLesson('g2-fis-b1-l8', 'L8: Medição de Pressão — Manômetros e Barômetros', 'fisica',
    'Barômetros medem a pressão atmosférica absoluta (o barômetro de Torricelli usa coluna de mercúrio). Manômetros medem a pressão manométrica (diferença em relação à pressão atmosférica). Pneus são calibrados em pressão manométrica. A pressão absoluta é a soma da manométrica com a atmosférica. Termômetros e previsão do tempo usam dados de pressão.',
    ['Por que a pressão de pneus deve ser verificada quando o pneu está frio?', 'Como meteorologistas usam mapas de pressão atmosférica para prever tempestades no Brasil?']),

  createLesson('g2-fis-b1-l9', 'L9: Equação da Continuidade — Hidrodinâmica', 'fisica',
    'Em um fluido ideal em escoamento estacionário, o produto da velocidade pela área da seção transversal é constante ao longo do tubo: A₁·v₁ = A₂·v₂. Isso significa que onde o tubo é mais estreito, o fluido flui mais rápido. É o que acontece quando você aperta o final de uma mangueira: a área diminui e a velocidade aumenta.',
    ['Por que o fluxo de água acelera quando você tampa parcialmente a saída de uma mangueira?', 'Como engenheiros hidráulicos usam a equação da continuidade no dimensionamento de tubulações de abastecimento?']),

  createLesson('g2-fis-b1-l10', 'L10: Equação de Bernoulli', 'fisica',
    'A equação de Bernoulli (p + ½ρv² + ρgh = constante) é a lei de conservação de energia para fluidos ideais. Onde a velocidade é maior, a pressão é menor. Este princípio explica a sustentação de aviões (diferença de pressão em asas), o efeito Magnus (curvatura de bolas no esporte) e o funcionamento de carburadores e atomizadores.',
    ['Como a forma da asa de um avião usa o Princípio de Bernoulli para gerar sustentação?', 'Como o Efeito Magnus explica as cobranças de falta curvas de jogadores de futebol brasileiro?']),

  createLesson('g2-fis-b1-l11', 'L11: Viscosidade e Escoamento Real', 'fisica',
    'A viscosidade é a resistência interna de um fluido ao escoamento — é a "grossura" do fluido. Fluidos viscosos (mel, óleo) escoam mais lentamente que fluidos pouco viscosos (água, ar). A viscosidade do sangue é importante em medicina cardiovascular; a viscosidade do petróleo afeta o transporte pelo oleoduto da Petrobras.',
    ['Por que óleos lubrificantes de motor têm diferentes graus de viscosidade (SAE 5W30, 10W40)?', 'Como a viscosidade do petróleo bruto afeta o transporte pelos oleodutos da Petrobras?']),

  createLesson('g2-fis-b1-l12', 'L12: Lei de Stokes e Sedimentação', 'fisica',
    'A Lei de Stokes descreve a força de arrasto sobre uma esfera se movendo lentamente em um fluido viscoso. É fundamental para entender a sedimentação de partículas em líquidos — como partículas de argila no Rio Paraná ou células sanguíneas em um hemograma. Centrífugas usam força centrífuga para acelerar a sedimentação em laboratórios clínicos.',
    ['Como a Lei de Stokes é aplicada na análise de sedimentos em rios amazônicos?', 'Por que centrífugas de laboratório precisam girar muito rápido para separar componentes do sangue?']),

  createLesson('g2-fis-b1-l13', 'L13: Tensão Superficial e Capilaridade', 'fisica',
    'A tensão superficial é a tendência da superfície livre de um líquido de minimizar sua área (como uma membrana elástica), causada pela coesão entre moléculas. A capilaridade é a capacidade de líquidos subirem ou descerem em tubos finos. Plantas absorvem água do solo via capilaridade; insetos caminham sobre a água graças à tensão superficial.',
    ['Como a capilaridade permite que árvores da Amazônia transportem água do solo até suas copas?', 'Por que detergentes (como os fabricados no Brasil pela Unilever e P&G) reduzem a tensão superficial da água e limpam melhor?']),

  createLesson('g2-fis-b1-l14', 'L14: Aplicações de Hidrostática — Barragens e Represas', 'fisica',
    'As barragens de usinas hidrelétricas brasileiras (Itaipu, Belo Monte, Tucuruí) precisam suportar enormes forças devido à pressão hidrostática da água acumulada. A força total sobre a parede da barragem é calculada integrando a pressão ao longo da profundidade. Por isso barragens são mais espessas na base — onde a pressão é maior.',
    ['Por que barragens de usinas hidrelétricas têm uma forma trapezoidal, mais larga na base?', 'Como engenheiros calculam a resistência necessária da parede de uma barragem como a de Tucuruí?']),

  createLesson('g2-fis-b1-l15', 'L15: Hidráulica em Sistemas de Abastecimento', 'fisica',
    'O abastecimento de água das cidades brasileiras envolve pressão, vazão e perdas por atrito nas tubulações. A pressão mínima nas torneiras depende da altura da caixa d\'água ou da pressão da bomba. A equação de Bernoulli e as perdas de carga (viscosidade) são consideradas por engenheiros sanitaristas no projeto de redes de distribuição.',
    ['Por que moradores dos últimos andares de edifícios têm menos pressão na torneira do que os dos primeiros andares?', 'Como o Saneamento Básico, direito garantido pela Lei 14.026/2020 no Brasil, depende da Física dos fluidos?']),

  createLesson('g2-fis-b1-l16', 'L16: Escoamento de Gases — Pneumática', 'fisica',
    'Gases também são fluidos e seguem princípios similares aos líquidos, porém são compressíveis. Sistemas pneumáticos usam ar comprimido para mover pistões com grandes forças — como nas portas de ônibus articulados urbanos e nas ferramentas pneumáticas de oficinas mecânicas. Compressores industriais são amplamente usados na indústria brasileira.',
    ['Qual a diferença fundamental entre sistemas hidráulicos e pneumáticos?', 'Por que as portas de ônibus articulados usam ar comprimido em vez de motores elétricos para abrir e fechar?']),

  createLesson('g2-fis-b1-l17', 'L17: Revisão — Hidrostática e Hidrodinâmica', 'fisica',
    'Revisamos pressão, pressão hidrostática, Princípio de Pascal, empuxo, Arquimedes, pressão atmosférica, Equação da Continuidade e Bernoulli. Esses conceitos são amplamente cobrados no ENEM e são fundamentais para engenharia civil, sanitária, naval e aeronáutica — áreas em expansão no Brasil.',
    ['Como os princípios de Pascal e Arquimedes se complementam na análise de fluidos?', 'Qual conceito deste bimestre você considera mais presente no cotidiano brasileiro?']),

  createLesson('g2-fis-b1-l18', 'L18: Prática — Determinação da Densidade por Empuxo', 'fisica',
    'Nesta prática, os alunos determinam a densidade de sólidos irregulares usando uma balança e água. O método de Arquimedes: pesa-se o objeto no ar (P₁) e submerso na água (P₂). O empuxo E = P₁ − P₂ = ρágua·g·V. Com V calculado, determina-se ρobjeto = P₁/(g·V). É um método usado em geologia e controle de qualidade industrial.',
    ['Como a Física do empuxo pode ser usada para identificar se uma joia é de ouro puro ou adulterate?', 'Que fontes de erro podem afetar esse experimento e como minimizá-las?']),
];

export const fisLessonsB2: Lesson[] = [
  createLesson('g2-fis-b2-l1', 'L1: Temperatura e Termometria', 'fisica',
    'Temperatura é uma grandeza que indica o grau de agitação das moléculas de um corpo. O termômetro mede temperatura comparando com padrões calibrados. No Brasil usa-se a escala Celsius (°C); a escala Kelvin (K) é usada na ciência (T(K) = T(°C) + 273); a Fahrenheit ainda é usada nos EUA. O zero absoluto (0 K = −273 °C) é o limite teórico mais frio possível.',
    ['Por que o zero absoluto (−273 °C) é um limite que não pode ser atingido na prática?', 'Como a temperatura corporal de 37°C se converte para Kelvin e Fahrenheit?']),

  createLesson('g2-fis-b2-l2', 'L2: Escalas Termométricas e Conversões', 'fisica',
    'As três escalas principais são: Celsius (°C), com gelo fundindo a 0° e água fervendo a 100°; Kelvin (K), escala absoluta usada na ciência; Fahrenheit (°F), usada nos EUA, onde a água ferve a 212°F. Conversões: K = °C + 273; °F = (9/5)·°C + 32. O ENEM frequentemente pede conversões e comparações entre escalas.',
    ['Um paciente americano tem febre de 101°F. Qual é essa temperatura em Celsius?', 'Por que a escala Kelvin é essencial em cálculos termodinâmicos?']),

  createLesson('g2-fis-b2-l3', 'L3: Calor e Temperatura — Distinção Fundamental', 'fisica',
    'Calor (Q) é energia em trânsito entre corpos com temperaturas diferentes; flui sempre do mais quente para o mais frio até atingir o equilíbrio térmico. A temperatura mede o estado térmico atual; o calor é o processo de transferência. "Frio" não é uma entidade — é apenas ausência relativa de energia térmica. Essa distinção é fundamental e frequentemente confundida.',
    ['Por que dizemos que o frio "entra" pela janela, mas fisicamente isso não está correto?', 'Como o calor se transfere quando você toca um metal frio? O frio "vai para a sua mão" ou o calor "vai para o metal"?']),

  createLesson('g2-fis-b2-l4', 'L4: Processos de Transferência de Calor', 'fisica',
    'O calor se transfere por três mecanismos: condução (contato molecular, sólidos), convecção (correntes em fluidos) e radiação (ondas eletromagnéticas, sem necessidade de meio material). Panelas de alumínio conduzem bem; ventos e correntes oceânicas são convecção; o calor do Sol chega à Terra por radiação. A geladeira e o ar-condicionado manipulam esses processos.',
    ['Por que panelas de alumínio esquentam mais rapidamente que panelas de barro?', 'Como as correntes de convecção oceânica influenciam o clima de regiões costeiras brasileiras como o Nordeste?']),

  createLesson('g2-fis-b2-l5', 'L5: Capacidade Térmica e Calor Específico', 'fisica',
    'O calor específico (c) de uma substância é a quantidade de calor necessária para elevar 1 kg desta substância em 1°C. A água tem c = 4.186 J/(kg·°C), um dos maiores da natureza — por isso aquece e esfria lentamente, moderando o clima das cidades costeiras. A capacidade térmica (C = m·c) é a quantidade de calor para aquecer todo o objeto 1°C.',
    ['Por que cidades no litoral brasileiro têm temperaturas mais amenas do que cidades no interior?', 'Por que a água é o melhor fluido de refrigeração para motores de automóveis?']),

  createLesson('g2-fis-b2-l6', 'L6: Calorimetria — Equação Fundamental', 'fisica',
    'A equação fundamental da calorimetria é Q = m·c·ΔT, onde Q é o calor trocado (J), m a massa (kg), c o calor específico (J/kg·°C) e ΔT a variação de temperatura. Em um sistema isolado, o calor cedido pelo corpo mais quente é igual ao calor absorvido pelo corpo mais frio: Qcedido = Qabsorvido. Essa equação é a base dos calorímetros e da nutrição (calorias dos alimentos).',
    ['Quantas quilocalorias são necessárias para aquecer 2 litros de água de 20°C a 100°C?', 'Como os nutricionistas usam o conceito de caloria (kcal) para quantificar a energia dos alimentos?']),

  createLesson('g2-fis-b2-l7', 'L7: Mudanças de Estado Físico', 'fisica',
    'As mudanças de estado (fusão, solidificação, vaporização, condensação, sublimação, ressublimação) ocorrem a temperatura constante enquanto houver troca de calor. O calor latente (L) é a energia necessária para mudar o estado de 1 kg de substância: Q = m·L. O ciclo da água na natureza, incluindo a formação de chuvas e rios brasileiros, envolve todas essas transformações.',
    ['Por que a temperatura da água não muda enquanto está fervendo, mesmo com fogo constante?', 'Como o ciclo das águas nos rios amazônicos envolve diferentes mudanças de estado físico?']),

  createLesson('g2-fis-b2-l8', 'L8: Calor Latente e Aplicações', 'fisica',
    'O calor latente de fusão do gelo é 334 kJ/kg e o de vaporização da água é 2.257 kJ/kg. Por isso, o vapor a 100°C cede muito mais calor ao condensar do que a água líquida ao esfriar. Geladeiras exploram o calor latente de vaporização de gases refrigerantes (como o R-410A) no ciclo de refrigeração. A transpiração humana também usa o calor latente para resfriar o corpo.',
    ['Por que um queimado por vapor d\'água sofre lesões mais graves do que um queimado por água quente à mesma temperatura?', 'Como os refrigeradores domésticos brasileiros usam o calor latente de vaporização para gelar os alimentos?']),

  createLesson('g2-fis-b2-l9', 'L9: Dilatação Térmica Linear', 'fisica',
    'A maioria dos materiais se expande quando aquecida. A dilatação linear é: ΔL = L₀·α·ΔT, onde α é o coeficiente de dilatação linear (característico de cada material). Pontes, trilhos de trem e tubulações precisam de juntas de dilatação para não se danificarem com a variação de temperatura. No Brasil, as variações de temperatura entre inverno e verão tornam essas juntas essenciais.',
    ['Por que trilhos de trens e linhas de metrô nas cidades brasileiras precisam ter espaços entre os segmentos?', 'Como engenheiros calculam o tamanho das juntas de dilatação em uma ponte metálica?']),

  createLesson('g2-fis-b2-l10', 'L10: Dilatação Superficial e Volumétrica', 'fisica',
    'A dilatação superficial (ΔA = A₀·β·ΔT, onde β ≈ 2α) e volumétrica (ΔV = V₀·γ·ΔT, onde γ ≈ 3α) são extensões da dilatação linear para duas e três dimensões. Um caso especial é a água: ela se contrai ao ser aquecida de 0°C a 4°C (densidade máxima a 4°C), o que permite a sobrevivência da vida aquática no inverno em países frios.',
    ['Por que potes de vidro podem rachar se colocados rapidamente de temperatura muito quente para muito fria?', 'Como o fenômeno da densidade máxima da água a 4°C é fundamental para os ecossistemas aquáticos?']),

  createLesson('g2-fis-b2-l11', 'L11: Gases Ideais — Lei de Boyle', 'fisica',
    'A Lei de Boyle (p·V = constante, a T constante) descreve um processo isotérmico: quando se comprime um gás a temperatura constante, sua pressão aumenta proporcionalmente. Seringas, mergulho subaquático e a compressão de gases em cilindros industriais são aplicações diretas. Com o pulmão cheio, um mergulhador que sobe rapidamente pode sofrer lesões graves.',
    ['Por que um mergulhador não deve prender a respiração ao subir rapidamente à superfície?', 'Como a Lei de Boyle é aplicada no projeto de compressores de ar usados em postos de gasolina brasileiros?']),

  createLesson('g2-fis-b2-l12', 'L12: Gases Ideais — Lei de Charles e Gay-Lussac', 'fisica',
    'A Lei de Charles (V/T = constante, a p constante) descreve processos isobáricos: o volume de um gás é proporcional à temperatura absoluta. A Lei de Gay-Lussac (p/T = constante, a V constante) descreve processos isocóricos: a pressão é proporcional à temperatura. Balonismo, termômetros a gás e autoclaves (esterilização hospitalar) são aplicações.',
    ['Por que balões de hélio murcham quando expostos ao frio? Use a Lei de Charles para explicar.', 'Como autoclaves hospitalares usam a Lei de Gay-Lussac para garantir a esterilização de instrumentos?']),

  createLesson('g2-fis-b2-l13', 'L13: Equação Geral dos Gases e Equação de Estado', 'fisica',
    'A Equação Geral dos Gases (p₁V₁/T₁ = p₂V₂/T₂) unifica as leis de Boyle, Charles e Gay-Lussac. A Equação de Estado do Gás Ideal (pV = nRT, onde R = 8,31 J/mol·K) relaciona pressão, volume, número de moles e temperatura. Essas equações são usadas no projeto de motores a combustão, turbinas e sistemas de refrigeração.',
    ['Como a equação de estado dos gases ideais é aplicada no cálculo da quantidade de gás em um botijão de GLP?', 'Por que a escala Kelvin é obrigatória nas leis dos gases?']),

  createLesson('g2-fis-b2-l14', 'L14: Umidade do Ar e Psicrometria', 'fisica',
    'A umidade relativa do ar indica a fração do vapor de água presente em relação ao máximo que o ar poderia conter na mesma temperatura (ponto de saturação). No Brasil, a umidade baixa no cerrado (pode cair a 15% no inverno seco) causa problemas respiratórios; na Amazônia, pode ultrapassar 90%. A psicrometria é a ciência que estuda as propriedades termodinâmicas do ar úmido.',
    ['Por que a sensação térmica no calor seco do cerrado é diferente do calor úmido do litoral, mesmo na mesma temperatura?', 'Como a umidade do ar influencia a formação de incêndios florestais no Cerrado durante o inverno?']),

  createLesson('g2-fis-b2-l15', 'L15: Teoria Cinética dos Gases', 'fisica',
    'A Teoria Cinética explica as propriedades macroscópicas dos gases (pressão, temperatura) a partir do comportamento microscópico das moléculas. A temperatura é proporcional à energia cinética média das moléculas: Ec = (3/2)kT. A pressão resulta dos choques moleculares com as paredes. Essa teoria conecta a Física macroscópica com o mundo atômico e molecular.',
    ['Como a Teoria Cinética explica por que a pressão de um gás aumenta quando aquecido em volume constante?', 'Qual a relação entre temperatura e velocidade média das moléculas de um gás?']),

  createLesson('g2-fis-b2-l16', 'L16: Fenômenos Atmosféricos — Física do Clima Brasileiro', 'fisica',
    'A atmosfera brasileira é profundamente influenciada por efeitos termodinâmicos: convecção na Amazônia (a maior floresta tropical do mundo) gera chuvas. A ZCIT (Zona de Convergência Intertropical) e os vendavais do Sul envolvem transferência de calor em larga escala. O fenômeno ENSO (El Niño/La Niña) afeta as chuvas em todo o Brasil.',
    ['Como a convecção térmica na Amazônia gera a "chuva volante" que abastece rios e aquíferos brasileiros?', 'Como o El Niño afeta as chuvas e as safras agrícolas no Brasil?']),

  createLesson('g2-fis-b2-l17', 'L17: Revisão — Termologia e Calorimetria', 'fisica',
    'Revisamos temperatura, escalas termométricas, calor, mecanismos de transferência, calorimetria, mudanças de estado, dilatação térmica e leis dos gases. A termologia é base para a termodinâmica (próximo bimestre) e está presente em questões de ENEM sobre energia, meio ambiente, saúde e tecnologia.',
    ['Como os conceitos de termologia se conectam com os desafios das mudanças climáticas globais?', 'Qual tema de termologia você considera mais relevante para sua saúde e qualidade de vida?']),

  createLesson('g2-fis-b2-l18', 'L18: Prática — Determinação do Calor Específico da Água', 'fisica',
    'Nesta prática, os alunos usam um calorímetro simples (copo de isopor) para determinar o calor específico da água aquecendo-a com resistência elétrica e medindo energia elétrica consumida (P·Δt = Q) e variação de temperatura. Comparando com o valor tabelado (4.186 J/kg·°C), avaliam as perdas de calor para o ambiente.',
    ['Como o isolamento térmico do calorímetro afeta a precisão da medição?', 'Que conexões existem entre este experimento e o funcionamento de chuveiros elétricos brasileiros?']),
];

export const fisLessonsB3: Lesson[] = [
  createLesson('g2-fis-b3-l1', 'L1: Termodinâmica — Introdução e Sistemas', 'fisica',
    'A Termodinâmica estuda as relações entre calor, trabalho e energia interna de sistemas. Um sistema termodinâmico pode ser aberto (troca matéria e energia), fechado (só energia) ou isolado. A energia interna (U) é a soma de todas as energias cinéticas e potenciais microscópicas das partículas. Motores, geladeiras e usinas termelétricas são sistemas termodinâmicos reais.',
    ['Qual a diferença entre um sistema termodinâmico aberto, fechado e isolado? Dê exemplos do cotidiano.', 'Por que a Termodinâmica é fundamental para entender a crise energética global?']),

  createLesson('g2-fis-b3-l2', 'L2: Primeira Lei da Termodinâmica', 'fisica',
    'A Primeira Lei (ΔU = Q − W) afirma que a variação de energia interna de um sistema é igual ao calor absorvido menos o trabalho realizado pelo sistema. É a lei de conservação de energia aplicada a sistemas termodinâmicos. Em um processo adiabático (Q = 0), todo o trabalho vem da energia interna. Motores de combustão transformam calor em trabalho mecânico.',
    ['Como a Primeira Lei da Termodinâmica proíbe a existência de "máquinas de movimento perpétuo"?', 'Como um motor a diesel de caminhão brasileiro transforma o calor da combustão em trabalho útil?']),

  createLesson('g2-fis-b3-l3', 'L3: Processos Termodinâmicos', 'fisica',
    'Os quatro processos básicos são: isotérmico (ΔT = 0, ΔU = 0), isobárico (Δp = 0), isocórico ou isovolumérico (ΔV = 0, W = 0) e adiabático (Q = 0). No diagrama p×V, o trabalho é representado pela área sob a curva. Entender esses processos é essencial para analisar o ciclo de qualquer motor térmico.',
    ['Em qual processo termodinâmico toda a energia fornecida como calor se converte em trabalho?', 'Por que o trabalho realizado em um processo isobárico é mais fácil de calcular do que em um adiabático?']),

  createLesson('g2-fis-b3-l4', 'L4: Segunda Lei da Termodinâmica', 'fisica',
    'A Segunda Lei afirma que calor não flui espontaneamente de um corpo frio para um quente (enunciado de Clausius). Equivalentemente, é impossível converter completamente calor em trabalho em um processo cíclico (enunciado de Kelvin-Planck). Isso significa que nenhum motor real pode ser 100% eficiente. A Segunda Lei direciona os processos naturais.',
    ['Por que o calor de uma xícara de café nunca se transfere espontaneamente para o ambiente mais quente?', 'Como a Segunda Lei explica por que não podemos usar o calor do oceano para mover navios sem consumir energia externa?']),

  createLesson('g2-fis-b3-l5', 'L5: Entropia', 'fisica',
    'A entropia (S) é uma medida da desordem ou do número de microestados compatíveis com o estado macroscópico de um sistema. A Segunda Lei diz que a entropia de um sistema isolado nunca diminui (ΔS ≥ 0). Processos naturais (difusão, mistura, expansão de gás) aumentam a entropia. O universo caminha para estados de maior desordem — conceito filosófico e científico profundo.',
    ['Como a entropia explica por que ovos cozidos não se "descozinham" espontaneamente?', 'Qual a relação entre entropia e a degradação ambiental causada pela atividade industrial?']),

  createLesson('g2-fis-b3-l6', 'L6: Ciclo de Carnot e Eficiência Máxima', 'fisica',
    'O Ciclo de Carnot é o ciclo reversível mais eficiente possível operando entre duas temperaturas. Sua eficiência é η = 1 − T_fria/T_quente (em Kelvin). Nenhum motor real pode superar a eficiência de Carnot. Para aumentar a eficiência, deve-se aumentar T_quente ou diminuir T_fria — guia para engenheiros de turbinas de usinas termelétricas brasileiras.',
    ['Por que aumentar a temperatura de operação de uma usina termelétrica aumenta sua eficiência?', 'Se uma máquina opera entre 500 K e 300 K, qual sua eficiência máxima de Carnot?']),

  createLesson('g2-fis-b3-l7', 'L7: Máquinas Térmicas e Motores a Combustão', 'fisica',
    'Máquinas térmicas convertem calor (Q_quente) em trabalho (W) e rejeitam parte como calor (Q_fria): W = Q_q − Q_f. O ciclo Otto (base dos motores a gasolina e flex do Brasil) e o ciclo Diesel (motores de caminhões e tratores) são os mais relevantes no país. O Brasil tem uma frota de mais de 50 milhões de veículos com motores térmicos.',
    ['Como o motor flex de carros brasileiros (gasolina/etanol) funciona termodinamicamente?', 'Por que motores a diesel têm maior eficiência que motores a gasolina, apesar de usarem combustível mais pesado?']),

  createLesson('g2-fis-b3-l8', 'L8: Refrigeradores e Bombas de Calor', 'fisica',
    'Refrigeradores e ar-condicionados são máquinas térmicas reversas: consomem trabalho para transferir calor do ambiente frio (interior) para o ambiente quente (exterior). O coeficiente de performance (COP) mede a eficiência. Bombas de calor fazem o oposto: aquecem ambientes internos usando calor externo. No Brasil, ar-condicionados consomem ~20% da energia elétrica residencial.',
    ['Como um ar-condicionado retira calor do interior de um quarto e o joga para fora, violando a aparente intuição?', 'Por que os ar-condicionados inverter (com compressor de velocidade variável) são mais econômicos?']),

  createLesson('g2-fis-b3-l9', 'L9: Óptica Geométrica — Fundamentos', 'fisica',
    'A Óptica Geométrica estuda a propagação da luz quando seu comprimento de onda é muito menor que os obstáculos, permitindo tratar a luz como raios retos. Os três princípios são: propagação retilínea, reversibilidade dos raios e independência dos raios. Sombras, penumbras e eclipses são consequências da propagação retilínea da luz.',
    ['Por que a sombra formada por uma lâmpada fluorescente (extensa) tem bordas difusas, enquanto a de um laser tem bordas nítidas?', 'Como os eclipses lunares e solares comprovam a propagação retilínea da luz?']),

  createLesson('g2-fis-b3-l10', 'L10: Reflexão da Luz — Espelhos Planos', 'fisica',
    'Na reflexão, o ângulo de incidência é igual ao ângulo de reflexão (1ª lei), e os raios incidente, refletido e a normal são coplanares (2ª lei). Em espelhos planos, a imagem é virtual, direita, do mesmo tamanho do objeto e simétricamente oposta à superfície. Dois espelhos paralelos criam infinitas imagens — espelhos de salão de beleza e camarins.',
    ['Por que a imagem em um espelho plano parece estar "atrás" do espelho?', 'Como o ângulo entre dois espelhos afeta o número de imagens formadas?']),

  createLesson('g2-fis-b3-l11', 'L11: Espelhos Esféricos — Côncavos e Convexos', 'fisica',
    'Espelhos côncavos convergem raios paralelos para o foco (F = R/2) e podem formar imagens reais ou virtuais, dependendo da posição do objeto. Espelhos convexos divergem raios e sempre formam imagens virtuais, menores e mais próximas — usados nos retrovisores de veículos para ampliar o campo de visão. A equação de Gauss (1/f = 1/p + 1/p\') e o aumento (A = p\'/p) descrevem a formação de imagens.',
    ['Por que retrovisores de carros usam espelhos convexos e não planos?', 'Como telescópios refletores como o de Herschel usam espelhos côncavos para observar estrelas distantes?']),

  createLesson('g2-fis-b3-l12', 'L12: Refração da Luz', 'fisica',
    'A refração ocorre quando a luz passa de um meio para outro, mudando de velocidade e, geralmente, de direção. A Lei de Snell-Descartes: n₁·sen θ₁ = n₂·sen θ₂. O índice de refração n = c/v indica quanto a luz desacelera no meio. Água tem n ≈ 1,33; vidro, n ≈ 1,5; diamante, n ≈ 2,4. A refração explica a aparência dobrada de um lápis na água.',
    ['Por que um copo de água faz um lápis parecer dobrado?', 'Como o índice de refração do diamante explica seu brilho excepcional?']),

  createLesson('g2-fis-b3-l13', 'L13: Reflexão Total Interna e Fibras Ópticas', 'fisica',
    'Quando a luz passa de um meio mais denso para um menos denso, acima do ângulo crítico, ocorre reflexão total interna (não há raio refratado). As fibras ópticas usam esse fenômeno para transmitir luz por quilômetros sem perda significativa. O Brasil usa fibras ópticas na internet de alta velocidade e no sistema de comunicação da Petrobras em plataformas offshore.',
    ['Como as fibras ópticas da internet usam a reflexão total interna para transmitir dados a alta velocidade?', 'Qual a relação entre o ângulo crítico e o índice de refração de uma fibra óptica?']),

  createLesson('g2-fis-b3-l14', 'L14: Lentes Delgadas — Convergentes e Divergentes', 'fisica',
    'Lentes convergentes (biconvexas) refratam a luz convergindo-a para o foco real; lentes divergentes (bicôncavas) divergem a luz, formando foco virtual. A equação de Gauss e o aumento linear se aplicam a lentes. A potência de uma lente (Pd = 1/f) é medida em dioptrias (D). Óculos, câmeras, microscópios e telescópios usam lentes.',
    ['Por que óculos para míopes usam lentes divergentes e óculos para hipermétropes usam lentes convergentes?', 'Como a indústria óptica brasileira usa a Física das lentes para fabricar óculos de alta precisão?']),

  createLesson('g2-fis-b3-l15', 'L15: O Olho Humano e Defeitos de Visão', 'fisica',
    'O olho humano funciona como uma câmera com lente convergente ajustável (cristalino) que foca a imagem na retina. A miopia (imagem forma antes da retina — olho longo) é corrigida com lentes divergentes. A hipermetropia (imagem forma após a retina — olho curto) é corrigida com lentes convergentes. O astigmatismo é causado por irregularidade na curvatura da córnea.',
    ['Como o processo de acomodação do olho permite ver objetos em diferentes distâncias?', 'Por que o uso excessivo de telas (smartphones, computadores) pode contribuir para o aumento da miopia entre jovens brasileiros?']),

  createLesson('g2-fis-b3-l16', 'L16: Instrumentos Ópticos — Microscópio e Telescópio', 'fisica',
    'O microscópio óptico usa duas lentes convergentes (objetiva e ocular) para ampliar objetos microscópicos — fundamental em laboratórios de saúde pública e pesquisa no Brasil. O telescópio refrator usa duas lentes para ampliar objetos distantes; o refletor usa espelhos. O Observatório Nacional (Rio de Janeiro) opera telescópios para pesquisa astronômica brasileira.',
    ['Como a combinação de duas lentes no microscópio permite ampliar objetos minúsculos?', 'Por que telescópios espaciais como o Hubble forneceram imagens melhores do que os terrestres?']),

  createLesson('g2-fis-b3-l17', 'L17: Revisão — Termodinâmica e Óptica Geométrica', 'fisica',
    'Revisamos as Leis da Termodinâmica, ciclos termodinâmicos, eficiência de máquinas térmicas, propagação da luz, reflexão, refração, lentes e espelhos. Esses conteúdos aparecem frequentemente no ENEM integrados a temas de tecnologia, saúde e meio ambiente.',
    ['Como a termodinâmica e a óptica se conectam na tecnologia de painéis solares fotovoltaicos?', 'Qual tema deste bimestre você considera mais relevante para os desafios tecnológicos do Brasil?']),

  createLesson('g2-fis-b3-l18', 'L18: Prática — Experimentos de Reflexão e Refração', 'fisica',
    'Nesta prática, os alunos verificam as leis da reflexão com espelho plano e ângulos medidos com transferidor, e observam a refração ao imergir um lápis em água e medir ângulos com laser de apontador. A determinação experimental do índice de refração da água conecta teoria e prática de forma concreta.',
    ['Como você determinaria experimentalmente o índice de refração de um líquido desconhecido usando um laser e um transportador?', 'Que aplicações tecnológicas dependem do controle preciso da refração da luz?']),
];

export const fisLessonsB4: Lesson[] = [
  createLesson('g2-fis-b4-l1', 'L1: Ondas — Conceito e Classificação', 'fisica',
    'Uma onda é uma perturbação que se propaga pelo espaço (ou em um meio material), transportando energia sem transportar matéria. Ondas mecânicas precisam de meio material (som, ondas no mar); ondas eletromagnéticas não (luz, rádio, micro-ondas). Quanto à vibração, são transversais (vibração perpendicular ao movimento) ou longitudinais (vibração paralela).',
    ['Qual a diferença entre ondas transversais e longitudinais? Qual tipo é o som?', 'Por que ondas eletromagnéticas conseguem se propagar no vácuo do espaço, mas o som não?']),

  createLesson('g2-fis-b4-l2', 'L2: Características das Ondas', 'fisica',
    'As grandezas que caracterizam uma onda são: comprimento de onda (λ), frequência (f), período (T = 1/f), amplitude e velocidade de propagação (v = λ·f). A frequência depende da fonte e não muda ao passar de um meio para outro; o comprimento de onda muda com a velocidade. Rádios AM (ondas longas) e FM (ondas curtas) diferem principalmente em frequência.',
    ['Por que rádios AM alcançam distâncias maiores que rádios FM, mesmo com menos potência?', 'O que determina a "cor" de uma onda de luz: sua frequência ou seu comprimento de onda?']),

  createLesson('g2-fis-b4-l3', 'L3: Princípio da Superposição e Interferência', 'fisica',
    'Quando duas ondas se encontram, seus deslocamentos se somam (Princípio da Superposição). A interferência pode ser construtiva (amplitudes se somam, quando em fase) ou destrutiva (se cancelam, quando fora de fase). Fones de ouvido com cancelamento de ruído (muito usados no Brasil) usam interferência destrutiva para cancelar sons ambientes.',
    ['Como fones de ouvido com cancelamento de ruído ativo usam a interferência destrutiva?', 'O que acontece quando duas ondas idênticas se encontram perfeitamente em fase ou perfeitamente em oposição de fase?']),

  createLesson('g2-fis-b4-l4', 'L4: Reflexão e Refração de Ondas', 'fisica',
    'Ondas refletem quando encontram uma barreira (obedecendo à lei de reflexão) e refratam quando mudam de meio (mudando velocidade e comprimento de onda, mas não frequência). Sonares de navios e barcos de pesca no Brasil usam a reflexão de ondas sonoras no fundo do mar para mapeá-lo. Terremotos são detectados pela refração de ondas sísmicas no interior da Terra.',
    ['Como o sonar usado por barcos pesqueiros brasileiros usa a reflexão de ondas para localizar cardumes?', 'Como geofísicos estudam o interior da Terra usando a refração de ondas sísmicas?']),

  createLesson('g2-fis-b4-l5', 'L5: Difração e Interferência de Ondas', 'fisica',
    'A difração é o espalhamento de ondas ao contornar obstáculos ou passar por aberturas, sendo mais pronunciada quando λ ≈ tamanho do obstáculo. É por isso que o som (λ de cm a metros) dobra cantos de paredes, mas a luz (λ de nanômetros) propaga-se em linha reta. Redes de difração são usadas em espectroscópios para decompor luz.',
    ['Por que você consegue ouvir uma pessoa que está atrás de uma parede, mas não pode vê-la?', 'Como a difração limita a resolução de microscópios ópticos?']),

  createLesson('g2-fis-b4-l6', 'L6: Ondas Estacionárias', 'fisica',
    'Ondas estacionárias formam-se pela superposição de duas ondas de mesma frequência propagando-se em sentidos opostos. Possuem nós (pontos de amplitude zero) e ventres (amplitude máxima). São fundamentais na acústica de instrumentos musicais: violões e violas da música sertaneja e regional brasileira produzem sons por ondas estacionárias em cordas e na caixa acústica.',
    ['Como os harmônicos de uma corda de violão determinam o timbre do instrumento?', 'Por que um tubo aberto e um tubo fechado produzem ondas estacionárias com frequências diferentes?']),

  createLesson('g2-fis-b4-l7', 'L7: Som — Características e Velocidade', 'fisica',
    'O som é uma onda mecânica longitudinal que se propaga em meios elásticos (gases, líquidos e sólidos). A velocidade do som no ar a 20°C é ≈343 m/s, aumentando com a temperatura. No aço, é ≈5.100 m/s. As características do som são: intensidade (loudness), altura (frequência — grave/agudo) e timbre (forma da onda). A faixa audível humana é 20 Hz a 20 kHz.',
    ['Por que o trovão é ouvido depois do relâmpago visto, apesar de ocorrerem simultaneamente?', 'Como a velocidade do som varia com a temperatura do ar? Por que isso importa para músicos ao ar livre?']),

  createLesson('g2-fis-b4-l8', 'L8: Intensidade Sonora e Decibéis', 'fisica',
    'A intensidade sonora (I = P/A, W/m²) diminui com o quadrado da distância da fonte (lei do inverso do quadrado). A escala logarítmica de decibéis (dB) reflete a percepção humana: 0 dB é o limiar da audição; 60 dB é conversa normal; 120 dB é o limiar da dor. A poluição sonora nas metrópoles brasileiras (São Paulo, Rio) causa problemas de saúde.',
    ['Por que dobrar a distância de uma fonte sonora reduz a intensidade para um quarto?', 'Como os limites de decibéis estabelecidos pela ABNT protegem trabalhadores em ambientes industriais no Brasil?']),

  createLesson('g2-fis-b4-l9', 'L9: Efeito Doppler', 'fisica',
    'O Efeito Doppler é a mudança na frequência percebida de uma onda quando fonte ou observador estão em movimento relativo. Fonte se aproximando: frequência aumenta (som mais agudo). Fonte se afastando: frequência diminui (mais grave). Radares de velocidade nas rodovias brasileiras, ultrassom doppler em medicina cardíaca e astronomia (redshift de galáxias) usam esse efeito.',
    ['Por que a sirene de uma ambulância soa mais aguda quando se aproxima e mais grave quando se afasta?', 'Como os radares de velocidade das rodovias brasileiras usam o Efeito Doppler para medir a velocidade dos veículos?']),

  createLesson('g2-fis-b4-l10', 'L10: Acústica — Ressonância e Eco', 'fisica',
    'A ressonância ocorre quando um sistema é excitado na sua frequência natural, resultando em amplificação da vibração. O eco é a reflexão do som em uma superfície distante (>17 m para que seja distinto do original). A reverberação é o eco em espaços fechados. Engenheiros acústicos projetam teatros e auditórios brasileiros (como o Teatro Nacional de Brasília) usando esses princípios.',
    ['Como o fenômeno da ressonância pode destruir uma ponte ou um copo de cristal?', 'Como arquitetos acústicos usam a Física das ondas para projetar auditórios com boa reverberação?']),

  createLesson('g2-fis-b4-l11', 'L11: Ultrassom e Infrassom', 'fisica',
    'Ultrassom (f > 20 kHz) é inaudível para humanos, mas usado em diagnóstico médico (ecografia), limpeza de peças industriais, sonar e controle de pragas. Infrassom (f < 20 Hz) é gerado por terremotos, vulcões e elefantes em comunicação. No Brasil, o Sistema de Vigilância Sísmica (SIS-SB) usa infrassom e ondas sísmicas para monitorar o território.',
    ['Como o ultrassom é usado em exames de pré-natal para visualizar o feto sem riscos de radiação?', 'Por que infrassom de usinas hidrelétricas pode afetar comunidades vizinhas sem que elas percebam a causa?']),

  createLesson('g2-fis-b4-l12', 'L12: Espectro Eletromagnético', 'fisica',
    'As ondas eletromagnéticas formam um espectro contínuo ordenado por frequência/comprimento de onda: ondas de rádio (comunicação), micro-ondas (forno, Wi-Fi), infravermelho (calor, controle remoto), luz visível (400–700 nm), ultravioleta (bronzeamento, esterilização), raios X (diagnóstico) e raios gama (tratamento de câncer). Todas se propagam no vácuo a c = 3×10⁸ m/s.',
    ['Por que raios X atravessam tecidos moles mas são absorvidos por ossos, permitindo diagnóstico por imagem?', 'Como os satélites de sensoriamento remoto brasileiros como o AMAZONIA-1 usam diferentes faixas do espectro para monitorar a floresta?']),

  createLesson('g2-fis-b4-l13', 'L13: Luz Visível — Cor e Dispersão', 'fisica',
    'A luz branca é uma mistura de todas as cores do espectro visível (vermelho a violeta). A dispersão ocorre quando diferentes frequências refratam com ângulos diferentes ao passar por um prisma ou gotas de chuva — formando o arco-íris. As cores primárias da luz (RGB) diferem das da pintura (CMYK). Isso é essencial em fotografia, cinema e design gráfico.',
    ['Por que um arco-íris sempre aparece do lado oposto ao sol?', 'Como o olho humano e as telas de celular usam as três cores primárias da luz para reproduzir qualquer cor?']),

  createLesson('g2-fis-b4-l14', 'L14: Polarização da Luz', 'fisica',
    'A luz natural é não polarizada (vibra em todas as direções perpendiculares à propagação). Filtros polarizadores permitem apenas luz vibrando em uma direção. Lentes polarizadas de óculos de sol reduzem o reflexo de superfícies horizontais (estradas, água). Telas LCD de smartphones e TVs usam polarizadores. A polarização prova que a luz é uma onda transversal.',
    ['Como óculos polarizados reduzem o ofuscamento em estradas molhadas?', 'Por que é impossível polarizar ondas sonoras?']),

  createLesson('g2-fis-b4-l15', 'L15: Aplicações Tecnológicas de Ondas', 'fisica',
    'O cotidiano moderno é repleto de aplicações de ondas: Wi-Fi e 5G (micro-ondas), GPS (ondas de rádio), sensores de movimento (infravermelho), ultrassom médico, tomografia por raios X, ressonância magnética (ondas de rádio + campo magnético), laser (luz coerente). O Brasil avança na implementação do 5G nas principais cidades desde 2022.',
    ['Como o sistema 5G instalado no Brasil usa ondas eletromagnéticas de frequências mais altas para transmitir mais dados?', 'Quais tipos de ondas do espectro eletromagnético são usados em um hospital moderno?']),

  createLesson('g2-fis-b4-l16', 'L16: Sismologia e Tsunamis', 'fisica',
    'Terremotos geram ondas sísmicas (P — longitudinais, e S — transversais) que se propagam pelo interior da Terra. Tsunamis são ondas oceânicas geradas por terremotos submarinos, com comprimentos de onda de centenas de km e alturas de até 30 m ao chegar à costa. O Sistema de Alerta a Tsunamis no Oceano Atlântico protege o litoral brasileiro.',
    ['Por que tsunamis se propagam em alto mar com pequena altura, mas crescem drasticamente ao se aproximar da costa?', 'Como a análise de ondas sísmicas permitiu descobrir que o núcleo interno da Terra é sólido?']),

  createLesson('g2-fis-b4-l17', 'L17: Revisão — Ondas, Som e Espectro Eletromagnético', 'fisica',
    'Revisamos os conceitos de ondas mecânicas e eletromagnéticas, fenômenos ondulatórios (reflexão, refração, difração, interferência), som, Efeito Doppler, e espectro eletromagnético. Esses temas são amplamente cobrados no ENEM integrados a contextos de tecnologia, saúde, comunicação e meio ambiente.',
    ['Como os fenômenos ondulatórios estão presentes nas principais tecnologias de comunicação que você usa diariamente?', 'Qual aplicação tecnológica das ondas estudada neste bimestre você considera mais relevante para o Brasil?']),

  createLesson('g2-fis-b4-l18', 'L18: Prática — Experimentos com Ondas Sonoras', 'fisica',
    'Nesta prática, os alunos usam um aplicativo de frequencímetro no celular (como o Spectroid) para visualizar ondas sonoras, medir frequências de instrumentos musicais e verificar o Efeito Doppler movendo o celular em relação a uma fonte sonora. Experimentos com tecnologia acessível tornam a Física mais concreta e envolvente.',
    ['Como aplicativos de análise de frequência no celular podem ser usados para afinar instrumentos musicais?', 'Que limitações existem no uso do celular como instrumento de medição em comparação com equipamentos profissionais?']),
];
