import { apiCall, apiCallForUpload } from "../../../utils/api.utils";
import { API_URLS } from "../../../constants/apiUrls";
//import {store} from '../../../store';



export const cardRequestsService = {
  getAllCardRequests,
  createCardRequests,
  getCardStatus,
  getCardRequest
};

function getAllCardRequests(params) {
  //const domain = store.getState().currentUser.response.domainCode
  let url = API_URLS.DASHBOARD_STATS.SUMMARY
  // if(domain === "ISW") {
  //   url = API_URLS.CREATE_CARD_ADMIN.GET_CARD_REQUESTS
  // }
  return apiCall(
    "GET",
    url,
    null,
    null,
    params
  );
}

function createCardRequests(request, configName, cardRequestType) {
  const method = "POST";
  if (cardRequestType && cardRequestType === "single") {
    return apiCall(
      method,
      `${API_URLS.CREATE_CARD.CREATE_SINGLE_CARD}/${configName}`,
      null,
      request
    );
  } else if (cardRequestType && cardRequestType === "bulk") {
    let data = new FormData();
    data.append("excelFile", request.excelFile.file);
    return apiCallForUpload(
      method,
      `${API_URLS.CREATE_CARD.CREATE_MULTIPLE_CARD}/${configName}`,
      data
    );
  }
}

function getCardRequest(id) {
  return apiCall("GET", `${API_URLS.CREATE_CARD.GET_CARD_REQUESTS}/${id}`);
}

function getCardStatus(username) {
  return apiCall("GET", `${API_URLS.USERS.GET_USER_ROLE}`, null, null, {
    username
  });
}
