'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, Check, Clock, DollarSign, Users, FileText, 
  Calendar, Scale, Brain, Settings, Shield, Zap, 
  TrendingUp, Target, BarChart3, Sparkles, Building
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PlanosModal } from '@/components/PlanosModal';

export default function HomePage() {
  const [planosModalOpen, setPlanosModalOpen] = useState(false);

  // Listener para abrir modal do header
  useEffect(() => {
    const handleOpenModal = () => setPlanosModalOpen(true);
    window.addEventListener('openPlanosModal', handleOpenModal);
    return () => window.removeEventListener('openPlanosModal', handleOpenModal);
  }, []);

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
      <Header />
      <main>
        {/* Hero Section */}
        <section id="inicio" className="relative overflow-hidden pt-20 pb-32 min-h-[600px] flex items-center">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10 dark:opacity-5"
              style={{
                backgroundImage: 'url("/balance-scale.svg")',
              }}
            />
            <div className="absolute inset-0 bg-background/95 dark:bg-background/98" />
          </div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="space-y-8">
                <div className="space-y-6">
                  <div className="inline-block">
                    <span className="text-sm font-semibold text-primary px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                      PLATAFORMA JURÍDICA EMPRESARIAL
                    </span>
                  </div>
                  <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                    OFFICEBRAIN JURIS ENTERPRISE™
                  </h1>
                  <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                    A Plataforma Jurídica Inteligente para Escritórios que Priorizam Alto Desempenho e Controle.
                  </p>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Ferramentas modernas, automação avançada e gestão completa de clientes, prazos, processos, documentos, financeiro e inteligência artificial, reunidos em uma única plataforma.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
            </div>
          </div>
        </section>

        {/* O Problema */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
                O Desafio dos Escritórios Modernos
              </h2>
              <p className="text-lg text-muted-foreground">
                Escritórios de advocacia enfrentam desafios diários: gestão de prazos complexa, controle financeiro manual, 
                falta de organização processual e dificuldade em acompanhar múltiplos clientes simultaneamente.
              </p>
            </div>
          </div>
        </section>

        {/* A Solução */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
                A Solução OfficeBrain
              </h2>
              <p className="text-lg text-muted-foreground">
                Integramos prazos automáticos, gestão financeira, CRM jurídico, IA avançada, documentos inteligentes, 
                agenda unificada e processos organizados em uma plataforma única, moderna e segura.
              </p>
            </div>
          </div>
        </section>

        {/* Módulos Principais */}
        <section id="funcionalidades" className="py-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Módulos Principais
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Funcionalidades completas para transformar a gestão do seu escritório
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {modulos.map((modulo, index) => {
                const Icon = modulo.icon;
                return (
                  <div
                    key={index}
                    className="p-6 rounded-xl border border-border bg-card hover:shadow-lg transition-shadow"
                  >
                    <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-card-foreground mb-2">{modulo.title}</h3>
                    <p className="text-sm text-muted-foreground">{modulo.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Benefícios */}
        <section id="beneficios" className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Benefícios
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {beneficios.map((beneficio, index) => {
                const Icon = beneficio.icon;
                return (
                  <div
                    key={index}
                    className="p-6 rounded-xl bg-card border border-border"
                  >
                    <Icon className="h-8 w-8 text-primary mb-4" />
                    <h3 className="text-lg font-semibold text-card-foreground mb-2">{beneficio.title}</h3>
                    <p className="text-sm text-muted-foreground">{beneficio.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Quem Pode Usar */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Quem Pode Usar
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center p-6">
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">Advogados Autônomos</h3>
                <p className="text-muted-foreground">Gestão completa para profissionais independentes</p>
              </div>
              <div className="text-center p-6">
                <Scale className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">Escritórios de Advocacia</h3>
                <p className="text-muted-foreground">Solução corporativa para equipes de qualquer tamanho</p>
              </div>
              <div className="text-center p-6">
                <Building className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">Departamentos Jurídicos</h3>
                <p className="text-muted-foreground">Gestão jurídica para empresas e organizações</p>
              </div>
            </div>
          </div>
        </section>

        {/* Chamada Final */}
        <section className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: 'url("/balance-scale.svg")',
              }}
            />
          </div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Pronto para Transformar seu Escritório?
            </h2>
            <p className="text-xl mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
              A OfficeBrain Juris Enterprise foi desenvolvida para escritórios que buscam tecnologia, organização e eficiência em alto nível.
            </p>
            <Button size="lg" variant="secondary" onClick={() => setPlanosModalOpen(true)}>
              Conhecer Planos
            </Button>
          </div>
        </section>
      </main>
      <Footer />
      <PlanosModal open={planosModalOpen} onOpenChange={setPlanosModalOpen} />
    </>
  );
}

