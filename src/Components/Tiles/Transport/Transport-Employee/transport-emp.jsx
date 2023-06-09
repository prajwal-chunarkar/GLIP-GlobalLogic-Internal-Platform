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

  const [transRequest, setTransRequest] = useState(() => {
    var localStore = JSON.parse(localStorage.getItem("transpData"));
    if (localStore) {
      localStore.startDate = new Date(localStore.startDate)
      localStore.endDate = new Date(localStore.endDate)
    }
    return localStore || {
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
    }
  });

  const { empName, empID, location, pickupLocation, pickupAddress, dropLocation, dropAddress, startDate, endDate, returnTrip, weekDays } = transRequest;

  useEffect(() => {
    fetchdata();
  }, []);                          //only once when load

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
      return;
    }
    else {
      setError(null);
      axios.post("http://localhost:3003/transport-request", transRequest)
      Swal.fire("Congrats", "You have sent Transport Request Successfully.", "success");
      localStorage.removeItem('transpData');   //clear Access Privilege Form Data
      navigate(`/dashboard/${id}`);
      return;
    }
  }

  const formProps1 = [
    {
      label: 'Employee ID',
      name: 'empID',
      value: empID,
    },
    {
      label: 'Employee Name',
      name: 'empName',
      value: empName,
    },
    {
      label: 'Work Location',
      name: 'location',
      value: location
    },
    {
      label: 'Pickup Location',
      name: 'pickupLocation',
      value: pickupLocation,
      onChange: (e) => onInputChange(e),
    },
    {
      label: 'Pickup Address',
      name: 'pickupAddress',
      placeholder: 'Automatically Fetch on Selecting Pickup Location',
      value: pickupAddress
    },
    {
      name: 'dropLocation',
      label: 'Drop Location',
      placeholder: 'Automatically Fetch on Selecting Pickup Location',
      value: dropLocation
    },
    {
      label: 'Drop Address',
      name: 'dropAddress',
      placeholder: 'Automatically Fetch on Selecting Pickup Location',
      value: dropAddress
    }
  ]

  const datesData = [
    {
      label: 'Start Date',
      name: 'startDate',
      value: startDate
    },
    {
      label: 'End Date',
      name: 'endDate',
      value: endDate
    }
  ]
  const returnTripProp = ['Yes', 'No'];
  const pickupLocOpts = [ 'Home', 'Office' ];

  useEffect(() => {
    if (startDate && endDate) {
      setTransRequest({
        ...transRequest, 'weekDays': CountWeekdays(startDate, endDate)
      })
    }
  }, [startDate, endDate])

  const onCancel = () => {
    setTransRequest({
      ...transRequest,
      pickupLocation: '',
      pickupAddress: '',
      dropLocation: '',
      dropAddress: '',
      startDate: '',
      endDate: '',
      returnTrip: '',
      weekDays: ''
    })
    localStorage.removeItem('transpData');   //clear Access Privilege Form Data
  }

  const onSave = () => {
    localStorage.setItem("transpData", JSON.stringify(transRequest));
    Swal.fire("Congrats", "Saved as Draft Successfully.", "success");
  }

  return (
    <>
      <Navbar />
      <FormHeading> Transport Request </FormHeading>
      <TranspEmpBody>
        <FormContainer>

          {formProps1.map((obj, index) => {
            if (obj.name === 'pickupLocation') {
              return (
                <>
                  <FormLabel name={obj.name} > {obj.label} </FormLabel>
                  <FormAstric>*</FormAstric> <br />
                  <Select
                    style={{ width: '97%', height: '3rem' }}
                    name={obj.name} onChange={obj.onChange}
                    value={pickupLocation}
                    sx={{
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#F37037',
                      },
                      '.MuiSvgIcon-root ': {
                        fill: "#F37037",
                      }
                    }}
                  >
                    {pickupLocOpts.map((opt, ind) => (
                      <MenuItem value={opt} >
                        {opt}
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
                  value={obj.value ? obj.value : null}
                  onChange={(newValue) => {
                    setTransRequest({
                      ...transRequest, [obj.name]: newValue })
                  }}
                />
                <br /><br />
              </LocalizationProvider>
            </>
          ))}

          <>
            <FormLabel>Week Days</FormLabel>
            <FormAstric>*</FormAstric>
            <FormInput type="text" placeholder='Calculate Automatically' name='weekDays' value={weekDays} />
          </>

  {/* ----------------------------------------------------------------------- */}
          <FormLabel>Return Trip</FormLabel>
          <FormAstric>*</FormAstric> <br />
          <RadioGroup
            row
            name="returnTrip"
            value={returnTrip}
            onChange= {(e) => onInputChange(e)}
          >
            {returnTripProp.map((opt) => (
              <FormControlLabel
              label={opt} value={opt}
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
            <SubmitButton onClick={e => onCancel(e)}>
              Cancel
            </SubmitButton>
            <SubmitButton onClick={e => onSave(e)}>
              Save as Draft
            </SubmitButton>
          </FlexDiv>
        </FormContainer>
      </TranspEmpBody >
    </>
  )
}

export default TransportEmp