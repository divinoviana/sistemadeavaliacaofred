import { Lesson } from './types';
import { createLesson } from './data_helpers';

// Matemática 2ª Série: 18 aulas por bimestre (Total 72)
export const matLessonsB1: Lesson[] = [
  createLesson('g2-mat-b1-l1', 'L1: Trigonometria — Motivação e Revisão do Triângulo Retângulo', 'matematica',
    'A trigonometria é a matemática dos ângulos e das distâncias. Na 2ª série, expandimos seu alcance para qualquer triângulo e para fenômenos periódicos. Antes disso, revisamos as razões no triângulo retângulo: seno, cosseno e tangente. Essas razões são a porta de entrada para entender como GPS, arquitetura, astronomia e engenharia de pontes funcionam.',
    ['Revise: em um triângulo retângulo com hipotenusa 13 e cateto 5, calcule os três ângulos agudos e as seis razões trigonométricas do menor ângulo.', 'Como a trigonometria é usada na construção de rampas de acessibilidade? Pesquise o ângulo máximo permitido pela norma ABNT e calcule a rampa necessária para vencer um desnível de 60 cm.']),

  createLesson('g2-mat-b1-l2', 'L2: Círculo Trigonométrico e Ângulos em Qualquer Quadrante', 'matematica',
    'O círculo trigonométrico (círculo unitário com raio 1) permite definir seno e cosseno para qualquer ângulo real, positivo ou negativo. O ponto P(cosα, senα) percorre o círculo. Os sinais de seno e cosseno dependem do quadrante: 1º (+,+), 2º (−,+), 3º (−,−), 4º (+,−). Esse modelo é fundamental para as funções trigonométricas completas.',
    ['Determine o sinal de seno e cosseno para ângulos de 120°, 225°, 300° e −45°. Em qual quadrante cada ângulo está?', 'Calcule sem calculadora: sen(150°), cos(240°) e tan(315°), usando as relações com ângulos do 1º quadrante e os sinais de cada quadrante.']),

  createLesson('g2-mat-b1-l3', 'L3: Ângulos Notáveis e Identidades Fundamentais', 'matematica',
    'Os valores exatos para 30°, 45° e 60° (e seus múltiplos) são a base da trigonometria sem calculadora. A identidade fundamental sen²α + cos²α = 1 é derivada do Teorema de Pitágoras no círculo unitário. As identidades de complemento (sen(90°−α) = cosα) e de suplemento (sen(180°−α) = senα) permitem reduzir qualquer ângulo a um ângulo do 1º quadrante.',
    ['Calcule exatamente (sem calculadora): sen(120°) + cos(210°) − tan(315°). Mostre cada passo.', 'Usando apenas a identidade sen²α + cos²α = 1, deduza expressões para (1/sen²α) + (1/cos²α) e simplifique. Por que essa simplificação é útil em cálculo?']),

  createLesson('g2-mat-b1-l4', 'L4: Funções Trigonométricas — Seno e Cosseno (Gráfico e Propriedades)', 'matematica',
    'A função seno f(x) = sen(x) tem domínio ℝ, imagem [−1, 1], período 2π, é ímpar e contínua. A função cosseno g(x) = cos(x) tem as mesmas características, mas é par. A transformação f(x) = A·sen(Bx + C) + D altera: amplitude (A), período (2π/B), defasagem (C/B) e deslocamento vertical (D). Essas funções modelam todos os fenômenos ondulatórios.',
    ['Esboce f(x) = 2·sen(x) e g(x) = sen(2x) no mesmo plano, para x ∈ [0, 2π]. Qual é a diferença visual entre multiplicar a amplitude e multiplicar o argumento?', '(ENEM-estilo) A tensão elétrica em uma tomada brasileira varia como V(t) = 127√2·sen(120πt) Volts. Qual é o valor de pico (tensão máxima)? Qual é o período? Calcule a tensão no instante t = 1/240 segundo.']),

  createLesson('g2-mat-b1-l5', 'L5: Função Tangente — Gráfico, Período e Assíntotas', 'matematica',
    'A função tangente f(x) = tan(x) tem período π (metade do seno/cosseno), domínio ℝ − {π/2 + kπ} (excluindo os pontos onde cos = 0) e imagem ℝ. Suas assíntotas verticais ocorrem quando x = π/2 + kπ. A tangente cresce monotonicamente em cada intervalo de período e não é limitada. É muito usada em problemas de inclinação de retas e superfícies.',
    ['Para quais ângulos (em 0° a 360°) a tangente é: (a) igual a 1; (b) igual a −1; (c) indefinida?', 'A inclinação de uma rampa é medida pelo ângulo θ com a horizontal. Se tan(θ) = 0,15 (norma ABNT para rampas), qual é o ângulo θ? Se a rampa tem projeção horizontal de 3 m, qual é o desnível?']),

  createLesson('g2-mat-b1-l6', 'L6: Resolução de Triângulos — Teorema dos Senos', 'matematica',
    'O Teorema dos Senos: a/senA = b/senB = c/senC = 2R. É aplicado nos casos LAA (dois ângulos e qualquer lado) ou LLA (dois lados e ângulo oposto a um deles — atenção ao caso de ambiguidade). O teorema é indispensável em topografia, navegação e localização por triangulação — a mesma técnica usada por GPS.',
    ['Um helicóptero de resgate no Tocantins avista um incêndio com ângulo de 40° à esquerda e o piloto sabe que a base está a 120 km. O copiloto vê o incêndio com ângulo de 65° à direita. Calcule a distância do helicóptero ao incêndio.', 'Dois barcos partem de portos A e B distantes 80 km. O barco de A parte com ângulo de 55° em relação a AB; o de B com 70°. Qual é a distância entre cada barco e o ponto de encontro C? (Use Senos; sen55° ≈ 0,82; sen70° ≈ 0,94; sen55° = sen125°)']),

  createLesson('g2-mat-b1-l7', 'L7: Resolução de Triângulos — Teorema dos Cossenos', 'matematica',
    'O Teorema dos Cossenos: c² = a² + b² − 2ab·cosC. Casos de aplicação: LAL (dois lados e ângulo entre eles) e LLL (três lados para encontrar ângulos). Para o caso LLL, isolamos o cosseno: cosC = (a² + b² − c²)/(2ab). O teorema dos cossenos generaliza Pitágoras e é usado em geodésia, cartografia e problemas de vetores.',
    ['Dois lados de um terreno triangular medem 45 m e 60 m e o ângulo entre eles é 80°. Calcule o terceiro lado e a área do terreno. (cos80° ≈ 0,174; sen80° ≈ 0,985)', 'Um avião parte de Palmas, voa 500 km a N45°E e depois 350 km a N30°W. Usando o teorema dos cossenos, calcule a distância em linha reta de volta a Palmas.']),

  createLesson('g2-mat-b1-l8', 'L8: Área de Triângulos com Trigonometria', 'matematica',
    'A área de qualquer triângulo pode ser calculada como A = (1/2)·a·b·senC, onde a e b são dois lados e C é o ângulo entre eles. Combinada com o Teorema dos Cossenos, essa fórmula permite calcular áreas de terrenos irregulares a partir de medições de campo (dois lados e o ângulo entre eles). A Fórmula de Heron também permite calcular a área conhecendo apenas os três lados.',
    ['Calcule a área de um terreno triangular com lados 25 m e 40 m e ângulo entre eles de 70°. (sen70° ≈ 0,940)', '(ENEM-estilo) Uma propriedade rural tem formato triangular com lados 300 m, 450 m e o ângulo entre eles de 55°. Calcule a área em hectares. Se o produtor planta soja com produtividade de 3.500 kg/ha, qual é a produção esperada?']),

  createLesson('g2-mat-b1-l9', 'L9: Identidades Trigonométricas — Adição e Subtração de Arcos', 'matematica',
    'As fórmulas de adição: sen(A+B) = senA·cosB + cosA·senB; cos(A+B) = cosA·cosB − senA·senB. Essas fórmulas permitem calcular valores trigonométricos de ângulos como 15° e 75° (usando 45°−30° e 45°+30°). São fundamentais em processamento de sinais, análise de Fourier e circuitos elétricos.',
    ['Usando as fórmulas de adição, calcule exatamente sen(75°) e cos(15°). Verifique que os resultados são iguais. Por quê?', 'Derive a fórmula do cosseno duplo cos(2α) a partir de cos(α + α). Quantas formas diferentes essa identidade pode ser escrita usando a identidade fundamental?']),

  createLesson('g2-mat-b1-l10', 'L10: Fórmulas do Ângulo Duplo e Metade', 'matematica',
    'Do ângulo duplo: sen(2α) = 2·senα·cosα; cos(2α) = cos²α − sen²α = 1 − 2sen²α = 2cos²α − 1. Da metade: sen(α/2) = ±√((1−cosα)/2); cos(α/2) = ±√((1+cosα)/2). Essas fórmulas são usadas em física para decompor ondas, em engenharia elétrica e em demonstrações de cálculo diferencial.',
    ['Dado cosα = 4/5 (1º quadrante), calcule sen(2α) e cos(2α) usando as fórmulas do ângulo duplo.', 'Verifique a identidade sen(2α) = 2·senα·cosα para α = 30°. Por que essa fórmula é útil para calcular áreas de triângulos isósceles?']),

  createLesson('g2-mat-b1-l11', 'L11: Equações Trigonométricas Simples', 'matematica',
    'Uma equação trigonométrica é uma equação que envolve funções trigonométricas. A equação sen(x) = k tem solução real somente quando −1 ≤ k ≤ 1. Como as funções trigonométricas são periódicas, existem infinitas soluções — expressas como soluções gerais: x = α + 2kπ ou x = (π − α) + 2kπ, onde α é a solução principal. Em contextos práticos, buscamos soluções em um intervalo específico.',
    ['Resolva no intervalo [0°, 360°]: (a) sen(x) = √3/2; (b) cos(x) = −1/2; (c) tan(x) = 1.', 'O nível de um rio é modelado por h(t) = 3 + 2·sen(πt/6), onde h é em metros e t em meses. Em que meses o nível atinge 4 m? Resolva a equação trigonométrica.']),

  createLesson('g2-mat-b1-l12', 'L12: Equações Trigonométricas com Substituição', 'matematica',
    'Equações como 2sen²x − senx − 1 = 0 são resolvidas substituindo sen(x) = t, transformando-as em equações do 2º grau: 2t² − t − 1 = 0. Após encontrar t, resolve-se sen(x) = t. É essencial verificar se os valores encontrados para t estão no intervalo [−1, 1] (para seno e cosseno) antes de prosseguir.',
    ['Resolva 2cos²x − cosX − 1 = 0 no intervalo [0°, 360°]. (Dica: substitua cos(x) = t e resolva a equação do 2º grau.)', 'A potência dissipada em um circuito elétrico é P(t) = 2sen²(t) − 1 (em watts). Para quais instantes t (em [0, 2π]) a potência é zero? Resolva e interprete fisicamente.']),

  createLesson('g2-mat-b1-l13', 'L13: Funções Trigonométricas na Modelagem de Fenômenos', 'matematica',
    'Fenômenos periódicos são modelados pela forma geral y = A·sen(2πt/T + φ) + D, onde A é a amplitude, T é o período, φ é a fase inicial e D é o deslocamento vertical (valor médio). Para determinar os parâmetros a partir de dados observados: A = (máx − mín)/2, D = (máx + mín)/2, T = tempo de um ciclo completo.',
    ['As temperaturas médias mensais de Palmas variam entre 23°C (julho) e 31°C (outubro). Modele a temperatura como função senoidal T(m), onde m é o mês. Calcule T(1) e T(6).', '(ENEM-estilo) Uma boia no Rio Araguaia sobe e desce com as ondas. A altura máxima é 1,5 m e a mínima é 0,3 m, com período de 4 segundos. Escreva a função h(t) e calcule a altura no instante t = 1,5 s.']),

  createLesson('g2-mat-b1-l14', 'L14: Trigonometria e Vetores — Introdução', 'matematica',
    'Um vetor v⃗ com módulo |v⃗| e ângulo θ com o eixo x tem componentes: vₓ = |v⃗|·cosθ (horizontal) e vᵧ = |v⃗|·senθ (vertical). A decomposição vetorial é fundamental em física (forças, velocidades, campos elétricos) e em navegação (direção e velocidade do vento + velocidade de um avião = velocidade resultante).',
    ['Um avião voa com velocidade 600 km/h formando ângulo de 25° com a horizontal. Calcule as componentes horizontal e vertical da velocidade. (cos25° ≈ 0,906; sen25° ≈ 0,423)', 'Uma caixa de 50 kg repousa em um plano inclinado de 30°. Decompondo o peso (500 N) nas direções paralela e perpendicular ao plano, calcule a força de deslizamento. (sen30° = 0,5; cos30° = √3/2)']),

  createLesson('g2-mat-b1-l15', 'L15: Revisão de Funções Trigonométricas', 'matematica',
    'Nesta revisão consolidamos: seno, cosseno e tangente no círculo trigonométrico, valores notáveis, gráficos e propriedades, Teoremas dos Senos e Cossenos, equações trigonométricas e modelagem. Os erros mais comuns são: confundir período com amplitude, errar o quadrante na leitura do círculo, e esquecer de verificar todas as soluções no intervalo pedido.',
    ['Construa uma tabela completa com seno, cosseno e tangente de 0°, 30°, 45°, 60°, 90°, 120°, 135°, 150°, 180°. Identifique padrões de simetria.', 'Explique com um diagrama como o Teorema dos Senos é uma consequência do fato de que todos os triângulos inscritos em um mesmo círculo que compartilham um lado têm o mesmo ângulo oposto a esse lado.']),

  createLesson('g2-mat-b1-l16', 'L16: Trigonometria no ENEM — Problemas Contextualizados', 'matematica',
    'O ENEM aborda trigonometria principalmente em: (1) altura de edificações e relevos usando ângulos de elevação; (2) distâncias inacessíveis por triangulação; (3) fenômenos periódicos (energia solar, temperatura, sons); (4) inclinações de estradas e rampas. A chave é desenhar o triângulo, identificar os dados e escolher Senos, Cossenos ou razões simples.',
    ['(ENEM 2019 adaptado) Uma usina solar em Palmas posiciona seus painéis com inclinação de 15° para maximizar a captação. Se cada painel tem 1,6 m de comprimento, qual é a altura da extremidade superior em relação ao solo? Use sen15° = (√6−√2)/4 ≈ 0,259.', 'Um levantamento topográfico mede o ângulo de elevação do topo de uma colina do Jalapão como 22° a partir de um ponto a 500 m da base. Calcule a altura da colina. (tan22° ≈ 0,404)']),

  createLesson('g2-mat-b1-l17', 'L17: Trigonometria Aplicada à Astronomia e Geolocalização', 'matematica',
    'Antes do GPS, os navegadores usavam trigonometria para calcular posições: a lei dos senos permitia a triangulação a partir de dois pontos conhecidos. Hoje, o GPS usa 4 satélites e trigonometria esférica (extensão para a superfície da Terra). A latitude e longitude são ângulos, e calcular distâncias na superfície terrestre requer a "Lei dos Cossenos Esférica".',
    ['A distância angular entre duas cidades (medida a partir do centro da Terra) é 30°. O raio da Terra é 6.371 km. Calcule a distância real entre elas ao longo da superfície (arco = r·θ com θ em radianos).', 'Explique por que um GPS precisa de pelo menos 4 satélites para determinar a posição (latitude, longitude, altitude, tempo) de forma precisa. Qual é o papel da trigonometria nesse processo?']),

  createLesson('g2-mat-b1-l18', 'L18: Síntese do Bimestre — Trigonometria Completa', 'matematica',
    'Neste bimestre dominamos a trigonometria em sua forma completa: razões em qualquer quadrante, funções trigonométricas e seus gráficos, Teoremas dos Senos e Cossenos, identidades, equações e modelagem de fenômenos periódicos. A trigonometria é uma das áreas de maior aplicação prática da matemática do Ensino Médio e é intensamente cobrada no ENEM e em vestibulares de ciências exatas.',
    ['Crie uma "linha do tempo" da trigonometria: desde as razões no triângulo retângulo (1ª série) até as funções e equações (2ª série). Quais foram os principais "saltos" conceituais ao longo dessa progressão?', 'Escolha um fenômeno natural ou tecnológico que ocorre no Tocantins (cheia do Araguaia, energia solar, vento na chapada) e modele-o completamente usando uma função trigonométrica, incluindo a determinação dos parâmetros a partir de dados reais.']),
];

