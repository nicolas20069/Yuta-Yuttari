import { Module } from '@nestjs/common';
import { EmailService } from './email.service';

/**
 * Módulo de Email para envío de correos con Nodemailer
 */
@Module({
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
