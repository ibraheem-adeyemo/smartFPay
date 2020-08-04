import {accountConstants, nameSpace} from '../constants/account.constant';

const initialState = {
    loading: false,
    success: false,
    request: null,
    response: null,
    error: null
  };

  export const postlogin = (state = initialState, action) => {
    switch (action.type) {
      case accountConstants[`POST_${nameSpace}_REQUEST`]:
        return {
          ...state,
          loading: true,
          request: action.request
        };
      case accountConstants[`POST_${nameSpace}_SUCCESS`]:
        return {
          ...state,
          loading: false,
          success: true,
          response: action.response,
          error: null
        };
      case accountConstants[`POST_${nameSpace}_FAILURE`]:
        return {
          ...state,
          loading: false,
          success: false,
          error: action.error
        };
      case accountConstants[`POST_${nameSpace}_RESET`]:
        return {
          ...state,
          ...initialState
        };
      default:
        return state;
    }
  };
