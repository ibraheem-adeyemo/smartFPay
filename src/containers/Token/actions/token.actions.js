import { tokenService } from "../services/token.service";
import { show as showAlert } from "../../Notifications/actions/alert.actions";
import { message } from "../../../constants/app.constants";
import { tokenConstants, nameSpace } from "../constants/token.constants";

export const generateChannelToken = (values) => {
  return async dispatch => {
    dispatch(request(values.channel));
    try {
      const response = await tokenService.generateChannelToken(values.channel);
      response && dispatch(success(response));
    } catch (error) {
      dispatch(failure(error));
      dispatch(
        showAlert(
          "danger",
          "Failed to generate channel token",
          error ? error : message.GENERIC_ERROR
        )
      );
    }
  };

  function request(request) {
    return { type: tokenConstants[`${nameSpace}_REQUEST`], request };
  }
  function success(response) {
    return { type: tokenConstants[`${nameSpace}_SUCCESS`], response };
  }
  function failure(error) {
    return { type: tokenConstants[`${nameSpace}_FAILURE`], error };
  }
};

export const resetChannelToken = () => {
  return { type: tokenConstants[`GENERATE_RESET`] };
};
