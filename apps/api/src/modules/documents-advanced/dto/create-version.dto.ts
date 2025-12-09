import {
  IsString,
  IsOptional,
  IsArray,
  IsInt,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateVersionDto {
  @ApiProperty({ description: 'URL do arquivo' })
  @IsString()
  arquivoUrl: string;

  @ApiPropertyOptional({ description: 'Caminho do arquivo no servidor' })
  @IsString()
  @IsOptional()
  arquivoPath?: string;

  @ApiPropertyOptional({ description: 'Mensagem de commit (como Git)' })
  @IsString()
  @IsOptional()
  mensagemCommit?: string;

  @ApiPropertyOptional({ description: 'ID do autor' })
  @IsString()
  @IsOptional()
  autorId?: string;

  @ApiPropertyOptional({ description: 'Tags (como Git)', type: [String] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];

  @ApiPropertyOptional({ description: 'Branch (padrão: main)', default: 'main' })
  @IsString()
  @IsOptional()
  branch?: string;
}