export const matLessonsB2: Lesson[] = [
  createLesson('g2-mat-b2-l1', 'L1: Sequências e Progressões — Introdução', 'matematica',
    'Uma sequência é uma lista ordenada de números (termos) seguindo um padrão. A posição de cada termo é indicada por um índice n. Uma progressão é uma sequência com lei de formação definida. Sequências aparecem em padrões da natureza (espiral da concha = sequência de Fibonacci), em música (temperamento igual = progressão geométrica) e em finanças.',
    ['Identifique a lei de formação e calcule os próximos 3 termos: (a) 2, 5, 8, 11, ...; (b) 3, 6, 12, 24, ...; (c) 1, 1, 2, 3, 5, 8, ...', 'A sequência de Fibonacci (1, 1, 2, 3, 5, 8, 13, ...) aparece em flores, conchas e pinhas. Pesquise e explique por que padrões da natureza seguem essa sequência.']),

  createLesson('g2-mat-b2-l2', 'L2: Progressão Aritmética — Definição e Termo Geral', 'matematica',
    'Uma PA (progressão aritmética) é uma sequência em que a diferença entre termos consecutivos é constante — a razão r. O termo geral é aₙ = a₁ + (n−1)·r. A PA modela situações de crescimento ou diminuição constante: folhas de salário com aumento fixo, queda de temperatura constante, distância percorrida em movimento uniforme.',
    ['Determine a razão e o 20º termo da PA: 3, 7, 11, 15, ...', '(Contexto) Uma escada tem degraus com alturas formando PA: o 1º tem 17 cm e o 15º tem 17 cm também (degraus iguais). Se o piso é nivelado, qual é o termo geral e a altura total da escada com 15 degraus?']),

  createLesson('g2-mat-b2-l3', 'L3: Soma dos Termos de uma PA', 'matematica',
    'A soma dos n primeiros termos de uma PA é Sₙ = n·(a₁ + aₙ)/2 = n·(2a₁ + (n−1)r)/2. Essa fórmula foi descoberta por Gauss ainda criança ao somar os números de 1 a 100. A soma de PA é usada em cálculo de salários acumulados, metros de cerca em terrenos escalonados, e quilômetros percorridos com aceleração constante.',
    ['Calcule a soma dos 50 primeiros termos naturais ímpares (1 + 3 + 5 + ... + 99). Verifique usando a fórmula de Gauss.', '(ENEM-estilo) Um funcionário começa com salário de R$ 2.500,00 e recebe aumento de R$ 150,00 por ano. Qual será o salário no 10º ano? Qual é o total recebido nos primeiros 10 anos de trabalho?']),

  createLesson('g2-mat-b2-l4', 'L4: Progressão Geométrica — Definição e Termo Geral', 'matematica',
    'Uma PG (progressão geométrica) é uma sequência em que a razão entre termos consecutivos é constante — a razão q. O termo geral é aₙ = a₁·qⁿ⁻¹. A PG modela crescimento exponencial (população de bactérias, juros compostos) e decrescimento exponencial (desintegração radioativa, depreciação de equipamentos). É a estrutura matemática por trás da maioria dos fenômenos multiplicativos.',
    ['Determine a razão e o 8º termo da PG: 2, 6, 18, 54, ...', '(Contexto) Uma cultura de bactérias dobra a cada hora. Começando com 500 bactérias, modele como PG e calcule a quantidade após 12 horas. Em que hora a população ultrapassa 1 milhão?']),

  createLesson('g2-mat-b2-l5', 'L5: Soma dos Termos de uma PG', 'matematica',
    'A soma dos n primeiros termos de uma PG (q ≠ 1) é Sₙ = a₁·(qⁿ − 1)/(q − 1). Para q = 1, todos os termos são iguais e Sₙ = n·a₁. A soma da PG infinita com |q| < 1 é S∞ = a₁/(1 − q) — usada para calcular dívidas infinitamente parceladas, distâncias percorridas por bolas quicando e ondas amortecidas.',
    ['Calcule a soma dos 6 primeiros termos da PG: 4, 12, 36, 108, ...', '(Clássico) Uma bola é largada de 8 m de altura e quica voltando a 3/4 da altura anterior. Qual é a distância total percorrida pela bola (subindo + descendo) até parar? Use a soma da PG infinita.']),

  createLesson('g2-mat-b2-l6', 'L6: Interpolação Aritmética e Geométrica', 'matematica',
    'Interpolar meios aritméticos entre dois termos significa inserir termos que formem uma PA. Interpolar meios geométricos significa inserir termos que formem uma PG. Para inserir k meios aritméticos entre a e b: r = (b − a)/(k + 1). Para geométricos: q = (b/a)^(1/(k+1)). A interpolação é usada em afinação de instrumentos musicais (12 meios geométricos entre oitavas) e em tabelas de logaritmos.',
    ['Insira 4 meios aritméticos entre 8 e 33. Escreva a PA completa.', 'Insira 2 meios geométricos entre 4 e 108. Escreva a PG completa e calcule o produto de todos os termos.']),

  createLesson('g2-mat-b2-l7', 'L7: Juros Compostos — PG na Prática Financeira', 'matematica',
    'O montante em regime de juros compostos é M = C·(1 + i)ⁿ — que é exatamente o termo geral de uma PG com razão q = (1 + i). Juros compostos são o padrão do sistema financeiro: poupança, financiamentos, cartão de crédito, dívida pública. Entender juros compostos é uma habilidade de cidadania financeira indispensável para o brasileiro.',
    ['R$ 5.000,00 são investidos a 1,5% ao mês em juros compostos. Qual é o montante após 12 meses? Qual foi o juro total? Compare com o resultado em juros simples.', '(ENEM-estilo) Um celular custa R$ 2.400,00 à vista ou em 12 parcelas com taxa de 3% ao mês. Calcule o valor de cada parcela usando a fórmula de juros compostos M = C(1+i)ⁿ e diga o quanto a mais o consumidor paga no crédito.']),

  createLesson('g2-mat-b2-l8', 'L8: Logaritmos — Definição e Propriedades Básicas', 'matematica',
    'O logaritmo é o expoente: log_b(x) = y significa bʸ = x. É a operação inversa da exponenciação. Propriedades fundamentais: log(a·b) = log(a) + log(b); log(a/b) = log(a) − log(b); log(aᵖ) = p·log(a). Logaritmos naturais (base e) e decimais (base 10) são usados em ciência, engenharia, escala Richter, escala de decibéis e pH de substâncias.',
    ['Calcule sem calculadora: log₂(32); log₃(81); log₅(1/25); log₁₀(1000).', '(ENEM-estilo) A escala Richter de terremotos usa logaritmos: cada grau aumenta a intensidade 10 vezes. Um terremoto de magnitude 7 é quantas vezes mais intenso que um de magnitude 5? Mostre o cálculo usando propriedades do logaritmo.']),

  createLesson('g2-mat-b2-l9', 'L9: Função Exponencial — Gráfico e Propriedades', 'matematica',
    'A função exponencial f(x) = bˣ (b > 0, b ≠ 1) tem domínio ℝ, imagem (0, +∞), intercepta o eixo y em (0, 1) e é sempre positiva. Para b > 1, é crescente (crescimento exponencial); para 0 < b < 1, é decrescente (decaimento). O número de Euler e ≈ 2,718 é a base mais natural para fenômenos contínuos.',
    ['Esboce no mesmo plano: f(x) = 2ˣ e g(x) = (1/2)ˣ. Quais são as semelhanças e diferenças? O que acontece quando x → ∞ em cada caso?', 'O PIB do Brasil cresceu a uma taxa média de 2,5% ao ano. Modelando como f(t) = f₀·(1,025)ᵗ, após quantos anos o PIB dobra? (Dica: use logaritmo para resolver a equação exponencial.)']),

  createLesson('g2-mat-b2-l10', 'L10: Função Logarítmica — Gráfico e Propriedades', 'matematica',
    'A função logarítmica f(x) = log_b(x) é a inversa da exponencial: seu gráfico é o reflexo da exponencial em relação à reta y = x. Domínio: (0, +∞); imagem: ℝ; passa pelo ponto (1, 0). Para b > 1, é crescente; para 0 < b < 1, é decrescente. Logaritmos comprimem escalas enormes: o volume do universo e o tamanho de um próton diferem por 80 ordens de magnitude — manejáveis com log.',
    ['Esboce f(x) = log₂(x) e g(x) = 2ˣ no mesmo plano e verifique visualmente que são funções inversas (simétricas em relação a y = x).', 'O pH de uma solução é pH = −log[H⁺]. O pH do café é 5 e do suco de limão é 2. Quantas vezes o suco de limão é mais ácido que o café? Expresse a resposta em termos de concentração de H⁺.']),

  createLesson('g2-mat-b2-l11', 'L11: Equações Exponenciais', 'matematica',
    'Uma equação exponencial tem a incógnita no expoente: 2ˣ = 32. Estratégias: (1) igualar as bases (2ˣ = 2⁵ → x = 5); (2) aplicar logaritmo em ambos os lados (bˣ = c → x = log_b(c) = log(c)/log(b)). A mudança de base log_b(a) = log(a)/log(b) permite calcular qualquer logaritmo com a calculadora usando apenas log₁₀.',
    ['Resolva: (a) 3ˣ = 81; (b) 4ˣ = 8 (escreva como potências de 2); (c) 5ˣ = 200 (use log₁₀; log2 ≈ 0,301; log5 ≈ 0,699).', '(Contexto) Um capital C dobra em juros compostos quando (1+i)ⁿ = 2. Se a taxa é 8% ao ano (i = 0,08), após quantos anos o capital dobra? Use log(2) ≈ 0,301 e log(1,08) ≈ 0,033.']),

  createLesson('g2-mat-b2-l12', 'L12: Equações Logarítmicas', 'matematica',
    'Equações logarítmicas têm a incógnita no argumento do logaritmo: log₂(x+1) = 3 → x+1 = 2³ → x = 7. É SEMPRE necessário verificar se a solução encontrada torna o argumento positivo (condição de existência do logaritmo). Equações logarítmicas aparecem em problemas de crescimento, decaimento e análise de dados exponenciais.',
    ['Resolva e verifique a condição de existência: (a) log₃(x−2) = 2; (b) log(x) + log(x+3) = 1; (c) log₂(x²−9) = log₂(7x−23).', 'Em quanto tempo uma substância radioativa de meia-vida 5.730 anos (carbono-14) se reduzirá a 10% da quantidade original? Use a equação 0,1 = (1/2)^(t/5730) e resolva com logaritmos.']),

  createLesson('g2-mat-b2-l13', 'L13: PA, PG e Logaritmos — Conexões e Problemas', 'matematica',
    'PA e PG se conectam via logaritmo: se uma PG tem termos em progressão geométrica, seus logaritmos formam uma PA. Isso significa que escala logarítmica transforma crescimento exponencial em crescimento linear — por isso papel milimetrado logarítmico é usado para visualizar dados de populações, economias e fenômenos exponenciais.',
    ['Prove que se a, b, c estão em PG, então log(a), log(b), log(c) estão em PA. (Dica: mostre que log(b) − log(a) = log(c) − log(b).)', '(ENEM-estilo) Um gráfico mostra o crescimento da dívida pública numa escala logarítmica. O eixo y vai de 10⁹ a 10¹³. Se a dívida quadruplica a cada 5 anos, qual é a taxa de crescimento anual? Modele com PG e use logaritmos.']),

  createLesson('g2-mat-b2-l14', 'L14: Aplicações Financeiras — Financiamentos e Parcelas', 'matematica',
    'O cálculo de parcelas fixas de um financiamento usa a fórmula Price: PMT = PV·i/(1−(1+i)^(−n)), onde PV é o valor presente, i é a taxa mensal e n é o número de parcelas. Essa fórmula combina PG e logaritmos. Entender financiamentos é essencial para o cidadão brasileiro: casa própria, carro, empréstimos e cartão de crédito.',
    ['Calcule o valor de cada parcela mensal para financiar R$ 60.000,00 em 36 meses a 1,2% ao mês. Use a fórmula Price. (1,012)^(−36) ≈ 0,648.', '(ENEM-estilo) Uma família ganha R$ 4.000,00/mês e quer financiar um imóvel de R$ 250.000,00 em 240 meses a 0,8% a.m. Calcule a parcela inicial pelo sistema SAC (amortização = 250.000/240) e o total pago ao final do financiamento.']),

  createLesson('g2-mat-b2-l15', 'L15: Revisão de PA, PG, Logaritmos e Exponenciais', 'matematica',
    'Nesta revisão conectamos os quatro temas do bimestre: PA (crescimento linear), PG (crescimento exponencial), exponencial (modelagem contínua) e logaritmo (inverso, compressão de escala). O erro mais comum é aplicar fórmulas de PA em situações de PG — identificar o tipo de progressão (diferença constante × razão constante) é a habilidade central.',
    ['Dado um capital que cresce seguindo PA de razão R$200/mês começando com R$1.000, e outro seguindo PG de razão 1,02/mês começando com R$1.000: após 24 meses, qual é maior? Calcule e compare os dois crescimentos.', 'Construa uma tabela comparativa: PA vs. PG vs. Juros Simples vs. Juros Compostos. Para cada um, dê: lei de formação, tipo de crescimento, gráfico (esboço) e um exemplo de aplicação real no Brasil.']),

  createLesson('g2-mat-b2-l16', 'L16: Problemas Integrados — PA, PG e Finanças', 'matematica',
    'O ENEM e os vestibulares frequentemente combinam PA e PG em contextos financeiros e científicos. A habilidade chave é reconhecer o tipo de crescimento na situação descrita. Crescimento por adição constante → PA. Crescimento por multiplicação constante → PG/exponencial. Depois disso, a escolha da fórmula é direta.',
    ['Uma empresa começa com 50 funcionários e contrata 10 a cada ano (PA). Outra começa com 50 e cresce 15% ao ano (PG). Após 10 anos, qual tem mais funcionários? Em que ano a PG ultrapassa a PA?', '(ENEM-estilo) O desmatamento no Cerrado tocantinense reduziu de 800.000 ha em 2000 para uma fração em 2020, seguindo uma redução de 4% ao ano. Qual a área desmatada em 2020? Use PG com q = 0,96 e log(0,96) ≈ −0,018.']),

  createLesson('g2-mat-b2-l17', 'L17: Logaritmos no ENEM — Escala, Decibéis, pH e Richter', 'matematica',
    'O ENEM adora logaritmos em contextos de escala: decibéis de som (L = 10·log(I/I₀)), escala Richter de terremotos, pH de soluções químicas e crescimento de populações. Em todos os casos, a lógica é a mesma: o logaritmo converte razões multiplicativas em diferenças aditivas, tornando grandezas imensamente variáveis em números manejáveis.',
    ['(ENEM) Um som de 70 dB é quantas vezes mais intenso que um de 50 dB? Use L = 10·log(I/I₀) e resolva algebricamente.', 'O pH do sangue é 7,4 e de uma solução ácida é 4,4. Quantas vezes a concentração de H⁺ na solução é maior que no sangue? (pH = −log[H⁺]; use as propriedades do logaritmo.)']),

  createLesson('g2-mat-b2-l18', 'L18: Síntese do Bimestre — PA, PG, Exponencial e Logaritmo', 'matematica',
    'O 2º bimestre da 2ª série é talvez o mais aplicado de todo o Ensino Médio: PA e PG modelam crescimentos, juros compostos são presença constante na vida financeira, e logaritmos aparecem em ciência, medicina, engenharia e economia. Dominar esses conteúdos significa ter uma ferramenta de leitura do mundo que a maioria das pessoas não possui.',
    ['Monte um "kit de sobrevivência financeira" usando PA, PG e logaritmos: (a) como calcular se uma dívida com juros compostos vai ou não ser possível pagar; (b) como comparar aplicações diferentes; (c) quanto tempo para dobrar um capital a determinada taxa.', 'Escreva um texto de 1 página conectando PA, PG, exponencial e logaritmo em um único contexto narrativo (sugestão: a história de crescimento de uma empresa brasileira desde uma startup até uma grande corporação, passando por fases diferentes de crescimento).']),
];

