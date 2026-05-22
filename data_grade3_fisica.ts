import { Lesson } from './types';
import { createLesson } from './data_helpers';

// Física 3ª Série: 18 aulas por bimestre (Total 72)

export const fisLessonsB1: Lesson[] = [
  createLesson('g3-fis-b1-l1', 'L1: Eletrostática — Carga Elétrica e Estrutura Atômica', 'fisica',
    'A matéria é composta de átomos com prótons (carga positiva, +e), elétrons (carga negativa, −e) e nêutrons (neutros). A carga elementar é e = 1,6×10⁻¹⁹ C. Um corpo é eletricamente neutro quando tem igual número de prótons e elétrons; fica carregado ao ganhar ou perder elétrons. A carga é sempre múltipla de e — é quantizada.',
    ['Por que ao esfregar um pente no cabelo ele passa a atrair pedaços de papel?', 'Qual a diferença entre um corpo eletrizado por atrito e um eletrizado por contato?']),

  createLesson('g3-fis-b1-l2', 'L2: Processos de Eletrização', 'fisica',
    'A eletrização pode ocorrer por: atrito (transferência de elétrons entre materiais diferentes), contato (transferência de carga de um corpo eletrizado para um neutro) e indução (redistribuição de cargas sem contato, usando-se o aterramento). No processo de indução, o corpo final fica com carga oposta à do corpo indutor. Para-raios usam o princípio de indução e aterramento.',
    ['Como o para-raios brasileiro protege edifícios do impacto dos raios, usando princípios de indução e aterramento?', 'Por que ao eletrizar por contato, o corpo eletrizado fica com a mesma carga do agente, enquanto na indução fica com carga contrária?']),

  createLesson('g3-fis-b1-l3', 'L3: Lei de Coulomb', 'fisica',
    'A Lei de Coulomb descreve a força entre duas cargas puntiformes: F = k·|q₁|·|q₂|/r², onde k = 9×10⁹ N·m²/C² (constante eletrostática no vácuo). Cargas iguais se repelem; opostas se atraem. A força é proporcional às cargas e inversamente proporcional ao quadrado da distância — mesma estrutura da lei gravitacional de Newton.',
    ['Quais as semelhanças e diferenças entre a Lei de Coulomb e a Lei da Gravitação Universal?', 'Por que a força elétrica entre dois prótons no núcleo atômico é muito maior que a força gravitacional entre eles?']),

  createLesson('g3-fis-b1-l4', 'L4: Campo Elétrico', 'fisica',
    'O campo elétrico (E = F/q) é uma grandeza vetorial que descreve a influência elétrica de cargas no espaço ao redor delas. O campo de uma carga puntiforme é E = k·Q/r², radial, afastando-se das positivas e convergindo para as negativas. Linhas de campo visualizam a distribuição: mais densas onde o campo é mais intenso. Capacitores e aparelhos médicos (como desfibriladores) exploram campos elétricos.',
    ['Como as linhas de campo elétrico se relacionam com a força que uma carga de teste sofreria em cada ponto?', 'Por que raios sempre atingem os pontos mais altos (como árvores e torres) durante tempestades?']),

  createLesson('g3-fis-b1-l5', 'L5: Campo Elétrico — Configurações Especiais', 'fisica',
    'Algumas configurações têm campos com propriedades especiais: entre placas paralelas carregadas, o campo é uniforme (E = σ/ε₀); dentro de um condutor em equilíbrio eletrostático, o campo é nulo; em uma gaiola de Faraday, os campos externos são bloqueados. Micro-ondas, blindagem de cabos elétricos e instrumentos científicos sensíveis usam esse princípio.',
    ['Como a Gaiola de Faraday protege equipamentos eletrônicos sensíveis de campos elétricos externos?', 'Por que o interior de um avião é relativamente seguro durante uma tempestade elétrica?']),

  createLesson('g3-fis-b1-l6', 'L6: Potencial Elétrico e Diferença de Potencial', 'fisica',
    'O potencial elétrico (V = k·Q/r) é a energia potencial elétrica por unidade de carga em um ponto do campo. A diferença de potencial (ddp ou tensão: U = Va − Vb) é o trabalho por unidade de carga para mover uma carga entre dois pontos. A tomada elétrica de 127V ou 220V no Brasil indica a ddp entre os terminais. O Joule (J = C·V).',
    ['Por que a tensão elétrica nas tomadas residenciais brasileiras é de 127V em algumas cidades e 220V em outras?', 'Como a diferença de potencial elétrico entre nuvens e a Terra gera os raios durante tempestades?']),

  createLesson('g3-fis-b1-l7', 'L7: Superfícies Equipotenciais', 'fisica',
    'Superfícies equipotenciais são conjuntos de pontos com o mesmo potencial elétrico — como curvas de nível em mapas topográficos. O campo elétrico é sempre perpendicular às superfícies equipotenciais. Para mover uma carga ao longo de uma equipotencial, não há trabalho realizado pelo campo. Esse conceito é essencial para entender capacitores e circuitos elétricos.',
    ['Por que é seguro permanecer dentro de um carro durante uma tempestade elétrica?', 'Como o conceito de equipotencial é aplicado na proteção de instalações elétricas em prédios?']),

  createLesson('g3-fis-b1-l8', 'L8: Capacitores e Capacitância', 'fisica',
    'Um capacitor é formado por dois condutores separados por um isolante (dielétrico). A capacitância (C = Q/U, em Farads) mede a capacidade de armazenar carga. A energia armazenada é E = ½·C·V². Capacitores são usados em fontes de alimentação, câmeras fotográficas (flash), desfibriladores cardíacos e filtros em circuitos eletrônicos de celulares e computadores.',
    ['Como o flash de uma câmera fotográfica usa a energia armazenada em um capacitor para produzir luz intensa?', 'Como desfibriladores cardíacos usados em hospitais brasileiros usam a descarga de capacitores para restaurar o ritmo cardíaco?']),

  createLesson('g3-fis-b1-l9', 'L9: Capacitores em Série e Paralelo', 'fisica',
    'Capacitores em série têm a mesma carga e a capacitância equivalente é menor: 1/Ceq = 1/C₁ + 1/C₂. Em paralelo, têm a mesma ddp e a capacitância equivalente é maior: Ceq = C₁ + C₂. A associação de capacitores permite ajustar capacitância e tensão máxima suportada. Fontes de computadores, rádios e amplificadores de som usam essas associações.',
    ['Por que capacitores em paralelo têm capacitância maior do que os mesmos capacitores em série?', 'Como a associação de capacitores em fontes de computador garante a estabilidade da tensão fornecida aos componentes?']),

  createLesson('g3-fis-b1-l10', 'L10: Efeitos Biológicos da Eletrostática', 'fisica',
    'Campos elétricos estáticos e cargas elétricas interagem com organismos vivos. Raios podem causar parada cardíaca (por isso desfibriladores atuam com pulso elétrico). Eletrostática é usada em pintura eletrostática de carros (inclusive no Brasil, em montadoras como GM e Fiat), filtros eletrostáticos de ar (poluição urbana) e tratamento de água.',
    ['Como os precipitadores eletrostáticos usados em chaminés de usinas e fábricas brasileiras removem partículas poluentes do ar?', 'Por que células biológicas possuem diferença de potencial em sua membrana e como isso é essencial para a vida?']),

  createLesson('g3-fis-b1-l11', 'L11: Distribuição de Cargas em Condutores', 'fisica',
    'Em equilíbrio eletrostático, as cargas livres de um condutor se distribuem na superfície. O campo interno é nulo. A densidade superficial de carga é maior em pontos de maior curvatura (pontas). Por isso para-raios têm ponta aguçada — concentra carga e maximiza o campo elétrico local, facilitando a descarga para a atmosfera.',
    ['Por que uma carga colocada no interior de um condutor oco migra para a superfície externa?', 'Como o princípio de concentração de carga nas pontas dos para-raios previne acidentes causados por raios no Brasil?']),

  createLesson('g3-fis-b1-l12', 'L12: Energia Potencial Elétrica e Trabalho do Campo', 'fisica',
    'O trabalho realizado pelo campo elétrico ao mover uma carga q de A a B é τ = q·(Va − Vb). Se o campo realiza trabalho positivo, a carga se move de maior para menor potencial (cargas positivas) ou de menor para maior potencial (cargas negativas). A energia potencial elétrica é Ep = q·V. A conservação de energia inclui a energia potencial elétrica.',
    ['Como a diferença de potencial e a carga de um elétron determinam a energia com que ele é acelerado em um tubo de raios catódicos?', 'Por que raios fotovoltaicos em painéis solares são acelerados pelo campo elétrico interno da célula?']),

  createLesson('g3-fis-b1-l13', 'L13: Aplicações da Eletrostática — Fotocópia e Impressão', 'fisica',
    'A xerografia (fotocópia) usa eletrostática: um tambor fotoconductor é carregado uniformemente, depois a luz da imagem descarrega seletivamente as regiões claras. O toner (pó negro carregado eletricamente) adere onde há carga e é transferido ao papel. Impressoras a laser usam o mesmo princípio. Esses equipamentos são indispensáveis em escolas e escritórios brasileiros.',
    ['Como a eletrostática é usada em uma impressora laser para depositar o toner exatamente onde a imagem deve ser formada?', 'Quais outros processos industriais no Brasil usam eletrostática para depositar partículas com precisão?']),

  createLesson('g3-fis-b1-l14', 'L14: Revisão Parcial — Lei de Coulomb, Campo e Potencial', 'fisica',
    'Revisamos os conceitos fundamentais de eletrostática: carga, eletrização, Lei de Coulomb, campo elétrico, potencial elétrico, capacitores. A eletrostática é a base para a eletrodinâmica (próximo bimestre). Problemas de ENEM frequentemente combinam campo elétrico, potencial e energia em contextos tecnológicos e biológicos.',
    ['Como os conceitos de campo elétrico e potencial se relacionam matematicamente e conceptualmente?', 'Em que situações práticas do cotidiano brasileiro você identificou os princípios da eletrostática estudados?']),

  createLesson('g3-fis-b1-l15', 'L15: Eletrostática nos Fenômenos Atmosféricos', 'fisica',
    'Tempestades elétricas são fenômenos eletrostáticos: turbulências separam cargas nas nuvens (regiões superiores positivas, inferiores negativas). Quando a diferença de potencial é suficiente, ocorre a descarga elétrica (raio). O Brasil é o país com mais raios do mundo (~78 milhões/ano), gerando a necessidade de sistemas de proteção e pesquisa em centros como o INPE.',
    ['Por que o Brasil lidera o ranking mundial de descargas elétricas por ano?', 'Como o INPE monitora raios no Brasil e usa esses dados para alertas de segurança?']),

  createLesson('g3-fis-b1-l16', 'L16: Blindagem Elétrica e Aterramento', 'fisica',
    'O aterramento conecta um condutor à Terra (potencial de referência zero), descarregando-o com segurança. A blindagem elétrica (Gaiola de Faraday) protege equipamentos sensíveis de campos elétricos externos. Instalações hospitalares, data centers e indústrias eletrônicas no Brasil exigem aterramento e blindagem rigorosos por normas da ABNT.',
    ['Por que é importante aterrar instalações elétricas residenciais no Brasil, segundo a NBR 5410?', 'Como salas de ressonância magnética em hospitais são blindadas para não interferir em equipamentos externos?']),

  createLesson('g3-fis-b1-l17', 'L17: Revisão Completa — Eletrostática', 'fisica',
    'Revisão geral de eletrostática: carga elétrica, eletrização, Lei de Coulomb, campo elétrico, superfícies equipotenciais, potencial elétrico, capacitores e suas associações. Resolução de questões de ENEM e vestibulares, com foco em interpretar situações contextualizadas e aplicar os conceitos de forma integrada.',
    ['Como os conceitos de eletrostática que você estudou aparecem em tecnologias que você usa diariamente?', 'O que tornaria o estudo de eletrostática mais relevante e conectado à realidade brasileira?']),

  createLesson('g3-fis-b1-l18', 'L18: Prática — Experimentos de Eletrostática', 'fisica',
    'Nesta aula prática, os alunos realizam experimentos clássicos: eletrização por atrito de bastão e pente, demonstração de indução com eletroscópio, verificação da Gaiola de Faraday com papel alumínio e rádio AM. A eletrostática é um dos campos mais acessíveis para experimentação de baixo custo, conectando conceitos abstratos à realidade física.',
    ['Como você explicaria o funcionamento de um eletroscópio para um aluno do 6º ano?', 'Que experimentos de eletrostática poderiam ser realizados com materiais simples encontrados em casa?']),
];

