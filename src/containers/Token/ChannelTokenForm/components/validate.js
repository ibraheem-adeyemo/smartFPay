const validate = values => {
    const errors = {};

    if (!values.channel) {
        errors.channel = "Please select a channel";
      }
    return errors;
}

export default validate;
