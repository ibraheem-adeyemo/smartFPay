import { userService } from "../services/users.service";
import { show as showAlert } from "../../Notifications/actions/alert.actions";
import { message } from "../../../constants/app.constants";
import { userConstants, nameSpace } from "../constants/user.constants";
import {
  createRequestBody,
  createRoleRequest
} from "../factories/user.factory.js";
import { reset } from "redux-form";
import { resetRoles } from "../../Roles/actions/roles.actions";
import { accessControlFn } from "../../../utils/accessControl";
import { permissionsConstants } from "../../../constants/permissions.constants";

export const getAllUsers = requestParams => {
  return async dispatch => {
    dispatch(request(requestParams));
    try {
      const response = await userService.getAllUsers(requestParams);
      response && dispatch(success(response));
    } catch (error) {
      dispatch(failure(error));
      dispatch(
        showAlert(
          "danger",
          "Failed to get all users",
          error ? error.message : message.GENERIC_ERROR
        )
      );
    }
  };

  function request(request) {
    return { type: userConstants[`GET_${nameSpace}_REQUEST`], request };
  }
  function success(response) {
    return { type: userConstants[`GET_${nameSpace}_SUCCESS`], response };
  }
  function failure(error) {
    return { type: userConstants[`GET_${nameSpace}_FAILURE`], error };
  }
};

export const getUser = id => {
  return async dispatch => {
    dispatch(request(id));
    try {
      const response = await userService.getUser(id);
      response && dispatch(success(response));
    } catch (error) {
      dispatch(failure(error));
      dispatch(
        showAlert(
          "danger",
          "Failed to get user",
          error ? error.message : message.GENERIC_ERROR
        )
      );
    }
  };

  function request(request) {
    return { type: userConstants[`VIEW_${nameSpace}_REQUEST`], request };
  }
  function success(response) {
    return { type: userConstants[`VIEW_${nameSpace}_SUCCESS`], response };
  }
  function failure(error) {
    return { type: userConstants[`VIEW_${nameSpace}_FAILURE`], error };
  }
};

export const getUserRole = params => {
  return async dispatch => {
    dispatch(request(params));
    try {
      const response = await userService.getUserRole(params);
      response && dispatch(success(response));
    } catch (error) {
      dispatch(failure(error));
      dispatch(
        showAlert(
          "danger",
          "Failed to get user role",
          error ? error.message : message.GENERIC_ERROR
        )
      );
    }
  };

  function request() {
    return { type: userConstants[`ROLE_${nameSpace}_REQUEST`], params };
  }
  function success(response) {
    return { type: userConstants[`ROLE_${nameSpace}_SUCCESS`], response };
  }
  function failure(error) {
    return { type: userConstants[`ROLE_${nameSpace}_FAILURE`], error };
  }
};

export const toggleUser = (username, active, postAction, pageState, domainCode) => {
  return async dispatch => {
    dispatch(request({ username, active }));
    try {
      const response = await userService.toggleUser(username, active);
      response && dispatch(success(response));
      dispatch(
        showAlert("success", username, response && response.description)
      );
      if (postAction === "refreshMapping") {
        dispatch(getUserRole({username, domainCode}));
      }

      if (postAction === "getAllUsers") {
        dispatch(getAllUsers(pageState));
      }
    } catch (error) {
      dispatch(failure(error));
      dispatch(
        showAlert(
          "danger",
          "Failed to toggle user",
          error ? error.message : message.GENERIC_ERROR
        )
      );
    }
  };

  function request(request) {
    return { type: userConstants[`TOGGLE_${nameSpace}_REQUEST`], request };
  }
  function success(response) {
    return { type: userConstants[`TOGGLE_${nameSpace}_SUCCESS`], response };
  }
  function failure(error) {
    return { type: userConstants[`TOGGLE_${nameSpace}_FAILURE`], error };
  }
};

export const postUser = (values, currentUser, id, userToEdit) => {
  const requestBody = createRequestBody(values, currentUser, id, userToEdit);

  return async (dispatch, getState) => {
    const state = getState();
    const userPermissions = state.permissions && state.permissions.response;
    dispatch(request(requestBody));
    try {
      const response = await userService.postUser(requestBody, id);
      dispatch(success(response));
      dispatch(reset("user_form"));
      accessControlFn(
        userPermissions,
        [permissionsConstants.ASSIGN_USER_ROLE],
        () => dispatch(resetRoles())
      );
      dispatch(
        showAlert(
          "success",
          id ? "User edited successfully" : "New user added successfully",
          response && response.responseMessage
        )
      );
      dispatch(getAllUsers({ pageNum: 1, pageSize: 10 }));
      dispatch(resetPost());
      if (id) {
        dispatch(getUser(id));
      } else {
        dispatch(resetView());
      }
    } catch (error) {
      dispatch(failure(error));
      dispatch(
        showAlert(
          "danger",
          requestBody.id ? "Failed to edit user" : "Failed to add user",
          error ? error.message : message.GENERIC_ERROR
        )
      );
    }
  };

  function request() {
    return { type: userConstants[`POST_${nameSpace}_REQUEST`] };
  }
  function success(response) {
    return { type: userConstants[`POST_${nameSpace}_SUCCESS`], response };
  }
  function failure(error) {
    return { type: userConstants[`POST_${nameSpace}_FAILURE`], error };
  }
  function resetPost() {
    return { type: userConstants[`POST_${nameSpace}_RESET`] };
  }
  function resetView() {
    return { type: userConstants[`VIEW_${nameSpace}_RESET`] };
  }
};

export const changeUserRole = (values, id, userToEdit) => {
  const requestBody = createRoleRequest(values, userToEdit);
  return async dispatch => {
    dispatch(request(requestBody));
    try {
      const response = await userService.changeRole(requestBody, userToEdit);
      dispatch(success(response));
      dispatch(reset("userrole_form"));
      dispatch(
        showAlert(
          "success",
          "User role edited successfully",
          response && response.description
        )
      );
      dispatch(getAllUsers({ pageNum: 1, pageSize: 10 }));
      dispatch(
        getUserRole({
          username: id,
          domainCode: userToEdit.domainCode
        })
      );
    } catch (error) {
      dispatch(failure(error));
      dispatch(
        showAlert(
          "danger",
          requestBody.id ? "Failed to edit user role" : "Failed to add user role",
          error ? error.message : message.GENERIC_ERROR
        )
      );
    }
  };

  function request() {
    return { type: userConstants[`ROLECHANGE_${nameSpace}_REQUEST`] };
  }
  function success(response) {
    return { type: userConstants[`ROLECHANGE_${nameSpace}_SUCCESS`], response };
  }
  function failure(error) {
    return { type: userConstants[`ROLECHANGE_${nameSpace}_FAILURE`], error };
  }
};

export const resetPostUser = () => {
  return { type: userConstants[`POST_${nameSpace}_RESET`] };
};

export const resetViewUser = () => {
  return { type: userConstants[`VIEW_${nameSpace}_RESET`] };
};

export const resetGetUserRole = () => {
  return { type: userConstants[`ROLE_${nameSpace}_RESET`] };
};
