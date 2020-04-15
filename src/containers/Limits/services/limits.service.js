import { apiCall } from "../../../utils/api.utils";
import { API_URLS } from "../../../constants/apiUrls";

export const limitService = {
  getAllControls,
  postControl,
  toggleAccountLimit,
  toggleCardLimit,
  getControl
};

function getAllControls(params) {
  return apiCall(
    "GET",
    API_URLS.LIMITS.GET_CONTROLS,
    null,
    null,
    params
  );
}

function postControl(request, id) {
  const method = id ? "PUT" : "POST";
  return apiCall(method, API_URLS.LIMITS.POST_CONTROL, null, request);
}

function getControl(id) {
  return apiCall("GET", `${API_URLS.LIMITS.GET_CONTROLS}${id}`);
}

function toggleAccountLimit(accountNumber, active) {
  return apiCall(
    "PUT",
    `${
      active ? API_URLS.LIMITS.DISABLE_ACCOUNT_LIMIT : API_URLS.LIMITS.ENABLE_ACCOUNT_LIMIT
    }/${accountNumber}`
  );
}

function toggleCardLimit(cardId, active) {
    return apiCall(
      "PUT",
      `${
        active ? API_URLS.LIMITS.DISABLE_CARD_LIMIT : API_URLS.LIMITS.ENABLE_CARD_LIMIT
      }/${cardId}`
    );
}
