import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { checkPermissions } from "../../utils/accessControl";
import NoAccess from "./NoAccess";

const PermissionedRoute = ({
  component: Component,
  allowedPermissions,
  permissions,
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      checkPermissions(permissions, allowedPermissions) ? (
        <Component {...props} />
      ) : (
        <NoAccess allowedPermissions={allowedPermissions} {...props} />
      )
    }
  />
);

export default connect(state => ({
  permissions: state.permissions && state.permissions.response.permissions
}))(PermissionedRoute);
