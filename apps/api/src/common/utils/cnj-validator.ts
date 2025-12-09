/**
 * Validador de número CNJ (Conselho Nacional de Justiça)
 * Formato: NNNNNNN-DD.AAAA.J.TR.OOOO
 */
export class CNJValidator {
  /**
   * Valida se um número CNJ é válido
   * @param cnj Número CNJ com ou sem formatação
   * @returns true se válido, false caso contrário
   */
  static validate(cnj: string): boolean {
    if (!cnj) return false;

    // Remove formatação
    const cleanCNJ = cnj.replace(/[^\d]/g, '');

    // Deve ter exatamente 20 dígitos
    if (cleanCNJ.length !== 20) return false;

    // Extrai componentes
    const sequence = cleanCNJ.substring(0, 13);
    const dv1 = parseInt(cleanCNJ.substring(13, 14));
    const dv2 = parseInt(cleanCNJ.substring(14, 15));

    // Valida primeiro dígito verificador
    let sum = 0;
    const weights = [2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4, 5, 6];
    
    for (let i = 0; i < sequence.length; i++) {
      sum += parseInt(sequence[i]) * weights[i];
    }

    const remainder = sum % 97;
    const calculatedDV1 = 98 - remainder;

    if (calculatedDV1 !== dv1) return false;

    // Valida segundo dígito verificador
    const sequenceWithDV1 = sequence + dv1.toString();
    sum = 0;
    
    for (let i = 0; i < sequenceWithDV1.length; i++) {
      sum += parseInt(sequenceWithDV1[i]) * weights[i];
    }

    const remainder2 = sum % 97;
    const calculatedDV2 = 98 - remainder2;

    return calculatedDV2 === dv2;
  }

  /**
   * Formata um número CNJ no padrão oficial
   * @param cnj Número CNJ sem formatação
   * @returns CNJ formatado (NNNNNNN-DD.AAAA.J.TR.OOOO)
   */
  static format(cnj: string): string {
    const cleanCNJ = cnj.replace(/[^\d]/g, '');
    
    if (cleanCNJ.length !== 20) {
      throw new Error('CNJ deve ter 20 dígitos');
    }

    return `${cleanCNJ.substring(0, 7)}-${cleanCNJ.substring(7, 9)}.${cleanCNJ.substring(9, 13)}.${cleanCNJ.substring(13, 14)}.${cleanCNJ.substring(14, 16)}.${cleanCNJ.substring(16)}`;
  }

  /**
   * Remove formatação do CNJ
   * @param cnj CNJ formatado
   * @returns CNJ apenas com números
   */
  static unformat(cnj: string): string {
    return cnj.replace(/[^\d]/g, '');
  }

  /**
   * Extrai informações do CNJ
   * @param cnj Número CNJ
   * @returns Objeto com informações extraídas
   */
  static parse(cnj: string): {
    sequencial: string;
    digitoVerificador: string;
    ano: string;
    segmento: string;
    tribunal: string;
    origem: string;
  } {
    const cleanCNJ = this.unformat(cnj);
    
    if (cleanCNJ.length !== 20) {
      throw new Error('CNJ inválido');
    }

    return {
      sequencial: cleanCNJ.substring(0, 7),
      digitoVerificador: cleanCNJ.substring(7, 9),
      ano: cleanCNJ.substring(9, 13),
      segmento: cleanCNJ.substring(13, 14),
      tribunal: cleanCNJ.substring(14, 16),
      origem: cleanCNJ.substring(16, 20),
    };
  }
}

