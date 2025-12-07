'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { 
  Scale, ArrowLeft, Calendar, MapPin, Users, FileText, 
  Clock, AlertTriangle, Plus, ChevronRight, MessageSquare,
  BookOpen, Gavel, Search, Lightbulb, Send, Sparkles,
  FileCheck, History, DollarSign, Edit, Trash2
} from 'lucide-react';

const API_URL = 'http://localhost:3001/api';

// Base jurídica do Código Civil
const CODIGO_CIVIL_ARTIGOS = [
  { numero: 1, texto: 'Toda pessoa é capaz de direitos e deveres na ordem civil.', livro: 'Parte Geral', titulo: 'Das Pessoas Naturais' },
  { numero: 2, texto: 'A personalidade civil da pessoa começa do nascimento com vida; mas a lei põe a salvo, desde a concepção, os direitos do nascituro.', livro: 'Parte Geral', titulo: 'Das Pessoas Naturais' },
  { numero: 3, texto: 'São absolutamente incapazes de exercer pessoalmente os atos da vida civil os menores de 16 (dezesseis) anos.', livro: 'Parte Geral', titulo: 'Das Pessoas Naturais' },
  { numero: 186, texto: 'Aquele que, por ação ou omissão voluntária, negligência ou imprudência, violar direito e causar dano a outrem, ainda que exclusivamente moral, comete ato ilícito.', livro: 'Parte Geral', titulo: 'Dos Atos Ilícitos' },
  { numero: 187, texto: 'Também comete ato ilícito o titular de um direito que, ao exercê-lo, excede manifestamente os limites impostos pelo seu fim econômico ou social, pela boa-fé ou pelos bons costumes.', livro: 'Parte Geral', titulo: 'Dos Atos Ilícitos' },
  { numero: 389, texto: 'Não havendo fato ou omissão imputável ao devedor, não incorre este em mora.', livro: 'Parte Especial', titulo: 'Das Obrigações' },
  { numero: 394, texto: 'Considera-se em mora o devedor que não efetuar o pagamento e o credor que não quiser recebê-lo no tempo, lugar e forma que a lei ou a convenção estabelecer.', livro: 'Parte Especial', titulo: 'Das Obrigações' },
  { numero: 395, texto: 'Responde o devedor pelos prejuízos a que sua mora der causa, mais juros, atualização dos valores monetários segundo índices oficiais regularmente estabelecidos, e honorários de advogado.', livro: 'Parte Especial', titulo: 'Das Obrigações' },
  { numero: 421, texto: 'A liberdade contratual será exercida nos limites da função social do contrato.', livro: 'Parte Especial', titulo: 'Dos Contratos em Geral' },
  { numero: 422, texto: 'Os contratantes são obrigados a guardar, assim na conclusão do contrato, como em sua execução, os princípios de probidade e boa-fé.', livro: 'Parte Especial', titulo: 'Dos Contratos em Geral' },
  { numero: 927, texto: 'Aquele que, por ato ilícito (arts. 186 e 187), causar dano a outrem, fica obrigado a repará-lo.', livro: 'Parte Especial', titulo: 'Da Responsabilidade Civil' },
  { numero: 944, texto: 'A indenização mede-se pela extensão do dano.', livro: 'Parte Especial', titulo: 'Da Responsabilidade Civil' },
  { numero: 1228, texto: 'O proprietário tem a faculdade de usar, gozar e dispor da coisa, e o direito de reavê-la do poder de quem quer que injustamente a possua ou detenha.', livro: 'Parte Especial', titulo: 'Da Propriedade' },
];

