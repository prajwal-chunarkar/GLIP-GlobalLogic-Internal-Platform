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

import AccessPrivilegeAdmin from './Components/Tiles/Access-Privilege/Access-Privilege-Admin/access-privilege-admin';

import AccessPrivilegeEmp from './Components/Tiles/Access-Privilege/Access-Privilege-Employee/access-privilege-emp';

import FilterPrac from './Components/Tiles/Employee-List/employee-list';

import TransportEmp from './Components/Tiles/Transport/Transport-Employee/transport-emp';

import TransportAdmin from './Components/Tiles/Transport/Transport-Admin/transport-admin';

import TransportAdminApprovedRequest from './Components/Tiles/Transport/Transport-Admin/transport-admin-approved-request';



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
          {/* <Route path='/dashboard/accessadmin/:id' element={<AccessAdmin />} /> */}

          <Route path='/dashboard/admin-access-previleges/:id' element={<AccessPrivilegeAdmin />} />

          <Route path='/dashboard/accessemp/:id' element={<AccessPrivilegeEmp />} />
          <Route path='/dashboard/emplistadmin/:id' element={<FilterPrac />} />

          <Route path='/dashboard/transpemp/:id' element={<TransportEmp />} />
          <Route path='/dashboard/admin-transport/:id' element={<TransportAdmin />} />
          <Route path='/dashboard/admin-transport/admin-transport-approved-request/:id' element={<TransportAdminApprovedRequest />} />
         
        </Routes>
      </BrowserRouter>
      
    </>
  );
}

export default App;
