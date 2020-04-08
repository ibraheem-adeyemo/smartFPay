const validate = values => {
    const errors = {};
    if (!values.role_name) {
      errors.role_name = "Role name field shouldn’t be empty";
    } else if (values && values.role_name && values.role_name.length < 3) {
      errors.role_name = "Enter a minimum of three characters";
    } else if (values.role_name && !/^[A-Za-z- ]+$/g.test(values.role_name)) {
      errors.role_name = "Only alphabets allowed";
    }
    return errors;
  };
  
  export default validate;
  