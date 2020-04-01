export const createRequestBody = values => {
  let value;
  if(values){
    value = {
      ...values,
      issuerNumber: values.issuerNumber && values.issuerNumber.issuerNr ? values.issuerNumber.issuerNr : '',
      cardProgram: values.cardProgram && values.cardProgram.cardProgram ? values.cardProgram.cardProgram : ''
    }
  }
  return value
};
