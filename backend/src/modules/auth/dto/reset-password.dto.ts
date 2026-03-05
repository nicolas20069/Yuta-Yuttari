import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto {
  @ApiProperty({ example: 'token123', description: 'Reset token' })
  @IsString()
  @IsNotEmpty()
  token: string;

  @ApiProperty({ example: 'newPassword123', description: 'New password', minLength: 6 })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  newPassword: string;
}
