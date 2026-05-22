import { Lesson } from './types';
import { createLesson } from './data_helpers';

// Física 1ª Série: 18 aulas por bimestre (Total 72)

export const fisLessonsB1: Lesson[] = [
  createLesson('g1-fis-b1-l1', 'L1: O Que é Física? Grandezas e Unidades', 'fisica',
    'A Física é a ciência que estuda os fenômenos naturais e as leis que governam o universo, desde partículas subatômicas até galáxias. Para descrever esses fenômenos, usamos grandezas físicas como comprimento, massa e tempo. O Sistema Internacional de Unidades (SI) padroniza essas medidas para que cientistas do mundo inteiro se entendam.',
    ['Por que é importante padronizar unidades de medida em todo o mundo?', 'Cite três grandezas físicas que você usa no seu cotidiano e suas unidades no SI.']),

  createLesson('g1-fis-b1-l2', 'L2: Medição e Instrumentos de Medida', 'fisica',
    'Medir é comparar uma grandeza com um padrão. Os instrumentos de medida como régua, paquímetro, cronômetro e balança possuem precisão e sensibilidade diferentes. Todo resultado experimental deve indicar o valor numérico, a unidade e a incerteza (erro), refletindo a limitação de qualquer instrumento real.',
    ['Qual a diferença entre precisão e exatidão em uma medição?', 'Por que a incerteza é inevitável em qualquer medição experimental?']),

  createLesson('g1-fis-b1-l3', 'L3: Notação Científica e Algarismos Significativos', 'fisica',
    'A notação científica expressa números muito grandes ou muito pequenos na forma A × 10ⁿ, facilitando cálculos e leituras. O Brasil possui, por exemplo, uma área de 8,51 × 10⁶ km². Os algarismos significativos indicam a precisão de uma medida: não podemos inventar precisão que o instrumento não possui.',
    ['Como expressar a velocidade da luz (300.000.000 m/s) em notação científica?', 'Por que arredondar um resultado experimental pode ser desonesto cientificamente?']),

  createLesson('g1-fis-b1-l4', 'L4: Referenciais e Posição', 'fisica',
    'Para descrever o movimento de um objeto, precisamos de um referencial — um ponto ou sistema de coordenadas fixo a partir do qual observamos. A posição de um objeto é sua localização em relação a esse referencial, medida em metros (m). Um passageiro dentro de um ônibus está em repouso em relação ao veículo, mas em movimento em relação ao asfalto.',
    ['Por que o conceito de "repouso absoluto" não existe na Física?', 'Descreva um exemplo do cotidiano brasileiro onde a escolha do referencial muda completamente a análise do movimento.']),

  createLesson('g1-fis-b1-l5', 'L5: Deslocamento e Distância Percorrida', 'fisica',
    'O deslocamento (Δs = s₂ − s₁) é a variação de posição de um objeto, sendo uma grandeza vetorial (tem módulo e sentido). A distância percorrida é o comprimento total do caminho, sempre positiva. Em um percurso de ida e volta ao mesmo ponto, a distância percorrida é positiva, mas o deslocamento é zero.',
    ['Uma pessoa anda 400 m para leste e depois 400 m para oeste. Qual o deslocamento e a distância percorrida?', 'Quando o deslocamento e a distância percorrida são iguais?']),

  createLesson('g1-fis-b1-l6', 'L6: Velocidade Média', 'fisica',
    'A velocidade média (Vm = Δs / Δt) relaciona o deslocamento realizado com o tempo gasto. No Brasil, limites de velocidade em rodovias são expressos em km/h, mas o SI usa m/s. Para converter: divida por 3,6. Um carro que percorre 120 km em 1,5 h tem velocidade média de 80 km/h (≈ 22 m/s).',
    ['Um atleta olímpico percorre 100 m em 9,8 s. Qual é sua velocidade média em m/s e em km/h?', 'A velocidade média revela a velocidade em cada instante do percurso? Justifique.']),

  createLesson('g1-fis-b1-l7', 'L7: Velocidade Instantânea', 'fisica',
    'A velocidade instantânea é a velocidade em um instante específico de tempo — o que o velocímetro do carro mostra a cada momento. Matematicamente, é o limite da razão Δs/Δt quando Δt tende a zero, conceito que liga a cinemática ao cálculo diferencial. No cotidiano, fiscalização eletrônica de velocidade nas rodovias brasileiras mede a velocidade instantânea.',
    ['Por que o velocímetro de um veículo exibe velocidade instantânea e não média?', 'Como a Física do movimento instantâneo se aplica na tecnologia dos radares fixos nas estradas brasileiras?']),

  createLesson('g1-fis-b1-l8', 'L8: Aceleração Média', 'fisica',
    'A aceleração média (am = ΔV / Δt) mede a variação de velocidade por unidade de tempo. A unidade no SI é m/s². Quando a velocidade aumenta, a aceleração é positiva (aceleração). Quando diminui, é negativa (desaceleração ou retardamento). Um carro que sai do repouso e chega a 72 km/h em 5 s tem am = 4 m/s².',
    ['Diferencie aceleração positiva de aceleração negativa com exemplos do trânsito.', 'Por que um carro de corrida com maior aceleração é mais vantajoso em um autódromo?']),

  createLesson('g1-fis-b1-l9', 'L9: Movimento Retilíneo Uniforme (MRU)', 'fisica',
    'No MRU, o objeto se desloca em linha reta com velocidade constante — portanto, aceleração nula. A equação horária é s = s₀ + v·t. O gráfico posição-tempo é uma reta inclinada, e o gráfico velocidade-tempo é uma reta horizontal. Carros em estrada reta com velocidade constante e navios em mar aberto são exemplos aproximados de MRU.',
    ['Em quais condições reais um movimento pode ser considerado aproximadamente MRU?', 'Um trem percorre 360 km com velocidade constante de 120 km/h. Quanto tempo ele demora?']),

  createLesson('g1-fis-b1-l10', 'L10: Gráficos do MRU', 'fisica',
    'Os gráficos são ferramentas poderosas para analisar movimentos sem cálculos complexos. No MRU: o gráfico s×t é uma reta (inclinação = velocidade); o gráfico v×t é uma reta horizontal. A área sob a curva no gráfico v×t representa o deslocamento. Saber interpretar gráficos é essencial para o ENEM e vestibulares.',
    ['Dois carros partem de posições opostas. Como identificar no gráfico s×t o instante em que eles se encontram?', 'O que representa a inclinação (coeficiente angular) da reta em um gráfico s×t?']),

  createLesson('g1-fis-b1-l11', 'L11: Movimento Retilíneo Uniformemente Variado (MRUV)', 'fisica',
    'No MRUV, o objeto se move em linha reta com aceleração constante e diferente de zero. As equações de Torricelli e Galileu descrevem esse movimento: V = V₀ + a·t e s = s₀ + V₀·t + ½·a·t². Galileu foi o primeiro a estudar experimentalmente a queda livre, um exemplo clássico de MRUV.',
    ['Qual a diferença fundamental entre MRU e MRUV?', 'Como a descoberta de Galileu sobre a queda livre contradizeu as ideias de Aristóteles?']),

  createLesson('g1-fis-b1-l12', 'L12: Equação de Torricelli', 'fisica',
    'A equação de Torricelli (V² = V₀² + 2a·Δs) relaciona velocidade, aceleração e deslocamento sem envolver o tempo. É muito útil quando o tempo não é fornecido ou pedido no problema. Com ela, calculamos, por exemplo, a velocidade de um carro após frear em determinada distância — questão crucial em acidentes de trânsito.',
    ['Um carro a 108 km/h freia com desaceleração de 10 m/s². Qual a distância percorrida até parar?', 'Qual a importância da equação de Torricelli na análise forense de acidentes de trânsito?']),

  createLesson('g1-fis-b1-l13', 'L13: Gráficos do MRUV', 'fisica',
    'No MRUV: o gráfico v×t é uma reta inclinada (inclinação = aceleração); o gráfico s×t é uma parábola; o gráfico a×t é uma reta horizontal. A área sob o gráfico v×t ainda representa o deslocamento. Dominar a leitura desses gráficos é essencial nas provas do ENEM.',
    ['Como identificar, a partir de um gráfico, se um movimento é MRU ou MRUV?', 'O que representa a área sob o gráfico v×t em um movimento MRUV?']),

  createLesson('g1-fis-b1-l14', 'L14: Queda Livre', 'fisica',
    'A queda livre é um MRUV vertical onde a única força é a gravidade, com aceleração g ≈ 9,8 m/s² (no Brasil, varia de ≈9,78 em Manaus a ≈9,81 em Porto Alegre). Na ausência de resistência do ar, objetos de massas diferentes caem juntos. Galileu provou isso, desafiando a Física aristotélica.',
    ['Por que uma pena e uma pedra caem juntas no vácuo, mas não no ar?', 'Como a variação da aceleração da gravidade no Brasil pode afetar medidas científicas de precisão?']),

  createLesson('g1-fis-b1-l15', 'L15: Lançamento Vertical para Cima', 'fisica',
    'Quando um objeto é lançado verticalmente para cima, ele desacelera (gravidade oposta ao movimento) até parar, depois cai em queda livre. Na altura máxima, a velocidade é zero. O tempo de subida é igual ao tempo de descida (desprezando o ar). Fogos de artifício e bolas chutadas verticalmente seguem esse padrão.',
    ['Um objeto é lançado para cima com 20 m/s. Qual a altura máxima atingida (g = 10 m/s²)?', 'Por que a velocidade no retorno é igual à velocidade de lançamento (no vácuo)?']),

  createLesson('g1-fis-b1-l16', 'L16: Encontro e Ultrapassagem entre Móveis', 'fisica',
    'Problemas de encontro e ultrapassagem envolvem dois ou mais móveis e exigem que suas equações horárias sejam iguais no instante do encontro (mesma posição) ou que um ultrapassagem o outro (uma distância específica). São situações recorrentes no trânsito e em logística de transportes, como no caso dos ônibus interestaduais brasileiros.',
    ['Dois ônibus partem em sentidos contrários simultaneamente. Como determinar o ponto de encontro?', 'Como a Física do encontro de veículos pode ajudar no planejamento de horários de transporte público?']),

  createLesson('g1-fis-b1-l17', 'L17: Revisão de Cinemática Escalar', 'fisica',
    'Nesta aula, revisamos os conceitos de posição, deslocamento, velocidade média e instantânea, aceleração e os movimentos MRU e MRUV. A cinemática escalar descreve o movimento sem analisar suas causas — isso será feito na dinâmica. A resolução de exercícios de vestibulares consolida esses conceitos.',
    ['Quais grandezas físicas você precisa conhecer para descrever completamente o movimento de um objeto?', 'Como você explicaria a diferença entre MRU e MRUV para um amigo que nunca estudou Física?']),

  createLesson('g1-fis-b1-l18', 'L18: Prática — Análise de Movimento com Gráficos', 'fisica',
    'Nesta aula prática, os alunos analisam gráficos reais de movimento (obtidos com celular ou cronômetro) e identificam o tipo de movimento, calculam velocidades e acelerações. A prática experimental aproxima a teoria da realidade e desenvolve a capacidade de leitura de dados científicos, competência fundamental no ENEM.',
    ['Como um experimento simples com bola e cronômetro pode verificar as leis da queda livre?', 'Que habilidades a leitura de gráficos desenvolve além da Física?']),
];

