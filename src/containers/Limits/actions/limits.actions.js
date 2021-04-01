import { limitService } from "../services/limits.service";
import { show as showAlert } from "../../Notifications/actions/alert.actions";
import { message } from "../../../constants/app.constants";
import { controlConstants, nameSpace } from "../constants/limit.constants";
import {
  createRequestBody,
  createCardRequestBody,
  createFilterRequestBody
} from "../factories/limit.factory.js";
import { reset } from "redux-form";
import { appUtils } from "../../../utils/app.utils";

export const getAllControls = (requestParams) => {
    return async dispatch => {
      dispatch(request(requestParams));
      try {
        const response = await limitService.getAllControls(requestParams);
        console.log(response)
        response && dispatch(success(response));
      } catch (error) {
        dispatch(failure(error));
        dispatch(
          showAlert(
            "danger",
            "Failed to get all controls",
            error ? error : message.GENERIC_ERROR
          )
        );
      }
    };

    function request(request) {
        return { type: controlConstants[`GET_${nameSpace}_REQUEST`], request };
      }
      function success(response) {
        return { type: controlConstants[`GET_${nameSpace}_SUCCESS`], response };
      }
      function failure(error) {
        return { type: controlConstants[`GET_${nameSpace}_FAILURE`], error };
      }
}

export const downloadControls = requestParams => {
  return async dispatch => {
    const requestBody = createFilterRequestBody(requestParams);
    dispatch(request(requestBody));
    try {
      const response = await limitService.downloadControls(requestBody);
      response && dispatch(success(response));
      response && appUtils.downloadFile("limits.csv", response)
    } catch (error) {
      dispatch(failure(error));
      dispatch(
        showAlert(
          "danger",
          "Failed to download controls",
          error ? error : message.GENERIC_ERROR
        )
      );
    }
  };

  function request(request) {
    return { type: controlConstants[`DOWNLOAD_${nameSpace}_REQUEST`], request };
  }
  function success(response) {
    return { type: controlConstants[`DOWNLOAD_${nameSpace}_SUCCESS`], response };
  }
  function failure(error) {
    return { type: controlConstants[`DOWNLOAD_${nameSpace}_FAILURE`], error };
  }
};

export const getControl = token => {
    return async dispatch => {
      dispatch(request(token));
      try {
        const response = await limitService.getControl(token);
        response && dispatch(success(response));
      } catch (error) {
        dispatch(failure(error));
        dispatch(
          showAlert(
            "danger",
            "Failed to get control",
            error ? error : message.GENERIC_ERROR
          )
        );
      }
    };

    function request(request) {
        return { type: controlConstants[`VIEW_${nameSpace}_REQUEST`], request };
      }
      function success(response) {
        return { type: controlConstants[`VIEW_${nameSpace}_SUCCESS`], response };
      }
      function failure(error) {
        return { type: controlConstants[`VIEW_${nameSpace}_FAILURE`], error };
      }
}

export const toggleCardControl = (cardId, active, postAction, pageState) => {
    return async dispatch => {
      dispatch(request({ cardId, active }));
      try {
        const response = await limitService.toggleCardControl(cardId, active);
        response && dispatch(success(response));
        dispatch(
          showAlert("success", cardId, response && response.description)
        );
        if (postAction === "refreshMapping") {
          dispatch(getControl({cardId}));
        }
  
        if (postAction === "getAllControls") {
          dispatch(getAllControls(pageState));
        }
      } catch (error) {
        dispatch(failure(error));
        dispatch(
          showAlert(
            "danger",
            "Failed to toggle control",
            error ? error : message.GENERIC_ERROR
          )
        );
      }
    };

    function request(request) {
        return { type: controlConstants[`TOGGLE_CARD_CONTROL_${nameSpace}_REQUEST`], request };
      }
      function success(response) {
        return { type: controlConstants[`TOGGLE_CRAD_CONTROL_${nameSpace}_SUCCESS`], response };
      }
      function failure(error) {
        return { type: controlConstants[`TOGGLE_CARD_CONTROL_${nameSpace}_FAILURE`], error };
      }
};

export const toggleAccountControl = (accountNumber, active, postAction, pageState) => {
    return async dispatch => {
      dispatch(request({ accountNumber, active }));
      try {
        const response = await limitService.toggleAccountControl(accountNumber, active);
        response && dispatch(success(response));
        dispatch(
          showAlert("success", accountNumber, response && response.description)
        );
        if (postAction === "refreshMapping") {
          dispatch(getControl({accountNumber}));
        }
  
        if (postAction === "getAllControls") {
          dispatch(getAllControls(pageState));
        }
      } catch (error) {
        dispatch(failure(error));
        dispatch(
          showAlert(
            "danger",
            "Failed to toggle control",
            error ? error : message.GENERIC_ERROR
          )
        );
      }
    };

    function request(request) {
        return { type: controlConstants[`TOGGLE_ACCOUNT_CONTROL_${nameSpace}_REQUEST`], request };
      }
      function success(response) {
        return { type: controlConstants[`TOGGLE_ACCOUNT_CONTROL_${nameSpace}_SUCCESS`], response };
      }
      function failure(error) {
        return { type: controlConstants[`TOGGLE_ACCOUNT_CONTROL_${nameSpace}_FAILURE`], error };
      }
};

