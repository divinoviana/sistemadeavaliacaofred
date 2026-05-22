import { Lesson } from './types';
import { createLesson } from './data_helpers';

// Artes 3ª Série: 18 aulas por bimestre (Total 72)
export const artLessonsB1: Lesson[] = [
  createLesson('g3-art-b1-l1', 'L1: Arte Brasileira Contemporânea — Um Panorama', 'artes',
    'A arte brasileira contemporânea é uma das mais vibrantes e reconhecidas do mundo, presente nos maiores museus e feiras internacionais. Ela reflete as contradições de um país megadiverso: a violência e a beleza, a riqueza e a desigualdade, a ancestralidade e a modernidade. Entender esse cenário é fundamental para qualquer estudante que queira compreender a cultura e a identidade brasileiras.',
    ['Quais são as principais características que tornam a arte contemporânea brasileira reconhecida internacionalmente?', 'Como as contradições da sociedade brasileira (riqueza/pobreza, diversidade/desigualdade) se refletem na produção artística contemporânea?']),

  createLesson('g3-art-b1-l2', 'L2: Movimentos da Arte Brasileira Contemporânea', 'artes',
    'A arte contemporânea brasileira inclui movimentos como o Neoconcretismo (Lygia Clark, Hélio Oiticica), a Arte Povera tropical, o Tropicalismo, a arte conceitual engajada e a arte afro-brasileira e indígena contemporânea. Cada movimento responde a contextos históricos específicos e dialoga com tradições nacionais e internacionais de forma original.',
    ['Como o Neoconcretismo brasileiro diferiu do Concretismo e qual foi sua contribuição original?', 'Qual movimento da arte contemporânea brasileira você considera mais relevante para entender o Brasil atual?']),

  createLesson('g3-art-b1-l3', 'L3: Artistas Brasileiros Contemporâneos em Destaque', 'artes',
    'Artistas como Arthur Bispo do Rosário (que criou uma obra monumental dentro de um hospital psiquiátrico), Adriana Varejão, Ernesto Neto, Vik Muniz e os artistas indígenas Jaider Esbell e Daiara Tukano representam a pluralidade e profundidade da arte contemporânea brasileira. Cada um traz uma perspectiva única sobre o que significa ser brasileiro no século XXI.',
    ['O que a obra de Arthur Bispo do Rosário revela sobre as fronteiras entre arte, loucura e genialidade?', 'Escolha um dos artistas citados e explique por que sua obra é importante para a arte contemporânea brasileira.']),

  createLesson('g3-art-b1-l4', 'L4: Galerias e Mercado de Arte no Brasil', 'artes',
    'O mercado de arte no Brasil movimenta bilhões de reais anualmente, com grandes galerias em São Paulo (Galeria Millan, Fortes D\'Aloia e Gabriel) e no Rio de Janeiro. As feiras de arte como a SP-Arte e a Bolsa de Arte são vitrines importantes para artistas emergentes. Ao mesmo tempo, o mercado de arte é altamente elitizado, acessível a poucos — o que levanta questões sobre democratização cultural.',
    ['Como funciona o mercado de arte no Brasil e quais são seus principais atores?', 'Quais são as contradições e os problemas de um mercado de arte elitizado em um país com tanta desigualdade social?']),

  createLesson('g3-art-b1-l5', 'L5: Curadoria e Crítica de Arte', 'artes',
    'O curador é o profissional que seleciona, organiza e contextualiza obras de arte para exposições, criando um discurso e uma narrativa a partir da escolha das obras. O crítico de arte analisa, interpreta e avalia obras num contexto histórico, cultural e estético. Ambos têm poder enorme sobre quais obras e artistas recebem visibilidade — e por isso sua independência e diversidade são fundamentais.',
    ['Qual é o papel do curador numa exposição de arte e como ele influencia a leitura das obras?', 'Por que é importante que críticos e curadores de arte representem perspectivas diversas (negras, indígenas, femininas, periféricas)?']),

  createLesson('g3-art-b1-l6', 'L6: Arte e Ditadura Militar no Brasil (1964-1985)', 'artes',
    'Durante a ditadura militar brasileira (1964-1985), artistas, músicos, escritores e cineastas foram censurados, perseguidos, torturados e exilados. Apesar disso, a arte foi um dos principais espaços de resistência: músicos como Chico Buarque e Caetano Veloso usavam metáforas e ambiguidades para driblaram a censura; grupos de teatro como o Arena e o Oficina criavam obras que questionavam o regime.',
    ['Como os artistas brasileiros usaram a linguagem artística para resistir à censura durante a ditadura?', 'O que acontece com a criação artística quando ela é censurada por um regime autoritário?']),

  createLesson('g3-art-b1-l7', 'L7: Tropicalismo — Revolução Cultural', 'artes',
    'O Tropicalismo (1967-1968) foi muito mais que um movimento musical: foi uma ruptura cultural total, misturando rock, samba, nordestino, pop, humor e crítica política. Além de Caetano Veloso e Gilberto Gil, o movimento incluiu os Mutantes, Tom Zé, Gal Costa e Rogério Duprat. O Manifesto Tropicalista propunha "devorar" toda a cultura mundial e transformá-la em algo radicalmente brasileiro.',
    ['Quais eram as provocações estéticas e políticas do Tropicalismo?', 'Como a mistura aparentemente contraditória de elementos (guitarra elétrica e berimbau, Beatles e baião) era uma estratégia artística e política?']),

  createLesson('g3-art-b1-l8', 'L8: Caetano Veloso e Gilberto Gil — Ícones da Resistência', 'artes',
    'Caetano Veloso e Gilberto Gil são os maiores representantes do Tropicalismo e da MPB de resistência. Presos pela ditadura em 1969 e exilados em Londres, continuaram criando obras de extraordinária qualidade e profundidade. Gil foi Ministro da Cultura no governo Lula (2003-2008), priorizando a diversidade e o acesso à cultura. Ambos são intelectuais e artistas de alcance universal.',
    ['Por que Caetano Veloso e Gilberto Gil foram considerados ameaças pela ditadura militar?', 'Como a experiência do exílio influenciou a obra musical e intelectual de Caetano e Gil?']),

  createLesson('g3-art-b1-l9', 'L9: Cinema de Resistência — Cinema Novo Brasileiro', 'artes',
    'O Cinema Novo brasileiro (anos 1960-70) foi um movimento de cinema político e estético liderado por Glauber Rocha, Nelson Pereira dos Santos e Leon Hirszman. Inspirado pelo Neorrealismo italiano e pela Nouvelle Vague francesa, usava câmeras na mão, luz natural e atores não profissionais para retratar a pobreza, o misticismo e a opressão do povo brasileiro.',
    ['Quais eram os princípios estéticos e políticos do Cinema Novo brasileiro?', 'Como o Cinema Novo se diferenciou do cinema comercial americano na sua forma de contar histórias?']),

  createLesson('g3-art-b1-l10', 'L10: Teatro de Resistência no Brasil', 'artes',
    'O teatro brasileiro dos anos 1960-70 foi um dos espaços mais importantes de resistência à ditadura. O Teatro de Arena (SP), o Teatro Oficina (SP) e o CPC (Centro Popular de Cultura) criavam peças que discutiam a exploração, a luta de classes e os direitos do povo. Figuras como Augusto Boal, Gianfrancesco Guarnieri e Zé Celso Martinez Corrêa arriscaram suas liberdades para fazer teatro político.',
    ['Como o teatro foi usado como instrumento de resistência política durante a ditadura militar brasileira?', 'O que o Teatro do Oprimido de Augusto Boal propõe de diferente em relação ao teatro convencional?']),

  createLesson('g3-art-b1-l11', 'L11: Arte Gráfica e Comunicação Visual de Resistência', 'artes',
    'O cartaz político, os fanzines, os panfletos e as capas de discos foram instrumentos fundamentais de resistência artística no Brasil ditatorial e nas lutas por direitos civis. Designers como Rogério Duarte criaram uma estética visual tropicalista revolucionária. Hoje, esse legado continua nas artes gráficas de movimentos sociais, no grafite político e nos posts de ativismo digital.',
    ['Como as artes gráficas (cartazes, capas de disco, fanzines) funcionaram como instrumento de resistência política?', 'De que forma os memes e posts de ativismo digital são os herdeiros do cartaz político de resistência?']),

  createLesson('g3-art-b1-l12', 'L12: Arte e Pós-ditadura — Redemocratização e Novas Vozes', 'artes',
    'Com a redemocratização do Brasil (1985), novos artistas e grupos culturais antes silenciados ganharam voz. O hip hop, o grafite, o punk, o rock nacional e as artes visuais das periferias explodiram como expressões de uma sociedade que finalmente podia se expressar livremente. Mas a redemocratização não eliminou as desigualdades estruturais que determinam quem pode e quem não pode fazer arte.',
    ['Como a redemocratização transformou o campo artístico e cultural brasileiro?', 'Por que a liberdade política não foi suficiente para democratizar o acesso à criação e ao consumo de arte no Brasil?']),

  createLesson('g3-art-b1-l13', 'L13: Arte Contemporânea e Questão Racial no Brasil', 'artes',
    'O debate racial é central na arte contemporânea brasileira. Artistas negros como Rubem Valentim, Emanoel Araújo e Rosana Paulino criam obras que afirmam a estética afro-brasileira e questionam o racismo estrutural. O movimento das artes negras luta por representação nos museus, nas faculdades de artes e no mercado artístico, historicamente dominados pela perspectiva branca.',
    ['Como os artistas negros brasileiros usam a arte para questionar o racismo estrutural?', 'Por que a representação de artistas negros nos museus e nas instituições culturais é uma questão política e não apenas estética?']),

  createLesson('g3-art-b1-l14', 'L14: Arte e Território — Identidade Regional nas Artes', 'artes',
    'A identidade regional é uma das riquezas da arte brasileira: a arte nordestina (cordel, xilogravura, cerâmica), a arte amazônica (arte indígena, artesanato ribeirinho), a arte sulista (influências germânicas e italianas) e a arte do Centro-Oeste (cerrado, diversidade étnica) criam um mosaico cultural único. No Tocantins, artistas e artesãos produzem obras que expressam a identidade do cerrado e da diversidade étnica.',
    ['Como a identidade regional influencia a produção artística em diferentes partes do Brasil?', 'Quais são as expressões artísticas que você considera mais representativas da identidade cultural do Tocantins?']),

  createLesson('g3-art-b1-l15', 'L15: Arte Indígena Contemporânea e o Museu', 'artes',
    'Os povos indígenas brasileiros estão reivindicando o direito de participar do circuito de arte contemporânea em seus próprios termos — não como objetos de estudo antropológico, mas como agentes culturais plenos. A Bienal de São Paulo e o Museu do Amanhã já incluíram obras de artistas indígenas contemporâneos. Esse processo levanta questões sobre a autonomia, o direito autoral e a valorização da arte indígena.',
    ['Quais são os desafios que os artistas indígenas enfrentam ao entrar no circuito de arte contemporânea sem serem exotizados?', 'Como o reconhecimento da arte indígena nos museus e bienais contribui para os direitos dos povos indígenas?']),

  createLesson('g3-art-b1-l16', 'L16: Arte Brasileira nas Bienais Internacionais', 'artes',
    'A Bienal de São Paulo (fundada em 1951) é a segunda maior exposição de arte do mundo, perdendo apenas para a Bienal de Veneza. Ela trouxe para o Brasil as vanguardas artísticas internacionais e projetou artistas brasileiros no cenário mundial. Participar de bienais internacionais é um dos maiores reconhecimentos que um artista pode receber, mas o acesso a esses espaços ainda é muito desigual.',
    ['Qual é a importância da Bienal de São Paulo para a arte brasileira e para o intercâmbio cultural internacional?', 'O que impede artistas de regiões como o Norte do Brasil (Pará, Tocantins) de ter maior visibilidade nas grandes bienais nacionais?']),

  createLesson('g3-art-b1-l17', 'L17: Arte e Tecnologia — Novas Possibilidades para Artistas', 'artes',
    'A tecnologia digital abriu novas possibilidades para artistas de regiões periféricas e de grupos marginalizados: criar sem grandes investimentos, distribuir globalmente pela internet, conectar-se com comunidades e mercados internacionais. Um artista do Tocantins pode hoje ter seguidores em todo o mundo e vender obras digitais para colecionadores de outros países, algo impossível há 20 anos.',
    ['Como a tecnologia digital democratizou as possibilidades de criação e distribuição para artistas de regiões periféricas?', 'Quais são os limites dessa democratização — o que ainda impede artistas periféricos de ter igualdade de oportunidades?']),

  createLesson('g3-art-b1-l18', 'L18: Prática — Projeto de Arte de Resistência', 'artes',
    'Nesta aula prática, você vai criar uma obra de arte inspirada no conceito de resistência: pode ser sobre qualquer tema que você considere importante questionar ou denunciar na sua realidade — racismo, desigualdade, violência, destruição ambiental, ou qualquer outra injustiça. Use a linguagem artística que preferir e explique o conceito por trás da sua criação.',
    ['Qual injustiça ou questão social você escolheu abordar na sua obra de resistência e por quê?', 'Como a linguagem artística que você escolheu amplifica a mensagem que você quer transmitir?']),
];

