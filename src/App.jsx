import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Menu from "./pages/Menu";
import Catalog from "./pages/Catalog";
import BookDetail from "./pages/BookDetail";
import Reserve from "./pages/Reserve";
import MyLoans from "./pages/MyLoans";
import Profile from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/catalogo" element={<Catalog />} />
        <Route path="/libro/:id" element={<BookDetail />} />
        <Route path="/reservar/:id" element={<Reserve />} />
        <Route path="/mis-prestamos" element={<MyLoans />} />
        <Route path="/perfil" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;