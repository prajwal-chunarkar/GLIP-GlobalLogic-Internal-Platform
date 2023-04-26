import React, { useState, useEffect } from 'react'
import './deactivate-style.css'
import axios from 'axios';
import Swal from "sweetalert2";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import validationDeactivate from './validationDeactivate';

const Deactivate = () => {
  var status = false;
  // const navigate = useNavigate();
  const [result, setResult] = useState([]);         //imp

  useEffect(() => {
    fetchdata();
  }, [])                          //only once when load

  const fetchdata = async () => {
    const res = await axios.get(`http://localhost:3003/users`);
    setResult(res.data);          //result=res.data
  }

  const [user, setUser] = useState({
    email: "",
    password: ""
  })

  const { email, password } = user;

  var arrUserKeys = Object.keys(user);
  var arrUservalues = Object.values(user)

  useEffect(() => {
    arrUservalues = Object.values(user)
  }, [user])

  const onInputChange = (e,n) => {
    setUser({ ...user, [e.target.name]: e.target.value });

    for (let i = 0; i < n; i++) {
      if (arrUservalues[i] === '') {
        (document.getElementsByName(arrUserKeys[i]))[0].style.color = "red";
        (document.getElementsByName(arrUserKeys[i]))[1].style.borderBottom = "3px solid red";
      }
    }

    if (e.target.value === '') {
      e.target.style.borderBottom = "3px solid red";
      (document.getElementsByName(arrUserKeys[n]))[0].style.color = "red";
    }
    else {
      e.target.style.borderBottom = null;
      (document.getElementsByName(arrUserKeys[n]))[0].style.color = null;
    }
  }

  const [error, setError] = useState(null);
  const onSubmit = e => {
    e.preventDefault();
    const deactivateError = validationDeactivate(email,password)

    if (deactivateError !== null) {
      setError(deactivateError);
      return;
    }

    else{
      setError(null);
      result.forEach(async (obj) => {
        if (obj.email === email && obj.password === password) {
          // console.log(obj.id);
          status = true;
          await axios.delete(`http://localhost:3003/users/${obj.id}`);
          Swal.fire("Congrats", "You have Deactivate Your Account Successfully.", "success");
          // navigate("/");
        }
      })
  
      if (status === false) {
        setError('Invalid Credentials!');
        Swal.fire("Oops!", "Invalid Credentials!", "error");
      }
    }

    
  }

  //password hide & show
  const [show, setShow] = useState(false);
  const changeVisibility = (e) => {
    e.preventDefault();
    setShow(current => !current);
  }
  return (
    <div className='forgot-container'>
      <form onSubmit={e => onSubmit(e)}>
        <div className='container'>
          <p className='heading'> Deactivate Account </p>
          <div className='form'>

            <label name='email'>Email </label> <span className='required-astric'>*</span>
            <input type="text" placeholder='Enter your Email'
              name='email'
              value={email}
              onChange={(e) => onInputChange(e, 0)}
            /><br /> <br />

            <label name='password'>Password  </label> <span className='required-astric'>*</span>
            <input type={show ? "text" : "password"} placeholder='Enter New Password'
              name='password'
              value={password}
              onChange={(e) => onInputChange(e, 1)}
            />
            {show ? <VisibilityOffIcon onClick={changeVisibility} /> : <VisibilityIcon onClick={changeVisibility} />}<br/>

          </div>
          <br />

          <div className='error-div'>
            {error && <span className="errorMessage">{error}</span>}
          </div>
          <br />
          <div className='submit-div'>
            <button>Deactivate</button>
          </div>

        </div>
      </form>
    </div>
  );
}

export default Deactivate;