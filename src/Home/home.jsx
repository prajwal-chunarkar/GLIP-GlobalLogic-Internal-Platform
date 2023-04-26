import React from 'react'
import { NavLink } from 'react-router-dom'
import './home-style.css'
import { useSelector } from 'react-redux'

const Home = () => {
    const isloggedin = useSelector(state => state.isloggedin);

    const loggedOut = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    }

    return (
        <div>
            <div className='Navbar'>
                <div className='navHeading'>
                    <NavLink to="/">
                        <h1 style={{ color: 'white' }}>GlobalLogic</h1>
                    </NavLink>

                </div>
                <div className='topNav_right'>
                    {isloggedin ? <button style={{ backgroundColor: "red" }} onClick={loggedOut}>Logout</button> :
                        <>
                            <NavLink to="/login">
                                <button>Login</button>
                            </NavLink>

                            <NavLink to="/register">
                                <button>Register</button>
                            </NavLink>

                            <NavLink to="/deactivate">
                                <button>Deactivate Account</button>
                            </NavLink>
                        </>}

                </div>

            </div>

        </div>
    )
}

export default Home