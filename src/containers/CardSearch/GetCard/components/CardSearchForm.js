import React, { useEffect } from "react";
import { Field, reduxForm, clearFields, formValueSelector } from "redux-form";
import { Row, Col, ButtonToolbar, Button, Spinner } from "reactstrap";
import { connect } from "react-redux";
import { renderField } from "../../../../utils/renderfield";
import { validateCardSearch } from "./validateSearch";
import AccessControl from "../../../../shared/components/AccessControl";
import { permissionsConstants } from "../../../../constants/permissions.constants";
import IssuersDropDown from "../../../Issuers/IssuersDropDown";
import renderSelectField from "../../../../shared/components/form/Select";
import {
  getCardPrograms,
  resetCardPrograms
} from "../../../Issuers/actions/issuer.actions";

let CardSearchForm = props => {
  const {
    handleSubmit,
    reset,
    dispatch,
    pristine,
    invalid,
    resetSearch,
    selectedIssuer,
    currentIssuerData,
    cardPrograms,
    loading
  } = props;

  const resetForm = () => {
    reset();
    resetSearch();
    resetCardPrograms();
  };

  useEffect(() => {
    if (currentIssuerData && currentIssuerData.domainCode !== "ISW") {
      dispatch(getCardPrograms(currentIssuerData.issuerNr))
    }
  }, [dispatch, currentIssuerData])

  useEffect(() => {
    dispatch(clearFields("card_search_form", true, true, "cardProgram"));
    if (!selectedIssuer) {
      dispatch(resetCardPrograms());
    } else {
      dispatch(getCardPrograms(selectedIssuer && selectedIssuer.issuerNr));
    }
  }, [dispatch, selectedIssuer]);

  return (
    <form className="form" onSubmit={handleSubmit}>
      <Row>
          <AccessControl
            allowedPermissions={[permissionsConstants.FETCH_ISSUER_CONFIGS]}
            renderNoAccess={() => ''}
          >
             <Col lg="3">
             <IssuersDropDown
              required
              id="issuer"
              label="Select Issuer"
            />
             </Col>
          </AccessControl>
        <Col lg="3">
          <div className="form__form-group">
            <span className="form__form-group-label">Card Program</span>
            <div className="form__form-group-field">
              <Field
                id="cardProgram"
                name="cardProgram"
                component={renderSelectField}
                options={
                  (cardPrograms &&
                    cardPrograms.response &&
                    cardPrograms.response.cardPrograms) ||
                  []
                }
                valueKey="cardProgram"
                labelKey="cardProgram"
                placeholder="Card Program"
              />
            </div>
          </div>
        </Col>
        <Col lg="3">
          <div className="form__form-group">
            <span className="form__form-group-label">First Name</span>
            <div className="form__form-group-field">
              <Field
                id="firstName"
                name="firstName"
                component={renderField}
                type="text"
                placeholder="First Name"
              />
            </div>
          </div>
        </Col>
        <Col lg="3">
          <div className="form__form-group">
            <span className="form__form-group-label">Last Name</span>
            <div className="form__form-group-field">
              <Field
                id="lastName"
                name="lastName"
                component={renderField}
                type="text"
                placeholder="Last Name"
              />
            </div>
          </div>
        </Col>
      {/* </Row>
      <Row> */}
        <Col lg="3">
          <div className="form__form-group">
            <span className="form__form-group-label">Card Number</span>
            <div className="form__form-group-field">
              <Field
                id="pan"
                name="pan"
                component={renderField}
                type="text"
                placeholder="Card number"
              />
            </div>
          </div>
        </Col>
        <Col lg="4">
          <ButtonToolbar className="mt-4 form__button-toolbar">
            <Button
              color="primary"
              type="submit"
              id="btn-submit-cardStatement"
              disabled={loading || invalid}
            >
              {loading ? (
                <span>
                  <Spinner size="sm" color="default" />{" "}
                </span>
              ) : null}
              Search
            </Button>
            <Button
              type="button"
              id="btn-reset-cardStatement"
              onClick={resetForm}
              disabled={pristine || loading}
            >
              Cancel
            </Button>
          </ButtonToolbar>
        </Col>
      </Row>
    </form>
  );
};

CardSearchForm = reduxForm({
  form: "card_search_form",
  validate: validateCardSearch
})(CardSearchForm);

const selector = formValueSelector("card_search_form");

CardSearchForm = connect(state => ({
  selectedIssuer: selector(state, "issuerNumber"),
  cardPrograms: state.getCardProgramsFromIssuer,
  currentIssuerData: state.cardProgramCount && state.cardProgramCount.request
}))(CardSearchForm);

export default CardSearchForm;
