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
    margin: 2rem auto 0 auto; 
`

export const DivCloseButtonDiv = styled.div`
    box-sizing: border-box;
    margin-left: 94%;
    font-size: 1rem;
    cursor: pointer;
`;

export const TransportDetailsModalDiv = styled.div`
    display: flex;
    justify-content: center;
    width: 50vw;
    max-height: 70vh;
    margin: auto;
    margin-top: 15vh;
    background-color: 'background.paper';
    border: none;
    padding: 4rem;
    z-index: 1000;
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

export const TopButtonDiv = styled.div`
    margin-top: 5vh;
`

export const TopButton = styled.button`
    border: none;
    background-color: #F37037;
    border-radius: 2rem;
    height: 2rem;
    min-width: 5vw;
    font-size: 1rem;
    color: #fff;
    overflow: hidden;
    white-space: nowrap;
    &:hover{
        background-color: rgba(243, 112, 55, 0.5);
        box-shadow: rgb(53, 3, 99);
    }
`;

export const ViewDetailsSpan = styled.span`
width: 100%;
height: 100%;
z-index: 999;
background-color: rgba(0, 0, 0, 0.5);
pointer-events: auto;
`;