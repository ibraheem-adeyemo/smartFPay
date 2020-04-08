import { limitService } from "../services/limits.service";
import { show as showAlert } from "../../Notifications/actions/alert.actions";
import { message } from "../../../constants/app.constants";
import { controlConstants, nameSpace } from "../constants/limit.constants";
import {
  createRequestBody
} from "../factories/limit.factory.js";
import { reset } from "redux-form";

export const getAllControls = requestParams => {
    return async dispatch => {
      dispatch(request(requestParams));
      try {
        const response = await limitService.getAllControls(requestParams);
        response && dispatch(success(response));
      } catch (error) {
        dispatch(failure(error));
        dispatch(
          showAlert(
            "danger",
            "Failed to get all controls",
            error ? error.message : message.GENERIC_ERROR
          )
        );
      }
    };
}

export const getControl = id => {
    return async dispatch => {
      dispatch(request(id));
      try {
        const response = await limitService.getControl(id);
        response && dispatch(success(response));
      } catch (error) {
        dispatch(failure(error));
        dispatch(
          showAlert(
            "danger",
            "Failed to get control",
            error ? error.message : message.GENERIC_ERROR
          )
        );
      }
    };
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
            error ? error.message : message.GENERIC_ERROR
          )
        );
      }
    };
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
            error ? error.message : message.GENERIC_ERROR
          )
        );
      }
    };
};

export const postControl = (values, currentControl, id, controlToEdit) => {
    const requestBody = createRequestBody(values, currentControl, id, controlToEdit);
  
    return async (dispatch, getState) => {
      const state = getState();
      dispatch(request(requestBody));
      try {
        const response = await limitService.postControl(requestBody, id);
        dispatch(success(response));
        dispatch(reset("control_form"));
        dispatch(
          showAlert(
            "success",
            id ? "Control edited successfully" : "New control added successfully",
            response && response.responseMessage
          )
        );
        dispatch(getAllControls({ pageNum: 1, pageSize: 10 }));
        dispatch(resetPost());
        if (id) {
          dispatch(getLimit(id));
        } else {
          dispatch(resetView());
        }
      } catch (error) {
        dispatch(failure(error));
        dispatch(
          showAlert(
            "danger",
            requestBody.id ? "Failed to edit control" : "Failed to add control",
            error ? error.message : message.GENERIC_ERROR
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
