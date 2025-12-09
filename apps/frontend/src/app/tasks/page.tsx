'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ListTodo, Plus, ArrowLeft, Clock, CheckCircle, AlertTriangle, Trash2 } from 'lucide-react';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';

const API_URL = 'http://localhost:3001/api';

const COLUMNS = [
  { id: 'A_FAZER', name: 'A Fazer', color: 'border-border' },
  { id: 'EM_ANDAMENTO', name: 'Em Andamento', color: 'border-blue-500' },
  { id: 'AGUARDANDO_CLIENTE', name: 'Aguardando', color: 'border-amber-500' },
  { id: 'CONCLUIDO', name: 'Concluído', color: 'border-emerald-500' },
];

const PRIORIDADES = ['BAIXA', 'MEDIA', 'ALTA', 'URGENTE'];

export default function TasksPage() {
  const [kanban, setKanban] = useState<Record<string, any[]>>({});
  const [loading, setLoading] = useState(true);
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; id: string | null }>({ open: false, id: null });
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ titulo: '', descricao: '', status: 'A_FAZER', prioridade: 'MEDIA' });

  const fetchData = async () => {
    try {
      const res = await fetch(`${API_URL}/tasks/kanban`);
      if (res.ok) setKanban(await res.json());
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setShowModal(false);
        setForm({ titulo: '', descricao: '', status: 'A_FAZER', prioridade: 'MEDIA' });
        fetchData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    setDeleteDialog({ open: true, id });
  };

  const confirmDelete = async () => {
    if (!deleteDialog.id) return;
    try {
      await fetch(`${API_URL}/tasks/${deleteDialog.id}`, { method: 'DELETE' });
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleStatusChange = async (taskId: string, newStatus: string) => {
    await fetch(`${API_URL}/tasks/${taskId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    });
    fetchData();
  };

  const prioridadeColors: Record<string, string> = {
    BAIXA: 'bg-dark-600 text-muted-foreground',
    MEDIA: 'bg-blue-500/20 text-blue-400',
    ALTA: 'bg-amber-500/20 text-amber-400',
    URGENTE: 'bg-red-500/20 text-red-400',
  };

  return (
    <div className="min-h-screen bg-background p-4 lg:p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Link href="/" className="p-2 rounded-lg hover:bg-muted"><ArrowLeft className="w-5 h-5 text-muted-foreground" /></Link>
          <div>
            <h1 className="text-xl font-bold text-white">Tarefas</h1>
            <p className="text-muted-foreground text-sm">Kanban de atividades</p>
          </div>
        </div>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-sm font-medium">
          <Plus className="w-4 h-4" /> Nova Tarefa
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12 text-muted-foreground">Carregando...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {COLUMNS.map((col) => (
            <div key={col.id} className={`bg-card rounded-xl border-t-2 ${col.color}`}>
              <div className="p-3 border-b border-border">
                <h3 className="font-medium text-white flex items-center justify-between">
                  {col.name}
                  <span className="text-xs bg-muted px-2 py-0.5 rounded-full text-muted-foreground">
                    {kanban[col.id]?.length || 0}
                  </span>
                </h3>
              </div>
              <div className="p-3 space-y-3 min-h-[200px]">
                {(kanban[col.id] || []).map((task) => (
                  <div key={task.id} className="bg-muted rounded-lg p-3 border border-border hover:border-border transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-sm font-medium text-white">{task.titulo}</h4>
                      <button onClick={() => handleDelete(task.id)} className="p-1 rounded hover:bg-muted/50">
                        <Trash2 className="w-3.5 h-3.5 text-red-400" />
                      </button>
                    </div>
                    {task.descricao && <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{task.descricao}</p>}
                    <div className="flex items-center justify-between">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${prioridadeColors[task.prioridade]}`}>
                        {task.prioridade}
                      </span>
                      <select
                        value={task.status}
                        onChange={(e) => handleStatusChange(task.id, e.target.value)}
                        className="text-xs bg-muted/50 border-none rounded px-1 py-0.5 text-muted-foreground outline-none"
                      >
                        {COLUMNS.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                      </select>
                    </div>
                  </div>
                ))}
                {(!kanban[col.id] || kanban[col.id].length === 0) && (
                  <div className="text-center py-8 text-muted-foreground text-sm">
                    Nenhuma tarefa
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-xl w-full max-w-md border border-border">
            <div className="p-4 border-b border-border">
              <h2 className="text-lg font-semibold text-white">Nova Tarefa</h2>
            </div>
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              <div>
                <label className="block text-sm text-muted-foreground mb-1">Título *</label>
                <input type="text" required value={form.titulo} onChange={(e) => setForm({ ...form, titulo: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-muted border border-border text-sm outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-1">Descrição</label>
                <textarea rows={3} value={form.descricao} onChange={(e) => setForm({ ...form, descricao: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-muted border border-border text-sm outline-none focus:border-blue-500 resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-muted-foreground mb-1">Status</label>
                  <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-muted border border-border text-sm outline-none">
                    {COLUMNS.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-1">Prioridade</label>
                  <select value={form.prioridade} onChange={(e) => setForm({ ...form, prioridade: e.target.value })} className="w-full px-3 py-2 rounded-lg bg-muted border border-border text-sm outline-none">
                    {PRIORIDADES.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 px-4 py-2 rounded-lg border border-border text-muted-foreground hover:bg-muted">Cancelar</button>
                <button type="submit" className="flex-1 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white">Salvar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmDialog
        open={deleteDialog.open}
        onOpenChange={(open) => setDeleteDialog({ open, id: null })}
        onConfirm={confirmDelete}
        title="Excluir Tarefa"
        description="Tem certeza que deseja excluir esta tarefa? Esta ação não pode ser desfeita."
        confirmText="Excluir"
        cancelText="Cancelar"
        variant="destructive"
      />
    </div>
  );
}

