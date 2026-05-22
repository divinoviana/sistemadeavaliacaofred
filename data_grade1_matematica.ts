import { Lesson } from './types';
import { createLesson } from './data_helpers';

// Matemática 1ª Série: 18 aulas por bimestre (Total 72)
export const matLessonsB1: Lesson[] = [
  createLesson('g1-mat-b1-l1', 'L1: Conjuntos — Definição e Representação', 'matematica',
    'Um conjunto é uma coleção bem definida de objetos chamados elementos. Podemos representá-lo por extensão (listando os elementos: A = {1, 2, 3}), por compreensão (descrevendo a propriedade: A = {x | x é par}) ou pelo diagrama de Venn (figura fechada). Entender conjuntos é a base de toda a matemática moderna — desde a lógica da computação até a organização de dados no celular.',
    ['O que caracteriza um conjunto bem definido? Dê um exemplo e um contra-exemplo.', 'Uma turma de escola pode ser modelada como um conjunto? Quais seriam os elementos e como você representaria esse conjunto por compreensão?']),

  createLesson('g1-mat-b1-l2', 'L2: Pertinência e Inclusão entre Conjuntos', 'matematica',
    'O símbolo ∈ indica que um elemento pertence a um conjunto (ex.: 3 ∈ {1,2,3}), enquanto ∉ indica que não pertence. Já ⊂ significa que um conjunto é subconjunto de outro: A ⊂ B se todo elemento de A também é elemento de B. Todo conjunto é subconjunto de si mesmo, e o conjunto vazio (∅) é subconjunto de qualquer conjunto.',
    ['Dado B = {vogais do alfabeto}, determine se as afirmações são verdadeiras: "a ∈ B", "b ∉ B", "{a, e} ⊂ B".', 'Em uma pesquisa, 30 alunos estudam Matemática e todos eles também estudam Português. Como expressamos essa relação usando a notação de subconjuntos?']),

  createLesson('g1-mat-b1-l3', 'L3: Operações — União e Interseção', 'matematica',
    'A união de dois conjuntos A ∪ B reúne todos os elementos que pertencem a A ou a B (sem repetição). A interseção A ∩ B contém apenas os elementos comuns a ambos. Essas operações aparecem no dia a dia: buscas em plataformas de streaming usam interseção ("filmes que são de ação E de 2020") e união ("filmes de ação OU documentários").',
    ['Dados A = {2, 4, 6, 8} e B = {1, 2, 3, 4}, calcule A ∪ B e A ∩ B.', 'Em uma pesquisa com 50 jovens, 30 usam Instagram e 25 usam TikTok, sendo que 15 usam os dois. Quantos usam ao menos uma dessas redes? Use a fórmula |A ∪ B|.']),

  createLesson('g1-mat-b1-l4', 'L4: Diferença e Complementar de Conjuntos', 'matematica',
    'A diferença A − B (ou A \\ B) contém os elementos que estão em A mas não estão em B. Já o complementar de A (A\') reúne todos os elementos do conjunto universo U que não pertencem a A. Essas operações são essenciais em bancos de dados e filtros: "clientes que compraram A mas não compraram B" é uma consulta de diferença.',
    ['Seja U = {1,2,3,4,5,6,7,8,9,10}, A = {1,3,5,7,9}. Determine A\' e explique o resultado.', 'Em uma escola, 40 alunos fazem esporte, 30 fazem arte e 10 fazem os dois. Quantos fazem esporte mas não fazem arte? Use a diferença de conjuntos.']),

  createLesson('g1-mat-b1-l5', 'L5: Diagrama de Venn — Resolução de Problemas', 'matematica',
    'O diagrama de Venn representa conjuntos como regiões fechadas dentro de um conjunto universo. Com ele, visualizamos claramente as regiões de união, interseção, diferença e complementar. É uma ferramenta poderosa para resolver problemas de contagem: pesquisas de opinião, triagens médicas e análises de dados populacionais usam essa representação.',
    ['Num levantamento em uma comunidade do Tocantins, 120 famílias têm acesso à água encanada, 80 têm coleta de lixo e 50 têm os dois serviços. Quantas famílias têm ao menos um serviço? Quantas não têm nenhum (total = 200)?', 'Desenhe e interprete um diagrama de Venn com 3 conjuntos sobrepostos, identificando todas as 7 regiões possíveis.']),

  createLesson('g1-mat-b1-l6', 'L6: Introdução a Funções — Conceito e Vocabulário', 'matematica',
    'Uma função f: A → B é uma regra que associa cada elemento do conjunto domínio (A) a exatamente um elemento do contradomínio (B). A imagem de f é o subconjunto de B formado pelos valores efetivamente "atingidos". A ideia de função está em todo lugar: o preço de um produto em função da quantidade, a temperatura em função da hora do dia, a nota em função das horas de estudo.',
    ['Explique com suas palavras por que a associação "pai e filhos" não é uma função (considerando que um pai pode ter vários filhos).', 'O preço da tarifa de água cobrado por uma companhia é uma função do volume consumido. O domínio são os volumes possíveis. Qual seria um elemento da imagem dessa função?']),

  createLesson('g1-mat-b1-l7', 'L7: Domínio, Contradomínio e Imagem', 'matematica',
    'Dado f(x) = x², com x real, o domínio é ℝ, o contradomínio é ℝ, mas a imagem é [0, +∞) — porque x² nunca é negativo. Distinguir imagem de contradomínio é crucial: o contradomínio é o conjunto de chegada declarado, a imagem é o que a função realmente produz. Esse conceito evita erros em programação, estatística e análise de dados.',
    ['Para f(x) = √x, determine o domínio (conjunto de chegada ℝ). Por que x não pode ser negativo?', 'Uma empresa produz entre 0 e 500 unidades por dia. Se o lucro diário é dado por L(x) = 10x − 200 (em reais), qual é o domínio e qual é a imagem dessa função no contexto real?']),

  createLesson('g1-mat-b1-l8', 'L8: Representações de Funções — Fórmula, Tabela e Gráfico', 'matematica',
    'Uma função pode ser expressa de três formas equivalentes: (1) fórmula algébrica — compacta e geral; (2) tabela de valores — útil para dados discretos e observações; (3) gráfico cartesiano — revela visualmente o comportamento (crescimento, decrescimento, máximos e mínimos). Saber transitar entre essas representações é exigido no ENEM e é essencial para interpretar dados científicos e econômicos.',
    ['Construa uma tabela com 5 valores para f(x) = 2x + 1 e depois esboce o gráfico no plano cartesiano.', '(ENEM-estilo) O gráfico de uma função mostra que o consumo de energia de uma geladeira aumenta linearmente com a temperatura ambiente. Se a 20 °C consome 100 W e a 30 °C consome 130 W, qual é a fórmula que representa esse consumo?']),

  createLesson('g1-mat-b1-l9', 'L9: Função Injetora (Injetiva)', 'matematica',
    'Uma função f: A → B é injetora quando elementos distintos do domínio possuem imagens distintas: se a ≠ b, então f(a) ≠ f(b). Graficamente, qualquer reta horizontal corta o gráfico em no máximo um ponto (Teste da Reta Horizontal). Funções injetoras são fundamentais em criptografia e em sistemas de identificação (CPF, matrícula) onde não pode haver duplicidade.',
    ['A função f(x) = x³ é injetora? Justifique usando a definição ou o gráfico.', 'Por que o número de matrícula de um aluno em uma escola precisa ser modelado por uma função injetora? O que aconteceria se não fosse?']),

  createLesson('g1-mat-b1-l10', 'L10: Função Sobrejetora (Sobrejetiva)', 'matematica',
    'Uma função f: A → B é sobrejetora quando a imagem de f é igual ao contradomínio B: todo elemento de B é atingido por algum elemento de A. Em outras palavras, não "sobra" nenhum elemento em B sem par. Em sistemas de distribuição de recursos (distribuir todas as vagas de uma escola entre os alunos), precisamos de funções sobrejetoras para garantir que nada seja desperdiçado.',
    ['Dada f: ℝ → ℝ com f(x) = 2x + 3, mostre que f é sobrejetora encontrando, para qualquer y real, um x tal que f(x) = y.', 'Uma fábrica tem 5 máquinas e 8 operários. É possível montar uma função sobrejetora que atribua operários a máquinas? Cada máquina teria pelo menos um operário?']),

  createLesson('g1-mat-b1-l11', 'L11: Função Bijetora e Função Inversa', 'matematica',
    'Uma função bijetora é ao mesmo tempo injetora e sobrejetora: há uma correspondência exata "um-a-um" entre domínio e contradomínio. Somente funções bijetoras possuem função inversa f⁻¹, que "desfaz" a ação de f. A inversa de f(x) = 2x + 1 é f⁻¹(x) = (x − 1)/2. Logaritmo é a inversa da exponencial — uma das aplicações mais importantes do ENEM.',
    ['Verifique se f(x) = 3x − 6 é bijetora de ℝ em ℝ e encontre f⁻¹(x).', 'Se f representa "converter temperatura de Celsius para Fahrenheit" pela fórmula F = (9/5)C + 32, qual é f⁻¹? O que ela representa no contexto prático?']),

  createLesson('g1-mat-b1-l12', 'L12: Função Par e Função Ímpar', 'matematica',
    'Uma função é par quando f(−x) = f(x) para todo x no domínio — seu gráfico é simétrico em relação ao eixo y (ex.: f(x) = x²). Uma função é ímpar quando f(−x) = −f(x) — seu gráfico tem simetria em relação à origem (ex.: f(x) = x³). Muitas leis da física e padrões na natureza (ondas, oscilações) exploram essas simetrias.',
    ['Determine se as funções f(x) = x⁴ − 2x² e g(x) = x³ + x são pares, ímpares ou nenhuma das duas. Justifique algebricamente.', 'Por que a função que descreve a posição de um pêndulo ao longo do tempo (oscilação) é uma função ímpar em torno do ponto de equilíbrio?']),

  createLesson('g1-mat-b1-l13', 'L13: Composição de Funções', 'matematica',
    'A composição (f ∘ g)(x) = f(g(x)) aplica g primeiro e depois f ao resultado. A ordem importa: em geral f ∘ g ≠ g ∘ f. Composição é usada em processamento de imagens (aplicar filtros em sequência), em conversão de unidades (converter metros para polegadas via centímetros) e em programação funcional (encadear transformações de dados).',
    ['Dadas f(x) = x + 2 e g(x) = 3x, calcule (f ∘ g)(4) e (g ∘ f)(4). Os resultados são iguais?', 'Para converter temperatura: primeiro converta graus Celsius em Kelvin (K = C + 273) e depois converta Kelvin em uma escala industrial. Modele esse processo como composição de funções.']),

  createLesson('g1-mat-b1-l14', 'L14: Revisão de Conjuntos com Problemas Contextualizados', 'matematica',
    'Nesta aula consolidamos conjuntos com problemas do mundo real. Uma das aplicações mais comuns do ENEM envolve a "fórmula de inclusão-exclusão": |A ∪ B| = |A| + |B| − |A ∩ B|. Para três conjuntos, a fórmula se expande. Problemas de pesquisa de mercado, saúde pública e censos populacionais são resolvidos com essa lógica.',
    ['(ENEM-estilo) Em uma pesquisa com 200 moradores de Palmas, 120 disseram ter acesso à internet, 90 disseram ter plano de saúde e 40 disseram ter os dois. Quantos não têm nenhum dos dois benefícios?', 'Uma cooperativa do Tocantins produz 3 tipos de frutas: manga, açaí e buriti. Um levantamento mostrou que 15 produtores cultivam manga e açaí, 10 cultivam açaí e buriti e 8 cultivam os três. Monte um diagrama de Venn para representar a situação.']),

  createLesson('g1-mat-b1-l15', 'L15: Revisão de Funções — Conceitos e Tipos', 'matematica',
    'Revisamos os conceitos fundamentais de funções: definição, domínio, contradomínio, imagem, injetora, sobrejetora, bijetora, par, ímpar e composta. Uma boa revisão deve usar múltiplas representações: verificar pela fórmula, pela tabela e pelo gráfico. O domínio de uma função nunca deve ser ignorado — é o contexto que delimita onde a função faz sentido.',
    ['Classifique cada função como injetora, sobrejetora, bijetora ou nenhuma: (a) f: ℝ→ℝ, f(x)=x²; (b) f: [0,∞)→[0,∞), f(x)=x²; (c) f: ℝ→ℝ, f(x)=2x+1.', 'Explique por que, ao modelar o crescimento da dívida pública brasileira ao longo de anos, é importante especificar o domínio (intervalo de anos) da função utilizada.']),

  createLesson('g1-mat-b1-l16', 'L16: Avaliação Diagnóstica — Conjuntos e Funções', 'matematica',
    'A avaliação diagnóstica permite identificar lacunas no aprendizado antes de avançar para funções específicas (afim, quadrática etc.). Os principais pontos verificados são: representação e operações com conjuntos, identificação de domínio e imagem, e classificação de funções. Erros frequentes incluem confundir imagem com contradomínio e aplicar mal a diferença de conjuntos.',
    ['Resolva: U = {1,2,3,4,5,6,7,8}, A = {2,4,6,8}, B = {1,2,3,4}. Calcule A ∪ B, A ∩ B, A − B e A\'.', 'A função que transforma a temperatura de uma cidade ao longo das 24 horas de um dia pode ser considerada injetora? Justifique sua resposta com base no comportamento esperado da temperatura.']),

  createLesson('g1-mat-b1-l17', 'L17: Funções no Cotidiano — Modelagem Matemática', 'matematica',
    'Modelagem matemática é o processo de representar situações reais por meio de funções. Identificamos as variáveis (o que muda), determinamos a relação entre elas e usamos a função para fazer previsões. Modelos são usados em epidemiologia (evolução de doenças), economia (crescimento do PIB) e engenharia (resistência de materiais).',
    ['O preço de um pacote de dados de celular é R$ 0,05 por MB consumido mais uma taxa fixa de R$ 15,00. Escreva a função do custo em função dos MB consumidos, identifique domínio e imagem, e calcule o custo para 500 MB.', 'Em 2023, o salário mínimo no Brasil era R$ 1.320,00. Se ele aumenta R$ 80,00 por ano, escreva a função que modela o salário mínimo em função do número de anos a partir de 2023 e preveja o valor em 2030.']),

  createLesson('g1-mat-b1-l18', 'L18: Síntese do Bimestre — Conjuntos, Funções e Aplicações', 'matematica',
    'Nesta aula de síntese, conectamos conjuntos e funções: o domínio e o contradomínio de uma função são conjuntos; as operações entre conjuntos aparecem ao analisarmos domínios restritos. A compreensão dessas bases é o alicerce para as funções afim, quadrática, exponencial e logarítmica que virão nos próximos bimestres. Matemática é uma linguagem: quanto melhor você a domina, mais o mundo faz sentido.',
    ['Elabore um mapa conceitual ligando os seguintes termos: conjunto, elemento, pertinência, subconjunto, união, interseção, função, domínio, imagem, injetora, sobrejetora.', '(Desafio) Uma função f: A → A é chamada de involução quando f(f(x)) = x. A função f(x) = −x é uma involução? E f(x) = 1/x (com x ≠ 0)? Justifique e pense em qual situação do dia a dia isso ocorre.']),
];

