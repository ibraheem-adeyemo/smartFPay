import React, { memo, useEffect } from "react";
import { 
  Card,
  CardBody,
  Row,
  Col,
  Button,
  ButtonToolbar,
Spinner } from "reactstrap";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { MdArrowBack } from "react-icons/md";
import { Link } from "react-router-dom";
import { renderField } from "../../../../utils/renderfield";
import { resetPostRole } from "../../actions/roles.actions";
import validate from "./validate";

const RoleForm = memo(props => {
  const {
    dispatch,
    handleSubmit,
    reset,
    pristine,
    invalid,
    submitting,
    postrole } = props;

  const resetForm = () => {
    reset();
  }

  useEffect(() => {
    dispatch(resetPostRole());
    return () => {
      dispatch(resetPostRole());
    };
  }, [dispatch]);

  return (
    <Col md={12} lg={12}>
      <Card>
        <CardBody>
          <div className="card__title">
            <h5 className="bold-text">
              <Link to="/roles">
                <MdArrowBack size={20} /> Back to roles
              </Link>
            </h5>
          </div>
          <form className="form" onSubmit={handleSubmit}>
            <Row>
              <Col lg="4">
                <div className="form__form-group">
                  <span className="form__form-group-label">Role name</span>
                  <div className="form__form-group-field">
                    <Field
                      name="role_name"
                      component="input"
                      type="text"
                      placeholder="Role name"
                    />
                  </div>
                </div>
              </Col>
            </Row>

            <ButtonToolbar className="form__button-toolbar">
              <Button type="button" onClick={reset}
                      disabled={pristine || submitting}>
                Cancel
              </Button>
              <Button color="primary" type="submit"
                      disabled={submitting || invalid}>
              {postrole && postrole.loading ? (
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
    postrole: state.postrole,
    permissions: state.permissions && state.permissions.response
  }))(RoleForm)
);
