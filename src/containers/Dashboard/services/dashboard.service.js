import { apiCall } from "../../../utils/api.utils";
import { API_URLS } from "../../../constants/apiUrls";

export const dashboardService = {
  getCardProgramCount,
};

function getCardProgramCount(params) {
  return apiCall(
    "GET",
    `${API_URLS.SMARTCARDPROCESS.GET_CARDPROGRAM_COUNT}`,
    null,
    null,
    params
  );
}
