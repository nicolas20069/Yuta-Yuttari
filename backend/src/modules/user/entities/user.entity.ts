import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, length: 100 })
  email: string;

  @Column({ length: 255 })
  password: string;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 20, nullable: true })
  phone?: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;
  @Column({ default: false, name: 'emailVerified' })
  emailVerified: boolean;

  @Column({ nullable: true, name: 'emailVerificationToken' })
  emailVerificationToken: string;

  @Column({ type: 'timestamp', nullable: true, name: 'emailVerificationTokenExpires' })
  emailVerificationTokenExpires: Date;

  @Column({ nullable: true, name: 'resetPasswordToken' })
  resetPasswordToken: string;

  @Column({ type: 'timestamp', nullable: true, name: 'resetPasswordExpires' })
  resetPasswordExpires: Date;

  @Column({ default: true, name: 'isActive' })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
