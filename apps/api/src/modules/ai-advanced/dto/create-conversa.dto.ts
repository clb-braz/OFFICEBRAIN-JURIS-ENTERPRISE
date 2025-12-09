import {
  IsString,
  IsOptional,
  IsBoolean,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateConversaDto {
  @ApiPropertyOptional({ description: 'ID do workspace' })
  @IsString()
  @IsOptional()
  workspaceId?: string;

  @ApiPropertyOptional({ description: 'ID do usuário' })
  @IsString()
  @IsOptional()
  usuarioId?: string;

  @ApiPropertyOptional({ description: 'Título da conversa' })
  @IsString()
  @IsOptional()
  titulo?: string;

  @ApiPropertyOptional({ description: 'Contexto da conversa' })
  @IsString()
  @IsOptional()
  contexto?: string;

  @ApiPropertyOptional({ description: 'ID do processo relacionado' })
  @IsString()
  @IsOptional()
  processoId?: string;

  @ApiPropertyOptional({ description: 'Ativa', default: true })
  @IsBoolean()
  @IsOptional()
  ativa?: boolean;
}

