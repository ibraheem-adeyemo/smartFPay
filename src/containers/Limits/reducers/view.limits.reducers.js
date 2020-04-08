import { controlConstants, nameSpace } from "../constants/limit.constants";

const initialState = {
  loading: false,
  success: false,
  request: null,
  response: null,
  error: null
};

export const viewcontrol = (state = initialState, action) => {
  switch (action.type) {
    case controlConstants[`VIEW_${nameSpace}_REQUEST`]:
      return {
        ...state,
        loading: true,
        request: action.request
      };
    case controlConstants[`VIEW_${nameSpace}_SUCCESS`]:
      return {
        ...state,
        loading: false,
        success: true,
        response: action.response,
        error: null
      };
    case controlConstants[`VIEW_${nameSpace}_FAILURE`]:
      return {
        ...state,
        loading: false,
        success: false,
        response: null,
        error: action.error
      };
    case controlConstants[`VIEW_${nameSpace}_RESET`]:
      return {
        ...state,
        ...initialState
      };
    default:
      return state;
  }
};
