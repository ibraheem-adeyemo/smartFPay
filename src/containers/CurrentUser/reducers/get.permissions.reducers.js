import {
  permissionConstants,
  permissionsNameSpace
} from "../constants/currentUser.constants";

const initialState = {
  loading: false,
  success: false,
  request: null,
  response: null,
  error: null
};

export const permissions = (state = initialState, action) => {
  switch (action.type) {
    case permissionConstants[`GET_${permissionsNameSpace}_REQUEST`]:
      return {
        ...state,
        loading: true,
        request: action.request,
        error: null
      };
    case permissionConstants[`GET_${permissionsNameSpace}_SUCCESS`]:
      return {
        ...state,
        loading: false,
        success: true,
        response: action.response,
        error: null
      };
    case permissionConstants[`GET_${permissionsNameSpace}_FAILURE`]:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.error
      };
    default:
      return state;
  }
};
