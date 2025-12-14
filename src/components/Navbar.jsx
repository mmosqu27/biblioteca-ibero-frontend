import { useNavigate } from "react-router-dom";
import logo from "../assets/Logo.png";

function Navbar({
  title = "Sistema de Biblioteca",
  showSearch = true,
  searchPlaceholder = "Buscar libros...",
  onSearchChange,
  showBack = false,
  backTo = "/menu",
}) {
  const navigate = useNavigate();

  return (
    <div className="topbar">
      <div className="topbar-left">
        {showBack && (
          <button className="icon-btn" onClick={() => navigate(backTo)} aria-label="Volver">
            ←
          </button>
        )}

        <div className="brand" onClick={() => navigate("/menu")} role="button">
          <img className="brand-logo" src={logo} alt="Logo Biblioteca" />
          <span className="brand-text">{title}</span>
        </div>
      </div>

      {showSearch && (
        <div className="topbar-search">
          <span className="search-icon">⌕</span>
          <input
            className="search-input"
            placeholder={searchPlaceholder}
            onChange={(e) => onSearchChange?.(e.target.value)}
          />
        </div>
      )}

      <div className="topbar-right">
        <button className="icon-btn" onClick={() => navigate("/perfil")} aria-label="Perfil">
          👤
        </button>
      </div>
    </div>
  );
}

export default Navbar;
