const validate = values => {
    const errors = {};

    if (!values.channel?.length) {
        errors.channel = "Please select one or more channels";
      }
    return errors;
}

export default validate;
