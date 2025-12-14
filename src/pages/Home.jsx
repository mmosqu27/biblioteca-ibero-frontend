import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const libros = [
    {
      id: 1,
      titulo: "Ingeniería de Software",
      autor: "Ian Sommerville",
    },
    {
      id: 2,
      titulo: "Estructuras de Datos",
      autor: "Mark Allen Weiss",
    },
    {
      id: 3,
      titulo: "Bases de Datos",
      autor: "Elmasri & Navathe",
    },
  ];

  return (
    <div className="container">
      <h2>Catálogo de Libros</h2>

      {libros.map((libro) => (
        <div
          key={libro.id}
          className="card"
          onClick={() => navigate("/libro")}
        >
          <h4>{libro.titulo}</h4>
          <p>{libro.autor}</p>
        </div>
      ))}
    </div>
  );
}

export default Home;
