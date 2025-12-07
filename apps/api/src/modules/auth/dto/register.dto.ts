import { IsEmail, IsNotEmpty, MinLength, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum PerfilUsuario {
  ADMIN = 'ADMIN',
  SOCIO = 'SOCIO',
  ADVOGADO = 'ADVOGADO',
  ESTAGIARIO = 'ESTAGIARIO',
  FINANCEIRO = 'FINANCEIRO',
  SECRETARIA = 'SECRETARIA',
}

export class RegisterDto {
  @ApiProperty({ example: 'joao@exemplo.com', description: 'Email do usuario' })
  @IsEmail({}, { message: 'Email invalido' })
  @IsNotEmpty({ message: 'Email e obrigatorio' })
  email: string;

  @ApiProperty({ example: 'Senha@123', description: 'Senha do usuario' })
  @IsNotEmpty({ message: 'Senha e obrigatoria' })
  @MinLength(6, { message: 'Senha deve ter no minimo 6 caracteres' })
  senha: string;

  @ApiProperty({ example: 'Joao da Silva', description: 'Nome completo' })
  @IsNotEmpty({ message: 'Nome e obrigatorio' })
  nome: string;

  @ApiPropertyOptional({ example: 'SP 123.456', description: 'Numero da OAB' })
  @IsOptional()
  oab?: string;

  @ApiPropertyOptional({ example: '(11) 99999-9999', description: 'Telefone' })
  @IsOptional()
  telefone?: string;

  @ApiPropertyOptional({ enum: PerfilUsuario, default: 'ADVOGADO' })
  @IsOptional()
  @IsEnum(PerfilUsuario)
  perfil?: PerfilUsuario;
}

