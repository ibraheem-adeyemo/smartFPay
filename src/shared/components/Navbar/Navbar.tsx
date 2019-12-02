import React from 'react';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar navbar-dark fixed-top flex-md-nowrap">
            <div className="navbar-brand col-sm-3 col-md-2 mr-0">Dashboard Something</div>
            {/* <input className="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search" /> */}
            <ul className="navbar-nav px-3">
                <li className="nav-item text-nowrap">
                    <i className="fa fa-bell-o" aria-hidden="true"></i>
                </li>
                <li className="nav-item text-nowrap">
                    <i className="fa fa-user-o" aria-hidden="true"></i>
                </li>
                <li className="nav-item text-nowrap">
                    Kayode Somename<i className="fa fa-angle-down fa-lg" aria-hidden="true"></i>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;