import { clientsConstants, namespace } from "../constants/clients.constants";

const initialState = {
  loading: false,
  success: false,
  request: null,
  response: null,
  error: null
};

export const clientsToggle = (state = initialState, action) => {
  switch (action.type) {
    case clientsConstants[`TOGGLE${namespace}_REQUEST`]:
      return {
        ...state,
        loading: true,
        request: action.request
      };
    case clientsConstants[`TOGGLE${namespace}_SUCCESS`]:
      return {
        ...state,
        loading: false,
        success: true,
        response: action.response,
        error: null
      };
    case clientsConstants[`TOGGLE${namespace}_FAILURE`]:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.error
      };
    case clientsConstants[`TOGGLE${namespace}_RESET`]:
      return {
        ...state,
        ...initialState
      };
    default:
      return state;
  }
};