export const matLessonsB2: Lesson[] = [
  createLesson('g1-mat-b2-l1', 'L1: Função Afim — Definição e Coeficientes', 'matematica',
    'A função afim (ou de 1º grau) tem a forma f(x) = ax + b, onde a ≠ 0. O coeficiente angular "a" determina a inclinação da reta: se a > 0 a função é crescente, se a < 0 é decrescente. O coeficiente linear "b" indica o ponto onde a reta corta o eixo y (ordenada na origem). É a função mais usada em modelos econômicos simples, como custo fixo + custo variável.',
    ['Identifique os coeficientes a e b de f(x) = −3x + 7 e diga se a função é crescente ou decrescente.', 'Uma empresa de aluguel de carro cobra R$ 80,00 de taxa fixa mais R$ 0,50 por km rodado. Escreva a função do custo total em função dos quilômetros e identifique a e b.']),

  createLesson('g1-mat-b2-l2', 'L2: Zero da Função Afim e Gráfico (Reta)', 'matematica',
    'O zero (ou raiz) de uma função afim f(x) = ax + b é o valor de x que anula a função: ax + b = 0, portanto x₀ = −b/a. Geometricamente, é o ponto onde a reta corta o eixo x. Para desenhar a reta basta encontrar dois pontos (geralmente o zero da função e a ordenada na origem) e ligá-los.',
    ['Encontre o zero de f(x) = 4x − 12 e interprete geometricamente.', 'Uma torneira quebrada está perdendo água. O volume no reservatório é dado por V(t) = 500 − 20t (litros, t em horas). Quando o reservatório ficará vazio? Calcule o zero da função e interprete.']),

  createLesson('g1-mat-b2-l3', 'L3: Crescimento, Decrescimento e Taxa de Variação', 'matematica',
    'O coeficiente angular "a" da função afim é exatamente a taxa de variação: para cada unidade que x aumenta, f(x) aumenta "a" unidades (se a > 0) ou diminui |a| unidades (se a < 0). Essa taxa constante é a essência dos modelos lineares. Na prática, ela representa velocidade constante, custo por unidade, variação de temperatura por hora etc.',
    ['Se f(x) = 2x + 3, qual é a variação de f quando x passa de 5 para 8? Calcule e interprete usando o coeficiente angular.', 'Um carro percorre uma estrada em linha reta. A posição é dada por s(t) = 80t (km), onde t é o tempo em horas. Qual é a velocidade do carro? Como isso se relaciona ao coeficiente angular da função afim?']),

  createLesson('g1-mat-b2-l4', 'L4: Aplicação — Proporcionalidade e Regra de Três', 'matematica',
    'Toda relação de proporcionalidade direta pode ser escrita como f(x) = ax (função afim com b = 0, chamada de função linear). A regra de três simples nada mais é do que resolver f(x) = ax para x desconhecido. Compreender isso permite perceber que a regra de três é uma ferramenta da função linear — o que unifica dois conteúdos aparentemente separados.',
    ['Se 5 metros de tecido custam R$ 35,00, escreva a função f(x) = ax que modela o custo e use-a para calcular o custo de 12 metros.', '(ENEM-estilo) Para produzir 1 litro de soja, são necessários 1.800 litros de água. Modele como função linear e calcule quantos litros de água são necessários para produzir a safra de uma pequena propriedade do Cerrado que produz 3.500 litros de soja.']),

  createLesson('g1-mat-b2-l5', 'L5: Aplicação — Velocidade e Movimento Uniforme', 'matematica',
    'No movimento uniforme (velocidade constante), a posição em função do tempo é uma função afim: s(t) = s₀ + vt, onde s₀ é a posição inicial e v é a velocidade. Esse modelo é uma simplificação da realidade, mas é fundamental em física e aparece constantemente no ENEM em problemas de trânsito, corridas, trajetos fluviais e deslocamentos.',
    ['Um barco navega pelo Rio Tocantins a 40 km/h. Partindo de uma cidade localizada a 20 km de distância do porto, escreva a função da posição em relação ao porto e descubra quando o barco chega ao porto.', 'Dois trens partem em sentidos opostos, um a 80 km/h e outro a 120 km/h, de cidades distantes 600 km entre si. Modele a posição de cada trem e descubra quando se encontrarão.']),

  createLesson('g1-mat-b2-l6', 'L6: Juros Simples como Função Afim', 'matematica',
    'O montante em regime de juros simples é dado por M(t) = C + C·i·t = C(1 + it), onde C é o capital, i é a taxa e t é o tempo. Isso é uma função afim de t: o montante cresce linearmente (reta). Juros simples aparecem em financiamentos de curto prazo, carnês e crediários — muito comuns na realidade econômica das famílias brasileiras.',
    ['Um empréstimo de R$ 2.000,00 é feito a uma taxa de juros simples de 3% ao mês. Escreva a função M(t) e calcule o montante após 6 meses. Quanto foi o juro pago?', 'Compare graficamente o crescimento de um capital de R$ 1.000,00 a juros simples de 5% ao mês versus um crescimento sem juros. Quais são as diferenças visuais? Por que juros simples formam uma reta?']),

  createLesson('g1-mat-b2-l7', 'L7: Equação do 1º Grau e Inequação do 1º Grau', 'matematica',
    'A equação ax + b = 0 encontra o zero da função. A inequação ax + b > 0 (ou <, ≥, ≤) encontra os valores de x para os quais a função é positiva (ou negativa). A solução de uma inequação é um intervalo na reta real. Importante: ao multiplicar ou dividir por um número negativo, o sinal da desigualdade se inverte. Isso é frequentemente esquecido e causa erros no ENEM.',
    ['Resolva a inequação 3x − 9 < 0 e represente a solução na reta real. Qual o sinal de f(x) = 3x − 9 para os valores encontrados?', '(Contexto real) Um feirante quer lucrar mais de R$ 500,00 em um dia. Seu lucro por caixa de fruta é R$ 25,00. Escreva e resolva a inequação que determina o número mínimo de caixas que ele deve vender.']),

  createLesson('g1-mat-b2-l8', 'L8: Sistema de Inequações do 1º Grau', 'matematica',
    'Um sistema de inequações do 1º grau consiste em duas ou mais inequações simultâneas. A solução é a interseção das soluções individuais — o conjunto de valores que satisfaz todas as desigualdades ao mesmo tempo. Em Programação Linear (conteúdo que aparece no ENEM), sistemas de inequações definem uma região viável de soluções.',
    ['Resolva o sistema: {2x − 4 > 0 e x + 1 ≤ 5}. Represente na reta real e descreva o intervalo solução.', '(ENEM-estilo) Um agricultor familiar do Tocantins pode dedicar no máximo 10 horas semanais para colheita e no mínimo 3 horas. Se cada hectare exige 2 horas de trabalho, escreva o sistema de inequações que modela as possibilidades de área colhida por semana.']),

  createLesson('g1-mat-b2-l9', 'L9: Gráfico de f(x) = ax + b e Sistemas Lineares 2×2', 'matematica',
    'Duas funções afins f(x) = a₁x + b₁ e g(x) = a₂x + b₂ são representadas por retas. O ponto de interseção das retas é a solução do sistema {f(x) = g(x)}. Se as retas são paralelas (a₁ = a₂, b₁ ≠ b₂), o sistema é impossível. Se são coincidentes (a₁ = a₂, b₁ = b₂), o sistema é indeterminado.',
    ['Resolva graficamente e algebricamente o sistema: f(x) = x + 2 e g(x) = 3x − 4. Qual é o ponto de interseção?', 'Em uma eleição escolar, o candidato A começa com 20 votos e recebe 5 por hora; o candidato B começa com 0 e recebe 8 por hora. Em que momento B ultrapassa A? Resolva como sistema de funções afins.']),

  createLesson('g1-mat-b2-l10', 'L10: Aplicação de Função Afim em Problemas do ENEM', 'matematica',
    'O ENEM frequentemente apresenta funções afins embutidas em contextos como tarifas de energia elétrica, planos de celular, impostos e comparação de preços. A habilidade essencial é identificar o coeficiente angular (taxa) e o coeficiente linear (valor fixo), montar a função e responder à pergunta do problema sem se perder nos dados extras.',
    ['(Adaptado ENEM) Uma empresa de energia cobra uma tarifa fixa de R$ 30,00 mais R$ 0,65 por kWh consumido. Outra cobra R$ 15,00 fixos mais R$ 0,80 por kWh. A partir de quantos kWh a primeira empresa se torna mais vantajosa?', 'Um aluno quer comparar dois planos de celular: plano A custa R$ 40,00/mês com 5 GB incluídos e R$ 10,00 por GB adicional; plano B custa R$ 25,00/mês com 1 GB incluído e R$ 12,00 por GB adicional. Qual plano é mais barato para quem usa 4 GB por mês?']),

  createLesson('g1-mat-b2-l11', 'L11: Revisão da Função Afim — Consolidação', 'matematica',
    'A função afim sintetiza conceitos de álgebra (equação e inequação do 1º grau), geometria (reta no plano cartesiano) e aplicações (proporcionalidade, juros simples, velocidade). A revisão deve garantir que o aluno sabe: (1) identificar a e b; (2) encontrar zeros; (3) analisar crescimento/decrescimento; (4) resolver sistemas; (5) modelar situações reais.',
    ['Construa uma "ficha-resumo" com todos os conceitos da função afim, incluindo exemplos de problemas práticos de cada conceito.', 'Compare as funções f(x) = 2x e g(x) = 2x + 3. Quais características são iguais e quais são diferentes? Como isso aparece nos gráficos?']),

  createLesson('g1-mat-b2-l12', 'L12: Introdução à Função Quadrática', 'matematica',
    'A função quadrática (ou de 2º grau) tem a forma f(x) = ax² + bx + c, com a ≠ 0. Seu gráfico é uma parábola: côncava para cima quando a > 0 (mínimo global) e côncava para baixo quando a < 0 (máximo global). Funções quadráticas modelam trajetórias de projéteis, área de figuras variáveis, lucro em função da produção e muitas outras situações.',
    ['Identifique a, b e c e determine se a parábola de f(x) = −2x² + 4x + 6 tem máximo ou mínimo.', 'Um objeto é lançado verticalmente. Sua altura em metros é dada por h(t) = −5t² + 20t, onde t é o tempo em segundos. Esse modelo representa uma função quadrática? Qual o significado dos coeficientes a e c neste contexto?']),

  createLesson('g1-mat-b2-l13', 'L13: Vértice da Parábola e Valor Máximo/Mínimo', 'matematica',
    'O vértice da parábola V = (x_V, y_V) é o ponto de máximo ou mínimo da função quadrática. As coordenadas são: x_V = −b/(2a) e y_V = −Δ/(4a), onde Δ = b² − 4ac. O vértice é crucial para otimização: encontrar o preço que maximiza o lucro, a dimensão que maximiza a área, o ângulo que maximiza o alcance de um projétil.',
    ['Para f(x) = x² − 6x + 5, calcule o vértice e determine se é ponto de máximo ou mínimo.', 'Um fazendeiro quer cercar um retângulo usando 200 metros de arame. Se um dos lados tem comprimento x, a área é A(x) = x(100 − x). Qual o valor de x que maximiza a área? Qual é a área máxima?']),

  createLesson('g1-mat-b2-l14', 'L14: Discriminante Δ e Zeros da Função Quadrática', 'matematica',
    'O discriminante Δ = b² − 4ac determina a natureza das raízes: (1) Δ > 0 — dois zeros reais distintos, parábola corta o eixo x em dois pontos; (2) Δ = 0 — zero real duplo, parábola tangencia o eixo x; (3) Δ < 0 — sem zeros reais, parábola não toca o eixo x. A fórmula de Bhaskara fornece as raízes: x = (−b ± √Δ) / (2a).',
    ['Calcule Δ e as raízes de f(x) = 2x² − 8x + 6. Interprete geometricamente o resultado.', '(ENEM-estilo) A altura de um objeto lançado de um telhado de 20 m é h(t) = −5t² + 10t + 20. Em que instante o objeto atinge o solo? Calcule as raízes e interprete a que tem sentido físico.']),

  createLesson('g1-mat-b2-l15', 'L15: Gráfico da Parábola — Construção e Análise', 'matematica',
    'Para esboçar a parábola de f(x) = ax² + bx + c, identifica-se: (1) a concavidade (sinal de a); (2) o ponto (0, c) no eixo y; (3) o vértice (x_V, y_V); (4) as raízes (se existirem). Com esses 4 elementos, o esboço é preciso e interpretável. A análise do gráfico permite responder perguntas sobre máximos, mínimos, sinal da função e intervalos de crescimento.',
    ['Esboce a parábola de f(x) = −x² + 4x − 3, indicando raízes, vértice e concavidade.', 'Com base no gráfico de f(x) = x² − 2x − 8, determine os intervalos em que f(x) > 0 e f(x) < 0. Como isso se relaciona com a inequação do 2º grau?']),

  createLesson('g1-mat-b2-l16', 'L16: Inequação do 2º Grau', 'matematica',
    'A inequação do 2º grau ax² + bx + c > 0 (ou < 0) é resolvida analisando o sinal da função quadrática. O método gráfico é o mais eficiente: (1) encontre as raízes; (2) analise a concavidade; (3) determine os intervalos onde a parábola está acima (f(x)>0) ou abaixo (f(x)<0) do eixo x. Esse tipo de inequação aparece em problemas de otimização e viabilidade.',
    ['Resolva a inequação x² − 5x + 6 < 0 e represente a solução em notação de intervalo.', '(Contexto) O lucro de um vendedor é dado por L(x) = −x² + 10x − 16, onde x é o número de produtos vendidos. Para quantos produtos o lucro é positivo? Resolva a inequação L(x) > 0.']),

  createLesson('g1-mat-b2-l17', 'L17: Aplicações da Função Quadrática — Área, Trajetória, Lucro', 'matematica',
    'A função quadrática modela três grandes classes de problemas: (1) Área — maximizar/minimizar dimensões geométricas; (2) Trajetória balística — altura de um projétil lançado com velocidade inicial; (3) Lucro/receita — relação entre preço e quantidade vendida. O ponto-chave é sempre o vértice: ele representa o ótimo (máximo ou mínimo) da situação.',
    ['Um comerciante percebeu que se cobrar x reais a mais por unidade (acima de R$ 10,00 base), vende (100 − 5x) unidades. Escreva a função receita R(x) e encontre o preço que maximiza a receita.', '(ENEM-estilo) Um atleta chuta uma bola e sua trajetória é dada por h(d) = −0,05d² + d, onde h é a altura e d é a distância horizontal (em metros). Qual a altura máxima atingida? A qual distância horizontal isso ocorre?']),

  createLesson('g1-mat-b2-l18', 'L18: Síntese do Bimestre — Função Afim, Quadrática e Inequações', 'matematica',
    'Neste bimestre estudamos as duas funções algébricas mais importantes do Ensino Médio. A função afim modela relações lineares (taxa constante), e a quadrática modela curvas com máximo ou mínimo. Ambas aparecem intensamente no ENEM e em concursos. A habilidade de modelar um problema real, encontrar a função adequada e responder com precisão é o que diferencia o bom aluno de matemática.',
    ['Crie um problema real sobre a realidade do Tocantins (agropecuária, energia solar, turismo no Jalapão) que possa ser modelado por uma função afim e outro por uma função quadrática. Troque com um colega e resolva.', 'Explique com suas palavras como as inequações do 1º e 2º grau se diferem e em que situações práticas cada uma seria usada para tomar uma decisão.']),
];

