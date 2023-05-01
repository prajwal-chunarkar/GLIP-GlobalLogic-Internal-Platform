import React from "react";
import { useState, useEffect } from "react";
import {
    UserDetails,
    Quote,
    DashboardTiles,
    TileItem,
    DashboardMainDiv,
} from "./dashboard.styles";
import Navbar from "../Navbar/navbar";
import { useSelector } from "react-redux";
import GetDispatch from "../Redux-Dispatch/get-dispatchFile";
import Footer from "../Footer/footer";

const Dashboard = () => {
    const fullName = useSelector((state) => state.fullName);
    const empid = useSelector((state) => state.empid);

    var tileItemObj1 = ["Access Previleges", "Transport", "Payslips"];
    var tileItemObj2 = ["Employees List", "Expenses", "Exit"];

    return (
        <>
            <div>
                <Navbar />
            </div>
            <div>
                <DashboardMainDiv className="container-fluid ">
                    <UserDetails
                        style={{ marginTop: "80px", marginLeft: "50px" }}>
                        <i>Hello {fullName},</i>
                    </UserDetails>
                    <UserDetails style={{ marginLeft: "50px" }}>
                        <i>your Emp Id is: {empid}</i>
                    </UserDetails>
                    <div
                        className="row"
                        style={{ boxSizing: "border-box", marginTop: "75px" }}>
                        <Quote className="col-md-3 mb-4 mt-3 pt-4">
                            "All our dreams can come true if we have the courage
                            to pursue them." <br />- Walt Disney
                        </Quote>
                        <div className="col">
                            <div className="dashboard-tiles">
                                <DashboardTiles className="pt-3 ps-4 pb-3 pe-4 row">
                                  
                                    {tileItemObj1.map((item) => (
                                        <TileItem className="dashboard-item1 col-lg-3 mb-2">
                                            {item}
                                        </TileItem>
                                    ))}
                                </DashboardTiles>

                                <DashboardTiles className="pt-3 ps-4 pb-3 pe-4 row">

                                    {tileItemObj2.map((item) => (
                                        <TileItem className="dashboard-item4 col-lg-3 mb-2">
                                        {item}
                                    </TileItem>
                                    ))}
                                </DashboardTiles>
                            </div>
                        </div>
                    </div>
                    <GetDispatch />
                </DashboardMainDiv>
                <Footer />
            </div>
        </>
    );
};

export default Dashboard;
