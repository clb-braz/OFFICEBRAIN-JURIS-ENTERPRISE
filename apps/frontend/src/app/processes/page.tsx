'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Scale, Plus, Search, ArrowLeft, Calendar, MapPin, Trash2, Edit, ChevronRight } from 'lucide-react';

const API_URL = 'http://localhost:3001/api';

const AREAS = ['CIVIL', 'CONSUMIDOR', 'FAMILIA', 'TRABALHISTA', 'EMPRESARIAL', 'TRIBUTARIO', 'PREVIDENCIARIO'];
const STATUS = ['ATIVO', 'ARQUIVADO', 'SUSPENSO', 'BAIXADO', 'RECURSO'];

export default function ProcessesPage() {
  const [processes, setProcesses] = useState<any[]>([]);
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    numeroCnj: '', tipoAcao: '', area: 'CIVIL', status: 'ATIVO', fase: 'CONHECIMENTO',
    vara: '', comarca: '', uf: 'SP', valorCausa: '', clienteId: '',
  });

  const fetchData = async () => {
    try {
      const [processesRes, clientsRes] = await Promise.all([
        fetch(`${API_URL}/processes?search=${search}&status=${statusFilter}`),
        fetch(`${API_URL}/clients`),
      ]);
      if (processesRes.ok) setProcesses((await processesRes.json()).data || []);
      if (clientsRes.ok) setClients((await clientsRes.json()).data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, [search, statusFilter]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/processes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          valorCausa: form.valorCausa ? parseFloat(form.valorCausa) : null,
        }),
      });
      if (res.ok) {
        setShowModal(false);
        setForm({ numeroCnj: '', tipoAcao: '', area: 'CIVIL', status: 'ATIVO', fase: 'CONHECIMENTO', vara: '', comarca: '', uf: 'SP', valorCausa: '', clienteId: '' });
        fetchData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Excluir este processo?')) return;
    await fetch(`${API_URL}/processes/${id}`, { method: 'DELETE' });
    fetchData();
  };

  const statusColors: Record<string, string> = {
    ATIVO: 'bg-emerald-500/20 text-emerald-400',
    ARQUIVADO: 'bg-dark-600 text-dark-300',
    SUSPENSO: 'bg-amber-500/20 text-amber-400',
    RECURSO: 'bg-blue-500/20 text-blue-400',
    BAIXADO: 'bg-dark-700 text-dark-400',
  };

  return (
    <div className="min-h-screen bg-dark-950 p-4 lg:p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Link href="/" className="p-2 rounded-lg hover:bg-dark-800"><ArrowLeft className="w-5 h-5 text-dark-400" /></Link>
          <div>
            <h1 className="text-xl font-bold text-white">Processos</h1>
            <p className="text-dark-400 text-sm">{processes.length} cadastrados</p>
          </div>
        </div>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-sm font-medium">
          <Plus className="w-4 h-4" /> Novo Processo
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-500" />
          <input type="text" placeholder="Buscar por número CNJ ou tipo..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-dark-900 border border-dark-800 text-sm focus:border-blue-500 outline-none" />
        </div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-3 py-2.5 rounded-lg bg-dark-900 border border-dark-800 text-sm outline-none">
          <option value="">Todos os Status</option>
          {STATUS.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      {loading ? (
        <div className="text-center py-12 text-dark-400">Carregando...</div>
      ) : processes.length === 0 ? (
        <div className="text-center py-12">
          <Scale className="w-16 h-16 text-dark-700 mx-auto mb-4" />
          <p className="text-dark-400 mb-2">Nenhum processo cadastrado</p>
          <button onClick={() => setShowModal(true)} className="text-blue-400 hover:underline">Cadastrar primeiro processo</button>
        </div>
      ) : (
        <div className="space-y-3">
          {processes.map((p) => (
            <div key={p.id} className="bg-dark-900 rounded-xl p-4 border border-dark-800 hover:border-dark-700 transition-colors">
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center">
                    <Scale className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium text-white">{p.tipoAcao}</h3>
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${statusColors[p.status] || 'bg-dark-700 text-dark-300'}`}>{p.status}</span>
                    </div>
                    <p className="text-sm text-dark-400 font-mono">{p.numeroCnj}</p>
                    {p.clientes?.[0]?.cliente && (
                      <p className="text-sm text-dark-300 mt-1">Cliente: {p.clientes[0].cliente.nome}</p>
                    )}
                  </div>
                </div>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-dark-300">
                  {p.vara && <span className="flex items-center gap-1"><MapPin className="w-4 h-4 text-dark-500" />{p.vara}</span>}
                  {p.comarca && <span>{p.comarca}/{p.uf}</span>}
                  {p.valorCausa && <span className="text-emerald-400 font-medium">R$ {Number(p.valorCausa).toLocaleString('pt-BR')}</span>}
                </div>
                
                <div className="flex items-center gap-2">
                  <button onClick={() => handleDelete(p.id)} className="p-2 rounded-lg hover:bg-dark-800"><Trash2 className="w-4 h-4 text-red-400" /></button>
                  <Link href={`/processes/${p.id}`} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-dark-800 text-sm text-blue-400 hover:bg-dark-700">
                    Detalhes <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-dark-900 rounded-xl w-full max-w-lg border border-dark-800 max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b border-dark-800 sticky top-0 bg-dark-900">
              <h2 className="text-lg font-semibold text-white">Novo Processo</h2>
            </div>
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              <div>
                <label className="block text-sm text-dark-300 mb-1">Número CNJ *</label>
                <input type="text" required placeholder="0000000-00.0000.0.00.0000" value={form.numeroCnj} onChange={(e) => setForm({ ...form, numeroCnj: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-dark-800 border border-dark-700 text-sm outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm text-dark-300 mb-1">Tipo de Ação *</label>
                <input type="text" required placeholder="Ex: Ação de Cobrança" value={form.tipoAcao} onChange={(e) => setForm({ ...form, tipoAcao: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-dark-800 border border-dark-700 text-sm outline-none focus:border-blue-500" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-dark-300 mb-1">Área</label>
                  <select value={form.area} onChange={(e) => setForm({ ...form, area: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-dark-800 border border-dark-700 text-sm outline-none">
                    {AREAS.map(a => <option key={a} value={a}>{a}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-dark-300 mb-1">Status</label>
                  <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-dark-800 border border-dark-700 text-sm outline-none">
                    {STATUS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-dark-300 mb-1">Vara</label>
                  <input type="text" placeholder="Ex: 5ª Vara Cível" value={form.vara} onChange={(e) => setForm({ ...form, vara: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-dark-800 border border-dark-700 text-sm outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm text-dark-300 mb-1">Comarca</label>
                  <input type="text" placeholder="Ex: São Paulo" value={form.comarca} onChange={(e) => setForm({ ...form, comarca: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-dark-800 border border-dark-700 text-sm outline-none focus:border-blue-500" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-dark-300 mb-1">UF</label>
                  <input type="text" maxLength={2} value={form.uf} onChange={(e) => setForm({ ...form, uf: e.target.value.toUpperCase() })} className="w-full px-3 py-2 rounded-lg bg-dark-800 border border-dark-700 text-sm outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm text-dark-300 mb-1">Valor da Causa</label>
                  <input type="number" step="0.01" placeholder="0,00" value={form.valorCausa} onChange={(e) => setForm({ ...form, valorCausa: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-dark-800 border border-dark-700 text-sm outline-none focus:border-blue-500" />
                </div>
              </div>
              {clients.length > 0 && (
                <div>
                  <label className="block text-sm text-dark-300 mb-1">Cliente (Autor)</label>
                  <select value={form.clienteId} onChange={(e) => setForm({ ...form, clienteId: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-dark-800 border border-dark-700 text-sm outline-none">
                    <option value="">Selecione um cliente</option>
                    {clients.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
                  </select>
                </div>
              )}
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 px-4 py-2 rounded-lg border border-dark-700 text-dark-300 hover:bg-dark-800">Cancelar</button>
                <button type="submit" className="flex-1 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white">Salvar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
