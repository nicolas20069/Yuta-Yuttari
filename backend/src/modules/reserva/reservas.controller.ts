// reserva/reserva.controller.ts
import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete,
  Query,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
  UseGuards,
  Req
} from '@nestjs/common';
import { ReservaService } from './reservas.service';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('reservas')
@UseGuards(JwtAuthGuard)
export class ReservaController {
  constructor(private readonly reservaService: ReservaService) {}

  // Obtener mis reservas (usuario autenticado)
  @Get('mis-reservas')
  async getMisReservas(@Req() req) {
    // Assuming the user ID is in req.user.id (standard NestJS Passport behavior)
    return this.reservaService.findByCliente(req.user.id);
  }

  // Crear reserva
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createReservaDto: CreateReservaDto) {
    return this.reservaService.create(createReservaDto);
  }

  // Obtener todas las reservas
  @Get()
  findAll() {
    return this.reservaService.findAll();
  }

  // Obtener estadísticas generales
  @Get('estadisticas')
  getEstadisticas() {
    return this.reservaService.getEstadisticas();
  }

  // Obtener estadísticas por periodo
  @Get('estadisticas/periodo')
  getEstadisticasPorPeriodo(
    @Query('fechaInicio') fechaInicio: string,
    @Query('fechaFin') fechaFin: string,
  ) {
    return this.reservaService.getEstadisticasPorPeriodo(
      new Date(fechaInicio),
      new Date(fechaFin)
    );
  }

  // Obtener reservas activas
  @Get('activas')
  findReservasActivas() {
    return this.reservaService.findReservasActivas();
  }

  // Obtener reservas del día
  @Get('del-dia')
  findReservasDelDia(@Query('fecha') fecha?: string) {
    const fechaBusqueda = fecha ? new Date(fecha) : new Date();
    return this.reservaService.findReservasDelDia(fechaBusqueda);
  }

  // Obtener habitaciones disponibles
  @Get('habitaciones-disponibles')
  getHabitacionesDisponibles(
    @Query('fechaInicio') fechaInicio: string,
    @Query('fechaFin') fechaFin: string,
  ) {
    return this.reservaService.getHabitacionesDisponibles(
      new Date(fechaInicio),
      new Date(fechaFin)
    );
  }

  // Obtener reservas por cliente
  @Get('cliente/:idCliente')
  findByCliente(@Param('idCliente') idCliente: string) {
    return this.reservaService.findByCliente(idCliente);
  }

  // Obtener reservas por empleado
  @Get('empleado/:idEmpleado')
  findByEmpleado(@Param('idEmpleado', ParseIntPipe) idEmpleado: number) {
    return this.reservaService.findByEmpleado(idEmpleado);
  }

  // Obtener reservas por estado de pago
  @Get('estado/:estado')
  findByEstadoPago(@Param('estado') estado: 'pendiente' | 'pagado' | 'cancelado') {
    return this.reservaService.findByEstadoPago(estado);
  }

  // Obtener reservas por rango de fechas
  @Get('fechas')
  findByDateRange(
    @Query('fechaInicio') fechaInicio: string,
    @Query('fechaFin') fechaFin: string,
  ) {
    return this.reservaService.findByDateRange(
      new Date(fechaInicio),
      new Date(fechaFin)
    );
  }

  // Contar reservas
  @Get('count')
  count() {
    return this.reservaService.count();
  }

  // Obtener una reserva por ID
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.reservaService.findOne(id);
  }

  // Actualizar reserva
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateReservaDto: UpdateReservaDto,
  ) {
    return this.reservaService.update(id, updateReservaDto);
  }

  // Marcar como pagada
  @Patch(':id/pagar')
  marcarComoPagada(@Param('id', ParseIntPipe) id: number) {
    return this.reservaService.marcarComoPagada(id);
  }

  // Cancelar reserva
  @Patch(':id/cancelar')
  cancelarReserva(@Param('id', ParseIntPipe) id: number) {
    return this.reservaService.cancelarReserva(id);
  }

  // Cambiar estado de pago
  @Patch(':id/estado-pago')
  cambiarEstadoPago(
    @Param('id', ParseIntPipe) id: number,
    @Body('estado') estado: 'pendiente' | 'pagado' | 'cancelado',
  ) {
    return this.reservaService.cambiarEstadoPago(id, estado);
  }

  // Agregar servicio a reserva
  @Post(':id/servicios/:servicioId')
  agregarServicio(
    @Param('id', ParseIntPipe) id: number,
    @Param('servicioId', ParseIntPipe) servicioId: number,
  ) {
    return this.reservaService.agregarServicio(id, servicioId);
  }

  // Eliminar servicio de reserva
  @Delete(':id/servicios/:servicioId')
  eliminarServicio(
    @Param('id', ParseIntPipe) id: number,
    @Param('servicioId', ParseIntPipe) servicioId: number,
  ) {
    return this.reservaService.eliminarServicio(id, servicioId);
  }

  // Eliminar reserva
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.reservaService.remove(id);
  }
}
