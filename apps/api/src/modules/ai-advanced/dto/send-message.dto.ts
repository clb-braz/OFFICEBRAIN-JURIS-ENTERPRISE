import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SendMessageDto {
  @ApiProperty({ description: 'Mensagem do usuário' })
  @IsString()
  mensagem: string;
}

