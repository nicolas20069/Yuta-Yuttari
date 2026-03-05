// servicio/entities/servicio.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ReservaServicio } from './reserva-servicio.entity';

@Entity('servicio')
export class Servicio {
  @PrimaryGeneratedColumn()
  idServicio: number;

  @Column({ type: 'varchar', length: 150 })
  descripcion: string;

  // Relación
  @OneToMany(() => ReservaServicio, reservaServicio => reservaServicio.servicio)
  reservaServicios: ReservaServicio[];
}