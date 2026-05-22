import { Lesson } from './types';
import { createLesson } from './data_helpers';

// Inglês 1ª Série: 18 aulas por bimestre (Total 72)
export const ingLessonsB1: Lesson[] = [
  createLesson('g1-ing-b1-l1', 'L1: Por que Aprender Inglês? A Língua do Mundo', 'ingles',
    'O inglês é a língua mais falada como segundo idioma no planeta, presente em negócios, ciência, tecnologia, cultura pop e turismo. No Brasil, o domínio do inglês abre portas no mercado de trabalho e amplia o acesso ao conhecimento global. Expressões como "internet", "app", "download" e "selfie" já fazem parte do nosso vocabulário diário, mostrando como o inglês está em toda parte.',
    ['Por que o inglês é considerado a "língua franca" global?', 'Cite 5 palavras em inglês que você usa no dia a dia sem perceber.']),

  createLesson('g1-ing-b1-l2', 'L2: O Alfabeto e a Pronúncia do Inglês', 'ingles',
    'O alfabeto inglês tem 26 letras, as mesmas do português, mas com pronúncias bem diferentes. Vogais como "a", "e", "i", "o", "u" possuem sons variados dependendo do contexto. Por exemplo: "a" pode soar como /eɪ/ (em "cake"), /æ/ (em "cat") ou /ɑː/ (em "car"). Praticar a pronúncia desde o início é essencial para a comunicação eficaz.',
    ['Quais letras do inglês têm pronúncia diferente do português?', 'Escreva 3 palavras em inglês e tente descrevê-las como se soariam em português.']),

  createLesson('g1-ing-b1-l3', 'L3: Verb "To Be" — Ser e Estar em Inglês', 'ingles',
    'O verbo "to be" (ser/estar) é o mais fundamental do inglês. No Simple Present, ele se conjuga como: I am, You are, He/She/It is, We/You/They are. Exemplo: "I am a student" (Eu sou estudante). "She is happy" (Ela está feliz). Para negar, adiciona-se "not": "I am not tired" (Eu não estou cansado). Para perguntar, inverte-se a ordem: "Are you ready?" (Você está pronto?)',
    ['Complete com a forma correta do verbo "to be": "She ___ my teacher" e "They ___ from Brazil".', 'Escreva 3 frases sobre você usando o verbo "to be" de forma afirmativa, negativa e interrogativa.']),

  createLesson('g1-ing-b1-l4', 'L4: Pronomes Pessoais e Possessivos', 'ingles',
    'Pronomes pessoais substituem nomes nas frases: I (eu), You (você), He (ele), She (ela), It (ele/ela para objetos/animais), We (nós), You (vocês), They (eles/elas). Pronomes possessivos indicam posse: My (meu), Your (seu), His (dele), Her (dela), Its (seu — de objeto), Our (nosso), Their (deles). Exemplo: "This is my book" (Este é meu livro). "Her name is Ana" (O nome dela é Ana).',
    ['Substitua o sujeito pelo pronome correto: "Ana and I are friends" → "___ are friends".', 'Escreva 4 frases usando pronomes possessivos diferentes para descrever objetos seus ou de colegas.']),

  createLesson('g1-ing-b1-l5', 'L5: Artigos em Inglês — A, An e The', 'ingles',
    'O inglês tem artigos indefinidos (a / an) e um artigo definido (the). Usa-se "a" antes de palavras que começam com som de consoante: "a car" (um carro), "a dog" (um cachorro). Usa-se "an" antes de palavras que começam com som de vogal: "an apple" (uma maçã), "an hour" (uma hora — o "h" é mudo). "The" é usado quando nos referimos a algo específico e já conhecido: "The book on the table" (O livro que está na mesa).',
    ['Por que usamos "an" e não "a" antes de "hour"?', 'Complete: "___ elephant is ___ largest land animal in ___ world."']),

  createLesson('g1-ing-b1-l6', 'L6: Simple Present — Afirmativa, Negativa e Interrogativa', 'ingles',
    'O Simple Present é usado para fatos, hábitos e rotinas. Estrutura afirmativa: sujeito + verbo (He/She/It recebe -s/-es/-ies). Exemplo: "I study every day" / "She studies every day". Negativa: sujeito + do not (don\'t) / does not (doesn\'t) + verbo base. Exemplo: "They don\'t live here". Interrogativa: Do/Does + sujeito + verbo? Exemplo: "Does he play football?" Atenção: com He/She/It sempre se usa "does" nas negativas e perguntas.',
    ['Transforme em negativa e interrogativa: "She works at a hospital."', 'Escreva 5 frases no Simple Present descrevendo a sua rotina diária.']),

  createLesson('g1-ing-b1-l7', 'L7: Vocabulário — Família e Profissões', 'ingles',
    'Palavras essenciais sobre família: mother (mãe), father (pai), brother (irmão), sister (irmã), grandmother (avó), grandfather (avô), cousin (primo/prima), uncle (tio), aunt (tia). Profissões comuns: teacher (professor), doctor (médico), engineer (engenheiro), nurse (enfermeiro/a), lawyer (advogado), farmer (agricultor), artist (artista), police officer (policial). Exemplo: "My mother is a nurse" (Minha mãe é enfermeira).',
    ['Descreva 3 membros da sua família em inglês usando profissão e adjetivo.', 'Qual profissão você quer exercer? Escreva uma frase em inglês sobre isso.']),

  createLesson('g1-ing-b1-l8', 'L8: Vocabulário — Rotina Diária e Verbos de Ação', 'ingles',
    'Verbos comuns para descrever a rotina: wake up (acordar), get up (levantar), brush teeth (escovar os dentes), have breakfast (tomar café), go to school (ir para a escola), study (estudar), have lunch (almoçar), come back home (voltar pra casa), do homework (fazer dever), watch TV (assistir TV), go to bed (dormir). Exemplo: "I wake up at 6 a.m. and go to school at 7 a.m."',
    ['Escreva um parágrafo descrevendo toda a sua rotina diária em inglês.', 'Quais atividades da rotina você mais gosta? Responda em inglês com pelo menos 3 frases.']),

  createLesson('g1-ing-b1-l9', 'L9: Números, Horas e Datas em Inglês', 'ingles',
    'Números cardinais: one, two, three... ten, eleven, twelve, thirteen... twenty, twenty-one... hundred, thousand. Números ordinais (para datas): first (1st), second (2nd), third (3rd), fourth (4th)... Horas: "It\'s three o\'clock" (São três horas), "It\'s half past two" (São duas e meia), "It\'s a quarter to five" (São quinze para as cinco). Datas: "My birthday is on March 15th" (Meu aniversário é em 15 de março).',
    ['Como se diz "São 7h45" em inglês?', 'Escreva sua data de nascimento completa em inglês (dia, mês, ano).']),

  createLesson('g1-ing-b1-l10', 'L10: Cores, Adjetivos Básicos e Descrições', 'ingles',
    'Cores em inglês: red (vermelho), blue (azul), green (verde), yellow (amarelo), orange (laranja), purple (roxo), black (preto), white (branco), pink (rosa), brown (marrom), gray (cinza). Adjetivos básicos: big/small (grande/pequeno), tall/short (alto/baixo), hot/cold (quente/frio), happy/sad (feliz/triste), young/old (jovem/velho), beautiful/ugly (bonito/feio). Em inglês, o adjetivo sempre vem ANTES do substantivo: "a beautiful blue car" (um belo carro azul).',
    ['Descreva a sua escola usando pelo menos 5 adjetivos e 3 cores em inglês.', 'Como você descreveria sua cidade natal para um estrangeiro? Escreva 4 frases em inglês.']),

  createLesson('g1-ing-b1-l11', 'L11: Dias da Semana e Meses do Ano', 'ingles',
    'Dias da semana: Monday (segunda), Tuesday (terça), Wednesday (quarta), Thursday (quinta), Friday (sexta), Saturday (sábado), Sunday (domingo). Em inglês, os dias são escritos com letra maiúscula. Meses: January, February, March, April, May, June, July, August, September, October, November, December. Preposições de tempo: "on Monday" (na segunda), "in January" (em janeiro), "at 8 o\'clock" (às 8 horas).',
    ['Quais disciplinas você tem on Tuesdays (às terças)?', 'Escreva 3 frases sobre eventos importantes usando dias, meses e horários.']),

  createLesson('g1-ing-b1-l12', 'L12: Perguntas com WH- (What, Where, Who, When, Why, How)', 'ingles',
    'As WH-questions são perguntas abertas em inglês. What (o quê/qual), Where (onde), Who (quem), When (quando), Why (por quê), How (como), Which (qual/quais), Whose (de quem). Estrutura: WH-word + auxiliary (do/does/is/are) + sujeito + verbo? Exemplos: "Where do you live?" (Onde você mora?), "What is your name?" (Qual é o seu nome?), "How old are you?" (Quantos anos você tem?), "Why are you late?" (Por que você está atrasado?).',
    ['Forme uma pergunta WH- para cada resposta: "I live in Palmas." / "She is 16 years old." / "He studies because he wants to pass ENEM."', 'Escreva um diálogo de apresentação pessoal usando pelo menos 5 perguntas WH-.']),

  createLesson('g1-ing-b1-l13', 'L13: Vocabulário — Objetos Escolares e Sala de Aula', 'ingles',
    'Objetos comuns na sala de aula: board (quadro), chalk (giz), desk (carteira), chair (cadeira), notebook (caderno), pen (caneta), pencil (lápis), eraser (borracha), ruler (régua), backpack (mochila), book (livro), dictionary (dicionário). Comandos em sala: "Open your book" (Abra o livro), "Listen carefully" (Escute com atenção), "Repeat after me" (Repita depois de mim), "Sit down" (Sente-se), "Raise your hand" (Levante a mão).',
    ['Escreva 6 frases descrevendo o que tem dentro da sua mochila escolar em inglês.', 'Traduza estes comandos: "Close the door, take out your notebook, and write your name."']),

  createLesson('g1-ing-b1-l14', 'L14: There is / There are — Indicando Existência', 'ingles',
    '"There is" (há/existe) é usado com substantivos no singular: "There is a cat on the roof" (Há um gato no telhado). "There are" é usado com plural: "There are 30 students in my class" (Há 30 alunos na minha turma). Negativas: "There isn\'t a park nearby" / "There aren\'t any trees here". Perguntas: "Is there a hospital here?" / "Are there any buses?" Resposta: "Yes, there is/are" ou "No, there isn\'t/aren\'t".',
    ['Descreva sua cidade usando "there is" e "there are" em pelo menos 6 frases.', 'O que NÃO há na sua cidade que você gostaria que houvesse? Use "there isn\'t/aren\'t".']),

  createLesson('g1-ing-b1-l15', 'L15: Have / Has — Posse e Características', 'ingles',
    '"Have" e "has" expressam posse ou características. I/You/We/They + have. He/She/It + has. Exemplos: "I have two brothers" (Eu tenho dois irmãos), "She has blue eyes" (Ela tem olhos azuis). Negativa: "I don\'t have a car" / "He doesn\'t have a dog". Pergunta: "Do you have a pet?" / "Does she have time?" A expressão "have got" é mais comum no inglês britânico: "I\'ve got a new phone" (Eu tenho um celular novo).',
    ['Escreva 5 frases usando "have/has" para descrever características físicas de pessoas da sua família.', 'Forme perguntas e respostas: pergunte a um colega imaginário o que ele tem ou não tem em casa.']),

  createLesson('g1-ing-b1-l16', 'L16: Preposições de Lugar — In, On, At, Next to, Behind...', 'ingles',
    'Preposições de lugar indicam onde algo está. In (dentro de): "The keys are in the bag." On (em cima de, sobre): "The book is on the table." At (em, perto de — ponto específico): "She is at school." Next to (ao lado de): "The bank is next to the pharmacy." Behind (atrás de): "The park is behind the school." In front of (na frente de): "The car is in front of the house." Between (entre): "The library is between the two buildings."',
    ['Descreva onde estão 5 objetos na sua sala de aula usando diferentes preposições de lugar.', 'Desenhe mentalmente sua casa e escreva 6 frases descrevendo onde os cômodos ficam.']),

  createLesson('g1-ing-b1-l17', 'L17: Introdução à Leitura em Inglês — Textos Simples', 'ingles',
    'Ler em inglês não exige entender cada palavra. Estratégias básicas: observar título e imagens antes de ler (pré-leitura), identificar palavras conhecidas, usar o contexto para adivinhar palavras desconhecidas, e buscar a ideia principal de cada parágrafo. Cognatos (palavras parecidas com o português) são ótimos aliados: "important" = importante, "natural" = natural, "education" = educação, "culture" = cultura, "technology" = tecnologia.',
    ['Leia este trecho e identifique a ideia principal: "Brazil is the largest country in South America. It has a diverse culture, beautiful nature, and friendly people." ', 'Quais cognatos você consegue identificar em textos de inglês? Liste pelo menos 10.']),

  createLesson('g1-ing-b1-l18', 'L18: Revisão do Bimestre e Prática Oral', 'ingles',
    'Revisão geral do 1º bimestre: verbo to be, pronomes, artigos, Simple Present, vocabulário de família e rotina, WH-questions e preposições. A habilidade oral (speaking) é desenvolvida através de prática constante. Dicas para melhorar: repetir frases em voz alta, assistir a séries com legendas em inglês, ouvir músicas e tentar entender a letra, e não ter medo de errar — errar faz parte do aprendizado.',
    ['Faça uma autoavaliação: quais tópicos do bimestre você domina bem e quais precisa revisar?', 'Escreva um pequeno texto de apresentação pessoal em inglês usando tudo que você aprendeu no bimestre.']),
];

