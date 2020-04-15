export const createRequestBody = (values, id, controlToEdit) => {  
    const requestObject = {
      active: true,
      admin: true,
      duration: values.duration,
      frequency: values.frequency,
      amount: values.amount
    };
  
    if (id && controlToEdit && controlToEdit.data && controlToEdit.data.length) {
      requestObject.id = controlToEdit.data[0].id;
    }
  
    return requestObject;
  };
  