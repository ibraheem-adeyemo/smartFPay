const validate = values => {
  const errors = {};
  if (!values.first_name) {
    errors.first_name = "Firstname field shouldn’t be empty";
  }
  if (!values.last_name) {
    errors.last_name = "Lastname field shouldn’t be empty";
  }
  if (!values.email) {
    errors.email = "Email field shouldn’t be empty";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!values.phone_number) {
    errors.phone_number = "Phone number field shouldn’t be empty";
  } else if (!/^(\d{11})$/.test(values.phone_number)) {
    errors.phone_number = "Invalid phone number";
  }
  if (!values.domains) {
    errors.domains = "Please select a domain";
  }
  if (!values.roles) {
    errors.roles = "Please select a role";
  }
  return errors;
};

export default validate;
