import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  APEContainer,
  FormLabel,
  FormHeading,
  FormInput,
  ButtonColab,
  FlexDiv,
  FormInputt,
  FormAstric,
} from "./access-privilege-emp.style.js";

import Swal from "sweetalert2";
import moment from "moment/moment";

const AccessPrivilegeEmp = () => {
  const getData = async () => {
    const response = await axios.get(
      "http://localhost:8000/api/v1/access-privillage-emp/"
    );
  };

  const [employees, setEmployees] = useState();
  const [man, setMan] = useState();
  const [data, setData] = useState({
    role: "",
    manager: "",
    reason: "",
    date: "",
  });
  const handleCancel = () => {
    // toast.success("Raised Successfully");
    setData((data) => ({
      ...data,
      role: "",
      manager: "",
      reason: "",
      date: "",
    }));
  };
  const { role, manager, reason, date } = data;
  const onInputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    // try {
    //   await axios.post("http://localhost:3003/accesspPrivilegeEmployees",data)
    //   toast.success("Raised Successfully");
    // } catch (error) {
    //   toast.success("doesn't Raised Successfully");
    // }
    await axios
      .post("http://localhost:3003/accesspPrivilegeEmployees", data)
      .then(Swal.fire("Congrats", "Request Raised Successfully", "success"));
  };
  const getUsersData = async () => {
    const res = await axios.get("http://localhost:3003/users");

    const name = res.data.filter((arr) => {
      return arr.designation === "Manager";
    });
    setEmployees(name);
  };
  useEffect(() => {
    getUsersData();
  }, []);
  console.log(employees);
  const saving=()=>{
    // data.manager = employees[(Number)(data.manager)]
    localStorage.setItem(
    "details", JSON.stringify(data)
  )
  }
  useEffect(()=>{
    if(localStorage.getItem("details")){
      setData(JSON.parse(localStorage.getItem("details")))
    }
  },[])
  return (
    <>
      
        <APEContainer>
          <FormHeading>Employee Access Privileges</FormHeading>

          <form onSubmit={(e) => onSubmit(e)}>
            <div class="form-group">
              <FormLabel for="exampleFormControlSelect1">
                Raise Access for the role:<FormAstric>*</FormAstric>
              </FormLabel>
              <FormInput
                class="form-control"
                id="exampleFormControlSelect1"
                name="role"
                value={role}
                onChange={(e) => onInputChange(e)}
                required
              >
                <option value={""}>Select the role</option>
                <option>Admin</option>
                <option>HR</option>
                <option>Manager</option>
                <option>Payroll</option>
              </FormInput>
            </div>
            <div class="form-group">
              <FormLabel for="exampleFormControlSelect1">
                Select the Manager:<FormAstric>*</FormAstric>
              </FormLabel>
              <FormInput
                class="form-control"
                id="exampleFormControlSelect1"
                name="manager"
                value={manager}
                onChange={(e) => onInputChange(e)}
                required
              >
                <option value={""}>Select the Manager</option>
                {employees?.map((arr) => {
                  return (
                    <option key={arr.id} value={arr.id}>
                      {arr.fname} {arr.lname}
                    </option>
                  );
                })}
              </FormInput>
            </div>

            <div class="form-group">
              <FormLabel for="exampleFormControlTextarea1">
                Reason:<FormAstric>*</FormAstric>
              </FormLabel>
              <FormInputt
                name="reason"
                value={reason}
                onChange={(e) => onInputChange(e)}
                class="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                required
              ></FormInputt>
            </div>
            <div class="form-group">
              <FormLabel for="date" class="col-1 col-form-label">
                Date:<FormAstric>*</FormAstric>{" "}
              </FormLabel>
              <div class="col-5">
                <div class="input-group date" id="datepicker">
                  <input
                    name="date"
                    value={date}
                    onChange={(e) => onInputChange(e)}
                    type="date"
                    class="form-control"
                    id="date"
                    min={moment().format("YYYY-MM-DD")}
                    required
                  />
                  <span class="input-group-append"></span>
                </div>
              </div>
            </div>
            <br />
            <FlexDiv>
              <ButtonColab type="reset" class="btn" onClick={handleCancel}>
                Cancel
              </ButtonColab>
              <ButtonColab type="submit" class="btn">
                Submit
              </ButtonColab>
              <ButtonColab type="button" class="btn" onClick={saving}>
                Save as Draft
              </ButtonColab>
            </FlexDiv>
          </form>
        </APEContainer>
  
    </>
  );
};

export default AccessPrivilegeEmp;
