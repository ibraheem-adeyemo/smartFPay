import { rolesConstants, namespace } from "../constants/roles.constants";

const initialState = {
  loading: false,
  success: false,
  request: null,
  response: null,
  error: null
};

export const postrole = (state = initialState, action) => {
  switch (action.type) {
    case rolesConstants[`POST_${namespace}_REQUEST`]:
      return {
        ...state,
        loading: true,
        request: action.request
      };
    case rolesConstants[`POST_${namespace}_SUCCESS`]:
      return {
        ...state,
        loading: false,
        success: true,
        response: action.response,
        error: null
      };
    case rolesConstants[`POST_${namespace}_FAILURE`]:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.error
      };
    case rolesConstants[`POST_${namespace}_RESET`]:
      return {
        ...state,
        ...initialState
      };
    default:
      return state;
  }
};
