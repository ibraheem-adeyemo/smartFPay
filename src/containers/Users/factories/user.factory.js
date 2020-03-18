export const createRequestBody = (values, currentUser, id, userToEdit) => {
  const { domains, domainCode, domainName, domainId } = currentUser.response;

  const domainObject = domains.filter(domain => domain.code === domainCode);

  const requestObject = {
    active: true,
    admin: true,
    domainCode: values.domains ? values.domains.code : domainCode,
    domainId: values.domains ? values.domains.id : domainId,
    domainName: values.domains ? values.domains.name : domainName,
    domains: values.domains ? [values.domains] : domainObject,
    email: values.email,
    firstName: values.first_name,
    lastName: values.last_name,
    mobileNo: values.phone_number,
    roleId: values.roles && values.roles.id,
    roles: values.roles && [values.roles],
    username: id ? userToEdit.data[0].username : values.email
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
