import { useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { books } from "../data/books";

function Catalog() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const activeLoanBookIds = useMemo(() => {
    try {
      const loans = JSON.parse(localStorage.getItem("loans") || "[]");
      return new Set(
        loans
          .filter((l) => (l.status || "").toLowerCase() === "activo")
          .map((l) => Number(l.bookId))
      );
    } catch {
      return new Set();
    }
  }, []);

  const filteredBooks = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return books;

    return books.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <>
      <div className="topbar">
        <div className="topbar-left">
          <button onClick={() => navigate(-1)}>←</button>
          <span className="brand-text">Sistema de Biblioteca</span>
        </div>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Buscar por título o autor..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="container">
        <h2 className="home-title">Catálogo</h2>

        <div className="catalog-grid">
          {filteredBooks.length === 0 && (
            <div className="loans-card">
              <p>No se encontraron resultados.</p>
            </div>
          )}

          {filteredBooks.map((book) => {
            const isLoaned = activeLoanBookIds.has(Number(book.id));
            const isAvailable = Boolean(book.available) && !isLoaned;

            return (
              <div
                key={book.id}
                className="book-card"
                onClick={() => navigate(`/libro/${book.id}`)}
                style={{ cursor: "pointer" }}
              >
                <img src={book.image} alt={book.title} />

                <div className="book-content">
                  <div className="book-title">{book.title}</div>
                  <div className="book-author">{book.author}</div>

                  {isAvailable ? (
                    <span className="badge available">Disponible</span>
                  ) : (
                    <span className="badge unavailable">No disponible</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Catalog;
