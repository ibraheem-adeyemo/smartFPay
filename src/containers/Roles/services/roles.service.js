import { apiCall } from "../../../utils/api.utils";
import { API_URLS } from "../../../constants/apiUrls";

export const rolesService = {
  getRoles,
};

function getRoles(params) {
  return apiCall("GET", API_URLS.USERS.GET_ROLES_ADMIN, null, null, params);
}