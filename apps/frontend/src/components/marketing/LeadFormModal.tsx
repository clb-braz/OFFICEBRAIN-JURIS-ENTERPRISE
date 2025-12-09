'use client';

import { useState, useTransition } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { api } from '@/lib/api';

type LeadFormModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function LeadFormModal({ isOpen, onClose }: LeadFormModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [officeName, setOfficeName] = useState('');
  const [practiceAreas, setPracticeAreas] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = () => {
    setError(null);
    setSuccess(null);
    if (!name || !email) {
      setError('Nome e email são obrigatórios.');
      return;
    }

    const areas = practiceAreas
      ? practiceAreas.split(',').map((a) => a.trim()).filter(Boolean)
      : [];

    startTransition(async () => {
      try {
        await api.createPublicLead({
          name,
          email,
          phone,
          officeName,
          practiceAreas: areas,
          message,
        });
        setSuccess('Recebemos seus dados! Em breve entraremos em contato.');
        setName('');
        setEmail('');
        setPhone('');
        setOfficeName('');
        setPracticeAreas('');
        setMessage('');
      } catch (err: any) {
        console.error('Erro ao enviar lead:', err);
        setError(err?.message || 'Não foi possível enviar agora. Tente novamente em instantes.');
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Quer testar o OfficeBrain?</DialogTitle>
          <DialogDescription>
            Preencha os dados e nossa equipe entrará em contato para ativar sua conta trial.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          <div className="grid gap-2">
            <Label>Nome completo</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Seu nome" />
          </div>
          <div className="grid gap-2">
            <Label>Email</Label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="contato@..." />
          </div>
          <div className="grid gap-2">
            <Label>Telefone (opcional)</Label>
            <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(11) 99999-9999" />
          </div>
          <div className="grid gap-2">
            <Label>Nome do escritório</Label>
            <Input value={officeName} onChange={(e) => setOfficeName(e.target.value)} placeholder="Escritório XYZ" />
          </div>
          <div className="grid gap-2">
            <Label>Áreas de atuação (separadas por vírgula)</Label>
            <Input
              value={practiceAreas}
              onChange={(e) => setPracticeAreas(e.target.value)}
              placeholder="Trabalhista, Civil, Tributário..."
            />
          </div>
          <div className="grid gap-2">
            <Label>Mensagem (opcional)</Label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[90px] rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              placeholder="Conte rapidamente seus desafios atuais."
            />
          </div>

          {success && <p className="text-sm text-emerald-500">{success}</p>}
          {error && <p className="text-sm text-red-500">{error}</p>}

          <div className="flex justify-end gap-2 pt-1">
            <Button variant="ghost" onClick={onClose}>
              Fechar
            </Button>
            <Button onClick={handleSubmit} disabled={isPending}>
              {isPending ? 'Enviando...' : 'Enviar'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

