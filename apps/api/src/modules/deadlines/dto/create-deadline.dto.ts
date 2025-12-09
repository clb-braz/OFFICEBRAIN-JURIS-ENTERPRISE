import {
  IsString,
  IsEnum,
  IsDateString,
  IsOptional,
  IsBoolean,
  IsNumber,
  Min,
  Max,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TipoPrazoDetalhado, NivelAlertaPrazo, OrigemPrazo, StatusPrazo, PrioridadeTarefa } from '@prisma/client';

export class CreateDeadlineDto {
  @ApiProperty({ description: 'ID do processo' })
  @IsString()
  processoId: string;

  @ApiProperty({ enum: TipoPrazoDetalhado })
  @IsEnum(TipoPrazoDetalhado)
  tipo: TipoPrazoDetalhado;

  @ApiPropertyOptional({ enum: String })
  @IsString()
  @IsOptional()
  tipoOriginal?: string;

  @ApiProperty({ description: 'Descrição do prazo' })
  @IsString()
  descricao: string;

  @ApiProperty({ description: 'Data limite do prazo', type: String, format: 'date-time' })
  @IsDateString()
  dataLimite: string;

  @ApiPropertyOptional({ enum: OrigemPrazo, default: 'MANUAL' })
  @IsEnum(OrigemPrazo)
  @IsOptional()
  origem?: OrigemPrazo;

  @ApiPropertyOptional({ description: 'ID do documento que originou o prazo' })
  @IsString()
  @IsOptional()
  documentoId?: string;

  @ApiPropertyOptional({ description: 'ID do responsável' })
  @IsString()
  @IsOptional()
  responsavelId?: string;

  @ApiPropertyOptional({ enum: StatusPrazo, default: 'PENDENTE' })
  @IsEnum(StatusPrazo)
  @IsOptional()
  status?: StatusPrazo;

  @ApiPropertyOptional({ enum: PrioridadeTarefa, default: 'MEDIA' })
  @IsEnum(PrioridadeTarefa)
  @IsOptional()
  prioridade?: PrioridadeTarefa;

  @ApiPropertyOptional({ description: 'Observações' })
  @IsString()
  @IsOptional()
  observacoes?: string;

  @ApiPropertyOptional({ description: 'Instruções para cumprimento' })
  @IsString()
  @IsOptional()
  instrucoes?: string;

  @ApiPropertyOptional({ description: 'Link relacionado' })
  @IsString()
  @IsOptional()
  linkRelacionado?: string;

  @ApiPropertyOptional({ description: 'Se foi criado por IA', default: false })
  @IsBoolean()
  @IsOptional()
  criadoPorIA?: boolean;

  @ApiPropertyOptional({ description: 'Confiança da IA (0-1)', minimum: 0, maximum: 1 })
  @IsNumber()
  @Min(0)
  @Max(1)
  @IsOptional()
  confiancaIA?: number;
}

