import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import type { Multer } from 'multer';
import { User } from './entities/user.entity';
import * as path from 'path';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { email },
    });
  }

  async findById(id: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { id },
    });
  }

  async findOne(options: any): Promise<User | null> {
    return this.userRepository.findOne(options);
  }

  async create(data: {
    email: string;
    password: string;
    name: string;
    phone?: string;
    isActive?: boolean;
    emailVerified?: boolean;
    emailVerificationToken?: string;
  }): Promise<User> {
    const user = this.userRepository.create(data);
    return this.userRepository.save(user);
  }

  async update(id: string, data: Partial<User>): Promise<User> {
    const user = await this.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    Object.assign(user, data);
    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find({
      where: { isActive: true },
    });
  }

  async uploadAvatar(userId: string, file: Multer.File): Promise<User> {
    const user = await this.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // El archivo ya fue guardado por multer en diskStorage
    // Solo necesitamos actualizar la URL en la base de datos
    const filename = path.basename(file.path);
    
    // Update user with avatar URL
    user.avatar = `/uploads/${filename}`;
    return this.userRepository.save(user);
  }
}
