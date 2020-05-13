export const createRequestBody = (values, id, controlToEdit) => {  
    const requestObject = {
      accountNumber: "1234567890",
      interbankTransaction: false,
      coreBankingId: "0001020303030",
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
  