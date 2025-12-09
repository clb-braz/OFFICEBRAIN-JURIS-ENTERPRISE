'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Calendar, AlertTriangle, CheckCircle, Clock, ArrowLeft, 
  Filter, Search, Plus, Bell, BellOff
} from 'lucide-react';

const API_URL = 'http://localhost:3001/api';

export default function DeadlinesPage() {
  const [deadlines, setDeadlines] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: '',
    nivelAlerta: '',
    responsavelId: '',
  });
  const [view, setView] = useState<'list' | 'calendar'>('list');

  const fetchDeadlines = async () => {
    try {
      const params = new URLSearchParams();
      if (filters.status) params.append('status', filters.status);
      if (filters.nivelAlerta) params.append('nivelAlerta', filters.nivelAlerta);
      if (filters.responsavelId) params.append('responsavelId', filters.responsavelId);

      const res = await fetch(`${API_URL}/deadlines?${params}`);
      if (res.ok) {
        const data = await res.json();
        setDeadlines(data.data || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeadlines();
  }, [filters]);

  const getAlertColor = (nivel: string) => {
    switch (nivel) {
      case 'EMERGENCIAL': return 'bg-red-500/20 text-red-400 border-red-500/50';
      case 'CRITICO': return 'bg-orange-500/20 text-orange-400 border-orange-500/50';
      case 'URGENTE': return 'bg-amber-500/20 text-amber-400 border-amber-500/50';
      case 'ATENCAO': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      default: return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'CUMPRIDO': return 'bg-emerald-500/20 text-emerald-400';
      case 'PERDIDO': return 'bg-red-500/20 text-red-400';
      case 'PENDENTE': return 'bg-amber-500/20 text-amber-400';
      default: return 'bg-muted/50 text-muted-foreground';
    }
  };

  const getHoursRemaining = (dataLimite: string) => {
    const now = new Date();
    const limite = new Date(dataLimite);
    const diff = limite.getTime() - now.getTime();
    return Math.floor(diff / (1000 * 60 * 60));
  };

  return (
    <div className="min-h-screen bg-background p-4 lg:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Link href="/" className="p-2 rounded-lg hover:bg-muted transition-colors">
            <ArrowLeft className="w-5 h-5 text-muted-foreground" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-white">Prazos</h1>
            <p className="text-muted-foreground text-sm">Gestão completa de prazos processuais</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setView(view === 'list' ? 'calendar' : 'list')}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
          >
            {view === 'list' ? <Calendar className="w-5 h-5 text-muted-foreground" /> : <Clock className="w-5 h-5 text-muted-foreground" />}
          </button>
        </div>
      </div>

      {/* Filtros */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-6">
        <select
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          className="px-3 py-2 rounded-lg bg-card border border-border text-sm outline-none"
        >
          <option value="">Todos os Status</option>
          <option value="PENDENTE">Pendente</option>
          <option value="CUMPRIDO">Cumprido</option>
          <option value="PERDIDO">Perdido</option>
        </select>

        <select
          value={filters.nivelAlerta}
          onChange={(e) => setFilters({ ...filters, nivelAlerta: e.target.value })}
          className="px-3 py-2 rounded-lg bg-card border border-border text-sm outline-none"
        >
          <option value="">Todos os Níveis</option>
          <option value="EMERGENCIAL">Emergencial</option>
          <option value="CRITICO">Crítico</option>
          <option value="URGENTE">Urgente</option>
          <option value="ATENCAO">Atenção</option>
          <option value="NORMAL">Normal</option>
        </select>

        <input
          type="text"
          placeholder="Buscar..."
          className="px-3 py-2 rounded-lg bg-card border border-border text-sm outline-none"
        />

        <Link
          href="/deadlines/new"
          className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-sm font-medium transition-colors"
        >
          <Plus className="w-4 h-4" /> Novo Prazo
        </Link>
      </div>

      {/* Lista de Prazos */}
      {loading ? (
        <div className="text-center py-12 text-muted-foreground">Carregando...</div>
      ) : deadlines.length === 0 ? (
        <div className="text-center py-12">
          <Clock className="w-16 h-16 text-dark-700 mx-auto mb-4" />
          <p className="text-muted-foreground mb-2">Nenhum prazo encontrado</p>
        </div>
      ) : (
        <div className="space-y-3">
          {deadlines.map((deadline) => {
            const horasRestantes = getHoursRemaining(deadline.dataLimite);
            const isCritical = horasRestantes < 24;

            return (
              <div
                key={deadline.id}
                className={`bg-card rounded-xl p-4 border-2 ${getAlertColor(deadline.nivelAlerta)} transition-all hover:scale-[1.01]`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  <div className="flex items-center gap-3 flex-1">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${isCritical ? 'bg-red-500/20' : 'bg-blue-500/20'}`}>
                      {isCritical ? (
                        <AlertTriangle className="w-6 h-6 text-red-400" />
                      ) : (
                        <Clock className="w-6 h-6 text-blue-400" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-white">{deadline.descricao}</h3>
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${getStatusColor(deadline.status)}`}>
                          {deadline.status}
                        </span>
                        {deadline.criadoPorIA && (
                          <span className="px-2 py-0.5 rounded text-xs font-medium bg-purple-500/20 text-purple-400">
                            IA
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {deadline.processo?.numeroCnj} • {deadline.tipo}
                      </p>
                      {deadline.responsavel && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Responsável: {deadline.responsavel.nome}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <div className="text-right">
                      <p className={`text-lg font-bold ${isCritical ? 'text-red-400' : 'text-white'}`}>
                        {horasRestantes > 0 ? `${horasRestantes}h` : 'Vencido'}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(deadline.dataLimite).toLocaleDateString('pt-BR', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {deadline.status === 'PENDENTE' && (
                        <button className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium">
                          Marcar Cumprido
                        </button>
                      )}
                      <Link
                        href={`/deadlines/${deadline.id}`}
                        className="px-3 py-1 rounded-lg bg-muted hover:bg-muted/50 text-muted-foreground text-xs font-medium"
                      >
                        Detalhes
                      </Link>
                    </div>
                  </div>
                </div>

                {deadline.instrucoes && (
                  <div className="mt-3 pt-3 border-t border-border">
                    <p className="text-xs text-muted-foreground">
                      <strong>Instruções:</strong> {deadline.instrucoes}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

