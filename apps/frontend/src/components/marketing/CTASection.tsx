import { ArrowRight } from 'lucide-react';

type Props = {
  onOpenLeadModal: () => void;
};

export function CTASection({ onOpenLeadModal }: Props) {
  return (
    <section id="planos" className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-r from-primary/15 via-primary/10 to-background shadow-lg shadow-primary/10">
        <div className="grid gap-8 p-8 md:grid-cols-[2fr,1fr] md:items-center">
          <div className="space-y-3">
            <p className="text-sm font-semibold text-primary">Pronto para testar?</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
              Implante o OfficeBrain e tenha controle total do jurídico em semanas.
            </h2>
            <p className="text-muted-foreground">
              Configuramos com você, importamos seus dados e treinamos seu time. Sem complicação.
            </p>
          </div>
          <div className="flex flex-col gap-3 md:items-end">
            <button
              onClick={onOpenLeadModal}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 transition-colors"
            >
              Falar com especialista <ArrowRight className="h-4 w-4" />
            </button>
            <span className="text-xs text-muted-foreground">
              Sem cartão de crédito • Suporte na ativação • Ambiente seguro
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

