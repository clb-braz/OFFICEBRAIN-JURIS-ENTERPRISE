import {
  IsString,
  IsEnum,
  IsDateString,
  IsOptional,
  IsBoolean,
  IsArray,
  IsInt,
  Min,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TipoEventoAgenda, StatusEventoAgenda } from '@prisma/client';

export class CreateEventoDto {
  @ApiPropertyOptional({ description: 'ID do workspace' })
  @IsString()
  @IsOptional()
  workspaceId?: string;

  @ApiProperty({ enum: TipoEventoAgenda })
  @IsEnum(TipoEventoAgenda)
  tipo: TipoEventoAgenda;

  @ApiProperty({ description: 'Título do evento' })
  @IsString()
  titulo: string;

  @ApiPropertyOptional({ description: 'Descrição' })
  @IsString()
  @IsOptional()
  descricao?: string;

  @ApiProperty({ description: 'Data de início', type: String, format: 'date-time' })
  @IsDateString()
  dataInicio: string;

  @ApiPropertyOptional({ description: 'Data de fim', type: String, format: 'date-time' })
  @IsDateString()
  @IsOptional()
  dataFim?: string;

  @ApiPropertyOptional({ description: 'Duração em minutos' })
  @IsInt()
  @Min(1)
  @IsOptional()
  duracaoMinutos?: number;

  @ApiPropertyOptional({ description: 'Horário' })
  @IsString()
  @IsOptional()
  horario?: string;

  @ApiPropertyOptional({ description: 'Local' })
  @IsString()
  @IsOptional()
  local?: string;

  @ApiPropertyOptional({ description: 'Endereço' })
  @IsString()
  @IsOptional()
  endereco?: string;

  @ApiPropertyOptional({ description: 'Link virtual' })
  @IsString()
  @IsOptional()
  linkVirtual?: string;

  @ApiPropertyOptional({ description: 'Sala' })
  @IsString()
  @IsOptional()
  sala?: string;

  @ApiPropertyOptional({ description: 'ID do processo' })
  @IsString()
  @IsOptional()
  processoId?: string;

  @ApiPropertyOptional({ description: 'ID do cliente' })
  @IsString()
  @IsOptional()
  clienteId?: string;

  @ApiPropertyOptional({ description: 'ID do responsável' })
  @IsString()
  @IsOptional()
  responsavelId?: string;

  @ApiPropertyOptional({ description: 'IDs dos participantes', type: [String] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  participantesIds?: string[];

  @ApiPropertyOptional({ enum: StatusEventoAgenda, default: 'AGENDADO' })
  @IsEnum(StatusEventoAgenda)
  @IsOptional()
  status?: StatusEventoAgenda;

  @ApiPropertyOptional({ description: 'Observações' })
  @IsString()
  @IsOptional()
  observacoes?: string;

  @ApiPropertyOptional({ description: 'IDs de documentos relacionados', type: [String] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  documentos?: string[];
}

