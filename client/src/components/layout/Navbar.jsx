import React, {useContext, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {UserContext} from "../registration/Context";
function Navbar() {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const { setUserInfo } = useContext(UserContext);

    function Logout(){
        setUserInfo(null);
        localStorage.clear();
    }


    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light" id={"Navbar"}>
            <div className="container-fluid">
                <h3> <a className={"navbar-brand"} href={'/'}>Hailiage</a></h3>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        {token && (
                            <>
                            <li className="nav-item">
                                <a className="nav-link" href ={`/portal/${userId}`} >
                                    portal
                                </a>

                            </li>
                            <li className="nav-item">
                            <a className="nav-link" onClick={Logout} href={'/'}>
                            logout
                            </a>

                            </li>
                            </>
                        )}
                        {!token && (
                            // Default navbar elements for guests
                            <>
                                <li className="nav-item">
                                    <a id="nav-item" href="/register" className="nav-link">
                                        Sign-Up
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a id="nav-item" href="/login" className="nav-link">
                                        Log-In
                                    </a>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
