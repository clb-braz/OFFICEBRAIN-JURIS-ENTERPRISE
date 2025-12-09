import { IsString, IsEmail, IsOptional, IsArray, IsInt, IsEnum } from 'class-validator';

export class CreateLeadDto {
  @IsString()
  nomeEscritorio: string;

  @IsString()
  nomeAdvogado: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  telefone?: string;

  @IsArray()
  @IsString({ each: true })
  areasAtuacao: string[];

  @IsInt()
  @IsOptional()
  mediaNovosClientes?: number;

  @IsString()
  @IsOptional()
  tamanhoEquipe?: string;

  @IsString()
  @IsOptional()
  desafiosPrincipais?: string;

  @IsString()
  @IsOptional()
  mensagem?: string;

  @IsString()
  @IsOptional()
  origem?: string;
}

