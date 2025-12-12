import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { envs } from '../../config/envs';
import { Resend } from 'resend';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { RegisterDto, LoginDto } from './dto';
import { User } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
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

    // Create user as inactive until email verification
    const user = await this.userService.create({
      email,
      password: hashedPassword,
      name,
      phone,
      isActive: false,
    });

    this.logger.log(`New user registered: ${email}`);

    // create verification token (expires in configured time)
    const verificationToken = this.jwtService.sign({ sub: user.id } as any, ({ expiresIn: envs.JWT_EXPIRES_IN || '1d' } as any));

    // Log verification link (in production send via email)
    const backendBase = `http://localhost:${envs.PORT}`;
    const verifyLink = `${backendBase}/api/auth/verify?token=${encodeURIComponent(verificationToken)}`;
    this.logger.log(`Email verification link (dev): ${verifyLink}`);

    // Send verification email if API key provided
    if (envs.RESEND_API_KEY) {
      try {
        const resend = new Resend(envs.RESEND_API_KEY as string);
        await resend.emails.send({
          from: envs.EMAIL_FROM,
          to: email,
          subject: 'Verifica tu correo - Yuta Yuttari',
          html: `<p>Hola ${user.name || ''},</p><p>Por favor verifica tu correo haciendo clic <a href="${verifyLink}">aquí</a>.</p><p>Si no solicitaste esto, ignora este mensaje.</p>`,
        });
        this.logger.log(`Verification email sent to ${email}`);
      } catch (err) {
        this.logger.error('Failed to send verification email', err);
      }
    } else {
      this.logger.log('RESEND_API_KEY not set — verification email not sent automatically');
    }

    // Return user without password and the verification token (frontend can build URL)
    const { password: _, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      message: 'User created. Please verify your email before logging in.',
      verificationToken,
    };
  }

  async resendVerification(email: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new ConflictException('Email not registered');
    }
    if (user.isActive) {
      return { message: 'Account already verified' };
    }

    const verificationToken = this.jwtService.sign({ sub: user.id } as any, ({ expiresIn: envs.JWT_EXPIRES_IN || '1d' } as any));
    const backendBase = `http://localhost:${envs.PORT}`;
    const verifyLink = `${backendBase}/api/auth/verify?token=${encodeURIComponent(verificationToken)}`;

    if (envs.RESEND_API_KEY) {
      try {
        const resend = new Resend(envs.RESEND_API_KEY as string);
        await resend.emails.send({
          from: envs.EMAIL_FROM,
          to: email,
          subject: 'Verifica tu correo - Yuta Yuttari',
          html: `<p>Hola ${user.name || ''},</p><p>Por favor verifica tu correo haciendo clic <a href="${verifyLink}">aquí</a>.</p>`,
        });
        this.logger.log(`Verification email re-sent to ${email}`);
      } catch (err) {
        this.logger.error('Failed to resend verification email', err);
      }
    } else {
      this.logger.log(`Resend skipped — link: ${verifyLink}`);
    }

    return { message: 'Verification email sent (if configured)' };
  }

  async verifyEmail(token: string) {
    try {
      const payload: any = this.jwtService.verify(token);
      const userId = payload.sub;
      this.logger.log(`Verifying email for user ID: ${userId}`);
      
      const user = await this.userService.findById(userId);
      if (!user) {
        this.logger.error(`User not found for ID: ${userId}`);
        throw new Error('User not found');
      }
      
      if (user.isActive) {
        this.logger.log(`User ${userId} is already verified`);
        return { message: 'Account already verified' };
      }
      
      this.logger.log(`Updating user ${userId} to isActive=true`);
      const updatedUser = await this.userService.update(userId, { isActive: true });
      this.logger.log(`User ${userId} verified successfully. isActive: ${updatedUser.isActive}`);
      
      return { message: 'Account verified successfully' };
    } catch (err) {
      this.logger.error('Email verification failed:', err);
      throw err;
    }
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
      throw new UnauthorizedException('User account is disabled');
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
