import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

// Artigos do Codigo Civil Brasileiro (Lei 10.406/2002)
const ARTIGOS_CODIGO_CIVIL = [
  // PARTE GERAL - LIVRO I - DAS PESSOAS
  { numero: '1', livro: 'Parte Geral', titulo: 'Das Pessoas Naturais', capitulo: 'Da Personalidade e da Capacidade', texto: 'Toda pessoa e capaz de direitos e deveres na ordem civil.' },
  { numero: '2', livro: 'Parte Geral', titulo: 'Das Pessoas Naturais', capitulo: 'Da Personalidade e da Capacidade', texto: 'A personalidade civil da pessoa comeca do nascimento com vida; mas a lei poe a salvo, desde a concepcao, os direitos do nascituro.' },
  { numero: '3', livro: 'Parte Geral', titulo: 'Das Pessoas Naturais', capitulo: 'Da Personalidade e da Capacidade', texto: 'Sao absolutamente incapazes de exercer pessoalmente os atos da vida civil os menores de 16 (dezesseis) anos.' },
  { numero: '4', livro: 'Parte Geral', titulo: 'Das Pessoas Naturais', capitulo: 'Da Personalidade e da Capacidade', texto: 'Sao incapazes, relativamente a certos atos ou a maneira de os exercer: I - os maiores de dezesseis e menores de dezoito anos; II - os ebrios habituais e os viciados em toxico; III - aqueles que, por causa transitoria ou permanente, nao puderem exprimir sua vontade; IV - os prodigos.' },
  { numero: '5', livro: 'Parte Geral', titulo: 'Das Pessoas Naturais', capitulo: 'Da Personalidade e da Capacidade', texto: 'A menoridade cessa aos dezoito anos completos, quando a pessoa fica habilitada a pratica de todos os atos da vida civil.' },
  
  // DOS DIREITOS DA PERSONALIDADE
  { numero: '11', livro: 'Parte Geral', titulo: 'Das Pessoas Naturais', capitulo: 'Dos Direitos da Personalidade', texto: 'Com excecao dos casos previstos em lei, os direitos da personalidade sao intransmissiveis e irrenunciaveis, nao podendo o seu exercicio sofrer limitacao voluntaria.' },
  { numero: '12', livro: 'Parte Geral', titulo: 'Das Pessoas Naturais', capitulo: 'Dos Direitos da Personalidade', texto: 'Pode-se exigir que cesse a ameaca, ou a lesao, a direito da personalidade, e reclamar perdas e danos, sem prejuizo de outras sancoes previstas em lei.' },
  { numero: '13', livro: 'Parte Geral', titulo: 'Das Pessoas Naturais', capitulo: 'Dos Direitos da Personalidade', texto: 'Salvo por exigencia medica, e defeso o ato de disposicao do proprio corpo, quando importar diminuicao permanente da integridade fisica, ou contrariar os bons costumes.' },
  { numero: '17', livro: 'Parte Geral', titulo: 'Das Pessoas Naturais', capitulo: 'Dos Direitos da Personalidade', texto: 'O nome da pessoa nao pode ser empregado por outrem em publicacoes ou representacoes que a exponham ao desprezo publico, ainda quando nao haja intencao difamatoria.' },
  { numero: '20', livro: 'Parte Geral', titulo: 'Das Pessoas Naturais', capitulo: 'Dos Direitos da Personalidade', texto: 'Salvo se autorizadas, ou se necessarias a administracao da justica ou a manutencao da ordem publica, a divulgacao de escritos, a transmissao da palavra, ou a publicacao, a exposicao ou a utilizacao da imagem de uma pessoa poderao ser proibidas, a seu requerimento e sem prejuizo da indenizacao que couber, se lhe atingirem a honra, a boa fama ou a respeitabilidade, ou se se destinarem a fins comerciais.' },
  
  // DOS NEGOCIOS JURIDICOS
  { numero: '104', livro: 'Parte Geral', titulo: 'Dos Fatos Juridicos', capitulo: 'Do Negocio Juridico', texto: 'A validade do negocio juridico requer: I - agente capaz; II - objeto licito, possivel, determinado ou determinavel; III - forma prescrita ou nao defesa em lei.' },
  { numero: '105', livro: 'Parte Geral', titulo: 'Dos Fatos Juridicos', capitulo: 'Do Negocio Juridico', texto: 'A incapacidade relativa de uma das partes nao pode ser invocada pela outra em beneficio proprio, nem aproveita aos co-interessados capazes, salvo se, neste caso, for indivisivel o objeto do direito ou da obrigacao comum.' },
  { numero: '107', livro: 'Parte Geral', titulo: 'Dos Fatos Juridicos', capitulo: 'Do Negocio Juridico', texto: 'A validade da declaracao de vontade nao dependera de forma especial, senao quando a lei expressamente a exigir.' },
  { numero: '110', livro: 'Parte Geral', titulo: 'Dos Fatos Juridicos', capitulo: 'Do Negocio Juridico', texto: 'A manifestacao de vontade subsiste ainda que o seu autor haja feito a reserva mental de nao querer o que manifestou, salvo se dela o destinatario tinha conhecimento.' },
  
  // DOS DEFEITOS DO NEGOCIO JURIDICO
  { numero: '138', livro: 'Parte Geral', titulo: 'Dos Fatos Juridicos', capitulo: 'Dos Defeitos do Negocio Juridico', texto: 'Sao anulaveis os negocios juridicos, quando as declaracoes de vontade emanarem de erro substancial que poderia ser percebido por pessoa de diligencia normal, em face das circunstancias do negocio.' },
  { numero: '145', livro: 'Parte Geral', titulo: 'Dos Fatos Juridicos', capitulo: 'Dos Defeitos do Negocio Juridico', texto: 'Sao os negocios juridicos anulaveis por dolo, quando este for a sua causa.' },
  { numero: '151', livro: 'Parte Geral', titulo: 'Dos Fatos Juridicos', capitulo: 'Dos Defeitos do Negocio Juridico', texto: 'A coacao, para viciar a declaracao da vontade, ha de ser tal que incuta ao paciente fundado temor de dano iminente e consideravel a sua pessoa, a sua familia, ou aos seus bens.' },
  { numero: '157', livro: 'Parte Geral', titulo: 'Dos Fatos Juridicos', capitulo: 'Dos Defeitos do Negocio Juridico', texto: 'Ocorre a lesao quando uma pessoa, sob premente necessidade, ou por inexperiencia, se obriga a prestacao manifestamente desproporcional ao valor da prestacao oposta.' },
  
  // DOS ATOS ILICITOS
  { numero: '186', livro: 'Parte Geral', titulo: 'Dos Atos Ilicitos', capitulo: 'Dos Atos Ilicitos', texto: 'Aquele que, por acao ou omissao voluntaria, negligencia ou imprudencia, violar direito e causar dano a outrem, ainda que exclusivamente moral, comete ato ilicito.' },
  { numero: '187', livro: 'Parte Geral', titulo: 'Dos Atos Ilicitos', capitulo: 'Dos Atos Ilicitos', texto: 'Tambem comete ato ilicito o titular de um direito que, ao exerce-lo, excede manifestamente os limites impostos pelo seu fim economico ou social, pela boa-fe ou pelos bons costumes.' },
  { numero: '188', livro: 'Parte Geral', titulo: 'Dos Atos Ilicitos', capitulo: 'Dos Atos Ilicitos', texto: 'Nao constituem atos ilicitos: I - os praticados em legitima defesa ou no exercicio regular de um direito reconhecido; II - a deterioracao ou destruicao da coisa alheia, ou a lesao a pessoa, a fim de remover perigo iminente.' },
  
  // DA PRESCRICAO E DECADENCIA
  { numero: '189', livro: 'Parte Geral', titulo: 'Da Prescricao e da Decadencia', capitulo: 'Da Prescricao', texto: 'Violado o direito, nasce para o titular a pretensao, a qual se extingue, pela prescricao, nos prazos a que aludem os arts. 205 e 206.' },
  { numero: '190', livro: 'Parte Geral', titulo: 'Da Prescricao e da Decadencia', capitulo: 'Da Prescricao', texto: 'A excecao prescreve no mesmo prazo em que a pretensao.' },
  { numero: '205', livro: 'Parte Geral', titulo: 'Da Prescricao e da Decadencia', capitulo: 'Dos Prazos da Prescricao', texto: 'A prescricao ocorre em dez anos, quando a lei nao lhe haja fixado prazo menor.' },
  { numero: '206', livro: 'Parte Geral', titulo: 'Da Prescricao e da Decadencia', capitulo: 'Dos Prazos da Prescricao', texto: 'Prescreve: §1o Em um ano: I - a pretensao dos hospedeiros ou fornecedores de viveres destinados a consumo no proprio estabelecimento, para o pagamento da hospedagem ou dos alimentos; II - a pretensao do segurado contra o segurador, ou a deste contra aquele, contado o prazo: a) para o segurado, no caso de seguro de responsabilidade civil, da data em que e citado para responder a acao de indenizacao proposta pelo terceiro prejudicado, ou da data que a este indeniza, com a anuencia do segurador; b) quanto aos demais seguros, da ciencia do fato gerador da pretensao.' },
  
  // PARTE ESPECIAL - DAS OBRIGACOES
  { numero: '233', livro: 'Parte Especial', titulo: 'Do Direito das Obrigacoes', capitulo: 'Das Obrigacoes de Dar', texto: 'A obrigacao de dar coisa certa abrange os acessorios dela embora nao mencionados, salvo se o contrario resultar do titulo ou das circunstancias do caso.' },
  { numero: '234', livro: 'Parte Especial', titulo: 'Do Direito das Obrigacoes', capitulo: 'Das Obrigacoes de Dar', texto: 'Se, no caso do artigo antecedente, a coisa se perder, sem culpa do devedor, antes da tradicao, ou pendente a condicao suspensiva, fica resolvida a obrigacao para ambas as partes; se a perda resultar de culpa do devedor, respondera este pelo equivalente e mais perdas e danos.' },
  { numero: '247', livro: 'Parte Especial', titulo: 'Do Direito das Obrigacoes', capitulo: 'Das Obrigacoes de Fazer', texto: 'Incorre na obrigacao de indenizar perdas e danos o devedor que recusar a prestacao a ele so imposta, ou so por ele exequivel.' },
  { numero: '249', livro: 'Parte Especial', titulo: 'Do Direito das Obrigacoes', capitulo: 'Das Obrigacoes de Fazer', texto: 'Se o fato puder ser executado por terceiro, sera livre ao credor manda-lo executar a custa do devedor, havendo recusa ou mora deste, sem prejuizo da indenizacao cabivel.' },
  
  // DO INADIMPLEMENTO DAS OBRIGACOES
  { numero: '389', livro: 'Parte Especial', titulo: 'Do Direito das Obrigacoes', capitulo: 'Do Inadimplemento das Obrigacoes', texto: 'Nao cumprida a obrigacao, responde o devedor por perdas e danos, mais juros e atualizacao monetaria segundo indices oficiais regularmente estabelecidos, e honorarios de advogado.' },
  { numero: '390', livro: 'Parte Especial', titulo: 'Do Direito das Obrigacoes', capitulo: 'Do Inadimplemento das Obrigacoes', texto: 'Nas obrigacoes negativas o devedor e havido por inadimplente desde o dia em que executou o ato de que se devia abster.' },
  { numero: '394', livro: 'Parte Especial', titulo: 'Do Direito das Obrigacoes', capitulo: 'Da Mora', texto: 'Considera-se em mora o devedor que nao efetuar o pagamento e o credor que nao quiser recebe-lo no tempo, lugar e forma que a lei ou a convencao estabelecer.' },
  { numero: '395', livro: 'Parte Especial', titulo: 'Do Direito das Obrigacoes', capitulo: 'Da Mora', texto: 'Responde o devedor pelos prejuizos a que sua mora der causa, mais juros, atualizacao dos valores monetarios segundo indices oficiais regularmente estabelecidos, e honorarios de advogado.' },
  { numero: '402', livro: 'Parte Especial', titulo: 'Do Direito das Obrigacoes', capitulo: 'Das Perdas e Danos', texto: 'Salvo as excecoes expressamente previstas em lei, as perdas e danos devidas ao credor abrangem, alem do que ele efetivamente perdeu, o que razoavelmente deixou de lucrar.' },
  { numero: '403', livro: 'Parte Especial', titulo: 'Do Direito das Obrigacoes', capitulo: 'Das Perdas e Danos', texto: 'Ainda que a inexecucao resulte de dolo do devedor, as perdas e danos so incluem os prejuizos efetivos e os lucros cessantes por efeito dela direto e imediato, sem prejuizo do disposto na lei processual.' },
  
  // DOS CONTRATOS EM GERAL
  { numero: '421', livro: 'Parte Especial', titulo: 'Dos Contratos em Geral', capitulo: 'Disposicoes Gerais', texto: 'A liberdade contratual sera exercida nos limites da funcao social do contrato.' },
  { numero: '422', livro: 'Parte Especial', titulo: 'Dos Contratos em Geral', capitulo: 'Disposicoes Gerais', texto: 'Os contratantes sao obrigados a guardar, assim na conclusao do contrato, como em sua execucao, os principios de probidade e boa-fe.' },
  { numero: '423', livro: 'Parte Especial', titulo: 'Dos Contratos em Geral', capitulo: 'Disposicoes Gerais', texto: 'Quando houver no contrato de adesao clausulas ambiguas ou contraditorias, dever-se-a adotar a interpretacao mais favoravel ao aderente.' },
  { numero: '424', livro: 'Parte Especial', titulo: 'Dos Contratos em Geral', capitulo: 'Disposicoes Gerais', texto: 'Nos contratos de adesao, sao nulas as clausulas que estipulem a renuncia antecipada do aderente a direito resultante da natureza do negocio.' },
  { numero: '425', livro: 'Parte Especial', titulo: 'Dos Contratos em Geral', capitulo: 'Disposicoes Gerais', texto: 'E licito as partes estipular contratos atipicos, observadas as normas gerais fixadas neste Codigo.' },
  
  // DA RESPONSABILIDADE CIVIL
  { numero: '927', livro: 'Parte Especial', titulo: 'Da Responsabilidade Civil', capitulo: 'Da Obrigacao de Indenizar', texto: 'Aquele que, por ato ilicito (arts. 186 e 187), causar dano a outrem, fica obrigado a repara-lo.' },
  { numero: '928', livro: 'Parte Especial', titulo: 'Da Responsabilidade Civil', capitulo: 'Da Obrigacao de Indenizar', texto: 'O incapaz responde pelos prejuizos que causar, se as pessoas por ele responsaveis nao tiverem obrigacao de faze-lo ou nao dispuserem de meios suficientes.' },
  { numero: '932', livro: 'Parte Especial', titulo: 'Da Responsabilidade Civil', capitulo: 'Da Obrigacao de Indenizar', texto: 'Sao tambem responsaveis pela reparacao civil: I - os pais, pelos filhos menores que estiverem sob sua autoridade e em sua companhia; II - o tutor e o curador, pelos pupilos e curatelados, que se acharem nas mesmas condicoes; III - o empregador ou comitente, por seus empregados, servicals e prepostos, no exercicio do trabalho que lhes competir, ou em razao dele; IV - os donos de hoteis, hospedarias, casas ou estabelecimentos onde se albergue por dinheiro, mesmo para fins de educacao, pelos seus hospedes, moradores e educandos; V - os que gratuitamente houverem participado nos produtos do crime, ate a concorrente quantia.' },
  { numero: '933', livro: 'Parte Especial', titulo: 'Da Responsabilidade Civil', capitulo: 'Da Obrigacao de Indenizar', texto: 'As pessoas indicadas nos incisos I a V do artigo antecedente, ainda que nao haja culpa de sua parte, responderao pelos atos praticados pelos terceiros ali referidos.' },
  { numero: '944', livro: 'Parte Especial', titulo: 'Da Responsabilidade Civil', capitulo: 'Da Indenizacao', texto: 'A indenizacao mede-se pela extensao do dano.' },
  { numero: '945', livro: 'Parte Especial', titulo: 'Da Responsabilidade Civil', capitulo: 'Da Indenizacao', texto: 'Se a vitima tiver concorrido culposamente para o evento danoso, a sua indenizacao sera fixada tendo-se em conta a gravidade de sua culpa em confronto com a do autor do dano.' },
  { numero: '949', livro: 'Parte Especial', titulo: 'Da Responsabilidade Civil', capitulo: 'Da Indenizacao', texto: 'No caso de lesao ou outra ofensa a saude, o ofensor indenizara o ofendido das despesas do tratamento e dos lucros cessantes ate ao fim da convalescenca, alem de algum outro prejuizo que o ofendido prove haver sofrido.' },
  { numero: '950', livro: 'Parte Especial', titulo: 'Da Responsabilidade Civil', capitulo: 'Da Indenizacao', texto: 'Se da ofensa resultar defeito pelo qual o ofendido nao possa exercer o seu oficio ou profissao, ou se lhe diminua a capacidade de trabalho, a indenizacao, alem das despesas do tratamento e lucros cessantes ate ao fim da convalescenca, incluira pensao correspondente a importancia do trabalho para que se inabilitou, ou da depreciacao que ele sofreu.' },
  
  // DA POSSE
  { numero: '1196', livro: 'Parte Especial', titulo: 'Do Direito das Coisas', capitulo: 'Da Posse', texto: 'Considera-se possuidor todo aquele que tem de fato o exercicio, pleno ou nao, de algum dos poderes inerentes a propriedade.' },
  { numero: '1197', livro: 'Parte Especial', titulo: 'Do Direito das Coisas', capitulo: 'Da Posse', texto: 'A posse direta, de pessoa que tem a coisa em seu poder, temporariamente, em virtude de direito pessoal, ou real, nao anula a indireta, de quem aquela foi havida, podendo o possuidor direto defender a sua posse contra o indireto.' },
  { numero: '1210', livro: 'Parte Especial', titulo: 'Do Direito das Coisas', capitulo: 'Dos Efeitos da Posse', texto: 'O possuidor tem direito a ser mantido na posse em caso de turbacao, restituido no de esbulho, e segurado de violencia iminente, se tiver justo receio de ser molestado.' },
  { numero: '1211', livro: 'Parte Especial', titulo: 'Do Direito das Coisas', capitulo: 'Dos Efeitos da Posse', texto: 'Quando mais de uma pessoa se disser possuidora, manter-se-a provisoriamente a que tiver a coisa, se nao estiver manifesto que a obteve de alguma das outras por modo vicioso.' },
  
  // DA PROPRIEDADE
  { numero: '1228', livro: 'Parte Especial', titulo: 'Do Direito das Coisas', capitulo: 'Da Propriedade', texto: 'O proprietario tem a faculdade de usar, gozar e dispor da coisa, e o direito de reave-la do poder de quem quer que injustamente a possua ou detenha.' },
  { numero: '1238', livro: 'Parte Especial', titulo: 'Do Direito das Coisas', capitulo: 'Da Aquisicao da Propriedade Imovel', texto: 'Aquele que, por quinze anos, sem interrupcao, nem oposicao, possuir como seu um imovel, adquire-lhe a propriedade, independentemente de titulo e boa-fe; podendo requerer ao juiz que assim o declare por sentenca, a qual servira de titulo para o registro no Cartorio de Registro de Imoveis.' },
];

