import React from 'react';
import './DefaultSideBar.css';
import {NavLink} from 'react-router-dom';

const DefaultSideBar = () => {
    return (
        <div className="Sidebar-wrapper">
            <ul className="list list-unstyled nav">
                <li>
                    <NavLink to="/" activeClassName="active">
                    <i className="fa fa-navicon fa-lg icon" aria-hidden="true"></i>Activity
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/" activeClassName="active">
                    <i className="fa fa-users fa-lg icon" aria-hidden="true"></i>Accounts
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/" activeClassName="active">
                    <i className="fa fa-credit-card fa-lg icon" aria-hidden="true"></i>Cards
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/" activeClassName="active">
                    <i className="fa fa-bars fa-lg icon" aria-hidden="true"></i>Report Management
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/" activeClassName="active">
                    <i className="fa fa-cog fa-lg icon" aria-hidden="true"></i>Setting
                    </NavLink>
                </li>
            </ul>
        </div>
    );
}

export default DefaultSideBar;
