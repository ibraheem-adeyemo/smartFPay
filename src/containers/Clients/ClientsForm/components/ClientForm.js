import React, { memo } from "react";
import { 
  Card,
  CardBody,
  Row,
  Col,
  Button,
  ButtonToolbar,
  UncontrolledAlert,
Spinner } from "reactstrap";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { MdArrowBack } from "react-icons/md";
import { Link } from "react-router-dom";
import { renderField } from "../../../../utils/renderfield";
import validate from "./validate";

const RoleForm = memo(props => {
  const {
    handleSubmit,
    reset,
    pristine,
    invalid,
    submitting,
    disabled,
    clientsPost
  } = props;

  return (
    <Col md={12} lg={12}>
      <Card>
        <CardBody>
          <div className="card__title">
            <h5 className="bold-text">
              <Link to="/clients">
                <MdArrowBack size={20} /> Back to clients
              </Link>
            </h5>
          </div>
          <form className="form" onSubmit={handleSubmit}>
          {clientsPost?.error?.errors?.length ? (
                    <UncontrolledAlert color="danger">
                      <h5 className="font-weight-bold">
                        Please check the following fields for errors
                      </h5>
                      {clientsPost.error.errors.map(err => (
                        <p>
                          <strong>{err.field}:</strong> {err.message}
                        </p>
                      ))}
                    </UncontrolledAlert>
                  ) : null}
            <Row>
              <Col lg="4">
                <div className="form__form-group">
                  <span className="form__form-group-label required">Role name</span>
                  <div className="form__form-group-field">
                    <Field
                      id = "role_name"
                      name="role_name"
                      component={renderField}
                      disabled={disabled}
                      type="text"
                      placeholder="Role name"
                    />
                  </div>
                </div>
              </Col>
              <Col lg="4">
                </Col>
            </Row>
            <ButtonToolbar className="form__button-toolbar">
              <Button type="button" onClick={reset}
                      disabled={pristine || submitting}>
                Cancel
              </Button>
              <Button color="primary" type="submit"
                      disabled={submitting || invalid}>
              {clientsPost?.loading ? (
                        <span>
                          <Spinner size="sm" color="default" />{" "}
                        </span>
                      ) : null}
                      Submit
              </Button>
            </ButtonToolbar>
          </form>
        </CardBody>
      </Card>
    </Col>
  );
});

RoleForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired
};

export default reduxForm({
  form: "role_form",
  validate,
  enableReinitialize: true
})(
  connect(state => ({
    clientsPost: state.clientsPost,
  }))(RoleForm)
);
