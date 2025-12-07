import { IsString, IsEmail, IsOptional, IsEnum, IsArray } from 'class-validator';

enum TipoPessoa {
  FISICA = 'FISICA',
  JURIDICA = 'JURIDICA',
}

export class CreateClientDto {
  @IsEnum(TipoPessoa)
  tipo: TipoPessoa;

  @IsString()
  nome: string;

  @IsString()
  @IsOptional()
  razaoSocial?: string;

  @IsString()
  cpfCnpj: string;

  @IsString()
  @IsOptional()
  rg?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  telefone?: string;

  @IsString()
  @IsOptional()
  celular?: string;

  @IsString()
  @IsOptional()
  observacoes?: string;

  @IsArray()
  @IsOptional()
  tags?: string[];
}