export const ingLessonsB2: Lesson[] = [
  createLesson('g1-ing-b2-l1', 'L1: Simple Past — Verbos Regulares', 'ingles',
    'O Simple Past é usado para ações que aconteceram e terminaram no passado. Para verbos regulares, adiciona-se -ed ao final: work → worked, play → played, study → studied (y → ied). Exemplos: "I watched a movie yesterday" (Eu assisti um filme ontem), "She studied for the test" (Ela estudou para a prova). Indicadores de tempo: yesterday (ontem), last week (semana passada), ago (atrás): "two years ago" (dois anos atrás), in 2020 (em 2020).',
    ['Coloque os verbos no Simple Past: "I (walk) to school and (study) English yesterday."', 'Escreva um parágrafo sobre o que você fez no último fim de semana usando pelo menos 8 verbos regulares no passado.']),

  createLesson('g1-ing-b2-l2', 'L2: Simple Past — Verbos Irregulares Essenciais', 'ingles',
    'Muitos verbos importantes em inglês são irregulares — ou seja, não seguem o padrão -ed. É necessário memorizar as formas. Exemplos fundamentais: go → went (ir), come → came (vir), eat → ate (comer), drink → drank (beber), see → saw (ver), have → had (ter), do → did (fazer), buy → bought (comprar), take → took (pegar), give → gave (dar), get → got (pegar/ficar), make → made (fazer), say → said (dizer), run → ran (correr), sleep → slept (dormir).',
    ['Forme frases completas no passado com 6 verbos irregulares da lista.', 'Por que você acha que os verbos irregulares existem? Pesquise a origem de um deles e explique.']),

  createLesson('g1-ing-b2-l3', 'L3: Simple Past — Negativa e Interrogativa', 'ingles',
    'Para negar e perguntar no Simple Past, usa-se o auxiliar "did" com o verbo no infinitivo (sem -ed ou forma irregular). Negativa: sujeito + did not (didn\'t) + verbo base. Exemplo: "She didn\'t go to school" (Ela não foi à escola). Interrogativa: Did + sujeito + verbo base? Exemplo: "Did you eat breakfast?" (Você tomou café?) Resposta curta: "Yes, I did" / "No, I didn\'t". O verbo principal NUNCA fica no passado quando "did/didn\'t" já está presente.',
    ['Transforme em negativa e interrogativa: "He went to the party last night."', 'Crie um diálogo curto (8 linhas) entre dois amigos perguntando sobre o que fizeram nas férias.']),

  createLesson('g1-ing-b2-l4', 'L4: Present Continuous — Ações em Progresso', 'ingles',
    'O Present Continuous (ou Present Progressive) indica ações que estão acontecendo agora ou em torno do momento presente. Formação: sujeito + am/is/are + verbo-ing. Exemplos: "I am studying English now" (Estou estudando inglês agora), "She is talking on the phone" (Ela está falando no telefone), "They are playing football" (Eles estão jogando futebol). Regras do -ing: verbos terminados em -e perdem o e (make → making), verbos curtos dobram a consoante final (run → running, sit → sitting).',
    ['Forme frases no Present Continuous descrevendo o que as pessoas ao seu redor estão fazendo agora.', 'Qual a diferença entre "I study English" e "I am studying English"? Explique com exemplos.']),

  createLesson('g1-ing-b2-l5', 'L5: Simple Past vs. Present Continuous — Contraste', 'ingles',
    'O Simple Past fala de ações concluídas: "I watched TV last night". O Present Continuous fala de ações em andamento: "I am watching TV now". Às vezes ambos aparecem no mesmo contexto: "I was studying when she called" (Eu estava estudando quando ela ligou). Palavras-chave ajudam a identificar: yesterday, ago, last night → Simple Past; now, at this moment, right now, currently → Present Continuous.',
    ['Crie 4 pares de frases mostrando a diferença entre Simple Past e Present Continuous com o mesmo verbo.', 'Escreva um mini conto de 8 frases usando os dois tempos verbais juntos.']),

  createLesson('g1-ing-b2-l6', 'L6: Adjetivos — Comparativos e Superlativos', 'ingles',
    'Comparativo: usado para comparar duas coisas. Adjetivos curtos (1 sílaba): adjetivo + -er + than. "Rio is bigger than Palmas" (Rio é maior que Palmas). Adjetivos longos: more + adjetivo + than. "English is more interesting than I thought". Superlativo: o maior/menor de um grupo. Curtos: the + adjetivo + -est. "Mount Everest is the highest mountain". Longos: the most + adjetivo. "She is the most intelligent student". Irregulares: good → better → the best; bad → worse → the worst.',
    ['Compare três cidades do Brasil usando comparativos e superlativos de pelo menos 4 adjetivos.', 'Qual é "the best" e "the worst" aspecto da sua vida escolar? Justifique em inglês.']),

  createLesson('g1-ing-b2-l7', 'L7: Preposições de Tempo — In, On, At', 'ingles',
    'A distinção entre in, on e at para tempo é essencial. AT: usado para horários específicos e alguns momentos: "at 7 o\'clock", "at noon", "at night", "at the weekend" (inglês britânico). ON: usado para dias e datas: "on Monday", "on my birthday", "on January 1st". IN: usado para períodos mais longos: "in January", "in 2024", "in the morning/afternoon/evening", "in summer". Exceções: "at night" (não "in night"), "in the morning" (não "at morning").',
    ['Complete com in, on ou at: "I was born ___ 2008, ___ a Monday, ___ 6 in the morning."', 'Descreva sua semana ideal usando pelo menos 10 expressões de tempo com in, on e at.']),

  createLesson('g1-ing-b2-l8', 'L8: Vocabulário — Lugares da Cidade', 'ingles',
    'Lugares comuns: hospital (hospital), school (escola), supermarket (supermercado), pharmacy (farmácia), bank (banco), bus station (rodoviária), airport (aeroporto), library (biblioteca), park (parque), museum (museu), mall (shopping), restaurant (restaurante), church (igreja), post office (correios), police station (delegacia), fire station (corpo de bombeiros). Pedindo direções: "Excuse me, where is the nearest bank?" → "Go straight, turn left at the traffic light."',
    ['Descreva o caminho da sua casa até a escola em inglês usando vocabulário de lugares e direções.', 'Escreva um diálogo pedindo e dando direções até um lugar da sua cidade.']),

  createLesson('g1-ing-b2-l9', 'L9: Vocabulário — Objetos do Cotidiano e Casa', 'ingles',
    'Cômodos da casa: living room (sala), bedroom (quarto), kitchen (cozinha), bathroom (banheiro), garage (garagem), garden/yard (jardim/quintal). Objetos comuns: sofa (sofá), table (mesa), fridge (geladeira), microwave (micro-ondas), washing machine (máquina de lavar), TV (televisão), lamp (luminária), mirror (espelho), clock (relógio de parede). Eletroeletrônicos: smartphone (celular inteligente), laptop (notebook), headphones (fones de ouvido), charger (carregador).',
    ['Descreva o cômodo da sua casa favorito em inglês, citando todos os objetos que há nele.', 'Quais objetos tecnológicos você usa todos os dias? Escreva sobre eles em inglês.']),

  createLesson('g1-ing-b2-l10', 'L10: Vocabulário — Emoções e Estados de Espírito', 'ingles',
    'Emoções essenciais: happy (feliz), sad (triste), angry (com raiva), scared (com medo), surprised (surpreso), excited (empolgado), nervous (nervoso), tired (cansado), bored (entediado), proud (orgulhoso), embarrassed (envergonhado), lonely (solitário), confused (confuso), relieved (aliviado), jealous (ciumento), grateful (grato). Expressão de sentimentos: "I feel happy when..." / "She looks scared because..." / "He seems nervous about the test."',
    ['Descreva como você se sente em diferentes situações escolares usando pelo menos 6 emoções diferentes.', 'Escreva sobre um dia em que você sentiu emoções muito diferentes. O que aconteceu? (Use Simple Past + emoções)']),

  createLesson('g1-ing-b2-l11', 'L11: Vocabulário — Comida, Restaurantes e Hábitos Alimentares', 'ingles',
    'Alimentos: fruits (frutas) — apple, banana, mango, pineapple; vegetables (legumes/verduras) — carrot, tomato, lettuce, potato; meat (carne) — beef, chicken, fish, pork; drinks (bebidas) — water, juice, coffee, soda. No restaurante: "Can I have the menu, please?" (Posso ver o cardápio?), "I\'d like to order..." (Eu gostaria de pedir...), "The bill, please" (A conta, por favor). Expressões de quantidade: some (algum), any (algum — negativo/pergunta), a lot of (muito), a little (pouco), a few (poucos).',
    ['Descreva sua refeição favorita em inglês, incluindo os ingredientes e como você se sente ao comê-la.', 'Escreva um diálogo em um restaurante fazendo pedido, perguntando ingredientes e pedindo a conta.']),

  createLesson('g1-ing-b2-l12', 'L12: Vocabulário — Clima e Meio Ambiente', 'ingles',
    'Tempo meteorológico: sunny (ensolarado), cloudy (nublado), rainy (chuvoso), windy (ventoso), hot (quente), cold (frio), foggy (nebuloso), stormy (tempestuoso), humid (úmido). Estações: spring (primavera), summer (verão), autumn/fall (outono), winter (inverno). Meio ambiente: forest (floresta), river (rio), waterfall (cachoeira), beach (praia), mountain (montanha), desert (deserto), ocean (oceano). Problemas ambientais: deforestation (desmatamento), pollution (poluição), global warming (aquecimento global).',
    ['Descreva o clima da sua cidade e como ele muda ao longo do ano. Use vocabulário de tempo em inglês.', 'Quais problemas ambientais afetam sua região? Escreva sobre eles em inglês.']),

  createLesson('g1-ing-b2-l13', 'L13: Leitura — Interpretando Textos com Simple Past', 'ingles',
    'Ao interpretar textos em inglês, preste atenção ao tempo verbal para entender quando os eventos aconteceram. Textos narrativos geralmente usam Simple Past: "Once upon a time, a young man lived in a small village. Every day, he walked to the river and fished for hours." Dicas de interpretação: identifique os personagens (who), o lugar (where), o tempo (when), a ação principal (what happened) e a causa (why). Essas perguntas guiam a compreensão de qualquer texto.',
    ['Leia o parágrafo dado e responda: Quem? Onde? Quando? O quê aconteceu? Por quê?', 'Escreva um parágrafo narrativo curto sobre um evento real da sua vida usando o Simple Past.']),

  createLesson('g1-ing-b2-l14', 'L14: Listening e Pronúncia — Sons Difíceis para Brasileiros', 'ingles',
    'Alguns sons do inglês não existem no português e são desafiadores para brasileiros. O "th" pode ser sonoro /ð/ como em "the, this, that" ou surdo /θ/ como em "think, three, thank". O "h" sempre aspirado: "house, happy, here" — nunca mudo como em português. As vogais longas: "sheep" /iː/ vs "ship" /ɪ/. O "r" americano é retroflexo, diferente do r português. A melhor prática é ouvir músicas, podcasts e assistir séries para treinar o ouvido.',
    ['Quais sons do inglês você acha mais difícil de pronunciar? Por quê?', 'Escreva pares de palavras com sons parecidos mas significados diferentes (ex: ship/sheep, bad/bed).']),

  createLesson('g1-ing-b2-l15', 'L15: Cultura Anglófona — Estados Unidos', 'ingles',
    'Os Estados Unidos são o país com maior influência cultural global, exportando música, cinema, tecnologia e moda. Fatos interessantes: o hino nacional é "The Star-Spangled Banner", a capital é Washington D.C. (não Nova York), o país tem 50 estados e uma cultura profundamente marcada pela diversidade de imigrantes. Expressões americanas comuns: "Hang out" (sair com amigos), "Cool" (legal), "Awesome" (incrível), "What\'s up?" (E aí?). Datas importantes: Independence Day é em July 4th.',
    ['Quais aspectos da cultura americana influenciam sua vida diária? Cite exemplos concretos.', 'Compare um aspecto da cultura americana com a cultura brasileira. Use inglês na sua resposta.']),

  createLesson('g1-ing-b2-l16', 'L16: Cultura Anglófona — Reino Unido e Diferenças Linguísticas', 'ingles',
    'O inglês britânico e o americano têm diferenças interessantes. Vocabulário: elevator (US) = lift (UK); apartment (US) = flat (UK); candy (US) = sweets (UK); soccer (US) = football (UK); subway (US) = underground/tube (UK). Ortografia: color (US) = colour (UK); center (US) = centre (UK). Pronúncia: "water" soa diferente nos dois dialetos. O Reino Unido é formado por England, Scotland, Wales e Northern Ireland. A rainha/rei é o chefe de estado, mas quem governa é o Primeiro-Ministro.',
    ['Quais diferenças entre inglês americano e britânico você já percebeu em filmes, séries ou músicas?', 'Por que você acha importante conhecer os dois dialetos? Justifique sua resposta em inglês ou português.']),

  createLesson('g1-ing-b2-l17', 'L17: Produção Escrita — Escrevendo um E-mail Simples', 'ingles',
    'Um e-mail simples em inglês tem: Greeting (saudação): "Dear [name]," ou "Hello [name],"; Body (corpo): apresente o motivo do e-mail, desenvolvendo a ideia principal; Closing (fechamento): "Best regards" (Atenciosamente), "Sincerely" (Sinceramente), "Take care" (Cuide-se); Signature (assinatura): seu nome. Exemplo de abertura: "Dear Mr. Johnson, I am writing to ask about the English class schedule." Seja objetivo e educado.',
    ['Escreva um e-mail em inglês para um professor estrangeiro se apresentando e perguntando sobre um curso de inglês.', 'Quais são as principais diferenças entre um e-mail formal e uma mensagem de WhatsApp em inglês?']),

  createLesson('g1-ing-b2-l18', 'L18: Revisão do 2º Bimestre e Preparação para o 3º', 'ingles',
    'Neste bimestre, estudamos Simple Past (regular e irregular), Present Continuous, adjetivos comparativos e superlativos, preposições de tempo, e vocabulário de lugares, emoções, comida, clima e cultura anglófona. Para consolidar o aprendizado: faça exercícios de revisão, releia suas anotações, tente escrever um diário em inglês, e pratique lendo textos simples em inglês toda semana. No próximo bimestre, avançaremos para o futuro e os verbos modais.',
    ['Faça um resumo em inglês das 5 coisas mais importantes que você aprendeu neste bimestre.', 'Quais estratégias de estudo funcionaram melhor para você aprender inglês? Como você pretende melhorar?']),
];

