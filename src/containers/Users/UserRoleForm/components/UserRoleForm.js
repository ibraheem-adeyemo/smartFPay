import React, { memo } from "react";
import {
  Card,
  CardBody,
  Row,
  Col,
  Button,
  ButtonToolbar,
  Alert,
  Spinner
} from "reactstrap";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { MdArrowBack } from "react-icons/md";
import { Link } from "react-router-dom";
import validateRoles from "./validateRoles";
import RolesSelect from "../../../Roles/RolesSelect";
import { toggleUser } from "../../actions/user.actions";
import AccessControl from "../../../../shared/components/AccessControl";
import { permissionsConstants } from "../../../../constants/permissions.constants";
import UserDomainSelectForm from "./UserDomainSelectForm";

const UserForm = memo(props => {
  const {
    handleSubmit,
    reset,
    pristine,
    submitting,
    userId,
    dispatch,
    toggleuser,
    user,
    selectedUserDomains,
    postuser
  } = props;

  const resetForm = () => {
    reset();
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
          {selectedUserDomains && selectedUserDomains.length > 1 ? (
            <UserDomainSelectForm selectedUserDomains={selectedUserDomains} />
          ) : (
            ""
          )}
          {userId && user && user.loading ? (
            <div className="text-center">
              <Spinner
                color="success"
                className="my-4"
                style={{ width: "6rem", height: "6rem" }}
              />
              <h4 className="text-secondary">
                Fetching roles for user with username ({userId})
              </h4>
            </div>
          ) : (
            <div>
              {user && user.error ? (
                <div>
                  {!!user.error.message ? (
                    <Alert color="danger">{user.error.message}</Alert>
                  ) : (
                    <h4 className="text-danger">
                      Something went wrong. Could not fetch user with username (
                      {userId})
                    </h4>
                  )}
                </div>
              ) : user && user.response ? (
                <div>
                  <dl className="row">
                    <dt className="col-sm-2">Username</dt>
                    <dd className="col-sm-10">
                      <p>{user.response && user.response.username}</p>
                    </dd>
                    <dt className="col-sm-2">Current Role</dt>
                    <dd className="col-sm-10">
                      <p>{user.response && user.response.roleName}</p>
                    </dd>
                    <dt className="col-sm-2">Current Domain</dt>
                    <dd className="col-sm-10">
                      <p>{user.response && user.response.domainCode}</p>
                    </dd>
                    <dt className="col-sm-2">Status</dt>
                    <dd className="col-sm-10">
                      <p>
                        {user.response && user.response.enabled ? (
                          <span className="text-success">Active</span>
                        ) : (
                          <span className="text-danger">Inactive</span>
                        )}
                      </p>
                    </dd>
                  </dl>
                  {user.response && user.response.enabled ? (
                    <form className="form" onSubmit={handleSubmit}>
                      <Row>
                        <Col lg="4">
                          <AccessControl
                            allowedPermissions={[
                              permissionsConstants.CHANGE_USER_ROLE
                            ]}
                            renderNoAccess={() => (
                              <Alert color="danger">
                                You do not have access to change a user's role
                              </Alert>
                            )}
                          >
                            <RolesSelect
                              required
                              domainCode={
                                user.response && user.response.domainCode
                              }
                              label="Change user's role"
                            />
                          </AccessControl>
                        </Col>
                      </Row>

                      <ButtonToolbar className="form__button-toolbar">
                        <Button
                          type="button"
                          id="btn-reset"
                          onClick={resetForm}
                          disabled={pristine || submitting}
                        >
                          Cancel
                        </Button>
                        <Button
                          id="btn-submit"
                          color="primary"
                          type="submit"
                          disabled={pristine || submitting}
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
                  ) : (
                    <Row>
                      <Col lg="4">
                        <Alert color="danger">
                          <Row>
                            <Col lg="7">
                              <p className="font-weight-bold">
                                This user is currently disabled
                              </p>
                              <small>
                                To change role, please re-enabled this user
                              </small>
                            </Col>
                            <Col lg="5">
                              {user && user.response && (
                                <Button
                                  size="sm"
                                  id="btn-enable-user"
                                  className="mb-0"
                                  color="danger"
                                  onClick={() =>
                                    dispatch(
                                      toggleUser(
                                        user.response.username,
                                        user.response.enabled,
                                        "refreshMapping",
                                        null,
                                        user.response.domainCode
                                      )
                                    )
                                  }
                                >
                                  {toggleuser.loading ? (
                                    <Spinner size="sm" />
                                  ) : (
                                    <span>Enable</span>
                                  )}
                                </Button>
                              )}
                            </Col>
                          </Row>
                        </Alert>
                      </Col>
                    </Row>
                  )}
                </div>
              ) : (
                ""
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
  form: "userrole_form",
  validate: validateRoles,
  enableReinitialize: true
})(
  connect(state => ({
    postuser: state.editRole,
    toggleuser: state.toggleuser
  }))(UserForm)
);
