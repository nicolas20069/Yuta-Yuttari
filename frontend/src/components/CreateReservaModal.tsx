
import React, { useState, useEffect } from 'react';
import { createReserva } from '../services/reservas';
import type { CreateReservaDto } from '../services/reservas';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

interface CreateReservaModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export const CreateReservaModal: React.FC<CreateReservaModalProps> = ({ onClose, onSuccess }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState<CreateReservaDto>({
    idCliente: '', // Will be set from user
    idEmpleado: 1, // Default
    fecha_inicio: '',
    fecha_fin: '',
    costo_total: 0,
    metodo_pago: 'efectivo',
    estado_pago: 'pendiente',
    habitaciones: ['101'], // Default or user input
    servicios: []
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user && user.id) {
       // user.id is string (UUID). DTO now expects string.
       setFormData(prev => ({ ...prev, idCliente: user.id || '' }));
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'costo_total' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validations
    const start = new Date(formData.fecha_inicio);
    const end = new Date(formData.fecha_fin);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (start < today) {
        toast.error('La fecha de inicio no puede ser en el pasado');
        setLoading(false);
        return;
    }

    if (end <= start) {
        toast.error('La fecha de fin debe ser posterior a la fecha de inicio');
        setLoading(false);
        return;
    }

    if (formData.costo_total < 0) {
        toast.error('El costo total no puede ser negativo');
        setLoading(false);
        return;
    }

    try {
      await createReserva(formData);
      toast.success('Reserva creada exitosamente');
      onSuccess();
      onClose();
    } catch (error: any) {
        console.error("Error creating reservation:", error);
      toast.error(error.response?.data?.message || 'Error al crear la reserva');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">Nueva Reserva</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 focus:outline-none"
          >
            <span className="text-2xl">&times;</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fecha Inicio
              </label>
              <input
                type="date"
                name="fecha_inicio"
                required
                min={new Date().toISOString().split('T')[0]}
                value={formData.fecha_inicio}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fecha Fin
              </label>
              <input
                type="date"
                name="fecha_fin"
                required
                min={formData.fecha_inicio || new Date().toISOString().split('T')[0]}
                value={formData.fecha_fin}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
             <label className="block text-sm font-medium text-gray-700 mb-1">
               Habitaciones (ID)
             </label>
             {/* For now simple input, ideally a selector */}
             <input
               type="text"
               name="habitaciones"
               value={formData.habitaciones[0]}
               onChange={(e) => setFormData(prev => ({ ...prev, habitaciones: [e.target.value] }))}
               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
               placeholder="Ej: 101"
             />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                Costo Total
                </label>
                <input
                type="number"
                name="costo_total"
                min="0"
                step="0.01"
                required
                value={formData.costo_total}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                Método de Pago
                </label>
                <select
                name="metodo_pago"
                value={formData.metodo_pago}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="efectivo">Efectivo</option>
                    <option value="tarjeta">Tarjeta</option>
                    <option value="transferencia">Transferencia</option>
                </select>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? 'Creando...' : 'Crear Reserva'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateReservaModal;
