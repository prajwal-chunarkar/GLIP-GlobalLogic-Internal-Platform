import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios';
import Swal from "sweetalert2";
import { Link, useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import validationRegister from './validationRegister';
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
} from './forms.style';
import GLlogo from '../../../Utils/Images/GL-logo.jpg'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

const Register = () => {
  const navigate = useNavigate();

  const [totalRegistered, setTotalRegistered] = useState();
  const [newID, setNewID] = useState()

  const [result, setResult] = useState([]);
  const [user, setUser] = useState({
    fname: '',
    mname: '',
    lname: '',
    email: '',
    phone: '',
    workLocation: '',
    address: '',
    gender: '',
    dob: '',
    designation: '',
    password: '',
    empID: newID,
    user_type: 'employee'               //By default employee
  })
  const { fname, mname, lname, email, phone, workLocation, address, gender, dob, designation, password } = user;

  useEffect(() => {
    fetchdata();
  }, [])                          //only once when load

  const fetchdata = async () => {
    await axios.get(`http://localhost:3003/users`)
      .then((res) => {
        setResult(res.data);
      })

    await axios.get(`http://localhost:3003/total-registrations`)
      .then((res) => {
        setTotalRegistered(res.data.total_registrations + 1);
        setNewID(res.data.total_registrations + 1001)
        setUser({ ...user, "empID": res.data.total_registrations + 1001 })
      })
  }

  var arrUserKeys = Object.keys(user);
  var arrUservalues = Object.values(user);

  useEffect(() => {
    arrUservalues = Object.values(user)
  }, [user])

  const genderRef = useRef();

  const onInputChange = (e, n) => {
    setUser({ ...user, [e.target.name]: e.target.value });   //arrays of objects

    for (let i = 0; i < n; i++) {
      if (arrUservalues[i] === '' && i !== 1) {
        if (arrUserKeys[i] === 'gender') {
          genderRef.current.style.color = "red";
        }
        else {
          console.log("this is bug");
          (document.getElementsByName(arrUserKeys[i]))[0].style.color = "red";
          (document.getElementsByName(arrUserKeys[i]))[1].style.borderBottom = "2px solid red";
        }
      }
    }

    if (e.target.value === '' && e.target.name !== 'mname') {
      e.target.style.borderBottom = "2px solid red";
      (document.getElementsByName(arrUserKeys[n]))[0].style.color = "red";
    }
    else {
      e.target.style.borderBottom = null;
      (document.getElementsByName(arrUserKeys[n]))[0].style.color = null;
    }
  }

  //Confirm Password
  const [confirmPass, setConfirmPass] = useState("");

  const [error, setError] = useState(null);
  var status = true;

  const onSubmit = (e) => {
    e.preventDefault();       //PREVENT REFRESH OF PAGE
    const registerError = validationRegister(user, confirmPass);             //validation

    if (registerError !== null) {
      setError(registerError);
      return;
    }

    else {
      setError(null);
      result.forEach((obj) => {
        if (obj.email === email) {
          status = false;
          setError("Email Already Registered!");
          Swal.fire("Oops!", "Email Already Registered!", "error");
          return;
        }
      })

      if (status === true) {
        setError(null);

        axios.put("http://localhost:3003/total-registrations", {
          total_registrations: totalRegistered,
        })

        axios.post("http://localhost:3003/users", user)
        Swal.fire("Congrats", "You have Successfully Registered.", "success");
        navigate('/')
        return;
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
      name: 'fname',
      label: 'First Name',
      placeholder: 'Enter your First Name',
      value: fname
    },
    {
      name: 'mname',
      label: 'Middle Name',
      placeholder: 'Enter your Middle Name',
      value: mname
    },
    {
      name: 'lname',
      label: 'Last Name',
      placeholder: 'Enter your Last Name',
      value: lname
    },
    {
      name: 'email',
      label: 'Email',
      placeholder: 'Enter your Email',
      value: email
    },
    {
      name: 'phone',
      label: 'Phone',
      placeholder: 'Enter your Phone Number',
      value: phone
    },
    {
      name: 'workLocation',
      label: 'Work Location',
      placeholder: 'Enter your Work Location(City)',
      value: workLocation
    },
    {
      name: 'address',
      label: 'Address',
      placeholder: 'Enter your Address',
      value: address
    },
    {
      name: 'gender',
      label: 'Gender',
      ref: genderRef
    },
    {
      name: 'dob',
      label: 'Date of Birth',
      placeholder: 'MM/YYYY',
      value: dob
    },
    {
      name: 'designation',
      label: 'Designation',
      placeholder: 'Enter Your Designation',
      value: designation
    }
  ]

  const formPass = [
    {
      name: 'password',
      label: 'Password',
      placeholder: 'Enter your Password',
      value: password,
      onChange: (e) => onInputChange(e, 8),
      showStatus: show,
      visibilityFunc: changeVisibility
    },
    {
      name: 'confirmPass',
      label: 'Confirm Password',
      placeholder: 'Enter your Confirm Password',
      value: confirmPass,
      onChange: (e) => setConfirmPass(e.target.value),
      showStatus: showCP,
      visibilityFunc: changeVisibilityCP
    },
  ]

  const genderProps = [
    {
      name: 'gender',
      label: 'Male',
      value: 'male'
    },
    {
      name: 'gender',
      label: 'Female',
      value: 'female'
    },
  ]

  return (
    <FormBackground>

      <Link to='/'>
        <FormLogo src={GLlogo} />
      </Link>

      <FormContainer>
        <FormHeading> Registration </FormHeading>

        {formProp.map((obj, index) => {
          if (obj.name === 'gender') {
            return (
              <>
                <FormLabel {...obj}>{obj.label}</FormLabel>
                <FormAstric>*</FormAstric> <br />
                <RadioGroup style={{ marginBottom: '0.9rem' }}
                  name={obj.name}
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                >
                  {genderProps.map((gen) => (
                    <FormControlLabel {...gen}
                      onChange={(e) => onInputChange(e, index)}
                      control={<Radio
                        sx={{
                          '&, &.Mui-checked': {
                            color: '#6D6E71',
                          }
                        }}
                      />} />
                  ))}
                </RadioGroup>
              </>
            )
          }
          return (
            <>
              <FormLabel name={obj.name}>{obj.label}</FormLabel>
              {obj.name !== 'mname' && <FormAstric>*</FormAstric>}
              <FormInput type="text" {...obj}
                onChange={(e) => onInputChange(e, index)} />
            </>
          )
        }
        )}

        {formPass.map((obj) => (
          <>
            <FormLabel name={obj.name}>{obj.label}  </FormLabel><FormAstric>*</FormAstric>
            <FormInput type={obj.showStatus ? "text" : "password"} {...obj}
            />
            {obj.showStatus ? <VisibilityOffIcon onClick={obj.visibilityFunc} /> :
              <VisibilityIcon onClick={obj.visibilityFunc} />}
          </>
        )
        )}

        <FlexDiv>
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </FlexDiv>

        <FlexDiv>
          <SubmitButton onClick={e => onSubmit(e)}>Register</SubmitButton>
        </FlexDiv>

        <LinksDiv>
          <Link style={{ textDecoration: 'none' }}
            to="/login">
            <FormLinks>Already Registered? Login</FormLinks>
          </Link>
        </LinksDiv>
      </FormContainer>
    </FormBackground>

  );
}

export default Register;