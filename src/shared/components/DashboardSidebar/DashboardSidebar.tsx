import React from 'react';
import './DashboardSidebar.css';
import {NavLink} from 'react-router-dom';

let toggleSubMenu = (event: React.FormEvent<any>) => {
    const subMenuItem = event.currentTarget;
    const container = document.querySelectorAll('.Sidebar-wrapper .sub-nav');

    Array.from(container).forEach((item) => {
        item.classList.add('closed');
    });
    subMenuItem.querySelector('ul').classList.remove('closed')

    // TODO: Fix ToggleToClose
    // if(subMenuItem.querySelector('ul.sub-nav').classList.contains('closed')) {
    //      subMenuItem.querySelector('ul').classList.add('closed')
    //  }
};

const DashboardSideBar = () => {
    return (
        <div className="sidebar-sticky">
            <ul className="list list-unstyled nav">
                <li>
                    <NavLink to="/" activeClassName="active">
                        <i className="icon-dashboard"/> Dashboard
                    </NavLink>
                </li>
                <li onClick={toggleSubMenu}>
                    <a>Customer Management <span className="icon"><i className="fa fa-caret-down" aria-hidden="true"></i></span></a> 
                    <ul className="sub-nav list-unstyled closed">
                        <li><NavLink to="/" activeClassName="active">Sublink</NavLink></li>
                        <li><NavLink to="/">SubLink</NavLink></li>
                        <li><NavLink to="/" activeClassName="active">Sublink </NavLink></li>
                    </ul>
                </li>

                <li>
                    <a>Admin Management <span className="icon"><i className="fa fa-caret-down" aria-hidden="true"></i></span></a>
                    <ul className="sub-nav list-unstyled closed">
                        <li><NavLink to="/" activeClassName="active">Sublink</NavLink></li>
                        <li><NavLink to="/">SubLink</NavLink></li>
                        <li><NavLink to="/" activeClassName="active">Sublink </NavLink></li>
                    </ul>
                </li>
                <li>
                    <a>Limit Management <span className="icon"><i className="fa fa-caret-down" aria-hidden="true"></i></span></a>
                    <ul className="sub-nav list-unstyled closed">
                        <li><NavLink to="/" activeClassName="active">Sublink</NavLink></li>
                        <li><NavLink to="/">SubLink</NavLink></li>
                        <li><NavLink to="/" activeClassName="active">Sublink </NavLink></li>
                    </ul>
                </li>

                <li>
                    <a>System Management <span className="icon"><i className="fa fa-caret-down" aria-hidden="true"></i></span></a>
                    <ul className="sub-nav list-unstyled closed">
                        <li><NavLink to="/" activeClassName="active">Sublink</NavLink></li>
                        <li><NavLink to="/">SubLink</NavLink></li>
                        <li><NavLink to="/" activeClassName="active">Sublink </NavLink></li>
                    </ul>
                </li>
                <li>
                    <a>Report Management <span className="icon"><i className="fa fa-caret-down" aria-hidden="true"></i></span></a>
                    <ul className="sub-nav list-unstyled closed">
                        <li><NavLink to="/" activeClassName="active">Sublink</NavLink></li>
                        <li><NavLink to="/">SubLink</NavLink></li>
                        <li><NavLink to="/" activeClassName="active">Sublink </NavLink></li>
                    </ul>
                </li>
            </ul>
        </div>
    );
}

export default DashboardSideBar;
