// reserva/dto/create-reserva.dto.ts
import {
  IsNotEmpty,
  IsNumber,
  IsDateString,
  IsArray,
  IsOptional,
  IsEnum,
  IsString,
  ArrayMinSize,
  Min
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateReservaDto {
  @ApiProperty({ description: 'UUID of the client', example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsNotEmpty({ message: 'El ID del cliente es requerido' })
  @IsString({ message: 'El ID del cliente debe ser un texto (UUID)' })
  idCliente: string;

  @ApiProperty({ description: 'ID of the employee', example: 1 })
  @IsNotEmpty({ message: 'El ID del empleado es requerido' })
  @IsNumber({}, { message: 'El ID del empleado debe ser un número' })
  idEmpleado: number;

  @ApiProperty({ description: 'Start date', example: '2023-12-01T00:00:00Z' })
  @IsNotEmpty({ message: 'La fecha de inicio es requerida' })
  @IsDateString({}, { message: 'La fecha de inicio debe ser una fecha válida' })
  fecha_inicio: string;

  @ApiProperty({ description: 'End date', example: '2023-12-05T00:00:00Z' })
  @IsNotEmpty({ message: 'La fecha de fin es requerida' })
  @IsDateString({}, { message: 'La fecha de fin debe ser una fecha válida' })
  fecha_fin: string;

  @ApiProperty({ description: 'Total cost', example: 500.00 })
  @IsNotEmpty({ message: 'El costo total es requerido' })
  @IsNumber({}, { message: 'El costo total debe ser un número' })
  @Min(0, { message: 'El costo total debe ser mayor o igual a 0' })
  costo_total: number;

  @ApiProperty({ description: 'Payment method', example: 'credit_card' })
  @IsNotEmpty({ message: 'El método de pago es requerido' })
  @IsString({ message: 'El método de pago debe ser texto' })
  metodo_pago: string;

  @ApiPropertyOptional({ description: 'Payment status', enum: ['pendiente', 'pagado', 'cancelado'], default: 'pendiente' })
  @IsOptional()
  @IsEnum(['pendiente', 'pagado', 'cancelado'], {
    message: 'El estado de pago debe ser: pendiente, pagado o cancelado'
  })
  estado_pago?: string;

  @ApiProperty({ description: 'List of room IDs', example: ['room1', 'room2'] })
  @IsNotEmpty({ message: 'Las habitaciones son requeridas' })
  @IsArray({ message: 'Las habitaciones deben ser un array' })
  @ArrayMinSize(1, { message: 'Debe haber al menos una habitación' })
  habitaciones: string[];

  @ApiPropertyOptional({ description: 'List of service IDs', example: [1, 2] })
  @IsOptional()
  @IsArray({ message: 'Los servicios deben ser un array' })
  servicios?: number[];
}