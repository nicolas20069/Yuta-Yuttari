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
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';

@ApiTags('Reservas')
@Controller('reservas')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ReservaController {
  constructor(private readonly reservaService: ReservaService) { }

  // Obtener mis reservas (usuario autenticado)
  @Get('mis-reservas')
  @ApiOperation({ summary: 'Get current user reservations' })
  @ApiResponse({ status: 200, description: 'Return list of reservations.' })
  async getMisReservas(@Req() req) {
    // Assuming the user ID is in req.user.id (standard NestJS Passport behavior)
    return this.reservaService.findByCliente(req.user.id);
  }

  // Crear reserva
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new reservation' })
  @ApiResponse({ status: 201, description: 'Reservation successfully created.' })
  create(@Body() createReservaDto: CreateReservaDto) {
    return this.reservaService.create(createReservaDto);
  }

  // Obtener todas las reservas
  @Get()
  @ApiOperation({ summary: 'Get all reservations' })
  @ApiResponse({ status: 200, description: 'Return all reservations.' })
  findAll() {
    return this.reservaService.findAll();
  }

  // Obtener estadísticas generales
  @Get('estadisticas')
  @ApiOperation({ summary: 'Get general statistics' })
  getEstadisticas() {
    return this.reservaService.getEstadisticas();
  }

  // Obtener estadísticas por periodo
  @Get('estadisticas/periodo')
  @ApiOperation({ summary: 'Get statistics by period' })
  @ApiQuery({ name: 'fechaInicio', required: true })
  @ApiQuery({ name: 'fechaFin', required: true })
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
  @ApiOperation({ summary: 'Get active reservations' })
  findReservasActivas() {
    return this.reservaService.findReservasActivas();
  }

  // Obtener reservas del día
  @Get('del-dia')
  @ApiOperation({ summary: 'Get reservations for the day' })
  @ApiQuery({ name: 'fecha', required: false })
  findReservasDelDia(@Query('fecha') fecha?: string) {
    const fechaBusqueda = fecha ? new Date(fecha) : new Date();
    return this.reservaService.findReservasDelDia(fechaBusqueda);
  }

  // Obtener habitaciones disponibles
  @Get('habitaciones-disponibles')
  @ApiOperation({ summary: 'Get available rooms' })
  @ApiQuery({ name: 'fechaInicio', required: true })
  @ApiQuery({ name: 'fechaFin', required: true })
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
  @ApiOperation({ summary: 'Get reservations by client ID' })
  findByCliente(@Param('idCliente') idCliente: string) {
    return this.reservaService.findByCliente(idCliente);
  }

  // Obtener reservas por empleado
  @Get('empleado/:idEmpleado')
  @ApiOperation({ summary: 'Get reservations by employee ID' })
  findByEmpleado(@Param('idEmpleado', ParseIntPipe) idEmpleado: number) {
    return this.reservaService.findByEmpleado(idEmpleado);
  }

  // Obtener reservas por estado de pago
  @Get('estado/:estado')
  @ApiOperation({ summary: 'Get reservations by payment status' })
  findByEstadoPago(@Param('estado') estado: 'pendiente' | 'pagado' | 'cancelado') {
    return this.reservaService.findByEstadoPago(estado);
  }

  // Obtener reservas por rango de fechas
  @Get('fechas')
  @ApiOperation({ summary: 'Get reservations by date range' })
  @ApiQuery({ name: 'fechaInicio', required: true })
  @ApiQuery({ name: 'fechaFin', required: true })
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
  @ApiOperation({ summary: 'Count total reservations' })
  count() {
    return this.reservaService.count();
  }

  // Obtener una reserva por ID
  @Get(':id')
  @ApiOperation({ summary: 'Get reservation by ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.reservaService.findOne(id);
  }

  // Actualizar reserva
  @Patch(':id')
  @ApiOperation({ summary: 'Update reservation' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateReservaDto: UpdateReservaDto,
  ) {
    return this.reservaService.update(id, updateReservaDto);
  }

  // Marcar como pagada
  @Patch(':id/pagar')
  @ApiOperation({ summary: 'Mark reservation as paid' })
  marcarComoPagada(@Param('id', ParseIntPipe) id: number) {
    return this.reservaService.marcarComoPagada(id);
  }

  // Cancelar reserva
  @Patch(':id/cancelar')
  @ApiOperation({ summary: 'Cancel reservation' })
  cancelarReserva(@Param('id', ParseIntPipe) id: number) {
    return this.reservaService.cancelarReserva(id);
  }

  // Cambiar estado de pago
  @Patch(':id/estado-pago')
  @ApiOperation({ summary: 'Change payment status' })
  cambiarEstadoPago(
    @Param('id', ParseIntPipe) id: number,
    @Body('estado') estado: 'pendiente' | 'pagado' | 'cancelado',
  ) {
    return this.reservaService.cambiarEstadoPago(id, estado);
  }

  // Agregar servicio a reserva
  @Post(':id/servicios/:servicioId')
  @ApiOperation({ summary: 'Add service to reservation' })
  agregarServicio(
    @Param('id', ParseIntPipe) id: number,
    @Param('servicioId', ParseIntPipe) servicioId: number,
  ) {
    return this.reservaService.agregarServicio(id, servicioId);
  }

  // Eliminar servicio de reserva
  @Delete(':id/servicios/:servicioId')
  @ApiOperation({ summary: 'Remove service from reservation' })
  eliminarServicio(
    @Param('id', ParseIntPipe) id: number,
    @Param('servicioId', ParseIntPipe) servicioId: number,
  ) {
    return this.reservaService.eliminarServicio(id, servicioId);
  }

  // Eliminar reserva
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete reservation' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.reservaService.remove(id);
  }
}
