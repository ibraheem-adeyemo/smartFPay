import { rolesConstants, namespace } from "../constants/roles.constants";
import { appUtils } from "../../../utils/app.utils";

const initialState = {
  loading: false,
  pageSize: 10,
  pageNumber: 0,
  success: false,
  request: null,
  response: null,
  error: null
};

export const roles = (state = initialState, action) => {
  switch (action.type) {
    case rolesConstants[`GET_${namespace}_REQUEST`]:
      return {
        ...state,
        loading: true,
        request: action.request
      };
    case rolesConstants[`GET_${namespace}_SUCCESS`]:
      return {
        ...state,
        loading: false,
        success: true,
        response: action.response,
        error: null
      };
    case rolesConstants[`UPDATE_${namespace}_SUCCESS`]:
      return {
        ...state,
        loading: false,
        success: true,
        response: state.response
          ? {
              ...state.response,
              data: [...state.response.data, ...action.response.data]
            }
          : action.response,
        error: null
      };
    case rolesConstants[`REMOVE_${namespace}_SUCCESS`]:
      return {
        ...state,
        loading: false,
        success: true,
        response: {
          ...state.response,
          data: appUtils.intersect(state.response.data, action.response.data, [
            elem => elem.id,
            elem => elem.id
          ], true)
        },
        error: null
      };
    case rolesConstants[`GET_${namespace}_FAILURE`]:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.error
      };
    case rolesConstants[`GET_${namespace}_RESET`]:
      return {
        ...state,
        ...initialState
      };
    default:
      return state;
  }
};
