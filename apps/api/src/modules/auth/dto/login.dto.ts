import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'admin@officebrain.com.br', description: 'Email do usuario' })
  @IsEmail({}, { message: 'Email invalido' })
  @IsNotEmpty({ message: 'Email e obrigatorio' })
  email: string;

  @ApiProperty({ example: 'OfficeBrain@2024', description: 'Senha do usuario' })
  @IsNotEmpty({ message: 'Senha e obrigatoria' })
  @MinLength(6, { message: 'Senha deve ter no minimo 6 caracteres' })
  senha: string;
}

