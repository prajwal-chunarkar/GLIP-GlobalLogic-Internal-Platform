import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import "chart.js/auto";
import Navbar from '../../../../Navbar/navbar';
import {
  CompSurveyHeadingLettersSpan,
  HeadingCompSurveyEmpDiv,
  ChartParentDiv,
  DisplayOptionsDiv,
  DisplayChartDiv,
  OptionsButton,
  DisplayValues
} from "./comp-survey-chart.styled";
import Footer from '../../../../Footer/footer';

function RatingChart() {
  const [ratingsData, setRatingsData] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState('empSatisfaction');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3003/company-survey');
        setRatingsData(response.data);

      } catch (error) {
        console.error('Error fetching ratings data:', error);
      }
    };

    fetchData();
  }, []);

  const countRatingsByQuestion = () => {
    const ratingCountsByQuestion = {
      empSatisfaction: [0, 0, 0, 0, 0],
      trainingDev: [0, 0, 0, 0, 0],
      empEngagement: [0, 0, 0, 0, 0],
      empBenifits: [0, 0, 0, 0, 0],
      empLeadership: [0, 0, 0, 0, 0],
      empFuturePlanning: [0, 0, 0, 0, 0],
      empWorkDiversity: [0, 0, 0, 0, 0],
      empCommunication: [0, 0, 0, 0, 0],
    };

    ratingsData.forEach((ratingObj) => {
      Object.keys(ratingCountsByQuestion).forEach((questionKey) => {
        const rating = parseInt(ratingObj[questionKey], 10);
        if (rating >= 1 && rating <= 5) {
          ratingCountsByQuestion[questionKey][rating - 1]++;
        }
      });
    });

    return ratingCountsByQuestion;
  };

  const ratingCountsByQuestion = countRatingsByQuestion();

  const generateChartData = (questionKey) => {
    const ratingCounts = ratingCountsByQuestion[questionKey];
    const questionLabel = questionKey.charAt(0).toUpperCase() + questionKey.slice(1);

    return {
      labels: ['Excellent', 'Very Good', 'Good', 'Average', 'Poor'],
      datasets: [
        {
          data: ratingCounts,
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
            '#9966FF',
          ],
          hoverBackgroundColor: [
            '#ffb7c7',
            '#99c3df',
            '#fce9b8',
            '#8abebe',
            '#ceb7fc',
          ],
          label: questionLabel,
        },
      ],
    };
  };

  const handleQuestionChange = (questionKey) => {
    setSelectedQuestion(questionKey);
  };

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

  const ratingsArr = ["Employee Satisfaction", "Training & Development", "Employee Engagement", "Employee Benifits", "Leadership & Management", "Future Planning", "Work Diversity", "Employee Communication"]
  return (
    <>
      <Navbar />
      {/* ------------------------------------heading---------------------------- */}
      <HeadingCompSurveyEmpDiv>
        {headingTransportAdmin.map((letter) => (
          <CompSurveyHeadingLettersSpan>
            {letter}
          </CompSurveyHeadingLettersSpan>
        ))}
      </HeadingCompSurveyEmpDiv>

      <ChartParentDiv className="row">
        <DisplayOptionsDiv className="col-md-4">
          {Object.keys(ratingCountsByQuestion).map((questionKey,ind) => (
            <OptionsButton
              key={questionKey}
              onClick={() => handleQuestionChange(questionKey)}
              variant={selectedQuestion === questionKey ? 'contained' : 'outlined'}
            >
              {ratingsArr[ind]}
            </OptionsButton>
          ))}
        </DisplayOptionsDiv>
        <DisplayChartDiv className="col-md-4">
          <Pie data={generateChartData(selectedQuestion)} />
        </DisplayChartDiv>
        <DisplayValues className="col-md-2">
          <div>
            Total Surveys <br />
            <p style={{ color: '#F37037' }}>{ratingsData.length} </p>
          </div>
        </DisplayValues>
      </ChartParentDiv>
      <Footer />
    </>
  );
}

export default RatingChart;
