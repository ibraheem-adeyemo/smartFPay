const validate = values => {
    const errors = {};
    if (!values.role_name) {
      errors.role_name = "Role name field shouldn’t be empty";
    } else if (values.role_name && !/^[A-Za-z_]+$/g.test(values.role_name)) {
      errors.role_name = "Only alphabets allowed";
    }

    if (!values.permissions) {
      errors.permissions = "At least one permission is required";
    }
    console.log(errors)
    return errors;
  };
  
  export default validate;
  