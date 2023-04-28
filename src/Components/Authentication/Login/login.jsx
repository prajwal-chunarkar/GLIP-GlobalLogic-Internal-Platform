import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Swal from "sweetalert2";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import validationLogin from './validationLogin';
import uniqid from 'uniqid';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
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
  ErrorMessage,
  LinksDiv,
  FormLinks
} from '../Register/forms.style.js';
import GLlogo from '../../../Utils/Images/GL-logo.jpg'

const Login = () => {
  const dispatch = useDispatch();
  var status = false;
  const navigate = useNavigate();
  const [result, setResult] = useState([]);         //imp

  useEffect(() => {
    fetchdata();
  }, [])                          //only once when load

  const fetchdata = async () => {
    const res = await axios.get(`http://localhost:3003/users`);
    setResult(res.data);
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

  const onInputChange = (e, n) => {
    setUser({ ...user, [e.target.name]: e.target.value });

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

  const onSubmit = e => {
    e.preventDefault();
    const loginError = validationLogin(email, password);             //validation

    if (loginError !== null) {
      setError(loginError);
      return;
    }
    else {
      setError(null);
      result.forEach((obj) => {
        if (obj.email === email) {
          status = true;
          if (obj.password === password) {
            localStorage.token = uniqid();
            Swal.fire("Congrats", "You have Login Successfully.", "success");
            dispatch({
              type: 'LOGIN'
            })
            navigate(`/dashboard/${obj.id}`);
            return;
          }
          else {
            Swal.fire("Oops!", "Incorrect Pasword!", "error");
            setError("Incorrect Pasword!");
            return;
          }
        }
      });

      if (status === false) {
        setError("Email not Registered!");
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

  const formProp = [
    {
      name: 'email',
      label: 'Email',
      placeholder: 'Enter your Email',
      value: email,
      onChange: (e) => onInputChange(e, 0)
    }
  ]

  const formPass = [
    {
      name: 'password',
      label: 'Password',
      placeholder: 'Enter your Password',
      value: password,
      onChange: (e) => onInputChange(e, 1),
      showStatus: show,
      visibilityFunc: changeVisibility
    }
  ]

  return (
    <FormBackground>
      <Link to='/'>
        <FormLogo src={GLlogo} />
        </Link>
      <FormContainer>
        <FormHeading> Login </FormHeading>
        {formProp.map((obj, index) => (
          <>
            <FormLabel name={obj.name}>{obj.label}</FormLabel>
            <FormAstric>*</FormAstric>
            <FormInput type="text" {...obj} />
          </>
        )
        )}

        {formPass.map((obj) => (
          <>
            <FormLabel name={obj.name}>{obj.label}</FormLabel>
            <FormAstric>*</FormAstric>
            <FormInput type={obj.showStatus ? "text" : "password"} {...obj}
            />
            {obj.showStatus ? <VisibilityOffIcon onClick={obj.visibilityFunc} /> : <VisibilityIcon onClick={obj.visibilityFunc} />}
          </>
        )
        )}

        <FlexDiv>
          {error && <ErrorMessage className="errorMessage">{error}</ErrorMessage>}
        </FlexDiv>

        <FlexDiv>
          <SubmitButton onClick={e => onSubmit(e)}>Login</SubmitButton>
        </FlexDiv>

        <LinksDiv>
          <Link style={{ textDecoration: 'none' }}
            to="/forgotpassword">
            <FormLinks>Forgot Password</FormLinks>
          </Link>
        </LinksDiv>

        <LinksDiv>
          <Link style={{ textDecoration: 'none' }}
            to="/register">
            <FormLinks>Not Registered? Register</FormLinks>
          </Link>
        </LinksDiv>
      </FormContainer>
    </FormBackground>

  );
}

export default Login;