import { appUtils } from "../../../../utils/app.utils";

const isValidCardPan = value => {
  let valid = false;
  if (
    value &&
    appUtils.luhnCheck(value) &&
    value.length >= 10 &&
    value.length <= 24
  ) {
    valid = true;
  }
  return valid;
};

export const validateCardSearch = values => {
  const errors = {};
  if (values.pan && !isValidCardPan(values.pan)) {
    errors.pan = "Please enter a valid Card PAN or at least up to 10digits";
  }
  if(values.firstName && (!values.pan && !values.lastName)){
    errors.firstName = "Unable to search with first name only"
  }
  if(values.lastName && (!values.pan && !values.firstName)){
    errors.lastName = "Unable to search with last name only"
  }
  if (!values.issuerNumber) {
    errors.issuerNumber = "Unable to search without an issuer selected"; 
  }
  if (values.cardProgram && !values.issuerNumber) {
    errors.issuerNumber = "Please select an issuer"; 
  }
  if(appUtils.isEmptyObject(values)){
    errors.pan = "Please enter a search criteria"
    errors.firstName = "Please enter a search criteria"
    errors.lastName = "Please enter a search criteria"
  }
  return errors;
};
