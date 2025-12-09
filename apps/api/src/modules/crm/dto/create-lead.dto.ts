import {
  IsString,
  IsEnum,
  IsEmail,
  IsOptional,
  IsArray,
  IsBoolean,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { OrigemLead, StatusCRM, AreaDireito } from '@prisma/client';

export class CreateLeadDto {
  @ApiPropertyOptional({ description: 'ID do workspace' })
  @IsString()
  @IsOptional()
  workspaceId?: string;

  @ApiProperty({ description: 'Nome do lead' })
  @IsString()
  nome: string;

  @ApiPropertyOptional({ description: 'Email' })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({ description: 'Telefone' })
  @IsString()
  @IsOptional()
  telefone?: string;

  @ApiPropertyOptional({ description: 'WhatsApp' })
  @IsString()
  @IsOptional()
  whatsapp?: string;

  @ApiProperty({ enum: OrigemLead })
  @IsEnum(OrigemLead)
  origem: OrigemLead;

  @ApiPropertyOptional({ description: 'Origem detalhada' })
  @IsString()
  @IsOptional()
  origemDetalhada?: string;

  @ApiPropertyOptional({ enum: StatusCRM, default: 'LEAD' })
  @IsEnum(StatusCRM)
  @IsOptional()
  status?: StatusCRM;

  @ApiPropertyOptional({ enum: AreaDireito })
  @IsEnum(AreaDireito)
  @IsOptional()
  areaInteresse?: AreaDireito;

  @ApiPropertyOptional({ description: 'Assunto' })
  @IsString()
  @IsOptional()
  assunto?: string;

  @ApiPropertyOptional({ description: 'Observações' })
  @IsString()
  @IsOptional()
  observacoes?: string;

  @ApiPropertyOptional({ description: 'Tags', type: [String] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];

  @ApiPropertyOptional({ description: 'ID do responsável' })
  @IsString()
  @IsOptional()
  responsavelId?: string;
}

