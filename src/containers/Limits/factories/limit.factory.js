export const createRequestBody = (values, id, controlToEdit) => {  
  const requestObject = {
    token: id,
    accountNumber: values.accountNumber,
    interbankTransaction: values.interbankTransaction,
    coreBankingId: values.coreBankingId,
    // active: true,
    // admin: true,
    transactionLimitCount: parseInt(values.duration),
    frequencyLimitReset: values.frequency.value,
    transactionLimitAmount: parseInt(values.amount),
    limitStartDate: values.startDate
    ? `${("0" + values.startDate.getDate()).slice(-2)}-${(
        "0" +
        (values.startDate.getMonth() + 1)
      ).slice(-2)}-${values.startDate.getFullYear()} ${("0" + values.startDate.getHours()).slice(-2)}:${("0" + values.startDate.getMinutes()).slice(-2)}:${("0" + values.startDate.getSeconds()).slice(-2)}`
    : "",
    limitEndDate: values.endDate
    ? `${("0" + values.endDate.getDate()).slice(-2)}-${(
        "0" +
        (values.endDate.getMonth() + 1)
      ).slice(-2)}-${values.endDate.getFullYear()} ${("0" + values.startDate.getHours()).slice(-2)}:${("0" + values.startDate.getMinutes()).slice(-2)}:${("0" + values.startDate.getSeconds()).slice(-2)}`
    : ""
  };
  console.log(values)

  if (id && controlToEdit && controlToEdit.data && controlToEdit.data.length) {
    requestObject.id = controlToEdit.data[0].id;
  }

  return requestObject;
};

export const createCardRequestBody = (values, id, controlToEdit) => {  
  console.log(values);
  const requestObject = {
    tokenizedPan: values.tokenizedPan,
    token: id,
    accountNumber: values.accountNumber,
    cardStatus: values.cardStatus.value,
    coreBankingId: values.coreBankingId,
    enabledChannels: values.channels.map(channel => channel.value),
    enabledCountryCodes: values.enabledCountries.map(enabledCountry => enabledCountry.alpha3Code),
    // active: true,
    // admin: true,
    transactionLimitCount: parseInt(values.duration),
    frequencyLimitReset: values.frequency.value,
    cardExpiryNumber: values.cardExpiryNumber,
    cardMaskedPan: values.cardMaskedPan,
    transactionLimitAmount: parseInt(values.amount),
    limitStartDate: values.startDate
    ? `${("0" + values.startDate.getDate()).slice(-2)}-${(
        "0" +
        (values.startDate.getMonth() + 1)
      ).slice(-2)}-${values.startDate.getFullYear()} ${("0" + values.startDate.getHours()).slice(-2)}:${("0" + values.startDate.getMinutes()).slice(-2)}:${("0" + values.startDate.getSeconds()).slice(-2)}`
    : "",
    limitEndDate: values.endDate
    ? `${("0" + values.endDate.getDate()).slice(-2)}-${(
        "0" +
        (values.endDate.getMonth() + 1)
      ).slice(-2)}-${values.endDate.getFullYear()} ${("0" + values.startDate.getHours()).slice(-2)}:${("0" + values.startDate.getMinutes()).slice(-2)}:${("0" + values.startDate.getSeconds()).slice(-2)}`
    : ""
  };

  if (id && controlToEdit && controlToEdit.data && controlToEdit.data.length) {
    requestObject.id = controlToEdit.data[0].id;
  }

  return requestObject;
};

export const createFilterRequestBody = (values) => {  
  const requestObject = {
    accountNumber: values.accountNumber || "",
    accountName: values.accountName || "",
    enabledChannel: values.enabledChannel?.value,
    enabledCountry: values.enabledCountry?.alpha3Code,
    startDate: values.startDate
    ? `${("0" + values.startDate.getDate()).slice(-2)}-${(
        "0" +
        (values.startDate.getMonth() + 1)
      ).slice(-2)}-${values.startDate.getFullYear()} ${("0" + values.startDate.getHours()).slice(-2)}:${("0" + values.startDate.getMinutes()).slice(-2)}:${("0" + values.startDate.getSeconds()).slice(-2)}`
    : "",
    endDate: values.endDate
    ? `${("0" + values.endDate.getDate()).slice(-2)}-${(
        "0" +
        (values.endDate.getMonth() + 1)
      ).slice(-2)}-${values.endDate.getFullYear()} ${("0" + values.endDate.getHours()).slice(-2)}:${("0" + values.endDate.getMinutes()).slice(-2)}:${("0" + values.endDate.getSeconds()).slice(-2)}`
    : ""
  };
  for (var propName in requestObject) { 
    if (!requestObject[propName]) {
      delete requestObject[propName];
    }
  }

  return requestObject;
};
