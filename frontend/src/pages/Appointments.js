import React, { useState, useEffect } from 'react';
import { appointmentService } from '../services/api';
import '../styles/Appointments.css';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await appointmentService.getMyAppointments();
      setAppointments(response.data);
    } catch (err) {
      setError('Error cargando citas');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    if (window.confirm('¿Deseas cancelar esta cita?')) {
      try {
        await appointmentService.cancel(id);
        setAppointments(prev => prev.filter(apt => apt.id !== id));
      } catch (err) {
        setError('Error cancelando cita');
      }
    }
  };

  if (loading) return <div className="loading">Cargando citas...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="appointments-container">
      <h1>Mis Citas</h1>
      
      {appointments.length === 0 ? (
        <p>No tienes citas reservadas</p>
      ) : (
        <div className="appointments-list">
          {appointments.map(appointment => (
            <div key={appointment.id} className="appointment-card">
              <div className="appointment-info">
                <h3>{appointment.barber_name}</h3>
                <p>📅 {new Date(appointment.appointment_date).toLocaleDateString()}</p>
                <p>⏰ {appointment.appointment_time}</p>
                <p>💈 {appointment.service_type}</p>
                <span className={`status ${appointment.status}`}>
                  {appointment.status}
                </span>
              </div>
              {appointment.status === 'confirmed' && (
                <button
                  onClick={() => handleCancel(appointment.id)}
                  className="cancel-btn"
                >
                  Cancelar
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Appointments;
