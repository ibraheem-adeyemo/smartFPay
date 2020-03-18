export const createRequestBody = values => {
  const dateObj = values.dateOfBirth ? new Date(values.dateOfBirth) : null;
  const cardRequestType =
    values.cardRequestType && values.cardRequestType.value;
  let requestObject;
  if (cardRequestType && cardRequestType === "single") {
    requestObject = {
      accountType: values.accountType ? values.accountType.value : "",
      addressCity: values.addressCity,
      addressCountry: values.addressCountry
        ? values.addressCountry.alpha3Code
        : "",
      addressLine1: values.addressLine1,
      addressLine2: values.addressLine2,
      addressState: values.addressState,
      dateOfBirth: dateObj
        ? `${dateObj.getFullYear()}${("0" + (dateObj.getMonth() + 1)).slice(
            -2
          )}${("0" + dateObj.getDate()).slice(-2)}`
        : "",
      emailAddress: values.emailAddress,
      enrollmentNo: values.enrollmentNo,
      firstName: values.firstName,
      identificationNo: values.identificationNo,
      lastName: values.lastName,
      lostOrStolen: false,
      mobileNo: `${
        values.countryCode.charAt(0) === "+"
          ? values.countryCode
          : "+" + values.countryCode
      }${values.mobileNo.charAt(0) === "0" ? values.mobileNo.substr(1) : values.mobileNo}`,
      nameOnCard: values.nameOnCard,
      title: values.title ? values.title.value : ""
    };
  } else if (cardRequestType && cardRequestType === "bulk") {
    requestObject = {
      excelFile: values.excelFile
    };
  }

  return requestObject;
};
