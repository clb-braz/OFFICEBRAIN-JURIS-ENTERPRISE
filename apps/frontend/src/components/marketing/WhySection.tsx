import { ShieldCheck, Timer, Sparkles } from 'lucide-react';

const items = [
  {
    icon: ShieldCheck,
    title: 'Sem risco de perder prazos',
    description: 'Alertas inteligentes, cálculo automático de prazos e linha do tempo única de cada processo.',
  },
  {
    icon: Timer,
    title: 'Automação de rotinas',
    description: 'Fluxos configurados para audiências, tarefas, documentos e comunicação com clientes.',
  },
  {
    icon: Sparkles,
    title: 'IA jurídica integrada',
    description: 'RAG com pgvector, OCR avançado e sugestões de peças baseadas no seu acervo.',
  },
];

export function WhySection() {
  return (
    <section id="beneficios" className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-3xl space-y-3">
        <p className="text-sm font-semibold text-primary">Por que OfficeBrain</p>
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
          Foco em resultado: mais velocidade, menos risco e dados na mão.
        </h2>
        <p className="text-muted-foreground">
          Reduza o trabalho manual, aumente a previsibilidade financeira e transforme a operação jurídica em uma
          máquina de produtividade.
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-border/60 bg-card/70 p-6 shadow-sm shadow-primary/5"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
              <item.icon className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

