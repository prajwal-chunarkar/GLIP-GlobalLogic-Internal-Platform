import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Swal from "sweetalert2";
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../../../Navbar/navbar'
import ValidateEmpAccess from './validate-emp-access';

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
} from '../../Transport/Transport-Employee/transport-emp.style';

import { FormInputArea } from './access-privilege-emp.style.js'

import { TextField } from '@mui/material'
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DatePicker } from '@mui/x-date-pickers';

const AccessPrivilegeEmp = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [managerList, setManagerList] = useState([]);

  const [accessRequest, setAccessRequest] = useState(() => {
    var localStore = JSON.parse(localStorage.getItem("accessData"));
    if (localStore) {
      localStore.date = new Date(localStore.date)
    }
    return localStore || {
      empName: '',
      empID: '',
      requestFor: '',
      manager: '',
      reason: '',
      date: '',
    }
  });

  const { empName, empID, manager, requestFor, reason, date } = accessRequest;

  useEffect(() => {
    fetchdata();
  }, [])

  const fetchdata = async () => {
    await axios.get(`http://localhost:3003/users/${id}`)
      .then((res) => {
        setAccessRequest({
          ...accessRequest,
          'empName': `${res.data.fname} ${res.data.lname}`,
          'empID': res.data.empID,
        })
      })
    
      // -------------------Manager List Array of Data------------------------//
    await axios.get(`http://localhost:3003/users`)
      .then((res) => {
        const result = res.data.filter((user) => {
          return user.designation === "Manager";
        });
        setManagerList(result);
      })
  }

  const onInputChange = (e) => {
    setAccessRequest({ ...accessRequest, [e.target.name]: e.target.value });
  }

  const [error, setError] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();
    const accessReqError = ValidateEmpAccess(accessRequest);

    if (accessReqError !== null) {
      setError(accessReqError);
      return;
    }
    else {
      setError(null);
      axios.post("http://localhost:3003/access-previlege-request", accessRequest)
      Swal.fire("Congrats", "You have sent Access Privilege Request Successfully.", "success");
      localStorage.removeItem('accessData');   //clear Access Privilege Form Data
      navigate(`/dashboard/${id}`);
      return;
    }
  }

  const formProps1 = [
    {
      name: 'empID',
      label: 'Employee ID',
      value: empID
    },
    {
      name: 'empName',
      label: 'Employee Name',
      value: empName
    },
    {
      name: 'requestFor',
      label: 'Raise Access for Role',
      placeholder: 'Select the Role',
      onChange: (e) => onInputChange(e),
      value: requestFor
    },
    {
      name: 'manager',
      label: 'Select Manager',
      placeholder: 'Select Manager',
      onChange: (e) => onInputChange(e),
      value: manager
    },
    {
      name: 'reason',
      label: 'Reason',
      placeholder: 'Please Fill Reason',
      onChange: (e) => onInputChange(e),
      value: reason
    }
  ]

  const selectRoleProps = [
    { label: 'Admin', value: 'Admin' },
    { label: 'Transport Admin', value: 'Transport Admin' },
    { label: 'HR Admin', value: 'HR Admin' },
    { label: 'Payroll Admin', value: 'Payroll Admin' },
    { label: 'Manager Admin', value: 'Manager Admin' }
  ]

  const onCancel = () => {
    setAccessRequest({
      ...accessRequest,
      requestFor: '',
      manager: '',
      reason: '',
      date: '',
    })
    localStorage.removeItem('accessData');   //clear Access Privilege Form Data
  }

  const onSave = () => {
    localStorage.setItem("accessData", JSON.stringify(accessRequest));
    Swal.fire("Congrats", "Saved as Draft Successfully.", "success");
  }

  return (
    <>
      <Navbar />
      <FormHeading> Access Privilege </FormHeading>
      <TranspEmpBody>
        <FormContainer>

          {formProps1.map((obj, index) => {
            if (index === 2 || index === 3) {
              return (
                <>
                  <FormLabel name={obj.name} > {obj.label} </FormLabel>
                  <FormAstric>*</FormAstric> <br />
                  {index !== 3 ?
                    <Select
                      value={obj.value}
                      style={{ width: '100%', height: '3rem', marginTop: '0.4rem' }}
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
                      {selectRoleProps.map((prop, ind) => (
                        <MenuItem {...prop} >
                          {prop.label}
                        </MenuItem>
                      ))}
                    </Select> :

                    <Select
                      value={obj.value}
                      style={{ width: '100%', height: '3rem', marginTop: '0.4rem' }}
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
                      {managerList.map((man, ind) => (
                        <MenuItem value={`${man.fname} ${man.lname}`} >
                          {man.fname} {man.lname}
                        </MenuItem>
                      ))}
                    </Select>
                  }
                  <br /><br />
                </>
              )
            }
            return (
              <>
                <FormLabel name={obj.name}>{obj.label}</FormLabel>
                <FormAstric>*</FormAstric>
                {index !== 4 ?
                  <FormInput type="text" {...obj} />
                  :
                  <FormInputArea type="text" {...obj} />
                }
              </>
            )
          }
          )}

          <FormLabel name='date'>Date</FormLabel>
          <FormAstric>*</FormAstric> <br />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker disablePast
              sx={{
                svg: { color: "#F37037" }
              }}
              className="myDatePicker"
              value={date? date : null}
              slotProps={{ textField: { fullWidth: true } }}
              renderinput={(params) => <TextField {...params} />}
              onChange={(newValue) => {
                // const myDate = newValue.toISOString().slice(0, 10);
                // const my2Date = `${myDate.slice(5,7)}-${myDate.slice(8,10)}-${myDate.slice(0,4)}`;
                setAccessRequest({
                  ...accessRequest, 'date': newValue
                })
              }}
            />
            <br /><br />
          </LocalizationProvider>

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

export default AccessPrivilegeEmp