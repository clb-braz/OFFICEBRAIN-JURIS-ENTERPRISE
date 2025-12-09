#!/usr/bin/env python3
"""
OCR Service - Tesseract HTTP Server
Microserviço para processamento OCR de documentos jurídicos
"""

from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import pytesseract
from pdf2image import convert_from_bytes
from PIL import Image
import io
import os
import tempfile
import logging

app = Flask(__name__)
CORS(app)

# Configurar logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Configurar Tesseract
TESSERACT_CONFIG = '--psm 6 -l por+eng'


@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint"""
    try:
        # Testar Tesseract
        pytesseract.get_tesseract_version()
        return jsonify({
            'status': 'healthy',
            'service': 'ocr-tesseract',
            'tesseract_version': pytesseract.get_tesseract_version()
        }), 200
    except Exception as e:
        return jsonify({
            'status': 'unhealthy',
            'error': str(e)
        }), 500


@app.route('/ocr', methods=['POST'])
def ocr():
    """
    Endpoint principal para OCR
    Aceita: PDF, PNG, JPG, JPEG
    Retorna: Texto extraído
    """
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'Nenhum arquivo enviado'}), 400

        file = request.files['file']
        if file.filename == '':
            return jsonify({'error': 'Arquivo vazio'}), 400

        # Salvar arquivo temporariamente
        with tempfile.NamedTemporaryFile(delete=False, suffix=os.path.splitext(file.filename)[1]) as tmp_file:
            file.save(tmp_file.name)
            tmp_path = tmp_file.name

        try:
            # Detectar tipo de arquivo
            file_ext = os.path.splitext(file.filename)[1].lower()
            
            if file_ext == '.pdf':
                # Processar PDF
                images = convert_from_bytes(open(tmp_path, 'rb').read(), dpi=300)
                text_parts = []
                
                for i, image in enumerate(images):
                    logger.info(f'Processando página {i+1} de {len(images)}')
                    text = pytesseract.image_to_string(image, config=TESSERACT_CONFIG)
                    text_parts.append(f'--- Página {i+1} ---\n{text}')
                
                extracted_text = '\n\n'.join(text_parts)
                
            elif file_ext in ['.png', '.jpg', '.jpeg', '.gif', '.bmp']:
                # Processar imagem
                image = Image.open(tmp_path)
                extracted_text = pytesseract.image_to_string(image, config=TESSERACT_CONFIG)
                
            else:
                return jsonify({'error': f'Formato não suportado: {file_ext}'}), 400

            # Retornar resultado
            return jsonify({
                'success': True,
                'text': extracted_text,
                'pages': len(images) if file_ext == '.pdf' else 1,
                'filename': file.filename
            }), 200

        finally:
            # Limpar arquivo temporário
            if os.path.exists(tmp_path):
                os.unlink(tmp_path)

    except Exception as e:
        logger.error(f'Erro no OCR: {str(e)}', exc_info=True)
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@app.route('/ocr/batch', methods=['POST'])
def ocr_batch():
    """
    Processamento em lote de múltiplos arquivos
    """
    try:
        if 'files' not in request.files:
            return jsonify({'error': 'Nenhum arquivo enviado'}), 400

        files = request.files.getlist('files')
        results = []

        for file in files:
            if file.filename == '':
                continue

            # Processar cada arquivo
            with tempfile.NamedTemporaryFile(delete=False, suffix=os.path.splitext(file.filename)[1]) as tmp_file:
                file.save(tmp_file.name)
                tmp_path = tmp_file.name

            try:
                file_ext = os.path.splitext(file.filename)[1].lower()
                
                if file_ext == '.pdf':
                    images = convert_from_bytes(open(tmp_path, 'rb').read(), dpi=300)
                    text_parts = []
                    for image in images:
                        text = pytesseract.image_to_string(image, config=TESSERACT_CONFIG)
                        text_parts.append(text)
                    extracted_text = '\n\n'.join(text_parts)
                elif file_ext in ['.png', '.jpg', '.jpeg', '.gif', '.bmp']:
                    image = Image.open(tmp_path)
                    extracted_text = pytesseract.image_to_string(image, config=TESSERACT_CONFIG)
                else:
                    results.append({
                        'filename': file.filename,
                        'success': False,
                        'error': f'Formato não suportado: {file_ext}'
                    })
                    continue

                results.append({
                    'filename': file.filename,
                    'success': True,
                    'text': extracted_text
                })

            finally:
                if os.path.exists(tmp_path):
                    os.unlink(tmp_path)

        return jsonify({
            'success': True,
            'results': results,
            'total': len(results)
        }), 200

    except Exception as e:
        logger.error(f'Erro no OCR batch: {str(e)}', exc_info=True)
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


if __name__ == '__main__':
    logger.info('Iniciando OCR Service na porta 8080...')
    app.run(host='0.0.0.0', port=8080, debug=False)

