import { transactionConstants, nameSpace } from "../constants/transactions.constants";

const initialState = {
  loading: false,
  success: false,
  request: null,
  response: null,
  error: null
};

export const downloadtransactionreport = (state = initialState, action) => {
  switch (action.type) {
    case transactionConstants[`DOWNLOAD_${nameSpace}_REQUEST`]:
      return {
        ...state,
        loading: true,
        request: action.request
      };
    case transactionConstants[`DOWNLOAD_${nameSpace}_SUCCESS`]:
      return {
        ...state,
        loading: false,
        success: true,
        response: action.response,
        error: null
      };
    case transactionConstants[`DOWNLOAD_${nameSpace}_FAILURE`]:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.error
      };
    case transactionConstants[`DOWNLOAD_${nameSpace}_RESET`]:
      return {
        ...state,
        ...initialState
      };
    default:
      return state;
  }
};