export const matLessonsB3: Lesson[] = [
  createLesson('g1-mat-b3-l1', 'L1: Polígonos — Definição, Classificação e Ângulos', 'matematica',
    'Polígono é uma figura plana fechada formada por segmentos de reta (lados). São classificados pelo número de lados: triângulo (3), quadrilátero (4), pentágono (5) etc. A soma dos ângulos internos de um polígono convexo com n lados é (n−2)·180°. Esse conhecimento é aplicado em design, arquitetura, pavimentações e na construção de casas populares.',
    ['Calcule a soma dos ângulos internos de um hexágono. Qual é o valor de cada ângulo interno de um hexágono regular?', 'Por que as abelhas constroem favos com forma hexagonal? Pesquise e relacione com a geometria dos polígonos regulares (eficiência de área).']),

  createLesson('g1-mat-b3-l2', 'L2: Triângulos — Classificação e Propriedades', 'matematica',
    'Triângulos são classificados pelos lados (equilátero, isósceles, escaleno) e pelos ângulos (acutângulo, retângulo, obtusângulo). A desigualdade triangular afirma que a soma de dois lados sempre deve ser maior que o terceiro. A condição de triângulo é fundamental em engenharia estrutural: treliças e pontes usam triângulos por sua rigidez.',
    ['Verifique se os segmentos de comprimento 5, 7 e 13 podem formar um triângulo. E os de comprimento 6, 8 e 10?', 'Por que as treliças de pontes e telhados são construídas com formas triangulares? Qual propriedade geométrica garante a estabilidade estrutural?']),

  createLesson('g1-mat-b3-l3', 'L3: Congruência de Triângulos — Casos', 'matematica',
    'Dois triângulos são congruentes quando um pode ser sobreposto ao outro. Os casos de congruência são: LLL (três lados iguais), LAL (dois lados e o ângulo entre eles), ALA (dois ângulos e o lado entre eles) e LAA (dois ângulos e um lado qualquer). Congruência é a base da topografia, da robótica e da produção em série (peças idênticas).',
    ['Dados dois triângulos com ângulos 60°, 70° e 50° e um lado igual de 8 cm (entre os ângulos de 60° e 70°), qual caso de congruência garante que são congruentes?', 'Na produção em série de telhas cerâmicas, por que é importante garantir a congruência entre as peças? Quais problemas surgiriam se houvesse variação nas dimensões?']),

  createLesson('g1-mat-b3-l4', 'L4: Semelhança de Triângulos e Teorema de Tales', 'matematica',
    'Dois triângulos são semelhantes quando têm ângulos iguais e lados proporcionais. O Teorema de Tales afirma que se uma reta é paralela a um lado de um triângulo, ela divide os outros dois lados em partes proporcionais. Esse teorema é a base para calcular alturas de árvores e prédios por meio de sombras e para entender escalas em mapas.',
    ['Uma árvore projeta uma sombra de 6 m. No mesmo instante, um poste de 2 m projeta sombra de 1,5 m. Calcule a altura da árvore usando o Teorema de Tales.', '(ENEM-estilo) Um mapa do Tocantins tem escala 1:2.000.000. A distância entre Palmas e Araguaína no mapa é 5 cm. Qual é a distância real entre as cidades em quilômetros?']),

  createLesson('g1-mat-b3-l5', 'L5: Teorema de Pitágoras e Aplicações', 'matematica',
    'Em um triângulo retângulo, o quadrado da hipotenusa é igual à soma dos quadrados dos catetos: c² = a² + b². O Teorema de Pitágoras é provavelmente o mais aplicado da geometria: mede distâncias inacessíveis, calcula diagonais, verifica se ângulos são retos e é o fundamento da trigonometria. Também aparece no ENEM em contextos como construção civil e localização GPS.',
    ['Uma escada de 5 m apoia-se em uma parede vertical. Se a base da escada está a 3 m da parede, a que altura ela encosta? Aplique o Teorema de Pitágoras.', 'No trajeto de uma entrega em Palmas: um motoboy percorre 8 km ao norte e depois 6 km a leste. Qual é a distância em linha reta entre o ponto de partida e o destino? Modele com Pitágoras.']),

  createLesson('g1-mat-b3-l6', 'L6: Relações Métricas no Triângulo Retângulo', 'matematica',
    'No triângulo retângulo com altura h relativa à hipotenusa c e projeções a\' e b\' dos catetos a e b sobre a hipotenusa, valem as relações: h² = a\'·b\', a² = a\'·c e b² = b\'·c. Essas relações são usadas em problemas de engenharia (cálculo de alturas e projeções) e aparecem com frequência nas provas do ENEM e vestibulares.',
    ['Em um triângulo retângulo, a hipotenusa mede 25 cm e um cateto mede 15 cm. Calcule o outro cateto e a altura relativa à hipotenusa usando as relações métricas.', 'Um engenheiro precisa calcular a largura de um rio sem atravessá-lo. Usando triângulos semelhantes e as relações métricas, descreva um método geométrico para realizar essa medição.']),

  createLesson('g1-mat-b3-l7', 'L7: Quadriláteros — Propriedades e Área', 'matematica',
    'Os principais quadriláteros são: quadrado, retângulo, losango, paralelogramo, trapézio. Cada um tem propriedades específicas de lados, ângulos e diagonais. As fórmulas de área são: retângulo (base × altura), paralelogramo (base × altura), losango (d₁ × d₂ / 2) e trapézio ((B + b) × h / 2). O cálculo de áreas é essencial no mercado imobiliário e na agricultura.',
    ['Calcule a área de um terreno trapezoidal com bases de 30 m e 50 m e altura de 20 m. Se o metro quadrado vale R$ 800, qual é o valor do terreno?', 'Um produtor rural do Cerrado tem um lote em forma de paralelogramo com base de 120 m e altura de 80 m. Quantas sacas de soja colheria se a produtividade é de 3 sacas por 100 m²?']),

  createLesson('g1-mat-b3-l8', 'L8: Polígonos Regulares — Perímetro e Área', 'matematica',
    'Um polígono regular tem todos os lados e ângulos iguais. Para um polígono regular de n lados com lado l, o perímetro é P = n·l. A área pode ser calculada com a apótema (distância do centro ao meio de um lado): A = P·a/2. Polígonos regulares aparecem em design de embalagens, mosaicos e em padrões da natureza.',
    ['Calcule o perímetro e a área de um hexágono regular com lado de 6 cm (apótema ≈ 5,2 cm).', 'Uma praça em formato octogonal regular tem lado de 15 m. Calcule o perímetro para cercar a praça e a área para calcular o custo de pavimentação a R$ 120,00/m² (use apótema ≈ 18,1 m).']),

  createLesson('g1-mat-b3-l9', 'L9: Circunferência e Círculo — Elementos e Fórmulas', 'matematica',
    'A circunferência é o conjunto de pontos a uma distância r (raio) de um centro. O círculo é a região delimitada pela circunferência. Comprimento da circunferência: C = 2πr. Área do círculo: A = πr². O número π ≈ 3,14159 é irracional e transcendente. Aplicações: rodas, canos, satélites em órbita circular, irrigação por aspersão.',
    ['Uma fazenda usa um pivô central de irrigação com braço de 400 m. Qual é a área irrigada em hectares? (1 ha = 10.000 m²)', '(ENEM-estilo) Uma lata cilíndrica de grãos tem raio de 7 cm e altura de 20 cm. Calcule a área total da embalagem (2 tampas + lateral) e o volume. Use π ≈ 3,14.']),

  createLesson('g1-mat-b3-l10', 'L10: Arco, Setor Circular e Ângulo Central', 'matematica',
    'Um setor circular é a "fatia de pizza" delimitada por dois raios e um arco. O comprimento do arco é l = (α/360°)·2πr e a área do setor é A = (α/360°)·πr². Ângulo central é o ângulo formado por dois raios. Setores circulares aparecem em gráficos de pizza, relógios, engrenagens e no design de mecanismos giratórios.',
    ['Um gráfico de pizza representa os gastos de uma família brasileira. O setor de alimentação ocupa 120°. Se a renda é R$ 3.000,00, qual o valor gasto com alimentação?', 'Uma engrenagem circular tem raio 15 cm. Um setor de 45° sofre desgaste. Qual é a área do setor desgastado? Qual é o comprimento do arco correspondente?']),

  createLesson('g1-mat-b3-l11', 'L11: Posições Relativas de Retas e Ângulos Formados', 'matematica',
    'Duas retas no plano podem ser paralelas (nunca se encontram), concorrentes (se cruzam em um ponto) ou coincidentes. Quando uma transversal corta duas paralelas, formam-se ângulos com relações especiais: alternos internos iguais, correspondentes iguais e cointerternos suplementares. Essas relações são essenciais em construção civil, topografia e geometria descritiva.',
    ['Uma transversal corta duas retas paralelas formando um ângulo de 65° com uma delas. Determine todos os 8 ângulos formados, classificando-os (correspondentes, alternos internos etc.).', 'Em um projeto de calçada paralela à rua, um pedreiro precisa garantir que as guias estejam paralelas. Que medição angular poderia ele fazer para verificar o paralelismo com uma transversal?']),

  createLesson('g1-mat-b3-l12', 'L12: Semelhança — Escala em Mapas e Plantas', 'matematica',
    'A escala é uma razão de semelhança entre a representação e o objeto real: escala = medida no desenho / medida real. Em uma planta baixa na escala 1:50, cada centímetro representa 50 cm reais. A semelhança de figuras tem duas propriedades: ângulos iguais (equiangularidade) e lados proporcionais (equilateralidade). Mapas, projetos arquitetônicos e maquetes usam esses conceitos.',
    ['Uma planta de uma casa está na escala 1:100. Um quarto mede 3 cm × 4 cm no desenho. Quais são as dimensões reais do quarto? Qual é a área real?', '(ENEM-estilo) Um mapa tem escala 1:500.000. Dois pontos no mapa estão a 4,5 cm de distância. Qual é a distância real em km? Se um carro percorre essa distância a 90 km/h, quanto tempo leva?']),

  createLesson('g1-mat-b3-l13', 'L13: Área de Figuras Compostas e Problemas de Pinturas', 'matematica',
    'Figuras compostas são formadas pela combinação ou subtração de figuras simples. Para calcular a área: decomponha em partes conhecidas (retângulos, triângulos, semicírculos), calcule cada parte separadamente e some ou subtraia. Problemas de pintura, assoalhamento, jardinagem e carpetes são as aplicações mais frequentes no ENEM.',
    ['Calcule a área de uma piscina em formato de retângulo com um semicírculo em uma das extremidades. O retângulo mede 10 m × 6 m e o semicírculo tem raio 3 m.', '(ENEM-estilo) Uma parede de 4 m × 3 m tem uma janela retangular de 1,2 m × 0,8 m e uma porta de 0,9 m × 2,1 m. Qual é a área de parede a ser pintada? Cada lata de tinta cobre 8 m². Quantas latas são necessárias?']),

  createLesson('g1-mat-b3-l14', 'L14: Teorema de Tales — Problemas Avançados', 'matematica',
    'O Teorema de Tales na forma generalizada: se duas retas transversais cortam um feixe de paralelas, os segmentos correspondentes são proporcionais. Isso permite resolver problemas de divisão de segmentos em partes proporcionais. Uma aplicação prática é a "divisão de terras" proporcional à testada — comum em questões de herança e parcelamento de solo no Brasil.',
    ['Usando Tales, divida um segmento AB de 12 cm em três partes proporcionais a 2:3:7 com régua e compasso. Quais são os comprimentos de cada parte?', '(ENEM-estilo) Em uma estrada, postes são instalados igualmente espaçados. Uma câmera de monitoramento registra que entre o 3º e o 7º poste há 160 m. Qual a distância entre o 1º e o 15º poste?']),

  createLesson('g1-mat-b3-l15', 'L15: Pitágoras em Contextos Tridimensionais', 'matematica',
    'O Teorema de Pitágoras se estende ao espaço: a diagonal de um paralelepípedo de lados a, b, c é d = √(a² + b² + c²). Isso permite calcular distâncias em problemas de caixas, salas, trajetos em espaço 3D e construção de caixas de armazenamento. Também é usado para verificar se ângulos são retos em estruturas espaciais.',
    ['Uma caixa retangular tem dimensões 3 cm, 4 cm e 12 cm. Qual é o comprimento da diagonal interna?', 'Em uma fábrica de Araguaína, um produto deve ser transportado em uma caixa cúbica com diagonal interna de 60 cm. Qual deve ser o lado da caixa? (d = l√3)']),

  createLesson('g1-mat-b3-l16', 'L16: Problemas Integrados de Geometria Plana', 'matematica',
    'Nesta aula integrada, resolvemos problemas que combinam semelhança, Pitágoras, área e perímetro. A habilidade de identificar QUAL teorema ou fórmula usar em cada etapa de um problema composto é o que o ENEM mais testa. O processo é: ler cuidadosamente, desenhar a figura, identificar dados e incógnitas, escolher o caminho, calcular e verificar a coerência da resposta.',
    ['Um terreno triangular tem lados 5 m, 12 m e 13 m. Verifique que é retângulo, calcule sua área e compare com o custo de construção de uma cerca ao redor (preço: R$ 45,00/metro).', '(ENEM-estilo) Um parque tem formato de semicírculo com diâmetro de 100 m. Dentro dele há uma pista de caminhada circular com raio de 30 m. Qual é a área do parque disponível para gramado?']),

  createLesson('g1-mat-b3-l17', 'L17: Revisão de Geometria Plana para o ENEM', 'matematica',
    'A revisão para o ENEM em Geometria Plana deve focar nos tipos de problema mais frequentes: (1) Teorema de Pitágoras em situações práticas; (2) Semelhança com escala e proporção; (3) Área de figuras compostas; (4) Círculo e setor circular; (5) Polígonos e suas propriedades. A estratégia é: não memorizar fórmulas isoladas, mas entender a lógica por trás de cada uma.',
    ['Resolva três problemas clássicos do ENEM: (a) escada apoiada na parede, (b) terreno em forma de trapézio, (c) pista circular. Apresente resolução detalhada com cada passo justificado.', 'Monte um "guia de geometria plana" com: as 5 fórmulas mais importantes, 2 armadilhas comuns em provas e 1 dica de resolução rápida para cada tipo de problema.']),

  createLesson('g1-mat-b3-l18', 'L18: Síntese do Bimestre — Geometria Plana', 'matematica',
    'Neste bimestre construímos a geometria plana do zero: polígonos, triângulos (classificação, congruência, semelhança), Teorema de Tales, Pitágoras, relações métricas, quadriláteros, polígonos regulares, círculo e aplicações. A geometria não é memorização de fórmulas — é raciocínio espacial. Quem domina geometria consegue resolver problemas novos que nunca viu antes.',
    ['Projete (no papel) uma casa simples de planta baixa com pelo menos 4 cômodos. Use escala adequada, calcule a área total e o perímetro da construção.', 'Pesquise e apresente uma aplicação real da geometria plana na cultura do Tocantins: artesanato indígena, construção de casas de palha, design de embalagens de produtos regionais etc.']),
];

