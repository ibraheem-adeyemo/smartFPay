import React, {useState} from 'react';
import './DashboardSidebar.css';
import {NavLink} from 'react-router-dom';

let toggleSubMenu = (event: React.FormEvent<any>) => {
    const subMenuItem = event.currentTarget;
    // TODO: Fix ToggleToClose
};

const DashboardSideBar = () => {
    const [showCustomerManagementChildren, setShowCustomerManagementChildren] = useState(false);
    const [showAdminManagementChildren, setShowAdminManagementChildren] = useState(false);
    const [showLimitManagementChildren, setShowLimitManagementChildren] = useState(false);
    const [showSystemManagementChildren, setShowSystemManagementChildren] = useState(false);
    const [showReportManagementChildren, setShowReportManagementChildren] = useState(false);

    const toggleCustomerManagement = () => {
        setShowCustomerManagementChildren(!showCustomerManagementChildren);
        setShowAdminManagementChildren(false);
        setShowLimitManagementChildren(false);
        setShowReportManagementChildren(false);
        setShowSystemManagementChildren(false);
    }

    const toggleAdminManagement = () => {
        setShowAdminManagementChildren(!showAdminManagementChildren);
        setShowCustomerManagementChildren(false);
        setShowLimitManagementChildren(false);
        setShowReportManagementChildren(false);
        setShowSystemManagementChildren(false);
    }

    const toggleLimitManagement = () => {
        setShowLimitManagementChildren(!showLimitManagementChildren);
        setShowAdminManagementChildren(false);
        setShowCustomerManagementChildren(false);
        setShowReportManagementChildren(false);
        setShowSystemManagementChildren(false);
    }

    const toggleSystemManagement = () => {
        setShowSystemManagementChildren(!showSystemManagementChildren);
        setShowAdminManagementChildren(false);
        setShowLimitManagementChildren(false);
        setShowReportManagementChildren(false);
        setShowCustomerManagementChildren(false);
    }

    const toggleReportManagement = () => {
        setShowReportManagementChildren(!showReportManagementChildren);
        setShowAdminManagementChildren(false);
        setShowLimitManagementChildren(false);
        setShowCustomerManagementChildren(false);
        setShowSystemManagementChildren(false);
    }

    return (
        <div className="sidebar-sticky">
            <ul className="list list-unstyled nav">
                <li className="first-child">
                    &nbsp;
                </li>
                <li>
                    <NavLink to="/" activeClassName="active">
                        <i className="icon-dashboard"/> Dashboard
                    </NavLink>
                </li>
                <li onClick={toggleCustomerManagement}>
                    <a>Customer Management <span className="icon"><i className={showCustomerManagementChildren?"fa fa-caret-down":"fa fa-caret-up"} aria-hidden="true"></i></span></a> 
                    {showCustomerManagementChildren && <ul className="sub-nav list-unstyled">
                        <li><NavLink to="/" activeClassName="active">Sublink</NavLink></li>
                        <li><NavLink to="/">SubLink</NavLink></li>
                        <li><NavLink to="/" activeClassName="active">Sublink </NavLink></li>
                    </ul>}
                </li>

                <li onClick={toggleAdminManagement}>
                    <a>Admin Management <span className="icon"><i className={showAdminManagementChildren?"fa fa-caret-down":"fa fa-caret-up"} aria-hidden="true"></i></span></a>
                    {showAdminManagementChildren && <ul className="sub-nav list-unstyled">
                        <li><NavLink to="/users" activeClassName="active">Admin Users</NavLink></li>
                        <li><NavLink to="/roles" activeClassName="active">Roles </NavLink></li>
                    </ul>}
                </li>
                <li onClick={toggleLimitManagement}>
                    <a>Limit Management <span className="icon"><i className={showLimitManagementChildren?"fa fa-caret-down":"fa fa-caret-up"} aria-hidden="true"></i></span></a>
                    {showLimitManagementChildren && <ul className="sub-nav list-unstyled">
                        <li><NavLink to="/cards" activeClassName="active">Cards</NavLink></li>
                        <li><NavLink to="/">SubLink</NavLink></li>
                        <li><NavLink to="/" activeClassName="active">Sublink </NavLink></li>
                    </ul>}
                </li>

                <li onClick={toggleSystemManagement}>
                    <a>System Management <span className="icon"><i className={showSystemManagementChildren?"fa fa-caret-down":"fa fa-caret-up"} aria-hidden="true"></i></span></a>
                    {showSystemManagementChildren && <ul className="sub-nav list-unstyled">
                        <li><NavLink to="/" activeClassName="active">Sublink</NavLink></li>
                        <li><NavLink to="/">SubLink</NavLink></li>
                        <li><NavLink to="/" activeClassName="active">Sublink </NavLink></li>
                    </ul>}
                </li>
                <li onClick={toggleReportManagement}>
                    <a>Report Management <span className="icon"><i className={showReportManagementChildren?"fa fa-caret-down":"fa fa-caret-up"} aria-hidden="true"></i></span></a>
                    {showReportManagementChildren && <ul className="sub-nav list-unstyled">
                        <li><NavLink to="/" activeClassName="active">Sublink</NavLink></li>
                        <li><NavLink to="/">SubLink</NavLink></li>
                        <li><NavLink to="/" activeClassName="active">Sublink </NavLink></li>
                    </ul>}
                </li>
            </ul>
        </div>
    );
}

export default DashboardSideBar;
