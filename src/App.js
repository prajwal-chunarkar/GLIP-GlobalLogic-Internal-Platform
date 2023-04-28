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

function App() {
  return (
    <div>
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
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
