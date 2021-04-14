import React, { memo, useEffect } from "react";
import {
  Card,
  CardBody,
  Row,
  Col,
  Button,
  UncontrolledAlert,
  ButtonToolbar,
  Spinner
} from "reactstrap";
import { Field, reduxForm, formValueSelector } from "redux-form";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { MdArrowBack } from "react-icons/md";
import { Link } from "react-router-dom";
import { renderField } from "../../../../utils/renderfield";
import validate from "./validate";
import renderSelectField from "../../../../shared/components/form/Select";
import { resetPostLimitControl } from "../../actions/limits.actions";
import renderDatePickerField from "../../../../shared/components/form/DatePicker";
import {FREQUENCY_OPTIONS, CHANNELS_OPTIONS, CARD_STATUS_OPTIONS} from '../../../../constants/app.constants';

const CardLimitForm = memo(props => {
  const {
    dispatch,
    handleSubmit,
    invalid,
    submitting,
    controlId,
    control,
    postcardcontrol,
    location,
    COUNTRIES
  } = props;

  const foundControl =
    control?.response &&
    !control.loading;

  useEffect(() => {
    dispatch(resetPostLimitControl());
    return () => {
      dispatch(resetPostLimitControl());
    };
  }, [dispatch]);

  const getBackButton = options =>
  {
    return location?.state?.referer ?
      <Link
        to={{
          pathname: location.state.referer,
          state: {}
        }}>
        {options.userArrow && <MdArrowBack size={20} />} {options.customers}
      </Link>
      :
      <Link to="/limit-requests" id="link-all-limits">
      <MdArrowBack size={20} /> {options.limits}
    </Link>
  }

  return (
    <Col md={12} lg={12}>
      <Card>
        <CardBody>
          <div className="card__title">
            <h5 className="bold-text">
              {getBackButton({
                customers: "Back to customers",
                limits: "Back to limits",
                userArrow: true
              })}
            </h5>
          </div>
          {controlId && control && control.loading ? (
            <div className="text-center">
              <Spinner
                color="success"
                className="my-4"
                style={{ width: "6rem", height: "6rem" }}
              />
              <h4 className="text-secondary">
                Fetching card limit
              </h4>
            </div>
          ) : (
            <div>
              {controlId && !foundControl ? (
                <h4 className="text-danger">
                  {control && control.error
                    ? `Something went wrong. Could not fetch limit with id (${controlId})`
                    : `Limit with id (${controlId}) not found`}
                </h4>
              ) : (
                <form className="form" onSubmit={handleSubmit}>
                  {postcardcontrol &&
                  postcardcontrol.error &&
                  postcardcontrol.error.errors &&
                  postcardcontrol.error.errors.length ? (
                    <UncontrolledAlert color="danger">
                      <h5 className="font-weight-bold">
                        Please check the following fields for errors
                      </h5>
                      {postcardcontrol.error.errors.map(err => (
                        <p>
                          <strong>{err.field}:</strong> {err.message}
                        </p>
                      ))}
                    </UncontrolledAlert>
                  ) : null}
                  <Row>
                    <Col lg="4">
                      <div className="form__form-group">
                        <span className="form__form-group-label required">
                          Transaction Limit Amount
                        </span>
                        <div className="form__form-group-field">
                          <Field
                            id="amount"
                            name="amount"
                            component={renderField}
                            type="number"
                            placeholder="amount"
                          />
                        </div>
                      </div>
                    </Col>
                    <Col lg="4">
                      <div className="form__form-group">
                        <span className="form__form-group-label required">
                          Frequency Limit Reset
                        </span>
                        <div className="form__form-group-field">
                          <Field
                            id="frequency"
                            name="frequency"
                            placeholder="Kindly input frequency limit"
                            component={renderSelectField}
                            options={FREQUENCY_OPTIONS}
                            valueKey="value"
                            labelKey="label"
                          />
                        </div>
                      </div>
                    </Col>
                    <Col lg="4">
                      <div className="form__form-group">
                        <span className="form__form-group-label required">
                          Transaction Limit Count
                        </span>
                        <div className="form__form-group-field">
                          <Field
                            id="duration"
                            name="duration"
                            component={renderField}
                            type="number"
                            placeholder="Limit Count"
                          />
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="4">
                      <div className="form__form-group">
                        <span className="form__form-group-label">Start Date</span>
                        <div className="form__form-group-field">
                          <Field
                            id="startDate"
                            name="startDate"
                            dateFormat="dd/MM/yyyy h:mm aa"
                            minDate={new Date()}
                            showTimeInput={true}
                            component={renderDatePickerField}
                            placeholder="Start Date"
                            timeInputLabel="Start Time"
                          />
                        </div>
                      </div>
                    </Col>
                    <Col lg="4">
                      <div className="form__form-group">
                        <span className="form__form-group-label">End Date</span>
                        <div className="form__form-group-field">
                          <Field
                            id="endDate"
                            name="endDate"
                            dateFormat="dd/MM/yyyy h:mm aa"
                            minDate={new Date()}
                            showTimeInput={true}
                            component={renderDatePickerField}
                            placeholder="End Date"
                            timeInputLabel="End Time"
                          />
                        </div>
                      </div>
                    </Col>
                    <Col lg="4">
                        <div className="form__form-group">
                            <span className="form__form-group-label required">Enabled Countries</span>
                            <div className="form__form-group-field">
                            <Field
                                id="enabledCountries"
                                name="enabledCountries"
                                placeholder="Kindly pick contries to activate limit in"
                                component={renderSelectField}
                                isMulti={true}
                                options={COUNTRIES}
                                valueKey="alpha3Code"
                                labelKey="name"
                            />
                            </div>
                        </div>
                        </Col>
                  </Row>
                  <Row>
                    <Col lg="4">
                        <div className="form__form-group">
                            <span className="form__form-group-label required">
                            Enabled Channels
                            </span>
                            <div className="form__form-group-field">
                            <Field
                                id="channels"
                                name="channels"
                                placeholder="Kindly pick channels to activate limit for"
                                component={renderSelectField}
                                options={CHANNELS_OPTIONS}
                                isMulti={true}
                                valueKey="value"
                                labelKey="label"
                            />
                            </div>
                        </div>
                        </Col>
                        <Col lg="4">
                      <div className="form__form-group">
                        <span className="form__form-group-label required">
                          Card Status
                        </span>
                        <div className="form__form-group-field">
                          <Field
                            id="cardStatus"
                            name="cardStatus"
                            placeholder="Kindly pick a card status"
                            component={renderSelectField}
                            options={CARD_STATUS_OPTIONS}
                            valueKey="value"
                            labelKey="label"
                          />
                        </div>
                      </div>
                    </Col>
                  </Row>

                  <ButtonToolbar className="form__button-toolbar">
                    {getBackButton({
                      limits: <Button type="button">Cancel</Button>,
                      customers: <Button type="button">Cancel</Button>,
                      userArrow: false
                    })}
                    <Button
                      color="primary"
                      id="submit-btn"
                      type="submit"
                      disabled={submitting || invalid}
                    >
                      {postcardcontrol && postcardcontrol.loading ? (
                        <span>
                          <Spinner size="sm" color="default" />{" "}
                        </span>
                      ) : null}
                      Submit
                    </Button>
                  </ButtonToolbar>
                </form>
              )}
            </div>
          )}
        </CardBody>
      </Card>
    </Col>
  );
});

CardLimitForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired
};

const selector = formValueSelector("card_control_form");

export default reduxForm({
  form: "card_control_form",
  validate,
  enableReinitialize: true
})(
  connect(state => ({
    postcardcontrol: state.postcardcontrol,
    duration: state.postcontrol.duration,
    frequency: state.postcontrol.frequency,
    amount: state.postcontrol.amount,
    startDate: selector(state, "startDate"),
    endDate: selector(state, "endDate")
  }))(CardLimitForm)
);
