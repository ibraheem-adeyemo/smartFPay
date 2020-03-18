import React, { memo } from "react";
import { Button, ButtonToolbar, Row, Col } from "reactstrap";
import { Field, reduxForm, formValueSelector } from "redux-form";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import renderSelectField from "../../../../../shared/components/form/Select";
import { CARD_REQUEST_TYPE } from "../../../../../constants/app.constants";
import SingleCardRequest from "./Forms/SingleCardRequest";
import BulkCardRequest from "./Forms/BulkCardRequest";
import { validateCustomerInformation as validate } from "./Validations";

let CustomerInformation = memo(
  ({ handleSubmit, invalid, submitting, requestType }) => {
    return (
      <form className="form wizard__form" onSubmit={handleSubmit}>
        <Row>
          <Col lg="2">
            <div className="form__form-group">
              <span className="form__form-group-label required">
                Request Type
              </span>
              <div className="form__form-group-field">
                <Field
                  id="cardRequestType"
                  name="cardRequestType"
                  component={renderSelectField}
                  options={CARD_REQUEST_TYPE}
                  valueKey="value"
                  labelKey="label"
                />
              </div>
            </div>
          </Col>
        </Row>
        {requestType ? (
          <div>
            {requestType.value === "single" ? (
              <SingleCardRequest />
            ) : (
              <BulkCardRequest />
            )}
          </div>
        ) : null}

        <ButtonToolbar className="form__button-toolbar wizard__toolbar">
          <Button
            color="primary"
            type="submit"
            disabled={submitting || invalid}
            className="next"
            id="next-card-config"
          >
            Next
          </Button>
        </ButtonToolbar>
      </form>
    );
  }
);

CustomerInformation.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};

CustomerInformation = reduxForm({
  form: "createcard", //                 <------ same form name
  destroyOnUnmount: false, //        <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(CustomerInformation);

const selector = formValueSelector("createcard");
CustomerInformation = connect(state => {
  return {
    requestType: selector(state, "cardRequestType")
  };
})(CustomerInformation);

export default CustomerInformation;
