import "./App.css";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DrawerProvider } from "./DrawerContext";
import Admin from "./pages/admin/Admin";
// import Lead from "./pages/lead/Lead";
// import Material from "./pages/material/Material";
// import Customer from "./pages/customer/Customer";
// import Flat from "./pages/addflat/AddFlats";
// import AddLands from "./pages/addlands/AddLands";
// import Latter from "./pages/latters/Latter";
// import AddLead from "./pages/lead/AddLead";
// import LandPurchase from "./pages/addlands/LandPurchase";
// import AddCustomer from "./pages/customer/AddCustomer";
import Login from "./Login/Login";
// import { useEffect, useState } from "react";
// import EditLead from "./pages/lead/EditLead";
// import EditLand from "./pages/addlands/EditLand";
// import EditCustomer from "./pages/customer/EditCustomer";
import Dash from "./pages/Dash";
// import Login from "./Login/Login";
function App() {
  return (
    <>
      {/* <Login /> */}
      <DrawerProvider>
        {/* <Routes>
        <Route element={<Login />} path="/login" />
        <Route element={<Admin />} path="/">
          <Route element={<h1>Welcome </h1>} path="" index />
          <Route element={<Lead />} path="lead" />
          <Route element={<AddLead />} path="addlead" />
          <Route element={<EditLead />} path="editlead/:id" />
          <Route element={<AddLands />} path="lands" />
          <Route element={<LandPurchase />} path="landpurchase" />
          <Route element={<EditLand />} path="editland/:id" />
          <Route element={<Material />} path="material" />
          <Route element={<Customer />} path="customer" />
          <Route element={<AddCustomer />} path="clist" />
          <Route element={<Flat />} path="flat" />
          <Route element={<Latter />} path="latter" />
          <Route element={<EditCustomer/>} path="editcustomer/:id"/>
        </Route>
      </Routes> */}
        <Admin />
        <Dash />
      </DrawerProvider>
    </>
  );
}

export default App;
