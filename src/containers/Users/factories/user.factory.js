export const createRequestBody = (values, currentUser, id, userToEdit) => {
  const { domains, domainCode, domainName, domainId } = currentUser.response;

  const requestObject = {
    email: values.email,
    firstName: values.first_name,
    lastName: values.last_name,
    roles: values?.roles.map((role) => role.name),
  };

  if (id && userToEdit && userToEdit.data && userToEdit.data.length) {
    requestObject.id = userToEdit.data[0].id;
  }

  return requestObject;
};

export const createRoleRequest = (values, userToEdit) => {
  return {
    domainCode: userToEdit.domainCode,
    roleId: values.roles.id,
    roleName: values.roles.name,
    username: userToEdit.username
  };
};
