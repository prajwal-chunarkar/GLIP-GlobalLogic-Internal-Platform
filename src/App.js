import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'

import DashboardBody from './Components/Dashboard/dashboard-body'
//GK-----------------------------------------------
import InitialName from './Components/GK/InitialName'
// import Practice from './Components/GK/Practice';
// import FileUploadComponent from './Components/GK/File-Upload-Component';
// import AdminUpload from './Components/GK/File-Upload-Component';
// import UserFiles from './Components/GK/user-view-upload';

//-----------------------------------------------

import Register from './Components/Authentication/Register/register';
import Login from './Components/Authentication/Login/login';
import ForgotPass from './Components/Authentication/Forgot_Password/forgotPass';
import Deactivate from './Components/Authentication/Deactivate/deactivate';
import Home from './Components/Home/home'
import NotFound from './Components/NotFound/NotFound'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/initname" element={<InitialName />} />
          <Route path="/dashboard/:id" element={<DashboardBody />} />
          {/* <Route path="/practice" element={<Practice />} />
          <Route path="/upload" element={<AdminUpload />} />
          <Route path="/userview" element={<UserFiles />} /> */}

          {/* Prajwal */}
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/forgotpassword' element={<ForgotPass />} />
          <Route path='/deactivate' element={<Deactivate />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
