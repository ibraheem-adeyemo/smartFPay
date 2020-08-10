import { connect } from "react-redux";

const checkPermissions = (userPermissions, allowedPermissions) => {
  // const permissions = userPermissions && userPermissions.map(permission => permission.authority);
  console.log('User parm', userPermissions)
  const permissions =
    userPermissions && userPermissions[0] !== "<" && userPermissions.map?.(permission => permission);
  if (allowedPermissions.length === 0) {
    return true;
  }

  return permissions && permissions.some(permission =>
    allowedPermissions.includes(permission)
  );
};

const AccessControl = ({
  userPermissions,
  allowedPermissions,
  children,
  renderNoAccess
}) => {
  const permitted = checkPermissions(userPermissions, allowedPermissions);

  if (permitted) {
    return children;
  }
  return renderNoAccess();
};

AccessControl.defaultProps = {
  allowedPermissions: [],
  userPermissions: [],
  renderNoAccess: () => null
};

// Compose AccessControl component with redux

export default connect(state => ({
  userPermissions: state.permissions && state.permissions.response
}))(AccessControl);