// Artigos do Codigo de Processo Civil (Lei 13.105/2015)
const ARTIGOS_CPC = [
  // NORMAS FUNDAMENTAIS
  { numero: '1', livro: 'Parte Geral', titulo: 'Das Normas Fundamentais do Processo Civil', texto: 'O processo civil sera ordenado, disciplinado e interpretado conforme os valores e as normas fundamentais estabelecidos na Constituicao da Republica Federativa do Brasil, observando-se as disposicoes deste Codigo.' },
  { numero: '2', livro: 'Parte Geral', titulo: 'Das Normas Fundamentais do Processo Civil', texto: 'O processo comeca por iniciativa da parte e se desenvolve por impulso oficial, salvo as excecoes previstas em lei.' },
  { numero: '3', livro: 'Parte Geral', titulo: 'Das Normas Fundamentais do Processo Civil', texto: 'Nao se excluira da apreciacao jurisdicional ameaca ou lesao a direito.' },
  { numero: '4', livro: 'Parte Geral', titulo: 'Das Normas Fundamentais do Processo Civil', texto: 'As partes tem o direito de obter em prazo razoavel a solucao integral do merito, incluida a atividade satisfativa.' },
  { numero: '5', livro: 'Parte Geral', titulo: 'Das Normas Fundamentais do Processo Civil', texto: 'Aquele que de qualquer forma participa do processo deve comportar-se de acordo com a boa-fe.' },
  { numero: '6', livro: 'Parte Geral', titulo: 'Das Normas Fundamentais do Processo Civil', texto: 'Todos os sujeitos do processo devem cooperar entre si para que se obtenha, em tempo razoavel, decisao de merito justa e efetiva.' },
  { numero: '7', livro: 'Parte Geral', titulo: 'Das Normas Fundamentais do Processo Civil', texto: 'E assegurada as partes paridade de tratamento em relacao ao exercicio de direitos e faculdades processuais, aos meios de defesa, aos onus, aos deveres e a aplicacao de sancoes processuais, competindo ao juiz zelar pelo efetivo contraditorio.' },
  { numero: '8', livro: 'Parte Geral', titulo: 'Das Normas Fundamentais do Processo Civil', texto: 'Ao aplicar o ordenamento juridico, o juiz atendera aos fins sociais e as exigencias do bem comum, resguardando e promovendo a dignidade da pessoa humana e observando a proporcionalidade, a razoabilidade, a legalidade, a publicidade e a eficiencia.' },
  { numero: '9', livro: 'Parte Geral', titulo: 'Das Normas Fundamentais do Processo Civil', texto: 'Nao se proferira decisao contra uma das partes sem que ela seja previamente ouvida.' },
  { numero: '10', livro: 'Parte Geral', titulo: 'Das Normas Fundamentais do Processo Civil', texto: 'O juiz nao pode decidir, em grau algum de jurisdicao, com base em fundamento a respeito do qual nao se tenha dado as partes oportunidade de se manifestar, ainda que se trate de materia sobre a qual deva decidir de oficio.' },
  { numero: '11', livro: 'Parte Geral', titulo: 'Das Normas Fundamentais do Processo Civil', texto: 'Todos os julgamentos dos orgaos do Poder Judiciario serao publicos, e fundamentadas todas as decisoes, sob pena de nulidade.' },
  { numero: '12', livro: 'Parte Geral', titulo: 'Das Normas Fundamentais do Processo Civil', texto: 'Os juizes e os tribunais atenderao, preferencialmente, a ordem cronologica de conclusao para proferir sentenca ou acordao.' },
  
  // DA JURISDICAO E COMPETENCIA
  { numero: '16', livro: 'Parte Geral', titulo: 'Da Jurisdicao e da Acao', capitulo: 'Da Jurisdicao', texto: 'A jurisdicao civil e exercida pelos juizes e pelos tribunais em todo o territorio nacional, conforme as disposicoes deste Codigo.' },
  { numero: '17', livro: 'Parte Geral', titulo: 'Da Jurisdicao e da Acao', capitulo: 'Da Acao', texto: 'Para postular em juizo e necessario ter interesse e legitimidade.' },
  { numero: '18', livro: 'Parte Geral', titulo: 'Da Jurisdicao e da Acao', capitulo: 'Da Acao', texto: 'Ninguem podera pleitear direito alheio em nome proprio, salvo quando autorizado pelo ordenamento juridico.' },
  { numero: '42', livro: 'Parte Geral', titulo: 'Da Competencia Interna', capitulo: 'Das Disposicoes Gerais', texto: 'As causas civeis serao processadas e decididas pelo juiz nos limites de sua competencia, ressalvado as partes o direito de instituir juizo arbitral, na forma da lei.' },
  { numero: '43', livro: 'Parte Geral', titulo: 'Da Competencia Interna', capitulo: 'Das Disposicoes Gerais', texto: 'Determina-se a competencia no momento do registro ou da distribuicao da peticao inicial, sendo irrelevantes as modificacoes do estado de fato ou de direito ocorridas posteriormente, salvo quando suprimirem orgao judiciario ou alterarem a competencia absoluta.' },
  { numero: '46', livro: 'Parte Geral', titulo: 'Da Competencia Interna', capitulo: 'Da Competencia Territorial', texto: 'A acao fundada em direito pessoal ou em direito real sobre bens moveis sera proposta, em regra, no foro de domicilio do reu.' },
  { numero: '47', livro: 'Parte Geral', titulo: 'Da Competencia Interna', capitulo: 'Da Competencia Territorial', texto: 'Para as acoes fundadas em direito real sobre imoveis e competente o foro de situacao da coisa.' },
  
  // DAS PARTES E DOS PROCURADORES
  { numero: '70', livro: 'Parte Geral', titulo: 'Das Partes e dos Procuradores', capitulo: 'Da Capacidade Processual', texto: 'Toda pessoa que se encontre no exercicio de seus direitos tem capacidade para estar em juizo.' },
  { numero: '71', livro: 'Parte Geral', titulo: 'Das Partes e dos Procuradores', capitulo: 'Da Capacidade Processual', texto: 'O incapaz sera representado ou assistido por seus pais, por tutor ou por curador, na forma da lei.' },
  { numero: '77', livro: 'Parte Geral', titulo: 'Das Partes e dos Procuradores', capitulo: 'Dos Deveres das Partes e de seus Procuradores', texto: 'Alem de outros previstos neste Codigo, sao deveres das partes, de seus procuradores e de todos aqueles que de qualquer forma participem do processo: I - expor os fatos em juizo conforme a verdade; II - nao formular pretensao ou de apresentar defesa quando cientes de que sao destituidas de fundamento; III - nao produzir provas e nao praticar atos inuteis ou desnecessarios a declaracao ou a defesa do direito; IV - cumprir com exatidao as decisoes jurisdicionais, de natureza provisoria ou final, e nao criar embaracos a sua efetivacao.' },
  { numero: '78', livro: 'Parte Geral', titulo: 'Das Partes e dos Procuradores', capitulo: 'Dos Deveres das Partes e de seus Procuradores', texto: 'E vedado as partes, a seus procuradores, aos juizes, aos membros do Ministerio Publico e da Defensoria Publica e a qualquer pessoa que participe do processo empregar expressoes ofensivas nos escritos apresentados.' },
  { numero: '79', livro: 'Parte Geral', titulo: 'Das Partes e dos Procuradores', capitulo: 'Da Responsabilidade das Partes por Dano Processual', texto: 'Responde por perdas e danos aquele que litigar de ma-fe como autor, reu ou interveniente.' },
  { numero: '80', livro: 'Parte Geral', titulo: 'Das Partes e dos Procuradores', capitulo: 'Da Responsabilidade das Partes por Dano Processual', texto: 'Considera-se litigante de ma-fe aquele que: I - deduzir pretensao ou defesa contra texto expresso de lei ou fato incontroverso; II - alterar a verdade dos fatos; III - usar do processo para conseguir objetivo ilegal; IV - opuser resistencia injustificada ao andamento do processo; V - proceder de modo temerario em qualquer incidente ou ato do processo; VI - provocar incidente manifestamente infundado; VII - interpuser recurso com intuito manifestamente protatorio.' },
  
  // DOS PRAZOS
  { numero: '218', livro: 'Parte Geral', titulo: 'Dos Atos Processuais', capitulo: 'Do Tempo e do Lugar dos Atos Processuais', texto: 'Os atos processuais serao realizados nos prazos prescritos em lei.' },
  { numero: '219', livro: 'Parte Geral', titulo: 'Dos Atos Processuais', capitulo: 'Dos Prazos', texto: 'Na contagem de prazo em dias, estabelecido por lei ou pelo juiz, computar-se-ao somente os dias uteis.' },
  { numero: '220', livro: 'Parte Geral', titulo: 'Dos Atos Processuais', capitulo: 'Dos Prazos', texto: 'Suspende-se o curso do prazo processual nos dias compreendidos entre 20 de dezembro e 20 de janeiro, inclusive.' },
  { numero: '224', livro: 'Parte Geral', titulo: 'Dos Atos Processuais', capitulo: 'Dos Prazos', texto: 'Salvo disposicao em contrario, os prazos serao contados excluindo o dia do comeco e incluindo o dia do vencimento.' },
  
  // DA TUTELA PROVISORIA
  { numero: '294', livro: 'Parte Geral', titulo: 'Da Tutela Provisoria', capitulo: 'Disposicoes Gerais', texto: 'A tutela provisoria pode fundamentar-se em urgencia ou evidencia.' },
  { numero: '295', livro: 'Parte Geral', titulo: 'Da Tutela Provisoria', capitulo: 'Disposicoes Gerais', texto: 'A tutela provisoria requerida em carater incidental independe do pagamento de custas.' },
  { numero: '300', livro: 'Parte Geral', titulo: 'Da Tutela Provisoria', capitulo: 'Da Tutela de Urgencia', texto: 'A tutela de urgencia sera concedida quando houver elementos que evidenciem a probabilidade do direito e o perigo de dano ou o risco ao resultado util do processo.' },
  { numero: '301', livro: 'Parte Geral', titulo: 'Da Tutela Provisoria', capitulo: 'Da Tutela de Urgencia', texto: 'A tutela de urgencia de natureza cautelar pode ser efetivada mediante arresto, sequestro, arrolamento de bens, registro de protesto contra alienacao de bem e qualquer outra medida idonea para asseguracao do direito.' },
  { numero: '302', livro: 'Parte Geral', titulo: 'Da Tutela Provisoria', capitulo: 'Da Tutela de Urgencia', texto: 'Independentemente da reparacao por dano processual, a parte responde pelo prejuizo que a efetivacao da tutela de urgencia causar a parte adversa, se: I - a sentenca lhe for desfavoravel; II - obtida liminarmente a tutela em carater antecedente, nao fornecer os meios necessarios para a citacao do requerido no prazo de 5 (cinco) dias; III - ocorrer a cessacao da eficacia da medida em qualquer hipotese legal; IV - o juiz acolher a alegacao de decadencia ou prescricao da pretensao do autor.' },
  { numero: '303', livro: 'Parte Geral', titulo: 'Da Tutela Provisoria', capitulo: 'Da Tutela de Urgencia', texto: 'Nos casos em que a urgencia for contemporanea a propositura da acao, a peticao inicial pode limitar-se ao requerimento da tutela antecipada e a indicacao do pedido de tutela final, com a exposicao da lide, do direito que se busca realizar e do perigo de dano ou do risco ao resultado util do processo.' },
  { numero: '311', livro: 'Parte Geral', titulo: 'Da Tutela Provisoria', capitulo: 'Da Tutela da Evidencia', texto: 'A tutela da evidencia sera concedida, independentemente da demonstracao de perigo de dano ou de risco ao resultado util do processo, quando: I - ficar caracterizado o abuso do direito de defesa ou o manifesto proposito protatorio da parte; II - as alegacoes de fato puderem ser comprovadas apenas documentalmente e houver tese firmada em julgamento de casos repetitivos ou em sumula vinculante; III - se tratar de pedido reipersecutorio fundado em prova documental adequada do contrato de deposito, caso em que sera decretada a ordem de entrega do objeto custodiado, sob cominacao de multa; IV - a peticao inicial for instruida com prova documental suficiente dos fatos constitutivos do direito do autor, a que o reu nao oponha prova capaz de gerar duvida razoavel.' },
  
  // DA SENTENCA E DA COISA JULGADA
  { numero: '485', livro: 'Parte Especial', titulo: 'Do Processo de Conhecimento e do Cumprimento de Sentenca', capitulo: 'Da Extincao do Processo', texto: 'O juiz nao resolvera o merito quando: I - indeferir a peticao inicial; II - o processo ficar parado durante mais de 1 (um) ano por negligencia das partes; III - por nao promover os atos e as diligencias que lhe incumbir, o autor abandonar a causa por mais de 30 (trinta) dias; IV - verificar a ausencia de pressupostos de constituicao e de desenvolvimento valido e regular do processo; V - reconhecer a existencia de perempção, de litispendencia ou de coisa julgada; VI - verificar ausencia de legitimidade ou de interesse processual; VII - acolher a alegacao de existencia de convencao de arbitragem ou quando o juizo arbitral reconhecer sua competencia; VIII - homologar a desistencia da acao; IX - em caso de morte da parte, a acao for considerada intransmissivel por disposicao legal; X - nos demais casos prescritos neste Codigo.' },
  { numero: '487', livro: 'Parte Especial', titulo: 'Do Processo de Conhecimento e do Cumprimento de Sentenca', capitulo: 'Do Julgamento do Merito', texto: 'Havera resolucao de merito quando o juiz: I - acolher ou rejeitar o pedido formulado na acao ou na reconvencao; II - decidir, de oficio ou a requerimento, sobre a ocorrencia de decadencia ou prescricao; III - homologar: a) o reconhecimento da procedencia do pedido formulado na acao ou na reconvencao; b) a transacao; c) a renuncia a pretensao formulada na acao ou na reconvencao.' },
  { numero: '489', livro: 'Parte Especial', titulo: 'Do Processo de Conhecimento e do Cumprimento de Sentenca', capitulo: 'Dos Elementos e dos Efeitos da Sentenca', texto: 'Sao elementos essenciais da sentenca: I - o relatorio, que contera os nomes das partes, a identificacao do caso, com a suma do pedido e da contestacao, e o registro das principais ocorrencias havidas no andamento do processo; II - os fundamentos, em que o juiz analisara as questoes de fato e de direito; III - o dispositivo, em que o juiz resolvera as questoes principais que as partes lhe submeterem.' },
  { numero: '502', livro: 'Parte Especial', titulo: 'Do Processo de Conhecimento e do Cumprimento de Sentenca', capitulo: 'Da Coisa Julgada', texto: 'Denomina-se coisa julgada material a autoridade que torna imutavel e indiscutivel a decisao de merito nao mais sujeita a recurso.' },
  { numero: '503', livro: 'Parte Especial', titulo: 'Do Processo de Conhecimento e do Cumprimento de Sentenca', capitulo: 'Da Coisa Julgada', texto: 'A decisao que julgar total ou parcialmente o merito tem forca de lei nos limites da questao principal expressamente decidida.' },
  
  // DOS RECURSOS
  { numero: '994', livro: 'Parte Especial', titulo: 'Dos Processos nos Tribunais e dos Meios de Impugnacao das Decisoes Judiciais', capitulo: 'Disposicoes Gerais', texto: 'Sao cabiveis os seguintes recursos: I - apelacao; II - agravo de instrumento; III - agravo interno; IV - embargos de declaracao; V - recurso ordinario; VI - recurso especial; VII - recurso extraordinario; VIII - agravo em recurso especial ou extraordinario; IX - embargos de divergencia.' },
  { numero: '1.009', livro: 'Parte Especial', titulo: 'Da Apelacao', capitulo: 'Da Apelacao', texto: 'Da sentenca cabe apelacao.' },
  { numero: '1.010', livro: 'Parte Especial', titulo: 'Da Apelacao', capitulo: 'Da Apelacao', texto: 'A apelacao, interposta por peticao dirigida ao juizo de primeiro grau, contera: I - os nomes e a qualificacao das partes; II - a exposicao do fato e do direito; III - as razoes do pedido de reforma ou de decretacao de nulidade; IV - o pedido de nova decisao.' },
  { numero: '1.015', livro: 'Parte Especial', titulo: 'Do Agravo de Instrumento', capitulo: 'Do Agravo de Instrumento', texto: 'Cabe agravo de instrumento contra as decisoes interlocutorias que versarem sobre: I - tutelas provisorias; II - merito do processo; III - rejeicao da alegacao de convencao de arbitragem; IV - incidente de desconsideracao da personalidade juridica; V - rejeicao do pedido de gratuidade da justica ou acolhimento do pedido de sua revogacao; VI - exibicao ou posse de documento ou coisa; VII - exclusao de litisconsorte; VIII - rejeicao do pedido de limitacao do litisconsorcio; IX - admissao ou inadmissao de intervencao de terceiros; X - concessao, modificacao ou revogacao do efeito suspensivo aos embargos a execucao; XI - redistribuicao do onus da prova nos termos do art. 373, § 1o; XII - (VETADO); XIII - outros casos expressamente referidos em lei.' },
];

