import React, { memo, useEffect, useState } from "react";
import { Card, CardBody, Col } from "reactstrap";
import PropTypes from "prop-types";
import { MdArrowBack } from "react-icons/md";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { resetPost } from "../../actions/customers.actions";
import CustomerAccountInformation from "../CustomerSteps/CustomerAccountInformation";
// import CardConfiguration from "./CardSteps/CardConfiguration";
// import Review from "./CardSteps/Review";
import { CARD_REQUEST_TYPE } from "../../../../constants/app.constants";
import FormError from "../../../../shared/components/FormError";

const CustomerCreateForm = memo(({ dispatch, onSubmit, createCustomer }) => {
  const [page, setPage] = useState(1);

  const nextPage = () => {
    setPage(prev => prev + 1);
  };

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
          <FormError formState={createCustomer} />
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
                  onSubmit={nextPage}
                />
              )}
              {page === 2 && (
                <CustomerAccountInformation
                  previousPage={previousPage}
                  onSubmit={nextPage}
                />
              )}
              {page === 3 && (
                <CustomerAccountInformation
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
  createCustomer: state.createCustomer
}))(CustomerCreateForm);