export const matLessonsB3: Lesson[] = [
  createLesson('g2-mat-b3-l1', 'L1: Geometria Espacial — Introdução e Poliedros', 'matematica',
    'A geometria espacial estuda figuras tridimensionais. Um poliedro é um sólido limitado por faces planas (polígonos). Os elementos de um poliedro são: faces (F), arestas (A) e vértices (V). O Teorema de Euler para poliedros convexos: F + V − A = 2 (por exemplo, cubo: 6 + 8 − 12 = 2). Essa relação topológica é válida para todos os poliedros convexos.',
    ['Verifique o Teorema de Euler para o cubo (6 faces, 8 vértices, 12 arestas), o tetraedro (4F, 4V, 6A) e o dodecaedro (12F, 20V, 30A).', 'Um poliedro tem 10 faces e 15 arestas. Quantos vértices ele tem? Usando o Teorema de Euler, é possível construir esse poliedro?']),

  createLesson('g2-mat-b3-l2', 'L2: Sólidos de Platão e Poliedros Regulares', 'matematica',
    'Existem exatamente 5 poliedros regulares (todos as faces são polígonos regulares iguais): tetraedro (4 faces triangulares), cubo (6 quadradas), octaedro (8 triangulares), dodecaedro (12 pentagonais) e icosaedro (20 triangulares). Platão os associava aos elementos (fogo, terra, ar, éter, água). Na ciência moderna, vírus, fulerenos (moléculas de carbono C₆₀) e cristais têm essas formas.',
    ['Por que existem apenas 5 poliedros regulares? Investigue a condição: soma dos ângulos nos vértices deve ser menor que 360°. Quais combinações de polígonos regulares satisfazem essa condição?', 'A molécula C₆₀ (Buckminster Fulereno) tem a forma de um icosaedro truncado com 60 vértices, 90 arestas e 32 faces (12 pentagonais + 20 hexagonais). Verifique o Teorema de Euler e pesquise suas aplicações tecnológicas.']),

  createLesson('g2-mat-b3-l3', 'L3: Prismas — Área e Volume', 'matematica',
    'Um prisma tem duas bases paralelas e iguais (polígonos) e faces laterais retangulares (prisma reto) ou paralelogramas (oblíquo). Volume = Área da base × altura (V = Abase·h). Área lateral = Perímetro da base × altura. Área total = 2·Abase + Alateral. Prismas são a forma de embalagens, caixas d\'água, vigas de construção e aquários.',
    ['Uma caixa d\'água prismática de base quadrada com lado 1,2 m e altura 1,5 m precisa ser pintada por fora (exceto o fundo). Calcule a área a ser pintada e o volume de água que comporta em litros (1 m³ = 1.000 L).', '(ENEM-estilo) Uma empresa de sucos do Tocantins embala açaí em caixinhas prismáticas triangulares (base triângulo equilátero de lado 6 cm e altura 12 cm). Calcule o volume de cada embalagem e quantas delas cabem em uma caixa de 30 cm × 36 cm × 24 cm.']),

  createLesson('g2-mat-b3-l4', 'L4: Pirâmides — Área e Volume', 'matematica',
    'Uma pirâmide tem uma base poligonal e faces laterais triangulares que convergem para o vértice (ápice). Volume = (1/3)·Abase·h. Área lateral = soma das áreas dos triângulos laterais. A apótema da pirâmide (altura de uma face lateral) é diferente da altura da pirâmide. Pirâmides aparecem em monumentos históricos, embalagens, estruturas de telhados e cristais naturais.',
    ['Calcule o volume e a área total de uma pirâmide quadrada regular com base de 8 m e altura de 6 m. Qual é a apótema da pirâmide? (Use Pitágoras: apótema = √(h² + (l/2)²))', '(ENEM) A Grande Pirâmide de Gizé tem base quadrada com lado 230 m e altura original de 146 m. Calcule seu volume. Se toda a rocha fosse transformada em cubos de 1 m³, e cada cubo pesasse 2,7 toneladas, qual seria a massa total?']),

  createLesson('g2-mat-b3-l5', 'L5: Cilindros — Área e Volume', 'matematica',
    'O cilindro circular reto tem duas bases circulares com raio r e altura h. Volume = πr²h. Área lateral = 2πrh. Área total = 2πr² + 2πrh = 2πr(r + h). Cilindros são a forma mais eficiente para armazenar líquidos e gases sob pressão: latas de bebida, botijões de gás, tubulações e silos de grãos.',
    ['Uma lata de leite condensado tem raio 3,5 cm e altura 11 cm. Calcule o volume (em mL) e a área total de alumínio. Se o alumínio custa R$ 0,02/cm², qual é o custo de material da lata?', 'Uma cisterna cilíndrica para captação de água da chuva tem 80 cm de diâmetro e 1,2 m de altura. Qual é sua capacidade em litros? Uma família usa 50 L/dia. Para quantos dias de seca ela fornece água?']),

  createLesson('g2-mat-b3-l6', 'L6: Cones — Área e Volume', 'matematica',
    'O cone circular reto tem base circular (raio r), vértice e geratriz (g = √(r² + h²), pela relação de Pitágoras). Volume = (1/3)πr²h. Área lateral = πrg. Área total = πr² + πrg = πr(r + g). Cones aparecem em funis, sorvetes, chapéus, silos côncavos e na modelagem de montanhas.',
    ['Um cone de sorvete tem raio de 3 cm e altura de 12 cm. Calcule o volume de sorvete que cabe dentro e a área lateral (para calcular o material do cone). (g = √(9 + 144) = √153 ≈ 12,37 cm)', 'Um silo cônico para armazenamento de grãos tem raio de base 4 m e geratriz de 5 m. Calcule a altura, o volume de grãos que comporta e a área da lona lateral. (h = √(g² − r²))']),

  createLesson('g2-mat-b3-l7', 'L7: Esfera — Área e Volume', 'matematica',
    'A esfera é o conjunto de pontos no espaço equidistantes de um centro, a distância r. Área da superfície = 4πr². Volume = (4/3)πr³. A esfera é o sólido que maximiza o volume para uma dada área de superfície — por isso bolhas de sabão, planetas e gotas d\'água tendem a ser esféricas. A razão volume/área é mínima na esfera.',
    ['A Terra tem raio médio de 6.371 km. Calcule sua área superficial e seu volume. Se a superfície de água é 71% da área total, qual é a área oceânica em km²?', '(ENEM-estilo) Uma bola de futebol tem circunferência de 68 cm. Calcule o raio, a área superficial e o volume. Quantas bolas de pingue-pongue (raio 2 cm) cabem dentro de uma caixa com volume igual ao da bola de futebol?']),

  createLesson('g2-mat-b3-l8', 'L8: Sólidos Inscritos e Circunscritos', 'matematica',
    'Um sólido inscrito toca todas as faces do sólido que o contém (esfera inscrita no cubo toca todas as faces). Um sólido circunscrito passa por todos os vértices do sólido interno (esfera circunscrita ao cubo passa por todos os vértices). As relações entre os raios e as dimensões do sólido são calculadas com Pitágoras. Essas relações aparecem em problemas de otimização e embalagens.',
    ['Calcule o raio da esfera inscrita em um cubo de aresta 6 cm e o raio da esfera circunscrita ao mesmo cubo. (Inscrita: r = a/2; circunscrita: R = a√3/2)', 'Uma embalagem cilíndrica deve conter uma bola esférica de raio 5 cm exatamente (a bola toca a base, o topo e a lateral). Calcule as dimensões do cilindro e a fração do volume do cilindro que a esfera ocupa.']),

  createLesson('g2-mat-b3-l9', 'L9: Geometria das Embalagens — Otimização', 'matematica',
    'Otimização de embalagens busca minimizar o material usado (área) para um dado volume, ou maximizar o volume para uma quantidade fixa de material. Para um cilindro com volume fixo V, a proporção que minimiza a área é h = 2r (altura = diâmetro). Para uma caixa de volume fixo, o cubo minimiza a área. Empresas de alimentos investem em pesquisa matemática para reduzir custos de embalagem.',
    ['Uma lata cilíndrica deve ter volume de 500 mL. Quais dimensões (r e h) minimizam a área total? (Condição ótima: h = 2r; use V = πr²h para encontrar r.)', '(ENEM-estilo) Uma empresa produz caixas de papelão quadradas (base a × a, altura h) com volume fixo de 1.000 cm³. Escreva a área total em função de a, encontre o mínimo e conclua qual caixa usa menos papelão.']),

  createLesson('g2-mat-b3-l10', 'L10: Planificação de Sólidos', 'matematica',
    'A planificação é o processo de "desdobrar" um sólido no plano. A planificação do cilindro gera dois círculos e um retângulo (cuja largura é a circunferência da base). A planificação do cone gera um círculo e um setor circular. A planificação de prismas e pirâmides gera polígonos. Planificações são usadas no design de embalagens, origami arquitetônico e em corte e dobra de chapas metálicas.',
    ['Planifique uma caixa de leite de 1 litro (prisma de base quadrada 7 cm × 7 cm, altura 20 cm). Calcule a área total da planificação — esse é o material usado para fazer a embalagem.', 'Um artesão de Porto Nacional cria chapéus cônicos de palha de buriti. O chapéu tem raio 20 cm e altura 30 cm. Calcule a geratriz e a área do setor circular que forma o chapéu. Qual ângulo tem esse setor?']),

  createLesson('g2-mat-b3-l11', 'L11: Cavalete de Kepler e Relações entre Sólidos', 'matematica',
    'Johannes Kepler descobriu que as razões entre os volumes de sólidos semelhantes são iguais ao cubo da razão de semelhança: V₂/V₁ = (k)³. Para áreas, a razão é k². Isso tem consequências práticas: se um sólido tem dimensões dobradas, seu volume é 8 vezes maior, mas sua área é apenas 4 vezes. Essa relação explica por que elefantes têm pernas mais grossas proporcionalmente que formigas.',
    ['Uma caixa tem volume 8 litros. Uma caixa semelhante com dimensões o dobro — qual é o seu volume?', 'Dois tanques cilíndricos são semelhantes. O menor tem raio 2 m e altura 3 m. O maior tem raio 4 m. Calcule a razão de semelhança, o volume do maior e compare as áreas laterais.']),

  createLesson('g2-mat-b3-l12', 'L12: Tronco de Pirâmide e Tronco de Cone', 'matematica',
    'O tronco de pirâmide é a parte da pirâmide entre a base e um corte paralelo à base. Volume = (h/3)·(Abase_grande + Abase_pequena + √(Abase_grande·Abase_pequena)). O tronco de cone segue a mesma fórmula com as áreas das bases circulares. Esses sólidos aparecem em taças, vasos, funis, estruturas de barragens e cortes de pedras preciosas.',
    ['Um tronco de cone tem raios de 6 cm e 3 cm e altura de 8 cm. Calcule seu volume. (V = πh(R² + Rr + r²)/3)', 'Uma barragem de terra tem seção transversal em forma de tronco de pirâmide. A base inferior mede 40 m × 200 m, a superior mede 10 m × 200 m e a altura é 20 m. Calcule o volume de terra escavada.']),

  createLesson('g2-mat-b3-l13', 'L13: Geometria Espacial no ENEM — Problemas Contextualizados', 'matematica',
    'O ENEM apresenta geometria espacial em contextos como: (1) capacidade de reservatórios (caixas d\'água, silos, tanques); (2) embalagens e custos de material; (3) obras de arte e monumentos; (4) problemas ambientais (volume de lixo, aterros). A habilidade é identificar qual sólido modela o problema, extrair os dados relevantes e calcular com as fórmulas corretas.',
    ['(ENEM) Uma cisterna subterrânea cilíndrica de raio 2 m e profundidade 3 m vai ser revestida internamente com argamassa impermeável (exceto o fundo). Calcule a área a ser revestida e o custo, sabendo que cada m² de argamassa custa R$ 85,00.', 'Um aterro sanitário de Palmas vai receber lixo em uma vala em formato de prisma trapezoidal (bases 10 m e 20 m, altura 5 m, comprimento 100 m). Calcule o volume total e, se cada caminhão leva 8 m³ de lixo, quantos caminhões por dia podem depositar para encher em 30 dias.']),

  createLesson('g2-mat-b3-l14', 'L14: Vetores no Espaço e Coordenadas 3D', 'matematica',
    'No espaço 3D, um ponto é representado por (x, y, z). A distância entre dois pontos A(x₁,y₁,z₁) e B(x₂,y₂,z₂) é d = √((x₂−x₁)² + (y₂−y₁)² + (z₂−z₁)²). Um vetor no espaço tem três componentes. O ponto médio é M = ((x₁+x₂)/2, (y₁+y₂)/2, (z₁+z₂)/2). Coordenadas 3D são a base da modelagem computacional, jogos e design industrial.',
    ['Calcule a distância entre A(1, 2, 3) e B(4, 6, 3). Qual é o ponto médio M de AB?', 'Em um videogame, um personagem está na posição (10, 5, 2) e o objetivo está em (−2, 9, 6). Calcule a distância direta (em linha reta no espaço 3D) entre o personagem e o objetivo.']),

  createLesson('g2-mat-b3-l15', 'L15: Revisão de Geometria Espacial — Sólidos', 'matematica',
    'Revisão integrada dos sólidos: prisma, pirâmide, cilindro, cone e esfera. Para cada um, reforçamos: as fórmulas de área e volume, como derivá-las (ao invés de apenas memorizá-las), e os contextos do ENEM em que aparecem. Uma estratégia eficaz: para cada sólido, esboce a figura, identifique os elementos (raio, altura, apótema, geratriz) e só depois aplique a fórmula.',
    ['Monte uma tabela-resumo com: sólido, fórmula de volume, fórmula de área total, relação entre elementos (ex.: geratriz do cone pelo Pitágoras), e um exemplo de objeto real.', 'Resolva: uma piscina tem formato de prisma trapezoidal (profundidade varia de 1 m a 2,5 m, largura 6 m, comprimento 15 m). Calcule o volume em m³ e o tempo para enchê-la com uma bomba de 2.000 L/min.']),

  createLesson('g2-mat-b3-l16', 'L16: Problemas Integrados de Geometria Espacial', 'matematica',
    'Problemas integrados combinam dois ou mais sólidos: uma pirâmide sobre um prisma (tipo obelisco), uma esfera dentro de um cilindro, ou uma combinação de formas para descrever um objeto real. A habilidade é decompor o problema, calcular cada parte separadamente e combinar os resultados. Sempre verificar: a resposta tem sentido prático?',
    ['Um silo agrícola no Cerrado tem formato de cilindro com cone na parte superior. O cilindro tem raio 3 m e altura 8 m; o cone tem mesma base e altura 2 m. Calcule o volume total de grãos armazenados.', '(ENEM-estilo) Um pote de mel tem formato de cilindro com tampa hemisférica (meia esfera). O cilindro tem raio 4 cm e altura 10 cm. Calcule o volume total e a área externa do pote (área lateral do cilindro + área da base circular + área da semiesfera).']),

  createLesson('g2-mat-b3-l17', 'L17: Geometria Espacial e Construção Civil no Tocantins', 'matematica',
    'A geometria espacial é o coração da engenharia civil. Na construção de casas populares no Tocantins, calcula-se: volume de concreto para a laje (prisma), volume de tijolos para as paredes, volume de areia e cimento para o reboco, e área de telhado (prisma ou pirâmide). O engenheiro que domina geometria espacial economiza material e evita desperdício.',
    ['Projete uma casa simples: planta de 6 m × 8 m, paredes de 3 m de altura e 0,15 m de espessura. Calcule: (a) volume de concreto para a laje de 10 cm; (b) área de parede externa a ser pintada; (c) volume interno da casa.', 'O telhado de uma residência é um prisma triangular com base 8 m e inclinação de 25°. Calcule a altura do telhado, a área de cada face triangular e o comprimento total de madeira para as vigas ao longo do comprimento de 10 m.']),

  createLesson('g2-mat-b3-l18', 'L18: Síntese do Bimestre — Geometria Espacial', 'matematica',
    'A geometria espacial transformou nossa relação com o espaço tridimensional. Saber calcular volumes e áreas de sólidos é essencial em engenharia, arquitetura, medicina (volume de órgãos, tumores), indústria (embalagens, peças) e meio ambiente (volume de reservatórios, barragens, aterros). O Tocantins, com sua rica geografia (chapadas, serras, rios), é um laboratório natural para essas aplicações.',
    ['Projete uma caixa d\'água para atender 10 famílias por 3 dias (consumo de 200 L/família/dia). Escolha o formato (cilíndrico ou prismático), calcule as dimensões e justifique sua escolha em termos de eficiência de material.', 'Pesquise as dimensões da Usina Hidrelétrica de Tucuruí (reservatório, barragem, vertedouro) e calcule aproximadamente o volume de água armazenado. Relate os impactos ambientais e sociais dessa usina usando dados matemáticos.']),
];

