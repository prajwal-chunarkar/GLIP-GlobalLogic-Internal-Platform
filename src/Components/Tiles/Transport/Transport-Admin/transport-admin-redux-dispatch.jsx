import React from "react";

import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch} from "react-redux";

const TransportAdminReduxDispatch = () => {

    const [trasportRequest, setTrasportRequest] = useState()

    var dispatchTransportRequest = useDispatch();
    useEffect(() => {
        axios({
            method: "get",
            url: "http://localhost:3003/transport-request",
        }).then(
            (response) => {
                setTrasportRequest(response.data)
            },
            (error) => {
                console.log("error is", error);
            }
        ).then(
            dispatchTransportRequest({
                type: "TRANSPORT_REQUEST",
                payload: trasportRequest,
            })
        )
    }, []);
    
   
    return <div>
    </div>;
};

export default TransportAdminReduxDispatch;
