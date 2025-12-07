'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, Users, Scale, FileText, Wallet, 
  ListTodo, Settings, Menu, X, Bell, Search, ChevronRight,
  Clock, AlertTriangle, CheckCircle, Plus
} from 'lucide-react';

const API_URL = 'http://localhost:3001/api';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Clientes', href: '/clients', icon: Users },
  { name: 'Processos', href: '/processes', icon: Scale },
  { name: 'Tarefas', href: '/tasks', icon: ListTodo },
  { name: 'Financeiro', href: '/finance', icon: Wallet },
  { name: 'Documentos', href: '/documents', icon: FileText },
  { name: 'Configurações', href: '/settings', icon: Settings },
];

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState<any>(null);
  const [recentProcesses, setRecentProcesses] = useState<any[]>([]);
  const [deadlines, setDeadlines] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, processesRes, deadlinesRes] = await Promise.all([
          fetch(`${API_URL}/dashboard/stats`),
          fetch(`${API_URL}/dashboard/recent-processes`),
          fetch(`${API_URL}/dashboard/upcoming-deadlines`),
        ]);
        
        if (statsRes.ok) setStats(await statsRes.json());
        if (processesRes.ok) setRecentProcesses(await processesRes.json());
        if (deadlinesRes.ok) setDeadlines(await deadlinesRes.json());
      } catch (err) {
        console.error('Erro ao carregar dashboard:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const formatCurrency = (value: number) => 
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value || 0);

  return (
    <div className="min-h-screen flex bg-dark-950">
      {/* Overlay mobile */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}
      
      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-dark-900 border-r border-dark-800 transform transition-transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="h-full flex flex-col">
          <div className="p-4 border-b border-dark-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
                <Scale className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">OfficeBrain</h1>
                <p className="text-xs text-dark-400">Juris Enterprise</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 p-3 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-dark-300 hover:text-white hover:bg-dark-800 transition-all ${item.href === '/' ? 'bg-dark-800 text-white' : ''}`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col min-h-screen">
        <header className="sticky top-0 z-30 bg-dark-900/80 backdrop-blur border-b border-dark-800">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2 rounded-lg hover:bg-dark-800">
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-500" />
                <input type="text" placeholder="Buscar..." className="w-64 pl-9 pr-3 py-2 rounded-lg bg-dark-800 border border-dark-700 text-sm focus:border-blue-500 outline-none" />
              </div>
            </div>
            <button className="p-2 rounded-lg hover:bg-dark-800 relative">
              <Bell className="w-5 h-5 text-dark-400" />
            </button>
          </div>
        </header>

        <div className="flex-1 p-4 lg:p-6 space-y-6 overflow-auto">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white">Dashboard</h2>
              <p className="text-dark-400 text-sm">Visão geral do escritório</p>
            </div>
            <Link href="/clients" className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-sm font-medium transition-colors">
              <Plus className="w-4 h-4" /> Novo Cliente
            </Link>
          </div>

          {/* Cards de Estatísticas */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-dark-900 rounded-xl p-4 border border-dark-800">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-400" />
                </div>
              </div>
              <p className="text-2xl font-bold text-white">{loading ? '-' : stats?.clientes?.total || 0}</p>
              <p className="text-sm text-dark-400">Clientes</p>
            </div>
            
            <div className="bg-dark-900 rounded-xl p-4 border border-dark-800">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                  <Scale className="w-5 h-5 text-emerald-400" />
                </div>
              </div>
              <p className="text-2xl font-bold text-white">{loading ? '-' : stats?.processos?.ativos || 0}</p>
              <p className="text-sm text-dark-400">Processos Ativos</p>
            </div>
            
            <div className="bg-dark-900 rounded-xl p-4 border border-dark-800">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
                  <Wallet className="w-5 h-5 text-amber-400" />
                </div>
              </div>
              <p className="text-2xl font-bold text-white">{loading ? '-' : formatCurrency(stats?.financeiro?.honorariosPendentes)}</p>
              <p className="text-sm text-dark-400">A Receber</p>
            </div>
            
            <div className="bg-dark-900 rounded-xl p-4 border border-dark-800">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-red-400" />
                </div>
              </div>
              <p className="text-2xl font-bold text-white">{loading ? '-' : stats?.prazos?.proximos || 0}</p>
              <p className="text-sm text-dark-400">Prazos Próximos</p>
            </div>
          </div>

          {/* Grids de Conteúdo */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Processos Recentes */}
            <div className="bg-dark-900 rounded-xl border border-dark-800">
              <div className="flex items-center justify-between p-4 border-b border-dark-800">
                <h3 className="font-semibold text-white">Processos Recentes</h3>
                <Link href="/processes" className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1">
                  Ver todos <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="p-4 space-y-3">
                {loading ? (
                  <p className="text-dark-400 text-center py-4">Carregando...</p>
                ) : recentProcesses.length === 0 ? (
                  <div className="text-center py-8">
                    <Scale className="w-12 h-12 text-dark-600 mx-auto mb-2" />
                    <p className="text-dark-400">Nenhum processo cadastrado</p>
                    <Link href="/processes" className="text-blue-400 text-sm hover:underline">Cadastrar processo</Link>
                  </div>
                ) : (
                  recentProcesses.map((p) => (
                    <Link key={p.id} href={`/processes/${p.id}`} className="flex items-center gap-3 p-3 rounded-lg bg-dark-800/50 hover:bg-dark-800 transition-colors">
                      <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                        <Scale className="w-5 h-5 text-blue-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">{p.tipoAcao}</p>
                        <p className="text-xs text-dark-400 truncate">{p.numeroCnj}</p>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${p.status === 'ATIVO' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-dark-700 text-dark-300'}`}>
                        {p.status}
                      </span>
                    </Link>
                  ))
                )}
              </div>
            </div>

            {/* Prazos Próximos */}
            <div className="bg-dark-900 rounded-xl border border-dark-800">
              <div className="flex items-center justify-between p-4 border-b border-dark-800">
                <h3 className="font-semibold text-white">Prazos Próximos</h3>
                <Link href="/tasks" className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1">
                  Ver todos <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="p-4 space-y-3">
                {loading ? (
                  <p className="text-dark-400 text-center py-4">Carregando...</p>
                ) : deadlines.length === 0 ? (
                  <div className="text-center py-8">
                    <CheckCircle className="w-12 h-12 text-dark-600 mx-auto mb-2" />
                    <p className="text-dark-400">Nenhum prazo pendente</p>
                  </div>
                ) : (
                  deadlines.map((d) => (
                    <div key={d.id} className="flex items-center gap-3 p-3 rounded-lg bg-dark-800/50">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${d.prioridade === 'URGENTE' ? 'bg-red-500/20' : d.prioridade === 'ALTA' ? 'bg-amber-500/20' : 'bg-blue-500/20'}`}>
                        {d.prioridade === 'URGENTE' ? <AlertTriangle className="w-5 h-5 text-red-400" /> : <Clock className="w-5 h-5 text-amber-400" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">{d.descricao}</p>
                        <p className="text-xs text-dark-400">{d.processo?.numeroCnj}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-white">{new Date(d.dataLimite).toLocaleDateString('pt-BR')}</p>
                        <span className={`text-xs ${d.prioridade === 'URGENTE' ? 'text-red-400' : d.prioridade === 'ALTA' ? 'text-amber-400' : 'text-blue-400'}`}>
                          {d.prioridade}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
