import { IsEmail, IsString, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'user@example.com', description: 'User email' })
  @IsEmail({}, { message: 'Email must be valid' })
  email: string;

  @ApiProperty({ example: 'password123', description: 'User password', minLength: 6, maxLength: 50 })
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  @MaxLength(50, { message: 'Password must not exceed 50 characters' })
  password: string;

  @ApiProperty({ example: 'John Doe', description: 'User full name', minLength: 2, maxLength: 100 })
  @IsString()
  @MinLength(2, { message: 'Name must be at least 2 characters' })
  @MaxLength(100, { message: 'Name must not exceed 100 characters' })
  name: string;

  @ApiProperty({ example: '+1234567890', description: 'User phone number', minLength: 6, maxLength: 20 })
  @IsString()
  @MinLength(6, { message: 'Phone must be at least 6 characters' })
  @MaxLength(20, { message: 'Phone must not exceed 20 characters' })
  phone: string;
}
