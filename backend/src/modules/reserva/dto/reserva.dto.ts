// reserva/dto/reserva.dto.ts
import { 
  IsNotEmpty, 
  IsNumber, 
  IsDateString, 
  IsArray, 
  IsOptional, 
  IsEnum,
  IsString,
  ArrayMinSize,
  Min,
  ValidateIf
} from 'class-validator';

export class ReservaDto {
  @ValidateIf((o) => o.operacion === 'crear')
  @IsNotEmpty({ message: 'El ID del cliente es requerido' })
  @IsOptional()
  @IsNumber({}, { message: 'El ID del cliente debe ser un número' })
  idCliente?: number;

  @ValidateIf((o) => o.operacion === 'crear')
  @IsNotEmpty({ message: 'El ID del empleado es requerido' })
  @IsOptional()
  @IsNumber({}, { message: 'El ID del empleado debe ser un número' })
  idEmpleado?: number;

  @ValidateIf((o) => o.operacion === 'crear')
  @IsNotEmpty({ message: 'La fecha de inicio es requerida' })
  @IsOptional()
  @IsDateString({}, { message: 'La fecha de inicio debe ser una fecha válida' })
  fecha_inicio?: string;

  @ValidateIf((o) => o.operacion === 'crear')
  @IsNotEmpty({ message: 'La fecha de fin es requerida' })
  @IsOptional()
  @IsDateString({}, { message: 'La fecha de fin debe ser una fecha válida' })
  fecha_fin?: string;

  @ValidateIf((o) => o.operacion === 'crear')
  @IsNotEmpty({ message: 'El costo total es requerido' })
  @IsOptional()
  @IsNumber({}, { message: 'El costo total debe ser un número' })
  @Min(0, { message: 'El costo total debe ser mayor o igual a 0' })
  costo_total?: number;

  @ValidateIf((o) => o.operacion === 'crear')
  @IsNotEmpty({ message: 'El método de pago es requerido' })
  @IsOptional()
  @IsString({ message: 'El método de pago debe ser texto' })
  metodo_pago?: string;

  @IsOptional()
  @IsEnum(['pendiente', 'pagado', 'cancelado'], { 
    message: 'El estado de pago debe ser: pendiente, pagado o cancelado' 
  })
  estado_pago?: string;

  @ValidateIf((o) => o.operacion === 'crear')
  @IsNotEmpty({ message: 'Las habitaciones son requeridas' })
  @IsOptional()
  @IsArray({ message: 'Las habitaciones deben ser un array' })
  @ArrayMinSize(1, { message: 'Debe haber al menos una habitación' })
  habitaciones?: string[];

  @IsOptional()
  @IsArray({ message: 'Los servicios deben ser un array' })
  servicios?: number[];
}