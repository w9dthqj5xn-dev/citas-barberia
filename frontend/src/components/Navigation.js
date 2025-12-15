import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/Navigation.css';

const Navigation = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          💈 Barber Shop
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">Inicio</Link>
          </li>
          {user ? (
            <>
              {user.role === 'barber' && (
                <li className="nav-item">
                  <Link to="/barber-dashboard" className="nav-link barber-link">📊 Mi Panel</Link>
                </li>
              )}
              {user.role === 'admin' && (
                <li className="nav-item">
                  <Link to="/admin" className="nav-link admin-link">👨‍💼 Admin</Link>
                </li>
              )}
              {user.role === 'customer' && (
                <>
                  <li className="nav-item">
                    <Link to="/appointments" className="nav-link">Mis Citas</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/book" className="nav-link">Reservar</Link>
                  </li>
                </>
              )}
              <li className="nav-item">
                <Link to="/profile" className="nav-link">Perfil</Link>
              </li>
              <li className="nav-item">
                <button onClick={handleLogout} className="nav-link logout-btn">
                  Cerrar Sesión
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link to="/login" className="nav-link">Iniciar Sesión</Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-link register-btn">Registrarse</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
