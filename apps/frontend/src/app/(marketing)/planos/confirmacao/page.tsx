import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function ConfirmacaoPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-12">
      <Card className="w-full max-w-md shadow-xl text-center">
        <CardHeader className="space-y-4">
          <div className="flex justify-center">
            <div className="h-16 w-16 rounded-full bg-emerald-100 flex items-center justify-center">
              <CheckCircle className="h-10 w-10 text-emerald-600" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Obrigado!</CardTitle>
          <CardDescription className="text-base">
            Recebemos suas informações.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-gray-600">
            Nossa equipe entrará em contato com uma proposta personalizada de acordo com as necessidades do seu escritório.
          </p>
          <div className="space-y-3">
            <Button asChild className="w-full">
              <Link href="/login">Acessar Plataforma</Link>
            </Button>
            <Button variant="outline" asChild className="w-full">
              <Link href="/">Voltar ao Início</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

