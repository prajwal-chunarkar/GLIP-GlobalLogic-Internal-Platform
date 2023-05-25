import Navbar from "../../../../Navbar/navbar";
import {
    HeadingPayslipEmpDiv,
    PayslipHeadingLettersSpan,
} from "./comp-survey.styled";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Swal from "sweetalert2";
import ValidateEmpCompanyForm from './comp-survey-validation'


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
} from "../../../Transport/Transport-Employee/transport-emp.style";

const CompSurvey = () => {
    const [currentUser, setCurrentUser] = useState({}); //imp
    const [error, setError] = useState(null);
    const [users, setusers] = useState();
    var {id} = useParams();
    const [compSurveyData, setcompSurveyData] = useState({
        empName: "",
        empID: "",
        empSatisfaction: "",
        trainingDev: "",
        empEngagement: "",
        empBenifits: "",
        empLeadership: "",
        empFuturePlanning: "",
        empWorkDiversity: "",
        empCommunication: "",
    });
    //destructuring
    const { empName, empID } = compSurveyData;


    const onSubmit = (e) => {
        var status = false;
        e.preventDefault();
        var compValidate;
        axios.get(`http://localhost:3003/company-survey`)
        .then((res)=> {
            res.data.forEach((obj)=> {
                if(obj.empID === empID){
                    status = true;
                    setError('You have Already sent Company Survey Feedback!');
                    return;
                }
            })
            if(status === false){
                compValidate = ValidateEmpCompanyForm(compSurveyData);
                if (compValidate !== null) {
                    setError(compValidate);
                    console.log(compSurveyData)
                    return;
                  }
                  else {
                      setError(null);
                      axios.post("http://localhost:3003/company-survey", compSurveyData);
                      Swal.fire("Congrats", "You have sent Transport Request Successfully.", "success");
                    //   navigate(`/dashboard/${id}`);         
                    return;
                  }
            }
        })
      }

    //only once when load
    useEffect(() => {
        fetchdata();
    }, []);
    const fetchdata = async () => {
        const userData = await axios.get(`http://localhost:3003/company-survey`)
        setusers(userData.data)
        await axios.get(`http://localhost:3003/users/${id}`).then((res) => {
            setCurrentUser(res.data);
            setcompSurveyData({
                ...compSurveyData,
                empName: `${res.data.fname} ${res.data.lname}`,
                empID: res.data.empID,
            });
        
        });
        
    };

    const onInputChange = (e) => {
        setcompSurveyData({
            ...compSurveyData,
            [e.target.name]: e.target.value,
        });
    };

    const formProps1 = [
        {
            name: "empID",
            label: "Employee ID",
            placeholder: "Enter your Employee ID",
            value: empID,
            readonly: "readonly"
        },
        {
            name: "empName",
            label: "Employee Name",
            value: empName,
            readonly: "readonly"
        }
    ];

    const questionsArr = [
        {
            label: "Excellent",
            value: 5,
            onChange: (e) => onInputChange(e)
        },
        {
            label: "Very Good",
            value: 4,
            onChange: (e) => onInputChange(e)

        },
        {
            label: "Good",
            value: 3,
            onChange: (e) => onInputChange(e)
        },
        {
            label: "Average",
            value: 2,
            onChange: (e) => onInputChange(e)

        },
        {
            label: "Poor",
            value: 1,
            onChange: (e) => onInputChange(e)
        }
    ];

    //----------------------------Heading Object------------------------------------
    const headingTransportAdmin = [
        "C",
        "o",
        "m",
        "p",
        "a",
        "n",
        "y",
        " ",
        "S",
        "u",
        "r",
        "v",
        "e",
        "y",
    ];
    return (
        <>
            <Navbar />
            {/* ------------------------------------heading---------------------------- */}
            <HeadingPayslipEmpDiv>
                {headingTransportAdmin.map((letter) => (
                    <PayslipHeadingLettersSpan>
                        {letter}
                    </PayslipHeadingLettersSpan>
                ))}
            </HeadingPayslipEmpDiv>

            <FormContainer className="mx-auto">
                {formProps1.map((obj) => {
                    return (
                        <>
                            <FormLabel name={obj.name}>{obj.label}</FormLabel>
                            <FormAstric>*</FormAstric>
                            <FormInput type="text" {...obj} />
                        </>
                    );
                })}

                <FormLabel style={{fontWeight: "bold"}}>Rate the following Facilities You getting</FormLabel>
                <br />

                <>
                    <FormLabel className="mt-2" name="empSatisfaction">
                        Employee Satisfaction
                    </FormLabel>
                    <FormAstric>*</FormAstric>
                    <RadioGroup
                        row
                        name="empSatisfaction">
                        {questionsArr.map((obj) => (
                            <FormControlLabel
                                {...obj}
                                name = "empSatisfaction"
                                control={
                                    <Radio
                                        sx={{
                                            "&, &.Mui-checked": {
                                                color: "#F37037",
                                            },
                                        }}
                                    />
                                }
                            />
                        ))}
                    </RadioGroup>
                    <FormLabel className="mt-4" name="trainingDev">
                        Training and Development
                    </FormLabel>
                    <FormAstric>*</FormAstric>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="trainingDev">
                        {questionsArr.map((obj) => (
                            <FormControlLabel
                                {...obj}
                                name = "trainingDev"
                                // onChange={(e)=>onInputChange(e)}

                                control={
                                    <Radio
                                        sx={{
                                            "&, &.Mui-checked": {
                                                color: "#F37037",
                                            },
                                        }}
                                    />
                                }
                            />
                        ))}
                    </RadioGroup>
                    <FormLabel className="mt-4" name="empEngagement">
                        Employee Engagement and Satisfaction
                    </FormLabel>
                    <FormAstric>*</FormAstric>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="empEngagement">
                        {questionsArr.map((obj) => (
                            <FormControlLabel
                                {...obj}
                                name = "empEngagement"

                                // onChange={(e)=>onInputChange(e)}

                                control={
                                    <Radio
                                        sx={{
                                            "&, &.Mui-checked": {
                                                color: "#F37037",
                                            },
                                        }}
                                    />
                                }
                            />
                        ))}
                    </RadioGroup>
                    <FormLabel className="mt-4" name="empBenifits">
                        Employee Benifits and Policies
                    </FormLabel>
                    <FormAstric>*</FormAstric>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="empBenifits">
                        {questionsArr.map((obj) => (
                            <FormControlLabel
                                {...obj}
                                name = "empBenifits"

                                // onChange={(e)=>onInputChange(e)}

                                control={
                                    <Radio
                                        sx={{
                                            "&, &.Mui-checked": {
                                                color: "#F37037",
                                            },
                                        }}
                                    />
                                }
                            />
                        ))}
                    </RadioGroup>
                    <FormLabel className="mt-4" name="empLeadership">
                        Leadership and Management
                    </FormLabel>
                    <FormAstric>*</FormAstric>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="empLeadership">
                        {questionsArr.map((obj) => (
                            <FormControlLabel
                                {...obj}
                                name = "empLeadership"

                                // onChange={(e)=>onInputChange(e)}
                                control={
                                    <Radio
                                        sx={{
                                            "&, &.Mui-checked": {
                                                color: "#F37037",
                                            },
                                        }}
                                    />
                                }
                            />
                        ))}
                    </RadioGroup>
                    <FormLabel className="mt-4" name="empFuturePlanning">
                        Future Planning and Strategy
                    </FormLabel>
                    <FormAstric>*</FormAstric>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="empFuturePlanning">
                        {questionsArr.map((obj) => (
                            <FormControlLabel
                                {...obj}
                                name = "empFuturePlanning"

                                // onChange={(e)=>onInputChange(e)}

                                control={
                                    <Radio
                                        sx={{
                                            "&, &.Mui-checked": {
                                                color: "#F37037",
                                            },
                                        }}
                                    />
                                }
                            />
                        ))}
                    </RadioGroup>
                    <FormLabel className="mt-4" name="empWorkDiversity">
                        Workplace Diversity and Inclusion
                    </FormLabel>
                    <FormAstric>*</FormAstric>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="empWorkDiversity">
                        {questionsArr.map((obj) => (
                            <FormControlLabel
                                {...obj}
                                name = "empWorkDiversity"

                                // onChange={(e)=>onInputChange(e)}

                                control={
                                    <Radio
                                        sx={{
                                            "&, &.Mui-checked": {
                                                color: "#F37037",
                                            },
                                        }}
                                    />
                                }
                            />
                        ))}
                    </RadioGroup>
                    <FormLabel className="mt-4" name="empCommunication">
                        Internal Communication and Collaboration
                    </FormLabel>
                    <FormAstric>*</FormAstric>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="empCommunication">
                        {questionsArr.map((obj) => (
                            <FormControlLabel
                                {...obj}
                                name = "empCommunication"

                                // onChange={(e)=>onInputChange(e)}

                                control={
                                    <Radio
                                        sx={{
                                            "&, &.Mui-checked": {
                                                color: "#F37037",
                                            },
                                        }}
                                    />
                                }
                            />
                        ))}
                    </RadioGroup>
                </>
                <FlexDiv>
            {error && <ErrorMessage>{error}</ErrorMessage>}
          </FlexDiv>
          <FlexDiv>
            <SubmitButton onClick={e => onSubmit(e)}>
              Make Request
            </SubmitButton>
          </FlexDiv>
            </FormContainer>
        </>
    );
};

export default CompSurvey;
