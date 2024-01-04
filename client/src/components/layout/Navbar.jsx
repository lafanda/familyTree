import React from 'react';

function Navbar() {
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
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a id="nav-item" href="/signup" className="nav-link">
                                Sign-Up
                            </a>
                        </li>
                        <li className="nav-item">
                            <a id="nav-item" href="/login" className="nav-link">
                                Log-In
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
);
}

export default Navbar;
