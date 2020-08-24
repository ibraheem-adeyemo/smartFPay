import { auditConstants, nameSpace } from "../constants/audit.constants";

const initialState = {
  loading: false,
  success: false,
  request: null,
  response: null,
  error: null
};

export const downloadauditreports = (state = initialState, action) => {
  switch (action.type) {
    case auditConstants[`DOWNLOAD_${nameSpace}_REQUEST`]:
      return {
        ...state,
        loading: true,
        request: action.request
      };
    case auditConstants[`DOWNLOAD_${nameSpace}_SUCCESS`]:
      return {
        ...state,
        loading: false,
        success: true,
        response: action.response,
        error: null
      };
    case auditConstants[`DOWNLOAD_${nameSpace}_FAILURE`]:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.error
      };
    case auditConstants[`DOWNLOAD_${nameSpace}_RESET`]:
      return {
        ...state,
        ...initialState
      };
    default:
      return state;
  }
};
