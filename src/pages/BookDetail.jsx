import { useParams, useNavigate } from "react-router-dom";
import { books } from "../data/books";

function BookDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const book = books.find((b) => b.id === Number(id));

  const loans = JSON.parse(localStorage.getItem("loans") || "[]");
  const alreadyLoaned = loans.some(
    (loan) => loan.bookId === book?.id && loan.status === "Activo"
  );

  if (!book) {
    return (
      <div className="container">
        <h2>Libro no encontrado</h2>
      </div>
    );
  }

  const canReserve = book.available && !alreadyLoaned;

  return (
    <>
      <div className="topbar">
        <div className="topbar-left">
          <button onClick={() => navigate(-1)}>←</button>
          <span className="brand-text">Detalles del Libro</span>
        </div>
      </div>

      <div className="detail-card">
        <img src={book.image} alt={book.title} />

        <div className="detail-info">
          <span className={`badge ${canReserve ? "available" : "unavailable"}`}>
            {canReserve ? "Disponible" : "No disponible"}
          </span>

          <h2 style={{ marginTop: 12 }}>{book.title}</h2>
          <p style={{ color: "#6b7280" }}>por {book.author}</p>

          <h4 style={{ marginTop: 20 }}>Descripción</h4>
          <p>{book.description}</p>

          <h4 style={{ marginTop: 20 }}>Detalles</h4>
          <p>ISBN: {book.isbn}</p>
          <p>Editorial: {book.editorial}</p>
          <p>Año: {book.year}</p>
          <p>Páginas: {book.pages}</p>

          {canReserve ? (
            <button
              className="primary-button"
              style={{ marginTop: 24 }}
              onClick={() => navigate(`/reservar/${book.id}`)}
            >
              Reservar Libro
            </button>
          ) : (
            <button
              style={{
                marginTop: 24,
                width: "100%",
                padding: "14px",
                borderRadius: "12px",
                border: "none",
                background: "#9ca3af",
                color: "#fff",
                fontSize: "15px",
                fontWeight: 600,
                cursor: "not-allowed",
              }}
              disabled
            >
              Actualmente no disponible
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default BookDetail;
