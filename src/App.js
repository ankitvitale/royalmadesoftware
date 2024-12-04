import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Admin from "./pages/admin/Admin";
import Lead from "./pages/lead/Lead";
import Material from "./pages/material/Material";
import Customer from "./pages/customer/Customer";
import Flat from "./pages/addflat/AddFlats";
import AddLands from "./pages/addlands/AddLands";
import Latter from "./pages/latters/Latter";
import AddLead from "./pages/lead/AddLead";
import LandPurchase from "./pages/addlands/LandPurchase";
import AddCustomer from "./pages/customer/AddCustomer";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Admin />} path="/">
          <Route element={<h1>Welcome </h1>} path="abc" />
          <Route element={<Lead />} path="" index/>
          <Route element={<Material />} path="material" />
          <Route element={<Customer />} path="customer" />
          <Route element={<AddCustomer />} path="clist" />
          <Route element={<Flat />} path="flat" />
          <Route element={<AddLead />} path="addlead" />
          <Route element={<AddLands />} path="lands" />
          <Route element={<LandPurchase />} path="landpurchase" />
          <Route element={<Latter />} path="latter" />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
