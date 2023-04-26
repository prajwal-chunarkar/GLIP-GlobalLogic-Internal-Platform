import React, { useState, useEffect } from 'react'
import './register-style.css'
import axios from 'axios';
import Swal from "sweetalert2";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import validationRegister from './validationRegister';
import { Link } from 'react-router-dom';

const Register = () => {
  var status = true;

  const [result, setResult] = useState([]);

  useEffect(() => {
    fetchdata();
  }, [])                          //only once when load

  const fetchdata = async () => {
    const res = await axios.get(`http://localhost:3003/users`);
    setResult(res.data);
    // console.log(res.data);
  }

  const [user, setUser] = useState({
    fname: '',
    mname: '',
    lname: '',
    email: '',
    phone: '',
    address: '',
    gender: '',
    dob: '',
    password: ''
  })
  
  var arrUserKeys = Object.keys(user);
  var arrUservalues = Object.values(user)

  useEffect(()=> {
    arrUservalues = Object.values(user)
  },[user])

  const { fname, mname, lname, email, phone, address, gender, dob, password } = user;

 

  const onInputChange = (e,n) => {
    setUser({ ...user, [e.target.name]: e.target.value });   //arrays of objects
    
    for(let i=0;i<n;i++){
      if(arrUservalues[i] === '' && i!==1){
        (document.getElementsByName(arrUserKeys[i]))[0].style.color = "red";
        (document.getElementsByName(arrUserKeys[i]))[1].style.borderBottom = "3px solid red";
      }
    }
    
    if(e.target.value === '' && e.target.name!=='mname'){
      e.target.style.borderBottom = "3px solid red";
      (document.getElementsByName(arrUserKeys[n]))[0].style.color = "red";
    }
    else{
      e.target.style.borderBottom = null;
      (document.getElementsByName(arrUserKeys[n]))[0].style.color = null;
    }
  }

  const [error, setError] = useState(null);

  //Confirm Password
  const [confirmPass, setConfirmPass] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();       //PREVENT REFRESH OF PAGE
    const registerError = validationRegister(user,confirmPass);             //validation

    if(registerError !== null) {
      setError(registerError);
      return;
    }

    else {
      setError(null);
      result.forEach((obj) => {
        if (obj.email === email) {
          status = false;
          setError("Email Already Registered!")
          Swal.fire("Oops!", "Email Already Registered!", "error");
        }
      })

      if (status === true) {
        setError(null);
        axios.post("http://localhost:3003/users", user)
        Swal.fire("Congrats", "You have Successfully Registered.", "success");
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
    <div className='register-container'>
      <form onSubmit={e => onSubmit(e)}>
        <div className='container'>
          <p className='heading'> Registration </p>
          <div className='form'>
            <label name= 'fname'>First Name</label> <span className='required-astric'>*</span>
            <input type="text" placeholder='Enter your First Name'
              name='fname'
              value={fname}
              onChange={(e) => onInputChange(e,0)}
            /><br /> <br />

            <label name='mname'>Middle Name </label>
            <input type="text" placeholder='Enter your Middle Name'
              name='mname'
              value={mname}
              onChange={(e) => onInputChange(e,1)}
            /><br /> <br />

            <label name='lname'>Last Name </label> <span className='required-astric'>*</span>
            <input type="text" placeholder='Enter your Last Name'
              name='lname'
              value={lname}
              onChange={(e) => onInputChange(e,2)}
            /><br /> <br />

            <label  name='email'>Email </label> <span className='required-astric'>*</span>
            <input type="text" placeholder='Enter your Email'
              name='email'
              value={email}
              onChange={(e) => onInputChange(e,3)}
            /><br /> <br />

            <label name='phone'>Phone </label> <span className='required-astric'>*</span>
            <input type="text" placeholder='Enter your Phone'
              name='phone'
              value={phone}
              onChange={(e) => onInputChange(e,4)}
            /><br /> <br />

            <label name='address'>Address </label> <span className='required-astric'>*</span>
            <input type="text" placeholder='Enter your Address'
              name='address'
              value={address}
              onChange={(e) => onInputChange(e,5)}
            /><br /> <br />

            <label name='gender'>Gender </label> <span className='required-astric'>*</span>
            <input type="text" placeholder='Enter your Gender (Male/Female)'
              name='gender'
              value={gender}
              onChange={(e) => onInputChange(e,6)}
            />
            <br /> <br />

            <label name='dob'>Date of Birth :</label> <span className='required-astric'>*</span>
            <input type="text" placeholder='MM/YYYY'
              name='dob'
              value={dob}
              onChange={(e) => onInputChange(e,7)}
            /><br /> <br />

            <label name='password'>Password  </label> <span className='required-astric'>*</span>
            <input type={show ? "text" : "password"} placeholder='Enter your Password'
              name='password'
              value={password}
              onChange={(e) => onInputChange(e,8)}
            />
            {show ? <VisibilityOffIcon onClick={changeVisibility} /> : <VisibilityIcon onClick={changeVisibility} />}<br /> <br />

            {/* Confirm Password */}
            <label name='confirmpass'>Confirm Password  </label> <span className='required-astric'>*</span>
            <input type={showCP ? "text" : "password"} placeholder='Enter Confirm Password'
              name='confirmpass'
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value) }
            />
            {showCP ? <VisibilityOffIcon onClick={changeVisibilityCP} /> : <VisibilityIcon onClick={changeVisibilityCP} />}
          </div>
          <br />

          <div className='error-div'>
          {error && <span className="errorMessage">{error}</span>}
          </div>
          <br />
          <div className='submit-div'>
            <button>Register</button>
          </div>
          <br />
          
          <div className='already-registered'>
            <Link className='links'
              to="/login">
              <p>Alredy Registered? Login</p>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Register;