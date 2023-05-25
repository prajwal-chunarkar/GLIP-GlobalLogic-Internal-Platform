import React from "react";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import DateFnsUtils from "@date-io/date-fns";
import axios from "axios";
import CloseButton from "react-bootstrap/CloseButton";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from "@material-ui/pickers";
import Navbar from '../../../Navbar/navbar'
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {
    ParentPayslipEmpDiv,
    HeadingPayslipEmpDiv,
    ComponentsParentPayslipEmpDiv,
    ComponentPayslipEmpDiv1,
    ComponentPayslipEmpDiv2,
    PayslipHeadingLettersSpan,
    Component1HeadingDiv,
    Component2HeadingDiv,
    Component1BodyDiv,
    PayslipEmpDownloadButton,
    PayslipEmpPreviewButton,
    InfoP,
    ComponentsButton,
    Component2BodyDiv,
    Component2BodyChild1Div,
    Component2BodyChild2Div,
    PayslipEmpSubmitButton,
    CurrentYearDiv,
    CurrentYearLable,
    NotAvailableErrorDiv,
    ShowMonthYearDiv,
    PdfParentDiv,
    DivCloseButtonDiv,
    ViewDetailsSpan,
    TransportDetailsModalDiv,
    ViewTransportDetailsHeadingDiv,
} from "./payslip-emp.styled";


