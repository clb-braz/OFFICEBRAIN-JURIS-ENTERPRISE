import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenDto {
  @ApiProperty({ description: 'Refresh token' })
  @IsNotEmpty({ message: 'Refresh token e obrigatorio' })
  refresh_token: string;
}

