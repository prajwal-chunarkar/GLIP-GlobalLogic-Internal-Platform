import React, { useState, useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux';
import GLlogo from '../../Utils/Images/GL-logo.jpg'
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import LogoutIcon from '@mui/icons-material/Logout';

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

    var currUser = useSelector((state) => state.currUser);
    var initials = useSelector((state) => state.initials);

    const { id, empID, fname, lname, email } = currUser

    const handleIconClick = (e) => {
        setIsOpen((prev) => !prev);
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
        localStorage.removeItem('token');          //clear Login Token
        localStorage.removeItem('accessData');   //clear Access Privilege Form Data
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
                    <>
                        <IconButton
                            onClick={(e) => handleIconClick(e)}>
                            {initials}
                        </IconButton>

                        {isOpen && (
                            <SettingDiv ref={windowRef} className="window">
                                <div class="card">
                                    <div
                                        class="card-body"
                                        style={{ borderRadius: "50%", height: "80%" }}>
                                        <Text
                                            class="card-title" >
                                            <b>{fname} {lname}</b>
                                        </Text>
                                        <Text
                                            class="card-title"
                                            style={{ fontSize: "0.8rem" }}>
                                            {email}
                                        </Text>
                                        <Text
                                            class="card-title"
                                            style={{ fontSize: "0.9rem" }}>
                                            Emp Id: {empID}
                                        </Text>
                                        <br />

                                        <NavLink
                                            to={`/resetpassword/${id}`}
                                            style={{ textDecoration: "none", color: "#000" }}>
                                            <NavLinkSpan>
                                                <SettingsRoundedIcon />
                                                <span
                                                    className="span mx-2"
                                                    style={{ fontSize: "0.95rem" }}>
                                                    Manage Your Account
                                                </span>
                                            </NavLinkSpan>
                                        </NavLink>
                                        <hr />
                                        <p class="card-text" >
                                            <NavLink
                                                to="#"
                                                style={{ textDecoration: "none", color: "#000" }}>
                                                <NavLinkSpan>
                                                    <LogoutIcon 
                                                    onClick={loggedOut} 
                                                    style={{ marginLeft: "45%" }} />
                                                </NavLinkSpan>
                                            </NavLink>
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


                    </>}
            </NavButtonDiv>
        </NavContainer>

    )
}

export default Navbar