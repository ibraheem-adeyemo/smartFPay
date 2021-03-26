const validate = values => {
    const errors = {};

    if (values.accountNumber && values?.accountNumber?.length !== 10) {
        errors.accountNumber = "Enter a valid account number";
    } else if (values.accountNumber && !/^[0-9 ]+$/g.test(values.accountNumber)) {
        errors.accountNumber = "Only numbers allowed";
    }

    // if (values.accountName && values.accountName.length < 3) {
    //     errors.accountName = "Enter a minimum of three characters";
    //   } else if (values.accountName && !/^[A-Za-z- ]+$/g.test(values.accountName)) {
    //     errors.accountName = "Only alphabets allowed";
    //   }

    // if (!values.startDate) {
    //     errors.startDate = "Kindly select a start date and time";
    // }
    // if (!values.endDate) {
    //     errors.endDate = "Kindly select an end date and time";
    // }
    return errors;
}

export default validate;
