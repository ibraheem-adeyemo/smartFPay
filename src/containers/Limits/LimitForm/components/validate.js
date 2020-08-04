const validate = values => {
    const errors = {};
    if (!values.duration) {
      errors.duration = "Transaction limit count field should noy be empty";
    } else if (values && (values?.duration <= 0 || values?.duration > 1000)) {
      errors.duration = "Enter a limit count that is between 0 and 1000";
    } else if (values.duration && !/^[0-9 ]+$/g.test(values.duration)) {
      errors.duration = "Only numbers allowed";
    }

    if (!values.amount) {
      errors.amount = "Amount field should not be empty";
    } else if (values && (values?.amount <= 0 || values?.amount > 1000000)) {
      errors.amount = "Enter an amount that is between 0 and 1,000,000";
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
  