export const matLessonsB4: Lesson[] = [
  createLesson('g1-mat-b4-l1', 'L1: Geometria Plana — Revisão e Conexões', 'matematica',
    'Iniciamos o 4º bimestre conectando a geometria plana estudada com a geometria espacial que vem a seguir: faces são figuras planas, e os sólidos são construídos a partir delas. Revisamos as principais fórmulas de área (indispensáveis para calcular a área lateral e total de sólidos) e reforçamos o Teorema de Pitágoras, que será amplamente usado em cálculos tridimensionais.',
    ['Quais formas planas (polígonos e círculos) são faces de um cubo, um prisma triangular e um cone? Faça uma tabela comparativa.', 'Por que o conhecimento de área de polígonos planos é um pré-requisito para calcular a área total de sólidos geométricos? Dê um exemplo concreto.']),

  createLesson('g1-mat-b4-l2', 'L2: Triângulos — Semelhança Avançada e Razão de Semelhança', 'matematica',
    'Quando dois triângulos são semelhantes com razão de semelhança k, a razão entre seus perímetros é k e a razão entre suas áreas é k². Isso significa que se um triângulo tem lados duas vezes maiores, sua área é quatro vezes maior. Essa relação é crucial para escalonamento de projetos, maquetes e análise de fotos aéreas.',
    ['Dois triângulos semelhantes têm lados de 3 cm e 9 cm (lados correspondentes). Qual é a razão de semelhança? Qual é a razão entre as áreas?', 'Um arquiteto cria uma maquete de um projeto na escala 1:50. A área do telhado na maquete é 120 cm². Qual é a área real do telhado? O custo da telha é R$ 85,00/m²; qual é o custo total?']),

  createLesson('g1-mat-b4-l3', 'L3: Polígonos Regulares — Construção e Simetria', 'matematica',
    'Todo polígono regular pode ser inscrito em uma circunferência (todos os vértices sobre o círculo). O raio do círculo circunscrito e a apótema (raio do círculo inscrito) são fundamentais para calcular a área. O ângulo central de um polígono regular de n lados é 360°/n. Esses conceitos aparecem em design de logos, ladrilhos, colmeias e arquitetura islâmica.',
    ['Calcule o ângulo central, o ângulo interno e a apótema de um pentágono regular com lado 10 cm (apótema = lado/(2·tan(36°)) ≈ 6,88 cm).', 'Por que as células de uma colmeia têm formato hexagonal? Calcule a eficiência comparando a área de um hexágono regular com lado 1 cm versus a de um quadrado de mesma área total para cobrir uma superfície.']),

  createLesson('g1-mat-b4-l4', 'L4: Trigonometria Introdutória — Motivação e Aplicações', 'matematica',
    'A trigonometria estuda as relações entre ângulos e lados de triângulos. Antes das fórmulas, é importante entender a motivação: como medir a altura de uma montanha sem escalá-la? Como os astrônomos calculam distâncias de estrelas? Como GPS e satélites funcionam? A resposta para todas essas perguntas passa pela trigonometria.',
    ['Liste 5 profissões que usam trigonometria no dia a dia e explique brevemente como cada uma a utiliza.', 'Como os engenheiros calculam a altura de uma torre de energia sem subir nela? Descreva o método usando ângulos de elevação e o que precisariam medir no solo.']),

  createLesson('g1-mat-b4-l5', 'L5: Razões Trigonométricas no Triângulo Retângulo', 'matematica',
    'No triângulo retângulo com ângulo agudo α, definimos: seno(α) = cateto oposto/hipotenusa, cosseno(α) = cateto adjacente/hipotenusa, tangente(α) = cateto oposto/cateto adjacente. As siglas mnemônicas (SOH-CAH-TOA) ajudam a memorizar. Para α = 30°, 45° e 60°, os valores são exatos e devem ser memorizados: sen30°=1/2, cos30°=√3/2, tan45°=1.',
    ['Em um triângulo retângulo com hipotenusa 10 cm e ângulo de 30°, calcule os dois catetos.', 'Um morro no Tocantins tem uma subida com inclinação de 15°. Para subir 200 m de distância ao longo da ladeira, qual é o ganho real de altitude? Use sen(15°) ≈ 0,259.']),

  createLesson('g1-mat-b4-l6', 'L6: Aplicações das Razões Trigonométricas', 'matematica',
    'Os problemas mais comuns com razões trigonométricas envolvem: (1) ângulo de elevação — ângulo formado com a horizontal ao olhar para cima; (2) ângulo de depressão — ao olhar para baixo; (3) distâncias inacessíveis. A estratégia é sempre desenhar o triângulo retângulo, identificar os elementos conhecidos e a incógnita, e aplicar a razão correta.',
    ['Um observador a 1,80 m de altura vê o topo de uma palmeira sob ângulo de elevação de 35°. Se ele está a 20 m da base da palmeira, qual é a altura total da palmeira? Use tan(35°) ≈ 0,70.', '(ENEM-estilo) De um ponto no solo, a 30 m de distância da base de um prédio, o ângulo de elevação do topo é 60°. Qual é a altura do prédio? Use tan(60°) = √3 ≈ 1,73.']),

  createLesson('g1-mat-b4-l7', 'L7: Relações Fundamentais da Trigonometria', 'matematica',
    'As principais relações trigonométricas derivam diretamente do Teorema de Pitágoras: sen²α + cos²α = 1 (identidade fundamental). Também temos: tanα = senα/cosα, e as relações de complemento: sen(90°−α) = cosα. Essas relações permitem calcular as demais razões conhecendo apenas uma, e são essenciais para simplificar expressões trigonométricas.',
    ['Dado que senα = 3/5, calcule cosα e tanα usando a identidade fundamental (assuma α no 1º quadrante).', 'Se cosβ = 0,6, calcule sen²β + cos²β para verificar a identidade, e depois calcule tanβ. O que a identidade fundamental garante sempre?']),

  createLesson('g1-mat-b4-l8', 'L8: Teorema dos Senos', 'matematica',
    'O Teorema dos Senos: em qualquer triângulo, a/senA = b/senB = c/senC = 2R (onde R é o raio da circunferência circunscrita). Ele é usado quando conhecemos dois ângulos e um lado (ALA ou LAA) ou dois lados e um ângulo oposto (LLA). É indispensável para resolver triângulos que não são retângulos.',
    ['Em um triângulo com A = 45°, B = 60° e lado a = 10 cm, calcule os lados b e c usando o Teorema dos Senos. (sen45°=√2/2 ≈ 0,71; sen60°=√3/2 ≈ 0,87; sen75° ≈ 0,97)', 'Um barco quer determinar sua posição usando dois faróis A e B distantes 5 km entre si. O ângulo em A é 70° e em B é 80°. Calcule a distância do barco ao faról A. Use o Teorema dos Senos.']),

  createLesson('g1-mat-b4-l9', 'L9: Teorema dos Cossenos', 'matematica',
    'O Teorema dos Cossenos: c² = a² + b² − 2ab·cosC. Ele generaliza o Teorema de Pitágoras (quando C = 90°, cosC = 0 e temos Pitágoras). É usado quando conhecemos três lados (LLL) ou dois lados e o ângulo entre eles (LAL). Também permite calcular ângulos a partir dos três lados.',
    ['Em um triângulo com a = 7, b = 8 e C = 60°, calcule o lado c. (cos60° = 0,5)', 'Dois caminhões partem do mesmo ponto em estradas que formam ângulo de 120°. Um percorre 80 km e outro 60 km. Qual é a distância entre eles ao final? Use o Teorema dos Cossenos. (cos120° = −0,5)']),

  createLesson('g1-mat-b4-l10', 'L10: Resolução Completa de Triângulos', 'matematica',
    'Resolver completamente um triângulo significa encontrar todos os 3 lados e 3 ângulos a partir de dados mínimos suficientes. A estratégia é: (1) verificar qual caso (LLL, LAL, ALA, LAA, LLA) se encaixa nos dados; (2) escolher Senos ou Cossenos; (3) usar a soma dos ângulos = 180° para encontrar o terceiro ângulo; (4) verificar a coerência (lados maiores opostos a ângulos maiores).',
    ['Complete a resolução: triângulo com a = 5, b = 7, C = 50°. Encontre c, A e B. (cos50° ≈ 0,643; use Cossenos e depois Senos.)', 'Uma antena de telefonia no Tocantins precisa de 3 cabos de sustentação. O ponto de fixação está a 25 m de altura. Dois cabos vão ao solo a 15 m e 20 m da base. Calcule o comprimento dos dois cabos e o ângulo de inclinação de cada um.']),

  createLesson('g1-mat-b4-l11', 'L11: Funções Trigonométricas — Seno e Cosseno', 'matematica',
    'As funções seno e cosseno estendem as razões trigonométricas para qualquer ângulo real, não apenas ângulos agudos. O gráfico do seno é uma onda periódica com período 2π, amplitude 1 e simetria ímpar. O cosseno tem as mesmas características mas é par (simétrico em relação ao eixo y). Ondas sonoras, eletricidade alternada e marés são modeladas por essas funções.',
    ['Esboce o gráfico de f(x) = sen(x) para x ∈ [0°, 360°], marcando os zeros, máximos e mínimos.', 'A corrente elétrica em uma tomada brasileira varia como i(t) = 127√2·sen(120πt) Ampères. Qual é o valor máximo da corrente? Qual é o período da oscilação? (O que é a frequência de 60 Hz?)']),

  createLesson('g1-mat-b4-l12', 'L12: Função Tangente e Identidades Trigonométricas', 'matematica',
    'A função tangente f(x) = tan(x) = sen(x)/cos(x) tem período π (diferente do seno e cosseno que têm período 2π) e é indefinida quando cos(x) = 0, gerando assíntotas verticais. As identidades trigonométricas permitem simplificar e transformar expressões trigonométricas complexas em formas mais simples — habilidade exigida em cálculo diferencial e integral.',
    ['Para quais valores de x (no intervalo 0° a 360°) a função tangente é indefinida? Por quê? Esboce o gráfico.', 'Verifique a identidade (sen²x + cos²x)² = sen⁴x + 2sen²x·cos²x + cos⁴x e simplifique a expressão sen²x + cos²x + 2sen²x·cos²x usando a identidade fundamental.']),

  createLesson('g1-mat-b4-l13', 'L13: Radianos e Conversão de Ângulos', 'matematica',
    'O radiano é a unidade de medida natural para ângulos: 1 radiano é o ângulo cujo arco correspondente tem comprimento igual ao raio. Conversão: graus ↔ radianos pela regra 180° = π rad. Em cálculo, física e engenharia, os ângulos são sempre medidos em radianos. O comprimento do arco é l = r·θ (θ em radianos).',
    ['Converta: (a) 90° para radianos; (b) 270° para radianos; (c) π/4 rad para graus; (d) 5π/3 rad para graus.', 'Uma roda de bicicleta tem raio de 35 cm. Se ela gira 3 rotações completas, qual é a distância percorrida em metros? Use l = r·θ (θ em radianos por rotação = 2π).']),

  createLesson('g1-mat-b4-l14', 'L14: Aplicações de Trigonometria — Fenômenos Periódicos', 'matematica',
    'Fenômenos periódicos se repetem em intervalos regulares de tempo ou espaço: marés, estações do ano, batimentos cardíacos, corrente elétrica, ondas sonoras. Todos são modelados por funções seno ou cosseno na forma f(t) = A·sen(2πt/T + φ), onde A é a amplitude, T é o período e φ é a fase. Reconhecer e trabalhar com esse modelo é fundamental no ENEM e em cursos de engenharia e medicina.',
    ['A temperatura média (°C) em Palmas ao longo do ano pode ser modelada por T(m) = 27 + 4·sen(πm/6), onde m é o mês (m=1 para janeiro). Calcule a temperatura nos meses 3 e 9. Qual é a amplitude da variação?', '(ENEM-estilo) Um rio tem nível d\'água que varia com as estações. O nível mínimo é 2 m (setembro) e máximo é 10 m (março). Escreva a função que modela o nível ao longo do ano e calcule o nível em junho.']),

  createLesson('g1-mat-b4-l15', 'L15: Revisão de Geometria Plana e Trigonometria', 'matematica',
    'Nesta aula de revisão, conectamos geometria plana e trigonometria: o cálculo de áreas de triângulos não retângulos usa a fórmula A = (1/2)·a·b·senC; os polígonos regulares podem ter suas apótemas calculadas com tangente; a lei dos cossenos generaliza Pitágoras. Geometria e trigonometria juntas formam o núcleo da matemática aplicada ao espaço.',
    ['Calcule a área de um triângulo com lados 8 m e 10 m e ângulo entre eles de 45°. Use A = (1/2)·a·b·sen(C). (sen45° = √2/2 ≈ 0,71)', 'Um lote triangular tem lados 30 m, 40 m e 50 m. Verifique que é retângulo, calcule sua área por dois métodos diferentes (Pitágoras e trigonometria) e confirme que os resultados coincidem.']),

  createLesson('g1-mat-b4-l16', 'L16: Problemas Integrados ENEM — Geometria e Trigonometria', 'matematica',
    'O ENEM apresenta problemas de geometria e trigonometria sempre em contextos reais: construção civil, engenharia, astronomia, agropecuária, urbanismo, meio ambiente. A habilidade não é apenas calcular — é interpretar, modelar e comunicar a solução. O aluno precisa identificar o triângulo "oculto" no problema e aplicar o método correto.',
    ['(ENEM-estilo) Uma torre de observação de incêndios florestais no Cerrado está 80 m acima do solo. Um guarda vê fumaça sob ângulo de depressão de 18°. A que distância horizontal está o incêndio? Use tan(18°) ≈ 0,325.', 'Três cidades formam um triângulo. As distâncias são: A-B = 120 km, B-C = 150 km, ângulo em B = 70°. Calcule a distância A-C e o ângulo em A. Use os teoremas de Senos e Cossenos.']),

  createLesson('g1-mat-b4-l17', 'L17: Revisão Geral do Ano — 1ª Série Matemática', 'matematica',
    'Revisamos todo o conteúdo do ano: conjuntos, funções (conceito, injetora, sobrejetora, bijetora, par, ímpar), função afim (coeficientes, zeros, gráfico, aplicações), função quadrática (vértice, Δ, raízes, gráfico, otimização), inequações (1º e 2º grau), geometria plana (polígonos, Pitágoras, semelhança, círculo) e trigonometria (razões, Senos, Cossenos, funções). Uma visão panorâmica consolida a aprendizagem.',
    ['Monte um resumo visual (mapa mental ou tabela) com: a função estudada, sua forma geral, seu gráfico e um exemplo de aplicação real. Inclua todas as funções do ano.', 'Elabore e resolva um problema que use pelo menos 3 dos conteúdos estudados no ano, em um contexto relacionado à realidade do Tocantins ou do Brasil.']),

  createLesson('g1-mat-b4-l18', 'L18: Síntese Final — Matemática da 1ª Série', 'matematica',
    'O ano de matemática da 1ª série foi construído sobre dois pilares: álgebra (conjuntos e funções) e geometria (plana e trigonometria). Esses conteúdos não são independentes — funções descrevem relações geométricas, e a trigonometria usa funções para modelar o mundo. O aluno que compreende esses pilares está preparado para a 2ª série, que trará progressões, logaritmos, geometria espacial e matrizes.',
    ['Escreva uma carta para um aluno que vai começar a 1ª série explicando: qual o conteúdo mais importante, qual a maior dificuldade, qual a maior aplicação prática que você descobriu no ano.', 'Se você pudesse ensinar apenas um conceito de matemática da 1ª série para alguém que vai trabalhar no campo (agropecuária, turismo rural, construção), qual seria e por quê? Justifique com exemplos práticos do Tocantins.']),
];
