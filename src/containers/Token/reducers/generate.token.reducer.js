import { tokenConstants, nameSpace } from "../constants/token.constants";

const initialState = {
  loading: false,
  success: false,
  request: null,
  response: null,
  error: null
};

export const generatechanneltoken = (state = initialState, action) => {
  switch (action.type) {
    case tokenConstants[`${nameSpace}_REQUEST`]:
      return {
        ...state,
        loading: true,
        request: action.request
      };
    case tokenConstants[`${nameSpace}_SUCCESS`]:
      return {
        ...state,
        loading: false,
        success: true,
        response: action.response,
        error: null
      };
    case tokenConstants[`${nameSpace}_FAILURE`]:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.error
      };
    case tokenConstants[`GENERATE_RESET`]:
      return {
        ...state,
        ...initialState
      };
    default:
      return state;
  }
};
