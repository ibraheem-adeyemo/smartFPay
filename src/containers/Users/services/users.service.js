import { apiCall } from "../../../utils/api.utils";
import { API_URLS } from "../../../constants/apiUrls";

export const userService = {
  getAllUsers,
  postUser,
  toggleUser,
  getUserRole,
  changeRole,
  getUser
};

function getAllUsers(params) {
  return apiCall(
    "GET",
    API_URLS.USERS.GET_USERS,
    null,
    null,
    params
  );
}

function postUser(request, id) {
  const method = id ? "PUT" : "POST";
  return apiCall(method, API_URLS.USERS.POST_USER_ADMIN, null, request);
}

function getUser(id) {
  return apiCall("GET", `${API_URLS.USERS.GET_USER}${id}`);
}

function toggleUser(username, active) {
  return apiCall(
    "PUT",
    `${
      active ? API_URLS.USERS.DISABLE_USER : API_URLS.USERS.ENABLE_USER
    }/${username}`
  );
}

function getUserRole(params) {
  return apiCall("GET", `${API_URLS.USERS.GET_USER_ROLE}`, null, null, params);
}

function changeRole(requestBody, userToEdit) {
  return apiCall(
    "PUT",
    `${API_URLS.USERS.GET_USER_ROLE}/${userToEdit.id}`,
    null,
    requestBody
  );
}
