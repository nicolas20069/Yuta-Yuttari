import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { envs } from './config';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const logger = new Logger('App - Auth');

  const app = await NestFactory.create(AppModule);

  // app.use(helmet());
  app.use(cookieParser());

  app.setGlobalPrefix('api');

  app.enableCors({
    origin: (origin, callback) => {
      // allow requests with no origin (e.g., curl, mobile apps)
      if (!origin) return callback(null, true);
      const allowed = Array.isArray(envs.ALLOWED_ORIGINS)
        ? envs.ALLOWED_ORIGINS
        : [envs.ALLOWED_ORIGINS as unknown as string];
      if ((allowed as string[]).includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin'],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Yuta-Yuttari API')
    .setDescription('API documentation for Yuta-Yuttari application')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(envs.PORT);
  logger.log("App running on PORT:", envs.PORT);
}

bootstrap();


