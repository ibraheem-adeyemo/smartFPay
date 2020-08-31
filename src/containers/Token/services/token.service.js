import { apiCall } from "../../../utils/api.utils";
import { API_URLS } from "../../../constants/apiUrls";

export const tokenService = {
    generateChannelToken
};

function generateChannelToken(request) {
  return apiCall("POST", API_URLS.TOKEN.GENERATE_CHANNEL_TOKEN, null, request);
}