export const matLessonsB4: Lesson[] = [
  createLesson('g2-mat-b4-l1', 'L1: Matrizes — Definição, Notação e Tipos', 'matematica',
    'Uma matriz é uma tabela retangular de números dispostos em m linhas e n colunas, denotada como A_(m×n). O elemento aᵢⱼ está na i-ésima linha e j-ésima coluna. Tipos principais: quadrada (m = n), linha (m = 1), coluna (n = 1), nula (todos zeros), identidade (I: diagonal principal = 1, resto = 0), simétrica (aᵢⱼ = aⱼᵢ). Matrizes são a linguagem dos sistemas lineares, da computação gráfica e da inteligência artificial.',
    ['Classifique as matrizes a seguir pelo tipo e escreva os elementos a₁₂, a₂₃ e a₃₁ (quando existirem): (a) [[1,2,3],[4,5,6],[7,8,9]]; (b) [[1,0],[0,1]]; (c) [[5]]', 'Na computação gráfica, uma imagem de 1920×1080 pixels é representada como três matrizes (R, G, B) com valores de 0 a 255. Qual é a ordem de cada matriz? Quantos valores numéricos são armazenados no total?']),

  createLesson('g2-mat-b4-l2', 'L2: Operações com Matrizes — Adição e Subtração', 'matematica',
    'Só é possível somar/subtrair matrizes de mesma ordem. A soma é feita elemento a elemento: (A + B)ᵢⱼ = aᵢⱼ + bᵢⱼ. A adição é comutativa (A + B = B + A) e associativa. A multiplicação por escalar: (kA)ᵢⱼ = k·aᵢⱼ. Essas operações são usadas em processamento de imagem (mistura de camadas), análise de dados e machine learning.',
    ['Dadas A = [[1,2],[3,4]] e B = [[5,−1],[0,2]], calcule A + B, A − B e 3A − 2B.', '(Contexto) Dois supermercados de Palmas registram vendas semanais de 4 produtos em uma matriz 4×1. Supermercado A: [200, 150, 80, 320] e Supermercado B: [180, 170, 120, 280]. Calcule as vendas totais combinadas e a diferença de vendas entre os mercados.']),

  createLesson('g2-mat-b4-l3', 'L3: Multiplicação de Matrizes', 'matematica',
    'O produto A_(m×n) × B_(n×p) resulta em uma matriz C_(m×p). O elemento cᵢⱼ = soma dos produtos aᵢₖ·bₖⱼ para k de 1 a n. Condição: o número de colunas de A deve ser igual ao número de linhas de B. A multiplicação NÃO é comutativa (AB ≠ BA em geral). É a operação mais usada em computação: transformações geométricas, redes neurais artificiais e sistemas de equações.',
    ['Calcule o produto AB e verifique se BA existe e é igual a AB: A = [[1,2],[3,4]], B = [[2,0],[1,3]].', '(Computação gráfica) Para rotacionar um ponto P(3, 4) por 90° no plano, multiplica-se pela matriz de rotação R = [[0,−1],[1,0]]. Calcule R·[3,4]ᵀ e encontre as novas coordenadas do ponto rotacionado.']),

  createLesson('g2-mat-b4-l4', 'L4: Matriz Transposta e Matriz Inversa', 'matematica',
    'A transposta Aᵀ de uma matriz A é obtida trocando linhas por colunas: (Aᵀ)ᵢⱼ = aⱼᵢ. Uma matriz quadrada A é invertível se existe A⁻¹ tal que A·A⁻¹ = I. A inversa existe somente se det(A) ≠ 0. Para uma matriz 2×2: se A = [[a,b],[c,d]], então A⁻¹ = (1/det)·[[d,−b],[−c,a]]. A inversa é usada para resolver sistemas matricialmente: AX = B → X = A⁻¹B.',
    ['Calcule a transposta e a inversa (se existir) de A = [[3,1],[5,2]]. Verifique que A·A⁻¹ = I.', 'Por que em machine learning e estatística, a matriz (AᵀA) é mais importante que A sozinha? Pesquise o conceito de "matriz de correlação" e explique como a transposta é fundamental para calculá-la.']),

  createLesson('g2-mat-b4-l5', 'L5: Determinante 2×2 e 3×3 — Definição e Cálculo', 'matematica',
    'O determinante é um número associado a uma matriz quadrada. Para 2×2: det([[a,b],[c,d]]) = ad − bc. Para 3×3, a Regra de Sarrus: copiam-se as duas primeiras colunas à direita e somam-se os produtos das diagonais principais, subtraindo os das secundárias. det(A) ≠ 0 ↔ A é invertível ↔ o sistema correspondente tem solução única.',
    ['Calcule o determinante de A = [[2,−1,3],[0,4,−2],[1,3,5]] usando a Regra de Sarrus.', '(Geometria) O determinante [[x₁,y₁,1],[x₂,y₂,1],[x₃,y₃,1]] dividido por 2 dá a área do triângulo com vértices (x₁,y₁), (x₂,y₂) e (x₃,y₃). Calcule a área do triângulo com vértices A(0,0), B(4,0), C(2,3) por este método e verifique com a fórmula base × altura.']),

  createLesson('g2-mat-b4-l6', 'L6: Propriedades dos Determinantes', 'matematica',
    'Propriedades importantes: (1) trocar duas linhas inverte o sinal do det; (2) linha nula → det = 0; (3) linhas proporcionais → det = 0; (4) det(kA) = kⁿ·det(A) para matriz n×n; (5) det(AB) = det(A)·det(B); (6) det(Aᵀ) = det(A). Essas propriedades permitem simplificar o cálculo de determinantes de matrizes maiores e são fundamentais em álgebra linear.',
    ['Sem calcular diretamente, determine o determinante de [[1,2,3],[4,5,6],[7,8,9]]. Justifique usando uma das propriedades.', '(Aplicação) Um cientista de dados precisa verificar se um conjunto de 3 equações de previsão é linearmente independente (não redundante). Como o determinante da matriz dos coeficientes resolve esse problema? Explique a conexão.']),

  createLesson('g2-mat-b4-l7', 'L7: Sistemas Lineares — Definição e Classificação', 'matematica',
    'Um sistema de equações lineares com n incógnitas pode ser representado matricialmente como AX = B. A classificação usa o determinante: se det(A) ≠ 0, o sistema é possível e determinado (SPD) — solução única. Se det(A) = 0 e a equação extra for consistente, é possível e indeterminado (SPI). Se inconsistente, é impossível (SI). Sistemas lineares modelam desde distribuição de tráfego a circuitos elétricos.',
    ['Classifique o sistema e, se SPD, resolva por substituição: {2x + y = 7; 3x − 2y = 4}.', '(Contexto) Uma empresa mistura três tipos de café (A, B, C) em diferentes proporções para criar dois produtos. As proporções formam um sistema linear. Se a matriz dos coeficientes tiver determinante zero, o que isso significa para as possibilidades de mistura?']),

  createLesson('g2-mat-b4-l8', 'L8: Método da Adição (Eliminação de Gauss)', 'matematica',
    'O método da adição resolve sistemas somando equações para eliminar uma variável. O processo de eliminação gaussiana é sistematizado: transformar a matriz aumentada [A|B] em forma escalonada operando sobre as linhas. Esse é o algoritmo mais usado computacionalmente para resolver sistemas lineares de grande porte, sendo a base dos softwares de engenharia estrutural e análise de elementos finitos.',
    ['Resolva pelo método da adição: {3x − 2y = 1; x + 4y = 9}.', '(Contexto econômico) Um produtor do Tocantins vende soja a R$ 120,00/saca e milho a R$ 60,00/saca. Em dois meses, a receita foi R$ 14.400 e R$ 12.000, com diferentes quantidades. Modele como sistema 2×2 e resolva pelo método da adição.']),

  createLesson('g2-mat-b4-l9', 'L9: Regra de Cramer', 'matematica',
    'A Regra de Cramer usa determinantes para resolver sistemas SPD: xᵢ = det(Aᵢ)/det(A), onde Aᵢ é a matriz A com a i-ésima coluna substituída pelo vetor B. Para sistemas 2×2 e 3×3, é um método elegante e sistemático. Para sistemas maiores, a eliminação de Gauss é computacionalmente mais eficiente.',
    ['Resolva pelo método de Cramer: {2x + y − z = 1; x − y + 2z = 4; 3x + 2y − z = 3}.', '(Engenharia) Três resistores em um circuito satisfazem um sistema linear. As correntes (incógnitas) são encontradas pela Regra de Cramer. Resolva o sistema {I₁ + I₂ = 5; 2I₁ − I₃ = 3; I₂ + 2I₃ = 7} e interprete cada corrente em Ampères.']),

  createLesson('g2-mat-b4-l10', 'L10: Sistemas 3×3 — Problemas Aplicados', 'matematica',
    'Sistemas 3×3 modelam problemas com três variáveis interagentes: misturas de três substâncias, alocação de três recursos, triângulo de preços com três produtos relacionados. A habilidade é montar as três equações a partir do enunciado — cada condição do problema gera uma equação. Após montar o sistema, escolhe-se o método de resolução mais eficiente.',
    ['Três cidades tocantinenses exportam soja, milho e algodão. O total exportado é 1.200 ton, a soja é o dobro do milho e o algodão é 200 ton a menos que o milho. Monte e resolva o sistema 3×3.', '(ENEM-estilo) Um comerciante compra 3 tipos de fruta: manga a R$ 2, maracujá a R$ 3 e buriti a R$ 5 por kg. Gastou R$ 100, comprou 30 kg no total e o triplo de manga em relação ao maracujá. Quanto de cada fruta comprou?']),

  createLesson('g2-mat-b4-l11', 'L11: Matrizes e Transformações Geométricas', 'matematica',
    'Transformações geométricas no plano (rotação, reflexão, escala, cisalhamento) são representadas por multiplicação matricial. Rotação por θ: R = [[cosθ, −senθ],[senθ, cosθ]]. Reflexão em relação ao eixo x: [[1,0],[0,−1]]. Escala: [[kₓ,0],[0,kᵧ]]. Composição de transformações = produto de matrizes. Essa é a matemática por trás de todos os softwares de design gráfico e animação.',
    ['Um quadrado com vértices em (0,0), (1,0), (1,1) e (0,1) é rotacionado 90° e depois refletido no eixo y. Calcule as novas posições dos vértices usando as matrizes de transformação.', 'No design de um logo para uma empresa do Tocantins, um vetor é escalado por fator 3 no eixo x e 2 no eixo y, e depois rotacionado 45°. Calcule a transformação resultante para o ponto (1, 1).']),

  createLesson('g2-mat-b4-l12', 'L12: Aplicações de Matrizes — Google PageRank e Redes', 'matematica',
    'O algoritmo PageRank do Google usa uma "matriz de transição" onde cada entrada representa a probabilidade de um usuário navegar de uma página para outra. O vetor de rankings é o autovetor dessa matriz. Redes sociais, epidemiologia (modelos SIR), economia (tabelas input-output de Leontief) e genética (cadeias de Markov) usam multiplicação de matrizes iterativamente.',
    ['Uma rede simples tem 3 páginas web. A matriz de links é A = [[0,1,1],[1,0,1],[1,1,0]] (1 = há link). Calcule A² e interprete: o elemento (A²)ᵢⱼ conta caminhos de comprimento 2 entre as páginas i e j.', '(Epidemiologia) Um modelo de propagação de doença usa a matriz [[0.9, 0.1],[0.2, 0.8]] para transição entre saudável e infectado. Partindo do vetor [1000, 100], calcule o estado após 1 semana (1 multiplicação matricial).']),

  createLesson('g2-mat-b4-l13', 'L13: Revisão de Matrizes e Determinantes', 'matematica',
    'Revisão integrada: operações com matrizes (adição, subtração, multiplicação), transposta, inversa, determinante (regra de Sarrus, propriedades) e relação com sistemas lineares. O núcleo conceitual: determinante não nulo ↔ sistema com solução única ↔ matriz invertível ↔ conjunto de vetores linearmente independente. Todas essas afirmações são equivalentes.',
    ['Dado o sistema AX = B com A = [[1,2],[3,6]], classifique o sistema (sem resolver) e explique o que o determinante de A revela sobre as soluções.', 'Uma inteligência artificial processa uma imagem (matriz 512×512). Para "corrigir a perspectiva" (transformação projetiva), multiplica a matriz por uma transformação 3×3. Por que é essencial que essa matriz de transformação seja invertível?']),

  createLesson('g2-mat-b4-l14', 'L14: Revisão Geral de Sistemas Lineares', 'matematica',
    'Sistemas lineares aparecem em praticamente todos os campos: física (equilíbrio de forças), química (balanceamento de equações), economia (modelos de oferta e demanda), computação (sistemas de equações em machine learning). A metodologia é sempre a mesma: modelar como AX = B, verificar o determinante, escolher o método de resolução (substituição, adição ou Cramer), resolver e interpretar.',
    ['(Balanceamento químico) Balance a equação: _C₃H₈ + _O₂ → _CO₂ + _H₂O. Monte e resolva o sistema linear (conservação de átomos de C, H, O).', '(ENEM-estilo) Em um circuito com 3 malhas, as correntes satisfazem: {2I₁ − I₂ = 6; −I₁ + 3I₂ − I₃ = 0; −I₂ + 2I₃ = 4}. Resolva o sistema pelo método de sua preferência e calcule a potência P = I·V em cada malha.']),

  createLesson('g2-mat-b4-l15', 'L15: Problemas Integrados — Matrizes, Sistemas e Contexto', 'matematica',
    'Nesta aula integramos matrizes e sistemas com contextos reais brasileiros. Problemas de alocação de recursos, mistura de produtos, análise de custos e otimização produtiva são modelados por sistemas lineares. A capacidade de abstrair um problema real em um sistema de equações é a competência matemática de maior valor no mercado de trabalho.',
    ['Uma usina de açúcar do Tocantins produz álcool combustível (A) e açúcar refinado (R) a partir de cana. Cada tonelada de cana rende 0,08 t de álcool ou 0,10 t de açúcar. Com 10.000 t de cana e restrição de no máximo 900 t de álcool, quanto produzir de cada? Monte como sistema e resolva.', 'Três fazendas produzem soja, milho e algodão em diferentes proporções. As receitas mensais e as quantidades produzidas formam um sistema 3×3. Monte e resolva um problema realista com esses dados, escolhendo valores plausíveis para o Cerrado tocantinense.']),

  createLesson('g2-mat-b4-l16', 'L16: Matrizes e Sistemas no ENEM', 'matematica',
    'O ENEM raramente pede cálculo de determinantes 3×3 diretamente, mas sim a interpretação de sistemas: quando tem solução única, quando é impossível, e como montar o sistema a partir de um problema de texto. A habilidade de ler um problema complexo e traduzir em equações é a mais cobrada. Matrizes também aparecem em tabelas e gráficos que precisam ser interpretados.',
    ['(ENEM 2018 adaptado) Uma empresa produz dois modelos de sapato. O modelo A usa 2 dm² de couro e 0,5 h de trabalho; o B usa 1,5 dm² e 1 h. Há 300 dm² de couro e 120 h disponíveis. Monte o sistema de inequações e determine a região de soluções viáveis.', 'Interprete a seguinte situação sem resolver o sistema: três preços p₁, p₂, p₃ satisfazem p₁ + p₂ = 100, p₂ + p₃ = 120 e p₁ + p₃ = 140. O que o determinante da matriz de coeficientes diz sobre a existência de uma solução única?']),

  createLesson('g2-mat-b4-l17', 'L17: Revisão Geral — 2ª Série Matemática', 'matematica',
    'Revisamos o ano inteiro da 2ª série: trigonometria completa (círculo trigonométrico, Senos e Cossenos, funções, equações), progressões (PA e PG), juros compostos, logaritmos, exponenciais, geometria espacial e matrizes/sistemas lineares. Essa é uma das bases mais ricas e aplicadas do Ensino Médio — praticamente toda engenharia, ciência e finanças usa algum desses conteúdos.',
    ['Crie um "passaporte matemático": para cada área do ano, escreva: (a) o conceito central; (b) a fórmula mais importante; (c) uma aplicação real que você encontra no Tocantins ou no Brasil.', 'Monte um problema "interdisciplinar" que conecte pelo menos 3 dos temas do ano (ex.: juros compostos + logaritmo + progressão geométrica em um contexto de financiamento de energia solar no Tocantins).']),

  createLesson('g2-mat-b4-l18', 'L18: Síntese Final — Matemática da 2ª Série', 'matematica',
    'A 2ª série de matemática é a mais densa e a que mais cai no ENEM e vestibulares. Trigonometria completa, progressões, logaritmos, geometria espacial e matrizes formam um conjunto de ferramentas poderosas para compreender e resolver problemas do mundo real. O aluno que domina esses conteúdos está bem preparado para o ENEM e para os cursos de exatas na universidade.',
    ['Escreva uma carta para o seu eu do início do ano descrevendo: quais foram os maiores desafios matemáticos, quais conteúdos surpreenderam pela aplicação na vida real, e que conselho você daria para estudar melhor cada tema.', 'Propose e resolva um "megaproblema" que use: uma PG para modelar crescimento, um logaritmo para calcular o tempo de duplicação, um sólido geométrico para uma embalagem do produto crescente, e uma matriz para organizar os dados de produção. Contextualize na realidade do agronegócio tocantinense.']),
];
