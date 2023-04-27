import React from "react";

import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InitNameLogic from "./name-Initials";
import { useDispatch, useSelector } from "react-redux";

const InitialName = () => {
  const [usersLength, setUsersLength] = useState(0);
  var initName = "";

  const {id} = useParams();

  var dispatch = useDispatch();
  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:3003/users/${id}`,
    }).then(
      (response) => {
        initName = InitNameLogic(response.data);

        dispatch({
          type: "NAME_INIT",
          payload: initName,
        });

        dispatch({
          type: "FULL_NAME",
          payload: `${response.data.fname} ${response.data.lname}`
        });

        dispatch({
          type: "EMP_ID",
          payload: id
        });
      },
      (error) => {
        console.log("The error is ", error);
      }
    );
  }, []);

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:3003/users",
    }).then(
      (response) => {
        setUsersLength(response.data.length);
        dispatch({
          type: "USERS_LENGTH",
          payload: response.data.length
        })
      },
      (error) => {
        console.log("error is", error);
      }
    );
  }, []);

  return (
    <div>
      <h1>Total Registrations : {usersLength}</h1>
    </div>
  );
};

export default InitialName;