export const fisLessonsB2: Lesson[] = [
  createLesson('g1-fis-b2-l1', 'L1: Grandezas Escalares e Vetoriais', 'fisica',
    'Grandezas escalares são completamente definidas por um valor numérico e unidade (ex: massa, temperatura). Grandezas vetoriais precisam de módulo, direção e sentido para serem definidas (ex: força, velocidade, deslocamento). Um vento de 30 km/h vindo do norte tem módulo, direção (norte-sul) e sentido (norte para sul), sendo portanto vetorial.',
    ['Por que a força é uma grandeza vetorial e a massa não?', 'Cite dois exemplos do cotidiano onde conhecer apenas o módulo de uma grandeza é insuficiente.']),

  createLesson('g1-fis-b2-l2', 'L2: Representação e Operações com Vetores', 'fisica',
    'Um vetor é representado por uma seta: o comprimento indica o módulo, a orientação indica a direção e a ponta indica o sentido. A soma de vetores pode ser feita graficamente (regra do paralelogramo ou triângulo) ou analiticamente, decompondo cada vetor em componentes x e y. Esse recurso é fundamental para analisar forças em objetos reais.',
    ['Como você somaria dois vetores que apontam em direções perpendiculares?', 'Por que a resultante de duas forças iguais em sentidos opostos é zero?']),

  createLesson('g1-fis-b2-l3', 'L3: Decomposição de Vetores', 'fisica',
    'Qualquer vetor pode ser decomposto em duas componentes perpendiculares (x e y) usando as relações trigonométricas: Vx = V·cos(θ) e Vy = V·sen(θ). Essa técnica simplifica enormemente a resolução de problemas com forças em ângulos. No lançamento oblíquo, decompõe-se o vetor velocidade inicial em horizontal e vertical.',
    ['Para que serve decompor um vetor em componentes perpendiculares?', 'Como a decomposição vetorial ajuda a entender por que é mais fácil empurrar um carrinho do que puxá-lo por uma corda inclinada?']),

  createLesson('g1-fis-b2-l4', 'L4: Cinemática Vetorial — Velocidade e Aceleração Vetoriais', 'fisica',
    'Na cinemática vetorial, velocidade e aceleração são tratadas como vetores. A variação de velocidade pode ocorrer em módulo (aceleração tangencial), em direção ou em ambos. Um carro fazendo uma curva com velocidade constante também tem aceleração, pois a direção do vetor velocidade muda. Isso é a base para entender o movimento circular.',
    ['É possível um objeto ter aceleração mesmo com velocidade de módulo constante? Como?', 'Por que o vetor velocidade sempre é tangente à trajetória do objeto?']),

  createLesson('g1-fis-b2-l5', 'L5: Lançamento Horizontal', 'fisica',
    'No lançamento horizontal, um objeto é lançado com velocidade horizontal inicial e sofre queda livre simultaneamente. O movimento horizontal é MRU (sem aceleração) e o vertical é MRUV (g = 10 m/s²). A trajetória resultante é uma parábola. Exemplos: bombas d\'água em irrigação, projéteis em treinamento militar.',
    ['Por que um objeto lançado horizontalmente cai no mesmo tempo que um objeto largado em queda livre na mesma altura?', 'Como a velocidade horizontal afeta o alcance de um jato d\'água em um sistema de irrigação?']),

  createLesson('g1-fis-b2-l6', 'L6: Lançamento Oblíquo — Análise', 'fisica',
    'No lançamento oblíquo, a velocidade inicial V₀ forma um ângulo θ com a horizontal. As componentes são: V₀x = V₀·cos(θ) (MRU) e V₀y = V₀·sen(θ) (MRUV). A trajetória é parabólica. O alcance máximo ocorre para θ = 45° (no vácuo). Esportes como futebol, basquete e salto em distância ilustram esse movimento.',
    ['Por que um chutão de futebol a 45° (no vácuo) teria o maior alcance?', 'Como a resistência do ar modifica o ângulo ideal de lançamento na prática esportiva?']),

  createLesson('g1-fis-b2-l7', 'L7: Altura Máxima e Alcance no Lançamento Oblíquo', 'fisica',
    'No lançamento oblíquo, a altura máxima (H = V₀y²/2g) ocorre quando a componente vertical da velocidade se anula. O alcance horizontal (R = V₀x · T, onde T é o tempo de voo) depende do ângulo e da velocidade inicial. Compreender essas fórmulas permite calcular onde um objeto cairá, útil em engenharia e esportes.',
    ['Um jogador de basquete arremessa a bola com V₀ = 8 m/s a 60°. Qual a altura máxima atingida?', 'Como engenheiros usam os princípios do lançamento oblíquo no projeto de pontes e arcos?']),

  createLesson('g1-fis-b2-l8', 'L8: Movimento Circular Uniforme (MCU)', 'fisica',
    'No MCU, o objeto percorre uma trajetória circular com módulo da velocidade constante. O período (T) é o tempo de uma volta completa; a frequência (f = 1/T) é o número de voltas por segundo (Hz). A velocidade escalar é v = 2πR/T. Ventiladores, rodas de bicicleta e planetas (aproximadamente) realizam MCU.',
    ['Por que a frequência da rede elétrica no Brasil é 60 Hz e o que isso significa fisicamente?', 'Como o conceito de período se aplica ao funcionamento de um motor de carro?']),

  createLesson('g1-fis-b2-l9', 'L9: Aceleração Centrípeta', 'fisica',
    'Mesmo no MCU (módulo da velocidade constante), há aceleração porque a direção do vetor velocidade muda continuamente. Essa aceleração centrípeta (acp = v²/R) aponta sempre para o centro da trajetória. Ela é responsável por curvar o caminho do objeto. Sem ela, o objeto seguiria em linha reta (inércia de Newton).',
    ['Por que um carro em uma curva tende a "escapar" para fora se não houver força suficiente?', 'Como a aceleração centrípeta se relaciona com a força que os pneus exercem no asfalto durante uma curva?']),

  createLesson('g1-fis-b2-l10', 'L10: Frequência, Período e Velocidade Angular', 'fisica',
    'A velocidade angular (ω = 2π/T = 2πf) mede quantos radianos o objeto percorre por segundo. A relação entre velocidade linear e angular é v = ω·R. Um ponto na borda de um disco roda a maior velocidade linear que um ponto próximo ao centro, embora ambos tenham a mesma velocidade angular — princípio importante em motores e turbinas.',
    ['Por que os discos rígidos de computadores antigos gravavam menos informação na parte interna?', 'Em uma roda de bicicleta, todos os pontos têm a mesma velocidade angular? E a mesma velocidade linear?']),

  createLesson('g1-fis-b2-l11', 'L11: Transmissão de Movimentos — Polias e Engrenagens', 'fisica',
    'Polias e engrenagens transmitem movimento circular entre eixos. Em polias ligadas por correia, os pontos de contato têm a mesma velocidade linear: v₁ = v₂. Em engrenagens dentadas, a velocidade angular é inversamente proporcional ao raio: ω₁R₁ = ω₂R₂. Bicicletas, automóveis e usinas hidrelétricas como Itaipu usam esses princípios.',
    ['Como a troca de marchas em uma bicicleta usa o princípio das polias para facilitar subidas?', 'Por que as turbinas de Itaipu precisam de um sistema de transmissão antes de gerar eletricidade?']),

  createLesson('g1-fis-b2-l12', 'L12: Movimento Circular Uniformemente Variado (MCUV)', 'fisica',
    'No MCUV, a velocidade angular varia uniformemente com o tempo (aceleração angular α constante). As equações são análogas ao MRUV: ω = ω₀ + α·t e θ = θ₀ + ω₀·t + ½·α·t². Motores ao ligar ou desligar passam por MCUV até atingir o regime estacionário (MCU). Centrífugas de laboratório também passam por essa fase.',
    ['Como o MCUV se relaciona com o processo de ligar um motor elétrico?', 'Por que é importante que motores de aviões acelerem de forma controlada ao decolar?']),

  createLesson('g1-fis-b2-l13', 'L13: Vetores Velocidade e Aceleração no Movimento Curvilíneo', 'fisica',
    'Em qualquer movimento curvilíneo, a aceleração tem duas componentes: tangencial (muda o módulo da velocidade) e centrípeta (muda a direção). A aceleração total é a resultante vetorial das duas. Numa freada em curva, ambas as componentes atuam simultaneamente — situação crítica para o controle de veículos.',
    ['O que acontece com as componentes da aceleração quando um carro mantém velocidade constante em uma curva?', 'Como a Física do movimento curvilíneo é aplicada no design de pistas de Fórmula 1?']),

  createLesson('g1-fis-b2-l14', 'L14: Relatividade do Movimento — Composição de Velocidades', 'fisica',
    'O movimento sempre depende do referencial escolhido. Para compor velocidades em referenciais diferentes, somamos os vetores velocidade. Se você caminha no corredor de um ônibus a 2 m/s e o ônibus vai a 60 km/h, sua velocidade em relação ao chão é a soma vetorial. Esse é o princípio da relatividade galileana, base para a Relatividade de Einstein.',
    ['Um avião voa a 800 km/h em relação ao ar. Se o vento sopra a 100 km/h em sentido contrário, qual a velocidade em relação ao solo?', 'Como os pilotos de avião usam a composição de velocidades para calcular rotas no Brasil?']),

  createLesson('g1-fis-b2-l15', 'L15: Aplicações do Lançamento Oblíquo no Esporte', 'fisica',
    'Esportes coletivos brasileiros como futebol, vôlei e atletismo são ricas aplicações da cinemática. No futebol, o chute pode ser modelado como lançamento oblíquo. No vôlei, o saque viagem tem componente oblíqua. Compreender a física por trás do esporte melhora o treinamento e ajuda atletas a otimizar seus movimentos.',
    ['Que aspectos da física do lançamento oblíquo Neymar precisa dominar (intuitivamente) ao cobrar uma falta?', 'Como um técnico de atletismo poderia usar a Física para ajudar seu atleta a melhorar o arremesso de peso?']),

  createLesson('g1-fis-b2-l16', 'L16: Resolução de Problemas — Vetores e Cinemática 2D', 'fisica',
    'Esta aula consolida o uso de vetores na resolução de problemas bidimensionais de cinemática: decomposição, soma vetorial, lançamentos horizontal e oblíquo. A estratégia é sempre separar o problema em componentes x e y, resolver cada uma independentemente e depois compor os resultados quando necessário.',
    ['Quais são as etapas gerais para resolver um problema de lançamento oblíquo?', 'Como a habilidade de decompor vetores facilita a resolução de situações complexas do dia a dia?']),

  createLesson('g1-fis-b2-l17', 'L17: Revisão — Vetores e Movimento Circular', 'fisica',
    'Nesta aula revisamos os conceitos centrais do bimestre: operações com vetores, lançamentos (horizontal e oblíquo), MCU, aceleração centrípeta e transmissão de movimento. A conexão entre esses temas revela como a matemática vetorial é uma linguagem universal para descrever movimentos em duas e três dimensões.',
    ['Como o conceito de vetor une os temas de lançamentos e movimento circular estudados neste bimestre?', 'Qual tema deste bimestre você considera mais presente no cotidiano? Por quê?']),

  createLesson('g1-fis-b2-l18', 'L18: Prática — Lançamento de Projéteis e Análise de Trajetórias', 'fisica',
    'Nesta aula prática, os alunos filmam ou simulam lançamentos (com bola de ping-pong, por exemplo) e analisam a trajetória parabólica. Comparando os resultados teóricos com os experimentais, observam o efeito do ar. Atividades experimentais como essa são valorizadas pelo ENEM e desenvolvem o pensamento científico.',
    ['Como a trajetória real de uma bola difere da trajetória teórica prevista (sem resistência do ar)?', 'Que conclusões científicas você pode tirar ao comparar dados experimentais com modelos matemáticos?']),
];

