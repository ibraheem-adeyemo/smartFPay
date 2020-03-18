const initialState = {
  loading: false,
  success: false,
  request: null,
  response: null,
  error: null
};

export const pinReissue = (state = initialState, action) => {
  switch (action.type) {
    case "PINREISSUE_REQUEST":
      return {
        ...state,
        loading: true,
        request: action.request
      };
    case "PINREISSUE_SUCCESS":
      return {
        ...state,
        loading: false,
        success: true,
        response: action.response,
        error: null
      };
    case "PINREISSUE_FAILURE":
      return {
        ...state,
        loading: false,
        success: false,
        error: action.error
      };
    case "PINREISSUE_RESET":
      return {
        ...state,
        ...initialState
      };
    default:
      return state;
  }
};
