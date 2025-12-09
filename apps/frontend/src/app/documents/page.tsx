'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  FileText, Plus, Search, ArrowLeft, Upload, File, FileImage, 
  FileSpreadsheet, Trash2, Download, Eye, Filter, Calendar,
  FolderOpen, X
} from 'lucide-react';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';

const API_URL = 'http://localhost:3001/api';

const CATEGORIAS = [
  'PETICAO_INICIAL', 'CONTESTACAO', 'RECURSO', 'CONTRATO', 
  'PROCURACAO', 'CERTIDAO', 'COMPROVANTE', 'LAUDO', 'OUTROS'
];

const CATEGORIA_LABELS: Record<string, string> = {
  PETICAO_INICIAL: 'Petição Inicial',
  CONTESTACAO: 'Contestação',
  RECURSO: 'Recurso',
  CONTRATO: 'Contrato',
  PROCURACAO: 'Procuração',
  CERTIDAO: 'Certidão',
  COMPROVANTE: 'Comprovante',
  LAUDO: 'Laudo Pericial',
  OUTROS: 'Outros',
};

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoriaFilter, setCategoriaFilter] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadForm, setUploadForm] = useState({ titulo: '', categoria: 'OUTROS', descricao: '' });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchDocuments = async () => {
    try {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (categoriaFilter) params.append('categoria', categoriaFilter);
      
      const res = await fetch(`${API_URL}/documents?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setDocuments(data.data || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchDocuments(); }, [search, categoriaFilter]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      if (!uploadForm.titulo) {
        setUploadForm(prev => ({ ...prev, titulo: file.name.replace(/\.[^/.]+$/, '') }));
      }
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('titulo', uploadForm.titulo);
      formData.append('categoria', uploadForm.categoria);
      formData.append('descricao', uploadForm.descricao);

      const res = await fetch(`${API_URL}/documents/upload`, {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        setShowUploadModal(false);
        setSelectedFile(null);
        setUploadForm({ titulo: '', categoria: 'OUTROS', descricao: '' });
        fetchDocuments();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; id: string | null }>({ open: false, id: null });

  const handleDelete = async (id: string) => {
    setDeleteDialog({ open: true, id });
  };

  const confirmDelete = async () => {
    if (!deleteDialog.id) return;
    try {
      await fetch(`${API_URL}/documents/${deleteDialog.id}`, { method: 'DELETE' });
      fetchDocuments();
    } catch (err) {
      console.error(err);
    }
  };

  const getFileIcon = (tipo: string) => {
    if (tipo?.includes('image')) return <FileImage className="w-6 h-6 text-purple-400" />;
    if (tipo?.includes('spreadsheet') || tipo?.includes('excel')) return <FileSpreadsheet className="w-6 h-6 text-emerald-400" />;
    return <File className="w-6 h-6 text-blue-400" />;
  };

  const formatFileSize = (bytes: number) => {
    if (!bytes) return '-';
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1048576).toFixed(1) + ' MB';
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
            <h1 className="text-xl font-bold text-white">Documentos</h1>
            <p className="text-muted-foreground text-sm">{documents.length} arquivos</p>
          </div>
        </div>
        <button 
          onClick={() => setShowUploadModal(true)} 
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-sm font-medium transition-colors"
        >
          <Upload className="w-4 h-4" /> Enviar Documento
        </button>
      </div>

      {/* Filtros */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar por título ou descrição..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-card border border-border text-sm focus:border-blue-500 outline-none"
          />
        </div>
        <select
          value={categoriaFilter}
          onChange={(e) => setCategoriaFilter(e.target.value)}
          className="px-3 py-2.5 rounded-lg bg-card border border-border text-sm outline-none min-w-[180px]"
        >
          <option value="">Todas as Categorias</option>
          {CATEGORIAS.map(cat => (
            <option key={cat} value={cat}>{CATEGORIA_LABELS[cat]}</option>
          ))}
        </select>
      </div>

      {/* Lista de Documentos */}
      {loading ? (
        <div className="text-center py-12 text-muted-foreground">Carregando...</div>
      ) : documents.length === 0 ? (
        <div className="text-center py-16">
          <FolderOpen className="w-20 h-20 text-dark-700 mx-auto mb-4" />
          <p className="text-muted-foreground text-lg mb-2">Nenhum documento encontrado</p>
          <p className="text-muted-foreground text-sm mb-4">Envie seu primeiro documento para começar</p>
          <button 
            onClick={() => setShowUploadModal(true)}
            className="text-blue-400 hover:text-blue-300 text-sm font-medium"
          >
            Enviar documento
          </button>
        </div>
      ) : (
        <div className="grid gap-3">
          {documents.map((doc) => (
            <div key={doc.id} className="bg-card rounded-xl p-4 border border-border hover:border-border transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                  {getFileIcon(doc.tipoArquivo)}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-white truncate">{doc.titulo}</h3>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="px-2 py-0.5 rounded bg-muted text-xs">
                      {CATEGORIA_LABELS[doc.categoria] || doc.categoria}
                    </span>
                    <span>{formatFileSize(doc.tamanho)}</span>
                    {doc.createdAt && (
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(doc.createdAt).toLocaleDateString('pt-BR')}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {doc.caminhoArquivo && (
                    <a
                      href={`${API_URL}/documents/download/${doc.id}`}
                      className="p-2 rounded-lg hover:bg-muted transition-colors"
                      title="Baixar"
                    >
                      <Download className="w-4 h-4 text-muted-foreground" />
                    </a>
                  )}
                  <button
                    onClick={() => handleDelete(doc.id)}
                    className="p-2 rounded-lg hover:bg-muted transition-colors"
                    title="Excluir"
                  >
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal de Upload */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-xl w-full max-w-md border border-border">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h2 className="text-lg font-semibold text-white">Enviar Documento</h2>
              <button onClick={() => setShowUploadModal(false)} className="p-1 rounded hover:bg-muted">
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
            <form onSubmit={handleUpload} className="p-4 space-y-4">
              {/* Área de Upload */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                  selectedFile ? 'border-blue-500 bg-blue-500/10' : 'border-border hover:border-border'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={handleFileSelect}
                  className="hidden"
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.gif"
                />
                {selectedFile ? (
                  <div className="flex items-center justify-center gap-3">
                    <File className="w-8 h-8 text-blue-400" />
                    <div className="text-left">
                      <p className="text-white font-medium">{selectedFile.name}</p>
                      <p className="text-sm text-muted-foreground">{formatFileSize(selectedFile.size)}</p>
                    </div>
                  </div>
                ) : (
                  <>
                    <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">Clique para selecionar um arquivo</p>
                    <p className="text-xs text-muted-foreground mt-1">PDF, DOC, DOCX, XLS, XLSX, Imagens</p>
                  </>
                )}
              </div>

              <div>
                <label className="block text-sm text-muted-foreground mb-1">Título *</label>
                <input
                  type="text"
                  required
                  value={uploadForm.titulo}
                  onChange={(e) => setUploadForm({ ...uploadForm, titulo: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-muted border border-border text-sm outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm text-muted-foreground mb-1">Categoria</label>
                <select
                  value={uploadForm.categoria}
                  onChange={(e) => setUploadForm({ ...uploadForm, categoria: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-muted border border-border text-sm outline-none focus:border-blue-500"
                >
                  {CATEGORIAS.map(cat => (
                    <option key={cat} value={cat}>{CATEGORIA_LABELS[cat]}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-muted-foreground mb-1">Descrição</label>
                <textarea
                  rows={2}
                  value={uploadForm.descricao}
                  onChange={(e) => setUploadForm({ ...uploadForm, descricao: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-muted border border-border text-sm outline-none focus:border-blue-500 resize-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="flex-1 px-4 py-2 rounded-lg border border-border text-muted-foreground hover:bg-muted transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={!selectedFile || uploading}
                  className="flex-1 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {uploading ? 'Enviando...' : 'Enviar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmDialog
        open={deleteDialog.open}
        onOpenChange={(open) => setDeleteDialog({ open, id: null })}
        onConfirm={confirmDelete}
        title="Excluir Documento"
        description="Tem certeza que deseja excluir este documento? Esta ação não pode ser desfeita."
        confirmText="Excluir"
        cancelText="Cancelar"
        variant="destructive"
      />
    </div>
  );
}

