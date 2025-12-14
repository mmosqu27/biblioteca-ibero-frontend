import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/Logo.png";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const isValidEmail = (value) => {
    const v = value.trim();
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    return re.test(v);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      setError("Ingresa un correo válido. Ej: usuario@correo.com");
      return;
    }

    if (password.trim().length < 4) {
      setError("La contraseña debe tener al menos 4 caracteres.");
      return;
    }

    setError("");
    navigate("/menu");
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="login-header">
          <img src={logo} alt="Logo" className="login-logo" />
          <span className="login-title">Sistema de Biblioteca</span>
        </div>

        <div className="login-subtitle">Iniciar Sesión</div>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            className="input"
            placeholder="Ingresa tu correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            className="input"
            placeholder="Ingresa la Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error ? (
            <div style={{ color: "#ef4444", fontSize: 13, marginTop: -6, marginBottom: 12 }}>
              {error}
            </div>
          ) : null}

          <button type="submit" className="primary-button">
            Iniciar Sesión
          </button>
        </form>

        <Link to="/registro" className="link">
          Crear cuenta
        </Link>
      </div>
    </div>
  );
}
