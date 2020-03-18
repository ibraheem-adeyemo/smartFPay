import { alertConstants } from "../constants/alert.constants";

export const alert = (state = {}, action) => {
  switch (action.type) {
    case alertConstants.SHOW:
      return {
        type: action.alertType,
        title: action.title,
        message: action.message
      };
    case alertConstants.CLEAR:
      return {};
    default:
      return state;
  }
};
