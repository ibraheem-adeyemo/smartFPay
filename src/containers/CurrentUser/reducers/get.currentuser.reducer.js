import {
  userConstants,
  userNameSpace
} from "../constants/currentUser.constants";

const initialState = {
  loading: false,
  success: false,
  request: null,
  response: null,
  error: null
};

export const currentUser = (state = initialState, action) => {
  switch (action.type) {
    case userConstants[`GET_${userNameSpace}_REQUEST`]:
      return {
        ...state,
        loading: true,
        request: action.request,
        error: null
      };
    case userConstants[`GET_${userNameSpace}_SUCCESS`]:
      return {
        ...state,
        loading: false,
        success: true,
        response: action.response,
        error: null
      };
    case userConstants[`GET_${userNameSpace}_FAILURE`]:
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
