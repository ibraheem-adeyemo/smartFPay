import { rolesService } from "../services/roles.service";
import { show as showAlert } from "../../Notifications/actions/alert.actions";
import { message } from "../../../constants/app.constants";
import { rolesConstants, namespace, permissionsNameSpace } from "../constants/roles.constants";
import { reset } from "redux-form";

export const getRoles = () => {
  return async dispatch => {
    dispatch(request());
    try {
      const response = await rolesService.getRoles();
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
    permissions: values.permissions.map(permission => permission.name)
  }:{
    name: values.role_name,
    description: values.description || '',
    permissions:values.permissions.map(permission => permission.name)
  }
  return async dispatch => {
    dispatch(request(requestBody));
    try {
      const response = id ? await rolesService.reassignPermissions(requestBody) :await rolesService.createRole(requestBody);
      dispatch(success(response));
      dispatch(reset("role_form"));
      dispatch(
        showAlert(
          "success",
          id ? "Role updated successfully" : "New role added successfully",
          response?.responseMessage
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

export const toggleRole = (values, pageState) => {
  let requestBody = {
    id: values.id,
    name: values.name,
    disabled: !values.disabled
  }
  return async dispatch => {
    dispatch(request(requestBody));
    try {
      const response = await rolesService.toggleRole(requestBody);
      response && dispatch(success(response));
      dispatch(
        showAlert("success", `${values.name} ${values.disabled ? 'enabled' : 'disabled'} successfully`, response)
      );
      dispatch(getRoles(pageState));
    } catch (error) {
      dispatch(failure(error));
      dispatch(
        showAlert(
          "danger",
          "Failed to toggle role",
          error ? error : message.GENERIC_ERROR
        )
      );
    }
  };

  function request(request) {
    return { type: rolesConstants[`TOGGLE_${namespace}_REQUEST`], request };
  }
  function success(response) {
    return { type: rolesConstants[`TOGGLE_${namespace}_SUCCESS`], response };
  }
  function failure(error) {
    return { type: rolesConstants[`TOGGLE_${namespace}_FAILURE`], error };
  }
};

export const resetPostRole = () => {
  return { type: rolesConstants[`POST_${namespace}_RESET`] };
};

export const resetRoles = () => {
  return { type: rolesConstants[`GET_${namespace}_RESET`] };
}