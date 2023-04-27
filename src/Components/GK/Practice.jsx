import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";

const Practice = () => {
  const [errorE, setErrorE] = useState();
  const [errorP, setErrorP] = useState();
  const [errorU, setErrorU] = useState();
  const [user, setUser] = useState({
    fname: "",
    lname: "",
    email: "",
  });

  const [finalUser,setFinalUser] = useState({
    id:'',
    fname:'',
    lname:'',
    email:''
  });

  let dispatch = useDispatch();
  // var arrUserKeys = Object.keys(user);
  // var arrUservalues = Object.values(user)

  // useEffect(()=> {
  //   arrUservalues = Object.values(user)
  // },[user])

  const { fname , email , lname } = user;

  const [status,setStatus] = useState(false);

  useEffect(()=>{
    axios({
      method:"get",
      url:`http://localhost:3003/users/${fname}`,
    }).then((response)=>{
      setFinalUser(response.data);
      console.log(response.data.id);
    },(error)=>{
      console.log("error is",error)
    })
  },[status])
  
  const onSubmit = (e) => {
    
    axios({
      method:"post",
      url:"http://localhost:3003/users",
      data:user
    }).then((response)=>{
      console.log("The data fetched is ",response.data)
      setStatus(true)
    },(error)=>{
      console.log("The error is ", error)
    },[])

    // if (email === "") {
    //   setErrorE("Email is required!");
    // } else if (email !== "") {
    //   setErrorE(null);
    // //   user["email"] += e.target.value;
    // }
    // if ( firstname === "") {
    //   setErrorP("Password is required!");
    // } else if (firstname !== "") {
    //   setErrorP(null);
    // }
    // if (lastname === "") {
    //   setErrorU("name is required!");
    // } else if (lastname !== "") {
    //   setErrorU(null);
    // }
  };

  const onInputChange = (e,n) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    // if (status === true) {
    //   if (e.target.name === "email") {
    //     if (!e.target.value) {
    //       setErrorE("Email is Required!");
    //     } else {
    //       setErrorE(null);
          
    //     }
    //   }

    //   if (e.target.name === "fisrtname") {
    //     if (!e.target.value) {
    //       setErrorP("fistname is required!");
    //     } else {
    //       setErrorP(null);
    //     }
    //   }
    //   if (e.target.name === "lastname") {
    //     if (!e.target.value) {
    //       setErrorU("lastname is Required!");
    //     } else {
    //       setErrorU(null);
    //     }
    //   }
    // }
    // for(let i=0;i<n;i++){
    //   if(arrUservalues[i] === ''){
    //     (document.getElementsByName(arrUserKeys[i]))[0].style.borderBottom = "3px solid red";
    //   }
    // }

  };


  

  return (
    <>
      <div className="form-container" style={{ width: "25%", margin: "50px" }}>
        <form>
          <div class="form-group">
            <label for="exampleInputEmail1">firstname</label>
            <input
              type="text"
              name="fname"
              value={fname}
              onChange={(e) => onInputChange(e,0)}
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter firstname"
            />
            <span style={{ color: "red" }}>{errorU}</span>
          </div>

          <div class="form-group">
            <label for="exampleInputEmail1">email</label>
            <input
              type="email"
              value={email}
              name="email"
              onChange={(e) => onInputChange(e,1)}
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
            <span style={{ color: "red" }}>{errorE}</span>
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">lastname</label>
            <input
              type="text"
              value={lname}
              onChange={(e) => onInputChange(e,2)}
              name="lname"
              class="form-control"
              id="exampleInputPassword1"
              placeholder="lastname"
            />
            <span style={{ color: "red" }}>{errorP}</span>
          </div>
          <br />
          <button type="button" onClick={onSubmit} class="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Practice;
