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
    errors.frequency = "Kindly select a limit frequency";
  }

  // if (!values.startDate) {
  //   errors.startDate = "Kindly select a start date and time";
  // }
  // if (!values.endDate) {
  //   errors.endDate = "Kindly select an end date and time";
  // }
  if (!values.cardStatus) {
    errors.cardStatus = "Kindly select a card status";
  }
  if (!values.channels) {
    errors.channels = "At least one channel is required";
  }
  if (!values.enabledCountries) {
    errors.enabledCountries = "At least one country is required";
  }
  return errors;
};

export default validate;
