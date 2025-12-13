import { 
  Controller, Post, Body, Get, UseGuards, 
  HttpCode, HttpStatus, Query, BadRequestException 
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto, ResendDto, ForgotPasswordDto, ResetPasswordDto } from './dto';
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

  // ✅ RUTA CORREGIDA - IMPORTANTE
  @Get('verify')
  @HttpCode(HttpStatus.OK)
  async verifyEmail(@Query('token') token: string) {
    console.log('🔍 Ruta /auth/verify llamada con token:', token); // Debug
    
    if (!token) {
      throw new BadRequestException('Token de verificación requerido');
    }
    
    return this.authService.verifyEmail(token);
  }

  @Post('resend')
  @HttpCode(HttpStatus.OK)
  async resend(@Body() body: ResendDto) {
    return this.authService.resendVerification(body.email);
  }

  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.forgotPassword(forgotPasswordDto.email);
  }

  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(
      resetPasswordDto.token,
      resetPasswordDto.newPassword,
    );
    
  }
}