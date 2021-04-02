import { tokenService } from "../services/token.service";
import { show as showAlert } from "../../Notifications/actions/alert.actions";
import { message } from "../../../constants/app.constants";

export const generateChannelToken = (values) => {
  const channel = values.channel.length > 1 ? values.channel.map(({value}) => value)
    : values.channel[0];
  return async dispatch => {
    dispatch(request({channel}));
    try {
      const response = await tokenService.generateChannelToken({channel});
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
