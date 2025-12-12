import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { envs } from './config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: envs.DB_HOST || 'localhost',
      port: envs.DB_PORT || 3306,
      username: envs.DB_USER || 'root',
      password: envs.DB_PASSWORD || '',
      database: envs.DB_NAME || 'bdgestion_hoteles',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: envs.DB_SYNC || false, // Set to false in production
      logging: true,
    }),
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
