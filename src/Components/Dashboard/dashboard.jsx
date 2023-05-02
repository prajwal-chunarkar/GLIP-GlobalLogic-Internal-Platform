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
import axios from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Footer from "../Footer/footer";
import { useParams } from "react-router-dom";
import NameInitials from "./name-initials";
import { Link } from "react-router-dom";

const Dashboard = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const [currUser, setCurrUser] = useState({});
    const [initials, setInitials] = useState('');

    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        fetchdata();
    }, [])

    const fetchdata = async () => {
        await axios.get(`http://localhost:3003/users/${id}`)
            .then((res) => {
                setCurrUser(res.data)
                dispatch({
                    type: "CURRENT_USER",
                    payload: res.data
                })

                const result = NameInitials(res.data.fname, res.data.lname);
                setInitials(result)
                dispatch({
                    type: "NAME_INITIALS",
                    payload: result
                })

                if(res.data.user_type === 'admin'){
                    setIsAdmin(true)
                }
            })
    }

    const { empID, fname, lname } = currUser;

    var tilesRow1 = [
        {
            label: "Access Previleges",
            adminLink: `/dashboard/accessadmin/${id}`,
            empLink: `/dashboard/accessemp/${id}`
        },
        {
            label: "Transport",
            adminLink: `/dashboard/transpadmin/${id}`,
            empLink: `/dashboard/transpemp/${id}`
        },
        {
            label: "Payslips",
            adminLink: `/dashboard/${id}`,
            empLink: `/dashboard/${id}`
        }
    ];
    var tilesRow2 = [
        {
            label: "Employees List",
            adminLink: `/dashboard/emplistadmin/${id}`,
            empLink: `/dashboard/${id}`
        },
        {
            label: "Expenses",
            adminLink: `/dashboard/${id}`,
            empLink: `/dashboard/${id}`
        },
        {
            label: "Exit",
            adminLink: `/dashboard/${id}`,
            empLink: `/dashboard/${id}`
        }
    ];

    return (
        <>
            <div>
                <Navbar />
            </div>
            <div>
                <DashboardMainDiv className="container-fluid ">
                    <UserDetails
                        style={{ marginTop: "80px", marginLeft: "50px" }}>
                        <i>Hello {fname} {lname},</i>
                    </UserDetails>
                    <UserDetails style={{ marginLeft: "50px" }}>
                        <i>your Emp Id is: {empID}</i>
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

                                    {tilesRow1.map((item) => (
                                        <Link to= {isAdmin ? item.adminLink : item.empLink}>
                                            <TileItem className="dashboard-item1 col-lg-3 mb-2">
                                                {item.label}
                                            </TileItem>
                                        </Link>
                                    ))}
                                </DashboardTiles>

                                <DashboardTiles className="pt-3 ps-4 pb-3 pe-4 row">

                                    {tilesRow2.map((item) => (
                                        <Link to= {isAdmin ? item.adminLink : item.empLink}>
                                            <TileItem className="dashboard-item4 col-lg-3 mb-2">
                                                {item.label}
                                            </TileItem>
                                        </Link>
                                    ))}
                                </DashboardTiles>
                            </div>
                        </div>
                    </div>

                </DashboardMainDiv>
                <Footer />
            </div>
        </>
    );
};

export default Dashboard;
