import {
  IsString,
  IsOptional,
  IsEnum,
  IsNumber,
  IsDateString,
  IsArray,
  Validate,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { CNJValidator } from '../../../common/utils/cnj-validator';
import { AreaDireito, StatusProcesso, FaseProcessual } from '@prisma/client';

@ValidatorConstraint({ name: 'IsCNJ', async: false })
export class IsCNJConstraint implements ValidatorConstraintInterface {
  validate(cnj: string, args: ValidationArguments) {
    return CNJValidator.validate(cnj);
  }

  defaultMessage(args: ValidationArguments) {
    return 'Número CNJ inválido';
  }
}

export class CreateProcessDto {
  @IsString()
  @Validate(IsCNJConstraint)
  numeroCnj: string;

  @IsString()
  @IsOptional()
  numeroAntigo?: string;

  @IsString()
  tipoAcao: string;

  @IsString()
  @IsOptional()
  classeProcessual?: string;

  @IsString()
  @IsOptional()
  assuntoPrincipal?: string;

  @IsEnum(AreaDireito)
  area: AreaDireito;

  @IsEnum(StatusProcesso)
  @IsOptional()
  status?: StatusProcesso;

  @IsEnum(FaseProcessual)
  @IsOptional()
  fase?: FaseProcessual;

  @IsString()
  @IsOptional()
  vara?: string;

  @IsString()
  @IsOptional()
  foro?: string;

  @IsString()
  @IsOptional()
  comarca?: string;

  @IsString()
  @IsOptional()
  uf?: string;

  @IsString()
  @IsOptional()
  tribunal?: string;

  @IsNumber()
  @IsOptional()
  instancia?: number;

  @IsNumber()
  @IsOptional()
  valorCausa?: number;

  @IsNumber()
  @IsOptional()
  valorCondenacao?: number;

  @IsString()
  @IsOptional()
  objetoAcao?: string;

  @IsDateString()
  @IsOptional()
  dataDistribuicao?: string;

  @IsString()
  @IsOptional()
  clienteId?: string;

  @IsArray()
  @IsOptional()
  partes?: Array<{
    nome: string;
    cpfCnpj?: string;
    tipo: string;
    advogado?: string;
    oabAdvogado?: string;
  }>;

  @IsString()
  @IsOptional()
  advogadoResponsavelId?: string;
}