export const fisLessonsB2: Lesson[] = [
  createLesson('g3-fis-b2-l1', 'L1: Corrente Elétrica e Condução', 'fisica',
    'A corrente elétrica (I = ΔQ/Δt) é o fluxo ordenado de portadores de carga (elétrons nos metais) por unidade de tempo, medida em Ampères (A). Há corrente contínua (CC, sentido fixo — pilhas, baterias) e corrente alternada (CA, sentido alternado — rede elétrica, 60 Hz no Brasil). A corrente convencional flui do polo positivo para o negativo, oposto ao movimento dos elétrons.',
    ['Por que a rede elétrica brasileira usa corrente alternada (CA) de 60 Hz e não corrente contínua?', 'Como os elétrons se movem em um fio condutor quando uma ddp é aplicada?']),

  createLesson('g3-fis-b2-l2', 'L2: Resistência Elétrica e Resistividade', 'fisica',
    'A resistência elétrica (R, em Ohms Ω) é a oposição ao fluxo de corrente. Depende do material (resistividade ρ), comprimento (L) e área da seção transversal (A): R = ρ·L/A. Cobre tem baixa resistividade (bom condutor) — por isso as fiações elétricas brasileiras são de cobre. Cerâmicas e borracha têm alta resistividade (isolantes). Semicondutores têm propriedades intermediárias.',
    ['Por que fios elétricos de cobre são mais baratos e eficientes do que fios de ouro, embora o ouro conduza melhor?', 'Como a resistividade dos materiais é usada na escolha de materiais para resistências de chuveiros elétricos brasileiros?']),

  createLesson('g3-fis-b2-l3', 'L3: Lei de Ohm — 1ª e 2ª Leis', 'fisica',
    'A 1ª Lei de Ohm (V = R·I) afirma que, para resistores ôhmicos, a ddp é proporcional à corrente. A 2ª Lei de Ohm (R = ρ·L/A) relaciona a resistência à geometria e ao material. Resistores ôhmicos mantêm R constante; não-ôhmicos (como diodos e lâmpadas incandescentes) têm R variável. O ENEM frequentemente contextualiza a Lei de Ohm com contas de luz e consumo energético.',
    ['Por que a resistência de uma lâmpada incandescente aumenta quando ela está acesa?', 'Como a 2ª Lei de Ohm explica por que fiações mais espessas são usadas para aparelhos de maior potência?']),

  createLesson('g3-fis-b2-l4', 'L4: Circuitos em Série e Paralelo', 'fisica',
    'Em série, a corrente é a mesma em todos os resistores; a resistência equivalente é R_eq = R₁ + R₂ + ... Em paralelo, a ddp é a mesma; a resistência equivalente é menor: 1/R_eq = 1/R₁ + 1/R₂. Instalações residenciais brasileiras usam paralelo: cada tomada tem a mesma tensão (127 ou 220 V) independente dos outros equipamentos ligados.',
    ['Por que instalações elétricas residenciais são em paralelo e não em série?', 'O que acontece com os outros aparelhos quando uma lâmpada em série queima?']),

  createLesson('g3-fis-b2-l5', 'L5: Potência Elétrica e Energia', 'fisica',
    'A potência elétrica (P = V·I = R·I² = V²/R) mede a taxa de consumo ou geração de energia elétrica. A unidade é o Watt (W). O chuveiro elétrico brasileiro (4.000 a 7.500 W) é um dos maiores consumidores residenciais. A energia consumida é E = P·t, medida em kWh na conta de luz. 1 kWh = 3,6×10⁶ J.',
    ['Como calcular o custo mensal de um chuveiro elétrico de 5.500 W usado 20 minutos por dia, com tarifa de R$0,80/kWh?', 'Por que o Brasil tem uma das tarifas de energia elétrica mais caras do mundo e como a eficiência energética pode reduzir o gasto?']),

  createLesson('g3-fis-b2-l6', 'L6: Efeito Joule', 'fisica',
    'O efeito Joule é a produção de calor quando corrente elétrica passa por um resistor: Q = R·I²·t. É responsável pelo aquecimento de chuveiros, ferros elétricos, torradeiras e lâmpadas incandescentes. Em fiações elétricas, é indesejável (perda de energia) e pode causar incêndios — principal causa de curtos-circuitos e incêndios elétricos em residências no Brasil.',
    ['Por que fiações elétricas sobrecarregadas (com correntes muito altas) podem causar incêndios?', 'Como o efeito Joule é aproveitado positivamente em chuveiros elétricos e indesejável em linhas de transmissão?']),

  createLesson('g3-fis-b2-l7', 'L7: Geradores e Força Eletromotriz', 'fisica',
    'Um gerador converte energia de outra forma (mecânica, química, solar) em elétrica. A força eletromotriz (fem, ε) é a ddp em circuito aberto. Em circuito fechado, parte da fem é usada para vencer a resistência interna (r): V_terminal = ε − r·I. Pilhas novas têm r pequeno; pilhas velhas têm r maior — por isso a tensão cai sob carga.',
    ['Por que as baterias de celulares e carros elétricos perdem desempenho em baixas temperaturas?', 'Como a resistência interna de uma bateria de carro afeta a capacidade de dar a partida no motor em dias frios?']),

  createLesson('g3-fis-b2-l8', 'L8: Receptores e Associação de Geradores', 'fisica',
    'Receptores (motores, carregadores) consomem energia elétrica e a convertem em outra forma. Seu balanço é: V = ε_contra + r_rec·I. Geradores em série somam as fems; em paralelo, mantêm a mesma fem mas aumentam a capacidade de corrente. Baterias de carros elétricos (como os BYD comercializados no Brasil) associam centenas de células em série e paralelo.',
    ['Como as baterias de veículos elétricos associam milhares de células para atingir a tensão e capacidade necessárias?', 'Por que baterias de celular em paralelo aumentam a autonomia sem aumentar a tensão?']),

  createLesson('g3-fis-b2-l9', 'L9: Lei de Kirchhoff — Correntes e Tensões', 'fisica',
    'As Leis de Kirchhoff permitem analisar circuitos complexos. A Lei dos Nós (1ª Lei): a soma das correntes que entram em um nó é igual à soma das que saem. A Lei das Malhas (2ª Lei): a soma das ddps ao longo de uma malha fechada é zero. Essas leis são fundamentais para o projeto de circuitos eletrônicos, placas de celular e sistemas de controle industrial.',
    ['Como as Leis de Kirchhoff permitem calcular correntes em circuitos com múltiplos geradores e resistores?', 'Por que as Leis de Kirchhoff são consideradas uma generalização da Lei de Ohm?']),

  createLesson('g3-fis-b2-l10', 'L10: Semicondutores e Diodos', 'fisica',
    'Semicondutores (Si, Ge) têm condutividade intermediária entre condutores e isolantes, controlada por impurezas (dopagem). Diodos conduzem corrente em apenas um sentido — usados em retificadores de fontes de alimentação. LEDs (diodos emissores de luz) revolucionaram a iluminação: lâmpadas LED brasileiras consomem 80% menos energia que incandescentes e duram 25 vezes mais.',
    ['Como o funcionamento de um LED difere de uma lâmpada incandescente fisicamente?', 'Por que a substituição de lâmpadas incandescentes por LEDs é uma das medidas mais eficazes de eficiência energética no Brasil?']),

  createLesson('g3-fis-b2-l11', 'L11: Transistores e Circuitos Integrados', 'fisica',
    'O transistor é um dispositivo semicondutor que amplifica ou comuta sinais elétricos. Os circuitos integrados (chips) reúnem bilhões de transistores em um único componente do tamanho de uma unha. A Lei de Moore descreve a miniaturização histórica. Processadores de celulares, computadores e sistemas de controle de veículos são baseados em transistores de silício.',
    ['Como a miniaturização de transistores em chips permitiu que celulares se tornassem computadores de bolso?', 'Por que há um limite físico para a miniaturização dos transistores (barreira quântica)?']),

  createLesson('g3-fis-b2-l12', 'L12: Energia Elétrica e Sustentabilidade', 'fisica',
    'O Brasil tem a matriz elétrica mais renovável do mundo: 85% das usinas são hidrelétricas, eólicas, solares ou de biomassa. Porém, o crescimento da demanda impõe desafios. A eficiência energética (selos PROCEL), geração distribuída solar e veículos elétricos são estratégias nacionais para equilibrar consumo e sustentabilidade.',
    ['Como o Programa Nacional de Conservação de Energia Elétrica (PROCEL) usa o conceito de potência e energia para classificar eletrodomésticos?', 'Por que a expansão da energia solar fotovoltaica no Brasil, especialmente no Nordeste, é estratégica para a descarbonização?']),

  createLesson('g3-fis-b2-l13', 'L13: Corrente Elétrica no Corpo Humano', 'fisica',
    'A corrente elétrica no corpo humano pode causar desde formigamento (1 mA) até parada cardíaca (100 mA). A resistência do corpo varia com a umidade da pele (seca: 100 kΩ; molhada: 1 kΩ). Por isso, usar aparelhos elétricos com as mãos molhadas é perigoso. Dispositivos Diferenciais Residuais (DR) nas instalações brasileiras (NBR 5410) protegem contra choques.',
    ['Por que tomar banho com chuveiro defeituoso pode ser fatal, usando a Lei de Ohm para explicar o risco?', 'Como os disjuntores e dispositivos DR (diferencial residual) nas instalações elétricas brasileiras previnem choques e incêndios?']),

  createLesson('g3-fis-b2-l14', 'L14: Medições Elétricas — Amperímetro e Voltímetro', 'fisica',
    'O amperímetro mede corrente e deve ser ligado em série (resistência interna muito baixa). O voltímetro mede ddp e deve ser ligado em paralelo (resistência interna muito alta). O multímetro combina as duas funções. O osciloscópio visualiza a forma de onda da corrente alternada. Técnicos em eletrônica e eletricidade usam esses instrumentos no cotidiano brasileiro.',
    ['Por que ligar um amperímetro em paralelo pode danificar o circuito e o instrumento?', 'Como um técnico de manutenção elétrica usa um multímetro para diagnosticar problemas em instalações?']),

  createLesson('g3-fis-b2-l15', 'L15: Transmissão de Energia Elétrica', 'fisica',
    'A transmissão de energia a longas distâncias usa alta tensão (138 kV a 750 kV) para reduzir perdas por efeito Joule (P_perda = R·I²). Reduzir a corrente 10 vezes reduz as perdas 100 vezes. O Sistema Interligado Nacional (SIN) conecta usinas de todas as regiões do Brasil em uma rede de transmissão de mais de 140.000 km de linhas.',
    ['Por que o Sistema Interligado Nacional transmite eletricidade em altíssima tensão antes de distribuí-la às cidades?', 'Como a perda de energia nas linhas de transmissão (efeito Joule) impacta o custo da eletricidade para o consumidor brasileiro?']),

  createLesson('g3-fis-b2-l16', 'L16: Revisão — Eletrodinâmica e Circuitos', 'fisica',
    'Revisamos corrente, resistência, Lei de Ohm, circuitos série e paralelo, potência elétrica, efeito Joule, geradores, receptores e Leis de Kirchhoff. Esses conceitos são essenciais para o ENEM e estão presentes em questões de eficiência energética, segurança elétrica, eletrônica e tecnologia.',
    ['Como os conceitos de eletrodinâmica estudados explicam o funcionamento de um smartphone?', 'De que forma a Física dos circuitos elétricos contribui para a transição energética no Brasil?']),

  createLesson('g3-fis-b2-l17', 'L17: Prática — Montagem de Circuitos Elétricos', 'fisica',
    'Nesta prática, os alunos montam circuitos série e paralelo com pilhas, LEDs e resistores, verificando experimentalmente as Leis de Ohm e Kirchhoff. Usando multímetros, medem tensão e corrente em diferentes pontos. A experiência concreta de montar e medir circuitos desenvolve a habilidade técnica valorizada no mercado de trabalho brasileiro.',
    ['Que diferenças você observou entre circuito em série e em paralelo ao ligar e desligar componentes individualmente?', 'Como as habilidades de montar e diagnosticar circuitos elétricos são aplicadas em profissões técnicas no Brasil?']),

  createLesson('g3-fis-b2-l18', 'L18: Resolução de Problemas — ENEM e Vestibulares', 'fisica',
    'Esta aula é dedicada à resolução de questões de ENEM e principais vestibulares sobre eletrodinâmica (FUVEST, UNICAMP, EEAR, ESPCEX). Estratégias: identificar o tipo de circuito, aplicar a lei adequada, verificar unidades e a razoabilidade do resultado. A eletrodinâmica é um dos temas com maior frequência e diversidade de abordagens nas provas brasileiras.',
    ['Quais estratégias você usa para resolver questões de eletrodinâmica em provas de alto nível como o ENEM?', 'Como a contextualização dos problemas com situações reais facilita a resolução e a compreensão?']),
];

