const validate = values => {
    const errors = {};

    if (!values.channel) {
        errors.channel = "Channel field shouldn’t be empty";
      } else if (values.channel && !/^[A-Za-z_]+$/g.test(values.channel)) {
        errors.channel = "Only alphabets allowed";
      }

    console.log(errors);
    return errors;
}

export default validate;
