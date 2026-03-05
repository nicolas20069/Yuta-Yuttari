// src/services/reservaService.ts
import api from "./api";

// Interfaces
// Interfaces
export interface Reserva {
  id: string; // backend might send 'reservaID' but mapped or we adjust. Let's assume we map or backend returns object. Wait, backend entity has reservaID, but frontend used id. I should check if I need to map it. For now let's keep id if backend serializer handles it, or add reservaID. 
  // actually backend entity has reservaID. I should probably use that or alias it.
  // frontend previously had: id, userId, fechaReserva, horaInicio, horaFin, numeroPersonas, estado, observaciones
  // backend has: reservaID, idCliente, idEmpleado, fecha_inicio, fecha_fin, costo_total, metodo_pago, estado_pago
  
  // Let's align with Backend Entity directly to avoid confusion.
  reservaID: number;
  idCliente: string;
  idEmpleado: number;
  fecha_inicio: string; // ISO date
  fecha_fin: string; // ISO date
  costo_total: number;
  metodo_pago: string;
  estado_pago: 'pendiente' | 'pagado' | 'cancelado'; 
  
  // Relations that might come back
  detalles?: any[];
  servicios?: any[];
  user?: {
    id: string;
    name: string;
    email: string;
    phone?: string;
  };
}

export const ReservaEstado = {
  PENDIENTE: 'pendiente',
  PAGADO: 'pagado',
  CANCELADO: 'cancelado',
} as const;

export type ReservaEstado = (typeof ReservaEstado)[keyof typeof ReservaEstado];

export interface CreateReservaDto {
  idCliente: string;
  idEmpleado: number;
  fecha_inicio: string;
  fecha_fin: string;
  costo_total: number;
  metodo_pago: string;
  estado_pago?: string;
  habitaciones: string[]; // Backend requires this
  servicios?: number[];
}

export interface UpdateReservaDto {
  fecha_inicio?: string;
  fecha_fin?: string;
  costo_total?: number;
  metodo_pago?: string;
  estado_pago?: string;
}

export interface ReservaFilters {
  fechaInicio?: string;
  fechaFin?: string;
  estado?: string;
  userId?: string;
}

// Servicios

/**
 * Obtener todas las reservas (con filtros opcionales)
 */
export const getReservas = async (filters?: ReservaFilters): Promise<Reserva[]> => {
  const params = new URLSearchParams();
  
  if (filters?.fechaInicio) params.append('fechaInicio', filters.fechaInicio);
  if (filters?.fechaFin) params.append('fechaFin', filters.fechaFin);
  if (filters?.estado) params.append('estado', filters.estado);
  if (filters?.userId) params.append('userId', filters.userId);
  
  const queryString = params.toString();
  const url = queryString ? `/api/reservas?${queryString}` : '/api/reservas';
  
  const response = await api.get<Reserva[]>(url);
  return response.data;
};

/**
 * Obtener mis reservas (usuario autenticado)
 */
export const getMisReservas = async (): Promise<Reserva[]> => {
  const response = await api.get<Reserva[]>('/api/reservas/mis-reservas');
  return response.data;
};

/**
 * Obtener una reserva por ID
 */
export const getReservaById = async (id: string): Promise<Reserva> => {
  const response = await api.get<Reserva>(`/api/reservas/${id}`);
  return response.data;
};

/**
 * Crear una nueva reserva
 */
export const createReserva = async (data: CreateReservaDto): Promise<Reserva> => {
  const response = await api.post<Reserva>('/api/reservas', data);
  return response.data;
};

/**
 * Actualizar una reserva
 */
export const updateReserva = async (
  id: string,
  data: UpdateReservaDto
): Promise<Reserva> => {
  const response = await api.patch<Reserva>(`/api/reservas/${id}`, data);
  return response.data;
};

/**
 * Cancelar una reserva
 */
export const cancelarReserva = async (id: string): Promise<Reserva> => {
  const response = await api.patch<Reserva>(`/api/reservas/${id}/cancelar`);
  return response.data;
};

/**
 * Confirmar una reserva (solo admin)
 */
export const confirmarReserva = async (id: string): Promise<Reserva> => {
  const response = await api.patch<Reserva>(`/api/reservas/${id}/confirmar`);
  return response.data;
};

/**
 * Eliminar una reserva (solo admin)
 */
export const deleteReserva = async (id: string): Promise<void> => {
  await api.delete(`/api/reservas/${id}`);
};

/**
 * Verificar disponibilidad para una fecha y hora
 */
export const verificarDisponibilidad = async (
  fechaReserva: string,
  horaInicio: string,
  horaFin: string
): Promise<{ disponible: boolean; mensaje?: string }> => {
  const response = await api.post('/api/reservas/verificar-disponibilidad', {
    fechaReserva,
    horaInicio,
    horaFin,
  });
  return response.data;
};

/**
 * Obtener estadísticas de reservas (solo admin)
 */
export const getReservasEstadisticas = async (): Promise<{
  total: number;
  pendientes: number;
  confirmadas: number;
  canceladas: number;
  completadas: number;
}> => {
  const response = await api.get('/api/reservas/estadisticas');
  return response.data;
};