export const postControl = (values, id, controlToEdit, history, location) => {
    const requestBody = createRequestBody(values, id, controlToEdit);
    const accountNumber = values.accountNumber;
    return async (dispatch, getState) => {
      const state = getState();
      dispatch(request(requestBody));
      try {
        const response = await limitService.postControl(requestBody, id);
        dispatch(success(response));
        // if(!location?.state?.fromCustomerView){
        dispatch(reset("control_form"));
        // }
        dispatch(
          showAlert(
            "success",
            id ? "Control updated successfully" : "New control added successfully",
            response && response.responseMessage
          )
        );
        if(location?.state?.fromCustomerView){
        dispatch(getAllControls({ pageNumber: 1, pageSize: 1000, accountNumber }));
        }
        dispatch(resetPost());
        if (id) {
          dispatch(getControl(id));
          if(location?.state?.fromCustomerView){
            history.push({
              pathname: "/customers/add",
              state: {}
            });
          } else{
            history.push({
              pathname: "/limit-requests"
            });
          }
        } else if(location?.state?.fromCustomerView){
          history.push({
            pathname: "/customers/add",
            state: {}
          });
        } else {
          dispatch(resetView());
          history.push("/limit-requests");
        }
      } catch (error) {
        dispatch(failure(error));
        dispatch(
          showAlert(
            "danger",
            requestBody.id ? "Failed to edit control" : "Failed to add control",
            error ? error : message.GENERIC_ERROR
          )
        );
      }
    };
  
    function request() {
      return { type: controlConstants[`POST_${nameSpace}_REQUEST`] };
    }
    function success(response) {
      return { type: controlConstants[`POST_${nameSpace}_SUCCESS`], response };
    }
    function failure(error) {
      return { type: controlConstants[`POST_${nameSpace}_FAILURE`], error };
    }
    function resetPost() {
      return { type: controlConstants[`POST_${nameSpace}_RESET`] };
    }
    function resetView() {
      return { type: controlConstants[`VIEW_${nameSpace}_RESET`] };
    }
};

export const postCardControl = (values, id, controlToEdit, history, location) => {
  const accountNumber = values.accountNumber;
  const requestBody = createCardRequestBody(values, id, controlToEdit);
  console.log(requestBody);
  return async (dispatch, getState) => {
    const state = getState();
    dispatch(request(requestBody));
    try {
      const response = await limitService.postCardControl(requestBody, id);
      dispatch(success(response));
      if(!location?.state?.fromCustomerView){
        dispatch(reset("card_control_form"));
      }
      dispatch(
        showAlert(
          "success",
          id ? "Control updated successfully" : "New card control added successfully",
          response && response.responseMessage
        )
      );
      if(location?.state?.fromCustomerView){
        dispatch(getAllControls({ pageNumber: 1, pageSize: 1000, accountNumber }));
        }
      dispatch(resetPost());
      if (id) {
        dispatch(getControl(id));
        if(location?.state?.fromCustomerView){
          history.push({
            pathname: "/customers/add",
            state: {}
          });
        } else {
          history.push({
            pathname: "/limit-requests"
          });
        }
      } else if(location?.state?.fromCustomerView){
        history.push({
          pathname: "/customers/add",
          state: {}
        });
      } else {
        dispatch(resetView());
        history.push("/limit-requests");
      }
    } catch (error) {
      dispatch(failure(error));
      dispatch(
        showAlert(
          "danger",
          requestBody.id ? "Failed to edit card control" : "Failed to add card control",
          error ? error : message.GENERIC_ERROR
        )
      );
    }
  };

  function request() {
    return { type: controlConstants[`POST_${nameSpace}_REQUEST`] };
  }
  function success(response) {
    return { type: controlConstants[`POST_${nameSpace}_SUCCESS`], response };
  }
  function failure(error) {
    return { type: controlConstants[`POST_${nameSpace}_FAILURE`], error };
  }
  function resetPost() {
    return { type: controlConstants[`POST_${nameSpace}_RESET`] };
  }
  function resetView() {
    return { type: controlConstants[`VIEW_${nameSpace}_RESET`] };
  }
};

export const resetPostLimitControl = () => {
  return { type: controlConstants[`POST_${nameSpace}_RESET`] };
};

export const resetViewLimitControl = () => {
  return { type: controlConstants[`VIEW_${nameSpace}_RESET`] };
};
