import React from "react";
import { Col, Card, CardBody, Spinner, Button, Badge } from "reactstrap";
import { Link } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import AccessControl from "../../../../shared/components/AccessControl";
import { permissionsConstants } from "../../../../constants/permissions.constants";

const TransactionView = props => {
  const {location} = props;
  const foundtransaction = location.state?.transaction
  const transactionObj =
  location.state?.transaction
      ? location.state?.transaction
      : {};

// const allPermissions = location.state?.role.permissions.map((permission, index) => (<Badge key = {index} color="success" pill style={{marginRight: '10px', padding: '5px 10px'}}>{permission.name}</Badge>))

const Pill = ({title, color}) => (<Badge color={color} pill style={{marginRight: '10px', padding: '5px 10px'}}>{title}</Badge>)

  return (
    <Col>
      <Card>
        <CardBody>
        {foundtransaction ? (<div className="card__title">
            <h5 className="bold-text">
            <Link to="/view-transactions" id="link-all-transactions">
                <MdArrowBack size={20} /> Back to transactions
              </Link>
            </h5>
          </div>):null}
          {foundtransaction ? (
            <div className="project-summary">
              {/* <div className="card__title">
                <h4 className="bold-text">
                  {roleObj.id}
                </h4>
              </div> */}
              <dl className="row" style={{fontSize: '18px'}}>
                {transactionObj.limitId && <><dt className="col-sm-4">Limit ID</dt>
                <dd className="col-sm-8">
                  <p>{transactionObj.limitId}</p>
                </dd></>}
                {transactionObj.channel && <><dt className="col-sm-4">Channel</dt>
                <dd className="col-sm-8">
                  <p>{transactionObj.channel}</p>
                </dd></>}
                {transactionObj.terminalId && <><dt className="col-sm-4">Terminal ID</dt>
                <dd className="col-sm-8">
                  <p>{transactionObj.terminalId}</p>
                </dd></>}
                {transactionObj.switchKey && <><dt className="col-sm-4">SwitchKey</dt>
                <dd className="col-sm-8">
                  <p>{transactionObj.switchKey}</p>
                </dd></>}
                {transactionObj.messageType && <><dt className="col-sm-4">Message Type</dt>
                <dd className="col-sm-8">
                  <p>{transactionObj.messageType}</p>
                </dd></>}
                {transactionObj.cardAcceptorNameLocation && <><dt className="col-sm-4">Card Acceptor Name Location</dt>
                <dd className="col-sm-8">
                  <p>{transactionObj.cardAcceptorNameLocation}</p>
                </dd></>}
                {transactionObj.additionalInfo && <><dt className="col-sm-4">Additional Info</dt>
                <dd className="col-sm-8">
                  <p>{transactionObj.additionalInfo}</p>
                </dd></>}
                {transactionObj.transactionDateTime && <><dt className="col-sm-4">Transaction Date-Time</dt>
                <dd className="col-sm-8">
                  <p>{transactionObj.transactionDateTime}</p>
                </dd></>}
                {transactionObj.transactionDate && <><dt className="col-sm-4">Terminal IDTransaction Date</dt>
                <dd className="col-sm-8">
                  <p>{transactionObj.transactionDate}</p>
                </dd></>}
                {transactionObj.systemTraceAuditNr && <><dt className="col-sm-4">System Trace Audit Nr</dt>
                <dd className="col-sm-8">
                  <p>{transactionObj.systemTraceAuditNr}</p>
                </dd></>}
                {transactionObj.customerName && <><dt className="col-sm-4">Customer Name</dt>
                <dd className="col-sm-8">
                  <p>{transactionObj.customerName}</p>
                </dd></>}
                {transactionObj.fromAccount && <><dt className="col-sm-4">Origin Account</dt>
                <dd className="col-sm-8">
                  <p>{transactionObj.fromAccount}</p>
                </dd></>}
                {transactionObj.tokenizedPan && <><dt className="col-sm-4">Tokenized Pan</dt>
                <dd className="col-sm-8">
                  <p>{transactionObj.tokenizedPan}</p>
                </dd></>}
                {transactionObj.transactionAmount && <><dt className="col-sm-4">Transaction Amount</dt>
                <dd className="col-sm-8">
                  <p>{transactionObj.transactionAmount}</p>
                </dd></>}
                {transactionObj.country && <><dt className="col-sm-4">Country</dt>
                <dd className="col-sm-8">
                  <p>{transactionObj.country}</p>
                </dd></>}
                {transactionObj.paymentType && <><dt className="col-sm-4">Payment Typr</dt>
                <dd className="col-sm-8">
                  <p>{transactionObj.paymentType}</p>
                </dd></>}
                {transactionObj.violationCode && <><dt className="col-sm-4">Violation Code</dt>
                <dd className="col-sm-8">
                  <p>{transactionObj.violationCode}</p>
                </dd></>}
                <dt className="col-sm-4">Transaction Status</dt>
                <dd className="col-sm-8">
                  <p>{<Pill title={transactionObj.transactionStatus} colo={transactionObj.transactionStatus === "Failed"? "failure":"success"}/>}</p>
                </dd>
              </dl>
            </div>
          ) : ( <div>
                  <h4 className="text-danger">
                    {!foundtransaction
                      ? `Something went wrong. Could not find transaction with id (${transactionObj.id})`
                      : `Transaction with id (${transactionObj.id}) not found`}
                  </h4>
                </div>
          )}
        </CardBody>
      </Card>
    </Col>
  );
};

export default TransactionView;
