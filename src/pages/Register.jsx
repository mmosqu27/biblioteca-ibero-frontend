import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/Logo.png";

export default function Register() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="login-header">
          <img src={logo} alt="Logo" className="login-logo" />
          <span className="login-title">Sistema de Biblioteca</span>
        </div>

        <div className="register-title">Crear Cuenta</div>

        <form onSubmit={handleSubmit}>
          <input className="input" type="text" placeholder="Ingresa tu nombre" required />
          <input className="input" type="email" placeholder="Ingresa tu correo electrónico" required />
          <input className="input" type="password" placeholder="Ingresa la contraseña" required />
          <input className="input" type="password" placeholder="Confirmar Contraseña" required />

          <button className="primary-button" type="submit">
            Crear Cuenta
          </button>
        </form>

        <div className="register-footer">
          <Link to="/" className="link">
            ¿Ya tienes cuenta? Inicia sesión
          </Link>
        </div>
      </div>
    </div>
  );
}
