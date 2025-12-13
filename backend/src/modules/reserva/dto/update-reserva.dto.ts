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

export class UpdateReservaDto {
  @IsOptional()
  @IsNumber({}, { message: 'El ID del cliente debe ser un número' })
  idCliente?: number;

  @IsOptional()
  @IsNumber({}, { message: 'El ID del empleado debe ser un número' })
  idEmpleado?: number;

  @IsOptional()
  @IsDateString({}, { message: 'La fecha de inicio debe ser una fecha válida' })
  fecha_inicio?: string;

  @IsOptional()
  @IsDateString({}, { message: 'La fecha de fin debe ser una fecha válida' })
  fecha_fin?: string;

  @IsOptional()
  @IsNumber({}, { message: 'El costo total debe ser un número' })
  @Min(0, { message: 'El costo total debe ser mayor o igual a 0' })
  costo_total?: number;

  @IsOptional()
  @IsString({ message: 'El método de pago debe ser texto' })
  metodo_pago?: string;

  @IsOptional()
  @IsEnum(['pendiente', 'pagado', 'cancelado'], { 
    message: 'El estado de pago debe ser: pendiente, pagado o cancelado' 
  })
  estado_pago?: string;

  @IsOptional()
  @IsArray({ message: 'Las habitaciones deben ser un array' })
  habitaciones?: string[];

  @IsOptional()
  @IsArray({ message: 'Los servicios deben ser un array' })
  servicios?: number[];
}
