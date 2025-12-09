# ============================================
# OCR Service - Tesseract HTTP Server
# Microserviço para OCR de documentos jurídicos
# ============================================

FROM python:3.11-slim

WORKDIR /app

# Instalar Tesseract OCR e dependências
RUN apt-get update && apt-get install -y \
    tesseract-ocr \
    tesseract-ocr-por \
    tesseract-ocr-eng \
    libtesseract-dev \
    poppler-utils \
    imagemagick \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Instalar dependências Python
RUN pip install --no-cache-dir \
    flask \
    flask-cors \
    pytesseract \
    pdf2image \
    pillow \
    requests

# Criar diretório para uploads temporários
RUN mkdir -p /tmp/ocr && chmod 777 /tmp/ocr

# Copiar servidor OCR
COPY ocr-server.py /app/ocr-server.py

# Expor porta
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=20s --retries=3 \
  CMD curl -f http://localhost:8080/health || exit 1

# Comando de inicialização
CMD ["python", "ocr-server.py"]

