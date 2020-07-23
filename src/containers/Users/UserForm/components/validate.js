const validate = values => {
  const errors = {};
  if (!values.first_name) {
    errors.first_name = "Firstname field shouldn’t be empty";
  } else if (values && values.first_name && values.first_name.length < 3) {
    errors.first_name = "Enter a minimum of three characters";
  } else if (values.first_name && !/^[A-Za-z- ]+$/g.test(values.first_name)) {
    errors.first_name = "Only alphabets allowed";
  }

  if (!values.last_name) {
    errors.last_name = "Lastname field shouldn’t be empty";
  } else if (values && values.last_name && values.last_name.length < 3) {
    errors.last_name = "Enter a minimum of three characters";
  } else if (values.last_name && !/^[A-Za-z- ]+$/g.test(values.last_name)) {
    errors.last_name = "Only alphabets allowed";
  }

  if (!values.email) {
    errors.email = "Email field shouldn’t be empty";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!values.roles) {
    errors.roles = "Please select a role";
  }

  return errors;
};

export default validate;
