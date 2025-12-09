'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface PlanosModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PlanosModal({ open, onOpenChange }: PlanosModalProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nomeEscritorio: '',
    nomeAdvogado: '',
    email: '',
    telefone: '',
    areasDireito: [] as string[],
    processosMensais: '',
    tamanhoEquipe: '',
    sistemasAtuais: '',
    desafios: '',
  });

  const areasDireitoOptions = [
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/planos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        onOpenChange(false);
        router.push('/planos/confirmacao');
      }
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTelefoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length <= 11) {
      if (value.length <= 10) {
        value = value.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
      } else {
        value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
      }
      setFormData({ ...formData, telefone: value });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Conhecer Planos</DialogTitle>
          <DialogDescription>
            Preencha o formulário abaixo e nossa equipe entrará em contato com uma proposta personalizada.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nomeEscritorio">Nome do Escritório (se existir)</Label>
              <Input
                id="nomeEscritorio"
                value={formData.nomeEscritorio}
                onChange={(e) => setFormData({ ...formData, nomeEscritorio: e.target.value })}
                placeholder="Ex: Silva & Associados"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="nomeAdvogado">Nome do Advogado Responsável *</Label>
              <Input
                id="nomeAdvogado"
                required
                value={formData.nomeAdvogado}
                onChange={(e) => setFormData({ ...formData, nomeAdvogado: e.target.value })}
                placeholder="Nome completo"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Profissional *</Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="seu@email.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="telefone">Telefone *</Label>
              <Input
                id="telefone"
                type="tel"
                required
                value={formData.telefone}
                onChange={handleTelefoneChange}
                placeholder="(00) 00000-0000"
                maxLength={15}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="areasDireito">Áreas do Direito em que atua *</Label>
            <Select
              value={formData.areasDireito[0] || ''}
              onValueChange={(value) => {
                if (!formData.areasDireito.includes(value)) {
                  setFormData({
                    ...formData,
                    areasDireito: [...formData.areasDireito, value],
                  });
                }
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione as áreas" />
              </SelectTrigger>
              <SelectContent>
                {areasDireitoOptions.map((area) => (
                  <SelectItem key={area} value={area}>
                    {area}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {formData.areasDireito.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.areasDireito.map((area) => (
                  <span
                    key={area}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-accent/10 text-accent"
                  >
                    {area}
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          areasDireito: formData.areasDireito.filter((a) => a !== area),
                        })
                      }
                      className="ml-2 hover:text-accent-dark"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="processosMensais">Média de Processos Mensais *</Label>
              <Select
                value={formData.processosMensais}
                onValueChange={(value) =>
                  setFormData({ ...formData, processosMensais: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-10">1 a 10</SelectItem>
                  <SelectItem value="11-50">11 a 50</SelectItem>
                  <SelectItem value="51-100">51 a 100</SelectItem>
                  <SelectItem value="101-500">101 a 500</SelectItem>
                  <SelectItem value="500+">Mais de 500</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tamanhoEquipe">Tamanho da Equipe *</Label>
              <Select
                value={formData.tamanhoEquipe}
                onValueChange={(value) =>
                  setFormData({ ...formData, tamanhoEquipe: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 pessoa (autônomo)</SelectItem>
                  <SelectItem value="2-5">2 a 5 pessoas</SelectItem>
                  <SelectItem value="6-10">6 a 10 pessoas</SelectItem>
                  <SelectItem value="11-20">11 a 20 pessoas</SelectItem>
                  <SelectItem value="20+">Mais de 20 pessoas</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="sistemasAtuais">Sistemas que utiliza atualmente (opcional)</Label>
            <Input
              id="sistemasAtuais"
              value={formData.sistemasAtuais}
              onChange={(e) => setFormData({ ...formData, sistemasAtuais: e.target.value })}
              placeholder="Ex: Excel, sistema X, etc"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="desafios">Desafios principais hoje (opcional)</Label>
            <textarea
              id="desafios"
              rows={3}
              value={formData.desafios}
              onChange={(e) => setFormData({ ...formData, desafios: e.target.value })}
              className="flex w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              placeholder="Descreva brevemente os principais desafios do seu escritório"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
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

