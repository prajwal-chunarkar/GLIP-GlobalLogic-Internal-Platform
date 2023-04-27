import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useState,useEffect } from "react";
import { useRef } from "react";
import { NavContainer} from "./navbar.style";
import { GlipIcon } from "./navbar.style";
import { IconButton } from "./navbar.style";
import { SettingDiv,NavLinkDiv,Text } from "./navbar.style";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const windowRef = useRef();
  const nameInit = useSelector((state) => state.nameInit);


  const handleIconClick = (e) => {
    setIsOpen(!isOpen);
    console.log(isOpen);
  };

  const handleClickOutside = (event) => {
    if (windowRef.current && !windowRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

// console.log(isOpen)

  return (
    <>
    <div className= 'container'>
    <NavContainer>
      <nav
        class="navbar fixed-top navbar justify-content-between "
        style={{ backgroundColor: "rgba(65, 64, 66,0.8 )" }}>
        <Link to="/" class="navbar-brand " style={{ color: "white"}}>
          <img src="https://www.globallogic.com/wp-content/uploads/2021/07/Logo_GL-Hitachi_White-web.svg" class="custom-logo svg-logo-desktop" width="196" height="45" alt="GlobalLogic India" title="GlobalLogic-Logo-White | GlobalLogic"/>
        </Link>
        <div>
          <GlipIcon>Glip</GlipIcon>
        </div>
        <IconButton
        onClick={(e)=>handleIconClick(e)}>
           {nameInit}
           </IconButton>

        {isOpen && (
         <SettingDiv ref={windowRef} className="window">
            <div class="card" style={{ height: "100%" }}>
              <div class="card-body" style={{borderRadius:"50%"}}>
                <Text class="card-title">{nameInit}</Text>
                <p class="card-text" style={{fontSize:"80%"}}>
        
                  Empl Id:
                  
                </p>
               <NavLinkDiv>
                <NavLink to="#" className="btn" style={{marginTop:"50px",marginLeft:"2.2rem",backgroundColor:"rgb(109, 110, 113)",color:"white"}}>Manage Account</NavLink>
                </NavLinkDiv>
              </div>
            </div>
          </SettingDiv>
        )}
      </nav>
    </NavContainer>
    </div>
    
    </>
  );
};

export default Navbar;
