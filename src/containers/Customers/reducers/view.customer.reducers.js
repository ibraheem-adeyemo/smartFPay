import { customerConstants, nameSpace } from "../constants/customers.constants";

const initialState = {
  loading: false,
  success: false,
  request: null,
  response: null,
  error: null
};

export const getCustomer = (state = initialState, action) => {
  switch (action.type) {
    case customerConstants[`VIEW_${nameSpace}_REQUEST`]:
      return {
        ...state,
        loading: true,
        request: action.request,
        response: null
      };
    case customerConstants[`VIEW_${nameSpace}_SUCCESS`]:
      return {
        ...state,
        loading: false,
        success: true,
        response: action.response,
        error: null
      };
    case customerConstants[`VIEW_${nameSpace}_FAILURE`]:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.error
      };
    case customerConstants[`VIEW_${nameSpace}_RESET`]:
      return {
        ...state,
        ...initialState
      };
    default:
      return state;
  }
};
