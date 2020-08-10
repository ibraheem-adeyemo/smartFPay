import React, { useEffect, useState } from "react";
import { Col, Card, CardBody, Spinner, Button, ButtonToolbar, Row } from "reactstrap";
import { Link } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import AccessControl from "../../../../shared/components/AccessControl";
import { permissionsConstants } from "../../../../constants/permissions.constants";
import Cards from 'react-credit-cards';
import chip from '../../../../assets/chip.png';
import { getAllControls } from "../../../Limits/actions/limits.actions";

const CustomerView = props => {
  const { submitting, previous, startFlow, getControl, customer, location, dispatch, accountNumber, controls } = props;
  const updatedLimit = location?.state?.limit;
  const updatedCardLimit = location?.state?.cardLimit;
  const [limit, setLimit] = useState(location?.state?.limit?.success?updatedLimit : null);
  // const [cardLimit, setCardLimit] = useState(location?.state?.cardLimit?.success?updatedCardLimit : null);
  // const [accountLimit, setAccountLimit] = useState(location?.state?.limit?.success?updatedLimit.response:accountControls[0]);
  let accountControls = [], cardControls = [];
  // if(location?.state?.limit.success)
  //   setAccountLimit(location?.state?.limit?.accountLimit)
  // else
    // setAccountLimit(accountControls)
  // const accountLimit = location?.state?.limit?.accountLimit || accountControls;
  // const accountLimit = accountControls;
  // let customer = {
  //   request: '45678900000',
  //   response: {
  //     "accountName": "Ade Usman",
  //     "currencyCode": "556",
  //     "cards": [
  //         {
  //             "pan": "539941*******5846",
  //             "tokenizedPan": "2adbasdlkda1398138nadshasjda21",
  //             "expiry": "09/22"
  //         }
  //     ]
  // }
  
  // }

  const {request, response} = customer;
//   const foundControl =
//     control.response &&
//     control.response.data &&
//     control.response.data.length &&
//     !control.loading;
//   const controlObj =
//     control.response && control.response.data && control.response.data.length
//       ? control.response.data[0]
//       : {};
// useEffect(() => {
  // if(updatedLimit?.success) {
  //   setLimit(updatedLimit.response)
  // }
//     dispatch(getAllControls({accountNumber, pageSize:1000, pageNumber: 1}));
//     console.log(accountControls, cardControls)
//   console.log(updatedLimit)
//   console.log(limit)
// }, [controls]);
accountControls = controls?.response?.data.filter(control => control.limitType === 'ACCOUNT');
cardControls = controls?.response?.data.filter(control => control.limitType === 'CARD');

// console.log(cardLimit, updatedCardLimit)

const CardDetails = ({card}) => (
  <>
              <Row>
                <Col sm="6">
                <Card>
                  <CardBody style={styles.card}>
                    <img src={chip} style={styles.chip}/>
                    <div style={styles.maskedPan}>{`${card.pan.substring(0,4)} ${card.pan.substring(4,8)} ${card.pan.substring(8,12)} ${card.pan.substring(12)}`}</div>
              <div style={styles.validity}><span>Valid Thru</span><span style={styles.expiryDate}>{card.expiry}</span></div>
                    <div style={styles.cardName}>{response?.accountName}</div>
                  </CardBody>
                </Card>
                </Col>
                <Col sm="6">
                  {cardControls.find(
          control => control.token === card.tokenizedPan
        )?<AccessControl
                allowedPermissions={[permissionsConstants.CREATE_CONTROL]}
                renderNoAccess={() => null}
              >
                    <Link
                  className="btn btn-primary project-summary__btn"
                  to={{
                    pathname: `/limit-requests/card/edit/${card.tokenizedPan}`,
                    state: { 
                      fromCustomerView: true,
                      cardDetails: card
                    }
                  }}
                  id="link-edit-card-control"
                >
                  Manage Card Control
                </Link>
              </AccessControl>:<AccessControl
                allowedPermissions={[permissionsConstants.CREATE_CONTROL]}
                renderNoAccess={() => null}
              >
                    <Link
                  className="btn btn-primary project-summary__btn"
                  to={{
                    pathname: "/limit-requests/card/add",
                    state: { 
                      fromCustomerView: true,
                      cardDetails: card
                    }
                  }}
                  id="link-create-card-control"
                >
                  Create Card Control
                </Link>
              </AccessControl>}
                </Col>
              </Row>
              
              <hr />
  
  </>
);

// console.log(count, data);
// console.log(customer)
// console.log(location?.state?.limit?.accountLimit?.success)
// console.log(cardControls, accountControls);
// console.log(accountLimit, accountControls)

const cards = response?.cards?.map((card, index) => <CardDetails key ={index} card={card}/>)

  return (
    <Col>
      <Card>
        <CardBody>
        <div className="project-summary">
          <div className="card__title">
            <h4 style={{color: '#000'}} className="bold-text">Account Details</h4>
            
        {accountControls.length > 0?
              <AccessControl
                allowedPermissions={[permissionsConstants.UPDATE_CONTROL]}
                renderNoAccess={() => null}
              >
                    <Link
                  id="link-create-control"
                  className="btn btn-primary project-summary__btn"
                  to={{
                    pathname: `/limit-requests/edit/${accountControls[0].token}`,
                    state: { 
                      fromCustomerView: true,
                      accountLimit:{}
                    }
                  }}
                >
                  Manage Account Control
                </Link>
              </AccessControl>:<AccessControl
                allowedPermissions={[permissionsConstants.CREATE_CONTROL]}
                renderNoAccess={() => null}
              >
                    <Link
                  className="btn btn-primary project-summary__btn"
                  to={{
                    pathname: "/limit-requests/add",
                    state: { fromCustomerView: true }
                  }}
                  id="link-create-control"
                >
                  Create Account Control
                </Link>
              </AccessControl>}
          </div>
        <dl className="row" style={{fontSize: '18px'}}>
                <dt className="col-sm-4">Customer Account Number</dt>
                <dd className="col-sm-8">
                  <p>{request || ''}</p>
                </dd>

                <dt className="col-sm-4">Customer Account Name</dt>
                <dd className="col-sm-8">
                  <p>{response?.accountName || ''}</p>
                </dd>

                <dt className="col-sm-4">Core Banking Id</dt>
                <dd className="col-sm-8">
                  <p>{response?.coreBankingId || ''}</p>
                </dd>
                <dt className="col-sm-4">Currency Code</dt>
                <dd className="col-sm-8">
                  <p>{response?.currencyCode || '556'}</p>
                </dd>
              </dl>
              {/* <h5 className="font-weight-bold">Customer Information</h5> */}
              <div>
              <div className="card__title">
            <h4 style={{color: '#000'}}className="bold-text">Card Details</h4>
            </div>
            <div>
              {cards}
            </div>
              </div>
        </div>
        </CardBody>
      </Card>
        <ButtonToolbar className="form__button-toolbar">
                  <Button
                      color="secondary"
                      id="submit-btn"
                      type="submit"
                      onClick={previous}
                    >
                      <MdArrowBack size={20} />
                      {customer?.loading ? (
                        <span>
                          <Spinner size="sm" color="default" />{" "}
                        </span>
                      ) : null}
                      Customer Details
                    </Button>
                    <Button
                      color="primary"
                      id="submit-btn"
                      type="submit"
                      onClick={startFlow}
                    >
                      Finish
                    </Button>
                  </ButtonToolbar>
    </Col>
  );
};

const styles = {
  card: {
    backgroundColor: 'red',
    width: '20rem',
    borderRadius: '10px'
  },
  cardName: {
    textTransform: 'uppercase',
    fontWeight: '700'
  },
  maskedPan: {
    wordSpacing: '0.75rem',
    fontSize: '1rem',
    letterSpacing: '0.24rem'
  },
  chip: {
    width: '2rem',
    height: '2rem',
    marginBottom: '0.5rem'
  },
  validity: {
    textTransform: 'uppercase',
    fontSize: '0.7rem',
    padding:'0.75rem 0',
  },
  expiryDate: {
    fontSize: '0.9rem',
    marginLeft: '1rem',
  }
};

export default CustomerView;
