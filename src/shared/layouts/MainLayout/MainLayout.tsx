import React from 'react';
import {Route} from 'react-router-dom';
import DashboardSideBar from '../../components/DashboardSidebar/DashboardSidebar';
import Navbar from '../../components/Navbar/Navbar';
import './MainLayout.css'

// @ts-ignore
export const MainLayout = ({component: Component, ...rest}) => (
    <Route {...rest} render={props => (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2 d-none d-md-block bg-light sidebar">
                        <DashboardSideBar />
                    </div>
                    <div className="col-md-9 ml-sm-auto col-lg-10 px-4 component">
                        <Navbar />
                        <Component {...props} />
                    </div>
                </div>
            </div>
        </>
    )}/>
)