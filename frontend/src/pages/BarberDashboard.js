import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { appointmentService } from '../services/api';
import '../styles/BarberDashboard.css';

const BarberDashboard = () => {
  const { user } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('confirmed');

  useEffect(() => {
    fetchBarberAppointments();
    // Actualizar cada 30 segundos
    const interval = setInterval(fetchBarberAppointments, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchBarberAppointments = async () => {
    try {
      setLoading(true);
      const response = await appointmentService.getBarberAppointments();
      // Extraer data de la respuesta
      const appointmentsData = response.data || response || [];
      setAppointments(Array.isArray(appointmentsData) ? appointmentsData : []);
      setError(null);
    } catch (err) {
      setError('Error al cargar citas');
      setAppointments([]); // Asegurar que sea array
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateAppointmentStatus = async (appointmentId, newStatus) => {
    try {
      await appointmentService.updateStatus(appointmentId, newStatus);
      setAppointments(appointments.map(apt =>
        apt.id === appointmentId ? { ...apt, status: newStatus } : apt
      ));
    } catch (err) {
      setError('Error al actualizar cita');
      console.error(err);
    }
  };

  const filteredAppointments = appointments.filter(apt => {
    if (filter === 'all') return true;
    return apt.status === filter;
  });

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'confirmed':
        return 'badge-confirmed';
      case 'completed':
        return 'badge-completed';
      case 'cancelled':
        return 'badge-cancelled';
      default:
        return 'badge-pending';
    }
  };

  const getStatusText = (status) => {
    const statusMap = {
      'confirmed': '✅ Confirmada',
      'completed': '✔️ Completada',
      'cancelled': '❌ Cancelada',
      'pending': '⏳ Pendiente'
    };
    return statusMap[status] || status;
  };

  const formatService = (serviceType) => {
    const services = {
      'corte': 'Corte de Cabello',
      'afeitado': 'Afeitado',
      'peinado': 'Peinado',
      'completo': 'Servicio Completo'
    };
    return services[serviceType] || serviceType;
  };

  if (!user || user.role !== 'barber') {
    return (
      <div className="access-denied">
        <h2>Acceso Denegado</h2>
        <p>Solo los barberos pueden acceder a este panel.</p>
      </div>
    );
  }

  if (loading) return <div className="loading">Cargando citas...</div>;

  return (
    <div className="barber-dashboard">
      <div className="dashboard-header">
        <h1>📊 Panel del Barbero</h1>
        <p>Bienvenido, <strong>{user?.name}</strong></p>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="filters">
        <button
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          Todas ({appointments.length})
        </button>
        <button
          className={`filter-btn ${filter === 'confirmed' ? 'active' : ''}`}
          onClick={() => setFilter('confirmed')}
        >
          Confirmadas ({appointments.filter(a => a.status === 'confirmed').length})
        </button>
        <button
          className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
          onClick={() => setFilter('completed')}
        >
          Completadas ({appointments.filter(a => a.status === 'completed').length})
        </button>
        <button
          className={`filter-btn ${filter === 'cancelled' ? 'active' : ''}`}
          onClick={() => setFilter('cancelled')}
        >
          Canceladas ({appointments.filter(a => a.status === 'cancelled').length})
        </button>
      </div>

      {filteredAppointments.length === 0 ? (
        <div className="no-appointments">
          <p>No hay citas en esta categoría</p>
        </div>
      ) : (
        <div className="appointments-grid">
          {filteredAppointments.map(appointment => (
            <div key={appointment.id} className="appointment-card">
              <div className="appointment-header">
                <h3>{appointment.user_name}</h3>
                <span className={`status-badge ${getStatusBadgeClass(appointment.status)}`}>
                  {getStatusText(appointment.status)}
                </span>
              </div>

              <div className="appointment-details">
                <p>
                  <strong>📅 Fecha:</strong> {appointment.appointment_date}
                </p>
                <p>
                  <strong>🕐 Hora:</strong> {appointment.appointment_time}
                </p>
                <p>
                  <strong>✂️ Servicio:</strong> {formatService(appointment.service_type)}
                </p>
                <p>
                  <strong>📞 Teléfono:</strong> {appointment.user_email}
                </p>
              </div>

              {appointment.status === 'confirmed' && (
                <div className="appointment-actions">
                  <button
                    className="btn btn-complete"
                    onClick={() => updateAppointmentStatus(appointment.id, 'completed')}
                  >
                    ✔️ Marcar Completada
                  </button>
                  <button
                    className="btn btn-cancel"
                    onClick={() => updateAppointmentStatus(appointment.id, 'cancelled')}
                  >
                    ❌ Cancelar
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BarberDashboard;
