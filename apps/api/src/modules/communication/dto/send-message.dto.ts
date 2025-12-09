import {
  IsString,
  IsEnum,
  IsOptional,
  IsArray,
  IsBoolean,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TipoComunicacao, StatusComunicacao } from '@prisma/client';

export class SendMessageDto {
  @ApiPropertyOptional({ description: 'ID do workspace' })
  @IsString()
  @IsOptional()
  workspaceId?: string;

  @ApiProperty({ description: 'ID do cliente' })
  @IsString()
  clienteId: string;

  @ApiPropertyOptional({ description: 'ID do processo' })
  @IsString()
  @IsOptional()
  processoId?: string;

  @ApiProperty({ enum: TipoComunicacao })
  @IsEnum(TipoComunicacao)
  tipo: TipoComunicacao;

  @ApiProperty({ description: 'Canal (WHATSAPP, EMAIL, SMS, SISTEMA)' })
  @IsString()
  canal: string;

  @ApiPropertyOptional({ description: 'Assunto' })
  @IsString()
  @IsOptional()
  assunto?: string;

  @ApiProperty({ description: 'Conteúdo da mensagem' })
  @IsString()
  conteudo: string;

  @ApiPropertyOptional({ description: 'Anexos (URLs)', type: [String] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  anexos?: string[];

  @ApiPropertyOptional({ description: 'ID do remetente' })
  @IsString()
  @IsOptional()
  remetenteId?: string;

  @ApiPropertyOptional({ description: 'Destinatário (email ou telefone)' })
  @IsString()
  @IsOptional()
  destinatario?: string;

  @ApiPropertyOptional({ description: 'ID do template' })
  @IsString()
  @IsOptional()
  templateId?: string;

  @ApiPropertyOptional({ description: 'Se é automática', default: false })
  @IsBoolean()
  @IsOptional()
  automatica?: boolean;
}

