import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { Transporter } from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: Transporter;
  private readonly logger = new Logger(EmailService.name);

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Verificar la configuración del transporter
    this.transporter.verify((error, success) => {
      if (error) {
        this.logger.error('Error al configurar el servicio de email:', error);
      } else {
        this.logger.log('Servicio de email configurado correctamente');
      }
    });
  }

  /**
   * Enviar email de verificación de cuenta
   */
  async sendVerificationEmail(
    email: string,
    name: string,
    token: string,
  ): Promise<void> {
    const verificationUrl = `${process.env.FRONTEND_URL}/verify?token=${token}`;

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Verifica tu cuenta - Yuta Yuttari',
      html: `
       <!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verifica tu correo - Yuta Yuttari</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f7; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  
  <!-- Wrapper principal -->
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f4f4f7;">
    <tr>
      <td style="padding: 40px 20px;">
        
        <!-- Container principal -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="margin: 0 auto; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); overflow: hidden;">
          
          <!-- Header con gradiente -->
          <tr>
            <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">
                 Yuta Yuttari
              </h1>
              <p style="margin: 10px 0 0; color: #f0f0ff; font-size: 16px; font-weight: 400;">
                Tu portal de servicios japoneses
              </p>
            </td>
          </tr>
          
          <!-- Contenido principal -->
          <tr>
            <td style="padding: 40px 30px;">
              
              <!-- Saludo -->
              <h2 style="margin: 0 0 20px; color: #1a1a1a; font-size: 24px; font-weight: 600;">
                ¡Hola, ${name}! 
              </h2>
              
              <!-- Mensaje principal -->
              <p style="margin: 0 0 20px; color: #4a5568; font-size: 16px; line-height: 1.6;">
                Gracias por unirte a <strong style="color: #667eea;">Yuta Yuttari</strong>. Estamos emocionados de tenerte con nosotros.
              </p>
              
              <p style="margin: 0 0 30px; color: #4a5568; font-size: 16px; line-height: 1.6;">
                Para comenzar a disfrutar de todos nuestros servicios, necesitamos verificar tu correo electrónico.
              </p>
              
              <!-- Botón CTA -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td align="center" style="padding: 10px 0 30px;">
                    <a href="${verificationUrl}" 
                       style="display: inline-block; 
                              padding: 16px 40px; 
                              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                              color: #ffffff; 
                              text-decoration: none; 
                              border-radius: 8px; 
                              font-size: 16px; 
                              font-weight: 600;
                              box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
                              transition: all 0.3s ease;">
                      ✓ Verificar mi cuenta
                    </a>
                  </td>
                </tr>
              </table>
              
              <!-- Divider -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 20px 0;">
                <tr>
                  <td style="border-top: 1px solid #e2e8f0;"></td>
                </tr>
              </table>
              
              <!-- Link alternativo -->
              <p style="margin: 20px 0 10px; color: #718096; font-size: 14px; line-height: 1.5;">
                ¿Problemas con el botón? Copia y pega este enlace en tu navegador:
              </p>
              
              <div style="background-color: #f7fafc; 
                          padding: 15px; 
                          border-radius: 6px; 
                          border-left: 4px solid #667eea;
                          margin-bottom: 30px;">
                <p style="margin: 0; 
                          color: #667eea; 
                          font-size: 13px; 
                          word-break: break-all; 
                          font-family: 'Courier New', monospace;">
                  ${verificationUrl}
                </p>
              </div>
              
              <!-- Info importante -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #fef5e7; border-radius: 8px; border: 1px solid #f9e79f;">
                <tr>
                  <td style="padding: 20px;">
                    <p style="margin: 0 0 10px; color: #d68910; font-size: 14px; font-weight: 600;">
                       Importante:
                    </p>
                    <p style="margin: 0; color: #7d6608; font-size: 14px; line-height: 1.5;">
                      Este enlace de verificación <strong>expirará en 24 horas</strong>. Si no verificas tu cuenta en ese tiempo, deberás solicitar un nuevo enlace.
                    </p>
                  </td>
                </tr>
              </table>
              
              <!-- Nota de seguridad -->
              <p style="margin: 30px 0 0; color: #a0aec0; font-size: 13px; line-height: 1.5; font-style: italic;">
                 Si no creaste una cuenta en Yuta Yuttari, puedes ignorar este correo de forma segura.
              </p>
              
            </td>
          </tr>
          
          <!-- Footer con información adicional -->
          <tr>
            <td style="background-color: #f8f9fa; padding: 30px; border-top: 1px solid #e2e8f0;">
              
              <!-- Redes sociales / Links -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td align="center" style="padding-bottom: 20px;">
                    <a href="#" style="color: #667eea; text-decoration: none; margin: 0 15px; font-size: 14px;">Inicio</a>
                    <span style="color: #cbd5e0;">|</span>
                    <a href="#" style="color: #667eea; text-decoration: none; margin: 0 15px; font-size: 14px;">Ayuda</a>
                    <span style="color: #cbd5e0;">|</span>
                    <a href="#" style="color: #667eea; text-decoration: none; margin: 0 15px; font-size: 14px;">Contacto</a>
                  </td>
                </tr>
              </table>
              
              <!-- Copyright -->
              <p style="margin: 0; text-align: center; color: #a0aec0; font-size: 12px;">
                © ${new Date().getFullYear()} Yuta Yuttari. Todos los derechos reservados.
              </p>
              
              <p style="margin: 10px 0 0; text-align: center; color: #cbd5e0; font-size: 11px;">
                Bogotá, Colombia
              </p>
              
            </td>
          </tr>
          
        </table>
        <!-- Fin container principal -->
        
      </td>
    </tr>
  </table>
  <!-- Fin wrapper -->
  
</body>
</html>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      this.logger.log(`Email de verificación enviado a ${email}`);
    } catch (error) {
      this.logger.error(`Error al enviar email de verificación a ${email}:`, error);
      throw new Error('No se pudo enviar el email de verificación');
    }
  }

  /**
   * Enviar email de recuperación de contraseña
   */
  async sendPasswordResetEmail(
    email: string,
    name: string,
    token: string,
  ): Promise<void> {
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Recuperación de contraseña - Yuta Yuttari',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; padding: 12px 30px; background: #f5576c; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .warning { background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Recuperación de Contraseña</h1>
            </div>
            <div class="content">
              <h2>Hola ${name},</h2>
              <p>Recibimos una solicitud para restablecer la contraseña de tu cuenta en Yuta Yuttari.</p>
              <p>Haz clic en el siguiente botón para crear una nueva contraseña:</p>
              <div style="text-align: center;">
                <a href="${resetUrl}" class="button">Restablecer mi contraseña</a>
              </div>
              <p>O copia y pega este enlace en tu navegador:</p>
              <p style="word-break: break-all; color: #f5576c;">${resetUrl}</p>
              <div class="warning">
                <strong>⚠️ Importante:</strong>
                <ul>
                  <li>Este enlace expirará en 1 hora</li>
                  <li>Solo puedes usar este enlace una vez</li>
                  <li>Si no solicitaste este cambio, ignora este correo</li>
                </ul>
              </div>
              <p>Por seguridad, tu contraseña actual seguirá siendo válida hasta que establezcas una nueva.</p>
            </div>
            <div class="footer">
              <p>© ${new Date().getFullYear()} Yuta Yuttari. Todos los derechos reservados.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      this.logger.log(`Email de recuperación de contraseña enviado a ${email}`);
    } catch (error) {
      this.logger.error(`Error al enviar email de recuperación a ${email}:`, error);
      throw new Error('No se pudo enviar el email de recuperación');
    }
  }

  /**
   * Enviar email de confirmación de cambio de contraseña
   */
  async sendPasswordChangedEmail(email: string, name: string): Promise<void> {
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Contraseña actualizada - Yuta Yuttari',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .success { background: #d4edda; border-left: 4px solid #28a745; padding: 15px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✓ Contraseña Actualizada</h1>
            </div>
            <div class="content">
              <h2>Hola ${name},</h2>
              <div class="success">
                <strong>✓ Éxito:</strong> Tu contraseña ha sido actualizada correctamente.
              </div>
              <p>Este es un correo de confirmación para informarte que la contraseña de tu cuenta en Yuta Yuttari ha sido cambiada exitosamente.</p>
              <p><strong>Detalles del cambio:</strong></p>
              <ul>
                <li>Fecha: ${new Date().toLocaleString('es-ES', { timeZone: 'America/Bogota' })}</li>
                <li>Cuenta: ${email}</li>
              </ul>
              <p>Si no realizaste este cambio, por favor contacta con nuestro equipo de soporte inmediatamente.</p>
            </div>
            <div class="footer">
              <p>© ${new Date().getFullYear()} Yuta Yuttari. Todos los derechos reservados.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      this.logger.log(`Email de confirmación de cambio de contraseña enviado a ${email}`);
    } catch (error) {
      this.logger.error(`Error al enviar email de confirmación a ${email}:`, error);
      throw new Error('No se pudo enviar el email de confirmación');
    }
  }

  /**
   * Enviar email genérico (para pruebas u otros propósitos)
   */
  async sendEmail(
    to: string,
    subject: string,
    html: string,
  ): Promise<void> {
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to,
      subject,
      html,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      this.logger.log(`Email enviado a ${to}`);
    } catch (error) {
      this.logger.error(`Error al enviar email a ${to}:`, error);
      throw new Error('No se pudo enviar el email');
    }
  }
}
