import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios';
import Swal from "sweetalert2";
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../../../../Navbar/navbar'
import Chart from 'chart.js/auto';
import { Bar } from "react-chartjs-2";
import {
  FormHeading,
  ChartDiv
} from './feed-chart.style'

const FeedChart = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    admin_rating: 0,
    devp_rating: 0,
    manager_rating: 0,
    HR_rating: 0,
    payroll_rating: 0,
    transport_rating: 0
  });

  var sum = [0,0,0,0,0,0];
  var count = [0,0,0,0,0,0];

  const {admin_rating, devp_rating, manager_rating, HR_rating, payroll_rating,transport_rating } = data;

  useEffect(()=> {
    fetchData();
  },[])
  const fetchData = () => {
    axios.get('http://localhost:3003/feedbacks')
    .then((res)=> {
      res.data.forEach((obj)=> {
        switch(obj.empDept){
          case 'Admin':
            sum[0] = sum[0] + obj.rating;
            count[0]++;
            break;
          case 'Developer':
            sum[1] = sum[1] + obj.rating;
            count[1]++;
            break;
          case 'Manager':
            sum[2] = sum[2] + obj.rating;
            count[2]++;
            break;
          case 'HR':
            sum[3] = sum[3] + obj.rating;
            count[3]++;
            break;
          case 'Payroll Emp':
            sum[4] = sum[4] + obj.rating;
            count[4]++;
            break;
          case 'Transport Emp':
            sum[5] = sum[5] + obj.rating;
            count[5]++;
            break;
          default:
        }
      })
      // console.log(data)
      setData({...data, 
        'admin_rating': sum[0]/count[0],
        'devp_rating': sum[1]/count[1],
        'manager_rating': sum[2]/count[2],
        'HR_rating': sum[3]/count[3],
        'payroll_rating': sum[4]/count[4],
        'transport_rating': sum[5]/count[5]
      })
    })
  }  

  const UserData = [
    { team: 'Admin', rating: admin_rating },
    { team: 'Developer', rating: devp_rating },
    {team: 'Manager', rating: manager_rating },
    { team: 'HR', rating: HR_rating },
    { team: 'Payroll', rating: payroll_rating },
    { team: 'Transport', rating: transport_rating }
  ]

  const myData = {
    data: {
      labels: UserData.map(o => o.team),
      datasets: [
        {
          label: 'Rating',
          backgroundColor: '#E6E7E8',
          borderColor: '#F37037',
          borderWidth: 2,
          data: UserData.map(o => o.rating)
        }
      ]
    },
    options: {
      plugins: {
        title: {
          display: true,
          // text: 'Bar Chart'
        }
      }
    }
  };
  return (
    <>
      <Navbar/>
      <FormHeading> Feedback Analysis </FormHeading>
      
      <ChartDiv> 
      <Bar
        data={myData.data}
        options={myData.options}
      />
      </ChartDiv>
      
    </>
  )
}

export default FeedChart