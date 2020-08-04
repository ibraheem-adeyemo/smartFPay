import { customerConstants, nameSpace } from "../constants/customers.constants";

const initialState = {
  loading: false,
  success: false,
  request: null,
  response: null,
  error: null
};

export const getCustomerDetails = (state = initialState, action) => {
  switch (action.type) {
    case customerConstants[`GET_${nameSpace}_REQUEST`]:
      return {
        ...state,
        loading: true,
        request: action.request
      };
    case customerConstants[`GET_${nameSpace}_SUCCESS`]:
      return {
        ...state,
        loading: false,
        success: true,
        response: action.response,
        error: null
      };
    case customerConstants[`GET_${nameSpace}_FAILURE`]:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.error
      };
    case customerConstants[`GET_${nameSpace}_RESET`]:
      return {
        ...state,
        ...initialState
      };
    default:
      return state;
  }
};
