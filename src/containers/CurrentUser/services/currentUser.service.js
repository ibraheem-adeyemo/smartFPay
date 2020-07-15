import { apiCall } from "../../../utils/api.utils";
import { API_URLS } from "../../../constants/apiUrls";

export const currentUserService = {
  getPermissions,
  getCurrentUser
};

function getPermissions() {
  return apiCall("GET", API_URLS.PERMISSIONS.GET_ALL_PERMISSIONS);
}

function getCurrentUser() {
  return apiCall("GET", API_URLS.USERS.GET_CURRENT_USER);
}
