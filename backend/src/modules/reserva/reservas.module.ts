// reserva/reserva.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reserva } from './entities/reserva.entity';
import { DetalleReserva } from './entities/detalle-reserva.entity';
import { ReservaServicio } from './entities/reserva-servicio.entity';
import { ReservaService } from './reservas.service';
import { ReservaController } from './reservas.controller';


@Module({
  imports: [
    TypeOrmModule.forFeature([
      Reserva,
      DetalleReserva,
      ReservaServicio,
    ])
  ],
  controllers: [ReservaController],
  providers: [ReservaService],
  exports: [ReservaService],
})
export class ReservaModule {}