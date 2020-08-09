export const createRequestBody = (values, currentUser, id, userToEdit) => {
  console.log('User to edut', userToEdit)
  const requestObject = id? {
    id: id,
    disabled: !values.disabled,
    email: values.email,
    firstName: values.first_name,
    lastName: values.last_name,
    roles: values?.roles.map((role) => role.name)
  } :{
    id: id,
    disabled: values.disabled,
    email: values.email,
    firstName: values.first_name,
    lastName: values.last_name,
    roles: values?.roles.map((role) => role.name),
  };

  if (id && userToEdit && userToEdit.data && userToEdit.data.length) {
    requestObject.id = userToEdit.data[0].id;
  }

  console.log()

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
