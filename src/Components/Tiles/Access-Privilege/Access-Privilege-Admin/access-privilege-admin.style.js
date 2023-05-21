import styled from 'styled-components'

export const TableHeading = styled.h1`
    margin: 1rem 0 -2rem 0;
    text-align: center;
    font-size: 2.5rem;
    font-weight: bolder;
    color: #F37037;
`; 

export const TransportAdminTableDiv = styled.div`
    width: 80%;
    margin: 4rem auto 0 auto; 
`


export const CloseButtonDiv = styled.div`
    box-sizing: border-box;
    margin-left: 94%;
    font-size: 1rem;
    cursor: pointer;
`;

export const TransportDetailsModalDiv = styled.div`
    position: fixed;
    top: 45%;
    left: 50%;      
    width: 35vw;
    transform: translate(-50%, -50%);
    z-index: 1000;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.5);
    border: none;

  &::after{
    transition: all .5s ease-in-out;
  }
    @media (max-width: 767px) {
        width: 40rem;
       
    }
`;

export const TransportDetailsModalTextDiv = styled.div`
    font-family: Calibri, Arial, sans-serif;
    word-wrap: break-word;
    display: flex;
    text-align: start;
`;

export const ViewTransportDetailsHeadingDiv = styled.div`
    font-family: Calibri, Arial, sans-serif;
    font-weight: bold;
    font-size: 2rem;
    text-align: center;
`;

export const SubmitButton = styled.button`
position: sticky;
left: 2rem;
top: 5.5rem;
border: none;
    background-color: #F37037;
    /* border: 1px solid #F37037; */
    border-radius: 2rem;
    height: 2rem;
    min-width: 5rem;
    font-size: 1rem;
    width: 1rem;
    color: #fff;
    &:hover{
        background-color: rgba(243, 112, 55, 0.5);
        color: #fff;
    /* box-shadow: rgb(53, 3, 99); */
    }
`;
export const ApprovedRequestButton = styled.button`
/* position: sticky; */
/* left: 2rem; */
/* top: 5.5rem; */

    border: none;
    background-color: #F37037;  
    /* border: 1px solid #F37037; */
    border-radius: 2rem;
    height: 2rem;
    max-width: 10rem;
    font-size: 1rem;
    width: 10rem;
    color: #fff;
    overflow: hidden;
    white-space: nowrap;
    &:hover{
        background-color: rgba(243, 112, 55, 0.5);
        color: #fff;
    /* box-shadow: rgb(53, 3, 99); */
    }
`;

export const TransportHeadingDiv = styled.div`
margin: 0.7rem 0 3rem 0;
text-align: center;
max-height: 5vh;
 `;

export const TransportHeadingLettersSpan = styled.span`
color: #F37037;
font-size: 3.3rem;
font-size: 3rem;
font-weight: bolder;
cursor: pointer;
 &:hover {
color: #EE9F41;
}
`;

export const ViewDetailsDiv = styled.span`
width: 100%;
height: 100%;
z-index: 999;
background-color: rgba(0, 0, 0, 0.5);
pointer-events: auto;
`;