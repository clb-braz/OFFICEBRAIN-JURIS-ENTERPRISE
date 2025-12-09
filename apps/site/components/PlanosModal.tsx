'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface PlanosModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AREAS_DIREITO = [
  'Civil',
  'Trabalhista',
  'Penal',
  'Família',
  'Tributário',
  'Consumidor',
  'Administrativo',
  'Previdenciário',
  'Empresarial',
];

const TAMANHOS_EQUIPE = [
  '1-5 pessoas',
  '6-10 pessoas',
  '11-20 pessoas',
  '21-50 pessoas',
  '50+ pessoas',
];

export function PlanosModal({ open, onOpenChange }: PlanosModalProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nomeEscritorio: '',
    nomeAdvogado: '',
    email: '',
    telefone: '',
    areasAtuacao: [] as string[],
    mediaNovosClientes: '',
    tamanhoEquipe: '',
    desafiosPrincipais: '',
    mensagem: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validações
    if (!formData.nomeEscritorio.trim()) {
      alert('Nome do escritório é obrigatório');
      return;
    }
    if (!formData.nomeAdvogado.trim()) {
      alert('Nome do advogado é obrigatório');
      return;
    }
    if (!formData.email.trim()) {
      alert('E-mail é obrigatório');
      return;
    }
    if (formData.areasAtuacao.length === 0) {
      alert('Selecione pelo menos uma área de atuação');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:3001/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nomeEscritorio: formData.nomeEscritorio,
          nomeAdvogado: formData.nomeAdvogado,
          email: formData.email,
          telefone: formData.telefone || null,
          areasAtuacao: formData.areasAtuacao,
          mediaNovosClientes: formData.mediaNovosClientes ? parseInt(formData.mediaNovosClientes) : null,
          tamanhoEquipe: formData.tamanhoEquipe || null,
          desafiosPrincipais: formData.desafiosPrincipais || null,
          mensagem: formData.mensagem || null,
          origem: 'SITE',
        }),
      });

      if (response.ok) {
        // Limpar formulário
        setFormData({
          nomeEscritorio: '',
          nomeAdvogado: '',
          email: '',
          telefone: '',
          areasAtuacao: [],
          mediaNovosClientes: '',
          tamanhoEquipe: '',
          desafiosPrincipais: '',
          mensagem: '',
        });
        onOpenChange(false);
        router.push('/planos/confirmacao');
      } else {
        const errorData = await response.json().catch(() => ({}));
        alert(errorData.message || 'Erro ao enviar formulário. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      alert('Erro ao conectar com o servidor. Verifique se o backend está rodando.');
    } finally {
      setLoading(false);
    }
  };

  const toggleArea = (area: string) => {
    setFormData(prev => ({
      ...prev,
      areasAtuacao: prev.areasAtuacao.includes(area)
        ? prev.areasAtuacao.filter(a => a !== area)
        : [...prev.areasAtuacao, area],
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Conhecer Planos</DialogTitle>
          <DialogDescription>
            Preencha o formulário abaixo e nossa equipe entrará em contato com uma proposta personalizada.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="nomeEscritorio">Nome do Escritório *</Label>
              <Input
                id="nomeEscritorio"
                required
                value={formData.nomeEscritorio}
                onChange={(e) => setFormData(prev => ({ ...prev, nomeEscritorio: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="nomeAdvogado">Nome do Advogado Responsável *</Label>
              <Input
                id="nomeAdvogado"
                required
                value={formData.nomeAdvogado}
                onChange={(e) => setFormData(prev => ({ ...prev, nomeAdvogado: e.target.value }))}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">E-mail Profissional *</Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="telefone">Telefone</Label>
              <Input
                id="telefone"
                type="tel"
                value={formData.telefone}
                onChange={(e) => setFormData(prev => ({ ...prev, telefone: e.target.value }))}
                placeholder="(00) 00000-0000"
              />
            </div>
          </div>

          <div>
            <Label>Áreas do Direito em que Atua *</Label>
            <div className="grid grid-cols-3 gap-2 mt-2">
              {AREAS_DIREITO.map(area => (
                <button
                  key={area}
                  type="button"
                  onClick={() => toggleArea(area)}
                  className={`p-2 rounded-md text-sm border transition-colors ${
                    formData.areasAtuacao.includes(area)
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-background border-border hover:border-primary'
                  }`}
                >
                  {area}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="mediaNovosClientes">Média de Novos Clientes/Mês</Label>
              <Input
                id="mediaNovosClientes"
                type="number"
                min="0"
                value={formData.mediaNovosClientes}
                onChange={(e) => setFormData(prev => ({ ...prev, mediaNovosClientes: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="tamanhoEquipe">Tamanho da Equipe</Label>
              <select
                id="tamanhoEquipe"
                value={formData.tamanhoEquipe}
                onChange={(e) => setFormData(prev => ({ ...prev, tamanhoEquipe: e.target.value }))}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="">Selecione...</option>
                {TAMANHOS_EQUIPE.map(tamanho => (
                  <option key={tamanho} value={tamanho}>{tamanho}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <Label htmlFor="desafiosPrincipais">Desafios Principais Hoje</Label>
            <textarea
              id="desafiosPrincipais"
              rows={3}
              value={formData.desafiosPrincipais}
              onChange={(e) => setFormData(prev => ({ ...prev, desafiosPrincipais: e.target.value }))}
              className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
          </div>

          <div>
            <Label htmlFor="mensagem">Mensagem (Opcional)</Label>
            <textarea
              id="mensagem"
              rows={3}
              value={formData.mensagem}
              onChange={(e) => setFormData(prev => ({ ...prev, mensagem: e.target.value }))}
              className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Fechar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Enviando...' : 'Enviar'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