export const fisLessonsB3: Lesson[] = [
  createLesson('g3-fis-b3-l1', 'L1: Magnetismo — Ímãs e Campo Magnético', 'fisica',
    'Ímãs permanentes geram campo magnético (B) que exerce força sobre materiais ferromagnéticos e cargas em movimento. As linhas de campo saem do polo norte e entram no polo sul. Ao cortar um ímã, surgem dois novos polos — nunca um monopolo magnético. A Terra funciona como um enorme ímã, com seu polo norte magnético próximo ao polo sul geográfico.',
    ['Por que a bússola, instrumento crucial para a navegação histórica brasileira, aponta para o polo norte?', 'Por que polos iguais de ímãs se repelem e polos opostos se atraem?']),

  createLesson('g3-fis-b3-l2', 'L2: Campo Magnético de Correntes — Lei de Biot-Savart', 'fisica',
    'Uma corrente elétrica gera campo magnético ao seu redor. A regra da mão direita indica o sentido: envolva o fio com a mão direita, com o polegar no sentido da corrente; os dedos indicam o sentido das linhas de campo. Em um fio longo reto, B = μ₀·I/(2πr). Em uma espira circular, B = μ₀·I/(2R). Em um solenóide, B = μ₀·n·I.',
    ['Como a regra da mão direita ajuda a determinar o sentido do campo magnético ao redor de um fio condutor?', 'Por que solenóides (bobinas longas) geram um campo magnético uniforme em seu interior, similar ao de um ímã?']),

  createLesson('g3-fis-b3-l3', 'L3: Força Magnética sobre Cargas — Lei de Lorentz', 'fisica',
    'Uma carga q movendo-se com velocidade v em um campo magnético B sofre a Força Magnética: F = q·v·B·sen θ. É sempre perpendicular à velocidade (não realiza trabalho), curvando a trajetória. Quando campo elétrico e magnético combinam (seletor de velocidades), só partículas com velocidade v = E/B passam em linha reta. Cíclotrons e espectrômetros de massa usam esse princípio.',
    ['Por que a força magnética nunca realiza trabalho sobre uma partícula carregada?', 'Como cíclotrons de hospitais brasileiros como o INCA usam campos magnéticos para acelerar prótons no tratamento de câncer?']),

  createLesson('g3-fis-b3-l4', 'L4: Força Magnética sobre Condutores — Motor Elétrico', 'fisica',
    'Um condutor percorrido por corrente I em campo B sofre força: F = B·I·L·sen θ. Esta é a base dos motores elétricos, que convertem energia elétrica em mecânica. O torque sobre uma espira (bobina) em campo magnético causa rotação. Motores elétricos movem desde ventiladores até trens elétricos no metrô de São Paulo, Rio e outras cidades brasileiras.',
    ['Como o princípio da força magnética sobre um condutor é usado no motor elétrico de um ventilador?', 'Por que os metrôs e bondes elétricos das cidades brasileiras são considerados mais eficientes e sustentáveis que ônibus a diesel?']),

  createLesson('g3-fis-b3-l5', 'L5: Indução Eletromagnética — Lei de Faraday', 'fisica',
    'A Lei de Faraday afirma que uma fem induzida é gerada quando o fluxo magnético (Φ = B·A·cos θ) varia com o tempo: ε = −ΔΦ/Δt. Variação pode ocorrer por mudança em B, A ou θ. Este princípio é a base de todos os geradores elétricos do Brasil — turbinas de Itaipu, Belo Monte e Tucuruí convertem energia mecânica em elétrica por indução.',
    ['Como as turbinas das usinas hidrelétricas brasileiras usam a Lei de Faraday para gerar eletricidade?', 'Por que um imã em queda dentro de um cano de cobre cai mais devagar do que em queda livre?']),

  createLesson('g3-fis-b3-l6', 'L6: Lei de Lenz e Correntes Induzidas', 'fisica',
    'A Lei de Lenz (sinal negativo na equação de Faraday) afirma que a fem e a corrente induzidas sempre se opõem à variação que as causou — princípio de conservação de energia. Freios eletromagnéticos de trens e elevadores usam correntes de Foucault (induzidas em massa metálica) para gerar força de frenagem sem contato mecânico, reduzindo desgaste.',
    ['Como os freios regenerativos de carros elétricos e híbridos usam a Lei de Lenz para recuperar energia?', 'Por que indução de corrente em placas metálicas gera aquecimento (como em fogões de indução)?']),

  createLesson('g3-fis-b3-l7', 'L7: Transformadores', 'fisica',
    'Um transformador usa indução mútua para alterar a tensão de corrente alternada: V₁/V₂ = N₁/N₂ (relação de transformação). Transformadores elevadores aumentam a tensão para transmissão (reduzindo perdas); abaixadores a reduzem para distribuição e uso residencial. A Rede de Transmissão brasileira usa transformadores de até 750 kV. Carregadores de celular são transformadores miniaturizados.',
    ['Como o carregador do seu celular usa um transformador para converter 127V/220V da tomada em 5V para o aparelho?', 'Por que sem transformadores a transmissão de eletricidade de Itaipu para São Paulo (800 km) seria inviável?']),

  createLesson('g3-fis-b3-l8', 'L8: Autoindução e Indutores', 'fisica',
    'A autoindução ocorre quando a variação de corrente em uma bobina gera uma fem que se opõe à variação (pela Lei de Lenz). A indutância (L, em Henry) mede essa propriedade. Indutores armazenam energia no campo magnético: E = ½·L·I². São usados em filtros de circuitos eletrônicos, balastros de lâmpadas fluorescentes e conversores de energia de computadores e celulares.',
    ['Por que indutores resistem a variações bruscas de corrente, enquanto capacitores resistem a variações de tensão?', 'Como a indutância de motores elétricos afeta o controle de velocidade em ferramentas elétricas?']),

  createLesson('g3-fis-b3-l9', 'L9: Ondas Eletromagnéticas — Geração e Propagação', 'fisica',
    'Cargas aceleradas geram ondas eletromagnéticas: campos elétrico e magnético perpendiculares entre si e à direção de propagação, viajando a c = 3×10⁸ m/s no vácuo. As equações de Maxwell unificam eletricidade, magnetismo e óptica em uma teoria coerente. O rádio, a TV e o Wi-Fi são ondas eletromagnéticas geradas por correntes alternadas em antenas.',
    ['Por que as equações de Maxwell são consideradas uma das maiores conquistas da física teórica?', 'Como antenas de rádio AM e FM geram ondas eletromagnéticas usando correntes alternadas?']),

  createLesson('g3-fis-b3-l10', 'L10: Espectro Eletromagnético e Comunicações', 'fisica',
    'As ondas de rádio (f de kHz a GHz) propagam-se por longas distâncias, tornando-as ideais para telecomunicações. No Brasil, a faixa de frequências é regulada pela ANATEL. O 5G usa frequências de 700 MHz a 26 GHz; o Wi-Fi usa 2,4 e 5 GHz; o Bluetooth usa 2,4 GHz. Cada faixa tem características específicas de alcance, penetração em obstáculos e largura de banda.',
    ['Por que o sinal de Wi-Fi de 5 GHz é mais rápido, mas penetra menos paredes do que o de 2,4 GHz?', 'Como a regulação de frequências pela ANATEL é necessária para evitar interferência entre os diferentes serviços de comunicação?']),

  createLesson('g3-fis-b3-l11', 'L11: Ressonância Magnética Nuclear (RMN)', 'fisica',
    'A Ressonância Magnética (RM) usada em diagnóstico médico usa campos magnéticos intensos e ondas de rádio para excitar núcleos de hidrogênio nos tecidos. A resposta dos núcleos gera sinais que permitem reconstruir imagens tridimensionais detalhadas de órgãos internos, sem radiação ionizante. O SUS brasileiro conta com centenas de aparelhos de RM em hospitais públicos.',
    ['Por que a ressonância magnética não usa raios X e é mais segura para alguns tipos de exame?', 'Que conhecimento físico sobre ondas eletromagnéticas e campos magnéticos está por trás de um exame de RM?']),

  createLesson('g3-fis-b3-l12', 'L12: Indução e Geração de Energia — Usinas e Alternadores', 'fisica',
    'Alternadores (geradores de CA) convertem energia mecânica em elétrica por indução eletromagnética. Uma espira girando em campo magnético gera fem senoidal: ε = ε₀·sen(ωt). A frequência da rede brasileira (60 Hz) é determinada pela velocidade de rotação das turbinas dos alternadores. Usinas térmicas, hidrelétricas, eólicas e nucleares usam alternadores.',
    ['Por que a frequência da rede elétrica no Brasil (60 Hz) é determinada pela velocidade de rotação dos geradores nas usinas?', 'Como uma usina eólica no Nordeste converte o vento em eletricidade usando os princípios do eletromagnetismo?']),

  createLesson('g3-fis-b3-l13', 'L13: Motores Elétricos — CC e CA', 'fisica',
    'Motores elétricos de CC usam comutadores para manter o torque em um sentido. Motores de CA (de indução, como criado por Tesla) usam campo rotante para girar o rotor sem contato elétrico. Motores de indução acionam compressores de geladeiras, bombas d\'água, ventiladores industriais e a maioria dos eletrodomésticos brasileiros. Sua eficiência é de 85-95%.',
    ['Por que os motores elétricos de indução (CA) são mais duráveis que os motores CC, sendo amplamente usados na indústria?', 'Como a substituição de motores elétricos velhos por motores de alta eficiência reduziria o consumo industrial no Brasil?']),

  createLesson('g3-fis-b3-l14', 'L14: Aplicações do Eletromagnetismo na Medicina', 'fisica',
    'O eletromagnetismo é fundamental na medicina moderna: eletrocardiograma (ECG) registra campos elétricos do coração; eletroencefalograma (EEG) do cérebro; desfibriladores restauram o ritmo cardíaco; estimuladores magnéticos transcraniais (TMS) tratam depressão; aceleradores de partículas são usados em radioterapia. O SUS e hospitais privados brasileiros dependem dessas tecnologias.',
    ['Como o ECG usa os campos elétricos gerados pelo coração para diagnosticar doenças cardíacas?', 'Por que o investimento em Física e tecnologia é essencial para a saúde pública no Brasil?']),

  createLesson('g3-fis-b3-l15', 'L15: Plasma e Quarta Estado da Matéria', 'fisica',
    'O plasma é o quarto estado da matéria — gás ionizado onde elétrons são separados dos núcleos. Constitui mais de 99% da matéria visível do universo (estrelas, nebulosas). Na Terra, aparece em raios, chamas e reatores de fusão nuclear. O Brasil participa do projeto ITER (reator de fusão internacional) buscando a energia limpa da fusão — a mesma que alimenta o Sol.',
    ['Por que o plasma nas estrelas como o Sol pode manter fusão nuclear estável, enquanto reatores terrestres ainda tentam atingir esse controle?', 'Como a fusão nuclear, baseada em plasmas quentes, pode se tornar a maior fonte de energia do futuro?']),

  createLesson('g3-fis-b3-l16', 'L16: Partículas no Campo Eletromagnético — Aceleradores', 'fisica',
    'Aceleradores de partículas usam campos elétricos para acelerar partículas e campos magnéticos para curvá-las. O LHC do CERN (Suíça) acelera prótons a quase a velocidade da luz para colidi-los e estudar partículas fundamentais. O Brasil contribui cientificamente com pesquisadores no CERN e opera o acelerador LNLS-Sirius no CNPEM (Campinas), inaugurado em 2022.',
    ['O que os cientistas brasileiros buscam descobrir com o acelerador de partículas Sirius, em Campinas?', 'Como os princípios de campo elétrico e magnético estudados em sala se conectam ao funcionamento do maior equipamento científico do Brasil?']),

  createLesson('g3-fis-b3-l17', 'L17: Revisão — Eletromagnetismo', 'fisica',
    'Revisamos campo magnético, força de Lorentz, indução eletromagnética, leis de Faraday e Lenz, transformadores, motores e geradores, ondas eletromagnéticas e aplicações. O eletromagnetismo é o tema mais presente em questões de ENEM e vestibulares de Física — especialmente em contextos de tecnologia, energia e saúde.',
    ['Como as quatro Equações de Maxwell unificam eletricidade, magnetismo e óptica em uma única teoria?', 'Qual aplicação do eletromagnetismo você considera mais transformadora para o Brasil nos próximos anos?']),

  createLesson('g3-fis-b3-l18', 'L18: Prática — Indução Eletromagnética com Ímã e Bobina', 'fisica',
    'Nesta prática, os alunos movem um ímã de ferrite para dentro e fora de uma bobina conectada a um galvanômetro (ou multímetro sensível) e observam a deflexão proporcional à velocidade de variação do fluxo. A verificação experimental da Lei de Faraday conecta diretamente o conceito de fluxo magnético variável com a geração de corrente.',
    ['O que acontece com a corrente induzida quando você move o ímã mais rapidamente?', 'Como este experimento simples demonstra o mesmo princípio que gera toda a eletricidade consumida pelo Brasil?']),
];

