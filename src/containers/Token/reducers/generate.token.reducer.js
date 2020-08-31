import { tokenConstants, nameSpace } from "../constants/token.constants";

const initialState = {
  loading: false,
  success: false,
  request: null,
  response: null,
  error: null
};

export const generatechanneltoken = (state = initialState, action) => {
  switch (action.type) {
    case `GENERATE_CHANNEL_TOKEN_REQUEST`:
      return {
        ...state,
        loading: true,
        request: action.request
      };
    case `GENERATE_CHANNEL_TOKEN_SUCCESS`:
      return {
        ...state,
        loading: false,
        success: true,
        response: action.response,
        error: null
      };
    case `GENERATE_CHANNEL_TOKEN_FAILURE`:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.error
      };
    case `GENERATE_CHANNEL_TOKEN_RESET`:
      return {
        ...state,
        ...initialState
      };
    default:
      return state;
  }
};
