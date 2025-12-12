import { Controller, Post, Body, Get, UseGuards, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto, ResendDto } from './dto';
import { JwtAuthGuard } from './guards';
import { GetUser } from './decorators';
import { User } from '../user/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@GetUser() user: User) {
    const { password, ...userWithoutPassword } = user;
    return {
      user: userWithoutPassword,
    };
  }

  @Get('validate')
  @UseGuards(JwtAuthGuard)
  async validateToken(@GetUser() user: User) {
    return {
      valid: true,
      userId: user.id,
    };
  }

  @Get('verify')
  async verifyEmail(@Query('token') token: string) {
    if (!token) {
      return { message: 'Token is required', status: 'error' };
    }
    try {
      const result = await this.authService.verifyEmail(token);
      return { ...result, status: 'success' };
    } catch (err: any) {
      return { 
        message: err.message || 'Invalid or expired verification token',
        status: 'error'
      };
    }
  }

  @Post('resend')
  @HttpCode(HttpStatus.OK)
  async resend(@Body() body: ResendDto) {
    return this.authService.resendVerification(body.email);
  }
}
