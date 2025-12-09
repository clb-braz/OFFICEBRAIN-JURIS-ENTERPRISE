type Props = {
  onOpenLeadModal: () => void;
};

const items = [
  {
    title: 'Escritórios empresariais',
    description: 'Carteira diversificada, múltiplos advogados e alta exigência de governança.',
  },
  {
    title: 'Boutiques especializadas',
    description: 'Fluxos enxutos, clientes premium e necessidade de rapidez em peças e prazos.',
  },
  {
    title: 'Departamentos jurídicos',
    description: 'Gestão centralizada de demandas, contratos e interação com áreas de negócio.',
  },
];

export function TargetAudienceSection({ onOpenLeadModal }: Props) {
  return (
    <section id="publico" className="bg-muted/30 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-3">
          <p className="text-sm font-semibold text-primary">Para quem é</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            Feito para escritórios que precisam de precisão, velocidade e controle.
          </h2>
          <p className="text-muted-foreground">
            Se perder prazo não é opção e você precisa de previsibilidade financeira, o OfficeBrain foi desenhado
            para o seu time.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-border/60 bg-card/70 p-6 shadow-sm shadow-primary/5"
            >
              <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <button
            onClick={onOpenLeadModal}
            className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 transition-colors"
          >
            Quero conhecer
          </button>
          <a
            href="#planos"
            className="inline-flex items-center justify-center rounded-lg border border-border px-4 py-2 text-sm font-semibold text-foreground hover:bg-muted transition-colors"
          >
            Ver planos
          </a>
        </div>
      </div>
    </section>
  );
}

