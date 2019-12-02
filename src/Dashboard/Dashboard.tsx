import React, {Fragment} from 'react';
import DashboardSidebar from '../shared/components/DashboardSidebar/DashboardSidebar';
import './Dashboard.css';
import LimitCard from '../components/LimitCard/LimitCard';
import Navbar from '../shared/components/Navbar/Navbar';

const Dashboard = () => {
    return (
        <Fragment>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2 d-none d-md-block bg-light sidebar">
                        <DashboardSidebar />
                    </div>
                    <div className="col-md-9 ml-sm-auto col-lg-10 px-4 dashboard">
                        <Navbar />
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
            </div>
        </Fragment>

        
        
    );
}
  
export default Dashboard;