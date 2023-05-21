import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios';
import Swal from "sweetalert2";
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../../../Navbar/navbar'
import CountWeekdays from './count-week-days';

import {
  TranspEmpBody,
  FormContainer,
  FormHeading,
  FormLabel,
  FormInput,
  FormAstric,
  FlexDiv,
  SubmitButton,
  ErrorMessage,
  // LinksDiv,
  // FormLinks
} from './transport-emp.style.js';

import { TextField } from '@mui/material'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DatePicker } from '@mui/x-date-pickers';
import ValidateEmpTranspRequest from './validate-emp-transp-request';

const TransportEmp = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [locations, setLocations] = useState([]);         //imp
  const [currentUser, setCurrentUser] = useState({});         //imp

  const [transRequest, setTransRequest] = useState({
    empName: '',
    empID: '',
    location: '',
    pickupLocation: '',
    pickupAddress: '',
    dropLocation: '',
    dropAddress: '',
    startDate: '',
    endDate: '',
    returnTrip: '',
    weekDays: ''
  })

  const { empName, empID, location, pickupLocation, pickupAddress, dropLocation, dropAddress } = transRequest;

  useEffect(() => {
    fetchdata();
  }, [])                          //only once when load

  const fetchdata = async () => {
    await axios.get(`http://localhost:3003/users/${id}`)
      .then((res) => {
        setCurrentUser(res.data)
        setTransRequest({
          ...transRequest,
          'empName': `${res.data.fname} ${res.data.lname}`,
          'empID': res.data.empID,
          'location': res.data.workLocation
        })
      })

    await axios.get(`http://localhost:3003/locations`)
      .then((res) => {
        setLocations(res.data);
      })
  }

  const onInputChange = (e) => {
    setTransRequest({ ...transRequest, [e.target.name]: e.target.value })

    if (e.target.name === 'pickupLocation') {
      if (e.target.value === 'Home') {

        locations.forEach((loc) => {
          if (loc.city === location) {
            setTransRequest({
              ...transRequest,
              'pickupLocation': 'Home',
              'pickupAddress': currentUser.address,
              'dropLocation': 'Office',
              'dropAddress': loc.officeAddress
            })
          }
        })
      }
      else if (e.target.value === 'Office') {
        locations.forEach((loc) => {
          if (loc.city === location) {
            setTransRequest({
              ...transRequest,
              'pickupLocation': 'Office',
              'pickupAddress': loc.officeAddress,
              'dropLocation': 'Home',
              'dropAddress': currentUser.address
            })
          }
        })
      }
    }
  }

  const [error, setError] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();
    const transportEmpError = ValidateEmpTranspRequest(transRequest);

    if (transportEmpError !== null) {
      setError(transportEmpError);
      // console.log(transRequest)
      return;
    }
    else {
      setError(null);
      axios.post("http://localhost:3003/transport-request", transRequest)
      Swal.fire("Congrats", "You have sent Transport Request Successfully.", "success");
      // navigate(`/dashboard/${id}`);
      return;
    }
  }

  const formProps1 = [
    {
      name: 'empID',
      label: 'Employee ID',
      placeholder: 'Enter your Employee ID',
      value: empID,
      readonly: "readonly"
    },
    {
      name: 'empName',
      label: 'Employee Name',
      value: empName,
      readonly: 'readonly'
    },
    {
      name: 'location',
      label: 'Work Location',
      value: location
    },
    {
      name: 'pickupLocation',
      label: 'Pickup Location',
      // placeholder: 'Enter Pickup Location',
      onChange: (e) => onInputChange(e),
      value: pickupLocation,
    },
    {
      name: 'pickupAddress',
      label: 'Pickup Address',
      placeholder: 'Enter your Pickup Address',
      value: pickupAddress
    },
    {
      name: 'dropLocation',
      label: 'Drop Location',
      placeholder: 'Enter your Drop Location',
      value: dropLocation
    },
    {
      name: 'dropAddress',
      label: 'Drop Address',
      placeholder: 'Enter your Drop Address',
      value: dropAddress
    },

  ]

  const datesData = [
    {
      name: 'startDate',
      label: 'Start Date',
    },
    {
      name: 'endDate',
      label: 'End Date',
    }
  ]

  const returnTripProp = [
    {
      name: 'returnTrip',
      label: 'Yes',
      value: 'yes',
      onChange: (e) => onInputChange(e)
    },
    {
      name: 'returnTrip',
      label: 'No',
      value: 'no',
      onChange: (e) => onInputChange(e)
    }
  ]

  const pickupLocProps = [
    { label: 'Home', value: 'Home' },
    { label: 'Office', value: 'Office' }
  ]

  const [sDate, setSDate] = useState();
  const [eDate, setEDate] = useState();
  const [days, setDays] = useState(null);

  const weekDaysRef = useRef(null);
  var res;

  useEffect(() => {
    if (sDate && eDate) {
      res = CountWeekdays(sDate, eDate);
      setDays(res)
      setTransRequest({
        ...transRequest, [weekDaysRef.current.name]: res
      })
    }
  }, [sDate, eDate])

  return (
    <>
      <Navbar />
      <FormHeading> Transport Request </FormHeading>
      <TranspEmpBody>
        <FormContainer>

          {formProps1.map((obj, index) => {
            if (index === 3) {
              return (
                <>
                  <FormLabel name={obj.name} > {obj.label} </FormLabel>
                  <FormAstric>*</FormAstric> <br />
                  <Select
                    style={{ width: '97%', height: '3rem' }}
                    name={obj.name} onChange={obj.onChange}
                    sx={{
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#F37037',
                      },
                      '.MuiSvgIcon-root ': {
                        fill: "#F37037",
                      }
                    }}
                  >
                    {pickupLocProps.map((prop, ind) => (
                      <MenuItem {...prop} >
                        {prop.label}
                      </MenuItem>
                    ))}

                  </Select >
                  <br /><br />
                </>
              )
            }
            return (
              <>
                <FormLabel name={obj.name}>{obj.label}</FormLabel>
                <FormAstric>*</FormAstric>
                <FormInput type="text" {...obj}
                />
              </>
            )
          }
          )}

          {datesData.map((obj) => (
            <>
              <FormLabel name={obj.name}>{obj.label}</FormLabel>
              <FormAstric>*</FormAstric> <br />
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker disablePast
                  sx={{
                    svg: { color: "#F37037" },
                  }}
                  className="myDatePicker"
                  slotProps={{ textField: { fullWidth: true } }}
                  renderinput={(params) => <TextField {...params} />}
                  onChange={(newValue) => {
                    if (obj.name === 'startDate') {
                      setSDate(newValue)
                    }
                    else if (obj.name === 'endDate') {
                      setEDate(newValue)
                    }
                    setTransRequest({
                      ...transRequest, [obj.name]:
                        newValue.toISOString().slice(0, 10)
                    })
                  }}
                />
                <br /><br />
              </LocalizationProvider>
            </>
          ))}

          <>
            <FormLabel name='weekDays'>Week Days</FormLabel>
            <FormAstric>*</FormAstric>
            <FormInput type="text" placeholder='Week Days Generate Automatically' name='weekDays' ref={weekDaysRef} value={days} readonly />
          </>

  {/* ----------------------------------------------------------------------- */}
          <FormLabel name='returnTrip'>Return Trip</FormLabel>
          <FormAstric>*</FormAstric> <br />
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="returnTrip"
          >
            {returnTripProp.map((obj) => (
              <FormControlLabel
                {...obj}
                control={<Radio
                  sx={{
                    '&, &.Mui-checked': {
                      color: '#F37037',
                    },
                  }}
                />}
              />
            ))}
          </RadioGroup>

          <FlexDiv>
            {error && <ErrorMessage>{error}</ErrorMessage>}
          </FlexDiv>

          <FlexDiv>
            <SubmitButton onClick={e => onSubmit(e)}>
              Make Request
            </SubmitButton>
          </FlexDiv>
        </FormContainer>
      </TranspEmpBody >
    </>
  )
}

export default TransportEmp