'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Users, ArrowLeft, Plus, Filter, TrendingUp, Phone, 
  Mail, MessageCircle, CheckCircle, XCircle
} from 'lucide-react';

const API_URL = 'http://localhost:3001/api';

export default function CrmPage() {
  const [leads, setLeads] = useState<any[]>([]);
  const [funnel, setFunnel] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');

  const fetchData = async () => {
    try {
      const [leadsRes, funnelRes] = await Promise.all([
        fetch(`${API_URL}/crm/leads?status=${statusFilter}`),
        fetch(`${API_URL}/crm/funnel`),
      ]);

      if (leadsRes.ok) {
        const data = await leadsRes.json();
        setLeads(data.data || []);
      }

      if (funnelRes.ok) {
        setFunnel(await funnelRes.json());
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [statusFilter]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'CONTRATADO': return 'bg-emerald-500/20 text-emerald-400';
      case 'NEGOCIACAO': return 'bg-blue-500/20 text-blue-400';
      case 'PROPOSTA_ENVIADA': return 'bg-purple-500/20 text-purple-400';
      case 'REUNIAO_AGENDADA': return 'bg-amber-500/20 text-amber-400';
      case 'PROSPECCAO': return 'bg-yellow-500/20 text-yellow-400';
      case 'LEAD': return 'bg-muted/50 text-muted-foreground';
      case 'PERDIDO': return 'bg-red-500/20 text-red-400';
      default: return 'bg-muted/50 text-muted-foreground';
    }
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
            <h1 className="text-xl font-bold text-white">CRM</h1>
            <p className="text-muted-foreground text-sm">Gestão de leads e prospecção</p>
          </div>
        </div>
        <Link
          href="/crm/leads/new"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-sm font-medium transition-colors"
        >
          <Plus className="w-4 h-4" /> Novo Lead
        </Link>
      </div>

      {/* Funil */}
      {funnel && (
        <div className="grid grid-cols-2 md:grid-cols-7 gap-3 mb-6">
          <div className="bg-card rounded-xl p-4 border border-border">
            <p className="text-2xl font-bold text-white">{funnel.lead}</p>
            <p className="text-sm text-muted-foreground">Leads</p>
          </div>
          <div className="bg-card rounded-xl p-4 border border-border">
            <p className="text-2xl font-bold text-white">{funnel.prospeccao}</p>
            <p className="text-sm text-muted-foreground">Prospecção</p>
          </div>
          <div className="bg-card rounded-xl p-4 border border-border">
            <p className="text-2xl font-bold text-white">{funnel.reuniao}</p>
            <p className="text-sm text-muted-foreground">Reunião</p>
          </div>
          <div className="bg-card rounded-xl p-4 border border-border">
            <p className="text-2xl font-bold text-white">{funnel.proposta}</p>
            <p className="text-sm text-muted-foreground">Proposta</p>
          </div>
          <div className="bg-card rounded-xl p-4 border border-border">
            <p className="text-2xl font-bold text-white">{funnel.negociacao}</p>
            <p className="text-sm text-muted-foreground">Negociação</p>
          </div>
          <div className="bg-card rounded-xl p-4 border border-border">
            <p className="text-2xl font-bold text-emerald-400">{funnel.contratado}</p>
            <p className="text-sm text-muted-foreground">Contratado</p>
          </div>
          <div className="bg-card rounded-xl p-4 border border-border">
            <p className="text-2xl font-bold text-red-400">{funnel.perdido}</p>
            <p className="text-sm text-muted-foreground">Perdido</p>
          </div>
        </div>
      )}

      {/* Filtros */}
      <div className="mb-6">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 rounded-lg bg-card border border-border text-sm outline-none"
        >
          <option value="">Todos os Status</option>
          <option value="LEAD">Lead</option>
          <option value="PROSPECCAO">Prospecção</option>
          <option value="REUNIAO_AGENDADA">Reunião Agendada</option>
          <option value="PROPOSTA_ENVIADA">Proposta Enviada</option>
          <option value="NEGOCIACAO">Negociação</option>
          <option value="CONTRATADO">Contratado</option>
          <option value="PERDIDO">Perdido</option>
        </select>
      </div>

      {/* Lista de Leads */}
      {loading ? (
        <div className="text-center py-12 text-muted-foreground">Carregando...</div>
      ) : leads.length === 0 ? (
        <div className="text-center py-12">
          <Users className="w-16 h-16 text-dark-700 mx-auto mb-4" />
          <p className="text-muted-foreground mb-2">Nenhum lead encontrado</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {leads.map((lead) => (
            <div
              key={lead.id}
              className="bg-card rounded-xl p-4 border border-border hover:border-border transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-medium text-white">{lead.nome}</h3>
                  <span className={`inline-block mt-1 px-2 py-0.5 rounded text-xs font-medium ${getStatusColor(lead.status)}`}>
                    {lead.status}
                  </span>
                </div>
              </div>

              <div className="space-y-2 text-sm text-muted-foreground mb-3">
                {lead.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span className="truncate">{lead.email}</span>
                  </div>
                )}
                {lead.telefone && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span>{lead.telefone}</span>
                  </div>
                )}
                {lead.whatsapp && (
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-muted-foreground" />
                    <a
                      href={`https://wa.me/${lead.whatsapp.replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-400 hover:underline"
                    >
                      {lead.whatsapp}
                    </a>
                  </div>
                )}
              </div>

              {lead.areaInteresse && (
                <div className="mb-3">
                  <span className="px-2 py-1 rounded text-xs font-medium bg-blue-500/20 text-blue-400">
                    {lead.areaInteresse}
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between pt-3 border-t border-border">
                <span className="text-xs text-muted-foreground">
                  {lead._count?.interacoes || 0} interações
                </span>
                <Link
                  href={`/crm/leads/${lead.id}`}
                  className="text-xs text-blue-400 hover:underline"
                >
                  Ver detalhes
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