export const artLessonsB2: Lesson[] = [
  createLesson('g3-art-b2-l1', 'L1: Patrimônio Cultural do Tocantins — Introdução', 'artes',
    'O Tocantins é o estado mais novo do Brasil (criado em 1988), mas tem um patrimônio cultural riquíssimo forjado por séculos de ocupação indígena, quilombola, ribeirinha e migrante. Seus bens culturais refletem a diversidade étnica e a relação profunda das comunidades com o Cerrado, o Rio Tocantins e as tradições religiosas e festivas que atravessam gerações.',
    ['Por que o Tocantins, sendo um estado jovem, tem um patrimônio cultural tão rico e diverso?', 'Quais são as principais matrizes culturais (indígena, africana, europeia, regional) que formam a identidade cultural do Tocantins?']),

  createLesson('g3-art-b2-l2', 'L2: Povos Indígenas do Tocantins — Arte e Cultura Viva', 'artes',
    'O Tocantins abriga importantes povos indígenas como os Krahô, os Xerente, os Karajá e os Apinajé, cada um com sua própria língua, arte, cosmologia e modo de vida. A arte Karajá, especialmente as bonecas ritxòkò (bonecas de cerâmica), é patrimônio imaterial do Brasil reconhecido pela UNESCO. Essas culturas estão vivas e em constante adaptação ao mundo contemporâneo.',
    ['Quais são os principais povos indígenas do Tocantins e quais são suas expressões artísticas mais características?', 'Por que as bonecas ritxòkò dos Karajá foram reconhecidas como Patrimônio Imaterial do Brasil?']),

  createLesson('g3-art-b2-l3', 'L3: Comunidades Quilombolas do Tocantins', 'artes',
    'O Tocantins possui mais de 70 comunidades quilombolas, que preservam tradições africanas e criaram uma identidade cultural própria ao longo de séculos de resistência. A música, a dança, o artesanato, os saberes medicinais e as festas religiosas dessas comunidades são expressões de uma herança ancestral que resistiu à escravidão e continua viva.',
    ['Quais tradições culturais africanas foram preservadas pelas comunidades quilombolas do Tocantins?', 'Como a cultura quilombola contribui para a identidade cultural do estado do Tocantins?']),

  createLesson('g3-art-b2-l4', 'L4: Festas Tradicionais do Tocantins', 'artes',
    'O Tocantins tem festas tradicionais que reúnem religiosidade, música, dança e gastronomia: a Romaria de Bonfim (em Natividade), o Festival de Verão (em Palmas), as festas juninas do interior, a Cavalhada de Taguatinga e as celebrações indígenas. Cada festa é um espetáculo artístico que celebra a identidade e a memória coletiva de suas comunidades.',
    ['Descreva uma festa tradicional do Tocantins e explique quais linguagens artísticas ela reúne.', 'Como as festas tradicionais preservam e transmitem a identidade cultural de uma comunidade?']),

  createLesson('g3-art-b2-l5', 'L5: Artesanato do Tocantins e do Cerrado', 'artes',
    'O artesanato do Tocantins usa materiais do Cerrado — buriti, capim dourado, barro, madeira — para criar objetos de beleza única. O capim dourado de Jalapão é o exemplo mais famoso: artesãs da região de Mateiros e São Félix do Tocantins transformam o capim dourado em bolsas, cestos e adornos que são vendidos em todo o Brasil e exportados para o exterior.',
    ['O que torna o artesanato de capim dourado do Tocantins único e tão valorizado?', 'Como o artesanato do cerrado reflete a relação das comunidades tocantinenses com seu ambiente natural?']),

  createLesson('g3-art-b2-l6', 'L6: Arte Afro-Brasileira — Candomblé e Estética', 'artes',
    'O Candomblé e outras religiões de matriz africana são, ao mesmo tempo, sistemas espirituais e estéticos completos: as roupas brancas e coloridas dos terreiros, os objetos rituais, os atabaques, os cantos e as danças dos Orixás formam uma linguagem artística total e coerente. A estética do Candomblé influenciou profundamente a arte, a música, a dança e a moda brasileiras.',
    ['Como o Candomblé é, ao mesmo tempo, um sistema religioso e uma forma de expressão artística?', 'Quais influências da estética afro-religiosa você identifica na moda, na música e nas artes visuais brasileiras contemporâneas?']),

  createLesson('g3-art-b2-l7', 'L7: Mestre Didi — Arte e Espiritualidade Afro-Brasileira', 'artes',
    'Deoscóredes Maximiliano dos Santos, o Mestre Didi (1917-2013), foi um artista e sacerdote do Candomblé baiano que criou uma obra visual única, usando materiais sagrados (palhas, contas, sementes) para criar esculturas que são ao mesmo tempo objetos rituais e obras de arte. Sua obra é hoje reconhecida em museus de arte moderna do mundo inteiro.',
    ['Como a obra de Mestre Didi une arte e espiritualidade de forma indissociável?', 'Por que é problemático separar a arte afro-brasileira de sua dimensão espiritual e ritual para colocá-la nos museus ocidentais?']),

  createLesson('g3-art-b2-l8', 'L8: Música e Cultura do Cerrado', 'artes',
    'A música do Cerrado reflete a diversidade de povos que habitam a região: sertanejo raíz, forró, música indígena, funk do sertão e estilos novos criados por jovens artistas tocantinenses. Instrumentos como a viola caipira, o acordeão, os tambores indígenas e as percussões afro-brasileiras convivem numa mesma paisagem sonora. A música local é um espelho da identidade regional.',
    ['Como a música do cerrado/Tocantins reflete a diversidade étnica e cultural da região?', 'Cite um artista musical tocantinense que você considera relevante e explique sua importância para a cultura local.']),

  createLesson('g3-art-b2-l9', 'L9: Culinária Tocantinense como Patrimônio Cultural', 'artes',
    'A culinária do Tocantins é um patrimônio cultural imaterial que reflete a biodiversidade do Cerrado e a diversidade étnica da população: pratos à base de peixe (peixe na folha de bananeira, pacu assado), frutos do Cerrado (pequi, buriti, babaçu, baru), herança indígena (beiju, farinha) e saberes afro-brasileiros. Cada prato conta uma história de encontros culturais.',
    ['Como os pratos típicos do Tocantins refletem a herança cultural indígena, africana e europeia da região?', 'Qual prato tocantinense você considera mais representativo da identidade cultural do estado e por quê?']),

  createLesson('g3-art-b2-l10', 'L10: Arte Ribeirinha — Culturas do Rio Tocantins', 'artes',
    'As comunidades ribeirinhas às margens do Rio Tocantins desenvolveram uma cultura própria, profundamente ligada ao rio: a pesca, a navegação, a culinária, os saberes medicinais das plantas do cerrado, as histórias e mitos sobre o rio são expressões de uma identidade cultural única. A construção da Usina de Tucuruí e outras barragens deslocou comunidades inteiras, ameaçando esse patrimônio.',
    ['Quais são as expressões artísticas e culturais características das comunidades ribeirinhas do Tocantins?', 'Como as grandes obras de infraestrutura (barragens, hidrelétricas) afetam o patrimônio cultural das comunidades ribeirinhas?']),

  createLesson('g3-art-b2-l11', 'L11: Arte Afro-Brasileira — Resistência e Visibilidade', 'artes',
    'A arte afro-brasileira abrange uma vasta produção que vai das máscaras cerimoniais às pinturas de Emanoel Araújo, das esculturas de Rubem Valentim às instalações de Rosana Paulino. Esses artistas criaram uma estética própria que afirma a dignidade, a espiritualidade e a potência criativa dos povos africanos e afro-brasileiros, em contraposição ao racismo estrutural da sociedade.',
    ['Como os artistas afro-brasileiros criam uma estética de afirmação e resistência contra o racismo?', 'O que diferencia uma "representação da cultura negra feita por artistas negros" de uma feita por artistas brancos em termos de autenticidade e poder?']),

  createLesson('g3-art-b2-l12', 'L12: Manifestações Culturais da Região Norte do Brasil', 'artes',
    'A Região Norte do Brasil é a mais diversa culturalmente: povos indígenas, ribeirinhos, quilombolas, imigrantes nordestinos e populações urbanas criaram uma cultura única. O carimbó paraense, o boi-bumbá de Parintins, o círio de Nazaré, as festas indígenas e o artesanato amazônico são expressões de uma riqueza cultural que o Brasil e o mundo precisam conhecer e valorizar.',
    ['Quais são as manifestações culturais mais importantes da Região Norte que você conhece ou gostaria de conhecer?', 'Como a Região Norte do Brasil pode ter mais visibilidade e valorização de sua produção cultural no cenário nacional?']),

  createLesson('g3-art-b2-l13', 'L13: Identidade Cultural e Pertencimento', 'artes',
    'A identidade cultural é formada por um conjunto de práticas, valores, memórias, saberes e formas de expressão que nos conectam a um grupo, a um lugar e a uma história. Sentir-se pertencente a uma cultura — seja a tocantinense, a brasileira, a afro-brasileira ou a indígena — é um direito humano fundamental. A arte é um dos principais meios de construir e afirmar esse pertencimento.',
    ['Como a arte contribui para a construção e afirmação da identidade cultural de um grupo ou comunidade?', 'Quais elementos da cultura tocantinense e brasileira fazem parte da sua identidade pessoal?']),

  createLesson('g3-art-b2-l14', 'L14: Patrimônio Cultural e Sustentabilidade', 'artes',
    'A preservação do patrimônio cultural (material e imaterial) está diretamente ligada à sustentabilidade ambiental e social. O artesanato do capim dourado do Tocantins só é possível se o Cerrado for preservado; as tradições indígenas só sobrevivem se os territórios indígenas forem respeitados; a culinária ribeirinha depende da saúde dos rios. Cultura e natureza são inseparáveis.',
    ['Como a preservação do patrimônio cultural e a preservação ambiental estão interligadas no Tocantins?', 'Dê um exemplo concreto de como a destruição ambiental ameaça uma expressão cultural do Tocantins.']),

  createLesson('g3-art-b2-l15', 'L15: Arte e Religiosidade Popular — Fé e Criatividade', 'artes',
    'A religiosidade popular brasileira é uma das maiores fontes de criatividade artística: ex-votos, imagens de santos esculpidas em madeira ou gesso, bandeiras de procissão, altares domésticos e vestimentas rituais são obras de arte criadas pela fé do povo. No Tocantins, a Romaria de Bonfim em Natividade é um dos exemplos mais bonitos dessa criatividade religiosa popular.',
    ['Como a fé popular gera formas únicas de expressão artística na cultura brasileira?', 'Descreva uma expressão de arte religiosa popular do Tocantins que você considera artisticamente interessante.']),

  createLesson('g3-art-b2-l16', 'L16: Preservação e Ameaças ao Patrimônio Cultural', 'artes',
    'O patrimônio cultural brasileiro enfrenta ameaças graves: o incêndio do Museu Nacional do Rio de Janeiro (2018) destruiu 20 milhões de peças; o desmatamento ameaça os sítios arqueológicos; o abandono dos casarões históricos em pequenas cidades deteriora o patrimônio colonial; e a globalização cultural homogeneíza as identidades locais. Preservar é uma luta política e cultural urgente.',
    ['O que o incêndio do Museu Nacional revelou sobre a prioridade que o Brasil dá à preservação do seu patrimônio cultural?', 'Como a globalização pode ameaçar as culturas locais e como as comunidades podem resistir a essa homogeneização cultural?']),

  createLesson('g3-art-b2-l17', 'L17: Turismo Cultural — Arte como Desenvolvimento', 'artes',
    'O turismo cultural é uma estratégia de desenvolvimento econômico sustentável que valoriza o patrimônio cultural local como atrativo turístico. O Jalapão, com seu artesanato de capim dourado e suas paisagens únicas, é um exemplo de como a cultura pode gerar renda para comunidades. Mas é preciso cuidar para que o turismo não destrua o que pretende valorizar.',
    ['Como o turismo cultural pode gerar desenvolvimento econômico para comunidades que preservam seu patrimônio cultural?', 'Quais são os riscos do turismo para a autenticidade e a sustentabilidade do patrimônio cultural local?']),

  createLesson('g3-art-b2-l18', 'L18: Prática — Documentando o Patrimônio Local', 'artes',
    'Nesta aula prática, você vai criar um pequeno projeto de documentação de uma expressão cultural do Tocantins ou da sua comunidade: pode ser uma fotografia, um vídeo curto, um texto, uma ilustração ou uma entrevista com alguém que detém um saber tradicional. O objetivo é valorizar e registrar o patrimônio cultural local antes que ele se perca.',
    ['Qual expressão cultural da sua comunidade ou cidade você escolheu documentar e por quê ela é importante?', 'O que você descobriu sobre a sua própria comunidade ao fazer esse trabalho de documentação cultural?']),
];

