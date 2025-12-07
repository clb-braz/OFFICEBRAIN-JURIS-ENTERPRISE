'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Wallet, Plus, ArrowLeft, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

const API_URL = 'http://localhost:3001/api';

export default function FinancePage() {
  const [dashboard, setDashboard] = useState<any>(null);
  const [honorarios, setHonorarios] = useState<any[]>([]);
  const [movimentacoes, setMovimentacoes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<'honorarios' | 'movimentacoes'>('honorarios');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dashRes, honRes, movRes] = await Promise.all([
          fetch(`${API_URL}/finance/dashboard`),
          fetch(`${API_URL}/finance/honorarios`),
          fetch(`${API_URL}/finance/movimentacoes`),
        ]);
        if (dashRes.ok) setDashboard(await dashRes.json());
        if (honRes.ok) setHonorarios((await honRes.json()).data || []);
        if (movRes.ok) setMovimentacoes((await movRes.json()).data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value || 0);

  return (
    <div className="min-h-screen bg-dark-950 p-4 lg:p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Link href="/" className="p-2 rounded-lg hover:bg-dark-800"><ArrowLeft className="w-5 h-5 text-dark-400" /></Link>
          <div>
            <h1 className="text-xl font-bold text-white">Financeiro</h1>
            <p className="text-dark-400 text-sm">Gestão de honorários e movimentações</p>
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-dark-900 rounded-xl p-4 border border-dark-800">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-amber-400" />
            </div>
          </div>
          <p className="text-xl font-bold text-white">{loading ? '-' : formatCurrency(dashboard?.honorariosPendentes)}</p>
          <p className="text-sm text-dark-400">Honorários Pendentes</p>
        </div>
        
        <div className="bg-dark-900 rounded-xl p-4 border border-dark-800">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
            </div>
          </div>
          <p className="text-xl font-bold text-white">{loading ? '-' : formatCurrency(dashboard?.receitas)}</p>
          <p className="text-sm text-dark-400">Receitas</p>
        </div>
        
        <div className="bg-dark-900 rounded-xl p-4 border border-dark-800">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
              <TrendingDown className="w-5 h-5 text-red-400" />
            </div>
          </div>
          <p className="text-xl font-bold text-white">{loading ? '-' : formatCurrency(dashboard?.despesas)}</p>
          <p className="text-sm text-dark-400">Despesas</p>
        </div>
        
        <div className="bg-dark-900 rounded-xl p-4 border border-dark-800">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <Wallet className="w-5 h-5 text-blue-400" />
            </div>
          </div>
          <p className={`text-xl font-bold ${(dashboard?.saldo || 0) >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
            {loading ? '-' : formatCurrency(dashboard?.saldo)}
          </p>
          <p className="text-sm text-dark-400">Saldo</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setTab('honorarios')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${tab === 'honorarios' ? 'bg-blue-600 text-white' : 'bg-dark-800 text-dark-300 hover:bg-dark-700'}`}
        >
          Honorários
        </button>
        <button
          onClick={() => setTab('movimentacoes')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${tab === 'movimentacoes' ? 'bg-blue-600 text-white' : 'bg-dark-800 text-dark-300 hover:bg-dark-700'}`}
        >
          Movimentações
        </button>
      </div>

      {/* Content */}
      <div className="bg-dark-900 rounded-xl border border-dark-800">
        {loading ? (
          <div className="text-center py-12 text-dark-400">Carregando...</div>
        ) : tab === 'honorarios' ? (
          honorarios.length === 0 ? (
            <div className="text-center py-12">
              <Wallet className="w-16 h-16 text-dark-700 mx-auto mb-4" />
              <p className="text-dark-400">Nenhum honorário cadastrado</p>
            </div>
          ) : (
            <div className="divide-y divide-dark-800">
              {honorarios.map((h) => (
                <div key={h.id} className="p-4 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-white">{h.descricao}</p>
                    <p className="text-sm text-dark-400">{h.cliente?.nome} • {h.tipo}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-white">{formatCurrency(Number(h.valor))}</p>
                    <span className={`text-xs px-2 py-0.5 rounded ${h.status === 'PAGO' ? 'bg-emerald-500/20 text-emerald-400' : h.status === 'PENDENTE' ? 'bg-amber-500/20 text-amber-400' : 'bg-dark-700 text-dark-300'}`}>
                      {h.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          movimentacoes.length === 0 ? (
            <div className="text-center py-12">
              <TrendingUp className="w-16 h-16 text-dark-700 mx-auto mb-4" />
              <p className="text-dark-400">Nenhuma movimentação cadastrada</p>
            </div>
          ) : (
            <div className="divide-y divide-dark-800">
              {movimentacoes.map((m) => (
                <div key={m.id} className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${m.tipo === 'RECEITA' ? 'bg-emerald-500/20' : 'bg-red-500/20'}`}>
                      {m.tipo === 'RECEITA' ? <TrendingUp className="w-5 h-5 text-emerald-400" /> : <TrendingDown className="w-5 h-5 text-red-400" />}
                    </div>
                    <div>
                      <p className="font-medium text-white">{m.descricao}</p>
                      <p className="text-sm text-dark-400">{new Date(m.data).toLocaleDateString('pt-BR')} • {m.categoria}</p>
                    </div>
                  </div>
                  <p className={`font-bold ${m.tipo === 'RECEITA' ? 'text-emerald-400' : 'text-red-400'}`}>
                    {m.tipo === 'RECEITA' ? '+' : '-'} {formatCurrency(Number(m.valor))}
                  </p>
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
}