// Base jurídica do CPC
const CPC_ARTIGOS = [
  { numero: 1, texto: 'O processo civil será ordenado, disciplinado e interpretado conforme os valores e as normas fundamentais estabelecidos na Constituição da República Federativa do Brasil.', livro: 'Parte Geral', titulo: 'Das Normas Fundamentais' },
  { numero: 4, texto: 'As partes têm o direito de obter em prazo razoável a solução integral do mérito, incluída a atividade satisfativa.', livro: 'Parte Geral', titulo: 'Das Normas Fundamentais' },
  { numero: 5, texto: 'Aquele que de qualquer forma participa do processo deve comportar-se de acordo com a boa-fé.', livro: 'Parte Geral', titulo: 'Das Normas Fundamentais' },
  { numero: 6, texto: 'Todos os sujeitos do processo devem cooperar entre si para que se obtenha, em tempo razoável, decisão de mérito justa e efetiva.', livro: 'Parte Geral', titulo: 'Das Normas Fundamentais' },
  { numero: 319, texto: 'A petição inicial indicará: I - o juízo a que é dirigida; II - os nomes, os prenomes, o estado civil, a existência de união estável, a profissão, o número de inscrição no Cadastro de Pessoas Físicas ou no Cadastro Nacional da Pessoa Jurídica, o endereço eletrônico, o domicílio e a residência do autor e do réu...', livro: 'Parte Especial', titulo: 'Do Procedimento Comum' },
  { numero: 330, texto: 'A petição inicial será indeferida quando: I - for inepta; II - a parte for manifestamente ilegítima; III - o autor carecer de interesse processual; IV - não atendidas as prescrições dos arts. 106 e 321.', livro: 'Parte Especial', titulo: 'Do Procedimento Comum' },
  { numero: 335, texto: 'O réu poderá oferecer contestação, por petição, no prazo de 15 (quinze) dias, cujo termo inicial será a data: I - da audiência de conciliação ou de mediação, ou da última sessão de conciliação, quando qualquer parte não comparecer ou, comparecendo, não houver autocomposição...', livro: 'Parte Especial', titulo: 'Da Contestação' },
  { numero: 373, texto: 'O ônus da prova incumbe: I - ao autor, quanto ao fato constitutivo de seu direito; II - ao réu, quanto à existência de fato impeditivo, modificativo ou extintivo do direito do autor.', livro: 'Parte Especial', titulo: 'Das Provas' },
  { numero: 485, texto: 'O juiz não resolverá o mérito quando: I - indeferir a petição inicial; II - o processo ficar parado durante mais de 1 (um) ano por negligência das partes...', livro: 'Parte Especial', titulo: 'Da Sentença e da Coisa Julgada' },
  { numero: 487, texto: 'Haverá resolução de mérito quando o juiz: I - acolher ou rejeitar o pedido formulado na ação ou na reconvenção; II - decidir, de ofício ou a requerimento, sobre a ocorrência de decadência ou prescrição; III - homologar: a) o reconhecimento da procedência do pedido formulado na ação ou na reconvenção...', livro: 'Parte Especial', titulo: 'Da Sentença e da Coisa Julgada' },
];

