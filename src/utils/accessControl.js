export const checkPermissions = (userPermissions = [], allowedPermissions) => {
  // const permissions =
  //   userPermissions &&
  //   userPermissions.map(permission => permission && permission.authority);
  const permissions =
    userPermissions && userPermissions.map(permission => permission);
  if (allowedPermissions && allowedPermissions.length === 0) {
    return true;
  }
  return (
    permissions &&
    permissions.some(
      permission =>
        allowedPermissions && allowedPermissions.includes(permission)
    )
  );
};

export const accessControlFn = (
  userPermissions,
  allowedPermissions,
  fn,
  ...args
) => {
  const permitted = checkPermissions(userPermissions, allowedPermissions);
  if (permitted) {
    fn(...args);
  }
};
