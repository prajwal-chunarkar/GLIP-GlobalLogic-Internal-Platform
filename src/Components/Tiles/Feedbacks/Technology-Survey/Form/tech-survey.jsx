import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Navbar from "../../../../Navbar/navbar";
import axios from "axios";
import { RadioGroup } from "@mui/material";
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import {
  FormHeading,
  FeedFormBody,
  FormContainer,
  FormLabel,
  FormAstric,
  FlexDiv,
  SubmitButton,
  ErrorMessage,
} from "../../Feedback-Form/Form/feed-form.style";

import ValidateTechSurvey from "./validate-tech-survey";

const TechSurvey = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [techData, setTechData] = useState({
    empName: '',
    empID: '',
    tech: '',
    cyber: '',
    cloud: '',
    commTool: ''
  })

  const { tech, cyber, cloud, commTool } = techData;

  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = () => {
    axios.get(`http://localhost:3003/users/${id}`)
      .then((res) => {
        setTechData({
          ...techData,
          'empName': `${res.data.fname} ${res.data.lname}`,
          'empID': res.data.empID
        })
      });
  }

  const onInputChange = (e) => {
    setTechData({ ...techData, [e.target.name]: e.target.value })
    console.log(e.target.name, e.target.value)
  }

  const [error, setError] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();
    const techDataError = ValidateTechSurvey(techData)

    if (techDataError !== null) {
      setError(techDataError);
      return;
    }
    else {
      setError(null);
      axios.post("http://localhost:3003/tech-survey", techData);
      Swal.fire("Congrats", "You have sent Technology Survey Successfully.", "success");
      navigate(`/dashboard/feedback-home/${id}`);
      return;
    }
  }

  const techQuestions = [
    {
      name: 'tech', value: tech,
      question: 'In which Technology are you interested ?',
      options: ['ReactJS', 'JAVA', 'DevOps', 'DotNet', 'AI/ML'],
    },
    {
      name: 'cyber', value: cyber,
      question: 'What type of Cyber-Security measures do you use ?',
      options: ['Anti-Virus', 'Firewall', 'VPN', '2FA', 'Others'],
    },
    {
      name: 'cloud', value: cloud,
      question: 'How frequently you use Cloud-Based services ?',
      options: ['Daily', 'Weekly', 'Monthly', 'Rarely'],
    },
    {
      name: 'commTool', value: commTool,
      question: 'Which communication tool you use the most for work-related discussion ?',
      options: ['Email', 'Microsoft Teams', 'Slack', 'Zoom', 'Others'],
    }
  ]

  return (
    <>
      <Navbar />
      <FormHeading>Technology Survey</FormHeading>
      <FeedFormBody>
        <FormContainer>
          {techQuestions.map((quest) => (
            <>
              <FormLabel>{quest.question}</FormLabel>
              <FormAstric>*</FormAstric> <br />
              <RadioGroup style={{ marginBottom: '1rem' }}
                row 
                name={quest.name}
                value={quest.value}
                onChange={(e) => onInputChange(e)}
              >
                {quest.options.map((opt) => (
                  <FormControlLabel label={opt} value={opt}
                    control={<Radio
                      sx={{ '&, &.Mui-checked': { color: '#F37037' } }} />}
                  />
                ))}
              </RadioGroup>
            </>
          ))}

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
  );
};

export default TechSurvey;
