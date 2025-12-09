import { Brain, ScanText, Search, Sparkles } from 'lucide-react';

const points = [
  'RAG com pgvector alimentado pelos seus documentos e jurisprudências.',
  'OCR automático para PDFs e imagens com Tesseract.',
  'Resumos de peças, extração de dados e sugestões de argumentos.',
  'Busca semântica instantânea em todo o acervo.',
];

export function AISection() {
  return (
    <section id="ia" className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div className="space-y-4">
          <p className="text-sm font-semibold text-primary">IA Jurídica</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            IA treinada no seu acervo, com contexto real de cada processo.
          </h2>
          <p className="text-muted-foreground">
            Do OCR ao embedding, cada documento é indexado para responder com precisão e segurança, evitando
            alucinações e mantendo o sigilo.
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-2">
                <Sparkles className="h-4 w-4 text-primary mt-0.5" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-border/60 bg-card/70 p-6 shadow-lg shadow-primary/10 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <Brain className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Assistente IA</p>
                <p className="font-semibold text-foreground">Pronto para responder</p>
              </div>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-500">
              Online
            </div>
          </div>

          <div className="rounded-xl border border-border/60 bg-muted/60 p-4 space-y-3">
            <div className="flex items-center gap-2 rounded-lg bg-background px-3 py-2 text-sm text-muted-foreground border border-border/70">
              <Search className="h-4 w-4 text-primary" />
              Busque jurisprudência sobre danos morais em contratos de consumo.
            </div>
            <div className="rounded-lg bg-primary/10 p-4 text-sm text-foreground">
              ✓ Encontrei 3 acórdãos relevantes. A tese dominante indica responsabilidade objetiva do fornecedor e
              necessidade de prova do dano. Sugiro citar o REsp 123456/RS e reforçar o prazo prescricional de 5 anos
              (CDC, art. 27).
            </div>
            <div className="rounded-lg bg-background border border-border/70 p-4 text-sm text-muted-foreground flex items-start gap-3">
              <ScanText className="h-4 w-4 text-primary mt-0.5" />
              <span>Documento PDF indexado com OCR e embedding em pgvector.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

