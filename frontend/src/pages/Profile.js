import React, { useState, useContext } from 'react';
import { userService } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import '../styles/Profile.css';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

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
    setMessage('');
    setLoading(true);

    try {
      await userService.updateProfile(formData.name, formData.phone);
      setMessage('Perfil actualizado correctamente');
    } catch (err) {
      setError(err.response?.data?.error || 'Error actualizando perfil');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-container">
      <h1>Mi Perfil</h1>
      
      <form className="profile-form" onSubmit={handleSubmit}>
        {error && <div className="error-message">{error}</div>}
        {message && <div className="success-message">{message}</div>}

        <div className="form-group">
          <label>Correo Electrónico</label>
          <input
            type="email"
            value={user?.email || ''}
            disabled
          />
        </div>

        <div className="form-group">
          <label>Nombre Completo</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Teléfono</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Guardando...' : 'Guardar Cambios'}
        </button>
      </form>
    </div>
  );
};

export default Profile;
