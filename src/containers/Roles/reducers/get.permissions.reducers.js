import { rolesConstants, nameSpace, permissionsNameSpace } from "../constants/roles.constants";

const initialState = {
  loading: false,
  success: false,
  request: null,
  response: null,
  error: null
};

export const getPermissions = (state = initialState, action) => {
  switch (action.type) {
    case rolesConstants[`GET_APP_PERMISSIONS_REQUEST`]:
      return {
        ...state,
        loading: true,
        request: action.request
      };
    case rolesConstants[`GET_APP_PERMISSIONS_SUCCESS`]:
      return {
        ...state,
        loading: false,
        success: true,
        response: action.response,
        error: null
      };
    case rolesConstants[`GET_APP_PERMISSIONS_FAILURE`]:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.error
      };
    case rolesConstants[`GET_${permissionsNameSpace}_RESET`]:
      return {
        ...state,
        ...initialState
      };
    default:
      return state;
  }
};
