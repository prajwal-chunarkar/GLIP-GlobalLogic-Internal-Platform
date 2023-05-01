import React, { useState, useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux';
import GLlogo from '../../Utils/Images/GL-logo.jpg'
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';

import {
    NavContainer,
    NavButton,
    NavButtonDiv,
    NavLogo,
    NavHeadingDiv,
    NavHeading,
    //------------------//
    IconButton,
    SettingDiv,
    Text,
    NavLinkSpan
} from './navbar.style'

const Navbar = () => {
    const isloggedin = useSelector(state => state.isloggedin);

    const [isOpen, setIsOpen] = useState(false);
    const windowRef = useRef();
    const nameInit = useSelector((state) => state.nameInit);
    const empid = useSelector((state) => state.empid);
    const fullName = useSelector((state) => state.fullName);
    const empEmail = useSelector((state) => state.empEmail);

    const handleIconClick = (e) => {
        setIsOpen((prev)=> !prev);
        // console.log(isOpen);
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
    }, [isOpen]);

    const loggedOut = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    }

    return (
        <NavContainer>
            <NavHeadingDiv>
                <NavLink to="/" style={{ textDecoration: 'none', display: 'flex' }}>
                    <NavLogo src={GLlogo}></NavLogo>
                    <NavHeading>GLIP</NavHeading>
                </NavLink>
            </NavHeadingDiv>
            <NavButtonDiv>
                {isloggedin ?

                    // <NavButton style={{ backgroundColor: "red" }} onClick={loggedOut}>Logout</NavButton> 
                    <>
                        <IconButton
                            onClick={(e) => handleIconClick(e)}>
                            {nameInit}
                        </IconButton>

                        {isOpen && (
                            <SettingDiv ref={windowRef} className="window">
                                <div class="card">
                                    <div class="card-body" style={{ borderRadius: "50%", height: "80%" }}>
                                        <Text class="card-title" ><b>{fullName}</b></Text>
                                        <Text class="card-title" style={{ fontSize: "0.8rem" }}>{empEmail}</Text>
                                        <Text class="card-title" style={{ fontSize: "0.9rem" }}>Emp Id: {empid}</Text>
                                        <br />
                                        <NavLink to= {`/resetpassword/${empid}`} style={{ textDecoration: "none", color: "#000" }}>
                                            <NavLinkSpan>
                                                <SettingsRoundedIcon />
                                                <span className="span mx-2" style={{ fontSize: "0.95rem" }}>Manage Your Account</span>
                                            </NavLinkSpan>
                                        </NavLink>
                                        <hr />
                                        <p class="card-text" >
                                            {/* <CardContainer> */}
                                            <NavLink to="#" style={{ textDecoration: "none", color: "#000" }}>
                                                <NavLinkSpan>
                                                    <svg xmlns="http://www.w3.org/2000/svg" onClick={loggedOut} style={{ marginLeft: "45%" }} height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none" /><path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" /></svg>
                                                    {/* <span className="span mx-2" style={{fontSize:"1rem"}}>Sign Out</span> */}
                                                </NavLinkSpan>
                                            </NavLink>
                                            {/* </CardContainer> */}
                                        </p>

                                    </div>
                                </div>
                            </SettingDiv>
                        )}

                    </>
                    :
                    <>
                        <NavLink to="/login">
                            <NavButton>Login</NavButton>
                        </NavLink>

                        <NavLink to="/register">
                            <NavButton>Register</NavButton>
                        </NavLink>

                        {/* <NavLink to="/deactivate">
                                <NavButton>Deactivate Account</NavButton>
                            </NavLink> */}
                    </>}
            </NavButtonDiv>

        </NavContainer>

    )
}

export default Navbar