export default function ProcessDetailsPage() {
  const params = useParams();
  const id = params.id as string;
  
  const [processo, setProcesso] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('resumo');
  const [iaQuery, setIaQuery] = useState('');
  const [iaResponse, setIaResponse] = useState<any>(null);
  const [iaLoading, setIaLoading] = useState(false);
  const [searchLaw, setSearchLaw] = useState('');
  const [selectedLaw, setSelectedLaw] = useState<'cc' | 'cpc'>('cc');

  useEffect(() => {
    const fetchProcesso = async () => {
      try {
        const res = await fetch(`${API_URL}/processes/${id}`);
        if (res.ok) {
          setProcesso(await res.json());
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchProcesso();
  }, [id]);

  const handleIAConsulta = async () => {
    if (!iaQuery.trim()) return;
    setIaLoading(true);
    
    // Simulação de resposta da IA com base jurídica
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const artigosRelevantes = [...CODIGO_CIVIL_ARTIGOS, ...CPC_ARTIGOS]
      .filter(a => 
        a.texto.toLowerCase().includes(iaQuery.toLowerCase()) ||
        a.titulo.toLowerCase().includes(iaQuery.toLowerCase())
      )
      .slice(0, 5);

    setIaResponse({
      resposta: `Com base na análise do processo e na legislação vigente, identificamos os seguintes fundamentos jurídicos relevantes para a questão "${iaQuery}":

${artigosRelevantes.length > 0 ? `
Os artigos mais relevantes para este caso são:
${artigosRelevantes.map(a => `• Art. ${a.numero} - ${a.texto.substring(0, 100)}...`).join('\n')}
` : 'Não foram encontrados artigos específicos para esta consulta. Recomenda-se análise mais detalhada.'}

Recomendação: Considerar a jurisprudência dos tribunais superiores sobre o tema e verificar precedentes similares.`,
      artigos: artigosRelevantes,
      timestamp: new Date().toISOString(),
    });
    
    setIaLoading(false);
  };

  const filteredArtigos = (selectedLaw === 'cc' ? CODIGO_CIVIL_ARTIGOS : CPC_ARTIGOS)
    .filter(a => 
      !searchLaw || 
      a.texto.toLowerCase().includes(searchLaw.toLowerCase()) ||
      a.numero.toString().includes(searchLaw)
    );

  const statusColors: Record<string, string> = {
    ATIVO: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    ARQUIVADO: 'bg-dark-600 text-dark-300 border-dark-500',
    SUSPENSO: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    RECURSO: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    BAIXADO: 'bg-dark-700 text-dark-400 border-dark-600',
  };

  const tabs = [
    { id: 'resumo', label: 'Resumo', icon: FileText },
    { id: 'partes', label: 'Partes', icon: Users },
    { id: 'andamentos', label: 'Andamentos', icon: History },
    { id: 'documentos', label: 'Documentos', icon: FileCheck },
    { id: 'financeiro', label: 'Financeiro', icon: DollarSign },
    { id: 'ia', label: 'Assistente IA', icon: Sparkles },
    { id: 'legislacao', label: 'Base Jurídica', icon: BookOpen },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-950 flex items-center justify-center">
        <div className="text-dark-400">Carregando...</div>
      </div>
    );
  }

  if (!processo) {
    return (
      <div className="min-h-screen bg-dark-950 flex items-center justify-center">
        <div className="text-center">
          <Scale className="w-16 h-16 text-dark-700 mx-auto mb-4" />
          <p className="text-dark-400">Processo não encontrado</p>
          <Link href="/processes" className="text-blue-400 hover:underline text-sm mt-2 inline-block">
            Voltar para lista
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-950 p-4 lg:p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-start gap-3">
          <Link href="/processes" className="p-2 rounded-lg hover:bg-dark-800 transition-colors mt-1">
            <ArrowLeft className="w-5 h-5 text-dark-400" />
          </Link>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-xl font-bold text-white">{processo.tipoAcao}</h1>
              <span className={`px-2.5 py-1 rounded-lg text-xs font-medium border ${statusColors[processo.status] || 'bg-dark-700 text-dark-300 border-dark-600'}`}>
                {processo.status}
              </span>
            </div>
            <p className="text-dark-400 font-mono text-sm">{processo.numeroCnj}</p>
            {processo.vara && (
              <p className="text-dark-500 text-sm flex items-center gap-1 mt-1">
                <MapPin className="w-3.5 h-3.5" />
                {processo.vara} • {processo.comarca}/{processo.uf}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-lg hover:bg-dark-800 transition-colors">
            <Edit className="w-5 h-5 text-dark-400" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 overflow-x-auto pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white'
                : 'bg-dark-900 text-dark-300 hover:bg-dark-800'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Conteúdo das Tabs */}
      <div className="bg-dark-900 rounded-xl border border-dark-800 p-6">
        {/* Resumo */}
        {activeTab === 'resumo' && (
          <div className="space-y-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-dark-800 rounded-lg p-4">
                <p className="text-dark-400 text-sm mb-1">Área</p>
                <p className="text-white font-medium">{processo.area}</p>
              </div>
              <div className="bg-dark-800 rounded-lg p-4">
                <p className="text-dark-400 text-sm mb-1">Fase</p>
                <p className="text-white font-medium">{processo.fase}</p>
              </div>
              <div className="bg-dark-800 rounded-lg p-4">
                <p className="text-dark-400 text-sm mb-1">Valor da Causa</p>
                <p className="text-emerald-400 font-medium">
                  {processo.valorCausa ? `R$ ${Number(processo.valorCausa).toLocaleString('pt-BR')}` : '-'}
                </p>
              </div>
              <div className="bg-dark-800 rounded-lg p-4">
                <p className="text-dark-400 text-sm mb-1">Cadastrado em</p>
                <p className="text-white font-medium">
                  {new Date(processo.createdAt).toLocaleDateString('pt-BR')}
                </p>
              </div>
            </div>

            {processo.objeto && (
              <div>
                <h3 className="text-sm font-medium text-dark-300 mb-2">Objeto da Ação</h3>
                <p className="text-white bg-dark-800 rounded-lg p-4">{processo.objeto}</p>
              </div>
            )}
          </div>
        )}

        {/* Partes */}
        {activeTab === 'partes' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-white">Partes do Processo</h3>
              <button className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-sm">
                <Plus className="w-4 h-4" /> Adicionar Parte
              </button>
            </div>
            
            {processo.partes?.length > 0 ? (
              processo.partes.map((parte: any) => (
                <div key={parte.id} className="bg-dark-800 rounded-lg p-4 flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">{parte.nome}</p>
                    <p className="text-sm text-dark-400">{parte.tipo} • {parte.cpfCnpj}</p>
                  </div>
                  <span className="px-2 py-1 bg-dark-700 rounded text-xs text-dark-300">
                    {parte.participacao}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-dark-400 text-center py-8">Nenhuma parte cadastrada</p>
            )}
          </div>
        )}

        {/* Andamentos */}
        {activeTab === 'andamentos' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-white">Histórico de Andamentos</h3>
              <button className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-sm">
                <Plus className="w-4 h-4" /> Novo Andamento
              </button>
            </div>

            {processo.andamentos?.length > 0 ? (
              <div className="space-y-3">
                {processo.andamentos.map((and: any) => (
                  <div key={and.id} className="bg-dark-800 rounded-lg p-4 border-l-2 border-blue-500">
                    <div className="flex items-center gap-2 text-sm text-dark-400 mb-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(and.data).toLocaleDateString('pt-BR')}
                    </div>
                    <p className="text-white">{and.descricao}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-dark-400 text-center py-8">Nenhum andamento registrado</p>
            )}
          </div>
        )}

        {/* Documentos */}
        {activeTab === 'documentos' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-white">Documentos do Processo</h3>
              <button className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-sm">
                <Plus className="w-4 h-4" /> Anexar Documento
              </button>
            </div>

            {processo.documentos?.length > 0 ? (
              <div className="space-y-2">
                {processo.documentos.map((doc: any) => (
                  <div key={doc.id} className="bg-dark-800 rounded-lg p-3 flex items-center gap-3">
                    <FileText className="w-5 h-5 text-blue-400" />
                    <div className="flex-1">
                      <p className="text-white text-sm">{doc.titulo}</p>
                      <p className="text-xs text-dark-400">{doc.categoria}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-dark-400 text-center py-8">Nenhum documento anexado</p>
            )}
          </div>
        )}

        {/* Financeiro */}
        {activeTab === 'financeiro' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-white">Honorários e Custas</h3>
              <button className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-sm">
                <Plus className="w-4 h-4" /> Novo Lançamento
              </button>
            </div>

            {processo.honorarios?.length > 0 ? (
              <div className="space-y-2">
                {processo.honorarios.map((hon: any) => (
                  <div key={hon.id} className="bg-dark-800 rounded-lg p-4 flex items-center justify-between">
                    <div>
                      <p className="text-white">{hon.descricao}</p>
                      <p className="text-sm text-dark-400">{hon.tipo}</p>
                    </div>
                    <p className="text-emerald-400 font-medium">
                      R$ {Number(hon.valor).toLocaleString('pt-BR')}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-dark-400 text-center py-8">Nenhum lançamento financeiro</p>
            )}
          </div>
        )}

        {/* Assistente IA */}
        {activeTab === 'ia' && (
          <div className="space-y-6">
            <div>
              <h3 className="font-medium text-white mb-2 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                Assistente Jurídico com IA
              </h3>
              <p className="text-sm text-dark-400">
                Faça perguntas sobre o processo e receba análises baseadas no Código Civil e CPC.
              </p>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={iaQuery}
                onChange={(e) => setIaQuery(e.target.value)}
                placeholder="Ex: Quais são os fundamentos para contestação?"
                className="flex-1 px-4 py-3 rounded-lg bg-dark-800 border border-dark-700 text-sm outline-none focus:border-blue-500"
                onKeyDown={(e) => e.key === 'Enter' && handleIAConsulta()}
              />
              <button
                onClick={handleIAConsulta}
                disabled={iaLoading || !iaQuery.trim()}
                className="px-4 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors disabled:opacity-50"
              >
                {iaLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </button>
            </div>

            {iaResponse && (
              <div className="bg-dark-800 rounded-lg p-4 border border-dark-700">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                    <Lightbulb className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white whitespace-pre-line">{iaResponse.resposta}</p>
                  </div>
                </div>

                {iaResponse.artigos?.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-dark-700">
                    <p className="text-sm text-dark-400 mb-2">Artigos relacionados:</p>
                    <div className="space-y-2">
                      {iaResponse.artigos.map((art: any) => (
                        <div key={art.numero} className="bg-dark-900 rounded-lg p-3 text-sm">
                          <p className="text-blue-400 font-medium mb-1">Art. {art.numero}</p>
                          <p className="text-dark-300">{art.texto}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Base Jurídica */}
        {activeTab === 'legislacao' && (
          <div className="space-y-6">
            <div>
              <h3 className="font-medium text-white mb-2 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-400" />
                Base Jurídica - Legislação Brasileira
              </h3>
              <p className="text-sm text-dark-400">
                Consulte os artigos do Código Civil e do Código de Processo Civil relevantes para este processo.
              </p>
            </div>

            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setSelectedLaw('cc')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedLaw === 'cc' ? 'bg-blue-600 text-white' : 'bg-dark-800 text-dark-300 hover:bg-dark-700'
                }`}
              >
                Código Civil
              </button>
              <button
                onClick={() => setSelectedLaw('cpc')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedLaw === 'cpc' ? 'bg-blue-600 text-white' : 'bg-dark-800 text-dark-300 hover:bg-dark-700'
                }`}
              >
                Código de Processo Civil
              </button>
            </div>

            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-500" />
              <input
                type="text"
                value={searchLaw}
                onChange={(e) => setSearchLaw(e.target.value)}
                placeholder="Buscar por número do artigo ou palavra-chave..."
                className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-dark-800 border border-dark-700 text-sm outline-none focus:border-blue-500"
              />
            </div>

            <div className="space-y-3 max-h-[500px] overflow-y-auto">
              {filteredArtigos.map((artigo) => (
                <div key={artigo.numero} className="bg-dark-800 rounded-lg p-4 border border-dark-700 hover:border-dark-600 transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded text-xs font-medium">
                          Art. {artigo.numero}
                        </span>
                        <span className="text-xs text-dark-500">{artigo.livro}</span>
                      </div>
                      <p className="text-white text-sm leading-relaxed">{artigo.texto}</p>
                      <p className="text-xs text-dark-500 mt-2">{artigo.titulo}</p>
                    </div>
                  </div>
                </div>
              ))}

              {filteredArtigos.length === 0 && (
                <p className="text-dark-400 text-center py-8">Nenhum artigo encontrado</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

