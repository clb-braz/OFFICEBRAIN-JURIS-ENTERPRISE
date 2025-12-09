import { FileText, Bot, Wallet, CalendarCheck, Shield, MessageSquare } from 'lucide-react';

const features = [
  {
    icon: FileText,
    title: 'Gestão completa de processos',
    description: 'Linha do tempo, peças, tarefas, prazos automáticos e alertas multi-canal.',
  },
  {
    icon: CalendarCheck,
    title: 'Agenda e audiências',
    description: 'Calendário unificado, categorias, lembretes e integrações com notificações.',
  },
  {
    icon: Wallet,
    title: 'Financeiro jurídico',
    description: 'Honorários, entradas, saídas, impostos e dashboards claros para decisão.',
  },
  {
    icon: Bot,
    title: 'IA Jurídica com RAG',
    description: 'OCR + embeddings em pgvector para respostas contextualizadas e seguras.',
  },
  {
    icon: MessageSquare,
    title: 'Comunicação e CRM',
    description: 'Templates, disparos e acompanhamento de leads e clientes em um só lugar.',
  },
  {
    icon: Shield,
    title: 'Segurança e controle',
    description: 'Permissões, logs e execução em Docker isolado, pronto para produção.',
  },
];

export function FeaturesSection() {
  return (
    <section id="funcionalidades" className="bg-muted/40 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-3">
          <p className="text-sm font-semibold text-primary">Funcionalidades</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            Tudo que um escritório jurídico moderno precisa — em um só lugar.
          </h2>
          <p className="text-muted-foreground">
            Da captação de leads até a execução e o faturamento, o fluxo completo com IA e automação.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-border/60 bg-card/70 p-6 shadow-sm shadow-primary/5"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
                <feature.icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

