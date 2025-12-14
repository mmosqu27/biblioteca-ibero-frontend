import { useNavigate } from "react-router-dom";
import logo from "../assets/Logo.png";

export default function Menu() {
  const navigate = useNavigate();

  return (
    <>
      <div className="topbar">
        <div className="topbar-left">
          <img src={logo} alt="Logo" style={{ width: 26, height: 26 }} />
          <span className="brand-text">Sistema de Biblioteca</span>
        </div>

        <div className="search-bar">
          <input placeholder="Buscar libros..." />
        </div>

        <div className="topbar-right">
          <button
            className="icon-btn"
            type="button"
            onClick={() => navigate("/perfil")}
          >
            👤
          </button>
        </div>
      </div>

      <div className="container">
        <div className="home-title">Bienvenido al Sistema de Biblioteca</div>
        <div className="home-subtitle">
          Gestiona tus libros y reservas fácilmente
        </div>

        <div className="card-grid">
          <div
            className="menu-card"
            onClick={() => navigate("/catalogo")}
            style={{ cursor: "pointer" }}
          >
            <div className="menu-icon">
              <span style={{ color: "white", fontSize: 22 }}>📚</span>
            </div>
            <div className="menu-title">Catálogo</div>
            <div className="menu-desc">Explorar libros disponibles</div>
          </div>

          <div
            className="menu-card"
            onClick={() => navigate("/mis-prestamos")}
            style={{ cursor: "pointer" }}
          >
            <div className="menu-icon">
              <span style={{ color: "white", fontSize: 22 }}>📖</span>
            </div>
            <div className="menu-title">Mis Préstamos</div>
            <div className="menu-desc">Ver tus libros prestados</div>
          </div>
        </div>
      </div>
    </>
  );
}
