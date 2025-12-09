'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Settings, ArrowLeft, User, Building2, Bell, Shield, 
  Palette, Database, Save, Eye, EyeOff, Check, AlertCircle
} from 'lucide-react';

const API_URL = 'http://localhost:3001/api';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('perfil');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [perfil, setPerfil] = useState({
    nome: 'Administrador',
    email: 'admin@officebrain.com',
    telefone: '',
    oab: '',
  });

  const [escritorio, setEscritorio] = useState({
    nome: 'Escritório de Advocacia',
    cnpj: '',
    telefone: '',
    email: '',
    endereco: '',
    cidade: '',
    uf: 'SP',
  });

  const [notificacoes, setNotificacoes] = useState({
    emailPrazos: true,
    emailAudiencias: true,
    emailTarefas: false,
    pushPrazos: true,
    pushAudiencias: true,
  });

  const [seguranca, setSeguranca] = useState({
    senhaAtual: '',
    novaSenha: '',
    confirmarSenha: '',
  });

  const handleSave = async () => {
    setSaving(true);
    // Simulação de salvamento
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const tabs = [
    { id: 'perfil', label: 'Meu Perfil', icon: User },
    { id: 'escritorio', label: 'Escritório', icon: Building2 },
    { id: 'notificacoes', label: 'Notificações', icon: Bell },
    { id: 'seguranca', label: 'Segurança', icon: Shield },
    { id: 'aparencia', label: 'Aparência', icon: Palette },
    { id: 'dados', label: 'Dados', icon: Database },
  ];

  return (
    <div className="min-h-screen bg-background p-4 lg:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Link href="/" className="p-2 rounded-lg hover:bg-muted transition-colors">
            <ArrowLeft className="w-5 h-5 text-muted-foreground" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-white">Configurações</h1>
            <p className="text-muted-foreground text-sm">Gerencie suas preferências</p>
          </div>
        </div>
        {saved && (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/20 text-emerald-400 rounded-lg text-sm">
            <Check className="w-4 h-4" /> Salvo com sucesso
          </div>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar de Tabs */}
        <div className="lg:w-64 flex-shrink-0">
          <nav className="bg-card rounded-xl border border-border p-2 space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'text-muted-foreground hover:bg-muted'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Conteúdo */}
        <div className="flex-1 bg-card rounded-xl border border-border p-6">
          {/* Perfil */}
          {activeTab === 'perfil' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-white mb-1">Meu Perfil</h2>
                <p className="text-sm text-muted-foreground">Informações da sua conta</p>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-muted-foreground mb-1">Nome completo</label>
                  <input
                    type="text"
                    value={perfil.nome}
                    onChange={(e) => setPerfil({ ...perfil, nome: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-muted border border-border text-sm outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-1">E-mail</label>
                  <input
                    type="email"
                    value={perfil.email}
                    onChange={(e) => setPerfil({ ...perfil, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-muted border border-border text-sm outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-1">Telefone</label>
                  <input
                    type="text"
                    value={perfil.telefone}
                    onChange={(e) => setPerfil({ ...perfil, telefone: e.target.value })}
                    placeholder="(00) 00000-0000"
                    className="w-full px-3 py-2 rounded-lg bg-muted border border-border text-sm outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-1">Número OAB</label>
                  <input
                    type="text"
                    value={perfil.oab}
                    onChange={(e) => setPerfil({ ...perfil, oab: e.target.value })}
                    placeholder="000000/SP"
                    className="w-full px-3 py-2 rounded-lg bg-muted border border-border text-sm outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-sm font-medium transition-colors disabled:opacity-50"
              >
                <Save className="w-4 h-4" /> {saving ? 'Salvando...' : 'Salvar alterações'}
              </button>
            </div>
          )}

          {/* Escritório */}
          {activeTab === 'escritorio' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-white mb-1">Dados do Escritório</h2>
                <p className="text-sm text-muted-foreground">Informações da empresa</p>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-sm text-muted-foreground mb-1">Nome do escritório</label>
                  <input
                    type="text"
                    value={escritorio.nome}
                    onChange={(e) => setEscritorio({ ...escritorio, nome: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-muted border border-border text-sm outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-1">CNPJ</label>
                  <input
                    type="text"
                    value={escritorio.cnpj}
                    onChange={(e) => setEscritorio({ ...escritorio, cnpj: e.target.value })}
                    placeholder="00.000.000/0000-00"
                    className="w-full px-3 py-2 rounded-lg bg-muted border border-border text-sm outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-1">Telefone</label>
                  <input
                    type="text"
                    value={escritorio.telefone}
                    onChange={(e) => setEscritorio({ ...escritorio, telefone: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-muted border border-border text-sm outline-none focus:border-blue-500"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm text-muted-foreground mb-1">Endereço</label>
                  <input
                    type="text"
                    value={escritorio.endereco}
                    onChange={(e) => setEscritorio({ ...escritorio, endereco: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-muted border border-border text-sm outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-1">Cidade</label>
                  <input
                    type="text"
                    value={escritorio.cidade}
                    onChange={(e) => setEscritorio({ ...escritorio, cidade: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-muted border border-border text-sm outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-1">UF</label>
                  <input
                    type="text"
                    maxLength={2}
                    value={escritorio.uf}
                    onChange={(e) => setEscritorio({ ...escritorio, uf: e.target.value.toUpperCase() })}
                    className="w-full px-3 py-2 rounded-lg bg-muted border border-border text-sm outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-sm font-medium transition-colors disabled:opacity-50"
              >
                <Save className="w-4 h-4" /> {saving ? 'Salvando...' : 'Salvar alterações'}
              </button>
            </div>
          )}

          {/* Notificações */}
          {activeTab === 'notificacoes' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-white mb-1">Notificações</h2>
                <p className="text-sm text-muted-foreground">Configure como deseja receber alertas</p>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium text-muted-foreground">Notificações por E-mail</h3>
                {[
                  { key: 'emailPrazos', label: 'Alertas de prazos' },
                  { key: 'emailAudiencias', label: 'Lembretes de audiências' },
                  { key: 'emailTarefas', label: 'Atualizações de tarefas' },
                ].map((item) => (
                  <label key={item.key} className="flex items-center justify-between p-3 bg-muted rounded-lg cursor-pointer">
                    <span className="text-sm text-white">{item.label}</span>
                    <input
                      type="checkbox"
                      checked={notificacoes[item.key as keyof typeof notificacoes]}
                      onChange={(e) => setNotificacoes({ ...notificacoes, [item.key]: e.target.checked })}
                      className="w-5 h-5 rounded bg-muted/50 border-border text-blue-600 focus:ring-blue-500"
                    />
                  </label>
                ))}
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium text-muted-foreground">Notificações Push</h3>
                {[
                  { key: 'pushPrazos', label: 'Alertas de prazos urgentes' },
                  { key: 'pushAudiencias', label: 'Lembretes de audiências' },
                ].map((item) => (
                  <label key={item.key} className="flex items-center justify-between p-3 bg-muted rounded-lg cursor-pointer">
                    <span className="text-sm text-white">{item.label}</span>
                    <input
                      type="checkbox"
                      checked={notificacoes[item.key as keyof typeof notificacoes]}
                      onChange={(e) => setNotificacoes({ ...notificacoes, [item.key]: e.target.checked })}
                      className="w-5 h-5 rounded bg-muted/50 border-border text-blue-600 focus:ring-blue-500"
                    />
                  </label>
                ))}
              </div>

              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-sm font-medium transition-colors disabled:opacity-50"
              >
                <Save className="w-4 h-4" /> {saving ? 'Salvando...' : 'Salvar preferências'}
              </button>
            </div>
          )}

          {/* Segurança */}
          {activeTab === 'seguranca' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-white mb-1">Segurança</h2>
                <p className="text-sm text-muted-foreground">Altere sua senha</p>
              </div>

              <div className="space-y-4 max-w-md">
                <div>
                  <label className="block text-sm text-muted-foreground mb-1">Senha atual</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={seguranca.senhaAtual}
                      onChange={(e) => setSeguranca({ ...seguranca, senhaAtual: e.target.value })}
                      className="w-full px-3 py-2 pr-10 rounded-lg bg-muted border border-border text-sm outline-none focus:border-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-1">Nova senha</label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={seguranca.novaSenha}
                    onChange={(e) => setSeguranca({ ...seguranca, novaSenha: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-muted border border-border text-sm outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-muted-foreground mb-1">Confirmar nova senha</label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={seguranca.confirmarSenha}
                    onChange={(e) => setSeguranca({ ...seguranca, confirmarSenha: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-muted border border-border text-sm outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-sm font-medium transition-colors disabled:opacity-50"
              >
                <Save className="w-4 h-4" /> {saving ? 'Salvando...' : 'Alterar senha'}
              </button>
            </div>
          )}

          {/* Aparência */}
          {activeTab === 'aparencia' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-white mb-1">Aparência</h2>
                <p className="text-sm text-muted-foreground">Personalize a interface</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">Tema</label>
                  <div className="flex gap-3">
                    <button className="flex-1 p-4 rounded-lg border-2 border-blue-500 bg-muted">
                      <div className="w-full h-8 rounded bg-background mb-2"></div>
                      <p className="text-sm text-white">Escuro</p>
                    </button>
                    <button className="flex-1 p-4 rounded-lg border-2 border-border bg-muted opacity-50">
                      <div className="w-full h-8 rounded bg-gray-200 mb-2"></div>
                      <p className="text-sm text-muted-foreground">Claro (em breve)</p>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Dados */}
          {activeTab === 'dados' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-white mb-1">Gerenciamento de Dados</h2>
                <p className="text-sm text-muted-foreground">Exporte ou limpe seus dados</p>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="font-medium text-white mb-1">Exportar dados</h3>
                  <p className="text-sm text-muted-foreground mb-3">Baixe todos os seus dados em formato JSON</p>
                  <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-sm font-medium transition-colors">
                    Exportar dados
                  </button>
                </div>

                <div className="p-4 bg-muted rounded-lg border border-red-500/30">
                  <h3 className="font-medium text-red-400 mb-1">Zona de perigo</h3>
                  <p className="text-sm text-muted-foreground mb-3">Ações irreversíveis</p>
                  <button className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white text-sm font-medium transition-colors">
                    Excluir todos os dados
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

