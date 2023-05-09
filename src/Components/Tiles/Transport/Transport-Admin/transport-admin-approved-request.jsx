import React from 'react'
import { makeStyles } from "@material-ui/styles";
import Button from "@mui/material/Button";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Navbar from '../../../Navbar/navbar'
import axios from "axios";
import { useEffect, useState } from "react";
import {
    TransportAdminTableDiv,
    TransportAdminParentDiv,
    HeadingTransportAdmint,
    DivCloseButtonDiv,
    TransportDetailsModalDiv,
    TransportDetailsModalTextDiv,
    ViewTransportDetailsHeadingDiv,
    SubmitButton,
    TransportHeadingDiv,
    TransportHeadingLettersSpan,
    DivViewDetailsSpan,
} from "./transport-admin.style";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import DescriptionIcon from "@mui/icons-material/Description";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TransportAdminReduxDispatch from "./transport-admin-redux-dispatch";
import CloseButton from "react-bootstrap/CloseButton";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";


const TransportAdminApprovedRequest = () => {
    const [rows, setRows] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [transportRequest, settransportRequest] = useState();
    const [transportRequestDetails, settransportRequestDetails] = useState();
    const [empid, setEmpid] = useState()
    const [reasonObj, setreasonObj] = useState({})

    const { id } = useParams();

    useEffect(() => {
        FetchData();
    }, []);

    //----------------view details modal----------------
    const [modalval, setmodalval] = useState(false);
    const showModal = () => {
        modalval ? setmodalval(false) : setmodalval(true);
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };
    //--------------- getting list of transport requests
    const FetchData = async () => {
        const result = await axios.get(
            "http://localhost:3003/transport-request-approved"
        );
        setRows(result.data);
        settransportRequest(result.data);
    };

    //-------------------View Transport Details-----------------
    function viewDetails(id) {
        axios({
            method: "get",
            url: `http://localhost:3003/transport-request-approved/${id}`,
        })
            .then(
                (response) => {
                    settransportRequestDetails(response.data);
                },
                (error) => {
                    console.log("the error is", error);
                }
            ).then(showModal());
    }


    //----------------select rows
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    //----------------next page
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const transportRequestTableHeaders = [
        {
            header: "S No",
        },
        {
            header: "Employee ID",
        },
        {
            header: "Name",
        },
        {
            header: "Location",
        },
        {
            header: "View",
        },
    ];

    const viewDetailsTableHeaders = [
        {
            Header: "Employee ID",
            Value: transportRequestDetails?.empID,
        },
        {
            Header: "Employee Name",
            Value: transportRequestDetails?.empName,
        },
        {
            Header: "Location",
            Value: transportRequestDetails?.location,
        },
        {
            Header: "Pickup Location",
            Value: transportRequestDetails?.pickupLocation,
        },
        {
            Header: "Pickup Address",
            Value: transportRequestDetails?.pickupAddress,
        },
        {
            Header: "Drop Location",
            Value: transportRequestDetails?.dropLocation,
        },
        {
            Header: "Pickup Location",
            Value: transportRequestDetails?.dropAddress,
        },
        {
            Header: "Return Trip",
            Value: transportRequestDetails?.returnTrip,
        },
        {
            Header: "Start Date",
            Value: transportRequestDetails?.startDate,
        },
        {
            Header: "End Date",
            Value: transportRequestDetails?.endDate,
        },
    ];

    const headingTransportAdmin = ["A", "p", "p", "r", "o", "v", "e", "d", " ", "T", "r", "a", "n", "s", "p", "o", "r", "t", " ", "R", "e", "q", "u", "e", "s", "t", "s",];
    return (
        <div>
            <Navbar />
            <TransportAdminReduxDispatch />
            <TransportAdminParentDiv>
                <TransportHeadingDiv>
                    {headingTransportAdmin.map((letter) => (
                        <TransportHeadingLettersSpan>{letter}</TransportHeadingLettersSpan>
                    ))}
                </TransportHeadingDiv>
                <Link style={{ width: '2rem', marginLeft: '2rem' }}
                    to={`/dashboard/admin-transport/${id}`}>
                    <SubmitButton>
                        <ArrowBackIcon />
                    </SubmitButton>
                </Link>
                <TransportAdminTableDiv>
                    <Paper
                        style={{
                            boxShadow: "0.5px 0.5px  10px rgb(65 64 66)",
                        }}>
                        <TableContainer>
                            <Table aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        {transportRequestTableHeaders.map(
                                            (e) => (
                                                <TableCell
                                                    align="center"
                                                    style={{
                                                        backgroundColor:
                                                            "#D3D3D3",
                                                        fontSize: "1rem",
                                                    }}>
                                                    <b>{e.header}</b>
                                                </TableCell>
                                            )
                                        )}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {transportRequest
                                        ?.slice(
                                            page * rowsPerPage,
                                            page * rowsPerPage + rowsPerPage
                                        )
                                        .map((employee, index) => {
                                            return (
                                                <TableRow
                                                    hover
                                                    role="checkbox"
                                                    tabIndex={-1}
                                                    key={index}>
                                                    <TableCell
                                                        align="center"
                                                        style={{
                                                            fontWeight: "bold",
                                                        }}>
                                                        {index + 1}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        {employee.empID}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        {employee.empName}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        {employee.location}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <Button
                                                            onClick={() =>
                                                                viewDetails(
                                                                    employee.id
                                                                )
                                                            }>
                                                            <DescriptionIcon
                                                                style={{
                                                                    color: "#2550df",
                                                                }}
                                                            />
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, 100]}
                            component="div"
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Paper>
                </TransportAdminTableDiv>
            </TransportAdminParentDiv>

            {modalval && (
                <viewDetails className="position-absolute top-50 start-50 translate-middle">
                    <TransportDetailsModalDiv>
                        <TableContainer component={Paper}>
                            <Table
                                sx={{ minWidth: 650 }}
                                stickyHeader
                                aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center" colSpan={3}>
                                            <DivCloseButtonDiv>
                                                <CloseButton
                                                    onClick={showModal}
                                                />
                                            </DivCloseButtonDiv>
                                            <ViewTransportDetailsHeadingDiv>
                                                Transport Details
                                            </ViewTransportDetailsHeadingDiv>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {viewDetailsTableHeaders.map((e) => (
                                        <TableRow>
                                            <TableCell>
                                                <b>{e.Header}</b>
                                            </TableCell>
                                            <TableCell>{e.Value}</TableCell>
                                        </TableRow>
                                    ))}

                                </TableBody>
                            </Table>
                        </TableContainer>
                    </TransportDetailsModalDiv>
                </viewDetails>
            )}
        </div>
    )
}

export default TransportAdminApprovedRequest