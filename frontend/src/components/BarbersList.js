import React, { useState, useEffect } from 'react';
import { barberService } from '../services/api';
import '../styles/BarbersList.css';

const BarbersList = ({ onSelectBarber }) => {
  const [barbers, setBarbers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBarbers = async () => {
      try {
        const response = await barberService.getAll();
        setBarbers(response.data);
      } catch (err) {
        setError('Error cargando barberos');
      } finally {
        setLoading(false);
      }
    };

    fetchBarbers();
  }, []);

  if (loading) return <div>Cargando barberos...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="barbers-container">
      <h2>Selecciona un Barbero</h2>
      <div className="barbers-grid">
        {barbers.map(barber => (
          <div key={barber.id} className="barber-card">
            <h3>{barber.name}</h3>
            <p className="specialty">{barber.specialty}</p>
            {barber.phone && <p>📞 {barber.phone}</p>}
            <button onClick={() => onSelectBarber(barber)} className="select-btn">
              Seleccionar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BarbersList;
