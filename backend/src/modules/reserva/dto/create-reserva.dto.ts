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

export class CreateReservaDto {
  @IsNotEmpty({ message: 'El ID del cliente es requerido' })
  @IsNumber({}, { message: 'El ID del cliente debe ser un número' })
  idCliente: number;

  @IsNotEmpty({ message: 'El ID del empleado es requerido' })
  @IsNumber({}, { message: 'El ID del empleado debe ser un número' })
  idEmpleado: number;

  @IsNotEmpty({ message: 'La fecha de inicio es requerida' })
  @IsDateString({}, { message: 'La fecha de inicio debe ser una fecha válida' })
  fecha_inicio: string;

  @IsNotEmpty({ message: 'La fecha de fin es requerida' })
  @IsDateString({}, { message: 'La fecha de fin debe ser una fecha válida' })
  fecha_fin: string;

  @IsNotEmpty({ message: 'El costo total es requerido' })
  @IsNumber({}, { message: 'El costo total debe ser un número' })
  @Min(0, { message: 'El costo total debe ser mayor o igual a 0' })
  costo_total: number;

  @IsNotEmpty({ message: 'El método de pago es requerido' })
  @IsString({ message: 'El método de pago debe ser texto' })
  metodo_pago: string;

  @IsOptional()
  @IsEnum(['pendiente', 'pagado', 'cancelado'], { 
    message: 'El estado de pago debe ser: pendiente, pagado o cancelado' 
  })
  estado_pago?: string;

  @IsNotEmpty({ message: 'Las habitaciones son requeridas' })
  @IsArray({ message: 'Las habitaciones deben ser un array' })
  @ArrayMinSize(1, { message: 'Debe haber al menos una habitación' })
  habitaciones: string[];

  @IsOptional()
  @IsArray({ message: 'Los servicios deben ser un array' })
  servicios?: number[];
}