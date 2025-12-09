'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Calendar, ArrowLeft, Plus, Filter, Clock, MapPin, 
  Users, Video, Phone, Building2
} from 'lucide-react';

const API_URL = 'http://localhost:3001/api';

export default function AgendaPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'list' | 'month' | 'week'>('list');
  const [selectedDate, setSelectedDate] = useState(new Date());

  const fetchEvents = async () => {
    try {
      const dataInicio = new Date(selectedDate);
      dataInicio.setDate(1);
      const dataFim = new Date(selectedDate);
      dataFim.setMonth(dataFim.getMonth() + 1);

      const res = await fetch(
        `${API_URL}/agenda/calendar?dataInicio=${dataInicio.toISOString()}&dataFim=${dataFim.toISOString()}`
      );
      if (res.ok) {
        setEvents(await res.json());
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [selectedDate]);

  const getEventIcon = (tipo: string) => {
    switch (tipo) {
      case 'AUDIENCIA': return <Video className="w-4 h-4" />;
      case 'REUNIAO': return <Users className="w-4 h-4" />;
      case 'VISITA_FORUM': return <Building2 className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getEventColor = (tipo: string) => {
    switch (tipo) {
      case 'AUDIENCIA': return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
      case 'REUNIAO': return 'bg-purple-500/20 text-purple-400 border-purple-500/50';
      case 'VISITA_FORUM': return 'bg-amber-500/20 text-amber-400 border-amber-500/50';
      default: return 'bg-muted text-muted-foreground border-border';
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
            <h1 className="text-xl font-bold text-white">Agenda</h1>
            <p className="text-muted-foreground text-sm">Reuniões, audiências e eventos</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={view}
            onChange={(e) => setView(e.target.value as any)}
            className="px-3 py-2 rounded-lg bg-card border border-border text-sm outline-none"
          >
            <option value="list">Lista</option>
            <option value="week">Semana</option>
            <option value="month">Mês</option>
          </select>
          <Link
            href="/agenda/new"
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-sm font-medium transition-colors"
          >
            <Plus className="w-4 h-4" /> Novo Evento
          </Link>
        </div>
      </div>

      {/* Calendário/Lista */}
      {loading ? (
        <div className="text-center py-12 text-muted-foreground">Carregando...</div>
      ) : events.length === 0 ? (
        <div className="text-center py-12">
          <Calendar className="w-16 h-16 text-dark-700 mx-auto mb-4" />
          <p className="text-muted-foreground mb-2">Nenhum evento agendado</p>
        </div>
      ) : (
        <div className="space-y-3">
          {events.map((event) => (
            <div
              key={event.id}
              className={`bg-card rounded-xl p-4 border-2 ${getEventColor(event.tipo)}`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                    {getEventIcon(event.tipo)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-white mb-1">{event.titulo}</h3>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {new Date(event.dataInicio).toLocaleDateString('pt-BR', {
                          day: '2-digit',
                          month: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                      {event.local && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {event.local}
                        </span>
                      )}
                      {event.processo && (
                        <span className="text-blue-400">
                          {event.processo.numeroCnj}
                        </span>
                      )}
                    </div>
                    {event.participantes && event.participantes.length > 0 && (
                      <div className="flex items-center gap-2 mt-2">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {event.participantes.length} participante(s)
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    event.status === 'CONFIRMADO' ? 'bg-emerald-500/20 text-emerald-400' :
                    event.status === 'REALIZADO' ? 'bg-blue-500/20 text-blue-400' :
                    'bg-amber-500/20 text-amber-400'
                  }`}>
                    {event.status}
                  </span>
                  <Link
                    href={`/agenda/${event.id}`}
                    className="px-3 py-1 rounded-lg bg-muted hover:bg-muted/50 text-muted-foreground text-xs font-medium"
                  >
                    Detalhes
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

