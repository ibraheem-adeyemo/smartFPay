import { MAX_BATCH_FILE_SIZE } from "../../../../../../constants/app.constants";
import { appUtils } from "../../../../../../utils/app.utils";

export const validateCustomerInformation = values => {
  const errors = {};
  if (!values.cardRequestType) {
    errors.cardRequestType = "Please select a card request type";
  }
  if (values.cardRequestType && values.cardRequestType.value === "single") {
    if (!values.title) {
      errors.title = "Please select a title";
    }
    if (!values.firstName) {
      errors.firstName = "Please enter firstname";
    } else if(values.firstName && !/^[A-Za-z- ]+$/g.test(values.firstName)){
      errors.firstName = "Invalid character entered"
    }
    
    if (!values.lastName) {
      errors.lastName = "Please enter lastname";
    }  else if(values.lastName && !/^[A-Za-z- ]+$/g.test(values.lastName)){
      errors.lastName = "Only alphabets allowed"
    }
    if (!values.dateOfBirth) {
      errors.dateOfBirth = "Please enter date of birth";
    }
    if (!values.mobileNo) {
      errors.mobileNo = "Please enter mobile number";
    } else if (!/^(\0?)(\d{7,13})$/.test(values.mobileNo)) {
      errors.mobileNo = "Invalid mobile number";
    }
    if (!values.countryCode) {
      errors.countryCode = "Please enter a country code";
    } else if (!/^(\+?)(\d{2,3})$/.test(values.countryCode)) {
      errors.countryCode = "Invalid country code";
    }
    if (!values.emailAddress) {
      errors.emailAddress = "Please enter an email address";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.emailAddress)
    ) {
      errors.emailAddress = "Invalid email address";
    }

    if (!values.addressLine1) {
      errors.addressLine1 = "Please enter address line 1";
    }
    if (!values.addressCity) {
      errors.addressCity = "Please enter city";
    }
    if (!values.addressState) {
      errors.addressState = "Please enter your state of residence";
    }
    if (!values.addressCountry) {
      errors.addressCountry = "Please select a country";
    }

    if (!values.accountType) {
      errors.accountType = "Please select account type";
    }
    if (!values.enrollmentNo) {
      errors.enrollmentNo = "Please enter enrollment number";
    } else if(values.enrollmentNo && values.enrollmentNo.length > 20){
      errors.enrollmentNo = "Enter a maximum of 20 characters"
    }
    if (!values.identificationNo) {
      errors.identificationNo = "Please enter identification number";
    } else if(values.identificationNo && values.identificationNo.length > 20){
      errors.identificationNo = "Enter a maximum of 20 characters"
    }
    if (!values.nameOnCard) {
      errors.nameOnCard = "Please enter name of card";
    } else if(values.nameOnCard && !/^[A-Za-z0-9- ]+$/g.test(values.nameOnCard)){
      errors.nameOnCard = "Only alphanumeric characters and spaces are allowed "
    }
  }
  if (values.cardRequestType && values.cardRequestType.value === "bulk") {
    if (!values.excelFile) {
      errors.excelFile = "Please select a file";
    } else if (values && values.excelFile && values.excelFile.file) {
      if (values.excelFile.file.size > MAX_BATCH_FILE_SIZE) {
        errors.excelFile = `Maximum file size of  ${appUtils.byteConverter(
          MAX_BATCH_FILE_SIZE
        )}`;
      }
      if (!appUtils.validateExtension([".xlsx"], values.excelFile.file.name)) {
        errors.excelFile = "Invalid file type. Expected '.xlsx' file type";
      }
    }
  }
  return errors;
};