export const fisLessonsB3: Lesson[] = [
  createLesson('g1-fis-b3-l1', 'L1: Dinâmica — O Que Causa o Movimento?', 'fisica',
    'Enquanto a cinemática descreve o movimento, a dinâmica investiga suas causas: as forças. Uma força é uma ação capaz de modificar o estado de movimento de um corpo (alterar sua velocidade ou deformá-lo). A dinâmica de Newton revolucionou a Física e ainda fundamenta a engenharia, a aeronáutica e a exploração espacial no século XXI.',
    ['Qual a diferença entre cinemática e dinâmica?', 'Cite três exemplos de forças que atuam sobre você neste exato momento.']),

  createLesson('g1-fis-b3-l2', 'L2: 1ª Lei de Newton — Inércia', 'fisica',
    'A Primeira Lei de Newton (Lei da Inércia) afirma que um corpo em repouso tende a permanecer em repouso, e um corpo em movimento tende a manter sua velocidade (módulo, direção e sentido) a menos que uma força resultante externa atue sobre ele. A inércia é a resistência que o corpo oferece a mudanças em seu estado de movimento; a massa é sua medida.',
    ['Por que os passageiros são jogados para frente quando o ônibus freia bruscamente?', 'Como os cintos de segurança e os airbags dos carros brasileiros exploram a Lei da Inércia para proteger vidas?']),

  createLesson('g1-fis-b3-l3', 'L3: 2ª Lei de Newton — Força e Aceleração', 'fisica',
    'A Segunda Lei de Newton (F = m·a) afirma que a força resultante sobre um corpo é igual ao produto de sua massa pela aceleração produzida. Dobrar a força dobra a aceleração; dobrar a massa, para a mesma força, reduz a aceleração à metade. Esta lei é a equação fundamental da dinâmica, usada em projetos de foguetes, carros e elevadores.',
    ['Por que um ônibus carregado demora mais para frear do que um vazio?', 'Como engenheiros da Embraer usam a Segunda Lei de Newton no projeto de aviões?']),

  createLesson('g1-fis-b3-l4', 'L4: 3ª Lei de Newton — Ação e Reação', 'fisica',
    'A Terceira Lei de Newton afirma que toda ação tem uma reação igual em módulo, oposta em sentido e na mesma linha de ação, mas aplicada em corpos diferentes. O foguete expele gases para baixo (ação) e é impulsionado para cima (reação). O lançamento de foguetes brasileiros no Centro Espacial de Alcântara (MA) utiliza diretamente esse princípio.',
    ['Se ação e reação são sempre iguais e opostas, por que um cavalo consegue puxar uma carroça?', 'Como a Terceira Lei de Newton explica o funcionamento de um foguete no espaço, onde não há ar?']),

  createLesson('g1-fis-b3-l5', 'L5: Força Peso', 'fisica',
    'A força peso (P = m·g) é a força gravitacional que a Terra exerce sobre um corpo, sempre apontando para o centro da Terra. Não é a mesma coisa que massa: a massa (kg) é uma propriedade intrínseca do corpo; o peso (N) depende do campo gravitacional local. Na Lua, sua massa é a mesma, mas seu peso seria cerca de 1/6 do peso terrestre.',
    ['Por que astronautas brasileiros que fossem à Lua pesariam menos, mas teriam a mesma massa?', 'Como a diferença entre peso e massa é importante em missões espaciais e na indústria farmacêutica?']),

  createLesson('g1-fis-b3-l6', 'L6: Força Normal', 'fisica',
    'A força normal (N) é a força perpendicular que uma superfície exerce sobre um corpo em contato com ela. Ela sempre aponta para fora da superfície, impedindo que o corpo a atravesse. Em um livro sobre a mesa, a normal equilibra o peso. Em um elevador acelerando para cima, a normal é maior que o peso — por isso você "sente mais pesado".',
    ['Por que você se sente mais pesado quando um elevador começa a subir?', 'Qual seria a força normal sobre uma pessoa de 60 kg em um elevador acelerando para baixo a 2 m/s²?']),

  createLesson('g1-fis-b3-l7', 'L7: Força de Atrito', 'fisica',
    'O atrito é uma força que se opõe ao movimento relativo entre superfícies em contato, surgindo da rugosidade microscópica. O atrito estático impede o início do movimento (fs ≤ μe·N); o cinético atua durante o deslizamento (fc = μc·N). O atrito é fundamental no cotidiano: sem ele, não andamos, carros não travam, e parafusos se soltam.',
    ['Por que rodovias molhadas aumentam a distância de frenagem dos veículos?', 'Em quais situações o atrito é indesejável e como a engenharia resolve isso (ex: motores, mancais)?']),

  createLesson('g1-fis-b3-l8', 'L8: Força de Tração e Diagramas de Forças', 'fisica',
    'A força de tração é transmitida por cordas, cabos ou fios, sempre ao longo deles. O diagrama de forças (ou diagrama de corpo livre) isola o corpo e representa todas as forças que atuam sobre ele como vetores. Essa ferramenta é essencial para aplicar a 2ª Lei de Newton corretamente em situações complexas.',
    ['Como montar um diagrama de forças para um bloco sendo puxado por uma corda em uma superfície com atrito?', 'Em que situações o cabo de um elevador pode romper? Como a Física explica isso?']),

  createLesson('g1-fis-b3-l9', 'L9: Aplicações das Leis de Newton — Sistemas de Blocos', 'fisica',
    'Sistemas com múltiplos blocos ligados por cordas exigem que as Leis de Newton sejam aplicadas a cada corpo individualmente. Se os blocos se movem juntos, a aceleração é a mesma para todos. A tensão na corda é determinada aplicando F = m·a ao sistema todo e depois a cada bloco separadamente.',
    ['Dois blocos de 3 kg e 5 kg estão ligados por uma corda em superfície sem atrito. Qual a aceleração se uma força de 16 N puxar o sistema?', 'Por que é importante analisar cada corpo separadamente em um sistema de blocos ligados?']),

  createLesson('g1-fis-b3-l10', 'L10: Plano Inclinado', 'fisica',
    'No plano inclinado, o peso do objeto se decompõe em duas componentes: uma paralela ao plano (P·sen θ, que causa deslizamento) e uma perpendicular (P·cos θ, que origina a normal). A presença ou não de atrito determina se o objeto desliza, está em equilíbrio ou precisa de uma força extra. Rampas para cadeirantes e rodovias montanhosas exemplificam plano inclinado.',
    ['Por que é mais fácil subir uma rampa pouco inclinada do que uma muito inclinada?', 'Como as normas brasileiras de acessibilidade (NBR 9050) usam a Física do plano inclinado para definir a inclinação máxima de rampas?']),

  createLesson('g1-fis-b3-l11', 'L11: Plano Inclinado com Atrito', 'fisica',
    'Com atrito no plano inclinado, a análise inclui a força de atrito (oposta ao movimento) além das componentes do peso. Para o objeto subir com velocidade constante, a força aplicada deve igualar a soma da componente paralela do peso com o atrito. Para descer, o atrito pode reduzir ou até impedir o movimento.',
    ['Qual o ângulo mínimo em que um objeto começa a deslizar em uma superfície com coeficiente de atrito estático μe?', 'Como o sistema de freios a disco dos carros brasileiros usa o atrito de forma controlada?']),

  createLesson('g1-fis-b3-l12', 'L12: Força Centrípeta', 'fisica',
    'A força centrípeta não é um novo tipo de força, mas sim o papel desempenhado por uma força (ou resultante) que aponta para o centro de uma trajetória circular, causando a aceleração centrípeta. F = m·v²/R. Em curvas de estrada, o atrito dos pneus fornece a força centrípeta. Em órbitas, é a gravidade.',
    ['O que fornece a força centrípeta para um satélite em órbita ao redor da Terra?', 'Por que curvas de rodovias brasileiras em pista molhada são mais perigosas do que em pista seca?']),

  createLesson('g1-fis-b3-l13', 'L13: Força Centrípeta em Loopings e Curvas Banqueadas', 'fisica',
    'Em um looping (curva vertical), no ponto mais alto, peso e normal somam-se para fornecer a força centrípeta. Na velocidade mínima, a normal é zero e só o peso atua. Em curvas banqueadas (inclinadas), a componente horizontal da normal fornece a força centrípeta, dispensando o atrito — princípio usado em pistas de corrida e curvas de rodovias.',
    ['Por que em montanhas-russas a velocidade mínima para completar o looping é crítica?', 'Como o banqueamento de curvas em autódromos de F1 permite maiores velocidades?']),

  createLesson('g1-fis-b3-l14', 'L14: Equilíbrio de um Ponto Material', 'fisica',
    'Um ponto material está em equilíbrio estático quando a resultante de todas as forças que atuam sobre ele é zero (ΣF = 0). Isso significa que o objeto pode estar em repouso ou em MRU. Resolver problemas de equilíbrio exige identificar todas as forças (diagrama de corpo livre) e aplicar a condição vetorial de equilíbrio.',
    ['Quais condições um lustre pendurado por dois cabos deve satisfazer para estar em equilíbrio?', 'Como o conceito de equilíbrio de forças é aplicado na construção de pontes pênseis no Brasil?']),

  createLesson('g1-fis-b3-l15', 'L15: Lei da Gravitação Universal', 'fisica',
    'Newton formulou que toda massa atrai toda outra massa com uma força proporcional ao produto das massas e inversamente proporcional ao quadrado da distância (F = G·m₁·m₂/r²). A constante G = 6,67×10⁻¹¹ N·m²/kg². Essa lei explica desde a queda de uma maçã até o movimento dos planetas e o funcionamento dos satélites brasileiros SGDC e AMAZONIA-1.',
    ['Por que a força gravitacional entre dois objetos comuns é imperceptível, mas entre planetas é enorme?', 'Como o satélite AMAZONIA-1 (lançado em 2021) usa a lei da gravitação universal para se manter em órbita?']),

  createLesson('g1-fis-b3-l16', 'L16: Satélites e Velocidade Orbital', 'fisica',
    'Um satélite em órbita circular tem a força gravitacional como força centrípeta. A velocidade orbital é v = √(G·M/R), onde M é a massa do planeta e R o raio da órbita. Quanto mais baixa a órbita, maior a velocidade. Satélites geoestacionários (como os de TV a cabo no Brasil) orbitam a ≈36.000 km, onde o período é 24h.',
    ['Por que satélites geoestacionários ficam "parados" no céu para uma antena parabólica brasileira?', 'Qual a vantagem de satélites de órbita baixa (LEO) como o AMAZONIA-1 para o monitoramento da Amazônia?']),

  createLesson('g1-fis-b3-l17', 'L17: Revisão das Leis de Newton e Forças', 'fisica',
    'Nesta revisão, consolidamos as três Leis de Newton e seus campos de aplicação: peso, normal, atrito, tração e força centrípeta. A chave é sempre fazer o diagrama de corpo livre e aplicar ΣF = m·a na direção do movimento. Problemas de ENEM e vestibulares frequentemente combinam múltiplas forças em uma mesma situação.',
    ['Como as Leis de Newton se relacionam entre si para descrever o movimento de qualquer objeto?', 'Que tipo de situação cotidiana você consegue agora analisar usando as Leis de Newton?']),

  createLesson('g1-fis-b3-l18', 'L18: Prática — Medição do Coeficiente de Atrito', 'fisica',
    'Nesta aula prática, os alunos determinam experimentalmente o coeficiente de atrito estático usando um plano inclinado e um objeto. Ao inclinar gradualmente o plano e medir o ângulo em que o objeto começa a deslizar, calcula-se μe = tan(θ). Experimentos simples como esse ensinam o método científico e conectam teoria com prática.',
    ['Como o ângulo de deslizamento se relaciona matematicamente com o coeficiente de atrito estático?', 'Que variáveis podem introduzir erros nesse experimento e como minimizá-los?']),
];

