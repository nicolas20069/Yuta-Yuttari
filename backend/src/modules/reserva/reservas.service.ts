// reserva/reserva.service.ts
import { 
  Injectable, 
  NotFoundException, 
  BadRequestException 
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Reserva } from './entities/reserva.entity';
import { DetalleReserva } from './entities/detalle-reserva.entity';
import { ReservaServicio } from './entities/reserva-servicio.entity';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';
 


@Injectable()
export class ReservaService {
  constructor(
    @InjectRepository(Reserva)
    private reservaRepository: Repository<Reserva>,
    
    @InjectRepository(DetalleReserva)
    private detalleRepository: Repository<DetalleReserva>,
    
    @InjectRepository(ReservaServicio)
    private reservaServicioRepository: Repository<ReservaServicio>,
  ) {}

  // ==================== CREAR RESERVA ====================
  async create(createReservaDto: CreateReservaDto): Promise<Reserva> {
    // Verificar disponibilidad de habitaciones
    const disponible = await this.verificarDisponibilidad(
      createReservaDto.habitaciones,
      new Date(createReservaDto.fecha_inicio),
      new Date(createReservaDto.fecha_fin)
    );

    if (!disponible) {
      throw new BadRequestException(
        'Una o más habitaciones no están disponibles en las fechas seleccionadas'
      );
    }

    // Crear la reserva principal
    const reserva = this.reservaRepository.create({
      idCliente: createReservaDto.idCliente,
      idEmpleado: createReservaDto.idEmpleado,
      fecha_inicio: new Date(createReservaDto.fecha_inicio),
      fecha_fin: new Date(createReservaDto.fecha_fin),
      costo_total: createReservaDto.costo_total,
      metodo_pago: createReservaDto.metodo_pago,
      estado_pago: createReservaDto.estado_pago || 'pendiente',
    });

    const reservaGuardada = await this.reservaRepository.save(reserva);

    // Crear los detalles de reserva (habitaciones)
    if (createReservaDto.habitaciones && createReservaDto.habitaciones.length > 0) {
      for (const habitacion of createReservaDto.habitaciones) {
        const detalle = this.detalleRepository.create({
          reservaID: reservaGuardada.reservaID,
          habitacion: habitacion,
        });
        await this.detalleRepository.save(detalle);
      }
    }

    // Crear relación con servicios
    if (createReservaDto.servicios && createReservaDto.servicios.length > 0) {
      for (const servicioId of createReservaDto.servicios) {
        const reservaServicio = this.reservaServicioRepository.create({
          reservaID: reservaGuardada.reservaID,
          idServicio: servicioId,
        });
        await this.reservaServicioRepository.save(reservaServicio);
      }
    }

    return this.findOne(reservaGuardada.reservaID);
  }

  // ==================== OBTENER TODAS LAS RESERVAS ====================
  async findAll(): Promise<Reserva[]> {
    return this.reservaRepository.find({
      relations: ['cliente', 'empleado', 'detalles', 'servicios', 'servicios.servicio'],
      order: { reservaID: 'DESC' },
    });
  }

  // ==================== OBTENER UNA RESERVA POR ID ====================
  async findOne(id: number): Promise<Reserva> {
    const reserva = await this.reservaRepository.findOne({
      where: { reservaID: id },
      relations: ['cliente', 'empleado', 'detalles', 'servicios', 'servicios.servicio'],
    });

    if (!reserva) {
      throw new NotFoundException(`Reserva con ID ${id} no encontrada`);
    }

    return reserva;
  }

