import { cardRecordConstants, nameSpace } from "../constants/cardRecords.constants";

const initialState = {
  loading: false,
  success: false,
  request: null,
  response: null,
  error: null
};

export const getCardRecord = (state = initialState, action) => {
  switch (action.type) {
    case cardRecordConstants[`VIEW_${nameSpace}_REQUEST`]:
      return {
        ...state,
        loading: true,
        request: action.request,
        response: null
      };
    case cardRecordConstants[`VIEW_${nameSpace}_SUCCESS`]:
      return {
        ...state,
        loading: false,
        success: true,
        response: action.response,
        error: null
      };
    case cardRecordConstants[`VIEW_${nameSpace}_FAILURE`]:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.error
      };
    case cardRecordConstants[`VIEW_${nameSpace}_RESET`]:
      return {
        ...state,
        ...initialState
      };
    default:
      return state;
  }
};
