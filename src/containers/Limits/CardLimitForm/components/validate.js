const validate = values => {
    const errors = {};
    if (!values.duration) {
      errors.duration = "Duration field shouldn’t be empty";
    } else if (values && values.duration && values.duration < 3) {
      errors.role_name = "Enter a duration that's greater than three";
    } else if (values.duration && !/^[0-9 ]+$/g.test(values.duration)) {
      errors.duration = "Only numbers allowed";
    }

    if (!values.amount) {
      errors.amount = "Amount field shouldn’t be empty";
    } else if (values && (values.amount && values.amount <= 0 || values.amount > 1000000)) {
      errors.amount = "Enter an amount that is lessaer than 1,000,000 and greater than 0";
    } else if (values.amount && !/^[0-9 ]+$/g.test(values.amount)) {
      errors.amount = "Only numbers allowed";
    }

    if (!values.frequency) {
      errors.frequency = "Please select a limit frequency";
    }

    if (!values.startDate) {
      errors.startDate = "Please enter a start date";
    }
    if (!values.endDate) {
      errors.endDate = "Please enter an end date";
    }
    console.log(errors)
    return errors;
  };
  
  export default validate;
  