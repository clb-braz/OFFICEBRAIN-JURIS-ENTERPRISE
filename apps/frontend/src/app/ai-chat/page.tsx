'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Send, Bot, User, Loader, Sparkles
} from 'lucide-react';

const API_URL = 'http://localhost:3001/api';

export default function AiChatPage() {
  const [conversations, setConversations] = useState<any[]>([]);
  const [currentConversation, setCurrentConversation] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const fetchConversations = async () => {
    try {
      const res = await fetch(`${API_URL}/ai-advanced/conversations`);
      if (res.ok) {
        setConversations(await res.json());
      }
    } catch (err) {
      console.error(err);
    }
  };

  const createConversation = async () => {
    try {
      const res = await fetch(`${API_URL}/ai-advanced/conversations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          titulo: 'Nova Conversa',
          contexto: 'Assistente jurídico',
        }),
      });
      if (res.ok) {
        const conv = await res.json();
        setCurrentConversation(conv);
        setMessages([]);
        fetchConversations();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchMessages = async (conversationId: string) => {
    try {
      const res = await fetch(`${API_URL}/ai-advanced/conversations/${conversationId}`);
      if (res.ok) {
        const conv = await res.json();
        setCurrentConversation(conv);
        setMessages(conv.mensagens || []);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || !currentConversation) return;

    const userMessage = {
      role: 'user',
      conteudo: input,
      createdAt: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch(
        `${API_URL}/ai-advanced/conversations/${currentConversation.id}/messages`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ mensagem: input }),
        }
      );

      if (res.ok) {
        const data = await res.json();
        setMessages([...messages, userMessage, data.aiMessage]);
        fetchMessages(currentConversation.id);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar de Conversas */}
      <aside className="w-64 bg-card border-r border-border p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-white">Conversas</h2>
          <button
            onClick={createConversation}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
          >
            <span className="text-2xl text-muted-foreground">+</span>
          </button>
        </div>

        <div className="space-y-2">
          {conversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => fetchMessages(conv.id)}
              className={`w-full text-left p-3 rounded-lg transition-colors ${
                currentConversation?.id === conv.id
                  ? 'bg-muted text-white'
                  : 'hover:bg-muted text-muted-foreground'
              }`}
            >
              <p className="text-sm font-medium truncate">
                {conv.titulo || 'Nova Conversa'}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {conv._count?.mensagens || 0} mensagens
              </p>
            </button>
          ))}
        </div>
      </aside>

      {/* Área de Chat */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-card border-b border-border p-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="p-2 rounded-lg hover:bg-muted transition-colors">
              <ArrowLeft className="w-5 h-5 text-muted-foreground" />
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-semibold text-white">Assistente Jurídico IA</h1>
                <p className="text-xs text-muted-foreground">Baseado em legislação brasileira</p>
              </div>
            </div>
          </div>
        </header>

        {/* Mensagens */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {!currentConversation ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <Sparkles className="w-16 h-16 text-dark-700 mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">Selecione uma conversa ou crie uma nova</p>
                <button
                  onClick={createConversation}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium"
                >
                  Nova Conversa
                </button>
              </div>
            </div>
          ) : messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <Bot className="w-16 h-16 text-dark-700 mx-auto mb-4" />
                <p className="text-muted-foreground mb-2">Comece uma conversa</p>
                <p className="text-sm text-muted-foreground">
                  Faça perguntas sobre legislação, processos ou peças jurídicas
                </p>
              </div>
            </div>
          ) : (
            messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                )}
                <div
                  className={`max-w-[70%] rounded-xl p-4 ${
                    msg.role === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-muted text-foreground'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.conteudo}</p>
                  {msg.artigosCitados && msg.artigosCitados.length > 0 && (
                    <div className="mt-2 pt-2 border-t border-border">
                      <p className="text-xs text-muted-foreground">
                        Artigos citados: {msg.artigosCitados.join(', ')}
                      </p>
                    </div>
                  )}
                </div>
                {msg.role === 'user' && (
                  <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-muted-foreground" />
                  </div>
                )}
              </div>
            ))
          )}
          {loading && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="bg-muted rounded-xl p-4">
                <Loader className="w-5 h-5 text-muted-foreground animate-spin" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        {currentConversation && (
          <div className="border-t border-border p-4">
            <div className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                placeholder="Digite sua pergunta..."
                className="flex-1 px-4 py-3 rounded-lg bg-card border border-border text-white placeholder-dark-500 outline-none focus:border-blue-500"
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || loading}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-muted disabled:text-muted-foreground rounded-lg text-white font-medium transition-colors flex items-center gap-2"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

