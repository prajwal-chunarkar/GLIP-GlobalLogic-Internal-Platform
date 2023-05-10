import { Icon } from "@iconify/react";
import { makeStyles } from "@material-ui/styles";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { EmployeeListParent, EmployeeListTable } from "./employee-list.styles";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import {
  EmployeeDetailsModal,
  EmployeeListHeading,
  EmployeeListHeadingLetters,
  ViewEmployeeDetailsHeading,
  DivCloseButton,
  EmployeeDetailsModalParent,
  TableContainer2,
} from "./employee-list.styles";
import Navbar from '../../Navbar/navbar'

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
}));

function EmpListAdmin() {
  const classes = useStyles();
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  //------------Filter Component--------------
  let [employees, setEmployees] = useState([]);
  const [nameFilter, setNameFilter] = useState("");
  const [designationFilter, setDesignationFilter] = useState("");
  //------------FilterDiv ---------------------
  const [state, setState] = useState({
    top: false,
  });
  //------------EmployeeDetails----------------------
  const [employeeDetails, setEmployeeDetails] = useState({});
  //----------------view details modal----------------
  const [modalval, setmodalval] = useState(false);
  const showModal = () => {
    modalval ? setmodalval(false) : setmodalval(true);
    // setmodalval(false);
    setError(null);
    setSelectedOption(null);
  };
  //---------------New user details-------------
  const [selectOption, setSelectedOption] = useState(null);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  const SelectedOption = (e,Value) => {
    setSelectedOption(Value);
    setOpen(false);
  };

  useEffect(() => {
    //Filter Component
    fetchData();
  }, []);
  const fetchData = async () => {
    const result = await axios.get("http://localhost:3003/users");
    setRows(result.data);
    setEmployees(result.data);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  // ----------------------Filter Component states-----------------------
  function handleNameFilterChange(event) {
    setNameFilter(event.target.value);
  }

  function handleDesignationFilterChange(event) {
    setDesignationFilter(event.target.value);
  }

  const filteredEmployees = employees.filter((employee) => {
    var name = employee.fname + employee.lname;
    // Filter the employee list based on the current filter values
    const nameMatch = name.toLowerCase().includes(nameFilter.toLowerCase());
    const designationMatch =
      designationFilter === "" || employee.designation === designationFilter;
    return nameMatch && designationMatch;
  });

  const uniqueDesignations = [
    // Get a list of unique designations for the drop-down list
    ...new Set(employees?.map((employee) => employee.designation)),
  ];

  //-------------------DeleteUser-----------------
  function deleteUser(id) {
    axios({
      method: "delete",
      url: `http://localhost:3003/users/${id}`,
    }).then(
      (response) => {
        fetchData();
      },
      (error) => {
        console.log("the error is", error);
      }
    );
  }

  //--------------------Individual data -----------
  function viewDetails(id) {
    axios({
      method: "get",
      url: `http://localhost:3003/users/${id}`,
    })
      .then(
        (response) => {
          setEmployeeDetails(response.data);
        },
        (error) => {
          console.log("the error is", error);
        }
      )
      .then(showModal());
  }

  //-----------------ChangeDesignation------------------

  function ChangeDesignation(id) {
    setmodalval(false);
    const updatedObj = {
      id: id,
      fname: employeeDetails.fname,
      mname: employeeDetails.mname,
      lname: employeeDetails.lname,
      email: employeeDetails.email,
      phone: employeeDetails.phone,
      workLocation: employeeDetails.workLocation,
      address: employeeDetails.address,
      gender: employeeDetails.gender,
      dob: employeeDetails.dob,
      designation: selectOption,              //new designation rest are old
      password: employeeDetails.password,          
      empID: employeeDetails.empID,
      user_type: employeeDetails.user_type
    };

    if (selectOption !== null) {
      axios({
        method: "put",
        url: `http://localhost:3003/users/${id}`,
        data: updatedObj,
      }).then(
        (response) => {
          fetchData();
          console.log("successfull edit");
          setSelectedOption(null);
          setError("");
        },
        (error) => {
          console.log("the error is", error);
        }
      );
    } else {
      setError(<Alert severity="error">
      <AlertTitle>Error</AlertTitle>
      Please Select Designation — <strong>check it out!</strong>
    </Alert>);
      setmodalval(true);
    }
  }
  //-----------------Filter Drawer-------------------
  const toggleDrawer = (anchor, open) => (event) => {
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "300px" : 300 }}
      role="presentation"
      style={{
        width: "100%",
        height: "4.5rem",
        float: "right",
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        backgroundColor: "rgba(230 231 232)",
      }}>
      <div
        style={{
          width: "30%",
          float: "right",
          display: "flex",
          justifyContent: "space-evenly",
        }}>
        <h3>
          <span style={{ fontWeight: "bold", color: "rgb(65 64 66)" }}>
            Filter Employees
          </span>
        </h3>
      </div>
      <div>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select">Designation</InputLabel>
          <Select
            labelId="demo-simple-select"
            id="demo-simple-select"
            value={designationFilter}
            onChange={handleDesignationFilterChange}>
            <MenuItem value="" placeholder="All">
              All
            </MenuItem>
            {uniqueDesignations?.map((designation, index) => (
              <MenuItem key={index} value={designation}>
                {designation}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div>
        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
          <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
          <TextField
            id="input-with-sx"
            label="Name"
            variant="standard"
            value={nameFilter}
            onChange={handleNameFilterChange}
          />
        </Box>
      </div>
      <Button variant="elevated" onClick={toggleDrawer("top", false)}>
        <CloseRoundedIcon />
      </Button>
    </Box>
  );

  function ClearFilter() {
    setDesignationFilter("");
    setNameFilter("");
  }

  const headingTransportAdmin = ['E', 'm', 'p', 'l', 'o', 'y', 'e', 'e', 's', ' ', 'L', 'i', 's', 't'];

  return (
    <>
      <Navbar />
      <EmployeeListParent>
      <EmployeeListHeading>
                    {headingTransportAdmin.map((letter) => (
                        <EmployeeListHeadingLetters>
                            {letter}
                        </EmployeeListHeadingLetters>
                    ))}
                </EmployeeListHeading>
        <EmployeeListTable>
          <div style={{ display: "flex" }}>
            <div style={{ float: "left", width: "50%" }}>
              <span
                style={{
                  padding: "0.5rem",
                  fontSize: "1rem",
                  float: "left",
                  fontWeight: "bold",
                }}>
               TOTAL : {filteredEmployees.length} 
                {/* <IconButton>
                  <ExpandCircleDownIcon />
                </IconButton> */}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                width: "50%",
                justifyContent: "right",
              }}>
              <IconButton variant="oulined" onClick={toggleDrawer("top", true)}>
                <Icon
                  icon="mdi:filter"
                  width="22"
                  height="23"
                  color=" rgba(0, 0, 0, 0.54)"
                />
              </IconButton>
              <Drawer
                anchor={"top"}
                open={state["top"]}
                onClose={toggleDrawer("top", false)}>
                {list("top")}
              </Drawer>
              <IconButton type="button" onClick={ClearFilter}>
                <Icon
                  icon="mdi:filter-remove"
                  color=" rgba(0, 0, 0,0.54)"
                  width="21"
                  height="23"
                />
              </IconButton>
            </div>
          </div>
          <Paper
            className={classes.root}
            style={{ boxShadow: "0.5px 0.5px  10px rgb(65 64 66)" }}>
            <TableContainer className={classes.container} style={{ maxHeight: '50vh'}}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell
                      align="left"
                      style={{
                        backgroundColor: "#D3D3D3",
                        fontSize: "1rem",
                        zIndex: "0",
                      }}>
                      <b>S No.</b>
                    </TableCell>
                    <TableCell
                      align="left"
                      style={{
                        backgroundColor: "#D3D3D3",
                        fontSize: "1rem",
                        zIndex: "0",
                      }}>
                      <b>ID</b>
                    </TableCell>
                    <TableCell
                      align="left"
                      style={{
                        backgroundColor: "#D3D3D3",
                        fontSize: "1rem",
                        zIndex: "0",
                      }}>
                      <b>Name</b>
                    </TableCell>
                    <TableCell
                      align="left"
                      style={{
                        backgroundColor: "#D3D3D3",
                        fontSize: "1rem",
                        zIndex: "0",
                      }}>
                      <b>Designation</b>
                    </TableCell>
                    <TableCell
                      align="left"
                      style={{
                        backgroundColor: "#D3D3D3",
                        fontSize: "1rem",
                        zIndex: "0",
                      }}>
                      <b>Email</b>
                    </TableCell>
                    <TableCell
                      align="left"
                      style={{
                        backgroundColor: "#D3D3D3",
                        fontSize: "1rem",
                        paddingLeft: "3rem",
                        zIndex: "5",
                      }}>
                      <b>Action</b>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredEmployees
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    ?.map((employee, index) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={index}>
                          <TableCell
                            align="left"
                            style={{ fontWeight: "bold", fontSize: "1rem" }}>
                            {index + 1}
                          </TableCell>
                          <TableCell align="left">{employee.id}</TableCell>
                          <TableCell align="left">
                            {employee.fname} {employee.lname}
                          </TableCell>
                          <TableCell align="left">
                            {employee.designation}
                          </TableCell>
                          <TableCell align="left">{employee.email}</TableCell>
                          <TableCell align="left">
                            <Button onClick={() => viewDetails(employee.id)}>
                              <EditRoundedIcon style={{ color: "#3b0d92" }} />
                            </Button>
                            <Button onClick={() => deleteUser(employee.id)}>
                              <DeleteRoundedIcon style={{ color: "#df2525" }} />
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
        </EmployeeListTable>
      </EmployeeListParent>

      {/* show details */}
      {modalval && (
        <EmployeeDetailsModalParent>
          <EmployeeDetailsModal>
            <TableContainer component={Paper}>
              <DivCloseButton>
                <CloseRoundedIcon onClick={showModal} />
              </DivCloseButton>
              <ViewEmployeeDetailsHeading>
                <AccountCircleRoundedIcon
                  style={{ width: "100px", height: "100px" }}
                />
              </ViewEmployeeDetailsHeading>
              <TableContainer2 className="table-container">
                <Table
                  sx={{ minWidth: "400px", width: "100%" }}
                  aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <b>Employee ID</b>
                      </TableCell>
                      <TableCell>{employeeDetails?.id}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <b>Employee Name</b>
                      </TableCell>
                      <TableCell>
                        {employeeDetails?.fname} {employeeDetails?.lname}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <b>Designation</b>
                      </TableCell>
                      <TableCell>
                        <Autocomplete
                          style={{ width: "13rem" }}
                          required
                          open={open}
                          onOpen={() => {
                            setOpen(true);
                          }}
                          onClose={() => {
                            setOpen(false);
                          }}
                          value={selectOption}
                          disablePortal
                          id="combo-box-demo"
                          options={uniqueDesignations}
                          onChange={SelectedOption}
                          sx={{ width: 300 }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label={employeeDetails?.designation}
                            />
                          )}
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <b>Email</b>
                      </TableCell>
                      <TableCell>{employeeDetails?.email}</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody></TableBody>
                </Table>
              </TableContainer2>
               {error}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                <Button
                  type="submit"
                  variant="outlined"
                  component="label"
                  onClick={() => ChangeDesignation(employeeDetails.id)}
                  style={{
                    marginTop: "1rem",
                    marginLeft: "1rem",
                    marginBottom: "0.5rem",
                    width: "5rem",
                  }}>
                  Submit
                </Button>
              </div>
            </TableContainer>
          </EmployeeDetailsModal>
        </EmployeeDetailsModalParent>
      )}
    </>
  );
}

export default EmpListAdmin;
