import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import validationForgotPass from './validationForgotPass';
import {
  FormBackground,
  FormLogo,
  FormContainer,
  FormHeading, 
  FormLabel,
  FormInput, 
  FormAstric, 
  FlexDiv,
  SubmitButton, 
  ErrorMessage
} from '../Register/forms.style.js';
import GLlogo from '../../../Utils/Images/GL-logo.jpg'

const ForgotPass = () => {
  var Status = false;
  const navigate = useNavigate();
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
        (document.getElementsByName(arrUserKeys[i]))[1].style.borderBottom = "2px solid red";
      }
    }

    if (e.target.value === '') {
      e.target.style.borderBottom = "2px solid red";
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
        if (obj.email === email) {
          Status = true;
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
              designation: obj.designation,
              password: password,          //new Password rest are old
              user_type: obj.user_type
            }
            axios.put(`http://localhost:3003/users/${obj.id}`, upObj);  //updated user data
            Swal.fire("Congrats", "You have Successfully changed Password!", "success");
            navigate("/login");
            return;
          }
        }
      })

      if (Status === false) {
        setError('Email not Registered!')
        Swal.fire("Oops!", "Email not Registered!", "error");
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

  const formProp = [
    {
      name: 'email',
      label: 'Email',
      placeholder: 'Enter your Email',
      value: email,
      onChange: (e) => onInputChange(e, 0)
    }
  ];

  const formPass = [
    {
      name: 'password',
      label: 'New Password',
      placeholder: 'Enter your New Password',
      value: password,
      onChange: (e) => onInputChange(e, 1),
      showStatus: show,
      visibilityFunc: changeVisibility
    },
    {
      name: 'confirmPass',
      label: 'Confirm New Password',
      placeholder: 'Enter your Confirm New Password',
      value: confirmPass,
      onChange: (e) => onInputChange(e, 2),
      showStatus: showCP,
      visibilityFunc: changeVisibilityCP
    },
  ];

  return (
    <FormBackground>
      <Link to='/'>
        <FormLogo src={GLlogo} />
        </Link>
      <FormContainer>
          <FormHeading> Forgot password </FormHeading>
          
            {formProp.map((obj, index) => (
              <>
                <FormLabel name={obj.name}>{obj.label}</FormLabel><FormAstric>*</FormAstric>
                <FormInput type="text" {...obj}/>
              </>
            )
            )}

            {formPass.map((obj) => (
              <>
                <FormLabel name={obj.name}> {obj.label} </FormLabel>
                <FormAstric className='required-astric'>*</FormAstric>
                <FormInput type={obj.showStatus ? "text" : "password"} {...obj}
                />
                {obj.showStatus ? <VisibilityOffIcon onClick={obj.visibilityFunc} /> : <VisibilityIcon onClick={obj.visibilityFunc} />}
              </>
            )
            )}

          <FlexDiv>
            {error && <ErrorMessage>{error}</ErrorMessage>}
          </FlexDiv>

          <FlexDiv>
            <SubmitButton onClick={e => onSubmit(e)}>Change Password</SubmitButton>
          </FlexDiv>

        </FormContainer>
    </FormBackground>
    
  );
}

export default ForgotPass;