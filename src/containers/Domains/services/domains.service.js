import { apiCall } from "../../../utils/api.utils";
import { API_URLS } from "../../../constants/apiUrls";

export const domainService = {
  getAllDomains
};

function getAllDomains() {
  return apiCall("GET", API_URLS.USERS.GET_USER_DOMAIN);
}

