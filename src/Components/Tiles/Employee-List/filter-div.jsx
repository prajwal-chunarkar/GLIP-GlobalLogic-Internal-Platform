import React, { useState,useEffect } from 'react';
import axios from 'axios';

const  Filter =()=> {
  
  const [employees, setEmployees] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [designationFilter, setDesignationFilter] = useState('');


 useEffect(() => {
    async function fetchEmployees() {
      const response = await axios.get('http://localhost:3003/employeeList');
      setEmployees(response.data);
    }
    fetchEmployees();
  }, []);


  function handleNameFilterChange(event) {
    setNameFilter(event.target.value);
  }

  function handleDesignationFilterChange(event) {
    setDesignationFilter(event.target.value);
  }

  
  const filteredEmployees = employees.filter((employee) => {     // Filter the employee list based on the current filter values
    const nameMatch = employee.name.toLowerCase().includes(nameFilter.toLowerCase());
    const designationMatch = designationFilter === '' || employee.designation === designationFilter;
    return nameMatch && designationMatch;
  });

  
  const uniqueDesignations = [           // Get a list of unique designations for the drop-down list
    ...new Set(employees.map((employee) => employee.designation)),
  ];

  return (
    <div>
      <h1>Employee List</h1>
      <div>
        <label htmlFor="designation-select">Filter by designation:</label>
        <select
          id="designation-select"
          value={designationFilter}
          onChange={handleDesignationFilterChange}
        >
          <option value="">All</option>
          {uniqueDesignations.map((designation, index) => (
            <option key={index} value={designation}>
              {designation}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="name-input">Filter by name:</label>
        <input
          id="name-input"
          type="text"
          placeholder="Enter name"
          value={nameFilter}
          onChange={handleNameFilterChange}
        />
      </div>
      <ul>
        {filteredEmployees.map((employee, index) => (
          <li key={index}>
            {employee.name} - {employee.designation}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Filter;