import {
  IsString,
  IsEnum,
  IsOptional,
  IsNumber,
  Min,
  Max,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TipoAnaliseIA } from '@prisma/client';

export class CreateAnaliseDto {
  @ApiPropertyOptional({ description: 'ID do workspace' })
  @IsString()
  @IsOptional()
  workspaceId?: string;

  @ApiProperty({ enum: TipoAnaliseIA })
  @IsEnum(TipoAnaliseIA)
  tipo: TipoAnaliseIA;

  @ApiPropertyOptional({ description: 'ID do processo' })
  @IsString()
  @IsOptional()
  processoId?: string;

  @ApiPropertyOptional({ description: 'ID do documento' })
  @IsString()
  @IsOptional()
  documentoId?: string;

  @ApiPropertyOptional({ description: 'ID do usuário' })
  @IsString()
  @IsOptional()
  usuarioId?: string;

  @ApiPropertyOptional({ description: 'Modelo de IA', default: 'gpt-4o' })
  @IsString()
  @IsOptional()
  modelo?: string;
}

