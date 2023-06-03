import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { makeStyles } from "@material-ui/styles";
import Button from "@mui/material/Button";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Navbar from '../../../Navbar/navbar'
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
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import CloseButton from "react-bootstrap/CloseButton";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DescriptionIcon from "@mui/icons-material/Description";
import CheckBoxRoundedIcon from "@mui/icons-material/CheckBoxRounded";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import { useParams } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
    },
    container: {
        maxHeight: '55vh'
    },
    myDialog: {
        '&::-webkit-scrollbar': {
            background: 'transparent',
            width: '10px',
        },
        '&::-webkit-scrollbar-thumb': {
            background: 'rgba(0, 0, 0, 0.4)',
            borderRadius: '4px'
        }
    }
}));

function TransportAdmin() {
    const classes = useStyles();
    const [rows, setRows] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [transportRequest, settransportRequest] = useState();
    const [transportRequestDetails, settransportRequestDetails] = useState();
    const [reasonObj, setreasonObj] = useState({
        empID: "",
        reason: "",
    });

    const { id } = useParams();              //to navigate approved request page

    useEffect(() => {
        fetchData();
    }, []);

    //----------------view details modal----------------//
    const [modalval, setmodalval] = useState(false);
    const showModal = () => {
        modalval ? setmodalval(false) : setmodalval(true);
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    //----------------view details dialog----------------
    const [reqID, setReqID] = useState();
    const showDialogBox = (id) => {
        axios.get(`http://localhost:3003/transport-request/${id}`)
            .then((res) => {
                setreasonObj({ ...reasonObj, empID: res.data.empID });
                setReqID(id);
                handleClickOpen();
            });
    };

    const sentRequestReason = () => {
        axios.post("http://localhost:3003/transport-request-rejected", reasonObj)
            .then(() => {
                axios.delete(`http://localhost:3003/transport-request/${reqID}`)
                    .then(() => {
                        fetchData();
                        handleClose()
                    })
            })
    };

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    //--------------- getting list of transport requests
    const fetchData = async () => {
        axios.get("http://localhost:3003/transport-request")
            .then((res) => {
                setRows(res.data.length);
                settransportRequest(res.data);
            })
    };

    //-------------------Approve Request-----------------
    function approveRequest(id) {
        axios.get(`http://localhost:3003/transport-request/${id}`)
            .then((res) => {
                axios.post("http://localhost:3003/transport-request-approved", res.data)
                axios.delete(`http://localhost:3003/transport-request/${id}`)
                fetchData();
            })
    }

    //-------------------View Transport Details-----------------
    function viewDetails(id) {
        axios.get(`http://localhost:3003/transport-request/${id}`)
            .then((res) => {
                settransportRequestDetails(res.data);
                showModal()
            }
            )
    }

    const getReason = (e) => {
        setreasonObj({ ...reasonObj, [e.target.name]: e.target.value });
    };

    //--------------select rows----------------//
    const handleChangeRowsPerPage = (e) => {
        setRowsPerPage(+e.target.value);
        setPage(0);
    };
    //----------------next page
    const handleChangePage = (e, newPage) => {
        setPage(newPage);
    };

    const tableHeaders = ["S No.", "Employee ID", "Name", "Location", "Action"]

    const detailsHeaders = [
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
            <TableHeading> Transport Requests </TableHeading>
            <TopButtonDiv>
                <Link style={{ width: '2rem', marginLeft: '2rem' }}
                    to={`/dashboard/admin-transport/admin-transport-approved-request/${id}`}>
                    <TopButton>
                        Approved Requests
                    </TopButton>
                </Link>
            </TopButtonDiv>


            <TransportAdminTableDiv>
                <Paper
                    className={classes.root}
                    style={{ boxShadow: "0.5px 0.5px  10px rgb(65 64 66)" }} >
                    <TableContainer className={`${classes.container} ${classes.myDialog}`} >
                        <Table stickyHeader >
                            <TableHead>
                                <TableRow>
                                    {tableHeaders.map((header) => (
                                        <TableCell align="center"
                                            style={{
                                                backgroundColor: "#D3D3D3",
                                                fontWeight: "bold",
                                            }} >
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
                                                        onClick={() => viewDetails(emp.id)}>
                                                        <DescriptionIcon
                                                            style={{ color: "#2550df" }} />
                                                    </Button>

                                                    <Button
                                                        onClick={() => approveRequest(emp.id)} >
                                                        <CheckBoxRoundedIcon
                                                            style={{ color: "#15ca05" }} />
                                                    </Button>

                                                    <Button
                                                        onClick={() => showDialogBox(emp.id)} >
                                                        <DisabledByDefaultIcon
                                                            style={{ color: "#df2525" }} />
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
                        count={rows}
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
                                    {detailsHeaders.map((obj) => (
                                        <TableRow>
                                            <TableCell>
                                                <b>{obj.Header}</b>
                                            </TableCell>
                                            <TableCell>{obj.Value}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </TransportDetailsModalDiv>
                </    ViewDetailsSpan>
            )}

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Reason</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please Give Reason for your Decision
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="write reason here"
                        type="email"
                        fullWidth
                        variant="standard"
                        name="reason"
                        onChange={getReason}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={sentRequestReason}>Reject</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default TransportAdmin;