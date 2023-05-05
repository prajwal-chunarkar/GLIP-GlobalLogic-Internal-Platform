import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './Components/Authentication/Register/register';
import Login from './Components/Authentication/Login/login';
import ForgotPass from './Components/Authentication/Forgot_Password/forgotPass';
import Deactivate from './Components/Authentication/Deactivate/deactivate';
import Home from './Components/Home/home'
import NotFound from './Components/NotFound/NotFound'
import Dashboard from './Components/Dashboard/dashboard';
import ResetPassword from './Components/Authentication/Reset_Password/reset-password'

//Tiles

import AccessAdmin from './Components/Tiles/Access-Privillage/Access-Privillage-Admin/access-admin';
import AccessEmp from './Components/Tiles/Access-Privillage/Access-Privillage-Employee/access-emp';

import EmpListAdmin from './Components/Tiles/Employee-List/emp-list-admin';
import TranspAdmin from './Components/Tiles/Transport/Transport-Admin/transp-admin';
import TransportEmp from './Components/Tiles/Transport/Transport-Employee/transport-emp';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register/>} />
          <Route path='/login' element={<Login />} />
          <Route path='/forgotpassword' element={<ForgotPass />} />
          <Route path='/deactivate' element={<Deactivate />} />
          <Route path='/dashboard/:id' element={<Dashboard />} />
          <Route path='/resetpassword/:id' element={<ResetPassword />} />
          <Route path='*' element={<NotFound />} />
          
          {/* Tiles */}
          <Route path='/dashboard/accessadmin/:id' element={<AccessAdmin />} />
          <Route path='/dashboard/accessemp/:id' element={<AccessEmp />} />
          <Route path='/dashboard/emplistadmin/:id' element={<EmpListAdmin />} />
          <Route path='/dashboard/transpadmin/:id' element={<TranspAdmin />} />
          <Route path='/dashboard/transpemp/:id' element={<TransportEmp />} />
          
        </Routes>
      </BrowserRouter>
      
    </>
  );
}

export default App;
