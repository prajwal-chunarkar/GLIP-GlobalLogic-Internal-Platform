import styled from "styled-components";
import { Keyframes } from "styled-components";

export const NavContainer = styled.div`
    display : grid;
    justify-content:space-evenly;
`;

export const NavbarStyle = styled.nav`
    background-color: #414042;
`;

export const GlipIcon = styled.h3`
    color: white;
    &:hover {
        color:#f37038;
        cursor:pointer;
    }
`;
export const IconButton = styled.button`
          border-radius: 50%;
          background-color: #f37038;
          margin-right:5px;
          color:white;
          cursor: pointer;
          padding: 7px;
`;
export const SettingDiv = styled.div`
    position: absolute;
    top: 5rem;
    right: 5rem;
    width: 200wh;
    inline-size:250px;
    overflow-wrap: break-word;
    height: 50vh;
    background-color: rgba(245 87 20);
    border-radius: 5px;
    padding: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0 );
  border: 0px;
  background-color:  rgba(245, 87, 20, 0.8);
  padding: 2.5rem 0rem;
  font-size: 2rem;
  text-align: center;
  border-radius: 1rem;
  animation: showMe 0.3s forwards;

  @keyframes showMe{
    0%{
        opacity: 0;
    }
    100%{
        opacity: 1;
    }
}

`;
export const NavLinkDiv = styled.div`
    display:grid;
    justify-content:space-between;
   
`;

export const Text = styled.h5`
    shape-outside:circle;

`;
export const Button = styled.button`
    background-color: rgba(109, 110, 113)
`
