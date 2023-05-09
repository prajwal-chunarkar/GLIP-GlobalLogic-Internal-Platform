import { makeStyles } from "@material-ui/styles";
import Button from "@mui/material/Button";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from '../../../Navbar/navbar'
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
    ApprovedRequestButton,
    ViewDetailsSpan
} from "./transport-admin.style";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import DescriptionIcon from "@mui/icons-material/Description";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
// import { useSelector } from "react-redux";
import TransportAdminReduxDispatch from "./transport-admin-redux-dispatch";
import CloseButton from "react-bootstrap/CloseButton";
import CheckBoxRoundedIcon from "@mui/icons-material/CheckBoxRounded";
// import {acceptRequest} from './transport-admin-hook'
// import {FetchData} from './transport-admin-hook'
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import { useParams } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
    },
    container: {
        maxHeight: 440,
    },
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

    const { id } = useParams();

    // const [detilsToAcceptRequest, setdetilsToAcceptRequest] = useState({});
    // const [demo, setdemo] = useState({
    //     demo: "demo",
    // });

    // const transportRequest = useSelector((state) => state.transportRequest);

    // const [rows, setRows] = FetchData();
    // const [transportRequest, settransportRequest] = FetchData();

    //-------------calling fetchData()
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

    //----------------view details dialog----------------
    const [reqID, setReqID] = useState();
    const showDialogBox = (id) => {
        axios
            .get(`http://localhost:3003/transport-request/${id}`)
            .then((res) => {
                setreasonObj({ ...reasonObj, empID: res.data.empID });
                setReqID(id);
                handleClickOpen();
            });
    };

    const sentRequestReason = () => {
        axios
            .post("http://localhost:3003/transport-request-rejected", reasonObj)
            .then(
                axios({
                    method: "delete",
                    url: `http://localhost:3003/transport-request/${reqID}`,
                })
            )
            .then(() => {
                FetchData();
            })
            ?.then(handleClose());
    };

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    //--------------- getting list of transport requests
    const FetchData = async () => {
        const result = await axios.get(
            "http://localhost:3003/transport-request"
        );
        setRows(result.data);
        settransportRequest(result.data);
    };

    //-------------------Approve Request-----------------
    function approveRequest(id) {
        axios
            .get(`http://localhost:3003/transport-request/${id}`)
            .then((res) => {
                axios.post(
                    "http://localhost:3003/transport-request-approved",
                    res.data
                );
            })
            .then(
                axios({
                    method: "delete",
                    url: `http://localhost:3003/transport-request/${id}`,
                })
            )
            .then(() => {
                FetchData();
            });
    }

    //-------------------View Transport Details-----------------
    function viewDetails(id) {
        axios({
            method: "get",
            url: `http://localhost:3003/transport-request/${id}`,
        })
            .then(
                (response) => {
                    settransportRequestDetails(response.data);
                },
                (error) => {
                    console.log("the error is", error);
                }
            )
            .then(showModal());
    }

    const getReason = (e) => {
        setreasonObj({ ...reasonObj, [e.target.name]: e.target.value });
    };

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
        { header: "S No." },
        { header: "Employee ID" },
        { header: "Name" },
        { header: "Location" },
        { header: "Action" },
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

    const headingTransportAdmin = ["T", "r", "a", "n", "s", "p", "o", "r", "t", " ", "R", "e", "q", "u", "e", "s", "t", "s"];

    return (
        <>
            <Navbar />
            <TransportAdminReduxDispatch />

            <TransportAdminParentDiv>
                <TransportHeadingDiv>
                    {headingTransportAdmin.map((letter) => (
                        <TransportHeadingLettersSpan>
                            {letter}
                        </TransportHeadingLettersSpan>
                    ))}
                </TransportHeadingDiv>
                
                <Link style={{ width: '2rem', marginLeft: '2rem' }}
                    to={`/dashboard/admin-transport/admin-transport-approved-request/${id}`}>
                    <ApprovedRequestButton>
                        Approved Requests
                    </ApprovedRequestButton>
                </Link>
                <TransportAdminTableDiv>
                    <Paper
                        className={classes.root}
                        style={{
                            boxShadow: "0.5px 0.5px  10px rgb(65 64 66)",
                        }}>
                        <TableContainer className={classes.container} style={{ maxHeight: '50vh'}}>
                            <Table stickyHeader aria-label="sticky table">
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
                                                        <Button
                                                            onClick={() =>
                                                                approveRequest(
                                                                    employee.id
                                                                )
                                                            }>
                                                            <CheckBoxRoundedIcon
                                                                style={{
                                                                    color: "#15ca05",
                                                                }}
                                                            />
                                                        </Button>
                                                        <Button
                                                            onClick={() =>
                                                                showDialogBox(
                                                                    employee.id
                                                                )
                                                            }>
                                                            <DisabledByDefaultIcon
                                                                style={{
                                                                    color: "#df2525",
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
                <ViewDetailsSpan className="position-absolute top-50 start-50 translate-middle">
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
