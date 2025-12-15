import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <section className="hero">
        <h1>💈 Barber Shop Appointments</h1>
        <p>Reserva tu cita de forma fácil y rápida</p>
        <div className="hero-buttons">
          <Link to="/book" className="btn btn-primary">Reservar Cita</Link>
          <Link to="/login" className="btn btn-secondary">Iniciar Sesión</Link>
        </div>
      </section>

      <section className="features">
        <h2>Características</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>📅 Reservas Fáciles</h3>
            <p>Reserva tu cita en minutos sin complicaciones</p>
          </div>
          <div className="feature-card">
            <h3>👨‍💼 Barberos Profesionales</h3>
            <p>Elige entre nuestros mejores barberos</p>
          </div>
          <div className="feature-card">
            <h3>🔔 Notificaciones</h3>
            <p>Recibe recordatorios de tu cita</p>
          </div>
          <div className="feature-card">
            <h3>💬 Soporte</h3>
            <p>Contacta con nosotros cuando lo necesites</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
