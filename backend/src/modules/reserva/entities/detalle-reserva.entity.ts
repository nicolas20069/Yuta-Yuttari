// entities/detalle-reserva.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Reserva } from './reserva.entity';
 
@Entity('detalle-reserva')
export class DetalleReserva {
  @PrimaryGeneratedColumn()
  idDetalle: number;

  @Column()
  reservaID: number;

  @Column({ type: 'varchar', length: 50 })
  habitacion: string;

  @ManyToOne(() => Reserva, reserva => reserva.detalles)
  @JoinColumn({ name: 'reservaID' })
  reserva: Reserva;
}