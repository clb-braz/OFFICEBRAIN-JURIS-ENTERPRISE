import { PartialType } from '@nestjs/mapped-types';
import { CreateProcessDto } from './create-process.dto';
import { IsOptional, IsString, Validate } from 'class-validator';
import { CNJValidator } from '../../../common/utils/cnj-validator';
import { IsCNJConstraint } from './create-process.dto';

export class UpdateProcessDto extends PartialType(CreateProcessDto) {
  @IsString()
  @IsOptional()
  @Validate(IsCNJConstraint)
  numeroCnj?: string;
}

