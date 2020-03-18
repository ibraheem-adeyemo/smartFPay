import React, { memo, useEffect, useState } from "react";
import { Card, CardBody, Col } from "reactstrap";
import PropTypes from "prop-types";
import { MdArrowBack } from "react-icons/md";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { resetPost } from "../../actions/cardrequests.actions";
import CustomerInformation from "./CardSteps/CustomerInformation";
import { CARD_REQUEST_TYPE } from "../../../../constants/app.constants";
import FormError from "../../../../shared/components/FormError";
import { COUNTRIES } from "../../../../constants/countries";

const CardCreateForm = memo(({ dispatch, onSubmit, createCard }) => {
  const [page] = useState(1);

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
              <Link to="/card-requests" id="link-all-cardrequests">
                <MdArrowBack size={20} /> Back to card requests
              </Link>
            </h5>
          </div>
          <FormError formState={createCard} />
          <div className="wizard">
            <div className="wizard__steps">
              <div
                className={`wizard__step${
                  page === 1 ? " wizard__step--active" : ""
                }`}
              >
                <p>Customer Information</p>
              </div>
              <div
                className={`wizard__step${
                  page === 2 ? " wizard__step--active" : ""
                }`}
              >
                <p>Card Configuration</p>
              </div>
              <div
                className={`wizard__step${
                  page === 3 ? " wizard__step--active" : ""
                }`}
              >
                <p>Review</p>
              </div>
            </div>
            <div className="wizard__form-wrapper">
              {page === 1 && (
                <CustomerInformation
                  initialValues={{
                    cardRequestType: CARD_REQUEST_TYPE.find(
                      type => type.value === "single"
                    ),
                    addressCountry: COUNTRIES.find(
                      country => country.alpha3Code === "NGA"
                    )
                  }}
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

CardCreateForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default connect(state => ({
  createCard: state.createCard
}))(CardCreateForm);
