const validate = (values, props) => {
  const errors = {};
  if (!values.roles) {
    errors.roles = "Please select a role";
  }
  if (values.roles && values.roles.id === props.user.response.roleId) {
    errors.roles = "Selected role is same as current role";
  }
  return errors;
};

export default validate;
