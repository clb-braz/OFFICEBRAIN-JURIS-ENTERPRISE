'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Users, Plus, Search, ArrowLeft, Building2, User, Phone, Mail, MoreVertical, Trash2, Edit } from 'lucide-react';

const API_URL = 'http://localhost:3001/api';

export default function ClientsPage() {
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingClient, setEditingClient] = useState<any>(null);
  const [form, setForm] = useState({ tipo: 'FISICA', nome: '', cpfCnpj: '', email: '', telefone: '', celular: '' });

  const fetchClients = async () => {
    try {
      const res = await fetch(`${API_URL}/clients?search=${search}`);
      if (res.ok) {
        const data = await res.json();
        setClients(data.data || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchClients(); }, [search]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Enviando dados:', form);
    try {
      const url = editingClient ? `${API_URL}/clients/${editingClient.id}` : `${API_URL}/clients`;
      const method = editingClient ? 'PATCH' : 'POST';
      
      const payload = {
        tipo: form.tipo,
        nome: form.nome,
        cpfCnpj: form.cpfCnpj,
        email: form.email || null,
        telefone: form.telefone || null,
        celular: form.celular || null,
      };
      console.log('Payload:', payload);
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      
      if (res.ok) {
        setShowModal(false);
        setEditingClient(null);
        setForm({ tipo: 'FISICA', nome: '', cpfCnpj: '', email: '', telefone: '', celular: '' });
        fetchClients();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este cliente?')) return;
    try {
      await fetch(`${API_URL}/clients/${id}`, { method: 'DELETE' });
      fetchClients();
    } catch (err) {
      console.error(err);
    }
  };

  const openEdit = (client: any) => {
    setEditingClient(client);
    setForm({
      tipo: client.tipo,
      nome: client.nome,
      cpfCnpj: client.cpfCnpj,
      email: client.email || '',
      telefone: client.telefone || '',
      celular: client.celular || '',
    });
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-dark-950 p-4 lg:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Link href="/" className="p-2 rounded-lg hover:bg-dark-800 transition-colors">
            <ArrowLeft className="w-5 h-5 text-dark-400" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-white">Clientes</h1>
            <p className="text-dark-400 text-sm">{clients.length} cadastrados</p>
          </div>
        </div>
        <button onClick={() => { setEditingClient(null); setForm({ tipo: 'FISICA', nome: '', cpfCnpj: '', email: '', telefone: '', celular: '' }); setShowModal(true); }} className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-sm font-medium transition-colors">
          <Plus className="w-4 h-4" /> Novo Cliente
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-500" />
          <input
            type="text"
            placeholder="Buscar por nome, CPF/CNPJ ou email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-dark-900 border border-dark-800 text-sm focus:border-blue-500 outline-none"
          />
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="text-center py-12 text-dark-400">Carregando...</div>
      ) : clients.length === 0 ? (
        <div className="text-center py-12">
          <Users className="w-16 h-16 text-dark-700 mx-auto mb-4" />
          <p className="text-dark-400 mb-2">Nenhum cliente cadastrado</p>
          <button onClick={() => setShowModal(true)} className="text-blue-400 hover:underline">Cadastrar primeiro cliente</button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {clients.map((client) => (
            <div key={client.id} className="bg-dark-900 rounded-xl p-4 border border-dark-800 hover:border-dark-700 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${client.tipo === 'FISICA' ? 'bg-blue-500/20' : 'bg-violet-500/20'}`}>
                    {client.tipo === 'FISICA' ? <User className="w-5 h-5 text-blue-400" /> : <Building2 className="w-5 h-5 text-violet-400" />}
                  </div>
                  <div>
                    <h3 className="font-medium text-white">{client.nome}</h3>
                    <p className="text-xs text-dark-400">{client.cpfCnpj}</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => openEdit(client)} className="p-1.5 rounded hover:bg-dark-800">
                    <Edit className="w-4 h-4 text-dark-400" />
                  </button>
                  <button onClick={() => handleDelete(client.id)} className="p-1.5 rounded hover:bg-dark-800">
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </button>
                </div>
              </div>
              
              <div className="space-y-1.5 text-sm">
                {client.email && (
                  <div className="flex items-center gap-2 text-dark-300">
                    <Mail className="w-4 h-4 text-dark-500" />
                    <span className="truncate">{client.email}</span>
                  </div>
                )}
                {(client.telefone || client.celular) && (
                  <div className="flex items-center gap-2 text-dark-300">
                    <Phone className="w-4 h-4 text-dark-500" />
                    <span>{client.celular || client.telefone}</span>
                  </div>
                )}
              </div>

              {client.tags?.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {client.tags.map((tag: string) => (
                    <span key={tag} className={`px-2 py-0.5 rounded text-xs font-medium ${tag === 'VIP' ? 'bg-amber-500/20 text-amber-400' : tag === 'INADIMPLENTE' ? 'bg-red-500/20 text-red-400' : 'bg-dark-700 text-dark-300'}`}>
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              
              <div className="mt-3 pt-3 border-t border-dark-800 text-xs text-dark-500">
                {client._count?.processos || 0} processos vinculados
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-dark-900 rounded-xl w-full max-w-md border border-dark-800">
            <div className="p-4 border-b border-dark-800">
              <h2 className="text-lg font-semibold text-white">{editingClient ? 'Editar Cliente' : 'Novo Cliente'}</h2>
            </div>
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              <div>
                <label className="block text-sm text-dark-300 mb-1">Tipo</label>
                <select value={form.tipo} onChange={(e) => setForm({ ...form, tipo: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-dark-800 border border-dark-700 text-sm outline-none focus:border-blue-500">
                  <option value="FISICA">Pessoa Física</option>
                  <option value="JURIDICA">Pessoa Jurídica</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-dark-300 mb-1">Nome *</label>
                <input type="text" required value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-dark-800 border border-dark-700 text-sm outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm text-dark-300 mb-1">{form.tipo === 'FISICA' ? 'CPF *' : 'CNPJ *'}</label>
                <input type="text" required value={form.cpfCnpj} onChange={(e) => setForm({ ...form, cpfCnpj: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-dark-800 border border-dark-700 text-sm outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm text-dark-300 mb-1">Email</label>
                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-dark-800 border border-dark-700 text-sm outline-none focus:border-blue-500" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-dark-300 mb-1">Telefone</label>
                  <input type="text" value={form.telefone} onChange={(e) => setForm({ ...form, telefone: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-dark-800 border border-dark-700 text-sm outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm text-dark-300 mb-1">Celular</label>
                  <input type="text" value={form.celular} onChange={(e) => setForm({ ...form, celular: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-dark-800 border border-dark-700 text-sm outline-none focus:border-blue-500" />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 px-4 py-2 rounded-lg border border-dark-700 text-dark-300 hover:bg-dark-800 transition-colors">Cancelar</button>
                <button type="submit" className="flex-1 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors">Salvar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