async function main() {
  console.log('='.repeat(60));
  console.log('OFFICEBRAIN JURIS ENTERPRISE - DATABASE SEED');
  console.log('='.repeat(60));
  console.log('');

  // Limpar dados existentes
  console.log('[1/8] Limpando dados existentes...');
  
  // Deletar em ordem de dependencia reversa
  await prisma.referenciaJuridica.deleteMany();
  await prisma.artigoEmbedding.deleteMany();
  await prisma.artigoLei.deleteMany();
  await prisma.legislacao.deleteMany();
  await prisma.jurisprudenciaEmbedding.deleteMany();
  await prisma.jurisprudencia.deleteMany();
  await prisma.logAuditoria.deleteMany();
  await prisma.logIA.deleteMany();
  await prisma.notificacao.deleteMany();
  await prisma.comentario.deleteMany();
  await prisma.checklistItem.deleteMany();
  await prisma.tarefa.deleteMany();
  await prisma.calculoIRPF.deleteMany();
  await prisma.notaFiscal.deleteMany();
  await prisma.parcelaHonorario.deleteMany();
  await prisma.movimentacaoFinanceira.deleteMany();
  await prisma.honorario.deleteMany();
  await prisma.versaoDocumento.deleteMany();
  await prisma.documento.deleteMany();
  await prisma.prazo.deleteMany();
  await prisma.audiencia.deleteMany();
  await prisma.andamentoProcessual.deleteMany();
  await prisma.processoEquipe.deleteMany();
  await prisma.parteProcesso.deleteMany();
  await prisma.processoCliente.deleteMany();
  await prisma.processo.deleteMany();
  await prisma.interacaoCliente.deleteMany();
  await prisma.endereco.deleteMany();
  await prisma.cliente.deleteMany();
  await prisma.refreshToken.deleteMany();
  await prisma.sessaoLogin.deleteMany();
  await prisma.logAutomacao.deleteMany();
  await prisma.automacao.deleteMany();
  await prisma.configuracaoIA.deleteMany();
  await prisma.centroCusto.deleteMany();
  await prisma.workspaceMembro.deleteMany();
  await prisma.workspace.deleteMany();
  await prisma.usuario.deleteMany();
  console.log('   Dados limpos com sucesso!');
  console.log('');

  // Criar Workspace
  console.log('[2/8] Criando workspace...');
  const workspace = await prisma.workspace.create({
    data: {
      nome: 'Silva e Associados Advocacia',
      slug: 'silva-associados',
      cnpj: '12.345.678/0001-90',
      endereco: 'Av. Paulista, 1000, 10o andar, Bela Vista, Sao Paulo/SP',
      telefone: '(11) 3000-1000',
      email: 'contato@silvaassociados.adv.br',
      site: 'https://silvaassociados.adv.br',
      regimeTributario: 'LUCRO_PRESUMIDO',
      configuracoes: {
        corPrimaria: '#2563eb',
        corSecundaria: '#7c3aed',
        fusoHorario: 'America/Sao_Paulo',
      },
    },
  });
  console.log(`   Workspace criado: ${workspace.nome}`);
  console.log('');

  // Criar Usuarios
  console.log('[3/8] Criando usuarios...');
  const senhaHash = await bcrypt.hash('OfficeBrain@2024', 10);
  
  const usuarios = await Promise.all([
    prisma.usuario.create({
      data: {
        email: 'admin@officebrain.com.br',
        senha: senhaHash,
        nome: 'Administrador do Sistema',
        perfil: 'ADMIN',
        ativo: true,
        emailVerificado: true,
        workspaces: {
          create: { workspaceId: workspace.id, funcao: 'ADMIN' },
        },
      },
    }),
    prisma.usuario.create({
      data: {
        email: 'joao.silva@silvaassociados.adv.br',
        senha: senhaHash,
        nome: 'Dr. Joao Carlos da Silva',
        oab: 'SP 123.456',
        telefone: '(11) 99999-1111',
        perfil: 'SOCIO',
        ativo: true,
        emailVerificado: true,
        workspaces: {
          create: { workspaceId: workspace.id, funcao: 'SOCIO' },
        },
      },
    }),
    prisma.usuario.create({
      data: {
        email: 'maria.santos@silvaassociados.adv.br',
        senha: senhaHash,
        nome: 'Dra. Maria Fernanda Santos',
        oab: 'SP 654.321',
        telefone: '(11) 99999-2222',
        perfil: 'ADVOGADO',
        ativo: true,
        emailVerificado: true,
        workspaces: {
          create: { workspaceId: workspace.id, funcao: 'ADVOGADO' },
        },
      },
    }),
    prisma.usuario.create({
      data: {
        email: 'pedro.oliveira@silvaassociados.adv.br',
        senha: senhaHash,
        nome: 'Pedro Henrique Oliveira',
        oab: 'SP 789.012',
        telefone: '(11) 99999-3333',
        perfil: 'ESTAGIARIO',
        ativo: true,
        emailVerificado: true,
        workspaces: {
          create: { workspaceId: workspace.id, funcao: 'ESTAGIARIO' },
        },
      },
    }),
    prisma.usuario.create({
      data: {
        email: 'ana.costa@silvaassociados.adv.br',
        senha: senhaHash,
        nome: 'Ana Paula Costa',
        telefone: '(11) 99999-4444',
        perfil: 'FINANCEIRO',
        ativo: true,
        emailVerificado: true,
        workspaces: {
          create: { workspaceId: workspace.id, funcao: 'FINANCEIRO' },
        },
      },
    }),
  ]);

  const [admin, advogado1, advogado2, estagiario, financeiro] = usuarios;
  console.log(`   ${usuarios.length} usuarios criados`);
  console.log('');

  // Criar Centros de Custo
  console.log('[4/8] Criando centros de custo...');
  const centrosCusto = await Promise.all([
    prisma.centroCusto.create({
      data: { workspaceId: workspace.id, nome: 'Area Civil', descricao: 'Processos da area civel' },
    }),
    prisma.centroCusto.create({
      data: { workspaceId: workspace.id, nome: 'Area Consumidor', descricao: 'Processos de direito do consumidor' },
    }),
    prisma.centroCusto.create({
      data: { workspaceId: workspace.id, nome: 'Area Familia', descricao: 'Processos de direito de familia' },
    }),
    prisma.centroCusto.create({
      data: { workspaceId: workspace.id, nome: 'Consultoria', descricao: 'Servicos de consultoria juridica' },
    }),
  ]);
  console.log(`   ${centrosCusto.length} centros de custo criados`);
  console.log('');

  // Criar Clientes
  console.log('[5/8] Criando clientes...');
  const clientes = await Promise.all([
    // Pessoas Fisicas
    prisma.cliente.create({
      data: {
        workspaceId: workspace.id,
        tipo: 'FISICA',
        nome: 'Carlos Eduardo Ferreira',
        cpfCnpj: '123.456.789-00',
        rg: '12.345.678-9',
        dataNascimento: new Date('1985-03-15'),
        email: 'carlos.ferreira@email.com',
        telefone: '(11) 3333-1111',
        celular: '(11) 99888-1111',
        profissao: 'Engenheiro Civil',
        estadoCivil: 'Casado',
        tags: ['VIP', 'Recorrente'],
        enderecos: {
          create: {
            tipo: 'RESIDENCIAL',
            cep: '01310-100',
            logradouro: 'Av. Paulista',
            numero: '1000',
            complemento: 'Apto 1501',
            bairro: 'Bela Vista',
            cidade: 'Sao Paulo',
            uf: 'SP',
            principal: true,
          },
        },
      },
    }),
    prisma.cliente.create({
      data: {
        workspaceId: workspace.id,
        tipo: 'FISICA',
        nome: 'Ana Paula de Souza Lima',
        cpfCnpj: '987.654.321-00',
        rg: '98.765.432-1',
        dataNascimento: new Date('1990-08-22'),
        email: 'ana.lima@email.com',
        celular: '(11) 99777-2222',
        profissao: 'Medica',
        estadoCivil: 'Solteira',
        tags: ['Novo'],
        enderecos: {
          create: {
            tipo: 'RESIDENCIAL',
            cep: '04543-000',
            logradouro: 'Av. Engenheiro Luis Carlos Berrini',
            numero: '500',
            complemento: 'Apto 2001',
            bairro: 'Brooklin',
            cidade: 'Sao Paulo',
            uf: 'SP',
            principal: true,
          },
        },
      },
    }),
    prisma.cliente.create({
      data: {
        workspaceId: workspace.id,
        tipo: 'FISICA',
        nome: 'Roberto Augusto Mendes',
        cpfCnpj: '456.789.123-00',
        rg: '45.678.912-3',
        dataNascimento: new Date('1978-11-30'),
        email: 'roberto.mendes@email.com',
        celular: '(11) 99666-3333',
        profissao: 'Empresario',
        estadoCivil: 'Divorciado',
        tags: ['Empresarial'],
        enderecos: {
          create: {
            tipo: 'RESIDENCIAL',
            cep: '01451-001',
            logradouro: 'Rua Haddock Lobo',
            numero: '1200',
            bairro: 'Cerqueira Cesar',
            cidade: 'Sao Paulo',
            uf: 'SP',
            principal: true,
          },
        },
      },
    }),
    prisma.cliente.create({
      data: {
        workspaceId: workspace.id,
        tipo: 'FISICA',
        nome: 'Fernanda Cristina Alves',
        cpfCnpj: '321.654.987-00',
        rg: '32.165.498-7',
        dataNascimento: new Date('1995-02-14'),
        email: 'fernanda.alves@email.com',
        celular: '(11) 99555-4444',
        profissao: 'Arquiteta',
        estadoCivil: 'Casada',
        tags: ['Consumidor'],
      },
    }),
    prisma.cliente.create({
      data: {
        workspaceId: workspace.id,
        tipo: 'FISICA',
        nome: 'Marcos Vinicius Pereira',
        cpfCnpj: '654.987.321-00',
        rg: '65.498.732-1',
        dataNascimento: new Date('1982-06-08'),
        email: 'marcos.pereira@email.com',
        celular: '(11) 99444-5555',
        profissao: 'Contador',
        estadoCivil: 'Casado',
        tags: ['Familia'],
      },
    }),
    // Pessoas Juridicas
    prisma.cliente.create({
      data: {
        workspaceId: workspace.id,
        tipo: 'JURIDICA',
        nome: 'Tech Solutions Ltda',
        nomeFantasia: 'TechSol',
        razaoSocial: 'Tech Solutions Tecnologia da Informacao Ltda',
        cpfCnpj: '12.345.678/0001-90',
        email: 'juridico@techsol.com.br',
        telefone: '(11) 3000-2000',
        tags: ['Empresa', 'VIP'],
        enderecos: {
          create: {
            tipo: 'COMERCIAL',
            cep: '04538-132',
            logradouro: 'Av. Brigadeiro Faria Lima',
            numero: '3477',
            complemento: '18o andar',
            bairro: 'Itaim Bibi',
            cidade: 'Sao Paulo',
            uf: 'SP',
            principal: true,
          },
        },
      },
    }),
    prisma.cliente.create({
      data: {
        workspaceId: workspace.id,
        tipo: 'JURIDICA',
        nome: 'Comercio ABC Ltda',
        nomeFantasia: 'Loja ABC',
        razaoSocial: 'Comercio ABC de Eletronicos Ltda',
        cpfCnpj: '98.765.432/0001-10',
        email: 'contato@lojaabc.com.br',
        telefone: '(11) 3000-3000',
        tags: ['Empresa', 'Consumidor'],
      },
    }),
    prisma.cliente.create({
      data: {
        workspaceId: workspace.id,
        tipo: 'JURIDICA',
        nome: 'Construtora Delta S.A.',
        nomeFantasia: 'Delta Construcoes',
        razaoSocial: 'Construtora Delta Empreendimentos Imobiliarios S.A.',
        cpfCnpj: '11.222.333/0001-44',
        email: 'juridico@deltaconstrucoes.com.br',
        telefone: '(11) 3000-4000',
        tags: ['Empresa', 'Imobiliario'],
      },
    }),
    prisma.cliente.create({
      data: {
        workspaceId: workspace.id,
        tipo: 'JURIDICA',
        nome: 'Restaurante Bom Sabor Ltda',
        nomeFantasia: 'Restaurante Bom Sabor',
        razaoSocial: 'Restaurante Bom Sabor Gastronomia Ltda',
        cpfCnpj: '55.666.777/0001-88',
        email: 'contato@bomsabor.com.br',
        telefone: '(11) 3000-5000',
        tags: ['Empresa', 'Trabalhista'],
      },
    }),
    prisma.cliente.create({
      data: {
        workspaceId: workspace.id,
        tipo: 'JURIDICA',
        nome: 'Clinica Medica Saude Total',
        nomeFantasia: 'Clinica Saude Total',
        razaoSocial: 'Clinica Medica Saude Total S/S Ltda',
        cpfCnpj: '99.888.777/0001-66',
        email: 'administrativo@saudetotal.com.br',
        telefone: '(11) 3000-6000',
        tags: ['Empresa', 'Saude'],
      },
    }),
  ]);
  console.log(`   ${clientes.length} clientes criados`);
  console.log('');

  // Criar Processos
  console.log('[6/8] Criando processos...');
  const processos = await Promise.all([
    prisma.processo.create({
      data: {
        workspaceId: workspace.id,
        numeroCnj: '0001234-56.2024.8.26.0100',
        tipoAcao: 'Acao de Cobranca',
        classeProcessual: 'Procedimento Comum Civel',
        assuntoPrincipal: 'Cobranca de divida - inadimplemento contratual',
        area: 'CIVIL',
        status: 'ATIVO',
        fase: 'CONHECIMENTO',
        vara: '5a Vara Civel',
        foro: 'Foro Central Civel',
        comarca: 'Sao Paulo',
        uf: 'SP',
        tribunal: 'TJSP',
        valorCausa: 50000.00,
        objetoAcao: 'Cobranca de valores devidos em razao de contrato de prestacao de servicos nao adimplido pelo reu.',
        dataDistribuicao: new Date('2024-01-15'),
        advogadoResponsavelId: advogado1.id,
        resumoIA: 'Acao de cobranca fundamentada em contrato de prestacao de servicos. Cliente busca receber valores nao pagos pelo reu. Documentacao robusta. Probabilidade de exito alta.',
        probabilidadeExito: 0.85,
        riscosIdentificados: ['Possivel alegacao de prescricao', 'Contestacao sobre qualidade do servico'],
        pontosAtencao: ['Verificar prazo prescricional', 'Reunir todas as notas fiscais'],
        artigosRelacionados: ['CC Art. 389', 'CC Art. 395', 'CC Art. 402'],
        clientes: { create: { clienteId: clientes[0].id, participacao: 'AUTOR', principal: true } },
        partes: { create: [{ nome: 'Empresa XYZ Comercio Ltda', cpfCnpj: '11.111.111/0001-11', tipo: 'REU' }] },
      },
    }),
    prisma.processo.create({
      data: {
        workspaceId: workspace.id,
        numeroCnj: '0005678-90.2024.8.26.0100',
        tipoAcao: 'Acao de Indenizacao por Danos Morais e Materiais',
        classeProcessual: 'Procedimento Comum Civel',
        assuntoPrincipal: 'Responsabilidade civil - danos ao consumidor',
        area: 'CONSUMIDOR',
        status: 'ATIVO',
        fase: 'CONHECIMENTO',
        vara: '2a Vara do Juizado Especial Civel',
        foro: 'Foro Regional de Pinheiros',
        comarca: 'Sao Paulo',
        uf: 'SP',
        tribunal: 'TJSP',
        valorCausa: 15000.00,
        objetoAcao: 'Indenizacao por danos morais e materiais decorrentes de produto defeituoso adquirido pelo consumidor.',
        dataDistribuicao: new Date('2024-02-20'),
        advogadoResponsavelId: advogado2.id,
        resumoIA: 'Acao de indenizacao por vicio do produto. Cliente adquiriu eletrodomestico que apresentou defeito. Aplicacao do CDC. Inversao do onus da prova favoravel.',
        probabilidadeExito: 0.90,
        riscosIdentificados: ['Necessidade de pericia tecnica'],
        pontosAtencao: ['Guardar produto defeituoso', 'Solicitar inversao do onus da prova'],
        artigosRelacionados: ['CDC Art. 12', 'CDC Art. 18', 'CC Art. 927'],
        clientes: { create: { clienteId: clientes[1].id, participacao: 'AUTOR', principal: true } },
        partes: { create: [{ nome: 'Magazine Popular S.A.', cpfCnpj: '22.222.222/0001-22', tipo: 'REU' }] },
      },
    }),
    prisma.processo.create({
      data: {
        workspaceId: workspace.id,
        numeroCnj: '0009876-54.2023.8.26.0100',
        tipoAcao: 'Execucao de Titulo Extrajudicial',
        classeProcessual: 'Execucao de Titulo Extrajudicial',
        assuntoPrincipal: 'Execucao de cheque prescrito',
        area: 'CIVIL',
        status: 'ATIVO',
        fase: 'EXECUCAO',
        vara: '10a Vara Civel',
        foro: 'Foro Central Civel',
        comarca: 'Sao Paulo',
        uf: 'SP',
        tribunal: 'TJSP',
        valorCausa: 120000.00,
        objetoAcao: 'Execucao de titulo extrajudicial (cheques) emitidos pelo devedor e nao honrados.',
        dataDistribuicao: new Date('2023-10-05'),
        advogadoResponsavelId: advogado1.id,
        resumoIA: 'Execucao de titulo extrajudicial fundamentada em cheques prescritos. Devedor nao localizou bens penhora eis. Sugestao: pesquisa patrimonial ampla.',
        probabilidadeExito: 0.70,
        riscosIdentificados: ['Devedor sem patrimonio', 'Possivel insolvencia'],
        pontosAtencao: ['Realizar pesquisa SISBAJUD', 'Verificar bens em nome de terceiros'],
        artigosRelacionados: ['CPC Art. 771', 'CPC Art. 784', 'CC Art. 206'],
        clientes: { create: { clienteId: clientes[5].id, participacao: 'AUTOR', principal: true } },
        partes: { create: [{ nome: 'Jose da Silva ME', cpfCnpj: '33.333.333/0001-33', tipo: 'REU' }] },
      },
    }),
    prisma.processo.create({
      data: {
        workspaceId: workspace.id,
        numeroCnj: '0003333-22.2024.8.26.0100',
        tipoAcao: 'Acao Revisional de Contrato',
        classeProcessual: 'Procedimento Comum Civel',
        assuntoPrincipal: 'Revisao de contrato bancario - juros abusivos',
        area: 'CIVIL',
        status: 'ATIVO',
        fase: 'CONHECIMENTO',
        vara: '15a Vara Civel',
        foro: 'Foro Central Civel',
        comarca: 'Sao Paulo',
        uf: 'SP',
        tribunal: 'TJSP',
        valorCausa: 80000.00,
        objetoAcao: 'Revisao de clausulas contratuais abusivas em contrato de financiamento bancario.',
        dataDistribuicao: new Date('2024-03-10'),
        advogadoResponsavelId: advogado2.id,
        resumoIA: 'Acao revisional de contrato bancario. Cliente alega juros abusivos e capitalizacao indevida. Jurisprudencia favoravel no TJSP para casos similares.',
        probabilidadeExito: 0.75,
        riscosIdentificados: ['Necessidade de pericia contabil', 'Sumula 596 do STF'],
        pontosAtencao: ['Requerer pericia contabil', 'Analisar CET do contrato'],
        artigosRelacionados: ['CC Art. 421', 'CC Art. 422', 'CDC Art. 51'],
        clientes: { create: { clienteId: clientes[4].id, participacao: 'AUTOR', principal: true } },
        partes: { create: [{ nome: 'Banco Nacional S.A.', cpfCnpj: '44.444.444/0001-44', tipo: 'REU' }] },
      },
    }),
    prisma.processo.create({
      data: {
        workspaceId: workspace.id,
        numeroCnj: '0007777-11.2024.8.26.0100',
        tipoAcao: 'Acao de Despejo por Falta de Pagamento',
        classeProcessual: 'Procedimento Comum Civel',
        assuntoPrincipal: 'Despejo - inadimplemento de alugueis',
        area: 'CIVIL',
        status: 'ATIVO',
        fase: 'CONHECIMENTO',
        vara: '3a Vara Civel',
        foro: 'Foro Regional de Santana',
        comarca: 'Sao Paulo',
        uf: 'SP',
        tribunal: 'TJSP',
        valorCausa: 25000.00,
        objetoAcao: 'Despejo do inquilino por falta de pagamento de alugueis e encargos locaticios.',
        dataDistribuicao: new Date('2024-04-01'),
        advogadoResponsavelId: advogado1.id,
        resumoIA: 'Acao de despejo fundamentada na Lei 8.245/91. Inquilino inadimplente ha 4 meses. Alta probabilidade de liminar de despejo.',
        probabilidadeExito: 0.95,
        riscosIdentificados: ['Inquilino pode purgar a mora'],
        pontosAtencao: ['Calcular todos os alugueis em atraso', 'Incluir multa e juros'],
        artigosRelacionados: ['Lei 8.245 Art. 59', 'Lei 8.245 Art. 62', 'CC Art. 394'],
        clientes: { create: { clienteId: clientes[5].id, participacao: 'AUTOR', principal: true } },
        partes: { create: [{ nome: 'Maria Jose da Silva', cpfCnpj: '555.666.777-88', tipo: 'REU' }] },
      },
    }),
  ]);
  console.log(`   ${processos.length} processos criados`);
  console.log('');

  // Criar Audiencias, Prazos, Documentos, Honorarios, Tarefas
  console.log('[7/8] Criando dados complementares...');
  
  // Audiencias
  await Promise.all([
    prisma.audiencia.create({
      data: {
        processoId: processos[0].id,
        tipo: 'CONCILIACAO',
        data: new Date('2025-01-20'),
        hora: '14:00',
        local: 'Sala 301 - Foro Central Civel',
        juiz: 'Dr. Antonio Carlos Pereira',
        status: 'AGENDADA',
        observacoes: 'Levar proposta de acordo - valor minimo R$ 45.000,00',
      },
    }),
    prisma.audiencia.create({
      data: {
        processoId: processos[1].id,
        tipo: 'INSTRUCAO',
        data: new Date('2025-02-15'),
        hora: '10:00',
        local: 'Sala 105 - Foro Regional de Pinheiros',
        juiz: 'Dra. Fernanda Lima Santos',
        status: 'AGENDADA',
        observacoes: 'Audiencia de instrucao e julgamento - arrolar testemunhas',
      },
    }),
    prisma.audiencia.create({
      data: {
        processoId: processos[4].id,
        tipo: 'UNA',
        data: new Date('2025-01-10'),
        hora: '09:30',
        local: 'Sala 203 - Foro Regional de Santana',
        status: 'AGENDADA',
      },
    }),
  ]);

  // Prazos
  await Promise.all([
    prisma.prazo.create({
      data: {
        processoId: processos[0].id,
        tipo: 'MANIFESTACAO',
        descricao: 'Manifestar sobre documentos juntados pelo reu',
        dataLimite: new Date('2025-01-05'),
        responsavelId: advogado1.id,
        prioridade: 'ALTA',
      },
    }),
    prisma.prazo.create({
      data: {
        processoId: processos[1].id,
        tipo: 'RECURSO',
        descricao: 'Prazo para embargos de declaracao',
        dataLimite: new Date('2025-01-08'),
        responsavelId: advogado2.id,
        prioridade: 'URGENTE',
      },
    }),
    prisma.prazo.create({
      data: {
        processoId: processos[2].id,
        tipo: 'CUMPRIMENTO',
        descricao: 'Cumprir diligencia - pesquisa patrimonial',
        dataLimite: new Date('2025-01-15'),
        responsavelId: estagiario.id,
        prioridade: 'MEDIA',
      },
    }),
    prisma.prazo.create({
      data: {
        processoId: processos[3].id,
        tipo: 'CONTESTACAO',
        descricao: 'Apresentar replica a contestacao do banco',
        dataLimite: new Date('2025-01-12'),
        responsavelId: advogado2.id,
        prioridade: 'ALTA',
      },
    }),
  ]);

  // Documentos
  await Promise.all([
    prisma.documento.create({
      data: {
        workspaceId: workspace.id,
        nome: 'Peticao Inicial - Acao de Cobranca',
        tipo: 'PETICAO_INICIAL',
        descricao: 'Peticao inicial da acao de cobranca contra Empresa XYZ',
        arquivoUrl: '/uploads/docs/peticao-inicial-cobranca.pdf',
        processoId: processos[0].id,
        clienteId: clientes[0].id,
        uploadPorId: advogado1.id,
        resumoIA: 'Peticao inicial pleiteando cobranca de R$ 50.000,00 decorrentes de contrato de prestacao de servicos.',
      },
    }),
    prisma.documento.create({
      data: {
        workspaceId: workspace.id,
        nome: 'Contrato de Prestacao de Servicos',
        tipo: 'CONTRATO',
        descricao: 'Contrato firmado entre as partes',
        arquivoUrl: '/uploads/docs/contrato-servicos.pdf',
        processoId: processos[0].id,
        clienteId: clientes[0].id,
        uploadPorId: advogado1.id,
      },
    }),
    prisma.documento.create({
      data: {
        workspaceId: workspace.id,
        nome: 'Procuracao Ad Judicia',
        tipo: 'PROCURACAO',
        descricao: 'Procuracao outorgada pelo cliente',
        arquivoUrl: '/uploads/docs/procuracao-carlos.pdf',
        clienteId: clientes[0].id,
        uploadPorId: advogado1.id,
      },
    }),
  ]);

  // Honorarios
  await Promise.all([
    prisma.honorario.create({
      data: {
        workspaceId: workspace.id,
        tipo: 'CONTRATUAL',
        descricao: 'Honorarios advocaticios - Acao de Cobranca',
        valor: 8000.00,
        status: 'PARCIAL',
        valorPago: 4000.00,
        clienteId: clientes[0].id,
        processoId: processos[0].id,
        advogadoId: advogado1.id,
        centroCustoId: centrosCusto[0].id,
        dataVencimento: new Date('2024-12-15'),
        parcelas: {
          create: [
            { numero: 1, valor: 4000.00, vencimento: new Date('2024-11-15'), pago: true, dataPago: new Date('2024-11-15') },
            { numero: 2, valor: 4000.00, vencimento: new Date('2024-12-15'), pago: false },
          ],
        },
      },
    }),
    prisma.honorario.create({
      data: {
        workspaceId: workspace.id,
        tipo: 'CONTRATUAL',
        descricao: 'Honorarios advocaticios - Acao de Indenizacao',
        valor: 3000.00,
        status: 'PAGO',
        valorPago: 3000.00,
        clienteId: clientes[1].id,
        processoId: processos[1].id,
        advogadoId: advogado2.id,
        centroCustoId: centrosCusto[1].id,
        dataPagamento: new Date('2024-02-25'),
      },
    }),
    prisma.honorario.create({
      data: {
        workspaceId: workspace.id,
        tipo: 'EXITO',
        descricao: 'Honorarios de exito - Execucao de Titulo',
        valor: 24000.00,
        percentualExito: 20.0,
        status: 'PENDENTE',
        clienteId: clientes[5].id,
        processoId: processos[2].id,
        advogadoId: advogado1.id,
        centroCustoId: centrosCusto[0].id,
      },
    }),
    prisma.honorario.create({
      data: {
        workspaceId: workspace.id,
        tipo: 'CONSULTORIA',
        descricao: 'Consultoria juridica mensal - Tech Solutions',
        valor: 5000.00,
        status: 'PAGO',
        valorPago: 5000.00,
        clienteId: clientes[5].id,
        advogadoId: advogado1.id,
        centroCustoId: centrosCusto[3].id,
        dataPagamento: new Date('2024-11-30'),
      },
    }),
  ]);

  // Movimentacoes Financeiras
  await Promise.all([
    prisma.movimentacaoFinanceira.create({
      data: {
        workspaceId: workspace.id,
        tipo: 'RECEITA',
        categoria: 'HONORARIOS',
        descricao: 'Recebimento honorarios - Carlos Ferreira',
        valor: 4000.00,
        data: new Date('2024-11-15'),
        status: 'CONFIRMADO',
        clienteId: clientes[0].id,
        processoId: processos[0].id,
        centroCustoId: centrosCusto[0].id,
      },
    }),
    prisma.movimentacaoFinanceira.create({
      data: {
        workspaceId: workspace.id,
        tipo: 'DESPESA',
        categoria: 'CUSTAS',
        descricao: 'Custas judiciais - Acao de Cobranca',
        valor: 350.00,
        data: new Date('2024-01-15'),
        status: 'CONFIRMADO',
        processoId: processos[0].id,
        centroCustoId: centrosCusto[0].id,
      },
    }),
    prisma.movimentacaoFinanceira.create({
      data: {
        workspaceId: workspace.id,
        tipo: 'RECEITA',
        categoria: 'HONORARIOS',
        descricao: 'Consultoria mensal - Tech Solutions',
        valor: 5000.00,
        data: new Date('2024-11-30'),
        status: 'CONFIRMADO',
        clienteId: clientes[5].id,
        centroCustoId: centrosCusto[3].id,
      },
    }),
  ]);

  // Tarefas
  await Promise.all([
    prisma.tarefa.create({
      data: {
        workspaceId: workspace.id,
        titulo: 'Elaborar replica a contestacao',
        descricao: 'Elaborar replica refutando os argumentos apresentados na contestacao do reu',
        status: 'EM_ANDAMENTO',
        prioridade: 'ALTA',
        dataLimite: new Date('2025-01-10'),
        processoId: processos[0].id,
        responsavelId: advogado1.id,
        criadorId: admin.id,
        etiquetas: ['replica', 'urgente'],
        checklist: {
          create: [
            { texto: 'Analisar contestacao', concluido: true, ordem: 1 },
            { texto: 'Reunir documentos de resposta', concluido: true, ordem: 2 },
            { texto: 'Redigir replica', concluido: false, ordem: 3 },
            { texto: 'Revisar e protocolar', concluido: false, ordem: 4 },
          ],
        },
      },
    }),
    prisma.tarefa.create({
      data: {
        workspaceId: workspace.id,
        titulo: 'Revisar peticao inicial',
        descricao: 'Revisar peticao inicial antes do protocolo',
        status: 'A_FAZER',
        prioridade: 'URGENTE',
        dataLimite: new Date('2025-01-05'),
        processoId: processos[1].id,
        responsavelId: advogado2.id,
        criadorId: advogado2.id,
        etiquetas: ['revisao', 'peticao'],
      },
    }),
    prisma.tarefa.create({
      data: {
        workspaceId: workspace.id,
        titulo: 'Pesquisa de bens do devedor',
        descricao: 'Realizar pesquisa patrimonial completa do devedor para penhora',
        status: 'A_FAZER',
        prioridade: 'MEDIA',
        dataLimite: new Date('2025-01-15'),
        processoId: processos[2].id,
        responsavelId: estagiario.id,
        criadorId: advogado1.id,
        etiquetas: ['pesquisa', 'execucao'],
        checklist: {
          create: [
            { texto: 'Consultar SISBAJUD', concluido: false, ordem: 1 },
            { texto: 'Consultar RENAJUD', concluido: false, ordem: 2 },
            { texto: 'Consultar Cartorio de Imoveis', concluido: false, ordem: 3 },
          ],
        },
      },
    }),
    prisma.tarefa.create({
      data: {
        workspaceId: workspace.id,
        titulo: 'Preparar documentos para audiencia',
        descricao: 'Separar e organizar todos os documentos necessarios para a audiencia de conciliacao',
        status: 'A_FAZER',
        prioridade: 'ALTA',
        dataLimite: new Date('2025-01-18'),
        processoId: processos[0].id,
        responsavelId: estagiario.id,
        criadorId: advogado1.id,
        etiquetas: ['audiencia', 'documentos'],
      },
    }),
  ]);

  // Automacoes
  await prisma.automacao.create({
    data: {
      workspaceId: workspace.id,
      nome: 'Notificacao de Prazos',
      tipo: 'NOTIFICACAO_PRAZO',
      descricao: 'Envia notificacao automatica 3 dias antes do vencimento de prazos',
      status: 'ATIVA',
      configuracao: { diasAntecedencia: 3, canais: ['email', 'sistema'] },
    },
  });

  console.log('   Dados complementares criados com sucesso!');
  console.log('');

  // Criar Legislacao
  console.log('[8/8] Criando base de legislacao...');
  
  // Codigo Civil
  const codigoCivil = await prisma.legislacao.create({
    data: {
      codigo: 'CC',
      nome: 'Codigo Civil Brasileiro',
      descricao: 'Lei no 10.406, de 10 de janeiro de 2002 - Institui o Codigo Civil.',
      dataPublicacao: new Date('2002-01-10'),
      vigente: true,
    },
  });

  // Codigo de Processo Civil
  const cpc = await prisma.legislacao.create({
    data: {
      codigo: 'CPC',
      nome: 'Codigo de Processo Civil',
      descricao: 'Lei no 13.105, de 16 de marco de 2015 - Codigo de Processo Civil.',
      dataPublicacao: new Date('2015-03-16'),
      vigente: true,
    },
  });

  // Inserir artigos do Codigo Civil
  for (const artigo of ARTIGOS_CODIGO_CIVIL) {
    await prisma.artigoLei.create({
      data: {
        legislacaoId: codigoCivil.id,
        numeroArtigo: artigo.numero,
        livro: artigo.livro,
        titulo: artigo.titulo,
        capitulo: artigo.capitulo || null,
        texto: artigo.texto,
        caput: artigo.texto,
        vigente: true,
      },
    });
  }

  // Inserir artigos do CPC
  for (const artigo of ARTIGOS_CPC) {
    await prisma.artigoLei.create({
      data: {
        legislacaoId: cpc.id,
        numeroArtigo: artigo.numero,
        livro: artigo.livro,
        titulo: artigo.titulo,
        capitulo: artigo.capitulo || null,
        texto: artigo.texto,
        caput: artigo.texto,
        vigente: true,
      },
    });
  }

  console.log(`   ${ARTIGOS_CODIGO_CIVIL.length} artigos do Codigo Civil inseridos`);
  console.log(`   ${ARTIGOS_CPC.length} artigos do CPC inseridos`);
  console.log('');

  // Configuracao Fiscal
  await prisma.configuracaoFiscal.create({
    data: {
      ano: 2024,
      regime: 'LUCRO_PRESUMIDO',
      aliquotaISS: 5.0,
      aliquotaIRPJ: 15.0,
      aliquotaCSLL: 9.0,
      faixasIRPF: {
        faixas: [
          { ate: 2259.20, aliquota: 0, deducao: 0 },
          { ate: 2826.65, aliquota: 7.5, deducao: 169.44 },
          { ate: 3751.05, aliquota: 15, deducao: 381.44 },
          { ate: 4664.68, aliquota: 22.5, deducao: 662.77 },
          { ate: Infinity, aliquota: 27.5, deducao: 896.00 },
        ],
      },
    },
  });

  // Configuracao de IA
  await prisma.configuracaoIA.create({
    data: {
      workspaceId: workspace.id,
      modeloPrincipal: 'gpt-4o',
      modeloEmbedding: 'text-embedding-3-small',
      temperatura: 0.3,
      maxTokens: 4000,
      limiteUsoDiario: 1000,
      usoHoje: 0,
    },
  });

  console.log('='.repeat(60));
  console.log('SEED CONCLUIDO COM SUCESSO!');
  console.log('='.repeat(60));
  console.log('');
  console.log('Resumo:');
  console.log(`  - 1 Workspace`);
  console.log(`  - ${usuarios.length} Usuarios`);
  console.log(`  - ${clientes.length} Clientes`);
  console.log(`  - ${processos.length} Processos`);
  console.log(`  - ${ARTIGOS_CODIGO_CIVIL.length + ARTIGOS_CPC.length} Artigos de Legislacao`);
  console.log('');
  console.log('Credenciais de acesso:');
  console.log('  Email: admin@officebrain.com.br');
  console.log('  Senha: OfficeBrain@2024');
  console.log('');
}

main()
  .catch((e) => {
    console.error('Erro durante o seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
