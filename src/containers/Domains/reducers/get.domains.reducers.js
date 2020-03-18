import { domainConstants, namespace } from "../constants/domain.constants";

const initialState = {
  loading: false,
  success: false,
  request: null,
  response: null,
  error: null
};

export const domains = (state = initialState, action) => {
  switch (action.type) {
    case domainConstants[`GET_${namespace}_REQUEST`]:
      return {
        ...state,
        loading: true,
        request: action.request
      };
    case domainConstants[`GET_${namespace}_SUCCESS`]:
      return {
        ...state,
        loading: false,
        success: true,
        response: action.response,
        error: null
      };
    case domainConstants[`GET_${namespace}_FAILURE`]:
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
