import { getToken } from './auth';

export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const token = typeof window !== 'undefined' ? getToken() : null;
  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options?.headers,
    },
    cache: options?.cache ?? 'no-store',
  });
  
  if (!res.ok) {
    let errorMessage = `Erro ${res.status}`;
    try {
      const errorData = await res.json();
      errorMessage = errorData.message || errorData.error || errorMessage;
    } catch {
      // Se não conseguir parsear JSON, usa mensagem padrão
      if (res.status === 401) {
        errorMessage = 'Credenciais inválidas. Verifique seu email e senha.';
      } else if (res.status === 404) {
        errorMessage = 'Recurso não encontrado';
      } else if (res.status >= 500) {
        errorMessage = 'Erro no servidor. Tente novamente mais tarde.';
      }
    }
    const error = new Error(errorMessage);
    (error as any).status = res.status;
    throw error;
  }
  
  return res.json();
}

export const api = {
  // Clientes
  getClients: (params?: string) => fetchAPI(`/clients${params ? `?${params}` : ''}`),
  getClient: (id: string) => fetchAPI(`/clients/${id}`),
  createClient: (data: any) => fetchAPI('/clients', { method: 'POST', body: JSON.stringify(data) }),
  updateClient: (id: string, data: any) => fetchAPI(`/clients/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  deleteClient: (id: string) => fetchAPI(`/clients/${id}`, { method: 'DELETE' }),
  
  // Processos
  getProcesses: (params?: string) => fetchAPI(`/processes${params ? `?${params}` : ''}`),
  getProcess: (id: string) => fetchAPI(`/processes/${id}`),
  createProcess: (data: any) => fetchAPI('/processes', { method: 'POST', body: JSON.stringify(data) }),
  updateProcess: (id: string, data: any) => fetchAPI(`/processes/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  deleteProcess: (id: string) => fetchAPI(`/processes/${id}`, { method: 'DELETE' }),
  
  // Tarefas
  getTasks: (params?: string) => fetchAPI(`/tasks${params ? `?${params}` : ''}`),
  getKanban: () => fetchAPI('/tasks/kanban'),
  createTask: (data: any) => fetchAPI('/tasks', { method: 'POST', body: JSON.stringify(data) }),
  updateTask: (id: string, data: any) => fetchAPI(`/tasks/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  deleteTask: (id: string) => fetchAPI(`/tasks/${id}`, { method: 'DELETE' }),
  
  // Financeiro
  getFinanceDashboard: () => fetchAPI('/finance/dashboard'),
  getHonorarios: (params?: string) => fetchAPI(`/finance/honorarios${params ? `?${params}` : ''}`),
  getMovimentacoes: (params?: string) => fetchAPI(`/finance/movimentacoes${params ? `?${params}` : ''}`),
  
  // Dashboard
  getDashboardStats: () => fetchAPI('/dashboard/stats'),
  getRecentProcesses: () => fetchAPI('/dashboard/recent-processes'),
  getUpcomingDeadlines: () => fetchAPI('/dashboard/upcoming-deadlines'),
  
  // Documentos
  getDocuments: (params?: string) => fetchAPI(`/documents${params ? `?${params}` : ''}`),
  uploadDocument: (formData: FormData) => fetch(`${API_URL}/documents/upload`, { method: 'POST', body: formData }),

  // Leads públicos
  createPublicLead: (data: any) => fetchAPI('/public/leads', { method: 'POST', body: JSON.stringify(data) }),
  
  // Auth
  login: (email: string, senha: string) =>
    fetchAPI('/auth/login', { method: 'POST', body: JSON.stringify({ email, senha }) }),
  me: () => fetchAPI('/auth/me'),
  
  // Usuários
  getUsers: () => fetchAPI('/users'),
};

