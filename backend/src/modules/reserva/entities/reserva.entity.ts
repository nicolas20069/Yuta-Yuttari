// entities/reserva.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { DetalleReserva } from './detalle-reserva.entity';
import { ReservaServicio } from './reserva-servicio.entity';
 

@Entity('reserva')
export class Reserva {
  @PrimaryGeneratedColumn()
  reservaID: number;

  @Column()
  idCliente: number;

  @Column()
  idEmpleado: number;

  @Column({ type: 'date' })
  fecha_inicio: Date;

  @Column({ type: 'date' })
  fecha_fin: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  costo_total: number;

  @Column({ type: 'varchar', length: 50 })
  metodo_pago: string;

  @Column({ 
    type: 'enum', 
    enum: ['pendiente', 'pagado', 'cancelado'],
    default: 'pendiente'
  })
  estado_pago: string;

  @OneToMany(() => DetalleReserva, detalle => detalle.reserva)
  detalles: DetalleReserva[];

  @OneToMany(() => ReservaServicio, reservaServicio => reservaServicio.reserva)
  servicios: ReservaServicio[];
  user: any;
}