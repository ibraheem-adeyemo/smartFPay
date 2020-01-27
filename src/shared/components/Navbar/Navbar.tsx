import React, {useState} from 'react';
import {NavLink} from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const [showOptions, setShowOptions] = useState(false);
    const toggleOptions = () => setShowOptions(!showOptions);

    return (
        <>
            <nav className="navbar navbar-dark fixed-top flex-md-nowrap">
                <div className="navbar-brand col-sm-3 col-md-2 mr-0">Dashboard Something</div>
                {/* <input className="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search" /> */}
                <ul className="navbar-nav px-3">
                    {/* <li className="nav-item text-nowrap">
                        <i className="fa fa-bell-o" aria-hidden="true"></i>
                    </li> */}
                    <li className="nav-item text-nowrap">
                        <i className="fa fa-user-o" aria-hidden="true"></i>
                    </li>
                    <li className="nav-item text-nowrap user-name">
                        <span>Kayode Somename</span>
                        <i className={showOptions?"fa fa-angle-down fa-lg":"fa fa-angle-up fa-lg"} aria-hidden="true" onClick={toggleOptions}></i>
                    </li>
                </ul>
            </nav>
            {showOptions && <div className="drop-down">
                <ul>
                    <li className="header">
                        Actions
                    </li>
                    <li>
                        <NavLink to="/change-password" activeClassName="active">
                            Change Password
                        </NavLink>
                    </li>
                </ul>
            </div>}
        </>
    );
}

export default Navbar;