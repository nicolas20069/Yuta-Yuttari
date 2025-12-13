// reserva/dto/update-reserva.dto.ts
import {
  IsOptional,
  IsNumber,
  IsDateString,
  IsArray,
  IsEnum,
  IsString,
  Min
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateReservaDto {
  @ApiPropertyOptional({ description: 'UUID of the client', example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsOptional()
  @IsString({ message: 'El ID del cliente debe ser un texto (UUID)' })
  idCliente?: string;

  @ApiPropertyOptional({ description: 'ID of the employee', example: 1 })
  @IsOptional()
  @IsNumber({}, { message: 'El ID del empleado debe ser un número' })
  idEmpleado?: number;

  @ApiPropertyOptional({ description: 'Start date', example: '2023-12-01T00:00:00Z' })
  @IsOptional()
  @IsDateString({}, { message: 'La fecha de inicio debe ser una fecha válida' })
  fecha_inicio?: string;

  @ApiPropertyOptional({ description: 'End date', example: '2023-12-05T00:00:00Z' })
  @IsOptional()
  @IsDateString({}, { message: 'La fecha de fin debe ser una fecha válida' })
  fecha_fin?: string;

  @ApiPropertyOptional({ description: 'Total cost', example: 500.00 })
  @IsOptional()
  @IsNumber({}, { message: 'El costo total debe ser un número' })
  @Min(0, { message: 'El costo total debe ser mayor o igual a 0' })
  costo_total?: number;

  @ApiPropertyOptional({ description: 'Payment method', example: 'credit_card' })
  @IsOptional()
  @IsString({ message: 'El método de pago debe ser texto' })
  metodo_pago?: string;

  @ApiPropertyOptional({ description: 'Payment status', enum: ['pendiente', 'pagado', 'cancelado'] })
  @IsOptional()
  @IsEnum(['pendiente', 'pagado', 'cancelado'], {
    message: 'El estado de pago debe ser: pendiente, pagado o cancelado'
  })
  estado_pago?: string;

  @ApiPropertyOptional({ description: 'List of room IDs', example: ['room1', 'room2'] })
  @IsOptional()
  @IsArray({ message: 'Las habitaciones deben ser un array' })
  habitaciones?: string[];

  @ApiPropertyOptional({ description: 'List of service IDs', example: [1, 2] })
  @IsOptional()
  @IsArray({ message: 'Los servicios deben ser un array' })
  servicios?: number[];
}
