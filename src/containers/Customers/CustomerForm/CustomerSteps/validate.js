const validate = values => {
    const errors = {};
    if (!values.accountNumber) {
      errors.accountNumber = "Account Number field shouldn’t be empty";
    } else if (values?.accountNumber?.length !== 10) {
      errors.accountNumber = "Enter a valid account number";
    } else if (values.accountNumber && !/^[0-9 ]+$/g.test(values.accountNumber)) {
      errors.accountNumber = "Only numbers allowed";
    }

    console.log(errors)
    return errors;
  };
  
  export default validate;
  