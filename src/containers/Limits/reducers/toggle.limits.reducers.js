import { controlConstants, nameSpace } from "../constants/limit.constants";

const initialState = {
  loading: false,
  success: false,
  request: null,
  response: null,
  error: null
};

export const toggleaccount = (state = initialState, action) => {
  switch (action.type) {
    case controlConstants[`TOGGLE_ACCOUNT_CONTROL_${nameSpace}_REQUEST`]:
      return {
        ...state,
        loading: true,
        request: action.request
      };
    case controlConstants[`TOGGLE_ACCOUNT_CONTROL_${nameSpace}_SUCCESS`]:
      return {
        ...state,
        loading: false,
        success: true,
        response: action.response,
        error: null
      };
    case controlConstants[`TOGGLE_ACCOUNT_CONTROL_${nameSpace}_FAILURE`]:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.error
      };
    case controlConstants[`TOGGLE_ACCOUNT_CONTROL_${nameSpace}_RESET`]:
      return {
        ...state,
        ...initialState
      };
    default:
      return state;
  }
};

export const togglecard = (state = initialState, action) => {
    switch (action.type) {
      case controlConstants[`TOGGLE_CARD_CONTROL_${nameSpace}_REQUEST`]:
        return {
          ...state,
          loading: true,
          request: action.request
        };
      case controlConstants[`TOGGLE_CARD_CONTROL_${nameSpace}_SUCCESS`]:
        return {
          ...state,
          loading: false,
          success: true,
          response: action.response,
          error: null
        };
      case controlConstants[`TOGGLE_CARD_CONTROL_${nameSpace}_FAILURE`]:
        return {
          ...state,
          loading: false,
          success: false,
          error: action.error
        };
      case controlConstants[`TOGGLE_CARD_CONTROL_${nameSpace}_RESET`]:
        return {
          ...state,
          ...initialState
        };
      default:
        return state;
    }
  };
