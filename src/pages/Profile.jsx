import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [memberSince, setMemberSince] = useState("Enero 2024");
  const [totalLoans, setTotalLoans] = useState(23);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("user") || "null");
    if (stored) {
      setName(stored.name || "");
      setEmail(stored.email || "");
      setPhone(stored.phone || "");
      setMemberSince(stored.memberSince || "Enero 2024");
      setTotalLoans(Number(stored.totalLoans || 23));
      return;
    }

    const initial = {
      name: "Michael Mosquera",
      email: "michaelmosquera@ibero.com",
      phone: "324 561 0001",
      memberSince: "Enero 2024",
      totalLoans: 23,
    };

    localStorage.setItem("user", JSON.stringify(initial));
    setName(initial.name);
    setEmail(initial.email);
    setPhone(initial.phone);
    setMemberSince(initial.memberSince);
    setTotalLoans(initial.totalLoans);
  }, []);

  const activeLoansCount = (() => {
    try {
      const loans = JSON.parse(localStorage.getItem("loans") || "[]");
      return loans.filter((l) => (l.status || "").toLowerCase() === "activo").length;
    } catch {
      return 0;
    }
  })();

  const handleSave = () => {
    const updated = {
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      memberSince,
      totalLoans,
    };

    localStorage.setItem("user", JSON.stringify(updated));
    setIsEditing(false);
  };

  const handleCancel = () => {
    const stored = JSON.parse(localStorage.getItem("user") || "null");
    if (stored) {
      setName(stored.name || "");
      setEmail(stored.email || "");
      setPhone(stored.phone || "");
      setMemberSince(stored.memberSince || "Enero 2024");
      setTotalLoans(Number(stored.totalLoans || 23));
    }
    setIsEditing(false);
  };

  return (
    <>
      <div className="topbar">
        <div className="topbar-left">
          <button className="back-btn" type="button" onClick={() => navigate(-1)}>
            ←
          </button>
          <span className="brand-text">Perfil de Usuario</span>
        </div>
        <div className="topbar-right" />
      </div>

      <div className="container profile-container">
        <div className="profile-card">
          <div className="profile-avatar">
            <span className="profile-avatar-icon">👤</span>
          </div>

          <div className="profile-form">
            <label className="field-label">Nombre</label>
            <input
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={!isEditing}
            />

            <label className="field-label">Correo Electrónico</label>
            <input
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={!isEditing}
            />

            <label className="field-label">Teléfono</label>
            <input
              className="input"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={!isEditing}
            />

            <div className="profile-stats">
              <div className="profile-stats-title">Estadísticas de la Cuenta</div>
              <ul className="profile-stats-list">
                <li>Miembro desde: {memberSince}</li>
                <li>Total de libros prestados: {totalLoans}</li>
                <li>Actualmente prestados: {activeLoansCount}</li>
                <li>Estado de la cuenta: Activa</li>
              </ul>
            </div>

            {!isEditing ? (
              <button className="primary-button" type="button" onClick={() => setIsEditing(true)}>
                Editar Perfil
              </button>
            ) : (
              <div style={{ display: "flex", gap: 12 }}>
                <button className="primary-button" type="button" onClick={handleSave}>
                  Guardar Cambios
                </button>

                <button
                  type="button"
                  onClick={handleCancel}
                  style={{
                    width: "100%",
                    padding: "14px",
                    borderRadius: "12px",
                    mention: "none",
                    border: "1px solid #e5e7eb",
                    background: "#ffffff",
                    fontSize: "15px",
                    fontWeight: 600,
                    cursor: "pointer",
                    marginTop: 8,
                  }}
                >
                  Cancelar
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
