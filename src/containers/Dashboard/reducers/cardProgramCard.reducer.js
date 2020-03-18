import { dashboardConstants } from "../constants/dashboard.constants";

const initialState = {
  loading: false,
  success: false,
  request: null,
  response: null,
  error: null
};

export const cardProgramCount = (state = initialState, action) => {
  switch (action.type) {
    case dashboardConstants.GET_CARDPROGRAM_COUNT_REQUEST:
      return {
        ...state,
        loading: true,
        request: action.request
      };
    case dashboardConstants.GET_CARDPROGRAM_COUNT_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        response: action.response,
        error: null
      };
    case dashboardConstants.GET_CARDPROGRAM_COUNT_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.error
      };
    case dashboardConstants.GET_CARDPROGRAM_COUNT_RESET:
      return {
        ...state,
        ...initialState
      };
    default:
      return state;
  }
};
