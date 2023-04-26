import React, { useState, useEffect } from 'react'
import './forgetPass-style.css'
import axios from 'axios';
import Swal from "sweetalert2";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import validationForgotPass from './validationForgotPass';
import uniqid from 'uniqid';
import { Link } from 'react-router-dom';

const ForgotPass = () => {
  var Status = false;
  // const navigate = useNavigate();
  const [result, setResult] = useState([]);         //imp

  useEffect(() => {
    fetchdata();
  }, [])                          //only once when load

  const fetchdata = async () => {
    const res = await axios.get(`http://localhost:3003/users`);
    setResult(res.data);          //result=res.data
    console.log(result)
  }

  const [user, setUser] = useState({         //objects
    email: "",
    password: "",
    confirmPass: ""
  })

  const { email, password, confirmPass } = user;

  var arrUserKeys = Object.keys(user);
  var arrUservalues = Object.values(user)

  useEffect(() => {
    arrUservalues = Object.values(user)
  }, [user])

  const onInputChange = (e, n) => {
    setUser({ ...user, [e.target.name]: e.target.value });          //single object

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

  const onSubmit = (e) => {
    e.preventDefault();       //PREVENT REFRESH OF PAGE

    const forgotPassError = validationForgotPass(user);             //validation

    if (forgotPassError !== null) {
      setError(forgotPassError);
      return;
    }
    else {
      setError(null)
      result.forEach((obj) => {
        Status = true;
        if (obj.email === email) {
          if (obj.password === password) {
            setError("This is your old password!");
            return;
          }
          else {
            const upObj = {
              fname: obj.fname,
              mname: obj.mname,
              lname: obj.lname,
              email: obj.email,
              phone: obj.phone,
              address: obj.address,
              gender: obj.gender,
              dob: obj.dob,
              password: password          //new Password rest are old
            }
            axios.put(`http://localhost:3003/users/${obj.id}`, upObj);  //updated user data
            Swal.fire("Congrats", "You have Successfully changed Password!", "success");
            // navigate("/login");
            return;
          }
        }
      })

      if (Status === false) {
        setError('Invalid Email ID!')
        Swal.fire("Oops!", "Invalid Email ID!", "error");
      }
    }
  }

  //password hide & show
  const [show, setShow] = useState(false);
  const changeVisibility = (e) => {
    e.preventDefault();
    setShow(current => !current);
  }
  //confirm password hide & show
  const [showCP, setShowCP] = useState(false);
  const changeVisibilityCP = (e) => {
    e.preventDefault();
    setShowCP(current => !current);
  }

  return (
    <div className='forgot-container'>
      <form onSubmit={e => onSubmit(e)}>
        <div className='container'>
          <p className='heading'> Forgot Password </p>
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
            {show ? <VisibilityOffIcon onClick={changeVisibility} /> : <VisibilityIcon onClick={changeVisibility} />}<br /><br />

            {/* Confirm Password */}
            <label name='confirmPass'>Confirm Password  </label> <span className='required-astric'>*</span>
            <input type={showCP ? "text" : "password"} placeholder='Enter Confirm New Password'
              name='confirmPass'
              value={confirmPass}
              onChange={(e) => onInputChange(e, 2)}
            />
            {showCP ? <VisibilityOffIcon onClick={changeVisibilityCP} /> : <VisibilityIcon onClick={changeVisibilityCP} />}
          </div>
          <br />

          <div className='error-div'>
            {error && <span className="errorMessage">{error}</span>}
          </div>
          <br />
          <div className='submit-div'>
            <button>Change Password</button>
          </div>

        </div>
      </form>
    </div>
  );
}

export default ForgotPass;