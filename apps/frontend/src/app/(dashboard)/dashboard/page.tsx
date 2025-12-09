'use client';

import { useEffect, useState } from 'react';
import { 
  Clock, AlertTriangle, Calendar, DollarSign, 
  Users, Scale, FileText
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { api } from '@/lib/api';

type Stats = {
  clientes?: { total: number };
  processos?: { ativos: number };
  prazos?: { proximos: number };
  financeiro?: { honorariosPendentes: number };
};

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recentProcesses, setRecentProcesses] = useState<any[]>([]);
  const [deadlines, setDeadlines] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [statsRes, procs, prazos] = await Promise.allSettled([
          api.getDashboardStats(),
          api.getRecentProcesses(),
          api.getUpcomingDeadlines(),
        ]);
        if (statsRes.status === 'fulfilled') setStats(statsRes.value as Stats);
        if (procs.status === 'fulfilled') setRecentProcesses(procs.value as any[]);
        if (prazos.status === 'fulfilled') setDeadlines(prazos.value as any[]);
      } catch (e) {
        console.error('Erro ao carregar dashboard', e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const formatCurrency = (value?: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value || 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400 mt-1">Visão geral do escritório</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-navy border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Prazos Críticos</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {loading ? '-' : stats?.prazos?.proximos ?? 0}
            </div>
            <p className="text-xs text-gray-400 mt-1">Próximos 7 dias</p>
          </CardContent>
        </Card>

        <Card className="bg-navy border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Processos Ativos</CardTitle>
            <Scale className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {loading ? '-' : stats?.processos?.ativos ?? 0}
            </div>
            <p className="text-xs text-gray-400 mt-1">Atualizado em tempo real</p>
          </CardContent>
        </Card>

        <Card className="bg-navy border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Audiências Hoje</CardTitle>
            <Calendar className="h-4 w-4 text-amber-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {loading ? '-' : deadlines.filter((d) => d.tipo === 'AUDIENCIA').length}
            </div>
            <p className="text-xs text-gray-400 mt-1">Confirmadas</p>
          </CardContent>
        </Card>

        <Card className="bg-navy border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">A Receber</CardTitle>
            <DollarSign className="h-4 w-4 text-emerald-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {loading ? '-' : formatCurrency(stats?.financeiro?.honorariosPendentes)}
            </div>
            <p className="text-xs text-gray-400 mt-1">Fluxo previsto</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 bg-navy border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Processos Recentes</CardTitle>
            <CardDescription className="text-gray-400">Últimos movimentados</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {loading ? (
                <p className="text-gray-400">Carregando...</p>
              ) : recentProcesses.length === 0 ? (
                <p className="text-gray-400">Nenhum processo recente.</p>
              ) : (
                recentProcesses.slice(0, 5).map((p) => (
                  <div key={p.id} className="flex items-center justify-between rounded-lg border border-gray-800 bg-gray-900 px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                        <FileText className="h-5 w-5 text-blue-400" />
                      </div>
                      <div>
                        <p className="text-sm text-white font-medium">{p.tipoAcao || 'Processo'}</p>
                        <p className="text-xs text-gray-400">{p.numeroCnj}</p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-300">{p.status}</span>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-navy border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Prazos Próximos</CardTitle>
            <CardDescription className="text-gray-400">Em ordem de vencimento</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {loading ? (
                <p className="text-gray-400">Carregando...</p>
              ) : deadlines.length === 0 ? (
                <p className="text-gray-400">Nenhum prazo pendente.</p>
              ) : (
                deadlines.slice(0, 5).map((d) => (
                  <div key={d.id} className="flex items-center justify-between rounded-lg border border-gray-800 bg-gray-900 px-3 py-2">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-lg bg-blue-500/15 flex items-center justify-center">
                        <Clock className="h-4 w-4 text-blue-300" />
                      </div>
                      <div>
                        <p className="text-sm text-white font-medium">{d.descricao}</p>
                        <p className="text-xs text-gray-400">{new Date(d.dataLimite).toLocaleDateString('pt-BR')}</p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-300">{d.prioridade}</span>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

