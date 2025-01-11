import React, { useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Admin from "../pages/admin/Admin";
import Lead from "../pages/lead/Lead";
import Material from "../pages/material/Material";
import Customer from "../pages/customer/Customer";
import Flat from "../pages/addflat/AddFlats";
import AddLands from "../pages/addlands/AddLands";
import Latter from "../pages/latters/Latter";
import AddLead from "../pages/lead/AddLead";
import LandPurchase from "../pages/addlands/LandPurchase";
import AddCustomer from "../pages/customer/AddCustomer";
import Login from '../Login/Login';
import EditLead from './lead/EditLead';
import FlatList from './addflat/FlatList';
import Flatowner from './addflat/Flatowner';

import EditLand from './addlands/EditLand';

import Addmeterial from './material/Addmeterial';
import Offerlatter from './latters/Offerlatter';
import Relievinglatter from './latters/Relievinglatter';
import SalarySlip from './latters/SalarySlip';
import AllotmentLatter from './latters/AllotmentLatter';
import Demandlatter from './latters/Demandlatter';
import LatterHead from './latters/LatterHead';
import Home from './admin/Home';
function Dash() {


  return (
    <>
      <Routes>
        <Route element={<Home />} index path='/' />
        <Route element={<Login />} path="/login" />
        <Route element={<Lead />} path="lead" />
        <Route element={<Material />} path="material" />
        <Route element={<Addmeterial />} path="addmaterial/:id" />
        <Route element={<Customer />} path="customer" />
        <Route element={<AddCustomer />} path="clist" />
        <Route element={<Flat />} path="flat/:id" />
        <Route element={<Flat />} path="flat" />
        <Route element={<FlatList />} path='flatlist/:id' />
        <Route element={<EditLead />} path="editlead/:id" />
        <Route element={<Flatowner />} path='flatowner/:id' />
        <Route element={<AddLead />} path="addlead" />
        <Route element={<AddLands />} path="lands" />
        <Route element={<LandPurchase />} path="landpurchase" />
        <Route element={<EditLand />} path="editland/:id" />
        <Route element={<LandPurchase />} path="landpurchase" />
        <Route element={<Latter />} path="letter" />
        <Route element={<Offerlatter />} path='/offerlatter' />
        <Route element={<Relievinglatter />} path='/Relievinglatter' />
        <Route element={<SalarySlip />} path='/SalarySlip' />
        <Route element={<AllotmentLatter />} path='/allotment' />
        <Route element={<Demandlatter />} path='/demand' />
        <Route element={<LatterHead/>} path='/letterhead'/>
      </Routes>
    </>
  )
}

export default Dash