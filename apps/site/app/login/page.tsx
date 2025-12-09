'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    senha: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          senha: formData.senha,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        // Salvar token no localStorage
        if (data.access_token) {
          localStorage.setItem('token', data.access_token);
          localStorage.setItem('user', JSON.stringify(data.user));
        }
        // Redirecionar para o painel
        window.location.href = 'http://localhost:3001/app/dashboard';
      } else {
        const errorData = await response.json().catch(() => ({}));
        alert(errorData.message || 'E-mail ou senha incorretos. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      alert('Erro ao conectar com o servidor. Verifique se o backend está rodando em http://localhost:3001');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen flex items-center justify-center py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full">
            <div className="bg-card rounded-lg shadow-lg p-8 border border-border">
              <h1 className="text-2xl font-bold text-card-foreground mb-6 text-center">
                Entrar na Plataforma
              </h1>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="senha">Senha</Label>
                  <Input
                    id="senha"
                    type="password"
                    required
                    value={formData.senha}
                    onChange={(e) => setFormData(prev => ({ ...prev, senha: e.target.value }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                    Esqueci minha senha
                  </Link>
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Entrando...' : 'Entrar'}
                </Button>
                <div className="text-center">
                  <Link href="/register" className="text-sm text-primary hover:underline">
                    Criar nova conta
                  </Link>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">Ou</span>
                  </div>
                </div>
                <Button type="button" variant="outline" className="w-full">
                  Entrar com Google
                </Button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

