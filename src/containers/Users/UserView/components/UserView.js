import React from "react";
import { Col, Card, CardBody, Spinner, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import AccessControl from "../../../../shared/components/AccessControl";
import { permissionsConstants } from "../../../../constants/permissions.constants";

const UserView = props => {
  const { user, userId, fetchData } = props;
  const foundUser =
    user.response &&
    user.response.data &&
    user.response.data.length &&
    !user.loading;
  const userObj =
    user.response && user.response.data && user.response.data.length
      ? user.response.data[0]
      : {};

  return (
    <Col>
      <Card>
        <CardBody>
          {foundUser ? (
            <div className="project-summary">
              <div className="card__title">
                <h4 className="bold-text">
                  {userObj.firstName} {userObj.lastName}
                </h4>
              </div>
              <AccessControl
                allowedPermissions={[permissionsConstants.UPDATE_USER]}
                renderNoAccess={() => null}
              >
                <Link
                  to={`/users/edit/${userId}`}
                  className="btn btn-sm btn-outline-secondary project-summary__btn"
                  id="link-edit-user"
                >
                  Edit
                </Link>
              </AccessControl>

              <dl className="row">
                <dt className="col-sm-2">Username</dt>
                <dd className="col-sm-10">
                  <p>{userObj.username}</p>
                </dd>

                <dt className="col-sm-2">Email</dt>
                <dd className="col-sm-10">
                  <p>{userObj.email}</p>
                </dd>

                <dt className="col-sm-2">Mobile number</dt>
                <dd className="col-sm-10">
                  <p>{userObj.mobileNo}</p>
                </dd>

                {/* <dt className="col-sm-2">Active</dt>
                <dd className="col-sm-10">
                  <p>
                    {userObj.active ? (
                      <span className="text-success">Active</span>
                    ) : (
                      <span className="text-danger">Inactive</span>
                    )}
                  </p>
                </dd> */}
                <dt className="col-sm-2">Domains</dt>
                <dd className="col-sm-10">
                  {userObj.domains && userObj.domains.length ? (
                    userObj.domains.map((domain, index) => (
                      <p key={index}>{domain.name}</p>
                    ))
                  ) : (
                    <p className="text-muted">-- No domains assigned --</p>
                  )}
                </dd>
                {/* <dt className="col-sm-2">Apps</dt>
                <dd className="col-sm-10">
                  {userObj.apps && userObj.app.length ? (
                    userObj.apps.map((app, index) => (
                      <p key={index}>{app.name}</p>
                    ))
                  ) : (
                    <p className="text-muted">-- No apps assigned --</p>
                  )}
                </dd>

                <dt className="col-sm-2">Roles</dt>
                <dd className="col-sm-10">
                  {userObj.roles && userObj.roles.length ? (
                    userObj.roles.map((role, index) => (
                      <p key={index}>{role.name}</p>
                    ))
                  ) : (
                    <p className="text-muted">-- No roles assigned --</p>
                  )}
                </dd> */}
              </dl>
            </div>
          ) : (
            <div className="text-center">
              {user && user.loading ? (
                <div>
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
                  <h4 className="text-danger">
                    {user.error
                      ? `Something went wrong. Could not fetch user with username (${userId})`
                      : `User with username (${userId}) not found`}
                  </h4>
                  <Button
                    color="primary"
                    id="btn-try-again"
                    outline
                    size="sm"
                    onClick={fetchData}
                  >
                    Try Again
                  </Button>
                </div>
              )}
            </div>
          )}
          {user && !user.loading ? (
            <h5 className="bold-text mt-4">
              <Link to="/users" id="link-all-users">
                <MdArrowBack size={20} /> Back to users
              </Link>
            </h5>
          ) : null}
        </CardBody>
      </Card>
    </Col>
  );
};

export default UserView;
