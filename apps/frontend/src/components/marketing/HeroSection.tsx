'use client';

import { ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site';

type HeroSectionProps = {
  onOpenLeadModal: () => void;
};

export function HeroSection({ onOpenLeadModal }: HeroSectionProps) {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-background py-20"
    >
      <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.15),transparent_25%),radial-gradient(circle_at_80%_0%,rgba(14,165,233,0.2),transparent_25%)]" />
      <div className="container relative mx-auto grid gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            <Sparkles className="h-4 w-4" /> IA Jurídica + Gestão completa
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-foreground">
            A plataforma definitiva para escritórios jurídicos de alta performance
          </h1>
          <p className="text-lg text-muted-foreground">
            Unifique processos, clientes, documentos, finanças e IA jurídica em um único ambiente seguro,
            com automações inteligentes e foco absoluto em não perder prazos.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button size="lg" onClick={onOpenLeadModal} className="gap-2">
              Testar grátis <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#funcionalidades">Ver funcionalidades</a>
            </Button>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="inline-flex items-center gap-2 rounded-lg bg-muted px-3 py-2">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              Segurança nível enterprise
            </div>
            <div className="inline-flex items-center gap-2 rounded-lg bg-muted px-3 py-2">
              <Sparkles className="h-4 w-4 text-amber-400" />
              IA integrada (RAG + OCR)
            </div>
          </div>
        </div>

        <div className="relative rounded-2xl border border-border/70 bg-card p-6 shadow-2xl shadow-blue-600/10">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-blue-600 text-white font-semibold flex items-center justify-center">
                OB
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Workspace</p>
                <p className="font-semibold text-foreground">{siteConfig.name}</p>
              </div>
            </div>
            <div className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-500">
              Online
            </div>
          </div>

          <div className="grid gap-4">
            {[
              { title: 'Processos ativos', value: '428', trend: '+12 este mês' },
              { title: 'Prazos críticos', value: '7', trend: 'Ação imediata' },
              { title: 'Audiências hoje', value: '5', trend: '2 confirmadas' },
              { title: 'Financeiro a receber', value: 'R$ 245.890', trend: '+8% vs mês anterior' },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-border/80 bg-muted/60 px-4 py-3"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{item.title}</p>
                    <p className="text-xl font-semibold text-foreground">{item.value}</p>
                  </div>
                  <span className="text-xs text-blue-400">{item.trend}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

