import { clientsConstants, namespace } from "../constants/clients.constants";

const initialState = {
  loading: false,
  success: false,
  request: null,
  response: null,
  error: null
};

export const clientsRefresh = (state = initialState, action) => {
  switch (action.type) {
    case clientsConstants[`REFRESH${namespace}_REQUEST`]:
      return {
        ...state,
        loading: true,
        request: action.request
      };
    case clientsConstants[`REFRESH${namespace}_SUCCESS`]:
      return {
        ...state,
        loading: false,
        success: true,
        response: action.response,
        error: null
      };
    case clientsConstants[`REFRESH${namespace}_FAILURE`]:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.error
      };
    case clientsConstants[`REFRESH${namespace}_RESET`]:
      return {
        ...state,
        ...initialState
      };
    default:
      return state;
  }
};
