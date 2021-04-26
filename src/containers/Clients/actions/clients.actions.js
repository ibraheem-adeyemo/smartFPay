import { clientsService } from "../services/clients.service";
import { show as showAlert } from "../../Notifications/actions/alert.actions";
import { message } from "../../../constants/app.constants";
import { clientsConstants, namespace } from "../constants/clients.constants";
import { reset } from "redux-form";

export const getClients = () => {
  return async dispatch => {
    dispatch(request());
    try {
      const response = await clientsService.getClients();
      response && dispatch(success(response));
    } catch (error) {
      dispatch(failure(error));
      dispatch(
        showAlert(
          "danger",
          "Failed to get all clients",
          error ? error : message.GENERIC_ERROR
        )
      );
    }
  };

  function request(request) {
    return { type: clientsConstants[`GET_${namespace}_REQUEST`], request };
  }
  function success(response) {
    return { type: clientsConstants[`GET_${namespace}_SUCCESS`], response };
  }
  function failure(error) {
    return { type: clientsConstants[`GET_${namespace}_FAILURE`], error };
  }
};

export const getPermissions = (requestParams) => {
  return async dispatch => {
    dispatch(request(requestParams));
    try {
      const response = await clientsService.getPermissions(requestParams);
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
    return { type: `GET_APP_PERMISSIONS_REQUEST` };
  }
  function success(response) {
    return {
      type: `GET_APP_PERMISSIONS_SUCCESS`,
      response
    };
  }
  function failure(error) {
    return {
      type: `GET_APP_PERMISSIONS_FAILURE`,
      error
    };
  }
};

export const refreshClientSecret = values => {
  return async dispatch => {
    dispatch(request(values));
    try {
      const response = await clientsService.refreshClient(values);
      response && dispatch(success(response));
      dispatch(
        showAlert("success",
        `Secret for ${values.clientName} reset successfully`)
      );
      setGivenClient(dispatch, { ...values, ...response })
    } catch (error) {
      dispatch(failure(error));
      dispatch(
        showAlert(
          "danger",
          "Failed to reset client secret",
          error ? error : message.GENERIC_ERROR
        )
      );
    }
  };

  function request(request) {
    return { type: clientsConstants[`REFRESH_${namespace}_REQUEST`], request };
  }
  function success(response) {
    return { type: clientsConstants[`REFRESH_${namespace}_SUCCESS`], response };
  }
  function failure(error) {
    return { type: clientsConstants[`REFRESH_${namespace}_FAILURE`], error };
  }
};

export const createClient = (params, history) => {
  return async dispatch => {
    dispatch(request(params));
    try {
      const response = await clientsService.createClient(params);
      dispatch(success(response));
      dispatch(reset("client_form"));
      dispatch(
        showAlert(
          "success",
          "New client added successfully",
          response?.responseMessage
        )
      );
      dispatch(getClients());
      dispatch(resetPost());
      dispatch(resetView());
      history.push("/clients");
      setGivenClient(dispatch, response);
    } catch (error) {
      dispatch(failure(error));
      dispatch(resetView());
      dispatch(
        showAlert(
          "danger",
          "Failed to add client",
          error ? error : message.GENERIC_ERROR
        )
      );
    }
  };

  function request(request) {
    return { type: clientsConstants[`POST_${namespace}_REQUEST`], request };
  }
  function success(response) {
    return { type: clientsConstants[`POST_${namespace}_SUCCESS`], response };
  }
  function failure(error) {
    return { type: clientsConstants[`POST_${namespace}_FAILURE`], error };
  }
  function resetPost() {
    return { type: clientsConstants[`POST_${namespace}_RESET`] };
  }
  function resetView() {
    return { type: clientsConstants[`VIEW_${namespace}_RESET`] };
  }
};

export const setGivenClient = (dispatch, client) =>
{
  dispatch(credentials(client))
  function credentials(response) {
    return { type: clientsConstants[`CRED_${namespace}_SUCCESS`], response };
  }
}

export const toggleClient = (values, pageState) => {
  return async dispatch => {
    dispatch(request(values));
    try {
      const response = await clientsService.toggleClient(values);
      response && dispatch(success(response));
      dispatch(
        showAlert("success",
        `${values.clientName} ${values.disabled ? 'enabled' : 'disabled'} successfully`)
      );
      dispatch(getClients(pageState));
    } catch (error) {
      dispatch(failure(error));
      dispatch(
        showAlert(
          "danger",
          "Failed to toggle client",
          error ? error : message.GENERIC_ERROR
        )
      );
    }
  };

  function request(request) {
    return { type: clientsConstants[`TOGGLE_${namespace}_REQUEST`], request };
  }
  function success(response) {
    return { type: clientsConstants[`TOGGLE_${namespace}_SUCCESS`], response };
  }
  function failure(error) {
    return { type: clientsConstants[`TOGGLE_${namespace}_FAILURE`], error };
  }
};