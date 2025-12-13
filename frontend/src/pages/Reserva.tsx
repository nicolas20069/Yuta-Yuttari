// src/pages/ReservaPage.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { getMisReservas, cancelarReserva, type Reserva } from '../services/reservas';
import { getProfile } from '../services/authService';
import CreateReservaModal from '../components/CreateReservaModal';
import { CalendarIcon, ClockIcon, UsersIcon, XCircleIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

const ReservaPage: React.FC = () => {
  const navigate = useNavigate();
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  // Verificar autenticación al cargar
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) {
        navigate('/login', { replace: true });
        return;
      }

      // Verificar que el token sea válido
      await getProfile();
      setIsAuthenticated(true);
      fetchReservas();
    } catch (err) {
      console.error('Authentication failed:', err);
      localStorage.removeItem('auth_token');
      navigate('/login', { replace: true });
    }
  };

  const fetchReservas = async () => {
    try {
      setLoading(true);
      const data = await getMisReservas();
      setReservas(data);
      setError(null);
    } catch (err: any) {
      console.error('Error fetching reservations:', err);
      if (err.response?.status === 401) {
        navigate('/login', { replace: true });
      } else {
        setError('No se pudieron cargar sus reservas. Intente nuevamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancelar = async (id: string) => {
    if (!window.confirm('¿Estás seguro de que deseas cancelar esta reserva?')) {
      return;
    }

    try {
      setCancellingId(id);
      await cancelarReserva(id);
      await fetchReservas();
      alert('Reserva cancelada exitosamente');
    } catch (err: any) {
      console.error('Error al cancelar reserva:', err);
      alert(err.response?.data?.message || 'Error al cancelar la reserva');
    } finally {
      setCancellingId(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'CONFIRMADA':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'PENDIENTE':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'CANCELADA':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'COMPLETADA':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'CONFIRMADA':
        return <CheckCircleIcon className="w-5 h-5 text-green-600" />;
      case 'PENDIENTE':
        return <ClockIcon className="w-5 h-5 text-yellow-600" />;
      case 'CANCELADA':
        return <XCircleIcon className="w-5 h-5 text-red-600" />;
      case 'COMPLETADA':
        return <CheckCircleIcon className="w-5 h-5 text-blue-600" />;
      default:
        return null;
    }
  };

  const canCancelReserva = (reserva: Reserva) => {
    return reserva.estado === 'PENDIENTE' || reserva.estado === 'CONFIRMADA';
  };

  const isPastReserva = (reserva: Reserva) => {
    const reservaDate = new Date(reserva.fechaReserva);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return reservaDate < today;
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-grow container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Mis Reservas</h1>
            <p className="text-gray-600 mt-1">Gestiona tus reservas de Yuta Yuttari</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-md hover:shadow-lg font-medium"
          >
            + Nueva Reserva
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-md">
            <div className="flex items-center">
              <XCircleIcon className="w-5 h-5 mr-2" />
              <p>{error}</p>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Cargando reservas...</p>
            </div>
          </div>
        ) : reservas.length === 0 ? (
          /* Empty State */
          <div className="text-center py-16 bg-white rounded-xl shadow-sm">
            <CalendarIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No tienes reservas registradas
            </h3>
            <p className="text-gray-500 mb-6">
              ¡Crea tu primera reserva y disfruta de nuestra experiencia!
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Crear primera reserva
            </button>
          </div>
        ) : (
          /* Reservas Grid */
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {reservas.map((reserva) => (
              <div
                key={reserva.id}
                className={`bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 ${
                  isPastReserva(reserva) ? 'opacity-75' : ''
                }`}
              >
                {/* Card Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(reserva.estado)}
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(reserva.estado)}`}>
                        {reserva.estado}
                      </span>
                    </div>
                    <div className="text-white text-right">
                      <p className="text-sm font-medium">
                        {format(new Date(reserva.fechaReserva), 'dd MMM yyyy', { locale: es })}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6">
                  <div className="space-y-4">
                    {/* Horario */}
                    <div className="flex items-center gap-3 text-gray-700">
                      <ClockIcon className="w-5 h-5 text-blue-600 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-500 font-medium">Horario</p>
                        <p className="font-semibold">
                          {reserva.horaInicio} - {reserva.horaFin}
                        </p>
                      </div>
                    </div>

                    {/* Número de Personas */}
                    <div className="flex items-center gap-3 text-gray-700">
                      <UsersIcon className="w-5 h-5 text-blue-600 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-500 font-medium">Personas</p>
                        <p className="font-semibold">
                          {reserva.numeroPersonas} {reserva.numeroPersonas === 1 ? 'persona' : 'personas'}
                        </p>
                      </div>
                    </div>

                    {/* Observaciones */}
                    {reserva.observaciones && (
                      <div className="pt-4 border-t border-gray-100">
                        <p className="text-xs text-gray-500 font-medium mb-1">Observaciones</p>
                        <p className="text-sm text-gray-700 italic">"{reserva.observaciones}"</p>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  {canCancelReserva(reserva) && !isPastReserva(reserva) && (
                    <div className="mt-6 pt-4 border-t border-gray-100">
                      <button
                        onClick={() => handleCancelar(reserva.id)}
                        disabled={cancellingId === reserva.id}
                        className="w-full px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {cancellingId === reserva.id ? (
                          <span className="flex items-center justify-center gap-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
                            Cancelando...
                          </span>
                        ) : (
                          'Cancelar Reserva'
                        )}
                      </button>
                    </div>
                  )}

                  {/* Past Reservation Badge */}
                  {isPastReserva(reserva) && (
                    <div className="mt-4 text-center">
                      <span className="text-xs text-gray-500 italic">Reserva pasada</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Modal */}
      {showModal && (
        <CreateReservaModal
          onClose={() => setShowModal(false)}
          onSuccess={() => {
            setShowModal(false);
            fetchReservas();
          }}
        />
      )}
    </div>
  );
};

export default ReservaPage;