  // ==================== ACTUALIZAR RESERVA ====================
  async update(id: number, updateReservaDto: UpdateReservaDto): Promise<Reserva> {
    const reserva = await this.findOne(id);

    // Verificar disponibilidad si se actualizan fechas o habitaciones
    if (updateReservaDto.fecha_inicio || updateReservaDto.fecha_fin || updateReservaDto.habitaciones) {
      const habitaciones = updateReservaDto.habitaciones || 
        reserva.detalles.map(d => d.habitacion);
      
      const fechaInicio = updateReservaDto.fecha_inicio 
        ? new Date(updateReservaDto.fecha_inicio) 
        : reserva.fecha_inicio;
      
      const fechaFin = updateReservaDto.fecha_fin 
        ? new Date(updateReservaDto.fecha_fin) 
        : reserva.fecha_fin;

      const disponible = await this.verificarDisponibilidad(
        habitaciones,
        fechaInicio,
        fechaFin,
        id
      );

      if (!disponible) {
        throw new BadRequestException('No hay disponibilidad para las fechas seleccionadas');
      }
    }

    // Actualizar campos de la reserva
    if (updateReservaDto.idCliente !== undefined) reserva.idCliente = updateReservaDto.idCliente;
    if (updateReservaDto.idEmpleado !== undefined) reserva.idEmpleado = updateReservaDto.idEmpleado;
    if (updateReservaDto.fecha_inicio) reserva.fecha_inicio = new Date(updateReservaDto.fecha_inicio);
    if (updateReservaDto.fecha_fin) reserva.fecha_fin = new Date(updateReservaDto.fecha_fin);
    if (updateReservaDto.costo_total !== undefined) reserva.costo_total = updateReservaDto.costo_total;
    if (updateReservaDto.metodo_pago) reserva.metodo_pago = updateReservaDto.metodo_pago;
    if (updateReservaDto.estado_pago) reserva.estado_pago = updateReservaDto.estado_pago;

    await this.reservaRepository.save(reserva);

    // Actualizar habitaciones
    if (updateReservaDto.habitaciones) {
      await this.detalleRepository.delete({ reservaID: id });
      
      for (const habitacion of updateReservaDto.habitaciones) {
        const detalle = this.detalleRepository.create({
          reservaID: id,
          habitacion: habitacion,
        });
        await this.detalleRepository.save(detalle);
      }
    }

    // Actualizar servicios
    if (updateReservaDto.servicios) {
      await this.reservaServicioRepository.delete({ reservaID: id });
      
      for (const servicioId of updateReservaDto.servicios) {
        const reservaServicio = this.reservaServicioRepository.create({
          reservaID: id,
          idServicio: servicioId,
        });
        await this.reservaServicioRepository.save(reservaServicio);
      }
    }

    return this.findOne(id);
  }

  // ==================== ELIMINAR RESERVA ====================
  async remove(id: number): Promise<void> {
    const reserva = await this.findOne(id);
    
    // Eliminar detalles y servicios asociados
    await this.detalleRepository.delete({ reservaID: id });
    await this.reservaServicioRepository.delete({ reservaID: id });
    
    await this.reservaRepository.remove(reserva);
  }

  // ==================== CAMBIAR ESTADO DE PAGO ====================
  async cambiarEstadoPago(id: number, estado: 'pendiente' | 'pagado' | 'cancelado'): Promise<Reserva> {
    const reserva = await this.findOne(id);
    reserva.estado_pago = estado;
    await this.reservaRepository.save(reserva);
    return this.findOne(id);
  }

  // ==================== MARCAR COMO PAGADA ====================
  async marcarComoPagada(id: number): Promise<Reserva> {
    return this.cambiarEstadoPago(id, 'pagado');
  }

  // ==================== CANCELAR RESERVA ====================
  async cancelarReserva(id: number): Promise<Reserva> {
    return this.cambiarEstadoPago(id, 'cancelado');
  }

  // ==================== OBTENER RESERVAS POR CLIENTE ====================
  async findByCliente(idCliente: number): Promise<Reserva[]> {
    return this.reservaRepository.find({
      where: { idCliente },
      relations: ['cliente', 'empleado', 'detalles', 'servicios', 'servicios.servicio'],
      order: { fecha_inicio: 'DESC' },
    });
  }

  // ==================== OBTENER RESERVAS POR EMPLEADO ====================
  async findByEmpleado(idEmpleado: number): Promise<Reserva[]> {
    return this.reservaRepository.find({
      where: { idEmpleado },
      relations: ['cliente', 'empleado', 'detalles', 'servicios', 'servicios.servicio'],
      order: { fecha_inicio: 'DESC' },
    });
  }

