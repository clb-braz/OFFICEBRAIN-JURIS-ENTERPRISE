import { IsEmail, IsOptional, IsString, IsArray } from 'class-validator';

export class PublicLeadDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  officeName?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  practiceAreas?: string[];

  @IsOptional()
  @IsString()
  message?: string;
}

