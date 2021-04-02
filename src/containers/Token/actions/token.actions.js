import { tokenService } from "../services/token.service";
import { show as showAlert } from "../../Notifications/actions/alert.actions";
import { message } from "../../../constants/app.constants";

export const generateChannelToken = (values) => {
  console.log('GENERATE_CHANNEL_TOKEN_RESET', values)
  return async dispatch => {
    dispatch(request({channel: values.channel}));
    try {
      const response = await tokenService.generateChannelToken({channel: values.channel?.value});
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
    return { type: `GENERATE_CHANNEL_TOKEN_REQUEST`, request };
  }
  function success(response) {
    return { type: `GENERATE_CHANNEL_TOKEN_SUCCESS`, response };
  }
  function failure(error) {
    return { type: `GENERATE_CHANNEL_TOKEN_FAILURE`, error };
  }
};

export const resetChannelToken = () => {
  return { type: `GENERATE_CHANNEL_TOKEN_RESET` };
};
