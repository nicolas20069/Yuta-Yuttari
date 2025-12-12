import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy, LocalStrategy } from './strategies';
import { UserModule } from '../user/user.module';
import { EmailModule } from '../email/email.module';
import { envs } from '../../config';

@Module({
  imports: [
    UserModule,
    EmailModule,
    PassportModule,
    JwtModule.register({
      secret: envs.JWT_SECRET,
      signOptions: { 
        expiresIn: '24h',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, LocalStrategy],
  exports: [AuthService],
})
export class AuthModule {}
