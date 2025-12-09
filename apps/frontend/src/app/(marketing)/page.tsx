'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, Check, Clock, DollarSign, Users, FileText, 
  Calendar, Scale, Brain, Settings, Shield, Zap, 
  TrendingUp, Target, BarChart3, Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlanosModal } from '@/components/PlanosModal';

export default function HomePage() {
  const [planosModalOpen, setPlanosModalOpen] = useState(false);

  const modulos = [
    {
      icon: Clock,
      title: 'Gestão de Prazos',
      description: 'Sistema automático de prazos processuais com alertas inteligentes e impossibilidade de perda de prazo.',
    },
    {
      icon: DollarSign,
      title: 'Financeiro Jurídico',
      description: 'Contabilidade automática, cálculo de honorários, impostos e relatórios financeiros completos.',
    },
    {
      icon: Users,
      title: 'CRM Jurídico',
      description: 'Gestão completa de clientes, leads, interações e histórico de relacionamento.',
    },
    {
      icon: Scale,
      title: 'Processos',
      description: 'Organização completa de processos, andamentos, documentos e movimentações.',
    },
    {
      icon: FileText,
      title: 'Documentos Inteligentes',
      description: 'Versionamento Git-like, OCR, extração de dados e geração automática de peças.',
    },
    {
      icon: Calendar,
      title: 'Agenda Profissional',
      description: 'Audiências, reuniões, visitas e eventos com lembretes automáticos e sincronização.',
    },
    {
      icon: Brain,
      title: 'IA Jurídica',
      description: 'Assistente jurídico com análise de processos, sugestões estratégicas e geração de conteúdo.',
    },
    {
      icon: Settings,
      title: 'Administração',
      description: 'Controle de permissões, logs, ranking de produtividade e gestão completa do escritório.',
    },
  ];

  const beneficios = [
    {
      icon: Shield,
      title: 'Organização Total',
      description: 'Tudo centralizado em uma única plataforma, sem necessidade de múltiplos sistemas.',
    },
    {
      icon: Zap,
      title: 'Menos Tarefas Repetitivas',
      description: 'Automação inteligente reduz trabalho manual e aumenta a produtividade da equipe.',
    },
    {
      icon: BarChart3,
      title: 'Visão Clara do Escritório',
      description: 'Dashboards executivos com métricas em tempo real e análises profundas.',
    },
    {
      icon: TrendingUp,
      title: 'Redução de Esforço Operacional',
      description: 'Foco no que realmente importa: a advocacia, não a administração.',
    },
    {
      icon: Target,
      title: 'Experiência Profissional para Clientes',
      description: 'Comunicação automatizada, transparência e agilidade no atendimento.',
    },
    {
      icon: Sparkles,
      title: 'Decisões Rápidas e Baseadas em Dados',
      description: 'Inteligência artificial fornece insights valiosos para tomada de decisão estratégica.',
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section id="inicio" className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50 pt-20 pb-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  OFFICEBRAIN JURIS{' '}
                  <span className="text-accent">ENTERPRISE™</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  A Plataforma Jurídica Inteligente para Escritórios que Priorizam Alto Desempenho e Controle.
                </p>
              </div>
              <p className="text-lg text-gray-600">
                Ferramentas modernas, automação avançada e gestão completa de clientes, prazos, processos, documentos, financeiro e inteligência artificial, reunidos em uma única plataforma.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link href="/login">
                    Começar Agora
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" onClick={() => setPlanosModalOpen(true)}>
                  Conhecer Planos
                </Button>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-accent to-accent-dark rounded-2xl transform rotate-3"></div>
                <div className="relative bg-white rounded-2xl shadow-2xl p-8 border border-gray-200">
                  <div className="space-y-4">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="grid grid-cols-3 gap-4 mt-6">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-gray-100 rounded-lg h-24"></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problema Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              O Desafio dos Escritórios Modernos
            </h2>
            <p className="text-lg text-gray-600">
              Escritórios de advocacia enfrentam diariamente desafios operacionais que consomem tempo e recursos: gestão manual de prazos, falta de visibilidade financeira, desorganização de documentos, dificuldade em acompanhar processos e comunicação ineficiente com clientes.
            </p>
          </div>
        </div>
      </section>

      {/* Solução Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                A Solução OfficeBrain
              </h2>
              <p className="text-lg text-gray-600">
                O OfficeBrain Juris Enterprise integra todas as necessidades do escritório em uma plataforma única e inteligente.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                'Prazos automáticos com alertas inteligentes',
                'Gestão financeira completa e automatizada',
                'CRM jurídico profissional',
                'IA avançada para análises e sugestões',
                'Documentos inteligentes com versionamento',
                'Agenda unificada e sincronizada',
                'Processos organizados e rastreáveis',
                'Mobile first para acesso em qualquer lugar',
              ].map((item, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <Check className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Módulos Section */}
      <section id="funcionalidades" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Módulos Principais
            </h2>
            <p className="text-lg text-gray-600">
              Uma plataforma completa com todas as ferramentas necessárias
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {modulos.map((modulo, index) => (
              <Card key={index} className="border-gray-200 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                    <modulo.icon className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle className="text-lg">{modulo.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {modulo.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefícios Section */}
      <section id="beneficios" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Benefícios
            </h2>
            <p className="text-lg text-gray-600">
              O que você ganha ao escolher o OfficeBrain
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {beneficios.map((beneficio, index) => (
              <Card key={index} className="border-gray-200">
                <CardHeader>
                  <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                    <beneficio.icon className="h-5 w-5 text-accent" />
                  </div>
                  <CardTitle className="text-xl">{beneficio.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{beneficio.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quem Pode Usar Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Quem Pode Usar
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: 'Advogados Autônomos',
                description: 'Ideal para profissionais que trabalham sozinhos e precisam de organização e automação.',
              },
              {
                title: 'Escritórios de Advocacia',
                description: 'Perfeito para escritórios de todos os tamanhos que buscam eficiência e controle total.',
              },
              {
                title: 'Departamentos Jurídicos',
                description: 'Solução completa para departamentos jurídicos corporativos que precisam de gestão avançada.',
              },
            ].map((item, index) => (
              <Card key={index} className="border-gray-200 text-center">
                <CardHeader>
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final Section */}
      <section id="planos" className="py-20 bg-gradient-to-br from-accent to-accent-dark text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold">
              Pronto para Transformar seu Escritório?
            </h2>
            <p className="text-lg text-white/90">
              A OfficeBrain Juris Enterprise foi desenvolvida para escritórios que buscam tecnologia, organização e eficiência em alto nível.
            </p>
            <p className="text-lg text-white/90">
              Nossa equipe está disponível para apresentar a plataforma e demonstrar como ela se adapta às necessidades de cada realidade jurídica.
            </p>
            <Button
              size="lg"
              variant="outline"
              className="bg-white text-accent hover:bg-gray-100"
              onClick={() => setPlanosModalOpen(true)}
            >
              Conhecer Planos
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contato" className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center">
                  <span className="text-white font-bold text-lg">OB</span>
                </div>
                <span className="font-bold text-xl text-white">OfficeBrain</span>
              </div>
              <p className="text-sm text-gray-400">
                Plataforma jurídica inteligente para escritórios modernos.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Produto</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/#funcionalidades" className="hover:text-white transition-colors">Funcionalidades</Link></li>
                <li><Link href="/#beneficios" className="hover:text-white transition-colors">Benefícios</Link></li>
                <li><Link href="/#planos" className="hover:text-white transition-colors">Planos</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Empresa</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/#contato" className="hover:text-white transition-colors">Contato</Link></li>
                <li><Link href="/login" className="hover:text-white transition-colors">Login</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="hover:text-white transition-colors">Termos de Uso</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Privacidade</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>© {new Date().getFullYear()} OfficeBrain Juris Enterprise. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      <PlanosModal open={planosModalOpen} onOpenChange={setPlanosModalOpen} />
    </>
  );
}

