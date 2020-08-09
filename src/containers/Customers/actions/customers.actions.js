import { customersService } from "../services/customers.service";
import { show as showAlert } from "../../Notifications/actions/alert.actions";
import { message } from "../../../constants/app.constants";
import {
  customerConstants,
  nameSpace
} from "../constants/customers.constants";
import {
  createRequestBody,
} from "../factories/customers.factory";
import { reset } from "redux-form";

export const getCustomers = (requestParams) => {
  return async dispatch => {
    dispatch(request({...requestParams}));
    try {
      const response = await customersService.getCustomers(requestParams);
      response && dispatch(success(response));
    } catch (error) {
      dispatch(failure(error));
      dispatch(
        showAlert(
          "danger",
          "Failed to get customers",
          error ? error : message.GENERIC_ERROR
        )
      );
    }
  };

  function request(request) {
    return { type: customerConstants[`GET_${nameSpace}_REQUEST`], request };
  }
  function success(response) {
    return { type: customerConstants[`GET_${nameSpace}_SUCCESS`], response };
  }
  function failure(error) {
    return { type: customerConstants[`GET_${nameSpace}_FAILURE`], error };
  }
};

export const getCustomer = accountNumber => {
  return async dispatch => {
    const requestBody = {
      accountNumber
    }
    dispatch(request(requestBody));
    try {
      const response = await customersService.getCustomerById(requestBody);
      response && dispatch(success(response));
    } catch (error) {
      dispatch(failure(error));
      dispatch(
        showAlert(
          "danger",
          "Failed to get card request",
          error ? error : message.GENERIC_ERROR
        )
      );
    }
  };

  function request(request) {
    return { type: customerConstants[`VIEW_${nameSpace}_REQUEST`], request };
  }
  function success(response) {
    return {
      type: customerConstants[`VIEW_${nameSpace}_SUCCESS`],
      response
    };
  }
  function failure(error) {
    return { type: customerConstants[`VIEW_${nameSpace}_FAILURE`], error };
  }
};

export const getCustomerDetails = (accountNumber, callBack) => {
  console.log('accountNumber', accountNumber)
  return async dispatch => {
    dispatch(request(accountNumber));
    try {
      const response = await customersService.getCustomerByAccountNumber(accountNumber);
      // response && dispatch(success(response));
      console.log('RESPONSE',response);
      dispatch(success(response));
      dispatch(reset("customer_form"));
      dispatch(
        showAlert(
          "success",
          "Customer fetched successfully",
          response?.responseMessage
        )
      );
      dispatch(resetPost());
      callBack();
    } catch (error) {
      console.log('erroe',error)
      dispatch(failure(error));
      dispatch(
        showAlert(
          "danger",
          "Failed to get customer details",
          error ? error : message.GENERIC_ERROR
        )
      );
    }
  };

  function resetPost() {
    return { type: customerConstants[`POST_${nameSpace}_RESET`] };
  }

  function request(request) {
    return { type: customerConstants[`VIEW_${nameSpace}_REQUEST`], request };
  }
  function success(response) {
    return {
      type: customerConstants[`VIEW_${nameSpace}_SUCCESS`],
      response
    };
  }
  function failure(error) {
    return { type: customerConstants[`VIEW_${nameSpace}_FAILURE`], error };
  }
};

export const postCustomer = (values, callBack) => {
  const requestBody = createRequestBody(values);
    console.log(requestBody);
    return async (dispatch, getState) => {
      const state = getState();
      dispatch(request(requestBody));
      try {
        const response = await customersService.postCustomer(requestBody);
        console.log(response)
        dispatch(success(response));
        dispatch(reset("customer_form"));
        dispatch(
          showAlert(
            "success",
            "New customer added successfully",
            response && response.responseMessage
          )
        );
        dispatch(getCustomers({ pageNum: 1, pageSize: 10 }));
        dispatch(resetPost());
        dispatch(resetView());
        callBack();
        // if (id) {
        //   dispatch(getControl(id));
        // } else {
        //   dispatch(resetView());
        //   history.push("/customers");
        // }
      } catch (error) {
        console.log(error)
        dispatch(failure(error));
        dispatch(resetView());
        callBack();
        dispatch(
          showAlert(
            "danger",
            requestBody.id ? "Failed to edit customer" : "Failed to add customer",
            error ? error : message.GENERIC_ERROR
          )
        );
      }
    };
  
    function request() {
      return { type: customerConstants[`POST_${nameSpace}_REQUEST`] };
    }
    function success(response) {
      return { type: customerConstants[`POST_${nameSpace}_SUCCESS`], response };
    }
    function failure(error) {
      return { type: customerConstants[`POST_${nameSpace}_FAILURE`], error };
    }
    function resetPost() {
      return { type: customerConstants[`POST_${nameSpace}_RESET`] };
    }
    function resetView() {
      return { type: customerConstants[`VIEW_${nameSpace}_RESET`] };
    }
}

export const subscribeCustomer = (values, pageState) => {
  let requestBody = {
    accountNumber: values.accountNumber
  }
  return async dispatch => {
    dispatch(request(requestBody));
    try {
      const response = await customersService.subscribeCustomer(requestBody);
      response && dispatch(success(response));
      dispatch(
        showAlert("success", `${values.accountNumber} subscribed ${response.responseMessage}LY`,)
      );
      dispatch(getCustomers(pageState));
    } catch (error) {
      dispatch(failure(error));
      dispatch(
        showAlert(
          "danger",
          "Failed to subscribe customer",
          error ? error : message.GENERIC_ERROR
        )
      );
    }
  };

  function request(request) {
    return { type: customerConstants[`TOGGLE_${nameSpace}_REQUEST`], request };
  }
  function success(response) {
    return { type: customerConstants[`TOGGLE_${nameSpace}_SUCCESS`], response };
  }
  function failure(error) {
    return { type: customerConstants[`TOGGLE_${nameSpace}_FAILURE`], error };
  }
};

export const unsubscribeCustomer = (values, pageState) => {
  let requestBody = {
    accountNumber: values.accountNumber
  }
  return async dispatch => {
    dispatch(request(requestBody));
    try {
      const response = await customersService.unsubscribeCustomer(requestBody);
      response && dispatch(success(response));
      dispatch(
        showAlert("success", `${values.accountNumber} subscribed ${response.responseMessage}LY`,)
      );
      dispatch(getCustomers(pageState));
    } catch (error) {
      dispatch(failure(error));
      dispatch(
        showAlert(
          "danger",
          "Failed to unsubscribe customer",
          error ? error : message.GENERIC_ERROR
        )
      );
    }
  };

  function request(request) {
    return { type: customerConstants[`TOGGLE_${nameSpace}_REQUEST`], request };
  }
  function success(response) {
    return { type: customerConstants[`TOGGLE_${nameSpace}_SUCCESS`], response };
  }
  function failure(error) {
    return { type: customerConstants[`TOGGLE_${nameSpace}_FAILURE`], error };
  }
};

export const resetPost = () => {
  return { type: customerConstants[`POST_${nameSpace}_RESET`] };
};

export const resetView = () => {
  return { type: customerConstants[`VIEW_${nameSpace}_RESET`] };
};

export const getCustomerGet = () => {

}
