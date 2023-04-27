import styled from "styled-components";

export const DivMainNavbarHome = styled.div`
    width: 100%;
    display: relative;
    /* border: 1px solid #414042; */
    background:rgb(188, 190, 192);
    /* box-shadow: 0 10 10px #414042; */
    box-shadow: 0px 3px 5px #414042;
`

export const DivMainHome = styled.div`
    width: 99%;
    background:rgba(188, 190, 192, 0.2);

`
export const DivMainHomeCarousel = styled.div`
    /* display: flex;
    justify-content: center;
    align-items: center; */
    /* width: 100%; */
    /* height: 50vh; */
    
    padding-top: 1rem;
    padding-bottom: 1rem;
    /* padding-right: 1rem; */
    /* padding-left: 1rem; */
    @media (max-width: 767px) {
        display: none;
    }
    
`
export const HomeNavLogo = styled.div`
display: flex;
align-items: center;

`
export const ImgLogo = styled.img`
border-radius: 30%;
margin-left: 25%;
box-shadow: 10px 10px 5px #808080;
-moz-box-shadow: 10px 10px 5px #808080;
-webkit-box-shadow: 10px 10px 5px #808080;
-khtml-box-shadow: 10px 10px 5px #808080;
`

export const ImgCarousel = styled.img`
height: 85vh;
width: 100%;
object-fit: cover;
/* box-shadow: 0 0 10px #414042; */

`
export const DivHomeNavbarButtons = styled.div`
/* margin-left: 75%;
display: flex;
justify-content: center;
align-items: center; */
`
export const DivBrandName = styled.div`
/* margin-left: 5%; */
display: flex;
justify-content: center;
align-items: center;
font-family: Calibri, Arial, sans-serif;
color: (243, 112, 55);
font-size: 3rem;
color: #F37037;
`
export const DivHomeNavbarLogin = styled.div`
display: flex;
justify-content: center;
align-items: center;
`
export const DivHomeNavbarRegister = styled.div`
display: flex;
justify-content: center;
align-items: center;

`
export const DivBodyHome = styled.p`
font-family: Calibri, Arial, sans-serif;
padding-left: 8%;
padding-top: 10%;
padding-bottom: 10%;
padding-right: 8%;
/* width: 98% */
font-weight: bold;
`
export const PHomeTaglineGL1 = styled.span`
font-size: 3.3rem;
font-size: 3rem;

`
export const PHomeTaglineGL2 = styled.span`
color: #EE9F41;
font-size: 3.3rem;
font-size: 3rem;

`
export const PHomeTaglineGL2Letters = styled.span`
 cursor: pointer;
  &:hover {
    color: #F37037;
    /* transform: translateY(4px); */
    /* transform: rotate(360deg); */
}

  

`

export const PHomeTagDescription = styled.p`
font-size: 1.2rem;

`
export const ButtonNavbarHome = styled.button`
text-decoration: none;
color: white;
    background-color: rgb(109, 110, 113);
    align-items: center;
    text-align: center;
    max-width: 6.5rem;
    border: none;
    border-radius: 10px;
    padding: 0.25rem 1rem 0.25rem 1rem;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
        rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
        rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
    cursor: pointer;
    &:hover {
        background: #f37038;
    }

`