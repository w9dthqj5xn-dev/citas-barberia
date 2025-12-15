import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { appointmentService } from '../services/api';
import BarbersList from '../components/BarbersList';
import '../styles/BookAppointment.css';

const BookAppointment = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedBarber, setSelectedBarber] = useState(null);
  const [formData, setFormData] = useState({
    appointmentDate: '',
    appointmentTime: '',
    serviceType: 'corte',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSelectBarber = (barber) => {
    setSelectedBarber(barber);
    setStep(2);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await appointmentService.create(
        selectedBarber.id,
        formData.appointmentDate,
        formData.appointmentTime,
        formData.serviceType
      );
      navigate('/appointments');
    } catch (err) {
      setError(err.response?.data?.error || 'Error reservando cita');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="book-appointment-container">
      <h1>Reservar Cita</h1>

      {step === 1 ? (
        <BarbersList onSelectBarber={handleSelectBarber} />
      ) : (
        <form className="appointment-form" onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}

          <div className="barber-summary">
            <h3>Barbero: {selectedBarber.name}</h3>
            <button type="button" onClick={() => setStep(1)} className="change-btn">
              Cambiar barbero
            </button>
          </div>

          <input
            type="date"
            name="appointmentDate"
            value={formData.appointmentDate}
            onChange={handleChange}
            required
          />

          <input
            type="time"
            name="appointmentTime"
            value={formData.appointmentTime}
            onChange={handleChange}
            required
          />

          <select
            name="serviceType"
            value={formData.serviceType}
            onChange={handleChange}
          >
            <option value="corte">Corte</option>
            <option value="afeitado">Afeitado</option>
            <option value="peinado">Peinado</option>
            <option value="completo">Servicio Completo</option>
          </select>

          <button type="submit" disabled={loading}>
            {loading ? 'Reservando...' : 'Confirmar Reserva'}
          </button>
        </form>
      )}
    </div>
  );
};

export default BookAppointment;
