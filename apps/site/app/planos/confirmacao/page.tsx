import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function ConfirmacaoPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen flex items-center justify-center py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <div className="flex justify-center">
              <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
              Obrigado!
            </h1>
            <p className="text-lg text-muted-foreground">
              Recebemos suas informações. Nossa equipe entrará em contato com uma proposta personalizada 
              de acordo com as necessidades do seu escritório.
            </p>
            <div className="pt-6">
              <Button asChild>
                <Link href="/">Voltar ao Início</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

