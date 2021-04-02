const validate = values => {
    const errors = {};

    if (!values.channel) {
        errors.channel = "Channel field shouldn’t be empty";
      }
    return errors;
}

export default validate;
