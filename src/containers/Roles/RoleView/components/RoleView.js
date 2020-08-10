import React from "react";
import { Col, Card, CardBody, Spinner, Button, Badge } from "reactstrap";
import { Link } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import AccessControl from "../../../../shared/components/AccessControl";
import { permissionsConstants } from "../../../../constants/permissions.constants";
import { permissionsNameSpace } from "../../constants/roles.constants";

const RoleView = props => {
  const {location} = props;
  const foundRole = location.state?.role
  const roleObj =
  location.state?.role
      ? location.state?.role
      : {};

const allPermissions = location.state?.role.permissions.map((permission, index) => (<Badge key = {index} color="success" pill style={{marginRight: '10px', padding: '5px 10px'}}>{permission.name}</Badge>))

  return (
    <Col>
      <Card>
        <CardBody>
        {foundRole ? (<div className="card__title">
            <h5 className="bold-text">
            <Link to="/roles" id="link-all-roles">
                <MdArrowBack size={20} /> Back to roles
              </Link>
            </h5>
          </div>):null}
          {foundRole ? (
            <div className="project-summary">
              {/* <div className="card__title">
                <h4 className="bold-text">
                  {roleObj.id}
                </h4>
              </div> */}
              <AccessControl
                allowedPermissions={[permissionsConstants.VIEW_ADMIN]}
                renderNoAccess={() => null}
              >
                <Link
                  to={{
                      pathname:"/roles/edit/" + roleObj.id,
                      state: {role:roleObj}
                    }}
                  className="btn btn-sm btn-outline-secondary project-summary__btn"
                  id="link-edit-role"
                >
                  Edit
                </Link>
              </AccessControl>

              <dl className="row" style={{fontSize: '18px'}}>
                <dt className="col-sm-4">ID</dt>
                <dd className="col-sm-8">
                  <p>{roleObj.id}</p>
                </dd>
                <dt className="col-sm-4">Name</dt>
                <dd className="col-sm-8">
                  <p>{roleObj.name}</p>
                </dd>
                <dt className="col-sm-4">Permissions</dt>
                <dd className="col-sm-8">
                  <p>{allPermissions}</p>
                </dd>
              </dl>
            </div>
          ) : ( <div>
                  <h4 className="text-danger">
                    {!foundRole
                      ? `Something went wrong. Could not find role with id (${roleObj.id})`
                      : `Role with id (${roleObj.id}) not found`}
                  </h4>
                </div>
          )}
        </CardBody>
      </Card>
    </Col>
  );
};

export default RoleView;
