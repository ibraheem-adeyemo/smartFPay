import { rolesService } from "../services/roles.service";
import { show as showAlert } from "../../Notifications/actions/alert.actions";
import { message } from "../../../constants/app.constants";
import { rolesConstants, namespace, permissionsNameSpace } from "../constants/roles.constants";
import { reset } from "redux-form";

export const getRoles = requestParams => {
  return async dispatch => {
    dispatch(request(requestParams));
    try {
      const response = await rolesService.getRoles(requestParams);
      response && dispatch(success(response));
    } catch (error) {
      dispatch(failure(error));
      dispatch(
        showAlert(
          "danger",
          "Failed to get all users",
          error ? error : message.GENERIC_ERROR
        )
      );
    }
  };

  function request(request) {
    return { type: rolesConstants[`GET_${namespace}_REQUEST`], request };
  }
  function success(response) {
    return { type: rolesConstants[`GET_${namespace}_SUCCESS`], response };
  }
  function failure(error) {
    return { type: rolesConstants[`GET_${namespace}_FAILURE`], error };
  }
};

export const getPermissions = (requestParams) => {
  return async dispatch => {
    dispatch(request(requestParams));
    try {
      const response = await rolesService.getPermissions(requestParams);
      console.log(response)
      response && dispatch(success(response));
    } catch (error) {
      dispatch(failure(error));
      dispatch(
        showAlert(
          "danger",
          "Failed to get all permissions",
          error ? error : message.GENERIC_ERROR
        )
      );
    }
  };

  function request() {
    return { type: rolesConstants[`GET_${permissionsNameSpace}_REQUEST`] };
  }
  function success(response) {
    return {
      type: rolesConstants[`GET_${permissionsNameSpace}_SUCCESS`],
      response
    };
  }
  function failure(error) {
    return {
      type: rolesConstants[`GET_${permissionsNameSpace}_FAILURE`],
      error
    };
  }
};

export const createRole = (values, id, history) => {
  let requestBody = id? {
    id: id,
    permissions: values.permissions.map(permission => permission.label)
  }:{
    name: values.role_name,
    description: values.description || '',
    permissions:values.permissions.map(permission => permission.label)
  }
  console.log(requestBody);
  return async dispatch => {
    dispatch(request(requestBody));
    try {
      const response = id ? await rolesService.reassignPermissions(requestBody) :await rolesService.createRole(requestBody);
      dispatch(success(response));
      dispatch(reset("role_form"));
      dispatch(
        showAlert(
          "success",
          id ? "Role updated successfully" : "New control added successfully",
          response && response.responseMessage
        )
      );
      dispatch(getRoles({ pageNum: 1, pageSize: 10 }));
      dispatch(resetPost());
      dispatch(resetView());
      history.push("/roles");
    } catch (error) {
      dispatch(failure(error));
      dispatch(resetView());
      dispatch(
        showAlert(
          "danger",
          requestBody.id ? "Failed to edit role" : "Failed to add role",
          error ? error : message.GENERIC_ERROR
        )
      );
    }
  };

  function request(request) {
    return { type: rolesConstants[`POST_${namespace}_REQUEST`], request };
  }
  function success(response) {
    return { type: rolesConstants[`POST_${namespace}_SUCCESS`], response };
  }
  function failure(error) {
    return { type: rolesConstants[`POST_${namespace}_FAILURE`], error };
  }
  function resetPost() {
    return { type: rolesConstants[`POST_${namespace}_RESET`] };
  }
  function resetView() {
    return { type: rolesConstants[`VIEW_${namespace}_RESET`] };
  }
};

export const resetPostRole = () => {
  return { type: rolesConstants[`POST_${namespace}_RESET`] };
};

export const resetRoles = () => {
  return { type: rolesConstants[`GET_${namespace}_RESET`] };
}