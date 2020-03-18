import {
  cardRequestConstants,
  nameSpace
} from "../constants/cardRequests.constants";

const initialState = {
  loading: false,
  success: false,
  request: null,
  response: null,
  error: null
};

export const getCardStatus = (state = initialState, action) => {
  switch (action.type) {
    case cardRequestConstants[`GETSTATUS_${nameSpace}_REQUEST`]:
      return {
        ...state,
        loading: true,
        request: action.request
      };
    case cardRequestConstants[`GETSTATUS_${nameSpace}_SUCCESS`]:
      return {
        ...state,
        loading: false,
        success: true,
        response: action.response,
        error: null
      };
    case cardRequestConstants[`GETSTATUS_${nameSpace}_FAILURE`]:
      return {
        ...state,
        loading: false,
        success: false,
        response: null,
        error: action.error
      };
    case cardRequestConstants[`GETSTATUS_${nameSpace}_RESET`]:
      return {
        ...state,
        ...initialState
      };
    default:
      return state;
  }
};
