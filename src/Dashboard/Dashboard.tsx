import React from 'react';
import DashboardSidebar from '../shared/components/DashboardSidebar/DashboardSidebar';
import './Dashboard.css';
import LimitCard from '../components/LimitCard/LimitCard';

const Dashboard = () => {
    return (
        <div className="row dashboard-wrapper">
            <div className="col-sm-3 col-md-2">
                <DashboardSidebar />
            </div>
            <div className="col-sm-9 col-md-10 dashboard">
                <div className="top-nav">Dahsboard</div>
                <ul className="cards">
                    <li>
                        <LimitCard 
                            limitTitle="Transaction Limit"
                            limit="6565"
                            limitDuration="Last 24hrs"
                        />
                    </li> 
                    <li>
                        <LimitCard 
                            limitTitle="Transaction Limit"
                            limit="6565"
                            limitDuration="Last 24hrs"
                        />
                    </li> 
                    <li>
                        <LimitCard 
                            limitTitle="Transaction Limit"
                            limit="6565"
                            limitDuration="Last 24hrs"
                        />
                    </li> 
                    <li>
                        <LimitCard 
                            limitTitle="Transaction Limit"
                            limit="6565"
                            limitDuration="Last 24hrs"
                        />
                    </li> 
                    <li>
                        <LimitCard 
                            limitTitle="Transaction Limit"
                            limit="6565"
                            limitDuration="Last 24hrs"
                        />
                    </li> 
                </ul>  
            </div>
        </div>
    );
}
  
export default Dashboard;