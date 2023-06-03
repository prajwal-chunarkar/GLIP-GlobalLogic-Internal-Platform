import React, { useEffect, useState } from "react";
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
import CloseButton from "react-bootstrap/CloseButton";
import Navbar from '../../../Navbar/navbar';
import {
    TableHeading,
    AccessAdminTableDiv,
    CloseButtonDiv,
    AccessDetailsModalDiv,
    ViewAccessDetailsHeadingDiv,
    ViewDetailsDiv
} from "./access-privilege-admin.style";

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

    //-------------calling fetchdata()-----------------
    useEffect(() => {
        fetchdata();
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
        axios.get(`http://localhost:3003/access-previlege-request/${id}`)
            .then((res) => {
                setEmpid(res.data.empID)
                setid(id)
                handleClickOpen()
            })
    };

    const sentRequestReason = () => {
        axios.post("http://localhost:3003/access-previlege-request-rejected", reasonObj)
            .then(() => {
                axios.delete(`http://localhost:3003/access-previlege-request/${id}`)
            })
            .then(() => {
                fetchdata();
                handleClose()
            })
    }

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    //--------------- getting list of transport requests
    const fetchdata = async () => {
        const result = await axios.get("http://localhost:3003/access-previlege-request");
        setRows(result.data.length);
        setAccessPrevilegeRequest(result.data);
    };

    //-------------------Approve Request-----------------
    function approveRequest(id) {
        axios.get(`http://localhost:3003/access-previlege-request/${id}`)
            .then((res) => {
                axios.post("http://localhost:3003/access-previlege-request-approved", res.data);
            })
            .then(() => {
                axios.delete(`http://localhost:3003/access-previlege-request/${id}`)
                    .then(() => {
                        fetchdata();
                    })
            })
    }

    //-------------------View Access Request Details-----------------
    function viewDetails(id) {
        axios.get(`http://localhost:3003/access-previlege-request/${id}`)
            .then((res) => {
                setaccessPrevilegeRequestDetails(res.data);
                showModal()
            }
            )
    }

    const getReason = (e) => {
        setreasonObj({ [e.target.name]: e.target.value , 'empID': empid });
    }

    //----------------select rows
    const handleChangeRowsPerPage = (e) => {
        setRowsPerPage(+e.target.value);
        setPage(0);
    };
    //----------------next page
    const handleChangePage = (e, newPage) => {
        setPage(newPage);
    };

    const tableHeaders = ['S No.', 'Employee ID', 'Name', 'Request for', 'Date', 'Action'];

    const detailsHeaders = [
        {
            Header: "Employee ID",
            value: accessPrevilegeRequestDetails?.empID,
        },
        {
            Header: "Employee Name",
            value: accessPrevilegeRequestDetails?.empName,
        },
        {
            Header: "Request For",
            value: accessPrevilegeRequestDetails?.requestFor,
        },
        {
            Header: "Date",
            value: accessPrevilegeRequestDetails?.date.slice(0, 10),
        },
        {
            Header: "Reason",
            value: accessPrevilegeRequestDetails?.reason,
        }
    ];

    return (
        <>
            <Navbar />
            <TableHeading> Access Privilege Requests </TableHeading>
            <AccessAdminTableDiv>
                <Paper className={classes.root}
                    style={{ boxShadow: "0.5px 0.5px  10px rgb(65 64 66)" }} >
                    <TableContainer className={`${classes.container} ${classes.myDialog}`} >
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    {tableHeaders.map((header) => (
                                        <TableCell
                                            align="center"
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
                                {accessPrevilegeRequest?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((emp, index) => {
                                        return (
                                            <TableRow
                                                hover
                                                role="checkbox"
                                                tabIndex={-1}
                                                key={index}>
                                                <TableCell align="center"
                                                    style={{ fontWeight: "bold" }} >
                                                    {index + 1}
                                                </TableCell>

                                                <TableCell align="center">
                                                    {emp.empID}
                                                </TableCell>

                                                <TableCell align="center">
                                                    {emp.empName}
                                                </TableCell>

                                                <TableCell align="center">
                                                    {emp.requestFor}
                                                </TableCell>

                                                <TableCell align="center">
                                                    {emp.date.slice(0, 10)}
                                                </TableCell>

                                                <TableCell align="center">
                                                    <Button onClick={() => viewDetails(emp.id)} >
                                                        <DescriptionIcon
                                                            style={{ color: "#2550df" }}
                                                        />
                                                    </Button>
                                                    
                                                    <Button onClick={() => approveRequest(emp.id)} >
                                                        <CheckBoxRoundedIcon
                                                            style={{color: "#15ca05"}}
                                                        />
                                                    </Button>

                                                    <Button onClick={() => showDialogBox(emp.id) } >
                                                        <DisabledByDefaultIcon
                                                            style={{ color: "#df2525" }}
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
                        count={rows}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </AccessAdminTableDiv>

            {modalval && (
                <ViewDetailsDiv className="position-absolute top-50 start-50 translate-middle">
                    <AccessDetailsModalDiv>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center" colSpan={3}>
                                            <CloseButtonDiv>
                                                <CloseButton onClick={showModal} />
                                            </CloseButtonDiv>
                                            <ViewAccessDetailsHeadingDiv>
                                                Transport Details
                                            </ViewAccessDetailsHeadingDiv>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {detailsHeaders?.map((obj) => (
                                        <TableRow>
                                            <TableCell style={{fontWeight: 'bold'}}>
                                                {obj.Header}
                                            </TableCell>
                                            <TableCell>{obj.value}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </AccessDetailsModalDiv>
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