import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios';
import Swal from "sweetalert2";
import { useParams } from 'react-router-dom';
import Navbar from '../../../../Navbar/navbar'
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import {
  FeedFormBody,
  FormContainer,
  FormHeading,
  FormLabel,
  FormAstric,
  FlexDiv,
  SubmitButton,
  ErrorMessage,
} from './feed-form.style.js';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import ValidateFeedForm from './validate-feed-form';

const FeedForm = () => {
  const { id } = useParams();
  const [users, setUsers] = useState([]);
  const [currUser, setCurrUser] = useState({});  //data of user who give feedback 
  const [selects, setSelects] = useState([]);

  const [feedData, setFeedData] = useState({
    empName: '',
    empID: '',
    empDept: '',
    empFeedName: '',
    rating: ''
  })
  const { empDept, empFeedName, rating } = feedData;

  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = () => {
    axios.get(`http://localhost:3003/users`)
      .then((resp) => {
        setUsers(resp.data)
      })

    axios.get(`http://localhost:3003/users/${id}`)
      .then((res) => {
        setCurrUser(res.data);
        setFeedData({
          ...feedData,
          'empName': `${res.data.fname} ${res.data.lname}`,
          'empID': res.data.empID
        })
      });
  }

  const onInputChange = (e) => {
    setFeedData({ ...feedData, [e.target.name]: e.target.value })
  }

  const [error, setError] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();
    if (error !== 'You have Already sent feedback for same') {    //then onlu excecute
      const feedDataError = ValidateFeedForm(feedData);

      if (feedDataError !== null) {
        setError(feedDataError);
        return;
      }
      else {
        setError(null);
        axios.post("http://localhost:3003/feedbacks", feedData);
        Swal.fire("Congrats", "You have sent Feedback Successfully.", "success");
        // navigate(`/dashboard/${id}`);
        window.location.href = `/dashboard/feedback-form/${id}`;
        return;
      }
    }
  }

  const Devs = ['Intern', 'Associate Software Engineer', 'Software Engineer', 'Senior Software Engineer'];

  const adminTypes = ['Admin', 'HR Admin', 'Manager Admin', 'Payroll Admin', 'Transport Admin'];
  var state;

  useEffect(() => {
    setFeedData({ ...feedData, 'rating': '', 'empFeedName': '' })      //reset values on change of Team
    setSelects([]);                   //incase change emp_type (prevent addon)
    const currName = `${currUser.fname} ${currUser.lname}`;   //current user name
    if (empDept === 'Developer') {        //sorting all developers in selection
      users.forEach((obj) => {
        const tempName = `${obj.fname} ${obj.lname}`;
        isFeed = false;
        Devs.forEach((dev) => {    //as developer's user_type never be admin (its always employee)
          if (obj.designation === dev && currName !== tempName) {  //so no need to check wheater admin type or not       //curr user name will not come
            const newObj = {
              label: `${obj.fname} ${obj.lname}`,
              value: `${obj.fname} ${obj.lname}`
            }
            setSelects(selects => [...selects, newObj]);
            return;               //break and got to users.map (for next iteration)
          }
        });
      });
    }
    else if (empDept === 'Admin') {                  //sorting all admins in selection
      users.forEach((obj) => {
        const tempName = `${obj.fname} ${obj.lname}`;
        adminTypes.forEach((admin) => {
          if (obj.user_type === admin && currName !== tempName) { //curr user name will not come
            const newObj = {
              label: `${obj.fname} ${obj.lname}`,
              value: `${obj.fname} ${obj.lname}`
            }
            setSelects(selects => [...selects, newObj])
            return;          //break and got to users.map (for next iteration)
          }
        })
      })
    }
    else {                 //for all empType excepr devs & admins
      if (empDept) {
        users.forEach((obj) => {
          const tempName = `${obj.fname} ${obj.lname}`;
          state = true;
          if (obj.designation === empDept && currName !== tempName) { //curr user name will not come
            adminTypes.forEach((admin) => {
              if (obj.user_type === admin) {
                state = false;
                return;
              }
            })
            if (state === true) {
              const newObj = {
                label: `${obj.fname} ${obj.lname}`,
                value: `${obj.fname} ${obj.lname}`
              }
              setSelects(selects => [...selects, newObj])
              return;          //break and got to users.map (for next iteration)
            }
          }
        })
      }
    }
  }, [empDept]);

  var isFeed;
  useEffect((res) => {
    isFeed = false;
    axios.get('http://localhost:3003/feedbacks')
      .then((res) => {
        debugger;
        res.data.forEach((feed) => {
          if (feed.empID === currUser.empID && feed.empFeedName === empFeedName) {
            isFeed = true;         //feedback already given
            setError('You have Already sent feedback for same');
            return;
          }
        })
        if (isFeed === false) {
          setError(null);
        }
      });
  }, [empFeedName])

  const empDeptOpts = [ 'Admin', 'Developer', 'Manager', 'HR', 'Payroll', 'Transport' ]

  return (
    <>
      <Navbar />
      <FormHeading> Feedback Form </FormHeading>
      <FeedFormBody>
        <FormContainer>
          <FormLabel>Please select Team whome you wanted to give feedback</FormLabel>
          <FormAstric>*</FormAstric> <br />
          <RadioGroup style={{ marginBottom: '1rem' }}
            row name="empDept"
            value={empDept}
            onChange= {(e)=> {onInputChange(e)}}
          >
            {empDeptOpts.map((dept) => (
              <FormControlLabel label= {dept} value= {dept}
                control={<Radio
                  sx={{ '&, &.Mui-checked': { color: '#F37037' } }} />}
              />
            ))}
          </RadioGroup>

          <FormLabel> Please Select the name of the employee from above selected Team </FormLabel>
          <FormAstric>*</FormAstric> <br />
          <Select
            value={empFeedName}
            style={{ width: '100%', height: '3rem', marginTop: '0.4rem' }}
            name='empFeedName' onChange={(e) => onInputChange(e)}
            sx={{
              '.MuiOutlinedInput-notchedOutline': {
                border: '0.1rem solid #6D6E71',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#F37037',
              },
              '.MuiSvgIcon-root ': {
                fill: "#F37037",
              }
            }}
          >
            {selects.map((prop) => (
              <MenuItem {...prop} >
                {prop.label}
              </MenuItem>
            ))}
          </Select>
          <br /><br />

          <FormLabel> Please give the Rating </FormLabel>
          <FormAstric>*</FormAstric> <br />
          <Box sx={{ width: '100%' }} >
            <Slider
              sx={{
                '& .MuiSlider-thumb': {
                  color: "#F37037"
                },
                '& .MuiSlider-track': {
                  color: "#F37037"
                },
                '& .MuiSlider-rail': {
                  color: "#acc4e4"
                }
              }}
              defaultValue={0}
              value={rating}
              // getAriaValueText={valuetext}
              // onChange={(_, newVal) => {setFeedData({...feedData, 'rating': newVal})}}
              onChangeCommitted={(_, newVal) => {
                setFeedData({ ...feedData, 'rating': newVal })
              }}
              valueLabelDisplay="auto"      //display value
              step={10}
              marks
              min={0}
              max={100}
            // disabled
            />
          </Box>

          <FlexDiv>
            {error && <ErrorMessage>{error}</ErrorMessage>}
          </FlexDiv>

          <FlexDiv>
            <SubmitButton onClick={e => onSubmit(e)}>
              Submit
            </SubmitButton>
          </FlexDiv>
        </FormContainer>
      </FeedFormBody >
    </>
  )
}
export default FeedForm