  // ==================== OBTENER RESERVAS POR RANGO DE FECHAS ====================
  async findByDateRange(fechaInicio: Date, fechaFin: Date): Promise<Reserva[]> {
    return this.reservaRepository.find({
      where: {
        fecha_inicio: Between(fechaInicio, fechaFin),
      },
      relations: ['cliente', 'empleado', 'detalles', 'servicios', 'servicios.servicio'],
      order: { fecha_inicio: 'ASC' },
    });
  }

  // ==================== OBTENER RESERVAS POR ESTADO DE PAGO ====================
  async findByEstadoPago(estado: 'pendiente' | 'pagado' | 'cancelado'): Promise<Reserva[]> {
    return this.reservaRepository.find({
      where: { estado_pago: estado },
      relations: ['cliente', 'empleado', 'detalles', 'servicios', 'servicios.servicio'],
      order: { fecha_inicio: 'DESC' },
    });
  }

  // ==================== OBTENER RESERVAS ACTIVAS ====================
  async findReservasActivas(): Promise<Reserva[]> {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    return this.reservaRepository
      .createQueryBuilder('reserva')
      .leftJoinAndSelect('reserva.cliente', 'cliente')
      .leftJoinAndSelect('reserva.empleado', 'empleado')
      .leftJoinAndSelect('reserva.detalles', 'detalles')
      .leftJoinAndSelect('reserva.servicios', 'servicios')
      .leftJoinAndSelect('servicios.servicio', 'servicio')
      .where('reserva.fecha_fin >= :hoy', { hoy })
      .andWhere('reserva.estado_pago != :cancelado', { cancelado: 'cancelado' })
      .orderBy('reserva.fecha_inicio', 'ASC')
      .getMany();
  }

  // ==================== OBTENER RESERVAS DEL DÍA ====================
  async findReservasDelDia(fecha?: Date): Promise<Reserva[]> {
    const fechaBusqueda = fecha || new Date();
    fechaBusqueda.setHours(0, 0, 0, 0);

    const inicioDia = new Date(fechaBusqueda);
    const finDia = new Date(fechaBusqueda);
    finDia.setHours(23, 59, 59, 999);

    return this.reservaRepository
      .createQueryBuilder('reserva')
      .leftJoinAndSelect('reserva.cliente', 'cliente')
      .leftJoinAndSelect('reserva.empleado', 'empleado')
      .leftJoinAndSelect('reserva.detalles', 'detalles')
      .leftJoinAndSelect('reserva.servicios', 'servicios')
      .leftJoinAndSelect('servicios.servicio', 'servicio')
      .where('reserva.fecha_inicio <= :finDia', { finDia })
      .andWhere('reserva.fecha_fin >= :inicioDia', { inicioDia })
      .orderBy('reserva.fecha_inicio', 'ASC')
      .getMany();
  }

  // ==================== OBTENER HABITACIONES DISPONIBLES ====================
  async getHabitacionesDisponibles(fechaInicio: Date, fechaFin: Date): Promise<string[]> {
    // Asumiendo que tienes una lista de habitaciones disponibles
    const todasLasHabitaciones = ['101', '102', '103', '104', '105', '201', '202', '203', '204', '205'];

    const detallesOcupados = await this.detalleRepository
      .createQueryBuilder('detalle')
      .innerJoin('detalle.reserva', 'reserva')
      .where('reserva.estado_pago != :cancelado', { cancelado: 'cancelado' })
      .andWhere(
        '(reserva.fecha_inicio <= :fechaFin AND reserva.fecha_fin >= :fechaInicio)',
        { fechaInicio, fechaFin }
      )
      .getMany();

    const habitacionesOcupadas = detallesOcupados.map(d => d.habitacion);
    
    return todasLasHabitaciones.filter(h => !habitacionesOcupadas.includes(h));
  }

