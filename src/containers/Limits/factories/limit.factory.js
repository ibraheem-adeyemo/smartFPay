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

  if (id && controlToEdit && controlToEdit.data && controlToEdit.data.length) {
    requestObject.id = controlToEdit.data[0].id;
  }

  return requestObject;
};

export const createCardRequestBody = (values, id, controlToEdit) => {  
  console.log(values);
  const requestObject = {
    tokenizedPan: "68e656b251e89e8358bdf8483ab0d67c6640f3e7a1a9f0e75898d41ff662f077",
    accountNumber: "0564692611",
    cardStatus: "BLOCKED",
    coreBankingId: "0909090901",
    enabledChannels: values.channels.map(channel => channel.value),
    enabledCountryCodes: [values.enabledCountries.alpha3Code],
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

  if (id && controlToEdit && controlToEdit.data && controlToEdit.data.length) {
    requestObject.id = controlToEdit.data[0].id;
  }

  return requestObject;
};
