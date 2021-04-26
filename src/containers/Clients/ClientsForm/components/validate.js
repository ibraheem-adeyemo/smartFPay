const validate = values => {
    const errors = {};
    if (!values.clientName) {
      errors.clientName = "Please enter a client name";
    }
    return errors;
  };
  
  export default validate;
  