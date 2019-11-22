import React from 'react';
import DefaultSidebar from '../shared/components/DefaultSideBar/DefaultSideBar';
// import './Dashboard.css';
// import LimitCard from '../components/LimitCard/LimitCard';

const Activity = () => {
    return (
        <div className="row dashboard-wrapper">
            <div className="col-sm-3 col-md-2">
                <DefaultSidebar />
            </div>
            <div className="col-sm-9 col-md-10">
                <div>Activity</div>
            </div>
        </div>
    )
}

export default Activity;