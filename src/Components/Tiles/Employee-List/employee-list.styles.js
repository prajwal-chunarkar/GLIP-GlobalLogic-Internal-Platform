import styled from 'styled-components'

export const EmployeeListTable = styled.div`
    width: 80%;
    /* margin-left: auto;  */
    margin: 3rem auto 0 auto;
    /* height: 100vh; */
    /* margin-top: 7%; */
`
export const EmployeeListParent = styled.div`
   /* display:grid;
   align-items:right;
   background-color:rgba(230 231 235);
   min-height:100vh; */
`

export const EmployeeListHeading = styled.div`
margin: 0.7rem 0 3rem 0;
text-align: center;
max-height: 5vh;
 `;

export const EmployeeListHeadingLetters = styled.span`
color: #F37037;
font-size: 3.3rem;
font-size: 3rem;
font-weight: bolder;
cursor: pointer;
 &:hover {
color: #EE9F41;
}
`;

export const FilterIconDiv = styled.div`
    max-width:80%;
`
export const TableLengthIconDiv   = styled.div`
    width: 60%;
    margin:auto;
`
export const DivCloseButton = styled.div`
    box-sizing: border-box;
    margin-left: 94%;
    margin-top: 1rem;
    font-size: 1rem;
    cursor: pointer;
`;
export const EmployeeDetailsModalParent = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.5);
  pointer-events: auto;

`

export const EmployeeDetailsModal = styled.div`
position: fixed;
  top: 50%;
  left: 50%;
  max-width:25rem;
  transform: translate(-50%, -50%);
  z-index: 1000;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.5);
  
  border: '2px solid #000';
  

  &::after{
    transition: all .5s ease-in-out;
  }
  
  &::-webkit-scrollbar {
    background: transparent;
    width: 10px;
    };

    &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.4);
    border-radius: 5px;
    }

    @media (max-width: 767px) {
        width: 40rem;
       
    }
`;

export const EmployeeDetailsModalText = styled.div`
    font-family: Calibri, Arial, sans-serif;
    word-wrap: break-word;
    display: flex;
    text-align: start;
    
  
`;
export const ViewEmployeeDetailsHeading = styled.div`
    text-align: center;
    
  
`;

export const TableContainer2 = styled.div`
   
`