export const artLessonsB3: Lesson[] = [
  createLesson('g3-art-b3-l1', 'L1: Projeto Integrador — Arte, Identidade e Criação', 'artes',
    'Neste bimestre, cada aluno vai desenvolver um projeto artístico integrador que combine múltiplas linguagens e saberes. O projeto deve partir de uma questão ou tema que tenha significado pessoal — identidade, comunidade, história, natureza, justiça — e usar pelo menos uma linguagem artística para expressá-lo. A arte começa pela escolha do tema que importa para o artista.',
    ['Qual tema ou questão você quer explorar no seu projeto artístico integrador e por quê ele é significativo para você?', 'Quais linguagens artísticas você vai combinar no seu projeto e como elas se complementam?']),

  createLesson('g3-art-b3-l2', 'L2: Escolhendo uma Linguagem Artística — Possibilidades', 'artes',
    'As linguagens artísticas disponíveis para seu projeto são diversas: artes visuais (pintura, escultura, fotografia, colagem, instalação), audiovisual (vídeo, animação), música (composição, arranjo), performance, dança, teatro, literatura visual (HQ, fanzine, livro de artista) ou uma combinação de várias. A escolha da linguagem deve ser coerente com o tema e com suas habilidades e interesses.',
    ['Por que a escolha da linguagem artística é tão importante quanto a escolha do tema de um projeto criativo?', 'Qual linguagem artística você domina melhor e qual você gostaria de experimentar pela primeira vez neste projeto?']),

  createLesson('g3-art-b3-l3', 'L3: Processo Criativo — Da Ideia à Obra', 'artes',
    'O processo criativo raramente é linear: começa com uma ideia inicial, passa por pesquisa e referências, experimentos e tentativas frustradas, rascunhos, revisões e refinamentos até chegar à obra final. Documentar esse processo (em um caderno de artista, em fotos ou vídeos) é tão importante quanto o resultado final. Os rascunhos e erros fazem parte da obra.',
    ['Como você descreveria o seu processo criativo pessoal: você planeja detalhadamente ou prefere deixar a criação fluir?', 'Por que documentar o processo criativo é tão valioso quanto a obra final?']),

  createLesson('g3-art-b3-l4', 'L4: Pesquisa em Arte — Referências e Inspirações', 'artes',
    'Todo artista pesquisa e dialoga com obras e artistas que vieram antes. Encontrar referências é fundamental para ampliar o repertório visual, musical ou cênico, entender o contexto histórico do tema que se quer abordar e criar um diálogo entre sua obra e a tradição artística. A cópia é proibida; a inspiração, o diálogo e a releitura são práticas artísticas legítimas e ricas.',
    ['Como você pesquisa referências artísticas para o seu trabalho criativo?', 'Qual a diferença entre se inspirar em outro artista e copiar sua obra?']),

  createLesson('g3-art-b3-l5', 'L5: Caderno de Artista — Registrando o Processo', 'artes',
    'O caderno de artista é uma ferramenta fundamental na prática artística: um espaço livre para esboços, colagens, anotações, referências, experimentos e reflexões sobre o processo criativo. Artistas como Frida Kahlo, Picasso e Lygia Clark mantinham cadernos que revelam como suas mentes criativas funcionavam. Um caderno de artista é um documento autobiográfico e artístico ao mesmo tempo.',
    ['O que você colocaria no seu caderno de artista ao documentar o processo do seu projeto integrador?', 'Como o caderno de artista pode ser uma ferramenta de autoconhecimento além de uma ferramenta artística?']),

  createLesson('g3-art-b3-l6', 'L6: Arte Colaborativa — Criando Juntos', 'artes',
    'Muitas das obras mais impactantes da história da arte foram criadas coletivamente: grupos de artistas, movimentos culturais e projetos comunitários. A arte colaborativa desafia o mito do "artista solitário genial" e cria obras que refletem perspectivas múltiplas. No Tocantins, manifestações como o Bumba-meu-boi e as festas tradicionais são sempre obras coletivas.',
    ['Quais são os desafios e as riquezas de criar arte de forma colaborativa com outras pessoas?', 'Cite um exemplo de obra ou projeto artístico coletivo e explique como a colaboração enriqueceu o resultado.']),

  createLesson('g3-art-b3-l7', 'L7: Arte e Interdisciplinaridade', 'artes',
    'A arte contemporânea frequentemente se entrelaça com outras disciplinas: biologia (bioarte, arte e DNA), matemática (arte generativa, proporção áurea), história (arte como memória e documento), ciências sociais (arte e política, arte e identidade), filosofia (estética, teoria da arte). Um projeto artístico interdisciplinar cria pontes entre saberes e amplia a compreensão de todas as disciplinas envolvidas.',
    ['Como a arte pode dialogar com outras disciplinas para criar obras mais ricas e significativas?', 'Escolha uma disciplina escolar e explique como ela poderia se integrar ao seu projeto artístico.']),

  createLesson('g3-art-b3-l8', 'L8: Arte Pública — Quando a Arte Sai do Museu', 'artes',
    'A arte pública — esculturas em praças, murais em prédios, intervenções urbanas — pertence a todos. Ela transforma o espaço urbano, cria identidade para bairros e cidades, provoca reflexão no cotidiano e democratiza o acesso à arte. No Brasil, artistas como Roberto Burle Marx (paisagismo), Eduardo Kobra (murais) e Tomie Ohtake (esculturas públicas) transformaram as cidades em museus a céu aberto.',
    ['Qual a importância da arte pública para a qualidade de vida e a identidade de uma cidade?', 'Que tipo de obra de arte pública você criaria na sua cidade e onde ela ficaria?']),

  createLesson('g3-art-b3-l9', 'L9: Crítica de Arte — Como Analisar uma Obra', 'artes',
    'Analisar e criticar uma obra de arte é uma habilidade que se aprende: começa com a descrição (o que você vê?), passa pela análise formal (como está organizado: cores, formas, composição?), pela interpretação (o que o artista quer dizer?) e chega ao julgamento fundamentado (você considera essa obra relevante e por quê?). Crítica de arte não é apenas dizer se gostou ou não.',
    ['Quais são as etapas de uma análise crítica de uma obra de arte?', 'Aplique os passos da crítica de arte (descrição, análise, interpretação, julgamento) a uma obra que você escolher.']),

  createLesson('g3-art-b3-l10', 'L10: Curadoria — A Arte de Escolher e Organizar', 'artes',
    'A curadoria é a arte de selecionar, organizar e contextualizar obras para criar uma exposição coerente e significativa. Um curador toma decisões sobre quais obras incluir, como organizá-las no espaço, qual a narrativa da exposição e como comunicar isso ao público. A curadoria é um ato criativo e político — as escolhas do curador determinam o que o público vai ver e como vai interpretar.',
    ['Como as decisões de um curador constroem a narrativa e o significado de uma exposição?', 'Se você fosse curador de uma exposição sobre arte tocantinense, quais obras e artistas você incluiria e como organizaria a mostra?']),

  createLesson('g3-art-b3-l11', 'L11: Exposição Virtual — Arte na Era Digital', 'artes',
    'As exposições virtuais, impulsionadas pela pandemia de 2020, democratizaram o acesso à arte e criaram novos formatos de exibição. Museus como o Louvre, o MoMA e o MASP disponibilizaram seus acervos online. Artistas brasileiros criaram exposições exclusivamente virtuais, em plataformas 3D, no Instagram e no YouTube. A exposição virtual não substitui o presencial, mas amplia enormemente o alcance.',
    ['Quais as vantagens e as limitações de uma exposição de arte virtual comparada a uma presencial?', 'Como você criaria uma exposição virtual para apresentar o seu projeto artístico integrador?']),

  createLesson('g3-art-b3-l12', 'L12: Feedback e Revisão — Melhorando o Projeto', 'artes',
    'Receber feedback sobre uma obra em processo é fundamental para o crescimento artístico. Bons artistas não são apenas criadores solitários — são também ouvintes atentos às reações do público e dos colegas. O feedback deve ser dado com generosidade e recebido com abertura: o objetivo não é agradar a todos, mas refinar a ideia e a execução para que a mensagem chegue com mais clareza e força.',
    ['Como você dá e recebe feedback sobre uma obra artística de forma construtiva?', 'O que muda na sua obra quando você recebe feedback de alguém que a olha com olhos frescos?']),

  createLesson('g3-art-b3-l13', 'L13: Arte e Narrativa — Contando Histórias com Imagens', 'artes',
    'Contar histórias é uma das funções mais antigas da arte. A narrativa visual — seja numa pintura, numa história em quadrinhos, num filme ou numa performance — usa sequência, perspectiva, personagens e conflito para criar significado. As histórias em quadrinhos (HQ) são um exemplo perfeito de narrativa visual que combina imagem e texto com uma linguagem própria e sofisticada.',
    ['Como a narrativa visual em histórias em quadrinhos ou em filmes difere da narrativa verbal em livros?', 'Descreva uma história que você gostaria de contar numa linguagem visual e como você a organizaria visualmente.']),

  createLesson('g3-art-b3-l14', 'L14: Arte e Espaço — Intervenção no Ambiente Escolar', 'artes',
    'A intervenção artística no espaço escolar transforma o ambiente de aprendizagem e cria novas formas de olhar para o espaço cotidiano. Uma intervenção pode ser um mural, uma instalação de baixo custo com materiais reciclados, uma performance no corredor, ou uma série de fotografias nos murais. O objetivo é criar arte onde as pessoas transitam sem esperar por ela.',
    ['Como uma intervenção artística pode transformar a percepção de um espaço cotidiano?', 'Qual intervenção artística você faria no espaço da sua escola e qual mensagem ela comunicaria?']),

  createLesson('g3-art-b3-l15', 'L15: Arte e Emoção — O Que a Arte Faz com Você?', 'artes',
    'A arte tem o poder de mover emocionalmente: provocar alegria, tristeza, raiva, estranhamento, admiração, curiosidade ou desconforto. Essa capacidade de afetar emocionalmente é o que diferencia uma obra de arte de um mero objeto. Refletir sobre o que a arte faz com você — que emoções provoca, que memórias aciona, que pensamentos desperta — é parte fundamental da experiência estética.',
    ['Descreva uma obra de arte (música, pintura, filme, performance) que provocou uma reação emocional intensa em você e explique por quê.', 'Como o mesmo objeto artístico pode provocar emoções completamente diferentes em pessoas diferentes?']),

  createLesson('g3-art-b3-l16', 'L16: Arte e Autoconhecimento — A Arte como Espelho', 'artes',
    'Criar arte é um ato de autoconhecimento: ao escolher temas, cores, sons, movimentos e palavras, o artista revela algo de si mesmo — suas preocupações, suas alegrias, seus medos, suas visões de mundo. Mesmo quando o tema parece externo (uma paisagem, uma notícia, um problema social), a forma como o artista o aborda revela sua subjetividade. A arte é sempre autobiográfica em algum nível.',
    ['O que a sua produção artística deste ano revela sobre você como pessoa e como pensador?', 'Em que sentido criar arte é um ato de autoconhecimento?']),

  createLesson('g3-art-b3-l17', 'L17: Finalização do Projeto Integrador', 'artes',
    'Nesta aula, você vai dar os últimos retoques no seu projeto integrador e preparar a apresentação. Uma boa apresentação artística explica o conceito (o que você quis dizer), o processo (como foi criado), as referências (quem ou o que te inspirou) e o resultado (a obra em si). A apresentação faz parte da obra — é a voz do artista explicando sua criação.',
    ['Como você vai apresentar seu projeto integrador de forma clara e envolvente para sua turma?', 'O que você gostaria que o público sentisse ou pensasse ao entrar em contato com o seu projeto?']),

  createLesson('g3-art-b3-l18', 'L18: Mostra de Arte — Apresentação do Projeto Integrador', 'artes',
    'Chegou a hora de apresentar seu projeto integrador para a turma e, se possível, para a comunidade escolar. Cada apresentação é única — um momento de conexão entre o artista e o público. Ouça com atenção o feedback dos colegas, responda com generosidade e celebre o processo criativo que cada um percorreu. Arte é comunicação, e comunicação precisa de duas partes.',
    ['O que você sentiu ao apresentar sua obra para outras pessoas?', 'Qual foi o feedback mais surpreendente ou valioso que você recebeu sobre o seu projeto?']),
];

