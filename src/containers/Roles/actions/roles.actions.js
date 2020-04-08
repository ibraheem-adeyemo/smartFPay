import { rolesService } from "../services/roles.service";
import { show as showAlert } from "../../Notifications/actions/alert.actions";
import { message } from "../../../constants/app.constants";
import { rolesConstants, namespace } from "../constants/roles.constants";
import { reset } from "redux-form";

export const getRoles = requestParams => {
  return async dispatch => {
    dispatch(request({ requestParams }));
    try {
      const response = await rolesService.getRoles({ requestParams });
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
    return { type: rolesConstants[`GET_${namespace}_REQUEST`], request };
  }
  function success(response) {
    return { type: rolesConstants[`GET_${namespace}_SUCCESS`], response };
  }
  function failure(error) {
    return { type: rolesConstants[`GET_${namespace}_FAILURE`], error };
  }
};

export const createRole = (role) => {
  return async dispatch => {
    dispatch(request({ role }));
    try {
      const response = await rolesService.getRoles({ role });
      response && dispatch(success(response));
      dispatch(reset("role_form"));
      dispatch(
        showAlert(
          "success",
          "New role added successfully",
          response && response.responseMessage
        )
      );
      dispatch(getRoles({ pageNum: 1, pageSize: 10 }));
      dispatch(resetPost());
    } catch (error) {
      dispatch(failure(error));
    }
  };

  function request(request) {
    return { type: rolesConstants[`GET_${namespace}_REQUEST`], request };
  }
  function success(response) {
    return { type: rolesConstants[`UPDATE_${namespace}_SUCCESS`], response };
  }
  function failure(error) {
    return { type: rolesConstants[`GET_${namespace}_FAILURE`], error };
  }
  function resetPost() {
    return { type: rolesConstants[`POST_${namespace}_RESET`] };
  }
};

export const resetPostRole = () => {
  return { type: rolesConstants[`POST_${namespace}_RESET`] };
};

export const resetRoles = () => {
  return { type: rolesConstants[`GET_${namespace}_RESET`] };
}