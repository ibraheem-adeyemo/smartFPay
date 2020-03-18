import React, { memo } from "react";
import { Button, ButtonToolbar, Spinner } from "reactstrap";
import { reduxForm, getFormValues } from "redux-form";
import PropTypes from "prop-types";
import { viewIssuerConfig } from "../../../../IssuerConfiguration/actions/issuerConfig.actions";
import ConfigView from "../../../../IssuerConfiguration/ViewIssuerConfig/components/ViewIssuerConfig";
import { connect } from "react-redux";
import CustomerInformationReview from "./Forms/CustomerInformationReview";

let Review = memo(
  ({
    dispatch,
    handleSubmit,
    previousPage,
    formValues,
    submitting,
    createCard,
    config
  }) => {
    function fetchConfig() {
      if (formValues && formValues.configName) {
        dispatch(viewIssuerConfig(formValues.configName.name));
      }
    }
    return (
      <form
        className="form form--horizontal wizard__form"
        onSubmit={handleSubmit}
      >
        <h3 className="font-weight-bold">
          Kindly review the information provided, before proceeding to create a
          card request
        </h3>
        <hr />
        <h4>Customer Information</h4>
        <hr />
        <CustomerInformationReview values={formValues} />
        <hr />
        <h4>Card Configuration</h4>
        <hr />
        {formValues && formValues.configName && (
          <div>
            <ConfigView
              configId={formValues.configName.name}
              config={config}
              viewOnly
              fetchData={fetchConfig}
            />
          </div>
        )}
        <ButtonToolbar className="form__button-toolbar wizard__toolbar">
          <Button
            color="primary"
            type="button"
            id="prev-card-config"
            className="previous"
            onClick={previousPage}
          >
            Back
          </Button>
          <Button id="btn-submit-cardrequest" color="primary" disabled={submitting} type="submit">
            {createCard && createCard.loading ? (
              <span>
                <Spinner size="sm" color="default" />{" "}
              </span>
            ) : null}
            Submit
          </Button>
        </ButtonToolbar>
      </form>
    );
  }
);

Review.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};

Review = reduxForm({
  form: "createcard", //                 <------ same form name
  destroyOnUnmount: false, //        <------ preserve form data
  forceUnregisterOnUnmount: true // <------ unregister fields on unmount
})(Review);

Review = connect(state => {
  return {
    formValues: getFormValues("createcard")(state),
    config: state.getIssuerConfig,
    createCard: state.createCard
  };
})(Review);

export default Review;
