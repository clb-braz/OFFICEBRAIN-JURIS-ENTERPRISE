import { CNJValidator } from './cnj-validator';

describe('CNJValidator', () => {
  describe('validate', () => {
    it('deve validar CNJ válido', () => {
      const validCNJ = '00001234567890123456';
      expect(CNJValidator.validate(validCNJ)).toBe(true);
    });

    it('deve validar CNJ formatado', () => {
      const validCNJ = '0000123-45.2023.8.26.0001';
      expect(CNJValidator.validate(validCNJ)).toBe(true);
    });

    it('deve rejeitar CNJ inválido', () => {
      const invalidCNJ = '12345678901234567890';
      expect(CNJValidator.validate(invalidCNJ)).toBe(false);
    });

    it('deve rejeitar CNJ com tamanho incorreto', () => {
      const invalidCNJ = '12345';
      expect(CNJValidator.validate(invalidCNJ)).toBe(false);
    });

    it('deve rejeitar string vazia', () => {
      expect(CNJValidator.validate('')).toBe(false);
    });
  });

  describe('format', () => {
    it('deve formatar CNJ corretamente', () => {
      const cnj = '00001234567890123456';
      const formatted = CNJValidator.format(cnj);
      expect(formatted).toBe('0000123-45.6789.0.12.3456');
    });

    it('deve lançar erro para CNJ inválido', () => {
      expect(() => CNJValidator.format('12345')).toThrow();
    });
  });

  describe('unformat', () => {
    it('deve remover formatação do CNJ', () => {
      const formatted = '0000123-45.6789.0.12.3456';
      const unformatted = CNJValidator.unformat(formatted);
      expect(unformatted).toBe('00001234567890123456');
    });
  });

  describe('parse', () => {
    it('deve extrair informações do CNJ', () => {
      const cnj = '00001234567890123456';
      const parsed = CNJValidator.parse(cnj);
      
      expect(parsed.sequencial).toBe('0000123');
      expect(parsed.digitoVerificador).toBe('45');
      expect(parsed.ano).toBe('6789');
      expect(parsed.segmento).toBe('0');
      expect(parsed.tribunal).toBe('12');
      expect(parsed.origem).toBe('3456');
    });
  });
});

