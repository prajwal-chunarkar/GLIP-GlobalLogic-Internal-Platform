import React, { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from "sweetalert2";
import Navbar from '../../../Navbar/navbar'
import {
  FormHeading,
  EmpLeavesReqsTableDiv,
  ViewDetailsDiv,
  LeaveDetailsModalDiv,
  DivCloseButtonDiv,
  LeaveDetailsHeadingDiv
} from './leave-manage-admin.style'

import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import { makeStyles } from "@material-ui/styles";


import DescriptionIcon from "@mui/icons-material/Description";
import CheckBoxRoundedIcon from "@mui/icons-material/CheckBoxRounded";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import CountWeekdays from '../../Transport/Transport-Employee/count-week-days';
import Button from "@mui/material/Button";
import CloseButton from "react-bootstrap/CloseButton";

import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%"
  },
  container: {
    maxHeight: '440',
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

const LeaveManageAdmin = () => {
  const { id } = useParams();               //admin's id from url
  const classes = useStyles();
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  //----------------select rows
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  //----------------next page
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  //----------------view details modal----------------
  const [modalval, setmodalval] = useState(false);
  const showModal = () => {
    modalval ? setmodalval(false) : setmodalval(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const [totalLeaves, setTotalLeaves] = useState([]);
  const [admin, setAdmin] = useState({});

  useEffect(() => {
    fetchdata();
  }, [])

  const fetchdata = async () => {
    await axios.get(`http://localhost:3003/leave-requests`)
      .then((res) => {
        setTotalLeaves(res.data)
        setRows(res.data.length)
      });
    await axios.get(`http://localhost:3003/users/${id}`)
      .then((resp) => {
        setAdmin(resp.data)
      })

  }

  // ---------------------------------------------------------------------------------

  //store single leave req obj of that row
  const [leaveDetails, setLeaveDetails] = useState({})
  const [leavesRemain, setLeavesRemain] = useState({})

  const viewLeaveDetails = (uid) => {
    axios.get(`http://localhost:3003/leave-requests/${uid}`)
      .then((res) => {
        setLeaveDetails(res.data)


        axios.get(`http://localhost:3003/leaves-remain`)
          .then((resp) => {
            resp.data.forEach((obj) => {
              if (obj.empID === res.data.empID) {
                setLeavesRemain(obj)
              }
            })
          })
      })
      .then(() => showModal())
  }

  // ---------------------------------------------------------------------------------

  const approveLeaveRequest = (uid) => {
    axios.get(`http://localhost:3003/leave-requests/${uid}`)
      .then((res) => {
        let reqObj = {
          empName: res.data.empName,
          empID: res.data.empID,
          leaveType: res.data.leaveType,
          startDate: res.data.startDate,
          endDate: res.data.endDate,
          duration: res.data.duration,
          isHalfDay: res.data.isHalfDay,
          halfDayDate: res.data.halfDayDate,
          reason: res.data.reason,
          actionBy: `${admin.fname} ${admin.lname}`,        //admin's name updated
          rejectReason: '-',
          status: 'Approved',                                //this is updated
          id: res.data.id
        }
        axios.put(`http://localhost:3003/leave-requests/${uid}`, reqObj)

        axios.get(`http://localhost:3003/leaves-remain`)
          .then((response) => {
            response.data.forEach((obj) => {         //leaves-remain data object
              if (obj.empID === res.data.empID) {
                var sl = obj.sickLeaves
                var cl = obj.casualLeaves
                var pl = obj.paidLeaves
                console.log(sl, cl, pl)
                console.log(res.data.duration);
                if (res.data.leaveType === 'Sick Leave') {
                  debugger;
                  sl = sl - res.data.duration;
                  console.log(sl)
                }
                else if (res.data.leaveType === 'Casual Leave') {
                  debugger;
                  cl = cl - res.data.duration;
                  console.log(cl)
                }
                else if (res.data.leaveType === 'Paid Leave') {
                  debugger;
                  pl = pl - res.data.duration;
                  console.log(pl);
                }
                debugger;
                const leavesRemainObj = {
                  id: obj.id,
                  empID: obj.empID,
                  empName: obj.empName,
                  casualLeaves: cl,
                  sickLeaves: sl,
                  paidLeaves: pl
                }
                debugger;
                axios.put(`http://localhost:3003/leaves-remain/${obj.id}`, leavesRemainObj)
                debugger;
                Swal.fire("Done", "Request Approved Successfully.", "success");
                window.location.href = `/${id}`;
                return;
              }
            })
          })
      })
    // .then(() => {
    //   debugger;
    //   console.log("href")
    //   // window.location.href = `/${id}`;    //must change after merge (id of users->admin)
    // })
  }

  // -----------------------------------------------------------------------------------------

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [rejectReason, setRejectReason] = useState();

  // here leaveid & uid refer to same (i.e leave request id)
  const [leaveid, setLeaveid] = useState();               //store row id of leave request(leave ID)

  const showDialogBox = (uid) => {             // for rejection
    handleClickOpen();
    setLeaveid(uid);
  }

  const postRejectReason = () => {
    axios.get(`http://localhost:3003/leave-requests/${leaveid}`)
      .then((res) => {
        let reqObj = {
          empName: res.data.empName,
          empID: res.data.empID,
          leaveType: res.data.leaveType,
          startDate: res.data.startDate,
          endDate: res.data.endDate,
          duration: res.data.duration,
          isHalfDay: res.data.isHalfDay,
          halfDayDate: res.data.halfDayDate,
          reason: res.data.reason,
          actionBy: `${admin.fname} ${admin.lname}`,                  //admin's name updated
          rejectReason: rejectReason,                               //this is updated
          status: 'Rejected',                                            //this is updated
          id: res.data.id
        }
        axios.put(`http://localhost:3003/leave-requests/${leaveid}`, reqObj)
      })
      .then(() => {
        handleClose();
        window.location.href = `/${id}`;            //must change after merge (id of users->admin)
      })
  }

  const LeavesRecordHeaders = ['S No.', 'Emp ID', 'Name', 'Start Date', 'End Date', 'Status', 'Action'];
  const LeavesDetailsHeaders = [
    {
      header: 'Leave ID',
      value: leaveDetails?.id
    },
    {
      header: 'Name',
      value: leaveDetails?.empName
    },
    {
      header: 'Leave Type',
      value: leaveDetails?.leaveType
    },
    {
      header: 'Reason',
      value: leaveDetails?.reason
    },
    {
      header: 'Start Date',
      value: leaveDetails?.startDate?.slice(0, 10)
    },
    {
      header: 'End Date',
      value: leaveDetails?.endDate?.slice(0, 10)
    },
    {   //if 'Yes' add () to date & if 'N0' then don't add () as we do not have date
      header: 'Is Half Day Leave',
      value: leaveDetails?.isHalfDay === 'Yes' ?
        `${leaveDetails?.isHalfDay} (${leaveDetails?.halfDayDate?.slice(0, 10)})` :
        `${leaveDetails?.isHalfDay}`
    },
    {
      header: 'Duration',
      value: `${leaveDetails?.duration} Days`
    },
    {
      header: 'Reject Reason',
      value: leaveDetails?.rejectReason
    },

    {
      header: 'Casual Leaves (Left)',
      value: leavesRemain?.casualLeaves
    },
    {
      header: 'Sick Leaves (Left)',
      value: leavesRemain?.sickLeaves
    },
    {
      header: 'Paid Leaves (Left)',
      value: leavesRemain?.paidLeaves
    }
  ];

  return (
    <>
      <Navbar />
      <EmpLeavesReqsTableDiv>
        <FormHeading> Leaves Management </FormHeading>
        <Paper className={classes.root}
          style={{ boxShadow: "0.5px 0.5px  10px rgb(65 64 66)" }} >
          <TableContainer className={`${classes.container} ${classes.myDialog}`}
            style={{ maxHeight: '50vh' }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {LeavesRecordHeaders.map((header) => (
                    <TableCell align="center"
                      style={{ backgroundColor: "#D3D3D3", fontSize: "1rem" }}>
                      <b>{header}</b>
                    </TableCell>
                  )
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {totalLeaves?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((obj, index) => (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index} >
                      <TableCell align="center" style={{ fontWeight: "bold" }}>
                        {index + 1}
                      </TableCell>

                      <TableCell align="center">
                        {obj.empID}
                      </TableCell>

                      <TableCell align="center">
                        {obj.empName}
                      </TableCell>

                      <TableCell align="center">
                        {obj.startDate.slice(0, 10)}
                      </TableCell>

                      <TableCell align="center">
                        {obj.endDate.slice(0, 10)}
                      </TableCell>

                      <TableCell align="center">
                        {obj.status === 'Pending' && <> Pending </>}
                        {obj.status === 'Approved' &&
                          <CheckBoxRoundedIcon style={{ color: "#15ca05" }} />
                        }
                        {obj.status === 'Rejected' &&
                          <DisabledByDefaultIcon style={{ color: "#df2525", }} />
                        }
                      </TableCell>

                      <TableCell align="center">

                        <Button onClick={() => viewLeaveDetails(obj.id)}>
                          <DescriptionIcon style={{ color: "#2550df" }} />
                        </Button>
                        {(obj.status === 'Pending') &&
                          <>
                            <Button onClick={() => approveLeaveRequest(obj.id)}>
                              <CheckBoxRoundedIcon style={{ color: "#15ca05" }} />
                            </Button>

                            <Button onClick={() => showDialogBox(obj.id)} >
                              <DisabledByDefaultIcon style={{ color: "#df2525" }} />
                            </Button>
                          </>
                        }
                      </TableCell>
                    </TableRow>
                  )
                  )}
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
      </EmpLeavesReqsTableDiv>

      {modalval && (
        <ViewDetailsDiv className="position-absolute top-50 start-50 translate-middle">
          <LeaveDetailsModalDiv>
            <TableContainer component={Paper} className={classes.myDialog}>
              <Table stickyHeader >
                <TableHead>
                  <TableRow>
                    <TableCell align="center" colSpan={2}>
                      <DivCloseButtonDiv>
                        <CloseButton onClick={showModal} />
                      </DivCloseButtonDiv>
                      <LeaveDetailsHeadingDiv>
                        Leave Details
                      </LeaveDetailsHeadingDiv>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {LeavesDetailsHeaders.map((obj) => (
                    <TableRow>
                      <TableCell align="center" style={{ fontWeight: 'bolder' }}>
                        {obj.header}
                      </TableCell>
                      <TableCell align="center">{obj.value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </LeaveDetailsModalDiv>
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
            label="Write Reason Here"
            type="text"
            fullWidth
            variant="standard"
            name="reason"
            onChange={(e) => setRejectReason(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={postRejectReason}> Reject </Button>
        </DialogActions>
      </Dialog>
    </ >
  );
}

export default LeaveManageAdmin