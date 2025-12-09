import {
  IsString,
  IsOptional,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CompareVersionsDto {
  @ApiProperty({ description: 'ID da versão 1' })
  @IsString()
  versao1Id: string;

  @ApiProperty({ description: 'ID da versão 2' })
  @IsString()
  versao2Id: string;

  @ApiPropertyOptional({ description: 'ID do usuário que está comparando' })
  @IsString()
  @IsOptional()
  criadoPorId?: string;
}

