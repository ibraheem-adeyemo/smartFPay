import React from "react";
import { Col, Card, CardBody, Spinner, Button, Badge } from "reactstrap";
import { Link } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import AccessControl from "../../../../shared/components/AccessControl";
import { permissionsConstants } from "../../../../constants/permissions.constants";

const UserView = props => {
  const { user, userId, fetchData } = props;
  const foundUser =
    user?.response && 
    !user.loading;
  const userObj =
    user?.response
      ||{};

const allRoles = user.response?.roles.map((role, index) => (<Badge key = {index} color="success" pill style={{marginRight: '10px', padding: '5px 10px'}}>{role.name}</Badge>))

  return (
    <Col>
      <Card>
        <CardBody>
        {!user?.loading && <div className="card__title">
            <h5 className="bold-text">
              <Link to="/users" id="link-all-users">
                <MdArrowBack size={20} /> Back to users
              </Link>
            </h5>
          </div>}
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

              <dl className="row" style={{fontSize: '18px'}}>
              <dt className="col-sm-2">ID</dt>
                <dd className="col-sm-10">
                  <p>{userObj.id}</p>
                </dd>

                <dt className="col-sm-2">First Name</dt>
                <dd className="col-sm-10">
                  <p>{userObj.firstName}</p>
                </dd>

                <dt className="col-sm-2">Last Name</dt>
                <dd className="col-sm-10">
                  <p>{userObj.lastName}</p>
                </dd>

                <dt className="col-sm-2">Email</dt>
                <dd className="col-sm-10">
                  <p>{userObj.email}</p>
                </dd>

                <dt className="col-sm-2">Status</dt>
                <dd className="col-sm-10">
                  <p>{userObj.disabled ? (<Badge color="danger" pill style={{marginRight: '10px', padding: '5px 10px'}}>Disabled</Badge>) : (<Badge color="success" pill style={{marginRight: '10px', padding: '5px 10px'}}>Enabled</Badge>)}</p>
                </dd>

                <dt className="col-sm-2">Roles</dt>
                <dd className="col-sm-10">
                  <p>{allRoles}</p>
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
        </CardBody>
      </Card>
    </Col>
  );
};

export default UserView;
