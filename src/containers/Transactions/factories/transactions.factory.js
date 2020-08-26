export const createFilterRequestBody = (values) => {  
    const requestObject = {
      limitId: values.limitId,
      tokenizedPan: values.tokenizedPan,
      decline: values.decline,
      accountNumber: values.accountNumber,
      channel: values.channel,
      violationCode: values. violationCode,
      customerName: values.customerName,
      country: values.country,
      paymentType: values.paymentType,
      maskedPan: values.maskedPan,
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
    console.log(values)
  
    return requestObject;
  };
