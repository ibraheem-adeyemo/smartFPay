import { clientsConstants, namespace } from "../constants/clients.constants";

const initialState = {
  loading: false,
  success: false,
  request: null,
  response: null,
  error: null
};

export const clientsPost = (state = initialState, action) => {
  switch (action.type) {
    case clientsConstants[`POST${namespace}_REQUEST`]:
      return {
        ...state,
        loading: true,
        request: action.request
      };
    case clientsConstants[`POST${namespace}_SUCCESS`]:
      return {
        ...state,
        loading: false,
        success: true,
        response: action.response,
        error: null
      };
    case clientsConstants[`POST${namespace}_FAILURE`]:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.error
      };
    case clientsConstants[`POST${namespace}_RESET`]:
      return {
        ...state,
        ...initialState
      };
    default:
      return state;
  }
};
