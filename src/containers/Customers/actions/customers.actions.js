import { customersService } from "../services/customers.service";
import { show as showAlert } from "../../Notifications/actions/alert.actions";
import { message } from "../../../constants/app.constants";
import {
  customerConstants,
  nameSpace
} from "../constants/customers.constants";

export const getCustomers = (requestParams, batchId) => {
  return async dispatch => {
    dispatch(request({...requestParams, batchId}));
    try {
      const response = await customersService.getCustomers(requestParams, batchId);
      response && dispatch(success(response));
    } catch (error) {
      dispatch(failure(error));
      dispatch(
        showAlert(
          "danger",
          "Failed to get customers",
          error ? error.message : message.GENERIC_ERROR
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

export const getCustomer = encryptedId => {
  return async dispatch => {
    const requestBody = {
      encryptedCustomerId: encryptedId
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
          error ? error.message : message.GENERIC_ERROR
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

export const getCustomerGet = id => {
  return async dispatch => {
    dispatch(request(id));
    try {
      const response = await customersService.getCustomerByIdGet(id);
      response && dispatch(success(response));
    } catch (error) {
      dispatch(failure(error));
      dispatch(
        showAlert(
          "danger",
          "Failed to get card request",
          error ? error.message : message.GENERIC_ERROR
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
