import { auditConstants, nameSpace } from "../constants/audit.constants";

const initialState = {
  loading: false,
  success: false,
  request: null,
  response: null,
  error: null
};

export const getauditreports = (state = initialState, action) => {
  switch (action.type) {
    case auditConstants[`GET_${nameSpace}_REQUEST`]:
      return {
        ...state,
        loading: true,
        request: action.request
      };
    case auditConstants[`GET_${nameSpace}_SUCCESS`]:
      return {
        ...state,
        loading: false,
        success: true,
        response: action.response,
        error: null
      };
    case auditConstants[`GET_${nameSpace}_FAILURE`]:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.error
      };
    case auditConstants[`GET_${nameSpace}_RESET`]:
      return {
        ...state,
        ...initialState
      };
    default:
      return state;
  }
};
