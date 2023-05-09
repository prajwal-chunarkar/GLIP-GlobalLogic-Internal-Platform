import { makeStyles } from "@material-ui/styles";
import CheckBoxRoundedIcon from "@mui/icons-material/CheckBoxRounded";
import DescriptionIcon from "@mui/icons-material/Description";
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import Button from "@mui/material/Button";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TextField from '@mui/material/TextField';
import axios from "axios";
import React, { useEffect, useState } from "react";
import CloseButton from "react-bootstrap/CloseButton";
import Navbar from '../../../Navbar/navbar';
import {
    CloseButtonDiv, ViewDetailsDiv, TransportAdminParentDiv, TransportAdminTableDiv, TransportDetailsModalDiv, TransportHeadingDiv,
    TransportHeadingLettersSpan, ViewTransportDetailsHeadingDiv
} from "./access-privilege-admin.style";


const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
    },
    container: {
        maxHeight: 440,
    },
}));

function AccessPrivilegeAdmin() {
    const classes = useStyles();
    const [rows, setRows] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [accessPrevilegeRequest, setAccessPrevilegeRequest] = useState();
    const [accessPrevilegeRequestDetails, setaccessPrevilegeRequestDetails] = useState();
    const [reason, setreason] = useState({})
    const [empid, setEmpid] = useState()
    const [reasonObj, setreasonObj] = useState({})

    //-------------calling fetchData()-----------------
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
    const [id, setid] = useState()
    const showDialogBox = (id) => {
        axios
            .get(`http://localhost:3003/access-previlege-request/${id}`).then((res) => {
                setEmpid(res.data)
                setid(id)
                handleClickOpen()
            })
    };


    const sentRequestReason = () => {
        axios.post(
            "http://localhost:3003/access-previlege-request-rejected",
            reasonObj
        ).then(
            axios({
                method: "delete",
                url: `http://localhost:3003/access-previlege-request/${id}`,
            })
        )
            .then(() => {
                FetchData();
            })
            ?.then(
                handleClose()
            )
    }

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
            "http://localhost:3003/access-previlege-request"
        );
        setRows(result.data);
        setAccessPrevilegeRequest(result.data);
    };

    //-------------------Approve Request-----------------
    function approveRequest(id) {
        axios
            .get(`http://localhost:3003/access-previlege-request/${id}`)
            .then((res) => {
                axios.post(
                    "http://localhost:3003/access-previlege-request-approved",
                    res.data
                );
            }
            )
            .then(
                axios({
                    method: "delete",
                    url: `http://localhost:3003/access-previlege-request/${id}`,
                })
            )
            .then(() => {
                FetchData();
            })
    }

    //-------------------View Access Request Details-----------------
    function viewDetails(id) {
        axios({
            method: "get",
            url: `http://localhost:3003/access-previlege-request/${id}`,
        })
            .then(
                (response) => {
                    setaccessPrevilegeRequestDetails(response.data);
                },
                (error) => {
                    console.log("the error is", error);
                }
            )
            .then(showModal());
    }

    const getReason = (e) => {
        setreasonObj({ [e.target.name]: e.target.value })
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
        { header: "S No." },
        { header: "Employee ID" },
        { header: "Name" },
        { header: "Request for" },
        { header: "date" },
        { header: "Action" },
    ];

    const viewDetailsTableHeaders = [
        {
            Header: "Employee ID",
            Value: accessPrevilegeRequestDetails?.empID,
        },
        {
            Header: "Employee Name",
            Value: accessPrevilegeRequestDetails?.empName,
        },
        {
            Header: "Request For",
            Value: accessPrevilegeRequestDetails?.requestFor,
        },
        {
            Header: "Date",
            Value: accessPrevilegeRequestDetails?.date.slice(0,10),
        },
        {
            Header: "Reason",
            Value: accessPrevilegeRequestDetails?.reason,
        }
    ];
    const headingTransportAdmin = ["A", "c", "c", "e", "s", "s", " ", "P", "r", "i", "v", "i", "l", "e", "g", "e", "s", " ", "R", "e", "q", "u", "e", "s", "t", "s"];

    return (
        <>
            <Navbar />
            <TransportAdminParentDiv>
                <TransportHeadingDiv>
                    {headingTransportAdmin.map((letter) => (
                        <TransportHeadingLettersSpan>{letter}</TransportHeadingLettersSpan>
                    ))}
                </TransportHeadingDiv>
                <TransportAdminTableDiv>
                    <Paper
                        className={classes.root}
                        style={{
                            boxShadow: "0.5px 0.5px  10px rgb(65 64 66)",
                        }}>
                        <TableContainer className={classes.container} style={{ maxHeight: '55vh' }}>
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
                                    {accessPrevilegeRequest
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
                                                        {employee.requestFor}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        {employee.date.slice(0, 10)}
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
                <ViewDetailsDiv className="position-absolute top-50 start-50 translate-middle">
                    <TransportDetailsModalDiv>
                        <TableContainer component={Paper}>

                            <Table
                                sx={{ minWidth: 650 }}
                                aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center" colSpan={3}>
                                            <CloseButtonDiv>
                                                <CloseButton
                                                    onClick={showModal}
                                                />
                                            </CloseButtonDiv>
                                            <ViewTransportDetailsHeadingDiv>
                                                Transport Details
                                            </ViewTransportDetailsHeadingDiv>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {viewDetailsTableHeaders?.map((obj) => (
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
                </ViewDetailsDiv>
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
                    <Button onClick={sentRequestReason}>Delete</Button>
                </DialogActions>
            </Dialog>

        </>
    );
}

export default AccessPrivilegeAdmin;