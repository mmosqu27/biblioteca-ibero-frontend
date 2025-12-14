import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

function MyLoans() {
  const navigate = useNavigate();
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("loans") || "[]");
    setLoans(stored);
  }, []);

  const currentLoans = useMemo(
    () => loans.filter((l) => l.status === "Activo"),
    [loans]
  );

  const pastLoans = useMemo(
    () => loans.filter((l) => l.status !== "Activo"),
    [loans]
  );

  const pickDate = (loan, keys) => {
    for (const k of keys) {
      if (loan && loan[k]) return loan[k];
    }
    return "";
  };

  return (
    <>
      <div className="topbar">
        <div className="topbar-left">
          <button className="back-btn" type="button" onClick={() => navigate(-1)}>
            ←
          </button>
          <span className="brand-text">Mis Préstamos</span>
        </div>
      </div>

      <div className="container">
        <div style={{ marginBottom: 10, color: "#111827", fontWeight: 600 }}>
          Préstamos Actuales
        </div>

        {currentLoans.length === 0 ? (
          <div className="loans-card">
            <p>No tienes préstamos activos.</p>
          </div>
        ) : (
          currentLoans.map((loan) => {
            const due = pickDate(loan, [
              "returnDateFormatted",
              "returnDate",
              "dueDateFormatted",
              "dueDate",
            ]);

            return (
              <div className="loans-card" key={loan.id}>
                <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                  <img
                    src={loan.image}
                    alt={loan.title}
                    style={{
                      width: 64,
                      height: 64,
                      objectFit: "cover",
                      borderRadius: 10,
                    }}
                  />

                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 500 }}>{loan.title}</div>
                    <div style={{ color: "#6b7280", marginTop: 4 }}>
                      {loan.author}
                    </div>

                    <div
                      style={{
                        marginTop: 6,
                        display: "flex",
                        gap: 10,
                        flexWrap: "wrap",
                      }}
                    >
                      <span style={{ color: "#111827", fontWeight: 400 }}>
                        Devolver antes del: {due}
                      </span>
                      <span className="badge available">Activo</span>
                    </div>
                  </div>

                  <button
                    className="details-button"
                    type="button"
                    onClick={() => navigate(`/libro/${loan.bookId}`)}
                  >
                    Detalles
                  </button>
                </div>
              </div>
            );
          })
        )}

        <div
          style={{
            margin: "26px 0 14px",
            color: "#111827",
            fontWeight: 600,
          }}
        >
          Préstamos Anteriores
        </div>

        {pastLoans.length === 0 ? (
          <div className="loans-card">
            <p>No tienes préstamos anteriores.</p>
          </div>
        ) : (
          pastLoans.map((loan) => {
            const returned = pickDate(loan, [
              "returnDateFormatted",
              "returnDate",
            ]);

            return (
              <div className="loans-card" key={loan.id}>
                <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                  <img
                    src={loan.image}
                    alt={loan.title}
                    style={{
                      width: 64,
                      height: 64,
                      objectFit: "cover",
                      borderRadius: 10,
                      opacity: 0.7,
                    }}
                  />

                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 500 }}>{loan.title}</div>
                    <div style={{ color: "#6b7280", marginTop: 4 }}>
                      {loan.author}
                    </div>

                    <div
                      style={{
                        marginTop: 6,
                        display: "flex",
                        gap: 10,
                        flexWrap: "wrap",
                      }}
                    >
                      <span style={{ color: "#111827", fontWeight: 400 }}>
                        Devuelto: {returned}
                      </span>
                      <span className="badge unavailable">Completado</span>
                    </div>
                  </div>

                  <button
                    className="details-button"
                    type="button"
                    onClick={() => navigate(`/libro/${loan.bookId}`)}
                  >
                    Detalles
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
}

export default MyLoans;
