const validate = values => {
    const errors = {};

    if (values.customerName && values.customerName.length < 3) {
        errors.customerName = "Enter a minimum of three characters";
      } else if (values.customerName && !/^[A-Za-z- ]+$/g.test(values.customerName)) {
        errors.customerName = "Only alphabets allowed";
      }

    if (values.accountNumber && values?.accountNumber?.length !== 10) {
        errors.accountNumber = "Enter a valid account number";
    } else if (values.accountNumber && !/^[0-9 ]+$/g.test(values.accountNumber)) {
        errors.accountNumber = "Only numbers allowed";
    }

    if (values.limitId && values.limitId <= 0) {
        errors.limitId = "Enter a valid limit Id";
    }
    if (values.decline && values.decline <= 0) {
        errors.decline = "Enter a valid decline";
    }

    // if (!values.startDate) {
    //     errors.startDate = "Kindly select a start date and time";
    // }
    // if (!values.endDate) {
    //     errors.endDate = "Kindly select an end date and time";
    // }

    console.log(errors);
    return errors;
}

export default validate;
