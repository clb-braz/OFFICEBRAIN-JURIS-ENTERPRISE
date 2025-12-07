import { IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordDto {
  @ApiProperty({ description: 'Senha atual' })
  @IsNotEmpty({ message: 'Senha atual e obrigatoria' })
  senhaAtual: string;

  @ApiProperty({ description: 'Nova senha' })
  @IsNotEmpty({ message: 'Nova senha e obrigatoria' })
  @MinLength(6, { message: 'Nova senha deve ter no minimo 6 caracteres' })
  novaSenha: string;
}

