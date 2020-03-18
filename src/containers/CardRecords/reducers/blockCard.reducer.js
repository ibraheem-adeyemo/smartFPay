const initialState = {
  loading: false,
  success: false,
  request: null,
  response: null,
  error: null
};

export const blockCard = (state = initialState, action) => {
  switch (action.type) {
    case "BLOCKCARD_REQUEST":
      return {
        ...state,
        loading: true,
        request: action.request
      };
    case "BLOCKCARD_SUCCESS":
      return {
        ...state,
        loading: false,
        success: true,
        response: action.response,
        error: null
      };
    case "BLOCKCARD_FAILURE":
      return {
        ...state,
        loading: false,
        success: false,
        error: action.error
      };
    case "BLOCKCARD_RESET":
      return {
        ...state,
        ...initialState
      };
    default:
      return state;
  }
};
