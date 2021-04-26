import { apiCall } from "../../../utils/api.utils";
import { API_URLS } from "../../../constants/apiUrls";

export const clientsService = {
  getClients,
  createClient,
  getPermissions,
  toggleClient,
  refreshClient
};

function getClients() {
  return apiCall(
    "GET",
    API_URLS.CLIENTS.GET_ALL_CLIENTS,
    null,
    null,
  );
}

function getPermissions(params) {
  return apiCall(
    "GET",
    API_URLS.PERMISSIONS.GET_ALL_PERMISSIONS,
    null,
    null,
    params
  );
}

function createClient(request) {
  return apiCall("POST", API_URLS.CLIENTS.CREATE_CLIENT, null, request);
}

function toggleClient(request) {
  const { disabled, clientId } = request;
  const url = `${API_URLS.CLIENTS.TOGGLE_CLIENT}/${clientId}/${disabled ? "enable" : "disable"}`
  return apiCall("PUT", url, null, request);
}

function refreshClient(request) {
  return apiCall("POST", API_URLS.CLIENTS.REFRESH_CLIENT, null, request);
}
