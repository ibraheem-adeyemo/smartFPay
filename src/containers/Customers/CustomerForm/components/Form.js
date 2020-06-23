import React, { memo, useEffect, useState } from "react";
import { Card, CardBody, Col } from "reactstrap";
import PropTypes from "prop-types";
import { MdArrowBack } from "react-icons/md";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { getCustomerDetails,resetPost, postCustomer } from "../../actions/customers.actions";
import CustomerAccountInformation from "../CustomerSteps/CustomerAccountInformation";
import CustomerDetails from '../CustomerSteps/CustomerDetails';
import CustomerView from '../CustomerSteps/CustomerView';
// import CardConfiguration from "./CardSteps/CardConfiguration";
// import Review from "./CardSteps/Review";
import { CARD_REQUEST_TYPE } from "../../../../constants/app.constants";
import FormError from "../../../../shared/components/FormError";

const CustomerCreateForm = memo(({ dispatch, onSubmit, history, customer }) => {
  const [page, setPage] = useState(1);
  const [account, setAccount] = useState(null);

  const nextPage = () => {
    setPage(prev => prev + 1);
  };

  const createCustomer = (customer) => {
    let requestBody = {
      accountNumber: customer.request,
      name: customer.response.accountName,
      coreBankingId: customer.response.coreBankingId || '0909090901'
    }
    dispatch(postCustomer(requestBody, nextPage));
    // nextPage();
  }

  const getCustomer = (accountNumber) => {
    dispatch(getCustomerDetails(accountNumber, nextPage));
    setAccount(accountNumber);
    // nextPage();
  }

  const previousPage = () => {
    setPage(prev => prev - 1);
  };

  useEffect(() => {
    dispatch(resetPost());
    return () => {
      dispatch(resetPost());
    };
  }, [dispatch]);

  return (
    <Col md={12} lg={12}>
      <Card>
        <CardBody>
          <div className="card__title">
            <h5 className="bold-text">
              <Link to="/customers" id="link-all-cardrequests">
                <MdArrowBack size={20} /> Back to Customers
              </Link>
            </h5>
          </div>
          <FormError />
          <div className="wizard">
            <div className="wizard__steps">
              <div
                className={`wizard__step${
                  page === 1 ? " wizard__step--active" : ""
                }`}
              >
                <p>Customer Account Form</p>
              </div>
              <div
                className={`wizard__step${
                  page === 2 ? " wizard__step--active" : ""
                }`}
              >
                <p>Customer Details</p>
              </div>
              <div
                className={`wizard__step${
                  page === 3 ? " wizard__step--active" : ""
                }`}
              >
                <p>Limit Control</p>
              </div>
            </div>
            <div className="wizard__form-wrapper">
              {page === 1 && (
                <CustomerAccountInformation
                  onSubmit={getCustomer}
                  customer={customer}
                />
              )}
              {page === 2 && (
                <CustomerDetails
                account={account}
                  previousPage={previousPage}
                  customer={customer}
                  handleNextPage={nextPage}
                  previous={previousPage}
                  onSubmit={() => createCustomer(customer)}
                />
              )}
              {page === 3 && (
                <CustomerView
                customer={customer}
                previousPage={previousPage}
                onSubmit={onSubmit}
              />
              )}
            </div>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
});

CustomerCreateForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default connect(state => ({
  createCustomer: state.createCustomer,
  customer: state.getCustomer
}))(CustomerCreateForm);