  // ==================== VERIFICAR DISPONIBILIDAD ====================
  private async verificarDisponibilidad(
    habitaciones: string[],
    fechaInicio: Date,
    fechaFin: Date,
    excluirReservaId?: number
  ): Promise<boolean> {
    for (const habitacion of habitaciones) {
      const detallesOcupados = await this.detalleRepository
        .createQueryBuilder('detalle')
        .innerJoin('detalle.reserva', 'reserva')
        .where('detalle.habitacion = :habitacion', { habitacion })
        .andWhere('reserva.estado_pago != :cancelado', { cancelado: 'cancelado' })
        .andWhere(
          '(reserva.fecha_inicio <= :fechaFin AND reserva.fecha_fin >= :fechaInicio)',
          { fechaInicio, fechaFin }
        )
        .andWhere(excluirReservaId ? 'reserva.reservaID != :excluirId' : '1=1', 
          { excluirId: excluirReservaId })
        .getMany();

      if (detallesOcupados.length > 0) {
        return false;
      }
    }

    return true;
  }

  // ==================== OBTENER ESTADÍSTICAS ====================
  async getEstadisticas() {
    const total = await this.reservaRepository.count();
    const pendientes = await this.reservaRepository.count({ 
      where: { estado_pago: 'pendiente' } 
    });
    const pagadas = await this.reservaRepository.count({ 
      where: { estado_pago: 'pagado' } 
    });
    const canceladas = await this.reservaRepository.count({ 
      where: { estado_pago: 'cancelado' } 
    });

    const totalIngresos = await this.reservaRepository
      .createQueryBuilder('reserva')
      .select('SUM(reserva.costo_total)', 'total')
      .where('reserva.estado_pago = :estado', { estado: 'pagado' })
      .getRawOne();

    return {
      total,
      pendientes,
      pagadas,
      canceladas,
      totalIngresos: parseFloat(totalIngresos.total) || 0,
    };
  }

  // ==================== OBTENER ESTADÍSTICAS POR PERIODO ====================
  async getEstadisticasPorPeriodo(fechaInicio: Date, fechaFin: Date) {
    const reservas = await this.reservaRepository
      .createQueryBuilder('reserva')
      .where('reserva.fecha_inicio BETWEEN :fechaInicio AND :fechaFin', {
        fechaInicio,
        fechaFin,
      })
      .getMany();

    const totalReservas = reservas.length;
    const totalIngresos = reservas
      .filter(r => r.estado_pago === 'pagado')
      .reduce((sum, r) => sum + Number(r.costo_total), 0);

    const promedioIngreso = totalReservas > 0 ? totalIngresos / totalReservas : 0;

    return {
      periodo: {
        inicio: fechaInicio,
        fin: fechaFin,
      },
      totalReservas,
      totalIngresos,
      promedioIngreso: parseFloat(promedioIngreso.toFixed(2)),
      pendientes: reservas.filter(r => r.estado_pago === 'pendiente').length,
      pagadas: reservas.filter(r => r.estado_pago === 'pagado').length,
      canceladas: reservas.filter(r => r.estado_pago === 'cancelado').length,
    };
  }

  // ==================== AGREGAR SERVICIO A RESERVA ====================
  async agregarServicio(reservaId: number, servicioId: number): Promise<Reserva> {
    const reserva = await this.findOne(reservaId);

    // Verificar si el servicio ya está agregado
    const existente = await this.reservaServicioRepository.findOne({
      where: { reservaID: reservaId, idServicio: servicioId },
    });

    if (existente) {
      throw new BadRequestException('El servicio ya está agregado a esta reserva');
    }

    const reservaServicio = this.reservaServicioRepository.create({
      reservaID: reservaId,
      idServicio: servicioId,
    });

    await this.reservaServicioRepository.save(reservaServicio);

    return this.findOne(reservaId);
  }

  // ==================== ELIMINAR SERVICIO DE RESERVA ====================
  async eliminarServicio(reservaId: number, servicioId: number): Promise<Reserva> {
    const reservaServicio = await this.reservaServicioRepository.findOne({
      where: { reservaID: reservaId, idServicio: servicioId },
    });

    if (!reservaServicio) {
      throw new NotFoundException('El servicio no está asociado a esta reserva');
    }

    await this.reservaServicioRepository.remove(reservaServicio);

    return this.findOne(reservaId);
  }

  // ==================== CONTAR RESERVAS ====================
  async count(): Promise<number> {
    return this.reservaRepository.count();
  }
}