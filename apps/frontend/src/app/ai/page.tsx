'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Bot, Send, Sparkles, FileText, Search, Scale } from 'lucide-react';

export default function AIPage() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([
    { role: 'assistant', content: 'Olá! Sou o assistente jurídico do OfficeBrain. Posso ajudar você a analisar documentos, resumir processos, gerar minutas e responder dúvidas jurídicas. Como posso ajudar?' }
  ]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim() || loading) return;

    const userMessage = message;
    setMessage('');
    setChat(prev => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
      });
      const data = await res.json();
      setChat(prev => [...prev, { role: 'assistant', content: data.response || 'Erro ao processar resposta.' }]);
    } catch {
      setChat(prev => [...prev, { role: 'assistant', content: 'Erro de conexão. Tente novamente.' }]);
    } finally {
      setLoading(false);
    }
  };

  const suggestions = [
    { icon: FileText, text: 'Analisar contrato' },
    { icon: Scale, text: 'Resumir processo' },
    { icon: Search, text: 'Pesquisar jurisprudência' },
    { icon: Sparkles, text: 'Gerar petição' },
  ];

  return (
    <div className="min-h-screen bg-dark-950 flex flex-col">
      {/* Header */}
      <header className="glass-card border-b border-dark-700/50 px-6 py-4">
        <div className="flex items-center gap-4">
          <Link href="/" className="p-2 rounded-lg hover:bg-dark-800 transition-colors">
            <ArrowLeft className="w-5 h-5 text-dark-400" />
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">Assistente Jurídico IA</h1>
              <p className="text-xs text-dark-400">Powered by Claude/GPT</p>
            </div>
          </div>
        </div>
      </header>

      {/* Chat Area */}
      <div className="flex-1 overflow-auto p-6 space-y-4">
        {chat.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
            <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
              msg.role === 'user' 
                ? 'bg-gradient-to-r from-blue-600 to-violet-600 text-white' 
                : 'glass-card text-dark-200'
            }`}>
              {msg.role === 'assistant' && (
                <div className="flex items-center gap-2 mb-2">
                  <Bot className="w-4 h-4 text-violet-400" />
                  <span className="text-xs text-violet-400 font-medium">Assistente</span>
                </div>
              )}
              <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="glass-card rounded-2xl px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-violet-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-violet-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-violet-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Suggestions */}
      {chat.length <= 1 && (
        <div className="px-6 pb-4">
          <p className="text-sm text-dark-400 mb-3">Sugestões:</p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((s, idx) => (
              <button
                key={idx}
                onClick={() => setMessage(s.text)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-dark-800/50 border border-dark-700 hover:border-violet-500/50 transition-colors text-sm text-dark-300 hover:text-white"
              >
                <s.icon className="w-4 h-4" />
                {s.text}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="glass-card border-t border-dark-700/50 p-4">
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Digite sua mensagem..."
            className="flex-1 px-4 py-3 rounded-xl bg-dark-800/50 border border-dark-700 focus:border-violet-500 outline-none transition-all"
          />
          <button
            onClick={sendMessage}
            disabled={loading || !message.trim()}
            className="p-3 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white disabled:opacity-50 hover:opacity-90 transition-opacity"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

