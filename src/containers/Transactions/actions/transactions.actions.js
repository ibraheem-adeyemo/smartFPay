import { auditService } from "../services/transactions.service";
import { show as showAlert } from "../../Notifications/actions/alert.actions";
import { message } from "../../../constants/app.constants";
import { transactionConstants, nameSpace } from "../constants/transactions.constants";

export const getAllTransactions = requestParams => {
  return async dispatch => {
    dispatch(request(requestParams));
    try {
      const response = await auditService.getAllTransactions(requestParams);
      response && dispatch(success(response));
    } catch (error) {
      dispatch(failure(error));
      dispatch(
        showAlert(
          "danger",
          "Failed to get transactions",
          error ? error : message.GENERIC_ERROR
        )
      );
    }
  };

  function request(request) {
    return { type: transactionConstants[`GET_${nameSpace}_REQUEST`], request };
  }
  function success(response) {
    return { type: transactionConstants[`GET_${nameSpace}_SUCCESS`], response };
  }
  function failure(error) {
    return { type: transactionConstants[`GET_${nameSpace}_FAILURE`], error };
  }
};

export const downloadTransactionReport = requestParams => {
  return async dispatch => {
    dispatch(request(requestParams));
    try {
      const response = await auditService.downloadTransactions(requestParams);
      response && dispatch(success(response));
    } catch (error) {
      dispatch(failure(error));
      dispatch(
        showAlert(
          "danger",
          "Failed to download tramsactions",
          error ? error : message.GENERIC_ERROR
        )
      );
    }
  };

  function request(request) {
    return { type: transactionConstants[`DOWNLOAD_${nameSpace}_REQUEST`], request };
  }
  function success(response) {
    return { type: transactionConstants[`DOWNLOAD_${nameSpace}_SUCCESS`], response };
  }
  function failure(error) {
    return { type: transactionConstants[`DOWNLOAD_${nameSpace}_FAILURE`], error };
  }
};
