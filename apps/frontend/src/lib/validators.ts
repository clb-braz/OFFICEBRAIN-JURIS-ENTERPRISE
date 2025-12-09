/**
 * Validadores de formulário para o frontend
 */

export class CPFValidator {
  static validate(cpf: string): boolean {
    const cleanCPF = cpf.replace(/[^\d]/g, '');
    
    if (cleanCPF.length !== 11) return false;
    if (/^(\d)\1{10}$/.test(cleanCPF)) return false; // Todos os dígitos iguais

    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cleanCPF[i]) * (10 - i);
    }
    let digit = 11 - (sum % 11);
    if (digit >= 10) digit = 0;
    if (digit !== parseInt(cleanCPF[9])) return false;

    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cleanCPF[i]) * (11 - i);
    }
    digit = 11 - (sum % 11);
    if (digit >= 10) digit = 0;
    if (digit !== parseInt(cleanCPF[10])) return false;

    return true;
  }

  static format(cpf: string): string {
    const cleanCPF = cpf.replace(/[^\d]/g, '');
    if (cleanCPF.length !== 11) return cpf;
    return `${cleanCPF.substring(0, 3)}.${cleanCPF.substring(3, 6)}.${cleanCPF.substring(6, 9)}-${cleanCPF.substring(9)}`;
  }
}

export class CNPJValidator {
  static validate(cnpj: string): boolean {
    const cleanCNPJ = cnpj.replace(/[^\d]/g, '');
    
    if (cleanCNPJ.length !== 14) return false;
    if (/^(\d)\1{13}$/.test(cleanCNPJ)) return false;

    let length = cleanCNPJ.length - 2;
    let numbers = cleanCNPJ.substring(0, length);
    const digits = cleanCNPJ.substring(length);
    let sum = 0;
    let pos = length - 7;

    for (let i = length; i >= 1; i--) {
      sum += parseInt(numbers.charAt(length - i)) * pos--;
      if (pos < 2) pos = 9;
    }

    let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result !== parseInt(digits.charAt(0))) return false;

    length = length + 1;
    numbers = cleanCNPJ.substring(0, length);
    sum = 0;
    pos = length - 7;

    for (let i = length; i >= 1; i--) {
      sum += parseInt(numbers.charAt(length - i)) * pos--;
      if (pos < 2) pos = 9;
    }

    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result !== parseInt(digits.charAt(1))) return false;

    return true;
  }

  static format(cnpj: string): string {
    const cleanCNPJ = cnpj.replace(/[^\d]/g, '');
    if (cleanCNPJ.length !== 14) return cnpj;
    return `${cleanCNPJ.substring(0, 2)}.${cleanCNPJ.substring(2, 5)}.${cleanCNPJ.substring(5, 8)}/${cleanCNPJ.substring(8, 12)}-${cleanCNPJ.substring(12)}`;
  }
}

export class CNJValidator {
  static validate(cnj: string): boolean {
    // Formato: NNNNNNN-DD.AAAA.J.TR.OOOO
    const cleanCNJ = cnj.replace(/[^\d]/g, '');
    
    if (cleanCNJ.length !== 20) return false;

    // Verificação do dígito verificador
    const numero = cleanCNJ.substring(0, 7);
    const digito = parseInt(cleanCNJ.substring(7, 9));
    const ano = cleanCNJ.substring(9, 13);
    const segmento = cleanCNJ.substring(13, 14);
    const tribunal = cleanCNJ.substring(14, 16);
    const origem = cleanCNJ.substring(16, 20);

    // Cálculo do dígito verificador
    let sum = 0;
    const weights = [8, 7, 6, 5, 4, 3, 2];
    for (let i = 0; i < 7; i++) {
      sum += parseInt(numero[i]) * weights[i];
    }
    const calculatedDigit = 98 - (sum % 97);
    
    return calculatedDigit === digito;
  }

  static format(cnj: string): string {
    const cleanCNJ = cnj.replace(/[^\d]/g, '');
    if (cleanCNJ.length !== 20) return cnj;
    return `${cleanCNJ.substring(0, 7)}-${cleanCNJ.substring(7, 9)}.${cleanCNJ.substring(9, 13)}.${cleanCNJ.substring(13, 14)}.${cleanCNJ.substring(14, 16)}.${cleanCNJ.substring(16)}`;
  }
}

export class EmailValidator {
  static validate(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}

export class PhoneValidator {
  static validate(phone: string): boolean {
    const cleanPhone = phone.replace(/[^\d]/g, '');
    return cleanPhone.length >= 10 && cleanPhone.length <= 11;
  }

  static format(phone: string): string {
    const cleanPhone = phone.replace(/[^\d]/g, '');
    if (cleanPhone.length === 10) {
      return `(${cleanPhone.substring(0, 2)}) ${cleanPhone.substring(2, 6)}-${cleanPhone.substring(6)}`;
    } else if (cleanPhone.length === 11) {
      return `(${cleanPhone.substring(0, 2)}) ${cleanPhone.substring(2, 7)}-${cleanPhone.substring(7)}`;
    }
    return phone;
  }
}