export const fisLessonsB4: Lesson[] = [
  createLesson('g3-fis-b4-l1', 'L1: Relatividade Especial — Postulados de Einstein', 'fisica',
    'Em 1905, Einstein publicou a Teoria da Relatividade Especial com dois postulados: (1) as leis da Física são as mesmas em todos os referenciais inerciais; (2) a velocidade da luz no vácuo (c = 3×10⁸ m/s) é a mesma para todos os observadores inerciais, independente do movimento da fonte ou do observador. Isso revolucionou a Física newtoniana e mudou nossa concepção de espaço e tempo.',
    ['Por que os postulados de Einstein são considerados revolucionários em relação à Física clássica de Newton?', 'O que significa dizer que a velocidade da luz é a mesma para todos os observadores, independente de seu movimento?']),

  createLesson('g3-fis-b4-l2', 'L2: Dilatação do Tempo e Contração do Espaço', 'fisica',
    'Dois dos efeitos mais surpreendentes da Relatividade Especial são: dilatação do tempo (um relógio em movimento anda mais devagar que um em repouso — Δt\' = γ·Δt) e contração do espaço (objetos em movimento parecem mais curtos na direção do movimento — L\' = L/γ), onde γ = 1/√(1 − v²/c²). O GPS usa correções relativísticas para funcionar com precisão.',
    ['Por que os satélites GPS precisam de correções relativísticas para fornecer localização precisa?', 'Se uma nave espacial viajasse a 90% da velocidade da luz, como o tempo seria percebido de dentro da nave comparado à Terra?']),

  createLesson('g3-fis-b4-l3', 'L3: Equivalência Massa-Energia — E = mc²', 'fisica',
    'A equação mais famosa da Física, E = mc², afirma que massa e energia são formas equivalentes da mesma grandeza, relacionadas pelo quadrado da velocidade da luz. Uma pequena massa equivale a enorme energia: 1 g de massa equivale a 9×10¹³ J. As usinas nucleares e bombas atômicas exploram essa equivalência. A Usina Nuclear de Angra dos Reis (RJ) usa fissão nuclear.',
    ['Por que a equação E = mc² implica que massas muito pequenas contêm quantidades imensas de energia?', 'Como a Usina Nuclear de Angra dos Reis usa a equivalência massa-energia na geração de eletricidade?']),

  createLesson('g3-fis-b4-l4', 'L4: Efeito Fotoelétrico e a Dualidade Onda-Partícula', 'fisica',
    'O efeito fotoelétrico (Nobel de Einstein em 1921) mostrou que a luz é absorvida em quanta de energia E = h·f (fótons), onde h = 6,626×10⁻³⁴ J·s é a constante de Planck. Abaixo de uma frequência mínima (f₀), não há emissão de elétrons independente da intensidade. Isso prova que a luz tem comportamento de partícula além de onda — dualidade onda-partícula.',
    ['Por que a intensidade de uma luz de baixa frequência não ejeta elétrons de um metal, mas até pouca luz ultravioleta o faz?', 'Como painéis solares fotovoltaicos no Brasil usam o efeito fotoelétrico para gerar eletricidade?']),

  createLesson('g3-fis-b4-l5', 'L5: Dualidade Onda-Partícula e Princípio da Incerteza', 'fisica',
    'De Broglie propôs que partículas de matéria também têm comportamento ondulatório: λ = h/p. O Princípio da Incerteza de Heisenberg (ΔxΔp ≥ ℏ/2) afirma que é impossível conhecer com precisão arbitrária a posição e o momento de uma partícula simultaneamente. Esse limite não é tecnológico, mas fundamental — a natureza é intrinsecamente probabilística na escala quântica.',
    ['O que o Princípio da Incerteza de Heisenberg implica sobre a natureza da realidade no nível atômico?', 'Como a dualidade onda-partícula do elétron levou ao desenvolvimento de microscópios eletrônicos?']),

  createLesson('g3-fis-b4-l6', 'L6: Modelos Atômicos — Evolução Histórica', 'fisica',
    'Os modelos atômicos evoluíram: Thomson (pudim de passas, 1897), Rutherford (núcleo central, 1911), Bohr (órbitas quantizadas, 1913) e modelo quântico atual (nuvem de probabilidade, função de onda). Cada modelo superou limitações do anterior ao explicar novos dados experimentais. O modelo de Bohr ainda é útil para cálculos de níveis de energia do hidrogênio.',
    ['Por que o modelo de Bohr, apesar de suas limitações, ainda é ensinado e usado em cálculos?', 'O que foi o experimento de Rutherford e como ele revolucionou o modelo atômico existente na época?']),

  createLesson('g3-fis-b4-l7', 'L7: Espectros Atômicos e Níveis de Energia', 'fisica',
    'Cada elemento emite e absorve luz em frequências características (espectro discreto), explicado pelo modelo de Bohr: elétrons emitem ou absorvem fótons ao saltar entre níveis de energia. E_fóton = h·f = E_i − E_f. Esse fenômeno é a base da espectroscopia — usada para identificar elementos em estrelas, controlar qualidade de metais e diagnosticar poluentes na atmosfera.',
    ['Como os fogos de artifício produzem diferentes cores usando a Física dos espectros atômicos?', 'Como astrônomos determinam a composição química de estrelas distantes a bilhões de anos-luz?']),

  createLesson('g3-fis-b4-l8', 'L8: Laser — Emissão Estimulada', 'fisica',
    'O laser (Light Amplification by Stimulated Emission of Radiation) usa a emissão estimulada de fótons em uma população de átomos com inversão de população. Produz luz coerente, monocromática e altamente colimada. Aplicações no Brasil: cirurgias oculares a laser (Lasik), leitores de código de barras, transmissão por fibra óptica, corte industrial e tratamentos dermatológicos.',
    ['O que torna a luz de um laser diferente da luz de uma lâmpada comum?', 'Como o laser é usado em cirurgias oftalmológicas (Lasik) para corrigir defeitos de visão?']),

  createLesson('g3-fis-b4-l9', 'L9: Física Nuclear — Núcleo Atômico', 'fisica',
    'O núcleo atômico é composto de prótons (Z) e nêutrons (N), mantidos coesos pela força nuclear forte (de curto alcance e muito intensa). O número de massa A = Z + N. Isótopos têm mesmo Z, mas diferente N. A energia de ligação nuclear (por nêutron) é o que explica tanto a fissão quanto a fusão nucleares liberarem energia — pela equivalência E = mc².',
    ['Por que núcleos de ferro são os mais estáveis de todos, e o que isso implica sobre fissão e fusão?', 'O que são isótopos e como o isótopo ¹⁴C é usado na datação de artefatos arqueológicos pré-colombianos no Brasil?']),

  createLesson('g3-fis-b4-l10', 'L10: Radioatividade — Decaimentos Alfa, Beta e Gama', 'fisica',
    'Núcleos instáveis decaem emitindo: partícula alfa (α = ²He⁴, carga +2, pouco penetrante), partícula beta (β = elétron ou pósitron, penetra papel) ou raio gama (γ = fóton de alta energia, muito penetrante — requer chumbo para blindagem). A atividade radioativa decresce exponencialmente com meia-vida (T₁/₂). O ²²⁶Ra (Rádio) do acidente de Goiânia-1987 emitia principalmente raios gama.',
    ['Quais as lições aprendidas com o acidente radioativo com o Césio-137 em Goiânia (1987) sobre a física da radioatividade?', 'Por que a meia-vida é um conceito mais útil que a vida média para descrever a radioatividade?']),

  createLesson('g3-fis-b4-l11', 'L11: Meia-Vida e Lei do Decaimento Radioativo', 'fisica',
    'A atividade de uma amostra radioativa decai exponencialmente: A(t) = A₀·(1/2)^(t/T₁/₂). A meia-vida (T₁/₂) é o tempo para a atividade reduzir à metade. Varia de frações de segundo (núcleos altamente instáveis) a bilhões de anos (Urânio-238, T₁/₂ = 4,5×10⁹ anos). O carbono-14 (T₁/₂ = 5.730 anos) é fundamental para a datação arqueológica de sítios pré-históricos brasileiros.',
    ['Como a datação por carbono-14 pode determinar a idade de artefatos arqueológicos encontrados em sambaquis brasileiros?', 'Por que materiais radioativos com meia-vida muito longa representam um desafio especial para o armazenamento seguro de resíduos nucleares?']),

  createLesson('g3-fis-b4-l12', 'L12: Fissão Nuclear e Reatores Nucleares', 'fisica',
    'A fissão nuclear ocorre quando um nêutron slow bombardeia um núcleo pesado (U-235), dividindo-o em dois fragmentos menores e liberando 2-3 nêutrons e energia (E = Δm·c²). Os nêutrons liberados podem iniciar reação em cadeia. Em reatores nucleares, a reação é controlada com barras de controle de Boro (absorvem nêutrons). O Brasil tem dois reatores em Angra dos Reis e está construindo o terceiro (Angra 3).',
    ['Como as barras de controle de um reator nuclear em Angra dos Reis regulam a reação de fissão em cadeia?', 'Por que o enriquecimento de urânio — que o Brasil domina — é tecnologia estratégica e sujeita a controle internacional?']),

  createLesson('g3-fis-b4-l13', 'L13: Fusão Nuclear — A Energia das Estrelas', 'fisica',
    'A fusão nuclear une núcleos leves (deutério + trítio) formando ¹He⁴ + nêutron + energia. É a fonte energética do Sol e das estrelas. A fusão libera mais energia por kg de combustível que a fissão e produz resíduos de muito menor meia-vida. O desafio: atingir temperaturas de ~100 milhões °C para vencer a repulsão elétrica. O ITER (França) é a aposta internacional para a fusão comercial.',
    ['Por que a fusão nuclear é considerada a "energia do futuro" e quais os principais obstáculos para sua implementação?', 'Que papel o Brasil poderia desempenhar na era da energia de fusão, dado seu domínio da tecnologia nuclear?']),

  createLesson('g3-fis-b4-l14', 'L14: Aplicações da Física Nuclear na Medicina', 'fisica',
    'A Medicina Nuclear usa radionuclídeos para diagnóstico (cintilografia, PET scan) e terapia (radioterapia, braquiterapia). O Tc-99m é o radioisótopo mais usado no mundo em diagnóstico. O Brasil produz seu próprio Tc-99m no IEN (Instituto de Engenharia Nuclear, RJ). A radioterapia trata tumores com feixes de raios gama ou partículas de alta energia, como no INCA (RJ).',
    ['Como o PET scan usa a aniquilação de pósitron-elétron para criar imagens de tecidos metabolicamente ativos no diagnóstico de câncer?', 'Por que o Brasil investir na produção nacional de radioisótopos médicos como o Tc-99m é estratégico para a saúde pública?']),

  createLesson('g3-fis-b4-l15', 'L15: Proteção Radiológica e Dosimetria', 'fisica',
    'A exposição à radiação é medida em Gray (Gy, dose absorvida) e Sievert (Sv, dose efetiva, que considera o tipo de radiação). Trabalhadores em radiologia e medicina nuclear usam dosímetros e obedecem a limites anuais estabelecidos pela CNEN (Comissão Nacional de Energia Nuclear). Proteção se baseia nos princípios ALARA: tempo mínimo, distância máxima e blindagem adequada.',
    ['Por que profissionais de radiologia do SUS brasileiro precisam sair da sala durante exames de raios X, se os pacientes ficam?', 'Como o princípio ALARA (As Low As Reasonably Achievable) guia as práticas de proteção radiológica no Brasil?']),

  createLesson('g3-fis-b4-l16', 'L16: Física Moderna e ENEM — Conexões', 'fisica',
    'O ENEM frequentemente aborda Física Moderna em contextos de tecnologia e saúde: efeito fotoelétrico (painéis solares), radioatividade (medicina nuclear, datação), fissão (energia nuclear), lasers (cirurgia), relatividade (GPS). As questões exigem interpretar textos científicos, identificar o fenômeno físico relevante e aplicar conceitos básicos — não cálculos complexos.',
    ['Quais conceitos de Física Moderna aparecem com mais frequência no ENEM e como eles se conectam a situações do cotidiano brasileiro?', 'Como a compreensão de Física Moderna pode ajudar um cidadão a tomar decisões mais informadas sobre energia nuclear, saúde e tecnologia?']),

  createLesson('g3-fis-b4-l17', 'L17: Revisão Geral — Física do 3º Ano e ENEM', 'fisica',
    'Revisão integrada de todo o conteúdo do 3º ano: eletrostática, eletrodinâmica, eletromagnetismo e Física Moderna. Esta aula conecta os temas, destacando as grandes ideias unificadoras: campos (elétrico, magnético e gravitacional), ondas (mecânicas e eletromagnéticas), conservação de energia e a estrutura quântica da matéria. Foco em estratégias de resolução para o ENEM.',
    ['Como as diferentes áreas da Física estudadas no Ensino Médio formam uma visão coerente e interligada do universo?', 'Que perguntas sobre a natureza da realidade a Física ainda não conseguiu responder?']),

  createLesson('g3-fis-b4-l18', 'L18: Prática — Simulado Final e Revisão Colaborativa', 'fisica',
    'Nesta aula final, os alunos realizam um simulado com questões de ENEM e vestibulares cobrindo todos os temas do ano: eletrostática, eletrodinâmica, eletromagnetismo e Física Moderna. Após o simulado, fazem revisão colaborativa: cada aluno explica a solução de uma questão para a turma, desenvolvendo comunicação científica e consolidando o aprendizado.',
    ['Como explicar um conceito físico complexo para outro aluno aprofunda seu próprio entendimento?', 'Que aspectos da Física você gostaria de continuar estudando em nível universitário?']),
];
