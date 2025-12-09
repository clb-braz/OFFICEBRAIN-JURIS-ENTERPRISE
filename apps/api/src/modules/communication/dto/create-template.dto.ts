import {
  IsString,
  IsEnum,
  IsOptional,
  IsArray,
  IsBoolean,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TipoComunicacao } from '@prisma/client';

export class CreateTemplateDto {
  @ApiPropertyOptional({ description: 'ID do workspace' })
  @IsString()
  @IsOptional()
  workspaceId?: string;

  @ApiProperty({ description: 'Nome do template' })
  @IsString()
  nome: string;

  @ApiProperty({ enum: TipoComunicacao })
  @IsEnum(TipoComunicacao)
  tipo: TipoComunicacao;

  @ApiPropertyOptional({ description: 'Assunto' })
  @IsString()
  @IsOptional()
  assunto?: string;

  @ApiProperty({ description: 'Conteúdo do template (use {{cliente.nome}}, {{processo.numero}}, etc)' })
  @IsString()
  conteudo: string;

  @ApiPropertyOptional({ description: 'Variáveis disponíveis', type: [String] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  variaveis?: string[];

  @ApiPropertyOptional({ description: 'Ativo', default: true })
  @IsBoolean()
  @IsOptional()
  ativo?: boolean;
}

