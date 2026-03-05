// reserva/entities/reserva-servicio.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Reserva } from './reserva.entity';
import { Servicio } from './serivicios.entity';

@Entity('reserva-servicio')
export class ReservaServicio {
  @PrimaryGeneratedColumn()
  idReservaServicio: number;

  @Column({ type: 'int' })
  reservaID: number;

  @Column({ type: 'int' })
  idServicio: number;

  // Relaciones
  @ManyToOne(() => Reserva, reserva => reserva.servicios, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'reservaID' })
  reserva: Reserva;

  @ManyToOne(() => Servicio, servicio => servicio.reservaServicios)
  @JoinColumn({ name: 'idServicio' })
  servicio: Servicio;
}