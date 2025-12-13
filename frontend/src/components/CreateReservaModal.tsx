
import React, { useState } from 'react';
import { createReserva } from '../services/reservas';
import type { CreateReservaDto } from '../services/reservas';
import { toast } from 'react-toastify';

interface CreateReservaModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export const CreateReservaModal: React.FC<CreateReservaModalProps> = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState<CreateReservaDto>({
    fechaReserva: '',
    horaInicio: '',
    horaFin: '',
    numeroPersonas: 1,
    observaciones: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validations
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(formData.fechaReserva + 'T00:00:00');

    if (selectedDate < today) {
        toast.error('La fecha de reserva no puede ser en el pasado');
        setLoading(false);
        return;
    }

    if (formData.horaInicio >= formData.horaFin) {
        toast.error('La hora de fin debe ser posterior a la hora de inicio');
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
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fecha de Reserva
            </label>
            <input
              type="date"
              name="fechaReserva"
              required
              min={new Date().toISOString().split('T')[0]}
              value={formData.fechaReserva}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Hora Inicio
              </label>
              <input
                type="time"
                name="horaInicio"
                required
                value={formData.horaInicio}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Hora Fin
              </label>
              <input
                type="time"
                name="horaFin"
                required
                value={formData.horaFin}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Número de Personas
            </label>
            <input
              type="number"
              name="numeroPersonas"
              min="1"
              required
              value={formData.numeroPersonas}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Observaciones
            </label>
            <textarea
              name="observaciones"
              rows={3}
              value={formData.observaciones}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Detalles adicionales..."
            />
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
