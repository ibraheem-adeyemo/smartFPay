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
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { MdArrowBack } from "react-icons/md";
import { Link } from "react-router-dom";
import { renderField } from "../../../../utils/renderfield";
import validate from "./validate";
import RolesSelect from "../../../Roles/RolesSelect";
import { resetPostLimitControl } from "../../actions/limits.actions";

const LimitForm = memo(props => {
  const {
    dispatch,
    handleSubmit,
    reset,
    pristine,
    invalid,
    submitting,
    controlId,
    control,
    postcontrol
  } = props;

  const foundControl =
    control &&
    control.response &&
    control.response.data &&
    control.response.data.length &&
    !control.loading;

  const resetForm = () => {
    reset();
  };

  useEffect(() => {
    dispatch(resetPostLimitControl());
    return () => {
      dispatch(resetPostLimitControl());
    };
  }, [dispatch]);

  return (
    <Col md={12} lg={12}>
      <Card>
        <CardBody>
          <div className="card__title">
            <h5 className="bold-text">
              <Link to="/limit-requests" id="link-all-limits">
                <MdArrowBack size={20} /> Back to limits
              </Link>
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
                Fetching limit with id ({controlId})
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
                  {postcontrol &&
                  postcontrol.error &&
                  postcontrol.error.errors &&
                  postcontrol.error.errors.length ? (
                    <UncontrolledAlert color="danger">
                      <h5 className="font-weight-bold">
                        Please check the following fields for errors
                      </h5>
                      {postcontrol.error.errors.map(err => (
                        <p>
                          <strong>{err.fieldName}:</strong> {err.message}
                        </p>
                      ))}
                    </UncontrolledAlert>
                  ) : null}
                  <Row>
                    <Col lg="4">
                      <div className="form__form-group">
                        <span className="form__form-group-label required">
                          Duration
                        </span>
                        <div className="form__form-group-field">
                          <Field
                            id="duration"
                            name="duration"
                            component={renderField}
                            type="number"
                            placeholder="duration"
                          />
                        </div>
                      </div>
                    </Col>
                    <Col lg="4">
                      <div className="form__form-group">
                        <span className="form__form-group-label required">
                          Frequency
                        </span>
                        <div className="form__form-group-field">
                          <Field
                            id="frequency"
                            name="frequency"
                            component={renderField}
                            type="text"
                            placeholder="frequency"
                          />
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="4">
                      <div className="form__form-group">
                        <span className="form__form-group-label required">
                          Amount
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
                  </Row>

                  <ButtonToolbar className="form__button-toolbar">
                    <Button
                      type="button"
                      id="reset-form"
                      onClick={resetForm}
                      disabled={pristine || submitting}
                    >
                      Cancel
                    </Button>
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

export default reduxForm({
  form: "control_form",
  validate,
  enableReinitialize: true
})(
  connect(state => ({
    postcontrol: state.postcontrol,
  }))(LimitForm)
);
