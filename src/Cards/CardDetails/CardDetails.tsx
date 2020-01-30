import React from 'react';
import {Button} from 'reactstrap';
import './CardDetails.css';

const CardDetails = () => {
    return (
        <div className="card-details">
            <div className="header">
                <p>Card Details</p>
                <p className="card-status">Active</p>
            </div>
            <div className="card-body row">
                <div className="col">
                    <div className="card-name">
                        <p className="label">Name on Card</p>
                        <p className="name">Michael kolawole Chinyere</p>
                    </div>
                    <div className="card-number">
                        <p className="label">Card Number</p>
                        <p className="number">1234 5611 1111 7890</p>
                    </div>
                </div>
                <div className="col">
                    <div className="card-name">
                        <p className="label">Name on Card</p>
                        <p className="name">Michael kolawole Chinyere</p>
                    </div>
                    <div className="card-number">
                        <p className="label">Card Number</p>
                        <p className="number">1234 5611 1111 7890</p>
                    </div>
                </div>
                <div className="col">
                    
                </div>
            </div>
            <div className="action-buttons">
                <Button color="primary" className="assign-btn"><i className="fa fa-spinner fa-spin"></i>Freeze Card</Button> {' '}
                <Button color="primary" className="assign-btn"><i className="fa fa-spinner fa-spin"></i>Set limit</Button> {' '}
                <Button color="primary" className="assign-btn"><i className="fa fa-spinner fa-spin"></i>Pin &amp; Security</Button> {' '}
                <Button color="primary" className="assign-btn"><i className="fa fa-spinner fa-spin"></i>Customize Channels</Button> {' '}
            </div>
        </div>
    );
}

export default CardDetails;
