import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { barberService } from '../services/api';
import '../styles/Admin.css';

const Admin = () => {
  const { user } = useContext(AuthContext);
  const [barbers, setBarbers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    specialty: '',
    phone: '',
    email: '',
  });

  useEffect(() => {
    if (user?.role !== 'admin') {
      setError('Solo administradores pueden acceder a esta página');
      return;
    }
    fetchBarbers();
  }, [user]);

  const fetchBarbers = async () => {
    try {
      const response = await barberService.getAll();
      setBarbers(response.data);
      setLoading(false);
    } catch (err) {
      setError('Error cargando barberos');
      setLoading(false);
    }
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
    setSuccess('');

    try {
      await barberService.create(
        formData.name,
        formData.specialty,
        formData.phone,
        formData.email
      );
      setSuccess('Barbero creado exitosamente');
      setFormData({ name: '', specialty: '', phone: '', email: '' });
      setShowForm(false);
      fetchBarbers();
    } catch (err) {
      setError(err.response?.data?.error || 'Error creando barbero');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Deseas eliminar este barbero?')) {
      try {
        await barberService.deactivate(id);
        setSuccess('Barbero eliminado exitosamente');
        fetchBarbers();
      } catch (err) {
        setError('Error eliminando barbero');
      }
    }
  };

  if (user?.role !== 'admin') {
    return (
      <div className="admin-container">
        <div className="error-message">
          {error || 'No tienes permisos de administrador'}
        </div>
      </div>
    );
  }

  if (loading) return <div className="loading">Cargando...</div>;

  return (
    <div className="admin-container">
      <h1>👨‍💼 Panel de Administración</h1>
      
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <div className="admin-header">
        <h2>Gestión de Barberos</h2>
        <button 
          className="add-btn"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancelar' : '+ Agregar Barbero'}
        </button>
      </div>

      {showForm && (
        <form className="admin-form" onSubmit={handleSubmit}>
          <h3>Nuevo Barbero</h3>
          
          <input
            type="text"
            name="name"
            placeholder="Nombre completo"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="specialty"
            placeholder="Especialidad (ej: Corte clásico)"
            value={formData.specialty}
            onChange={handleChange}
            required
          />

          <input
            type="tel"
            name="phone"
            placeholder="Teléfono"
            value={formData.phone}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />

          <button type="submit" className="submit-btn">
            Crear Barbero
          </button>
        </form>
      )}

      <div className="barbers-admin-list">
        <h3>Barberos Registrados</h3>
        {barbers.length === 0 ? (
          <p>No hay barberos registrados</p>
        ) : (
          barbers.map(barber => (
            <div key={barber.id} className="barber-admin-card">
              <div className="barber-info">
                <h4>{barber.name}</h4>
                <p>Especialidad: {barber.specialty}</p>
                {barber.phone && <p>Teléfono: {barber.phone}</p>}
                {barber.email && <p>Email: {barber.email}</p>}
                <span className={`status ${barber.is_active ? 'active' : 'inactive'}`}>
                  {barber.is_active ? 'Activo' : 'Inactivo'}
                </span>
              </div>
              {barber.is_active && (
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(barber.id)}
                >
                  Eliminar
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Admin;
