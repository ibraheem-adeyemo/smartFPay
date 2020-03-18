const initialState = {
  loading: false,
  success: false,
  request: null,
  response: null,
  error: null
};

export const unblockCard = (state = initialState, action) => {
  switch (action.type) {
    case "UNBLOCKCARD_REQUEST":
      return {
        ...state,
        loading: true,
        request: action.request
      };
    case "UNBLOCKCARD_SUCCESS":
      return {
        ...state,
        loading: false,
        success: true,
        response: action.response,
        error: null
      };
    case "UNBLOCKCARD_FAILURE":
      return {
        ...state,
        loading: false,
        success: false,
        error: action.error
      };
    case "UNBLOCKCARD_RESET":
      return {
        ...state,
        ...initialState
      };
    default:
      return state;
  }
};
