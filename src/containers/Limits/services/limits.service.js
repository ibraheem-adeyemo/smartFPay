import { apiCall } from "../../../utils/api.utils";
import { API_URLS } from "../../../constants/apiUrls";

export const limitService = {
  getAllControls,
  postControl,
  postCardControl,
  toggleAccountLimit,
  toggleCardLimit,
  getControl,
  downloadControls
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

function downloadControls(params) {
  return apiCall(
    "GET",
    API_URLS.LIMITS.DOWNLOAD_CONTROLS,
    null,
    null,
    params
  );
}

function postControl(request, id) {
  const method = id ? "PUT" : "POST";
  return apiCall(method, API_URLS.LIMITS.POST_CONTROL, null, request);
}

function postCardControl(request, id) {
  const method = id ? "PUT" : "POST";
  return apiCall(method, API_URLS.LIMITS.POST_CARD_CONTROL, null, request);
}

function getControl(token) {
  return apiCall("GET", `${API_URLS.LIMITS.GET_CONTROL}/${token}`);
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
