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
import renderToggleButtonField from "../../../../shared/components/form/ToggleButton";
import renderDatePickerField from "../../../../shared/components/form/DatePicker";
import {FREQUENCY_OPTIONS} from '../../../../constants/app.constants';

const LimitForm = memo(props => {
  const {
    dispatch,
    handleSubmit,
    invalid,
    submitting,
    controlId,
    control,
    postcontrol,
    location,
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
          {controlId && control?.loading ? (
            <div className="text-center">
              <Spinner
                color="success"
                className="my-4"
                style={{ width: "6rem", height: "6rem" }}
              />
              <h4 className="text-secondary">
                Fetching account limit
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
                  {postcontrol?.error?.errors?.length ? (
                    <UncontrolledAlert color="danger">
                      <h5 className="font-weight-bold">
                        Please check the following fields for errors
                      </h5>
                      {postcontrol.error.errors.map(err => (
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
                            dateFormat="dd-MM-yyyy h:mm:ss"
                            minDate={new Date()}
                            timeFormat="HH:mm"
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
                            dateFormat="dd-MM-yyyy h:mm aa"
                            minDate={new Date()}
                            timeFormat="HH:mm"
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
                        <span className="form__form-group-label">Interbank Transaction</span>
                        <div className="form__form-group-field">
                          <div>
                        <Field
                          id="interbankTransaction"
                          name="interbankTransaction"
                          component={renderToggleButtonField}
                          defaultChecked={control?.response?.interbankTransaction || true}
                        />
                          </div>
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
                      {postcontrol && postcontrol.loading ? (
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

LimitForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired
};

const selector = formValueSelector("control_form");

export default reduxForm({
  form: "control_form",
  validate,
  enableReinitialize: true
})(
  connect(state => ({
    postcontrol: state.postcontrol,
    duration: state.postcontrol.duration,
    frequency: state.postcontrol.frequency,
    amount: state.postcontrol.amount,
    startDate: selector(state, "startDate"),
    endDate: selector(state, "endDate")
  }))(LimitForm)
);