const PayslipsEmp = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [yearCheck, setyearCheck] = useState(false);
    const [checkedVal, setcheckedVal] = useState(true);
    const [payslips, setpayslips] = useState([]);
    const [thisMonthPayslip, setthisMonthPayslip] = useState();
    const [previousMonthPayslip, setpreviousMonthPayslip] = useState();
    const [storeSplitDate, setstoreSplitDate] = useState([]);
    const [userDetails, setUserDetails] = useState({});
    const [empID, setempID] = useState();
    const [previousFlag, setpreviousFlag] = useState(false);
    const [pdfVal, setpdfVal] = useState(false);
    const [pdfValCondition, setpdfValCondition] = useState(true);
    const [downloadVal, setdownloadVal] = useState(false)
    var { id } = useParams();
    //--------------- getting user Details-----------
    useEffect(() => {
        FetchUserData();
    }, []);

    const FetchUserData = () => {
        axios.get(`http://localhost:3003/users/${id}`).then((res) => {
            setUserDetails(res.data);
            setempID(res.data.empID);
            axios.get("http://localhost:3003/payslips").then((resp) => {
                setpayslips(resp.data);
                getCurrentPayslips(
                    res.data.empID,
                    resp.data,
                    selectedDate.toISOString().split(/[-,"]+/)
                );
            });
        });
    };
    //----------------Current Payslips (Render on page load)---------------------
    const getCurrentPayslips = (empID, pays, currDate) => {
        pays.forEach((obj) => {
            if (
                obj.empID == empID &&
                obj.month == currDate[1] &&
                obj.year == currDate[0]
            ) {
                setthisMonthPayslip(obj);
            }
        });
    };
    //-----------------Previous Payslips after "getPreviousPayslip" (run on Submit Button Click)--------------
    const getPreviousPayslips = (currDate) => {
        var count = 0;
        payslips.forEach((obj) => {
            if (
                obj.empID == empID &&
                obj.month == currDate[1] &&
                obj.year == currDate[0]
            ) {
                setpreviousMonthPayslip(obj);
                count = count + 1;
            }
        });
        if (count == 0) {
            setpreviousFlag(true);
        } else {
            setpreviousFlag(false);
        }
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    //----------------view year component----------------
    const showYearInput = (e) => {
        yearCheck ? setyearCheck(false) : setyearCheck(true);
        setcheckedVal(e.target.checked);
    };
    //---------------render on submit button click---------------
    const getPreviousPayslip = () => {
        axios.get("http://localhost:3003/payslips").then((resp) => {
            setpayslips(resp.data);
            setstoreSplitDate(selectedDate.toISOString().split(/[-,"]+/));
            getPreviousPayslips(selectedDate.toISOString().split(/[-,"]+/));
        });
        // });
    };

    //----------------------show pdf on preview click----------------------------
    const showPdf = async () => {
        setpdfValCondition(true)
        setpdfVal(!pdfVal);
        setdownloadVal(!downloadVal);
    };

    //----------------------show pdf on preview click second div----------------------------
    const showPdfInner = async () => {
        setpdfValCondition(false)
        setpdfVal(!pdfVal);
        setdownloadVal(!downloadVal);
    };

    
    //------------------------download PDF on click-----------------------------------
    const printDocument =  () => {
        const input = document.getElementById("divToPrint");
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF();
            pdf.addImage(imgData, "JPEG", 0, 0);
            pdf.save("payslip.pdf");
        });
    };

    //----------------------------Heading Object------------------------------------
    const headingTransportAdmin = ["P", "a", "y", "s", "l", "i", "p", "s", " ", "E", "m", "p", "l", "o", "y", "e", "e",
    ];

    const pdfTable = [
        { Header: "Employee ID", Value: pdfValCondition ? userDetails.empID : previousMonthPayslip.empID },
        { Header: "Name", Value: pdfValCondition ? thisMonthPayslip?.name : previousMonthPayslip.name},
        { Header: "Designation", Value: pdfValCondition ? thisMonthPayslip?.designation : previousMonthPayslip.designation},
        { Header: "Month", Value: pdfValCondition ? thisMonthPayslip?.month : previousMonthPayslip.month },
        { Header: "Year", Value: pdfValCondition ? thisMonthPayslip?.year : previousMonthPayslip.year },
        { Header: "Salary", Value: pdfValCondition ? thisMonthPayslip?.salary :previousMonthPayslip.salary },
        { Header: "Deduction", Value: pdfValCondition ? thisMonthPayslip?.deduction :previousMonthPayslip.deduction },
        {Header: "Total", Value: thisMonthPayslip?.salary - thisMonthPayslip?.deduction,},
    ];

    return (
        <>
        <Navbar/>
            <ParentPayslipEmpDiv>
                {/* ------------------------------------heading---------------------------- */}
                <HeadingPayslipEmpDiv>
                    {headingTransportAdmin.map((letter) => (
                        <PayslipHeadingLettersSpan>
                            {letter}
                        </PayslipHeadingLettersSpan>
                    ))}
                </HeadingPayslipEmpDiv>

                {/* --------------------------------Left Component-------------------------- */}
                <ComponentsParentPayslipEmpDiv>
                    <ComponentPayslipEmpDiv1>
                        <Component1HeadingDiv>This Month</Component1HeadingDiv>
                        {/* -------------------------------Left component fields------------ */}
                        <Component1BodyDiv>
                            <InfoP>
                                Salary: {"  " + thisMonthPayslip?.salary}
                            </InfoP>
                            <InfoP>
                                Deduction:{"  " + thisMonthPayslip?.deduction}
                            </InfoP>
                            <InfoP>
                                Total:
                                {"  " +
                                    (thisMonthPayslip?.salary -
                                        thisMonthPayslip?.deduction)}
                            </InfoP>
                            <ComponentsButton>
                                {/* -----------------------------left component buttons---------- */}
                                <PayslipEmpPreviewButton onClick={showPdf}>
                                    Preview
                                </PayslipEmpPreviewButton>
                            </ComponentsButton>
                        </Component1BodyDiv>
                    </ComponentPayslipEmpDiv1>
                    {/* ---------------------------------Right Component---------------------- */}

                    <ComponentPayslipEmpDiv2>
                        <Component2HeadingDiv>
                            Previous Payslips
                        </Component2HeadingDiv>

                        <Component2BodyDiv>
                            {/* -----------------------------------child1------------------- */}
                            <Component2BodyChild1Div>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        sx={{
                                            svg: { color: "#F37037" },
                                        }}
                                        disableToolbar
                                        format="MM"
                                        views={["month"]}
                                        margin="normal"
                                        id="date-picker-inline"
                                        label="Select Month"
                                        value={selectedDate}
                                        onChange={handleDateChange}
                                        KeyboardButtonProps={{
                                            "aria-label": "change date",
                                        }}
                                    />

                                    <br />

                                    <CurrentYearDiv>
                                        <input
                                            id="current-year"
                                            type="checkbox"
                                            onChange={showYearInput}
                                            checked={checkedVal}
                                        />
                                        <CurrentYearLable>
                                            Current Year
                                        </CurrentYearLable>
                                    </CurrentYearDiv>
                                    <br />

                                    {yearCheck && (
                                        <KeyboardDatePicker
                                            sx={{
                                                svg: { color: "#F37037" },
                                            }}
                                            disableToolbar
                                            format="yyyy"
                                            views={["year"]}
                                            margin="normal"
                                            label="Select Year"
                                            value={selectedDate}
                                            onChange={handleDateChange}
                                            KeyboardButtonProps={{
                                                "aria-label": "change date",
                                            }}
                                        />
                                    )}
                                </MuiPickersUtilsProvider>
                                <PayslipEmpSubmitButton
                                    onClick={getPreviousPayslip}>
                                    Submit
                                </PayslipEmpSubmitButton>
                            </Component2BodyChild1Div>

                            {/*---------------------------------child 2--------------------------------------*/}
                            <Component2BodyChild2Div>
                                <Component1BodyDiv>
                                    <ShowMonthYearDiv>
                                        {[previousMonthPayslip?.month]}
                                        {previousMonthPayslip && "/"}
                                        {previousMonthPayslip?.year}
                                    </ShowMonthYearDiv>
                                    <InfoP>
                                        Salary:
                                        {previousMonthPayslip &&
                                            previousMonthPayslip?.salary}
                                    </InfoP>
                                    <InfoP>
                                        Deductions:
                                        {previousMonthPayslip &&
                                            previousMonthPayslip?.deduction}
                                    </InfoP>
                                    <InfoP>
                                        Total:
                                        {previousMonthPayslip &&
                                            previousMonthPayslip?.salary -
                                                previousMonthPayslip?.deduction}
                                    </InfoP>
                                    <ComponentsButton>

                                        <PayslipEmpDownloadButton onClick={showPdfInner}>
                                            Preview
                                        </PayslipEmpDownloadButton>
                                    </ComponentsButton>
                                </Component1BodyDiv>
                            </Component2BodyChild2Div>
                        </Component2BodyDiv>
                    </ComponentPayslipEmpDiv2>
                </ComponentsParentPayslipEmpDiv>
                <NotAvailableErrorDiv>
                    {previousFlag && "Not available"}
                </NotAvailableErrorDiv>

                {pdfVal && (
                    <ViewDetailsSpan  className="position-absolute top-50 start-50 translate-middle">
                        <TransportDetailsModalDiv>
                            <TableContainer component={Paper}>
                                <Table
                                    sx={{ minWidth: 650 }}
                                    stickyHeader
                                    aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell
                                                align="center"
                                                colSpan={3}>
                                                <DivCloseButtonDiv>
                                                    <CloseButton
                                                        onClick={showPdf}
                                                    />
                                                </DivCloseButtonDiv>
                                                <ViewTransportDetailsHeadingDiv>
                                                    Payslip Details
                                                </ViewTransportDetailsHeadingDiv>
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {pdfTable.map((e) => (
                                            <TableRow>
                                                
                                                <TableCell>
                                                    <b>{e.Header}</b>
                                                </TableCell>
                                                <TableCell>{e.Value}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                    <TableRow>
                                    <TableCell
                                                align="center"
                                                colSpan={3}>

                                    <PayslipEmpDownloadButton onClick={printDocument}>
                                            Download
                                        </PayslipEmpDownloadButton>
                                        </TableCell>
                                    </TableRow>

                                </Table>
                            </TableContainer>
                        </TransportDetailsModalDiv>
                    </ViewDetailsSpan>
                )}
            </ParentPayslipEmpDiv>
            <div id="divToPrint">{downloadVal && (
                        <TransportDetailsModalDiv>
                            <TableContainer component={Paper}>
                                <Table
                                    sx={{ minWidth: 650 }}
                                    stickyHeader
                                    aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell
                                                align="center"
                                                colSpan={3}>
                                                <DivCloseButtonDiv>
                                                    <CloseButton
                                                        onClick={showPdf}
                                                    />
                                                </DivCloseButtonDiv>
                                                <ViewTransportDetailsHeadingDiv>
                                                    Payslip Details
                                                </ViewTransportDetailsHeadingDiv>
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {pdfTable.map((e) => (
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
                    )}</div>
        </>
    );
};

export default PayslipsEmp;