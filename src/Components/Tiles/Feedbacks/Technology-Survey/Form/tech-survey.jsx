import React from "react";
import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Navbar from "../../../../Navbar/navbar";
import axios from "axios";

import { RadioGroup } from "@mui/material";
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import {
  FormHeading,
  TechSurveyBody,
  FormContainer,
  FormLabel,
  FormAstric,
  FormInput,
  FlexDiv,
  SubmitButton,
  ErrorMessage,
  LinksDiv,
  FormLinks,
} from "./tech-survey-styled";
import ValidateTechSurvey from "./validate-tech-survey";

const TechSurvey = () => {

    const [selectedOption, setSelectedOption] = useState('');
    const [SecondselectedOption, setSecondSelectedOption] = useState('');
    const [ThirdselectedOption, setThirdSelectedOption] = useState('');
    const [FourthselectedOption, setFourthSelectedOption] = useState('');
    const [data, setData] = useState([]);
    const [SecondData, setSecondData] = useState([]);
    const [ThirdData, setThirdData] = useState([]);
    const [FourthData, setFourthData] = useState([]);

    const [techSurveyData, setTechSurveyData] = useState({
        empName: '',
        empID: '',
        intech: '',
        cyber: '',
        cbs: '',
        comm: '',
      })
     
      const [error, setError] = useState(null);
      const { id } = useParams();
      const { empName, empID, intech, cyber, cbs, comm } = techSurveyData;

      
      useEffect(() => {
        fetchData();
      }, [])  

      useEffect(()=>{
        axios({
          method:"get",
          url:"http://localhost:3003/tech-survey"
        }).then((res)=>{
          setData(Object.values((res.data)[0]));
        },(error)=>{
          console.log(error);
        })
      },[])

      useEffect(()=>{
        axios({
          method:"get",
          url:"http://localhost:3003/cyber-security"
        }).then((res)=>{
          setSecondData(Object.values((res.SecondData)[0]));
        },(error)=>{
          console.log(error);
        })
      },[])

      useEffect(()=>{
        axios({
          method:"get",
          url:"http://localhost:3003/cloud-based-services"
        }).then((res)=>{
          setThirdData(Object.values((res.ThirdData)[0]));
        },(error)=>{
          console.log(error);
        })
      },[])

      useEffect(()=>{
        axios({
          method:"get",
          url:"http://localhost:3003/work-discussion"
        }).then((res)=>{
          setFourthData(Object.values((res.FourthData)[0]));
        },(error)=>{
          console.log(error);
        })
      },[])

      const  fetchData = async () => {
        await axios.get(`http://localhost:3003/users/${id}`)
          .then((res) => {
          
            setTechSurveyData({
              ...techSurveyData,
              'empName': `${res.data.fname} ${res.data.lname}`,
              'empID': res.data.empID,
              
            })
          })
        }

        const onInputChange = (e) => {
            setTechSurveyData({ ...techSurveyData, [e.target.name]: e.target.value })
            const option = e.target.value;
            setSelectedOption(option);
            // console.log()
        }
        const secondOnInputChange = (e) =>{
            const Secondoption = e.target.value;
            setSecondSelectedOption(Secondoption);
          }
          const thirdOnInputChange = (e) =>{
            const Thirdoption = e.target.value;
            setThirdSelectedOption(Thirdoption);
          } 
          const fourthOnInputChange = (e) =>{
            const Fourthoption = e.target.value;
            setFourthSelectedOption(Fourthoption);
          } 
        const getOptionIndex = (option) => {
            switch (option) {
              case 'ReactJs':
                return 0;
              case 'Java':
                return 1;
              case 'Dev-Ops':
                return 2;
              case 'DotNet':
                return 3;
              case 'AI/ML':
                return 4;
              default:
                return -1;
            }
        }
        const SecondgetOptionIndex = (option1) => {
            switch (option1) {
              case 'Anti-Virus':
                return 0;
              case 'Firewall':
                return 1;
              case 'VPN':
                return 2;
              case 'Authentication':
                return 3;
              case 'Other':
                return 4;
              default:
                return -1;
            }
          }

          const ThirdgetOptionIndex = (option2) => {
            switch (option2) {
              case 'Daily':
                return 0;
              case 'Weekly':
                return 1;
              case 'Monthly':
                return 2;
              case 'Rarely':
                return 3;
              default:
                return -1;
            }
          }
          const FourthgetOptionIndex = (option3) => {
            switch (option3) {
              case 'Email':
                return 0;
              case 'Microsoft Teams':
                return 1;
              case 'Slack':
                return 2;
              case 'Zoom':
                return 3;
            case 'Other':
                return 4;
              default:
                return -1;
            }
          }

        var updatedData
        var SecondUpdatedData
        var ThirdUpdatedData
        var FourthUpdatedData
        const onSubmit = (e) => {
            e.preventDefault();

            if (selectedOption) {
                updatedData = [...data];
               const optionIndex = getOptionIndex(selectedOption);
               updatedData[optionIndex] += 1;
               setData(updatedData);
             }
            //  console.log(updatedData)
            if (SecondselectedOption) {
                SecondUpdatedData = [...SecondData];
               const SecondoptionIndex = SecondgetOptionIndex(SecondselectedOption);
               SecondUpdatedData[SecondoptionIndex] += 1;
               setSecondData(SecondUpdatedData);
             }
             if (ThirdselectedOption) {
                ThirdUpdatedData = [...ThirdData];
               const ThirdoptionIndex = ThirdgetOptionIndex(ThirdselectedOption);
               SecondUpdatedData[ThirdoptionIndex] += 1;
               setThirdData(ThirdUpdatedData);
             }
             if (FourthselectedOption) {
                FourthUpdatedData = [...FourthData];
               const FourthoptionIndex = FourthgetOptionIndex(FourthselectedOption);
               FourthUpdatedData[FourthoptionIndex] += 1;
               setFourthData(FourthUpdatedData);
             }
         
             var Reactcount
             var Javacount
             var DevOpscount
             var DotNetount
             var AIMLcount
             updatedData.forEach((obj)=>{
                Reactcount = updatedData[0]
                Javacount = updatedData[1]
                DevOpscount = updatedData[2]
                DotNetount = updatedData[3]
                AIMLcount = updatedData[4]
             })
             const updatedObj = {
               "Reactjs":Reactcount,
               "Java":Javacount,
               "Dev-Ops":DevOpscount,
               "DotNet":DotNetount,
               "AI/ML":AIMLcount
             }
             //  console.log(updatedObj)
         
              axios.put(`http://localhost:3003/tech-survey/1`, updatedObj)
              .then((res)=> {
               // console.log(res.data)
               console.log("successful")
              }).catch((err)=> {
               console.log('Error');
              })


              //---------------------
              var Viruscount
              var Firewallcount
              var Vpncount
              var Authount
              var Othercount
              SecondUpdatedData.forEach((obj)=>{
                Viruscount = SecondUpdatedData[0]
                Firewallcount = SecondUpdatedData[1]
                Vpncount = SecondUpdatedData[2]
                Authount = SecondUpdatedData[3]
                Othercount = SecondUpdatedData[4]
              })
              const SecondupdatedObj = {
                "Anti-Virus":Viruscount,
                "Firewall":Firewallcount,
                "VPN":Vpncount,
                "Authentication":Authount,
                "Other":Othercount
              }
            //    console.log(SecondupdatedObj)
          
               axios.put(`http://localhost:3003/cyber-security/1`, SecondupdatedObj)
               .then((res)=> {
                // console.log(res.data)
                console.log("successful")
               }).catch((err)=> {
                console.log('Error');
               })

               //------------------------------------
               var Dailycount
               var Weeklycount
               var Monthlycount
               var Rarelycount
              
               ThirdUpdatedData.forEach((obj)=>{
                 Viruscount = ThirdUpdatedData[0]
                 Firewallcount = ThirdUpdatedData[1]
                 Vpncount = ThirdUpdatedData[2]
                 Authount = ThirdUpdatedData[3]
                 Othercount = ThirdUpdatedData[4]
               })
               const ThirdupdatedObj = {
                 "Daily":Dailycount,
                 "Weekly":Weeklycount,
                 "Monthly":Monthlycount,
                 "Rarely":Rarelycount,
              
               }
             //    console.log(ThirdupdatedObj)
           
                axios.put(`http://localhost:3003/cloud-based-services/1`, ThirdupdatedObj)
                .then((res)=> {
                 // console.log(res.data)
                 console.log("successful")
                }).catch((err)=> {
                 console.log('Error');
                })
                //--------------------------------------

               var Emailcount
               var MicrosoftTeamscount
               var Slackcount
               var Zoomcount
               var Othercount
              
               FourthUpdatedData.forEach((obj)=>{
                 Viruscount = FourthUpdatedData[0]
                 Firewallcount = FourthUpdatedData[1]
                 Vpncount = FourthUpdatedData[2]
                 Authount = FourthUpdatedData[3]
                 Othercount = FourthUpdatedData[4]
               })
               const FourthupdatedObj = {
                 "Email":Emailcount,
                 "Microsoft Teams":MicrosoftTeamscount,
                 "Slack":Slackcount,
                 "Zoom":Zoomcount,
                 "Other":Othercount,
              
               }
             //    console.log(ThirdupdatedObj)
           
                axios.put(`http://localhost:3003/work-discussion/1`, FourthupdatedObj)
                .then((res)=> {
                 // console.log(res.data)
                 console.log("successful")
                }).catch((err)=> {
                 console.log('Error');
                })

                //--------------------------------------


            const TechSurveyError = ValidateTechSurvey(techSurveyData);
    
            if (TechSurveyError !== null) {
                setError(TechSurveyError);
            
                return;
              }
              else {
                setError(null);
                axios.post("http://localhost:3003/tech-survey-data", techSurveyData)
                Swal.fire("Congrats", "You have submitted the Technology Survey Successfully.", "success");
                console.log(techSurveyData)
                return;
              }
    
          }
        const formProps = [
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
          ]   

    const TechInterest = [
        {
          name: 'intech',
          label: 'ReactJS',
          value: 'ReactJS',
          onChange: (e) => onInputChange(e)
        },
        {
          name: 'intech',
          label: 'Java',
          value: 'Java',
          onChange: (e) => onInputChange(e)
        },
        {
            name: 'intech',
            label: 'DevOps',
            value: 'Dev-Ops',
            onChange: (e) => onInputChange(e)
          },
          {
            name: 'intech',
            label: 'DotNet',
            value: 'DotNet',
            onChange: (e) => onInputChange(e)
          },
          {
            name: 'intech',
            label: 'AI/ML',
            value: 'AI/ML',
            onChange: (e) => onInputChange(e)
          }
      ]
      const CyberMeasures = [
        {
          name: 'cyber',
          label: 'AntiVirus Software',
          value: 'Software',
          onChange: (e) => secondOnInputChange(e)
        },
        {
          name: 'cyber',
          label: 'Firewall',
          value: 'Firewall',
          onChange: (e) => secondOnInputChange(e)
        },
        {
            name: 'cyber',
            label: 'VPN',
            value: 'VPN',
            onChange: (e) => secondOnInputChange(e)
          },
          {
            name: 'cyber',
            label: '2-factor authentication',
            value: '2-factor authentication',
            onChange: (e) => secondOnInputChange(e)
          },
          {
            name: 'cyber',
            label: 'Other',
            value: 'Other',
            onChange: (e) => secondOnInputChange(e)
          }
        ]
        const CloudBased = [
            
            {
              name: 'cbs',
              label: 'Daily',
              value: 'Daily',
              onChange: (e) => onInputChange(e)
            },
            {
                name: 'cbs',
                label: 'Weekly',
                value: 'Weekly',
                onChange: (e) => onInputChange(e)
              },
              {
                name: 'cbs',
                label: 'Monthly',
                value: 'Monthly',
                onChange: (e) => onInputChange(e)
              },
              {
                name: 'cbs',
                label: 'Rarely',
                value: 'Rarely',
                onChange: (e) => onInputChange(e)
              }
            ]
            const CommTool = [
            
                {
                  name: 'comm',
                  label: 'Email',
                  value: 'Email',
                  onChange: (e) => onInputChange(e)
                },
                {
                    name: 'comm',
                    label: 'Microsoft Teams',
                    value: 'Microsoft Teams',
                    onChange: (e) => onInputChange(e)
                  },
                  {
                    name: 'comm',
                    label: 'Slack',
                    value: 'Slack',
                    onChange: (e) => onInputChange(e)
                  },
                  {
                    name: 'comm',
                    label: 'Zoom',
                    value: 'Zomm',
                    onChange: (e) => onInputChange(e)
                  },
                  {
                    name: 'comm',
                    label: 'Other',
                    value: 'Other',
                    onChange: (e) => onInputChange(e)
                  }
                ]

               
  return (
    <>
      <Navbar />
      <FormHeading>Technology Survey</FormHeading>

      <TechSurveyBody>
        <FormContainer>


        {formProps.map((obj, index) => {
           
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

        <FormLabel name='intech'>Which Technology are you interested in ?</FormLabel>
          <FormAstric>*</FormAstric> <br />
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="intech"
          >
            {TechInterest.map((obj) => (
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

          <FormLabel name='cyber'>What type of cybersecurity measures do you use?</FormLabel>
          <FormAstric>*</FormAstric> <br />
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="cyber"
          >
            {CyberMeasures.map((obj) => (
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

          <FormLabel name='cbs'>How frequently do you use cloud-based services ?</FormLabel>
          <FormAstric>*</FormAstric> <br />
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="cbs"
          >
            {CloudBased.map((obj) => (
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

          <FormLabel name='comm'>Which communication tool do you use the most for work-related discussions ?</FormLabel>
          <FormAstric>*</FormAstric> <br />
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="comm"
          >
            {CommTool.map((obj) => (
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
              Submit
            </SubmitButton >
          </FlexDiv>
        </FormContainer>
      </TechSurveyBody >


    </>
  );
};


export default TechSurvey;
