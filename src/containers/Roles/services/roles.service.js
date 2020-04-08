import { apiCall } from "../../../utils/api.utils";
import { API_URLS } from "../../../constants/apiUrls";

export const rolesService = {
  getRoles,
  createRole,
};

function getRoles(params) {
  return apiCall(
    "GET",
    API_URLS.ROLES.GET_ALL_ROLES,
    null,
    null,
    params
  );
}

function createRole(request) {
  return apiCall("POST", API_URLS.ROLES.CREATE_ROLE, null, request);
}
