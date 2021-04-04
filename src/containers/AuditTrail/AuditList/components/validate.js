const validate = values => {
    const errors = {};

    if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = "Invalid email address";
    }

    // if (!values.startDate) {
    //     errors.startDate = "Kindly select a start date and time";
    // }
    // if (!values.endDate) {
    //     errors.endDate = "Kindly select an end date and time";
    // }

    //console.log(errors);
    return errors;
}

export default validate;