export const artLessonsB4: Lesson[] = [
  createLesson('g3-art-b4-l1', 'L1: Arte Global — Encontros e Diferenças', 'artes',
    'A arte é universal na sua função humana, mas infinitamente diversa nas suas formas, técnicas, símbolos e significados. Conhecer a arte de outras culturas amplia nossa compreensão do mundo e nos ajuda a questionar o que consideramos "normal" na nossa própria cultura. A globalização aproximou culturas artísticas, mas também criou riscos de homogeneização e de apagamento de tradições locais.',
    ['Por que estudar a arte de outras culturas é importante para compreender melhor a própria cultura?', 'Como a globalização influencia as artes locais — ela enriquece ou ameaça as tradições artísticas regionais?']),

  createLesson('g3-art-b4-l2', 'L2: Arte Japonesa — Wabi-sabi e Minimalismo', 'artes',
    'A arte japonesa é guiada por conceitos filosóficos próprios: wabi-sabi (a beleza do imperfeito, do transitório e do incompleto), ma (o espaço vazio como elemento significativo) e mono no aware (a melancolia da impermanência das coisas). O teatro Nô, a cerimônia do chá, os jardins Zen, as gravuras ukiyo-e (como as de Hokusai) e o manga são expressões desse universo estético único.',
    ['O que o conceito japonês de wabi-sabi nos ensina sobre a beleza que a cultura ocidental muitas vezes ignora?', 'Como as gravuras ukiyo-e japonesas influenciaram os artistas impressionistas europeus?']),

  createLesson('g3-art-b4-l3', 'L3: Arte Chinesa — Tradição e Modernidade', 'artes',
    'A arte chinesa tem uma das tradições mais longas da humanidade: caligrafia, pintura com tinta, porcelana, seda, teatro de sombras e ópera de Pequim. A Revolução Cultural (1966-1976) tentou destruir a tradição artística chinesa; hoje a China tem uma cena de arte contemporânea poderosíssima, com artistas como Ai Weiwei, que usa a arte para criticar o governo autoritário.',
    ['Como Ai Weiwei usa a arte contemporânea para criticar o poder e o que aconteceu com ele por causa disso?', 'Como a arte chinesa equilibra uma tradição milenar com as demandas da arte contemporânea global?']),

  createLesson('g3-art-b4-l4', 'L4: Arte Africana — Diversidade e Ancestralidade', 'artes',
    'A África tem 54 países e centenas de culturas artísticas distintas: máscaras rituais, esculturas em madeira e bronze (como os bronzes de Benin), tecidos (como o kente ganense), arquitetura de barro no Mali e arte rupestre no Saara. A arte africana influenciou profundamente a arte ocidental moderna (Picasso, Matisse), mas essa influência foi sistematicamente ocultada pela história da arte europeia.',
    ['Como a arte africana influenciou a arte moderna europeia e por que essa influência foi historicamente apagada?', 'Qual a importância de devolver os objetos de arte africana que estão nos museus europeus para os países de origem?']),

  createLesson('g3-art-b4-l5', 'L5: Arte Árabe e Islâmica — Geometria e Caligrafia', 'artes',
    'A arte islâmica desenvolveu uma estética única baseada na geometria complexa (arabescos), na caligrafia árabe como arte visual e na arquitetura de mesquitas e palácios. Sendo o Alcorão a palavra de Deus, a caligrafia árabe é a mais sagrada das artes islâmicas. A arte islâmica influenciou a arquitetura europeia (especialmente na Espanha árabe) e o design geométrico mundial.',
    ['Por que a caligrafia é considerada a mais nobre das artes na tradição islâmica?', 'Como os padrões geométricos complexos da arte islâmica se relacionam com a matemática e com a espiritualidade?']),

  createLesson('g3-art-b4-l6', 'L6: Arte Latino-Americana — Identidade e Resistência', 'artes',
    'A América Latina produziu uma arte de extraordinária riqueza e originalidade: o muralismo mexicano (Rivera, Orozco, Siqueiros), a arte cubana (Wifredo Lam), a arte argentina (Xul Solar, León Ferrari), a arte colombiana (Fernando Botero) e claro, a arte brasileira. O que une essa diversidade é a experiência colonial compartilhada e a busca por identidades próprias, não europeias.',
    ['Quais são os elementos que unificam a arte latino-americana apesar da sua enorme diversidade?', 'Como a experiência colonial moldou a busca por identidades artísticas próprias na América Latina?']),

  createLesson('g3-art-b4-l7', 'L7: Frida Kahlo — Corpo, Dor e Identidade Latino-Americana', 'artes',
    'Frida Kahlo (1907-1954) é a artista latino-americana mais famosa do mundo, mas seus autorretratos não buscavam fama: eram exploração dolorosa de sua identidade, de seu corpo (marcado por um acidente e por mais de 30 cirurgias), de sua mexicanidade e de sua vida emocional intensa. Frida é hoje um ícone feminista, queer e latino-americano de resistência cultural.',
    ['Por que Frida Kahlo se tornou um ícone de tantos movimentos diferentes (feminismo, arte latino-americana, comunidade queer)?', 'Como a dor física e emocional se transforma em arte nos autorretratos de Frida Kahlo?']),

  createLesson('g3-art-b4-l8', 'L8: Arte Oceânica e dos Povos do Pacífico', 'artes',
    'Os povos da Oceânia — Polinésia, Melanésia e Austrália (Aborígenes) — desenvolveram formas artísticas únicas: tatuagens polinesiastas com significados genealógicos e espirituais, máscaras de Papua Nova Guiné, arte rupestre aborígene e tiki maoris. Essas artes foram duramente suprimidas durante a colonização e hoje estão em processo de revitalização.',
    ['Como a arte dos povos aborígenes australianos conta a história da Terra e da espiritualidade de seu povo?', 'Qual é o processo de revitalização cultural que os povos indígenas da Oceânia estão vivendo e o que podemos aprender com isso?']),

  createLesson('g3-art-b4-l9', 'L9: Arte e Globalização — Conexões e Tensões', 'artes',
    'A globalização criou um circuito de arte internacional dominado por grandes museus, feiras e galerias concentradas no Hemisfério Norte (Nova York, Londres, Zurique, Baseia). Artistas de países periféricos (Brasil, África, Ásia) precisam frequentemente passar por esse circuito para ter visibilidade global. Isso cria uma tensão entre identidade local e mercado global que cada artista resolve de forma diferente.',
    ['Como o circuito internacional de arte favorece certos países e culturas em detrimento de outros?', 'Como um artista brasileiro pode ter visibilidade internacional sem perder sua identidade cultural local?']),

  createLesson('g3-art-b4-l10', 'L10: ENEM e Artes Visuais — Como Ler Imagens nas Provas', 'artes',
    'O ENEM testa a capacidade de leitura crítica de imagens nas questões de Linguagens, Códigos e suas Tecnologias e de Ciências Humanas. As imagens são analisadas em seu contexto histórico, cultural e estético, e o aluno deve identificar o movimento artístico, interpretar a mensagem e relacionar com o contexto social. Praticar com questões anteriores é fundamental.',
    ['Quais os passos para analisar uma imagem artística numa questão do ENEM?', 'Pratique: escolha uma obra de arte e aplique o método de leitura visual para interpretá-la como se fosse uma questão do ENEM.']),

  createLesson('g3-art-b4-l11', 'L11: ENEM e Música — Letras, Contexto e Significado', 'artes',
    'Questões do ENEM sobre música analisam letras de canções em seu contexto histórico e social: uma letra da MPB dos anos 1970 é lida diferentemente quando sabemos que foi escrita durante a ditadura; um rap dos Racionais é lido como documento social sobre a violência policial. A interpretação da linguagem musical exige tanto análise literária quanto contexto histórico.',
    ['Como o contexto histórico e social muda a interpretação de uma letra de música?', 'Analise uma letra de música que você conhece como se fosse uma questão do ENEM: qual é a mensagem central e qual o contexto em que ela foi criada?']),

  createLesson('g3-art-b4-l12', 'L12: ENEM e Teatro/Dança — Leitura de Linguagens Cênicas', 'artes',
    'Questões do ENEM sobre teatro e dança pedem identificação de gêneros teatrais, compreensão de contextos históricos de movimentos como o Teatro do Oprimido ou a Capoeira, e análise de imagens de espetáculos. É preciso conhecer as características dos principais movimentos cênicos brasileiros e internacionais estudados ao longo do ano.',
    ['Como identificar um gênero teatral (tragédia, comédia, teatro épico, teatro do oprimido) a partir de uma descrição ou imagem?', 'Cite os principais movimentos cênicos brasileiros e internacionais que você estudou e que são cobrados no ENEM.']),

  createLesson('g3-art-b4-l13', 'L13: Revisão — Arte Pré-histórica e Antiga', 'artes',
    'Revisão dos conteúdos de arte pré-histórica, rupestre (com foco no Brasil e Tocantins), arte egípcia, grega, romana e medieval. Foco nas características formais, funções sociais e religiosas de cada período e nas obras e artistas-chave. A revisão deve ser ativa: analisar imagens, relacionar períodos e criar sínteses dos conceitos principais.',
    ['Quais são as principais diferenças estéticas e funcionais entre a arte pré-histórica, a arte egípcia e a arte grega?', 'Por que estudar a arte da Antiguidade ainda é relevante para entender a arte contemporânea?']),

  createLesson('g3-art-b4-l14', 'L14: Revisão — Renascimento, Barroco e Arte Moderna', 'artes',
    'Revisão dos movimentos do Renascimento (Leonardo, Michelangelo, Rafael), Barroco (Caravaggio, Aleijadinho, Mestre Ataíde), Impressionismo, Expressionismo, Cubismo, Surrealismo, Modernismo brasileiro (Tarsila, Portinari, Anita Malfatti) e Arte Abstrata. Foco nos artistas e obras mais cobrados em vestibulares e no ENEM.',
    ['Quais são as características formais que distinguem o estilo renascentista do barroco?', 'Como o Modernismo brasileiro dialogou com as vanguardas europeias e criou uma identidade artística própria?']),

  createLesson('g3-art-b4-l15', 'L15: Revisão — Arte Contemporânea e Arte Brasileira', 'artes',
    'Revisão da arte contemporânea (instalações, performance, street art, arte digital, NFTs), arte pop, arte conceitual e a produção de artistas brasileiros contemporâneos (Vik Muniz, Cildo Meireles, Adriana Varejão, artistas indígenas). Revisão da arte e resistência no Brasil (ditadura, tropicalismo, Cinema Novo, Teatro do Oprimido).',
    ['Quais são as principais características da arte contemporânea que a diferenciam da arte moderna?', 'Cite cinco artistas brasileiros contemporâneos estudados ao longo do ano e explique a contribuição de cada um.']),

  createLesson('g3-art-b4-l16', 'L16: Revisão — Patrimônio, Música, Teatro e Dança', 'artes',
    'Revisão dos temas de patrimônio cultural (material e imaterial, Tocantins, Brasil), música brasileira (samba, forró, MPB, rap, sertanejo, tropicalismo), teatro (grego, épico de Brecht, do Oprimido de Boal, popular brasileiro) e dança (balé, dança contemporânea, capoeira, frevo, maracatu, Bumba-meu-boi). Todos esses temas aparecem no ENEM.',
    ['Como você relacionaria os temas de patrimônio cultural, música, teatro e dança numa única questão do ENEM sobre identidade cultural brasileira?', 'Cite um exemplo de manifestação cultural do Tocantins que integra música, dança e teatralidade.']),

  createLesson('g3-art-b4-l17', 'L17: Simulado de Artes — Questões no Formato ENEM', 'artes',
    'Nesta aula, você vai resolver questões de artes no formato ENEM, praticando a leitura de imagens, a interpretação de letras de música e a análise de textos sobre manifestações culturais. O objetivo é identificar os tipos de questões mais frequentes, desenvolver estratégias de resolução e reforçar os conceitos que ainda precisam de revisão.',
    ['Quais tipos de questões de artes no ENEM você considera mais difíceis e por quê?', 'Quais estratégias você usa para responder questões de artes que envolvem análise de imagens?']),

  createLesson('g3-art-b4-l18', 'L18: Aula Final — Arte, Vida e Cidadania', 'artes',
    'Arte não é apenas uma disciplina escolar: é uma forma de estar no mundo, de questionar o que nos cerca, de comunicar o que sentimos, de preservar o que amamos e de imaginar futuros diferentes. Todo cidadão é um potencial criador — de músicas, de histórias, de imagens, de movimentos, de festas. Levar a arte para além da escola é o maior aprendizado possível.',
    ['Como você pretende manter uma relação ativa com as artes após o fim do Ensino Médio?', 'O que foi o aprendizado mais significativo para você nas aulas de artes ao longo de toda a sua formação escolar?']),
];
