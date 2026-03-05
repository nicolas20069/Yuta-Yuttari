import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  Logger,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { envs } from '../../config/envs';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { UserService } from '../user/user.service';
import { EmailService } from '../email/email.service';
import { RegisterDto, LoginDto } from './dto';
import { User } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { email, password, name, phone } = registerDto;

    // Check if user already exists
    const existingUser = await this.userService.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate email verification token
    const emailVerificationToken = crypto.randomBytes(32).toString('hex');

    // Create user as inactive until email verification
    const user = await this.userService.create({
      email,
      password: hashedPassword,
      name,
      phone,
      isActive: false,
      emailVerified: false,
      emailVerificationToken,
    });

    this.logger.log(`New user registered: ${email}`);

    // Send verification email
    try {
      await this.emailService.sendVerificationEmail(
        email,
        name,
        emailVerificationToken,
      );
      this.logger.log(`Verification email sent to ${email}`);
    } catch (error) {
      this.logger.error(`Failed to send verification email to ${email}:`, error);
      // Don't throw error, user is created but email failed
    }

    // Return user without password
    const { password: _, emailVerificationToken: __, ...userWithoutSensitiveData } = user;

    return {
      user: userWithoutSensitiveData,
      message: 'User created. Please check your email to verify your account.',
    };
  }

  async resendVerification(email: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('Email not registered');
    }
    if (user.emailVerified) {
      return { message: 'Account already verified' };
    }

    // Generate new verification token
    const emailVerificationToken = crypto.randomBytes(32).toString('hex');
    await this.userService.update(user.id, { emailVerificationToken });

    try {
      await this.emailService.sendVerificationEmail(
        email,
        user.name,
        emailVerificationToken,
      );
      this.logger.log(`Verification email re-sent to ${email}`);
    } catch (error) {
      this.logger.error(`Failed to resend verification email to ${email}:`, error);
      throw new Error('Failed to send verification email');
    }

    return { message: 'Verification email sent successfully' };
  }

  async verifyEmail(token: string) {
    try {
      this.logger.log(`Attempting to verify email with token: ${token.substring(0, 10)}...`);
      
      // Find user by verification token
      const user = await this.userService.findOne({
        where: { emailVerificationToken: token },
      });

      this.logger.log(`User found: ${user ? 'Yes' : 'No'}`);

      if (!user) {
        this.logger.warn(`No user found with verification token`);
        throw new BadRequestException('Invalid or expired verification token');
      }

      if (user.emailVerified) {
        this.logger.log(`User ${user.email} already verified`);
        return { message: 'Account already verified' };
      }

      // Update user
      await this.userService.update(user.id, {
        emailVerified: true,
        isActive: true,
        emailVerificationToken: undefined,
      });

      this.logger.log(`User ${user.email} (${user.id}) verified successfully`);

      return { message: 'Account verified successfully. You can now log in.' };
    } catch (err) {
      this.logger.error('Email verification failed:', err);
      throw err;
    }
  }

  async forgotPassword(email: string) {
    const user = await this.userService.findByEmail(email);
    
    // Don't reveal if user exists or not for security
    if (!user) {
      return { 
        message: 'If the email exists, a password reset link has been sent.' 
      };
    }

    // Generate reset token
    const resetPasswordToken = crypto.randomBytes(32).toString('hex');
    const resetPasswordExpires = new Date(Date.now() + 86400000); // 24 hour

    await this.userService.update(user.id, {
      resetPasswordToken,
      resetPasswordExpires,
    });

    try {
      await this.emailService.sendPasswordResetEmail(
        email,
        user.name,
        resetPasswordToken,
      );
      this.logger.log(`Password reset email sent to ${email}`);
    } catch (error) {
      this.logger.error(`Failed to send password reset email to ${email}:`, error);
      // Don't throw error for security reasons
    }

    return { 
      message: 'If the email exists, a password reset link has been sent.' 
    };
  }

  async resetPassword(token: string, newPassword: string) {
    // Find user by reset token
    const user = await this.userService.findOne({
      where: { resetPasswordToken: token },
    });

    if (!user) {
      throw new BadRequestException('Invalid or expired reset token');
    }

    // Check if token is expired
    console.log(`resetPasswordExpires from DB: ${user.resetPasswordExpires}`);
    console.log(`Current Date: ${new Date()}`);
    if (!user.resetPasswordExpires || user.resetPasswordExpires < new Date()) {
      throw new BadRequestException('Reset token has expired');
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user password and clear reset token
    await this.userService.update(user.id, {
      password: hashedPassword,
      resetPasswordToken: undefined,
      resetPasswordExpires: undefined,
    });

    this.logger.log(`Password reset successfully for user ${user.id}`);

    // Send confirmation email
    try {
      await this.emailService.sendPasswordChangedEmail(user.email, user.name);
    } catch (error) {
      this.logger.error(`Failed to send password changed email to ${user.email}:`, error);
    }

    return { message: 'Password has been reset successfully. You can now log in with your new password.' };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Validate user
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    this.logger.log(`User logged in: ${email}`);

    // Generate tokens
    const tokens = await this.generateTokens(user);

    // Return user without password
    const { password: _, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      ...tokens,
    };
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return null;
    }

    if (!user.isActive) {
      throw new UnauthorizedException('Please verify your email before logging in');
    }

    if (!user.emailVerified) {
      throw new UnauthorizedException('Please verify your email before logging in');
    }

    return user;
  }

  async generateTokens(user: User) {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = this.jwtService.sign(payload as any);

    return {
      accessToken,
      tokenType: 'Bearer',
    };
  }

  async validateToken(userId: string): Promise<User | null> {
    return this.userService.findById(userId);
  }
}