export const ingLessonsB3: Lesson[] = [
  createLesson('g1-ing-b3-l1', 'L1: Simple Future com "Will" — Previsões e Decisões Espontâneas', 'ingles',
    '"Will" é usado para previsões (o que achamos que vai acontecer) e decisões tomadas no momento da fala. Estrutura: sujeito + will + verbo base. Exemplo: "I think it will rain tomorrow" (Acho que vai chover amanhã), "Wait, I\'ll help you!" (Espera, eu vou te ajudar — decisão espontânea). Negativa: won\'t (will not). "She won\'t come to the party". Interrogativa: "Will you be there?" Palavras-chave: tomorrow, next week, in the future, probably, I think.',
    ['Escreva 5 previsões sobre o futuro do planeta usando "will" e "won\'t".', 'Dê 3 exemplos de situações onde você usaria "will" para tomar uma decisão espontânea.']),

  createLesson('g1-ing-b3-l2', 'L2: Simple Future com "Be Going To" — Planos e Intenções', 'ingles',
    '"Be going to" é usado para planos já decididos antes do momento da fala e para previsões baseadas em evidências visíveis. Estrutura: sujeito + am/is/are + going to + verbo base. Exemplos: "I am going to study medicine" (Vou estudar medicina — plano), "Look at those clouds! It\'s going to rain" (Olha as nuvens! Vai chover — evidência). Diferença prática: "Will" = decisão no momento / "Be going to" = plano anterior ou evidência concreta.',
    ['Descreva seus planos para as próximas férias usando "be going to" em pelo menos 6 frases.', 'Explique a diferença entre "I will study" e "I am going to study" com exemplos do seu cotidiano.']),

  createLesson('g1-ing-b3-l3', 'L3: Will vs. Be Going To — Prática e Contraste', 'ingles',
    'Para escolher entre "will" e "be going to", pergunte-se: É uma decisão espontânea ou previsão sem evidência? → Will. É um plano já feito ou previsão com evidência? → Be going to. Exemplos contrastivos: "A: The phone is ringing! B: I\'ll get it!" (decisão espontânea → will). "A: What are your plans for the weekend? B: I\'m going to visit my grandparents." (plano → going to). Ambos são gramaticalmente corretos em muitos contextos, então o contexto decide.',
    ['Leia as situações e escolha will ou be going to, justificando sua escolha: 1) Você acaba de decidir ajudar um colega. 2) Você já comprou as passagens para viajar. 3) Você faz uma previsão sobre a tecnologia em 2050.', 'Escreva um texto sobre seus planos e sonhos para o futuro usando os dois estruturas.']),

  createLesson('g1-ing-b3-l4', 'L4: Verbos Modais — Can e Could', 'ingles',
    '"Can" expressa habilidade (capacidade) no presente: "I can speak English" (Eu consigo falar inglês). Também é usado para pedir e dar permissão de forma informal: "Can I use your pen?" (Posso usar sua caneta?). "Could" é o passado de "can": "When I was 5, I couldn\'t read" (Quando tinha 5 anos, não sabia ler). "Could" também é usado para pedir algo de forma mais educada/formal: "Could you help me, please?" (Você poderia me ajudar?). Ambos são invariáveis — nunca recebem -s, -ing ou -ed.',
    ['Escreva 4 frases usando "can" para falar sobre suas habilidades e limitações.', 'Qual a diferença de tom entre "Can you help me?" e "Could you help me?"? Em que situação cada um é mais apropriado?']),

  createLesson('g1-ing-b3-l5', 'L5: Verbos Modais — Should e Must', 'ingles',
    '"Should" expressa conselho, recomendação ou obrigação fraca: "You should exercise more" (Você deveria se exercitar mais). "You shouldn\'t eat so much sugar" (Você não deveria comer tanto açúcar). "Must" expressa obrigação forte (geralmente por regras externas ou necessidade interna): "Students must wear uniforms" (Os alunos devem usar uniforme). "You must see this movie, it\'s amazing!" (Você tem que ver esse filme, é incrível!). "Mustn\'t" = proibição forte: "You mustn\'t smoke here".',
    ['Dê 5 conselhos para um amigo que quer aprender inglês usando "should" e "shouldn\'t".', 'Liste 5 regras de convivência para a sua turma usando "must" e "mustn\'t".']),

  createLesson('g1-ing-b3-l6', 'L6: Verbos Modais — May e Might', 'ingles',
    '"May" e "might" expressam possibilidade ou incerteza. "May" indica possibilidade mais provável: "It may rain today" (Pode ser que chova hoje). Também é usado para pedir permissão formalmente: "May I come in?" (Posso entrar?). "Might" indica possibilidade menor ou mais incerta: "I might go to the party, but I\'m not sure" (Talvez eu vá à festa, mas não sei). Na prática cotidiana, "might" e "may" são frequentemente intercambiáveis, mas "might" soa ligeiramente mais informal e incerto.',
    ['Escreva 4 frases sobre situações incertas na sua vida usando "may" e "might".', 'Qual a diferença entre "must", "should", "may" e "might"? Organize em uma tabela do mais obrigatório ao mais incerto.']),

  createLesson('g1-ing-b3-l7', 'L7: Plurais Irregulares e Outros Casos Especiais', 'ingles',
    'A maioria dos plurais em inglês segue a regra do -s (book → books) ou -es (bus → buses, box → boxes). Mas há exceções importantes: man → men, woman → women, child → children, mouse → mice, goose → geese, tooth → teeth, foot → feet, person → people, fish → fish (sem mudança), sheep → sheep, deer → deer. Palavras com -f/-fe mudam para -ves: leaf → leaves, wife → wives, knife → knives. Palavras em -y após consoante: city → cities, baby → babies.',
    ['Escreva o plural de: child, tooth, goose, leaf, city, woman, fish, mouse, person, knife.', 'Por que inglês tem tantas exceções? Pesquise brevemente sobre a origem dos plurais irregulares.']),

  createLesson('g1-ing-b3-l8', 'L8: Vocabulário — Tecnologia e Redes Sociais', 'ingles',
    'O inglês domina o vocabulário tecnológico mundial. Termos essenciais: smartphone, app (application/aplicativo), social media (redes sociais), post (publicação), share (compartilhar), like (curtida), comment (comentário), follow (seguir), unfollow (deixar de seguir), stream (transmitir ao vivo), update (atualizar), password (senha), username (nome de usuário), Wi-Fi, Bluetooth, download/upload, artificial intelligence (inteligência artificial), algorithm (algoritmo), hack (hackear), cyberbullying.',
    ['Escreva sobre seu uso das redes sociais em inglês: que plataformas usa, com que frequência, para quê.', 'Quais são os riscos e benefícios das redes sociais? Escreva um pequeno texto argumentativo em inglês.']),

  createLesson('g1-ing-b3-l9', 'L9: Vocabulário — Meio Ambiente e Sustentabilidade', 'ingles',
    'Termos ambientais no inglês: climate change (mudança climática), global warming (aquecimento global), greenhouse effect (efeito estufa), deforestation (desmatamento), biodiversity (biodiversidade), endangered species (espécies ameaçadas), pollution (poluição), recycling (reciclagem), renewable energy (energia renovável), solar/wind power (energia solar/eólica), carbon footprint (pegada de carbono), sustainability (sustentabilidade). O Brasil é frequentemente mencionado em textos do ENEM sobre a Amazônia e biodiversidade.',
    ['Escreva um texto em inglês sobre os problemas ambientais do Brasil e o que pode ser feito para resolvê-los.', 'Traduza e explique: "The Amazon rainforest plays a crucial role in regulating the Earth\'s climate."']),

  createLesson('g1-ing-b3-l10', 'L10: Vocabulário — Saúde e Corpo Humano', 'ingles',
    'Partes do corpo: head (cabeça), face (rosto), eye (olho), ear (orelha), nose (nariz), mouth (boca), neck (pescoço), shoulder (ombro), arm (braço), hand (mão), chest (peito), back (costas), leg (perna), knee (joelho), foot (pé). Problemas de saúde: headache (dor de cabeça), fever (febre), cold (resfriado), flu (gripe), stomachache (dor de estômago), toothache (dor de dente). No médico: "I have a sore throat" (Estou com dor de garganta), "I feel nauseous" (Estou com náusea), "I\'m allergic to..." (Sou alérgico a...).',
    ['Escreva um diálogo entre paciente e médico descrevendo sintomas e recebendo orientações. Use vocabulário de saúde.', 'Descreva hábitos saudáveis e não saudáveis usando "should", "shouldn\'t", "must" e vocabulário de saúde.']),

  createLesson('g1-ing-b3-l11', 'L11: Vocabulário — Escola, Educação e Carreira', 'ingles',
    'Ambientes e pessoas: classroom (sala de aula), principal (diretor), counselor (orientador), librarian (bibliotecário), cafeteria (cantina), laboratory (laboratório). Disciplinas: Mathematics (Matemática), Physics (Física), Chemistry (Química), Biology (Biologia), History (História), Geography (Geografia), Literature (Literatura), Physical Education (Educação Física). Avaliações: test/exam (prova), grade/score (nota), pass/fail (passar/reprovar), scholarship (bolsa de estudos), university entrance exam (vestibular/ENEM), degree (diploma), graduation (formatura).',
    ['Descreva sua escola ideal em inglês: que recursos teria, como seriam as aulas, quais matérias seriam obrigatórias.', 'Qual carreira você quer seguir e por quê? Escreva sobre sua escolha profissional em inglês.']),

  createLesson('g1-ing-b3-l12', 'L12: Reading — Textos sobre Tecnologia', 'ingles',
    'Textos sobre tecnologia são frequentes no ENEM e em vestibulares. Ao ler, preste atenção ao vocabulário específico e ao posicionamento do autor (a favor ou contra?). Texto modelo: "Artificial intelligence is transforming the way we work and live. While some experts believe AI will create new jobs and improve our quality of life, others warn about the risks of automation replacing human workers." Identifique: argumento central, evidências apresentadas, posição do autor e possíveis contrapargumentos.',
    ['Leia o texto modelo e identifique: 1) O argumento central. 2) Dois lados apresentados. 3) Sua posição sobre o tema.', 'Pesquise uma notícia em inglês sobre tecnologia e faça um resumo em português com o vocabulário técnico identificado.']),

  createLesson('g1-ing-b3-l13', 'L13: Inglês nas Músicas — Análise de Letras', 'ingles',
    'A música é uma das melhores formas de aprender inglês de forma natural. Ao analisar uma letra em inglês: identifique o tema principal, procure expressões idiomáticas, observe os tempos verbais usados, note as rimas e o ritmo. Expressões idiomáticas comuns em músicas: "break a leg" (boa sorte), "under the weather" (estar mal de saúde), "piece of cake" (moleza), "hit the road" (partir), "burning bridges" (queimar pontes), "lost in translation" (perdido na tradução).',
    ['Escolha uma música em inglês que você gosta e analise a letra: tema, expressões, tempos verbais e o que você aprendeu.', 'Explique o significado das expressões idiomáticas listadas e crie uma frase original com cada uma.']),

  createLesson('g1-ing-b3-l14', 'L14: Inglês nos Filmes e Séries — Estratégias de Aprendizagem', 'ingles',
    'Filmes e séries são recursos riquíssimos para aprender inglês. Estratégias: primeiro assista com legenda em português para entender a história; depois, com legenda em inglês para conectar o som às palavras; por fim, sem legenda (o objetivo final). Anote expressões novas, gírias e vocabulário informal. Gírias americanas comuns: "What\'s up?" (E aí?), "No way!" (De jeito nenhum!), "I\'m down" (Tô dentro/Pode ser), "My bad" (Minha culpa), "Hang on" (Espera um segundo), "Chill out" (Relaxa).',
    ['Qual série ou filme em inglês você recomendaria para aprender o idioma? Justifique em inglês.', 'Anote 5 expressões informais que você já ouviu em filmes ou séries e tente explicar o significado de cada uma.']),

  createLesson('g1-ing-b3-l15', 'L15: Internet e Comunicação Digital em Inglês', 'ingles',
    'A internet é predominantemente em inglês. Termos de comunicação digital: email (e-mail), attachment (anexo), subject line (assunto), reply (responder), forward (encaminhar), spam (lixo eletrônico), inbox (caixa de entrada), thread (fio de conversa). Chat informal: LOL (Laughing Out Loud — risos), BRB (Be Right Back — já volto), ASAP (As Soon As Possible — o mais rápido possível), FYI (For Your Information — para sua informação), DM (Direct Message — mensagem direta), TBH (To Be Honest — para ser honesto), IMO (In My Opinion).',
    ['Escreva um e-mail formal em inglês solicitando informações sobre um curso universitário.', 'Quais abreviações digitais em inglês você já usou ou viu? Liste 10 e explique o significado.']),

  createLesson('g1-ing-b3-l16', 'L16: Música, Arte e Cultura Pop em Inglês', 'ingles',
    'A cultura pop anglófona influencia o mundo inteiro. Gêneros musicais originários dos EUA/UK: jazz, blues, rock, pop, hip-hop, country, electronic, soul, R&B. Artistas que mudaram a história: The Beatles (UK), Michael Jackson, Elvis Presley, Beyoncé, Taylor Swift. O cinema hollywoodiano exporta o inglês americano. Em videogames, a maioria dos jogos é em inglês, o que naturalmente ensina vocabulário e comandos. A cultura pop é uma entrada poderosa para o aprendizado da língua.',
    ['Como a cultura pop americana ou britânica influenciou seu interesse pelo inglês? Descreva em inglês.', 'Analise o título e tema de uma música, filme ou série em inglês e explique o vocabulário e contexto cultural.']),

  createLesson('g1-ing-b3-l17', 'L17: Produção Textual — Escrevendo um Parágrafo Argumentativo', 'ingles',
    'Um parágrafo argumentativo em inglês segue o modelo PIE: Point (ponto/tese), Illustration (exemplo ou evidência), Explanation (explicação de como o exemplo apoia a tese). Exemplo: "Social media has both positive and negative effects on teenagers. (P) For instance, platforms like Instagram can cause anxiety and low self-esteem when young people compare themselves to idealized images. (I) This shows that excessive use of social media can be harmful to mental health. (E)" Conectivos úteis: however, therefore, furthermore, in addition, on the other hand, as a result.',
    ['Escreva um parágrafo argumentativo em inglês sobre um dos seguintes temas: tecnologia, meio ambiente ou educação.', 'Identifique Point, Illustration e Explanation em um parágrafo de texto jornalístico em inglês.']),

  createLesson('g1-ing-b3-l18', 'L18: Revisão do 3º Bimestre — Futuro, Modais e Vocabulário Temático', 'ingles',
    'Revisão completa: Simple Future (will / be going to), verbos modais (can, could, should, must, may, might), plurais irregulares, vocabulário de tecnologia, meio ambiente, saúde e escola. Para o ENEM, o inglês aparece em 5 questões que testam principalmente interpretação de texto — raramente gramática isolada. O foco é entender o sentido geral, identificar a ideia principal, reconhecer o gênero textual e o posicionamento do autor.',
    ['Escreva um pequeno texto usando: will, be going to, should, must e can — todos em contexto natural.', 'O que você já sabe sobre as questões de inglês do ENEM? O que mais te preocupa? Como pretende se preparar?']),
];

