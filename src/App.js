import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'

import InitialName from './InitialName'
import Practice from './Practice';
import DashboardBody from './Dashboard/dashboard-body';
import FileUploadComponent from './File-Upload-Component';
import AdminUpload from './File-Upload-Component';
import UserFiles from './user-view-upload';
import Register from './Register/register';
import Login from './Login/login';
import Home from './Home/home';
import ForgotPass from './Forgot_Password/forgotPass';
import NotFound from './NotFound/NotFound'
import Deactivate from './Deactivate/deactivate';

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
