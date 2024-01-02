import React from 'react';
import './styles.css'

const Navbar = () => {
    return (
        <nav className={"navbar navbar-expand-lg navbar-light bg-light"}>
            <div className={"container-fluid"}>
                <div className={"collapse navbar-collapse justify-content-center"}>
                    <ul className={"navbar-nav"}>
                        <li className={"nav-item"}>
                            <p className={"nav-link"} >TALIAH</p>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

    );
};

export default Navbar;