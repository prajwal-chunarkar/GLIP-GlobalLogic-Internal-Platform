// import React, { useState, useEffect } from "react";
// import {Chart as ChartJS, ArcElement, Tooltip,Legend} from "chart.js"
// import { Pie } from "react-chartjs-2";
// import 'chart.js/auto'
// import axios from "axios";
// ChartJS.register(ArcElement,Tooltip,Legend);

// const ExamplePieChart = () => {
//     const [graphData, setGraphData] = useState({});
//     const [employees,setEmployees]  = useState([])
//     const [status,setStatus] = useState(false);

  
//   useEffect(() => {
//         axios({
//           method:"get",
//           url:"http://localhost:3003/employeeList",
//         }).then((response)=>{
//             setEmployees(response.data);
//             console.log(response.data);
//             setStatus(true);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }, []);
 
//   useEffect(()=>{

//     let designations = {}
//     employees?.forEach(emp => {
//       if (emp.designation in designations) {
//         designations[emp.designation]++;
//       } else {
//         designations[emp.designation] = 1;
//       }
//     });

    

//   const data = {
//     labels: Object.keys(designations),
//     datasets: [
//       {
//         data: Object.values(designations),
//         backgroundColor: [
//           "#FF6384",
//           "#36A2EB",
//           "#FFCE56",
//           "#4BC0C0",
//           "#9966FF",
//           "#00CC99",
//           "#FF9900",
//           "#CC0099",
//           "#CCCC00",
//         ],
//         hoverBackgroundColor: [
//           "#FF6384",
//           "#36A2EB",
//           "#FFCE56",
//           "#4BC0C0",
//           "#9966FF",
//           "#00CC99",
//           "#FF9900",
//           "#CC0099",
//           "#CCCC00",
//         ],
//       },
//     ],
//   };

//   setGraphData(data);
//   },[status])

//   return (
//     <div>
//       <Pie data={graphData} />
//     </div>
//   );
// };




import { useState } from 'react';

function countWeekdays(startDate, endDate) {
  const oneDay = 24 * 60 * 60 * 1000; // one day in milliseconds
  const firstDate = new Date(startDate);
  const secondDate = new Date(endDate);
  console.log(typeof(Date))
  const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay)) + 1; // add 1 to include both start and end dates
  let count = 0;
  for (let i = 0; i < diffDays; i++) {
    const day = new Date(startDate);
    console.log(day);
    day.setDate(startDate.getDate() + i);
    if (day.getDay() !== 6 && day.getDay() !== 0) { // 6 is Saturday, 0 is Sunday
      count++;
    }
  }
  return count;
}

export default function DatePicker() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [result, setResult] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    const days = countWeekdays(new Date(startDate), new Date(endDate));
    setResult(`Total number of weekdays between ${startDate} and ${endDate}: ${days}`);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Start date:
          <input type="date" value={startDate} onChange={event => setStartDate(event.target.value)} />
        </label>
        <label>
          End date:
          <input type="date" value={endDate} onChange={event => setEndDate(event.target.value)} />
        </label>
        <button type="submit">Count weekdays</button>
      </form>
      {result && <p>{result}</p>}
    </div>
  );
}