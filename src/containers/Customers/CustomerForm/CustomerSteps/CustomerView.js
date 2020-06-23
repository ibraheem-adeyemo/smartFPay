import React from "react";
import { Col, Card, CardBody, Spinner, Button, Row } from "reactstrap";
import { Link } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import AccessControl from "../../../../shared/components/AccessControl";
import { permissionsConstants } from "../../../../constants/permissions.constants";
import Cards from 'react-credit-cards';

const CustomerView = props => {
  const { customer, controlId, fetchData } = props;
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

const carDetails = (card) => {
  
}

  return (
    <Col>
      <Card>
        <CardBody>
        <div className="project-summary">
        <div className="card__title">
            <h4 className="bold-text">Account Details</h4>
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
            <h3 className="bold-text">Card Details</h3>
            </div>
            <div>
              <Cards
                name="John Smith"
                number="5555 4444 3333 1111"
                expiry="10/20"
                cvc="737"
                issuer='visa'
              />

              {/* <Card
                name="John Smith"
                number="4111 1111 1111 1111"
                expiry="10/20"
                cvc="737"
              />

              <Card
                name="John Smith"
                number="3700 0000 0000 002"
                expiry="10/20"
                cvc="737"
              />

              <Card
                name="John Smith"
                number="3600 666633 3344"
                expiry="10/20"
                cvc="737"
              />
              <Card
                name="John Smith"
                number="6011 6011 6011 6611"
                expiry="10/20"
                cvc="737"
              />

              <Card
                name="John Smith"
                number="5066 9911 1111 1118"
                expiry="10/20"
                cvc="737"
              />

              <Card
                name="John Smith"
                number="6250 9460 0000 0016"
                expiry="10/20"
                cvc="737"
              />

              <Card
                name="John Smith"
                number="6062 8288 8866 6688"
                expiry="10/20"
                cvc="737"
              />

              <Card
                name="John Smith"
                number="**** **** **** 7048"
                expiry="10/20"
                cvc="737"
                preview={true}
                issuer="visa"
              /> */}
            </div>
              <Row>
                <Col sm="6">
                  <dl className="row" style={{fontSize: '18px'}}>
                  <dt className="col-sm-8">Currency Code</dt>
                  <dd className="col-sm-4">
                    <p>{customer?.response?.currencyCode || '556'}</p>
                  </dd>
                  </dl>
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
              <hr className="my-3" />
              </div>
        </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default CustomerView;
