import React from 'react';
import DefaultSidebar from '../shared/components/DefaultSideBar/DefaultSideBar';
import './Activity.css';
import Navbar from '../shared/components/Navbar/Navbar';

const Activity = () => {
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