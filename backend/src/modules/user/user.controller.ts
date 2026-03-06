import { Controller, Get, Patch, Body, UseGuards, HttpCode, HttpStatus, Post, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { User } from './entities/user.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';
import type { Multer } from 'multer';
import * as path from 'path';
import * as fs from 'fs';

@ApiTags('Users')
@Controller('user')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UserController {
  // Configuración para multer
  private readonly uploadDir = path.join(process.cwd(), 'uploads');
  private readonly maxFileSize = 5 * 1024 * 1024; // 5MB
  private readonly allowedMimes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  private readonly allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];

  constructor(private readonly userService: UserService) {
    // Crear carpeta de uploads si no existe
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir, { recursive: true });
    }
  }

  // Método privado para obtener configuración de multer
  private getMulterOptions() {
    const self = this;
    return {
      storage: diskStorage({
        destination: (req, file, cb) => {
          cb(null, path.join(process.cwd(), 'uploads'));
        },
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = path.extname(file.originalname);
          const name = path.basename(file.originalname, ext);
          cb(null, `${name}-${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter: (req: any, file: any, cb: any) => {
        const ext = path.extname(file.originalname).toLowerCase();
        if (!self.allowedExtensions.includes(ext)) {
          return cb(
            new BadRequestException(
              `Extensión no permitida: ${ext}. Solo se aceptan: ${self.allowedExtensions.join(', ')}`
            ),
            false
          );
        }
        if (!self.allowedMimes.includes(file.mimetype)) {
          return cb(
            new BadRequestException(
              `Tipo MIME no permitido: ${file.mimetype}. Solo se aceptan: ${self.allowedMimes.join(', ')}`
            ),
            false
          );
        }
        cb(null, true);
      },
      limits: {
        fileSize: self.maxFileSize,
      },
    };
  }

  @Get('obtener_perfil')
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({ status: 200, description: 'Return user profile.' })
  async getProfile(@GetUser() user: User) {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  @Patch('me')
  @ApiOperation({ summary: 'Update current user profile' })
  @ApiResponse({ status: 200, description: 'Profile successfully updated.' })
  @ApiBody({ type: UpdateUserDto })
  async updateProfile(
    @GetUser() user: User,
    @Body() updateData: UpdateUserDto,
  ) {
    const updatedUser = await this.userService.update(user.id, updateData);
    const { password, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
  }

  @Post('avatar')
  @UseInterceptors(FileInterceptor('avatar', {
    storage: diskStorage({
      destination: (req, file, cb) => {
        const uploadDir = path.join(process.cwd(), 'uploads');
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
      },
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname);
        const name = path.basename(file.originalname, ext);
        cb(null, `${name}-${uniqueSuffix}${ext}`);
      },
    }),
  }))
  @ApiOperation({ summary: 'Upload user avatar' })
  @ApiResponse({ status: 201, description: 'Avatar uploaded successfully.' })
  @ApiResponse({ 
    status: 400, 
    description: 'Bad request - Invalid file, file too large, or invalid type' 
  })
  @ApiConsumes('multipart/form-data')
  @HttpCode(HttpStatus.CREATED)
  async uploadAvatar(
    @GetUser() user: User,
    @UploadedFile() file: Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException(
        'No se proporcionó archivo. El archivo es requerido.'
      );
    }

    // Validar extensión
    const fileExt = path.extname(file.originalname).toLowerCase();
    if (!this.allowedExtensions.includes(fileExt)) {
      // Eliminar archivo si fue guardado
      if (file.path) {
        try {
          fs.unlinkSync(file.path);
        } catch (e) {
          /* ignore */
        }
      }
      throw new BadRequestException(
        `Extensión no permitida: ${fileExt}. Solo se aceptan: ${this.allowedExtensions.join(', ')}`
      );
    }

    // Validar MIME type
    if (!this.allowedMimes.includes(file.mimetype)) {
      // Eliminar archivo
      if (file.path) {
        try {
          fs.unlinkSync(file.path);
        } catch (e) {
          /* ignore */
        }
      }
      throw new BadRequestException(
        `Tipo de archivo no permitido: ${file.mimetype}. Solo se aceptan: ${this.allowedMimes.join(', ')}`
      );
    }

    // Validar tamaño
    if (file.size > this.maxFileSize) {
      // Eliminar archivo
      if (file.path) {
        try {
          fs.unlinkSync(file.path);
        } catch (e) {
          /* ignore */
        }
      }
      throw new BadRequestException(
        `Archivo demasiado grande. Tamaño máximo: ${this.maxFileSize / 1024 / 1024}MB. Tu archivo: ${(file.size / 1024 / 1024).toFixed(2)}MB`
      );
    }

    try {
      const updatedUser = await this.userService.uploadAvatar(user.id, file);
      const { password, ...userWithoutPassword } = updatedUser;
      return { 
        ...userWithoutPassword,
        url: updatedUser.avatar,
        message: 'Avatar actualizado exitosamente',
      };
    } catch (error) {
      // Limpiar archivo en caso de error
      if (file.path) {
        try {
          fs.unlinkSync(file.path);
        } catch (e) {
          /* ignore */
        }
      }
      throw error;
    }
  }
}
