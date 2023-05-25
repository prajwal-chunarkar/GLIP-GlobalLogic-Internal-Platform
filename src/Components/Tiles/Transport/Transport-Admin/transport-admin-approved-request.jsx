import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
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
import {
    TableHeading,
    TransportAdminTableDiv,
    DivCloseButtonDiv,
    TransportDetailsModalDiv,
    ViewTransportDetailsHeadingDiv,
    TopButtonDiv,
    TopButton,
    ViewDetailsSpan
} from "./transport-admin.style";
import DescriptionIcon from "@mui/icons-material/Description";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import CloseButton from "react-bootstrap/CloseButton";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%"
    },
    container: {
        maxHeight: '55vh'
    },
    myDialog: {
        '&::-webkit-scrollbar': {
            background: 'transparent',
            width: '10px'
        },
        '&::-webkit-scrollbar-thumb': {
            background: 'rgba(0, 0, 0, 0.4)',
            borderRadius: '4px'
        }
    }
}));


const TransportAdminApprovedRequest = () => {
    const classes = useStyles();
    const [rows, setRows] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [transportRequest, settransportRequest] = useState();
    const [transportRequestDetails, settransportRequestDetails] = useState();
    const [empid, setEmpid] = useState()

    const { id } = useParams();

    useEffect(() => {
        fetchData();
    }, []);

    //----------------view details modal----------------
    const [modalval, setmodalval] = useState(false);
    const showModal = () => {
        modalval ? setmodalval(false) : setmodalval(true);
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };
    //--------------- getting list of transport requests
    const fetchData = async () => {
        await axios.get("http://localhost:3003/transport-request-approved")
            .then((res) => {
                setRows(res.data);
                settransportRequest(res.data);
            })
    };

    //-------------------View Transport Details-----------------
    function viewDetails(id) {
        axios.get(`http://localhost:3003/transport-request-approved/${id}`)
            .then((res) => {
                settransportRequestDetails(res.data);
                showModal()
            }
            )
    }

    //----------------select rows-------------//
    const handleChangeRowsPerPage = (e) => {
        setRowsPerPage(+e.target.value);
        setPage(0);
    };
    //----------------next page
    const handleChangePage = (e, newPage) => {
        setPage(newPage);
    };
    const tableHeaders = ["S No", "Employee ID", "Name", "Location", "View"];

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
            Value: transportRequestDetails?.startDate.slice(0, 10),
        },
        {
            Header: "End Date",
            Value: transportRequestDetails?.endDate.slice(0, 10),
        },
        {
            Header: "Days",
            Value: transportRequestDetails?.weekDays
        }
    ];

    return (
        <>
            <Navbar />
            <TableHeading> Approved Transport Requests </TableHeading>
            <TopButtonDiv>
                <Link style={{ width: '2rem', marginLeft: '2rem' }}
                    to={`/dashboard/admin-transport/${id}`}>
                    <TopButton>
                        <ArrowBackIcon />
                    </TopButton>
                </Link>
            </TopButtonDiv>

            <TransportAdminTableDiv>
                <Paper
                    className={classes.root}
                    style={{ boxShadow: "0.5px 0.5px  10px rgb(65 64 66)" }}>
                    <TableContainer className={`${classes.container} ${classes.myDialog}`} >
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    {tableHeaders.map((header) => (
                                        <TableCell align="center"
                                            style={{
                                                backgroundColor: "#D3D3D3",
                                                fontWeight: 'bold'
                                            }}>
                                            {header}
                                        </TableCell>
                                    )
                                    )}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {transportRequest?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((emp, index) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                                <TableCell align="center"
                                                    style={{ fontWeight: "bold" }}>
                                                    {index + 1}
                                                </TableCell>

                                                <TableCell align="center">
                                                    {emp.empID}
                                                </TableCell>

                                                <TableCell align="center">
                                                    {emp.empName}
                                                </TableCell>

                                                <TableCell align="center">
                                                    {emp.location}
                                                </TableCell>

                                                <TableCell align="center">
                                                    <Button
                                                        onClick={() => viewDetails(emp.id)} >
                                                        <DescriptionIcon
                                                            style={{ color: "#2550df" }} />
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

            {modalval && (
                <ViewDetailsSpan className="position-absolute top-50 start-50 translate-middle">
                    <TransportDetailsModalDiv>
                        <TableContainer component={Paper} className={classes.myDialog}>
                            <Table stickyHeader >
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center" colSpan={3}>
                                            <DivCloseButtonDiv>
                                                <CloseButton onClick={showModal} />
                                            </DivCloseButtonDiv>
                                            <ViewTransportDetailsHeadingDiv>
                                                Transport Details
                                            </ViewTransportDetailsHeadingDiv>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {viewDetailsTableHeaders.map((obj) => (
                                        <TableRow>
                                            <TableCell style={{ fontWeight: 'bold' }}>
                                                {obj.Header}
                                            </TableCell>
                                            <TableCell>{obj.Value}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </TransportDetailsModalDiv>
                </ViewDetailsSpan>
            )}
        </>
    )
}
export default TransportAdminApprovedRequest