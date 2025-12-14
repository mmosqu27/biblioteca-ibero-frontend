import { useNavigate, useParams } from "react-router-dom";
import { useMemo, useState } from "react";
import { books } from "../data/books";

function pad2(n) {
  return String(n).padStart(2, "0");
}

function formatDMY(isoDate) {
  if (!isoDate) return "";
  const [y, m, d] = isoDate.split("-");
  return `${d}/${m}/${y}`;
}

function addDaysISO(isoDate, days) {
  const dt = new Date(`${isoDate}T00:00:00`);
  dt.setDate(dt.getDate() + days);
  const y = dt.getFullYear();
  const m = pad2(dt.getMonth() + 1);
  const d = pad2(dt.getDate());
  return `${y}-${m}-${d}`;
}

function Reserve() {
  const navigate = useNavigate();
  const { id } = useParams();

  const book = useMemo(() => {
    const numId = Number(id);
    return books.find((b) => b.id === numId);
  }, [id]);

  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [error, setError] = useState("");

  const handlePickupChange = (value) => {
    setPickupDate(value);
    if (value) {
      const suggestedReturn = addDaysISO(value, 14);
      setReturnDate(suggestedReturn);
    } else {
      setReturnDate("");
    }
    setError("");
  };

  const handleConfirm = (e) => {
    e.preventDefault();
    setError("");

    if (!pickupDate || !returnDate) {
      setError("Selecciona las fechas.");
      return;
    }

    const p = new Date(`${pickupDate}T00:00:00`).getTime();
    const r = new Date(`${returnDate}T00:00:00`).getTime();

    if (r < p) {
      setError("La fecha de devolución no puede ser menor a la de recogida.");
      return;
    }

    const maxReturn = new Date(`${pickupDate}T00:00:00`);
    maxReturn.setDate(maxReturn.getDate() + 14);
    const maxReturnTime = maxReturn.getTime();

    if (r > maxReturnTime) {
      setError("La devolución debe ser máximo 14 días después de la recogida.");
      return;
    }

    const existing = JSON.parse(localStorage.getItem("loans") || "[]");

    const alreadyActive = existing.some(
      (l) => l.bookId === book.id && l.status === "Activo"
    );

    if (alreadyActive) {
      setError("Este libro ya está reservado actualmente.");
      return;
    }

    const dueDateISO = addDaysISO(pickupDate, 14);

    const newLoan = {
      id: Date.now(),
      bookId: book.id,
      title: book.title,
      author: book.author,
      image: book.image,
      pickupDate,
      returnDate,
      dueDate: dueDateISO,
      pickupDateFormatted: formatDMY(pickupDate),
      returnDateFormatted: formatDMY(returnDate),
      dueDateFormatted: formatDMY(dueDateISO),
      status: "Activo",
    };

    localStorage.setItem("loans", JSON.stringify([newLoan, ...existing]));

    navigate("/mis-prestamos");
  };

  if (!book) {
    return (
      <>
        <div className="topbar">
          <div className="topbar-left">
            <button onClick={() => navigate(-1)}>←</button>
            <span className="brand-text">Sistema de Biblioteca</span>
          </div>
        </div>

        <div className="reserve-card">
          <h2>Detalles de la Reserva</h2>
          <p>No se encontró el libro.</p>
          <button className="primary-button" onClick={() => navigate("/catalogo")}>
            Volver al catálogo
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="topbar">
        <div className="topbar-left">
          <button onClick={() => navigate(-1)}>←</button>
          <span className="brand-text">Sistema de Biblioteca</span>
        </div>
      </div>

      <div className="reserve-card">
        <h2>Detalles de la Reserva</h2>
        <p>Estás reservando:</p>
        <p>
          <strong>{book.title}</strong>
        </p>

        <form onSubmit={handleConfirm}>
          <label>Fecha de Recogida</label>
          <input
            type="date"
            className="input"
            value={pickupDate}
            onChange={(e) => handlePickupChange(e.target.value)}
            required
          />

          <label>Fecha de Devolución</label>
          <input
            type="date"
            className="input"
            value={returnDate}
            min={pickupDate || undefined}
            max={pickupDate ? addDaysISO(pickupDate, 14) : undefined}
            onChange={(e) => {
              setReturnDate(e.target.value);
              setError("");
            }}
            required
          />

          <div className="loans-card" style={{ marginTop: 14 }}>
            <h3 style={{ marginBottom: 10 }}>Política de Préstamos</h3>
            <ul>
              <li>Período máximo de préstamo: 14 días</li>
              <li>Las devoluciones tardías incurren en una tarifa diaria</li>
              <li>Los libros deben devolverse en buen estado</li>
              <li>Puedes extender tu préstamo si no hay reservas</li>
            </ul>
          </div>

          {error ? (
            <p style={{ marginTop: 10, color: "#b91c1c", fontWeight: 600 }}>
              {error}
            </p>
          ) : null}

          <button className="primary-button" type="submit">
            Confirmar Reserva
          </button>
        </form>
      </div>
    </>
  );
}

export default Reserve;
