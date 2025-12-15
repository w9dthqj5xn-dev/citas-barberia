import React, { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import AuthForm from '../components/AuthForm';
import '../styles/Auth.css';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useContext(AuthContext);

  const handleRegister = async (formData) => {
    await register(formData.email, formData.password, formData.name, formData.phone);
    navigate('/appointments');
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1>Registrarse</h1>
        <AuthForm isLogin={false} onSubmit={handleRegister} />
        <p className="auth-link">
          ¿Ya tienes cuenta? <Link to="/login">Iniciar Sesión</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
