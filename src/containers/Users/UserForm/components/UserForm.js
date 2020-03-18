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
import { Field, reduxForm, clearFields } from "redux-form";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { MdArrowBack } from "react-icons/md";
import { Link } from "react-router-dom";
import { renderField } from "../../../../utils/renderfield";
import validate from "./validate";
import AccessControl from "../../../../shared/components/AccessControl";
import DomainDropDown from "../../../Domains/DomainDropDown";
import RolesSelect from "../../../Roles/RolesSelect";
import {
  resetRoles,
  /* addRolesToStore,
  removeRolesFromStore, */
  getRoles
} from "../../../Roles/actions/roles.actions";
import { resetPostUser } from "../../actions/user.actions";

import { accessControlFn } from "../../../../utils/accessControl";
import { permissionsConstants } from "../../../../constants/permissions.constants";

const UserForm = memo(props => {
  const {
    dispatch,
    handleSubmit,
    permissions,
    reset,
    pristine,
    invalid,
    submitting,
    userId,
    user,
    postuser
  } = props;

  const foundUser =
    user &&
    user.response &&
    user.response.data &&
    user.response.data.length &&
    !user.loading;

  const resetForm = () => {
    reset();
    accessControlFn(permissions, [permissionsConstants.ASSIGN_USER_ROLE], () =>
      dispatch(resetRoles())
    );
  };

  useEffect(() => {
    dispatch(resetPostUser());
    return () => {
      dispatch(resetPostUser());
    };
  }, [dispatch]);

  const getRolesFromDomain = selectedDomain => {
    dispatch(clearFields("user_form", true, true, "roles"));

    if (selectedDomain) {
      dispatch(getRoles(selectedDomain.code));
    } else {
      dispatch(resetRoles());
    }
  };
  return (
    <Col md={12} lg={12}>
      <Card>
        <CardBody>
          <div className="card__title">
            <h5 className="bold-text">
              <Link to="/users" id="link-all-users">
                <MdArrowBack size={20} /> Back to users
              </Link>
            </h5>
          </div>
          {userId && user && user.loading ? (
            <div className="text-center">
              <Spinner
                color="success"
                className="my-4"
                style={{ width: "6rem", height: "6rem" }}
              />
              <h4 className="text-secondary">
                Fetching user with username ({userId})
              </h4>
            </div>
          ) : (
            <div>
              {userId && !foundUser ? (
                <h4 className="text-danger">
                  {user && user.error
                    ? `Something went wrong. Could not fetch user with username (${userId})`
                    : `User with username (${userId}) not found`}
                </h4>
              ) : (
                <form className="form" onSubmit={handleSubmit}>
                  {postuser &&
                  postuser.error &&
                  postuser.error.errors &&
                  postuser.error.errors.length ? (
                    <UncontrolledAlert color="danger">
                      <h5 className="font-weight-bold">
                        Please check the following fields for errors
                      </h5>
                      {postuser.error.errors.map(err => (
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
                          First name
                        </span>
                        <div className="form__form-group-field">
                          <Field
                            id="first_name"
                            name="first_name"
                            component={renderField}
                            type="text"
                            placeholder="first name"
                          />
                        </div>
                      </div>
                    </Col>
                    <Col lg="4">
                      <div className="form__form-group">
                        <span className="form__form-group-label required">
                          Last name
                        </span>
                        <div className="form__form-group-field">
                          <Field
                            id="last_name"
                            name="last_name"
                            component={renderField}
                            type="text"
                            placeholder="last name"
                          />
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="4">
                      <div className="form__form-group">
                        <span className="form__form-group-label required">
                          Email address
                        </span>
                        <div className="form__form-group-field">
                          <Field
                            id="email"
                            name="email"
                            disabled={userId}
                            component={renderField}
                            type="email"
                            placeholder="email address"
                          />
                        </div>
                      </div>
                    </Col>
                    <Col lg="4">
                      <div className="form__form-group">
                        <span className="form__form-group-label">
                          Phone number
                        </span>
                        <div className="form__form-group-field">
                          <Field
                            id="phone_number"
                            name="phone_number"
                            component={renderField}
                            type="tel"
                            placeholder="phone number"
                          />
                        </div>
                      </div>
                    </Col>
                  </Row>
                  {!userId && (
                    <Row>
                      <AccessControl
                        allowedPermissions={[
                          permissionsConstants.VIEW_DOMAINS_ROLE
                        ]}
                        renderNoAccess={() => null}
                      >
                        <Col lg="4">
                          <DomainDropDown
                            required
                            id="domain"
                            onChange={getRolesFromDomain}
                            label="Add user to domain"
                          />
                        </Col>
                      </AccessControl>

                      <Col lg="4">
                        <RolesSelect
                          required
                          id="role-select"
                          label="Assign roles to user"
                        />
                      </Col>
                    </Row>
                  )}

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
                      {postuser && postuser.loading ? (
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

UserForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired
};

export default reduxForm({
  form: "user_form",
  validate,
  enableReinitialize: true
})(
  connect(state => ({
    postuser: state.postuser,
    permissions: state.permissions && state.permissions.response
  }))(UserForm)
);