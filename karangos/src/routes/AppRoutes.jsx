import { Routes, Route } from "react-router-dom";

// Importa as páginas
import Homepage from "../pages/Homepage";
import CarsList from "../pages/car/CarsList";
import CustomersList from "../pages/customers/CustomersList";
import Autor from "../pages/autor";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Página inicial */}
      <Route path="/" element={<Homepage />} />

      {/* Lista de carros */}
      <Route path="/cars" element={<CarsList />} />

      {/* Lista de clientes */}
      <Route path="/customers" element={<CustomersList />} />

      {/* Sobre o autor */}
      <Route path="/autor" element={<Autor />} />
    </Routes>
  );
}
 