export const fisLessonsB4: Lesson[] = [
  createLesson('g1-fis-b4-l1', 'L1: Trabalho de uma Força', 'fisica',
    'Na Física, trabalho (τ = F·d·cos θ) é a transferência de energia resultante da ação de uma força sobre um deslocamento. Só há trabalho se a força produzir (ou tentar produzir) deslocamento. A unidade é o Joule (J = N·m). Forças perpendiculares ao deslocamento (como a normal em superfície horizontal) fazem trabalho nulo.',
    ['Por que segurar um objeto pesado parado não realiza trabalho mecânico, mesmo que você canse?', 'Qual a relação entre trabalho e energia? Por que o Joule é unidade de ambos?']),

  createLesson('g1-fis-b4-l2', 'L2: Trabalho da Força Peso e da Força Elástica', 'fisica',
    'O trabalho do peso (τp = m·g·Δh) depende apenas da variação de altura, não da trajetória — por isso o peso é uma força conservativa. O trabalho da força elástica de uma mola (τe = ½·k·x²) também é conservativo. Forças conservativas têm a propriedade de armazenar energia potencial que pode ser totalmente recuperada.',
    ['Por que o trabalho da força peso ao subir uma escada não depende se a escada é reta ou caracol?', 'Como uma mola comprimida realiza trabalho para lançar um projétil em um brinquedo?']),

  createLesson('g1-fis-b4-l3', 'L3: Energia Cinética e Teorema Trabalho-Energia', 'fisica',
    'A energia cinética (Ec = ½·m·v²) é a energia associada ao movimento de um corpo. O Teorema Trabalho-Energia afirma que o trabalho total realizado sobre um corpo é igual à variação de sua energia cinética: τtotal = ΔEc. Esse teorema é poderoso porque relaciona força (causa) com variação de velocidade (efeito) sem precisar calcular o tempo.',
    ['Por que dobrar a velocidade quadruplica a energia cinética? Quais as implicações para a segurança no trânsito?', 'Como o Teorema Trabalho-Energia explica por que é mais difícil parar um caminhão carregado do que um carro?']),

  createLesson('g1-fis-b4-l4', 'L4: Energia Potencial Gravitacional', 'fisica',
    'A energia potencial gravitacional (Epg = m·g·h) é a energia que um corpo possui em virtude de sua posição no campo gravitacional, medida em relação a um referencial (nível zero escolhido livremente). Quanto maior a altura, maior a energia potencial. Usinas hidrelétricas como Belo Monte e Itaipu convertem energia potencial da água em energia elétrica.',
    ['Por que a altura da barragem de uma usina hidrelétrica é tão importante para a geração de energia?', 'Como a escolha do nível de referência afeta o valor da energia potencial gravitacional?']),

  createLesson('g1-fis-b4-l5', 'L5: Energia Potencial Elástica', 'fisica',
    'A energia potencial elástica (Epe = ½·k·x²) é armazenada em molas, elásticos e qualquer material deformado elasticamente. A constante elástica k (N/m) caracteriza a rigidez da mola. A energia armazenada pode ser convertida em energia cinética ao ser liberada. Amortecedores de carros e trampolins são aplicações práticas.',
    ['Como a energia potencial elástica de um arco é transformada ao disparar uma flecha?', 'Por que sistemas de suspensão de carros com molas mais rígidas são menos confortáveis, mas mais eficientes em curvas?']),

  createLesson('g1-fis-b4-l6', 'L6: Conservação da Energia Mecânica', 'fisica',
    'Em sistemas conservativos (sem atrito e forças dissipativas), a energia mecânica total (Em = Ec + Ep) permanece constante. Em qualquer ponto da trajetória, o que se perde em energia cinética ganha em potencial, e vice-versa. Pêndulos, montanhas-russas e mergulhadores ilustram essa transformação contínua e reversível.',
    ['Em uma montanha-russa sem atrito, em que ponto a velocidade é máxima e em que ponto é mínima?', 'Como o princípio de conservação da energia ajuda engenheiros a projetar montanhas-russas seguras?']),

  createLesson('g1-fis-b4-l7', 'L7: Energia Não Conservativa e Dissipação', 'fisica',
    'O atrito e outras forças dissipativas convertem energia mecânica em calor (energia térmica), que não pode ser facilmente recuperada. Quando há atrito, a energia mecânica não se conserva: Em(final) = Em(inicial) + τatrito. O trabalho do atrito é sempre negativo (remove energia do sistema). Isso explica por que máquinas reais nunca são 100% eficientes.',
    ['Por que sistemas reais sempre perdem energia para o ambiente, mesmo sendo bem projetados?', 'Como o freio regenerativo de carros elétricos como os modelos da BYD no Brasil recupera parte da energia dissipada?']),

  createLesson('g1-fis-b4-l8', 'L8: Potência', 'fisica',
    'Potência (P = τ/Δt = F·v) é a taxa de realização de trabalho por unidade de tempo. A unidade SI é o Watt (W = J/s). Um motor mais potente realiza o mesmo trabalho em menos tempo. No Brasil, a potência de motores ainda é frequentemente expressa em cavalos (cv): 1 cv ≈ 736 W. A conta de luz mede consumo em kWh (quilowatt-hora).',
    ['Por que um motor de 100 cv não necessariamente usa sempre essa potência máxima?', 'Como a potência instalada nas usinas hidrelétricas brasileiras se relaciona com o consumo energético do país?']),

  createLesson('g1-fis-b4-l9', 'L9: Rendimento de Máquinas e Motores', 'fisica',
    'O rendimento (η = Putilizada/Pfornecida × 100%) indica qual fração da energia fornecida é convertida em trabalho útil. Nenhuma máquina real tem rendimento de 100% devido a perdas por atrito, calor e outros fatores. Motores de combustão interna têm rendimento de 20-35%; motores elétricos, de 85-95%. Isso é decisivo na transição energética brasileira.',
    ['Por que motores elétricos de carros têm rendimento muito maior que motores a gasolina?', 'Como o conceito de rendimento influencia o debate brasileiro sobre transição para veículos elétricos?']),

  createLesson('g1-fis-b4-l10', 'L10: Quantidade de Movimento (Momento Linear)', 'fisica',
    'A quantidade de movimento (p = m·v) é o produto da massa pela velocidade de um objeto. É uma grandeza vetorial fundamental na análise de colisões. A variação de quantidade de movimento é chamada de impulso (I = F·Δt = Δp). Airbags aumentam o tempo de colisão, reduzindo a força de impacto — física que salva vidas.',
    ['Por que um airbag reduz o risco de lesões graves em acidentes, mesmo que a quantidade de movimento final seja a mesma?', 'Como o impulso explica por que amortecedores de prédios em zonas sísmicas protegem estruturas?']),

  createLesson('g1-fis-b4-l11', 'L11: Conservação da Quantidade de Movimento', 'fisica',
    'Em um sistema isolado (sem forças externas), a quantidade de movimento total é conservada: p(antes) = p(depois). Essa lei é universal e vale para colisões, explosões e qualquer interação. A explosão de fogos de artifício, o recuo de uma arma e o lançamento de foguetes são explicados por essa lei.',
    ['Como a conservação do momento linear explica o recuo de uma arma ao disparar?', 'Por que foguetes funcionam no vácuo do espaço, onde não há ar para "empurrar"?']),

  createLesson('g1-fis-b4-l12', 'L12: Colisões — Elásticas e Inelásticas', 'fisica',
    'Nas colisões elásticas, conservam-se tanto o momento linear quanto a energia cinética. Nas inelásticas, apenas o momento é conservado; parte da energia cinética é convertida em calor, deformação ou som. Colisões perfeitamente inelásticas ocorrem quando os corpos se unem após o choque. Colisões de bilhar são aproximadamente elásticas.',
    ['Por que em acidentes de trânsito os veículos se deformam bastante? Qual a vantagem física dessa deformação?', 'Como a análise de colisões é usada em reconstrução forense de acidentes rodoviários no Brasil?']),

  createLesson('g1-fis-b4-l13', 'L13: Centro de Massa', 'fisica',
    'O centro de massa é o ponto médio ponderado de distribuição de massa de um sistema. Para um sistema isolado, o centro de massa se move com velocidade constante (ou permanece em repouso), independente das forças internas. Projetos de satélites, foguetes e aviões exigem controle preciso do centro de massa para garantir estabilidade.',
    ['Por que o centro de massa de um objeto não precisa estar dentro do material do objeto?', 'Como o deslocamento da carga em um avião afeta seu centro de massa e sua estabilidade de voo?']),

  createLesson('g1-fis-b4-l14', 'L14: Energia nas Fontes Renováveis Brasileiras', 'fisica',
    'O Brasil é líder mundial em energia renovável: 83% da matriz elétrica é renovável (hidrelétrica, solar, eólica e biomassa). A hidrelétrica converte Epg em elétrica; a eólica converte Ec do vento; a solar fotovoltaica converte energia luminosa em elétrica (efeito fotoelétrico). Compreender Física é entender o futuro energético do Brasil.',
    ['Como a Física do trabalho e da energia se manifesta em cada tipo de usina renovável brasileira?', 'Por que a geração distribuída de energia solar em residências é uma tendência crescente no Brasil?']),

  createLesson('g1-fis-b4-l15', 'L15: Máquinas Simples e Vantagem Mecânica', 'fisica',
    'Máquinas simples (alavancas, roldanas, planos inclinados, parafusos) multiplicam forças ao custo de maior deslocamento, respeitando a conservação de energia. A vantagem mecânica (VM = F_resistente/F_motora) quantifica essa amplificação. Guindaste, macaco de carro e tesoura são máquinas simples compostas presentes no cotidiano brasileiro.',
    ['Por que máquinas simples não criam energia, mas tornam o trabalho mais fácil?', 'Como o princípio das alavancas é usado na construção civil e em equipamentos agrícolas no Brasil?']),

  createLesson('g1-fis-b4-l16', 'L16: Teorema de Stevin e Equilíbrio de Corpos Extensos', 'fisica',
    'Um corpo extenso (não pontual) está em equilíbrio quando a resultante das forças e o torque resultante são ambos nulos. O torque (τ = F·d) é a tendência de uma força girar o corpo. As Condições de Equilíbrio são: ΣF = 0 (translação) e Στ = 0 (rotação). Estruturas como pontes e edifícios são projetadas com base nessas condições.',
    ['Por que uma porta é mais fácil de girar quando a força é aplicada na extremidade mais distante da dobradiça?', 'Como engenheiros civis verificam o equilíbrio de uma ponte antes de sua construção?']),

  createLesson('g1-fis-b4-l17', 'L17: Revisão — Trabalho, Energia e Impulso', 'fisica',
    'Revisamos os conceitos de trabalho, potência, rendimento, energia cinética e potencial, conservação da energia mecânica, quantidade de movimento e colisões. Esses temas formam o núcleo de problemas de ENEM e são fundamentos para a Física do 2º e 3º ano. A unidade que conecta todos é o Joule — unidade universal de energia.',
    ['Que conceito de energia deste bimestre você considera mais importante para a vida sustentável no século XXI?', 'Como os princípios de conservação estudados refletem uma lei mais profunda da natureza?']),

  createLesson('g1-fis-b4-l18', 'L18: Prática — Experimento de Conservação de Energia', 'fisica',
    'Nesta prática, os alunos usam uma rampa e uma bolinha para verificar experimentalmente a conservação de energia: a altura de lançamento determina a velocidade na base (v = √2gh). Medindo a altura e a velocidade final (via alcance horizontal), comparam o valor teórico com o experimental e discutem as perdas por atrito e ar.',
    ['Como as perdas de energia por atrito e resistência do ar se manifestam nos resultados experimentais?', 'Que habilidades científicas este experimento desenvolve que são valorizadas no ENEM e em carreiras científicas?']),
];
