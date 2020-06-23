import React from "react";
import { Col, Card, CardBody, Spinner, Button, ButtonToolbar, Row } from "reactstrap";
import { Link } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import AccessControl from "../../../../shared/components/AccessControl";
import { permissionsConstants } from "../../../../constants/permissions.constants";
import Cards from 'react-credit-cards';
import chip from '../../../../assets/chip.png';

const CustomerView = props => {
  const { customer, controlId, fetchData, submitting, previous, startFlow } = props;
  console.log(customer);
//   const foundControl =
//     control.response &&
//     control.response.data &&
//     control.response.data.length &&
//     !control.loading;
//   const controlObj =
//     control.response && control.response.data && control.response.data.length
//       ? control.response.data[0]
//       : {};

const CardDetails = (card) => (
  <>
              <Row>
                
                <Col sm="6">
                <Card>
    <CardBody style={styles.card}>
      <img src={chip} style={styles.chip}/>
      <div style={styles.maskedPan}>4324 **** **** 0909</div>
      <div style={styles.validity}><span>Valid Thru</span><span style={styles.expiryDate}>12/13</span></div>
      <div style={styles.cardName}>CALEB Ogundiya</div>
    </CardBody>
  </Card>
                </Col>
                <Col sm="6">
                
                  <AccessControl
                allowedPermissions={[permissionsConstants.CREATE_CONTROL]}
                renderNoAccess={() => null}
              >
                    <Link
                  className="btn btn-primary project-summary__btn"
                  to="/limit-requests/add"
                  id="link-create-control"
                >
                  Create Control
                </Link>
              </AccessControl>
                </Col>
              </Row>
              
              <hr />
  
  </>
);

let arr = [1,2,43,4,5];

const cards = arr.map((card, index) => <CardDetails />)

  return (
    <Col>
      <Card>
        <CardBody>
        <div className="project-summary">
        <div className="card__title">
            <h4 style={{color: '#000'}} className="bold-text">Account Details</h4>
            </div>
        <AccessControl
                allowedPermissions={[permissionsConstants.CREATE_CONTROL]}
                renderNoAccess={() => null}
              >
                    <Link
                  className="btn btn-primary project-summary__btn"
                  to="/limit-requests/add"
                  id="link-create-control"
                >
                  Create Account Control
                </Link>
              </AccessControl>
        <dl className="row" style={{fontSize: '18px'}}>
                <dt className="col-sm-4">Customer Account Number</dt>
                <dd className="col-sm-8">
                  <p>{customer?.request || '756'}</p>
                </dd>

                <dt className="col-sm-4">Customer Account Name</dt>
                <dd className="col-sm-8">
                  <p>{customer?.response?.accountName || '8765'}</p>
                </dd>

                <dt className="col-sm-4">Core Banking Id</dt>
                <dd className="col-sm-8">
                  <p>{customer?.response?.corebankingId || '0909090901'}</p>
                </dd>
              </dl>
              {/* <h5 className="font-weight-bold">Customer Information</h5> */}
              <div>
              <div className="card__title">
            <h4 style={{color: '#000'}}className="bold-text">Card Details</h4>
            </div>
            <div>
              <Row>
              <Col sm="6">
                  <dl className="row" style={{fontSize: '18px'}}>
                  <dt className="col-sm-8">Currency Code</dt>
                  <dd className="col-sm-4">
                    <p>{customer?.response?.currencyCode || '556'}</p>
                  </dd>
                  </dl>
                </Col>
              </Row>
              <hr />
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
    letterSpacing: '0.25rem'
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
