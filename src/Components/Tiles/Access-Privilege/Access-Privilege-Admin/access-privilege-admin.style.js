import styled from 'styled-components'

export const TableHeading = styled.h1`
    margin: 1rem 0 -2rem 0;
    text-align: center;
    font-size: 2.5rem;
    font-weight: bolder;
    color: #F37037;
`; 

export const AccessAdminTableDiv = styled.div`
    width: 80%;
    margin: 4rem auto 0 auto; 
`

export const CloseButtonDiv = styled.div`
    box-sizing: border-box;
    margin-left: 94%;
    font-size: 1rem;
    cursor: pointer;
`;

export const AccessDetailsModalDiv = styled.div`
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

export const ViewAccessDetailsHeadingDiv = styled.div`
    font-family: Calibri, Arial, sans-serif;
    font-weight: bold;
    font-size: 2rem;
    text-align: center;
`;

export const ViewDetailsDiv = styled.span`
    width: 100%;
    height: 100%;
    z-index: 999;
    background-color: rgba(0, 0, 0, 0.5);
    pointer-events: auto;
`;