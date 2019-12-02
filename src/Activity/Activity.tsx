import React from 'react';
import DefaultSidebar from '../shared/components/DefaultSideBar/DefaultSideBar';
import RolesList from '../Roles/RolesList/RolesList';
import Users from '../Users/Users';
import './Activity.css';
import Navbar from '../shared/components/Navbar/Navbar';
import DashboardSideBar from '../shared/components/DashboardSidebar/DashboardSidebar';

const Activity = () => {
    const users = [{name: 'Folamoluwa', authorities: ['SYS_ADMIN']}, {name: 'Folamoluwa', authorities: ['SYS_ADMIN']}, {name: 'Folamoluwa', authorities: ['SYS_ADMIN']}];
    const roles= [{name:'SYS_ADMIN'}, {name:'ADMIN'}, {name:'SOME_ROLE'}, {name:'ANOTHER_ROLE'}];
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2 d-none d-md-block bg-light sidebar">
                        <DefaultSidebar />
                    </div>
                    <div className="col-md-9 ml-sm-auto col-lg-10 px-4 activity">
                        <Navbar />
                    </div>
                </div>
            </div>
        </>
        
    )
}

export default Activity;