export const ingLessonsB4: Lesson[] = [
  createLesson('g1-ing-b4-l1', 'L1: Estratégias de Leitura — Skimming e Scanning', 'ingles',
    'Skimming significa ler rapidamente para captar a ideia geral de um texto, sem focar em cada palavra. É útil para entender o tema, o propósito e a organização do texto. Scanning significa procurar informações específicas no texto (um nome, uma data, um número), como quando você busca um nome numa lista. No ENEM, você terá poucos minutos por questão, então essas técnicas são essenciais. Sempre leia as perguntas ANTES do texto para saber o que procurar.',
    ['Pratique skimming: leia um parágrafo em 30 segundos e escreva a ideia principal com suas palavras.', 'Pratique scanning: no mesmo texto, encontre e destaque todas as datas e nomes mencionados.']),

  createLesson('g1-ing-b4-l2', 'L2: Estratégias de Leitura — Inferência e Vocabulário em Contexto', 'ingles',
    'Inferência é a habilidade de deduzir o significado de uma palavra ou trecho que você não conhece, usando o contexto ao redor. Exemplo: "The elderly man walked slowly with a cane" — mesmo sem saber "cane", o contexto (homem idoso, andar devagar) permite inferir que é um objeto de apoio (bengala). No ENEM, questões de inglês frequentemente pedem o significado de uma expressão no contexto, não a tradução literal. Procure pistas no parágrafo anterior e posterior.',
    ['Tente inferir o significado das palavras em negrito sem usar dicionário: "The scientists discovered a new **species** in the **remote** jungle of the Amazon."', 'Qual a diferença entre tradução literal e inferência por contexto? Por que a inferência é mais útil na vida real?']),

  createLesson('g1-ing-b4-l3', 'L3: Gêneros Textuais — News Report (Notícia)', 'ingles',
    'Uma notícia em inglês (news report) segue a estrutura clássica do "5W+H": Who (quem), What (o quê), Where (onde), When (quando), Why (por quê) e How (como). O título (headline) é curto e impactante, frequentemente sem artigos ou auxiliares: "Amazon Fire Threatens Biodiversity" em vez de "An Amazon Fire Is Threatening...". O lead (primeiro parágrafo) resume toda a notícia. Os parágrafos seguintes detalham, do mais para o menos importante (pirâmide invertida).',
    ['Analise uma headline em inglês: identifique o 5W+H e explique o que provavelmente aconteceu.', 'Escreva uma notícia curta em inglês (100-150 palavras) sobre um evento da sua escola ou cidade.']),

  createLesson('g1-ing-b4-l4', 'L4: Gêneros Textuais — Advertisement (Anúncio Publicitário)', 'ingles',
    'Anúncios publicitários em inglês usam linguagem persuasiva, imperativa e emocional para convencer o leitor. Características: slogan curto e memorável ("Just Do It" — Nike), verbos no imperativo ("Buy now!", "Try it today!"), uso de superlativos ("the best", "the most advanced"), apelo emocional ou à autoridade, imagens e cores estratégicas. O público-alvo (target audience) determina o tom: jovens recebem linguagem informal; adultos, mais formal. No ENEM, questões sobre anúncios perguntam sobre o objetivo e o público.',
    ['Analise um anúncio em inglês e identifique: público-alvo, slogan, apelo usado e objetivo do anúncio.', 'Crie um anúncio em inglês para um produto imaginário, usando técnicas persuasivas que você aprendeu.']),

  createLesson('g1-ing-b4-l5', 'L5: Gêneros Textuais — Social Media Posts e Memes', 'ingles',
    'Posts de redes sociais e memes são gêneros textuais modernos reconhecidos pelo ENEM. Características dos posts: texto curto e direto, uso de hashtags (#), emojis, linguagem informal, abreviações. Memes usam humor, ironia e referências culturais para criticar, comentar ou entreter. Para interpretar um meme em inglês, é preciso entender o contexto cultural, a ironia e o humor implícito. Exemplo de estrutura de meme: imagem + texto que subverte a expectativa criada.',
    ['Explique o humor ou crítica de um meme em inglês que você conhece, descrevendo o contexto necessário para entendê-lo.', 'Qual a importância de estudar memes e posts como gêneros textuais? Como eles refletem a cultura contemporânea?']),

  createLesson('g1-ing-b4-l6', 'L6: Gêneros Textuais — Infographic (Infográfico)', 'ingles',
    'Infográficos combinam texto, dados e imagens para apresentar informações de forma visual e rápida. Em inglês, são comuns em revistas, sites de notícias e materiais educativos. Vocabulário típico de infográficos: according to (de acordo com), data shows that (os dados mostram que), percentage (porcentagem), survey (pesquisa/levantamento), statistics (estatísticas), trend (tendência), increase/decrease (aumento/diminuição), majority/minority (maioria/minoria). No ENEM, infográficos em inglês pedem que o aluno interprete dados e tire conclusões.',
    ['Analise um infográfico em inglês: quais dados são apresentados, qual a conclusão principal, quem seria o público-alvo?', 'Crie um infográfico simples (esboço desenhado) em inglês sobre um tema que você domina.']),

  createLesson('g1-ing-b4-l7', 'L7: Textos Culturais — Povos de Língua Inglesa', 'ingles',
    'O inglês é a língua oficial ou cooficial de mais de 50 países: EUA, Reino Unido, Austrália, Nova Zelândia, Canadá, Irlanda, África do Sul, Jamaica, Nigéria, Índia, entre outros. Cada país tem sua variante cultural única, com expressões, gírias e referências diferentes. O conceito de "World Englishes" reconhece que não existe um inglês "certo" — cada variedade tem igual legitimidade. Conhecer essa diversidade amplia a compreensão intercultural e é fundamental para a comunicação global.',
    ['Pesquise sobre o inglês em um país que você não estudou ainda (ex: Jamaica, Nigéria, Índia). O que é especial sobre o inglês falado lá?', 'Por que é importante reconhecer que o inglês tem muitas variedades e que todas são válidas?']),

  createLesson('g1-ing-b4-l8', 'L8: Textos Culturais — Austrália e Nova Zelândia', 'ingles',
    'Austrália e Nova Zelândia têm culturas fascinantes ligadas ao inglês. A Austrália tem o gíria informal única: "G\'day" (Bom dia), "mate" (amigo), "no worries" (sem problema), "arvo" (tarde). Os aborígenes australianos têm uma das culturas mais antigas do planeta. A Nova Zelândia é conhecida pelos Maori e pela trilogia O Senhor dos Anéis. Ambos os países são exemplos de como o inglês se adaptou a contextos culturais muito diferentes dos originais britânicos.',
    ['Compare a cultura australiana com a brasileira em pelo menos 3 aspectos. Escreva em inglês.', 'O que você conhece sobre as culturas indígenas da Austrália (aborígenes) ou Nova Zelândia (Maori)? Pesquise e escreva em inglês.']),

  createLesson('g1-ing-b4-l9', 'L9: Textos Culturais — África do Sul e Países Africanos Anglófonos', 'ingles',
    'Vários países africanos têm o inglês como língua oficial, resultado da colonização britânica. África do Sul: 11 línguas oficiais, incluindo inglês; marcada pela luta contra o apartheid liderada por Nelson Mandela. Nigéria: maior país anglófono da África em população; forte literatura em inglês (Chimamanda Ngozi Adichie). Gana, Quênia, Uganda, Tanzânia, Zâmbia também são anglófonos. A literatura africana em inglês oferece perspectivas pós-coloniais riquíssimas sobre identidade, raça e resistência.',
    ['O que você sabe sobre Nelson Mandela? Escreva um parágrafo sobre ele em inglês.', 'Por que a literatura africana em inglês é importante para diversificar nossa visão do mundo anglófono?']),

  createLesson('g1-ing-b4-l10', 'L10: Textos Culturais — Índia e o Inglês como Língua Franca', 'ingles',
    'A Índia tem mais de 125 milhões de falantes de inglês como segundo idioma, tornando-a um dos maiores países anglófonos do mundo. O inglês indiano (Hinglish) mistura inglês com hindi e outras línguas locais. Autores indianos como Arundhati Roy escrevem em inglês e ganharam reconhecimento mundial. O conceito de "English as a Lingua Franca" (ELF) descreve o uso do inglês como meio de comunicação entre pessoas que não são falantes nativos — o uso mais comum do inglês no mundo hoje.',
    ['O que é "English as a Lingua Franca" e por que isso muda a forma como devemos aprender inglês?', 'Como o inglês pode ser usado para conectar pessoas de culturas totalmente diferentes? Dê exemplos concretos.']),

  createLesson('g1-ing-b4-l11', 'L11: Compreensão de Texto — Identificando o Tema Principal', 'ingles',
    'O tema principal (main idea) de um texto em inglês está geralmente na primeira ou última frase do parágrafo introdutório. Para identificá-lo: pergunte "Do que se trata este texto?"; ignore detalhes e exemplos; procure a palavra ou ideia que se repete ao longo do texto. A ideia principal é diferente do tópico: o tópico é o assunto geral (ex: climate change), a ideia principal é o que o texto diz sobre esse assunto (ex: "Climate change is the most urgent threat of our century").',
    ['Leia um parágrafo de 5-7 linhas em inglês e identifique o tópico e a ideia principal, diferenciando-os claramente.', 'Por que identificar a ideia principal é mais importante do que entender cada palavra de um texto?']),

  createLesson('g1-ing-b4-l12', 'L12: Compreensão de Texto — Reconhecendo Tom e Intenção do Autor', 'ingles',
    'O tom de um texto revela a atitude do autor em relação ao tema: formal/informal, positivo/negativo, neutro/apaixonado, irônico/sério. Palavras que indicam tom: positive words (amazing, crucial, vital), negative words (terrible, alarming, destructive), hedging words (may, might, possibly, seemingly — indicam cautela). A intenção (purpose) pode ser: informar (inform), persuadir (persuade), entreter (entertain), criticar (critique). No ENEM, identificar o tom e a intenção é frequentemente cobrado nas questões de inglês.',
    ['Leia dois textos sobre o mesmo tema com tons diferentes (ex: um artigo científico e um editorial de jornal) e compare o tom de cada um.', 'Como a escolha das palavras revela a posição do autor? Analise um parágrafo e mostre como o vocabulário indica o ponto de vista.']),

  createLesson('g1-ing-b4-l13', 'L13: Textos Multimodais — Combinando Imagem e Texto', 'ingles',
    'Textos multimodais combinam diferentes modos de comunicação: texto escrito, imagem, gráficos, cores, layout. Exemplos: capas de revistas, anúncios, cartazes, infográficos, quadrinhos (comics). Para analisar um texto multimodal em inglês: observe a imagem com atenção antes de ler; considere como imagem e texto se complementam ou contrastam; identifique o propósito comunicativo. No ENEM, questões de inglês frequentemente apresentam textos multimodais como charges, anúncios e posts.',
    ['Analise uma charge (cartoon) em inglês: qual é a crítica? Como imagem e texto trabalham juntos?', 'Crie um anúncio multimodal em inglês: esboce a imagem e escreva o texto que acompanha, justificando suas escolhas.']),

  createLesson('g1-ing-b4-l14', 'L14: Humor, Ironia e Implícito em Textos em Inglês', 'ingles',
    'Humor e ironia são recursos linguísticos e culturais desafiadores em inglês. A ironia diz o oposto do que quer expressar: "Oh great, another Monday!" (sem sarcasmo no texto, mas com sarcasmo implícito). Puns (trocadilhos) exploram a dupla significação das palavras. Para entender humor em inglês, é preciso conhecer o contexto cultural. O sentido implícito (o que NÃO está escrito mas se entende) é testado nas questões de inglês do ENEM. Procure sempre o que está "nas entrelinhas" (reading between the lines).',
    ['Explique o humor ou ironia presente em uma charge, meme ou tirinhas em inglês que você conhece.', 'O que significa "reading between the lines"? Como essa habilidade ajuda na interpretação de textos do ENEM?']),

  createLesson('g1-ing-b4-l15', 'L15: Revisão de Gramática Essencial para Leitura', 'ingles',
    'Para interpretar textos em inglês no ENEM, é importante reconhecer as estruturas gramaticais mais comuns: Simple Present e Past (narrativas e artigos), Present Perfect (experiências e resultados), Modais (possibilidade, obrigação, conselho), Passive Voice (textos científicos e notícias), Relative Clauses (who, which, that — para identificar qual pessoa ou coisa está sendo descrita), Conditionals (hipóteses). Você não precisa conjugar verbos, apenas RECONHECER o que cada estrutura significa no contexto.',
    ['Identifique o tempo verbal e explique o significado de cada frase: "Scientists have discovered that...", "This policy was implemented...", "If we don\'t act now, the consequences will be..."', 'Por que reconhecer estruturas gramaticais é mais importante do que saber conjugar verbos para o ENEM?']),

  createLesson('g1-ing-b4-l16', 'L16: Anglicismos no Português e Empréstimos Linguísticos', 'ingles',
    'Anglicismos são palavras de origem inglesa incorporadas ao português: show, shopping, selfie, hashtag, internet, site, blog, fake news, delivery, drive-thru, check-in, outdoor, ranking, marketing. Alguns mantêm a grafia original, outros se adaptam: "printada" (de print), "deletar" (de delete), "estressar" (de stress), "tuitar" (de tweet). Esse fenômeno mostra a influência cultural e econômica dos países anglófonos no Brasil e no mundo — e é um tema possível no ENEM.',
    ['Liste 20 anglicismos que você usa no dia a dia e explique o contexto em que cada um aparece.', 'Você acha que os anglicismos enriquecem ou prejudicam a língua portuguesa? Argumente em pelo menos 5 frases.']),

  createLesson('g1-ing-b4-l17', 'L17: Prática Final — Questões Estilo ENEM de Inglês', 'ingles',
    'As 5 questões de inglês no ENEM são de interpretação de texto. Dicas finais: leia as alternativas antes do texto para saber o que procurar; não se prenda em palavras desconhecidas — use o contexto; confie na sua intuição sobre o significado geral; fique atento ao gênero textual (a linguagem muda); compare o texto com seu conhecimento de mundo. Textos comuns no ENEM: anúncios, notícias, posts, infográficos, tiras cômicas, textos literários, letras de música.',
    ['Resolva 3 questões de inglês de ENEMs anteriores e explique seu raciocínio para chegar à resposta correta.', 'Quais foram suas maiores dificuldades ao resolver as questões? O que você precisa revisar?']),

  createLesson('g1-ing-b4-l18', 'L18: Reflexão Final — Inglês Como Ferramenta de Vida', 'ingles',
    'Ao final da 1ª série, reflita: o inglês não é apenas uma disciplina escolar — é uma ferramenta real de acesso ao conhecimento, às oportunidades e à comunicação global. Você já é capaz de compreender textos simples, descrever sua rotina, falar sobre si mesmo e interpretar gêneros textuais variados. O aprendizado de uma língua é contínuo e se dá na prática diária: ouça músicas, assista séries, leia textos e tente se expressar sem medo de errar. Every expert was once a beginner.',
    ['Escreva uma carta em inglês para você mesmo no futuro, descrevendo quem você é hoje e o que espera alcançar.', 'What\'s your English learning goal for next year? Write a plan with at least 5 specific actions you will take.']),
];
