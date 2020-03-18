import { cardRequestsService } from "../services/cardRequests.service";
import { show as showAlert } from "../../Notifications/actions/alert.actions";
import { message } from "../../../constants/app.constants";
import {
  cardRequestConstants,
  nameSpace
} from "../constants/cardRequests.constants";
import { createRequestBody } from "../factories/cardRequests.factory";
import { reset } from "redux-form";

export const getAllCardRequests = requestParams => {
  return async dispatch => {
    dispatch(request(requestParams));
    try {
      const response = await cardRequestsService.getAllCardRequests(requestParams);
      response && dispatch(success(response));
    } catch (error) {
      dispatch(failure(error));
      dispatch(
        showAlert(
          "danger",
          "Failed to get card requests",
          error ? error.message : message.GENERIC_ERROR
        )
      );
    }
  };

  function request(request) {
    return { type: cardRequestConstants[`GET_${nameSpace}_REQUEST`], request };
  }
  function success(response) {
    return { type: cardRequestConstants[`GET_${nameSpace}_SUCCESS`], response };
  }
  function failure(error) {
    return { type: cardRequestConstants[`GET_${nameSpace}_FAILURE`], error };
  }
};

export const getCardRequest = id => {
  return async dispatch => {
    dispatch(request(id));
    try {
      const response = await cardRequestsService.getCardRequest(id);
      response && dispatch(success(response));
    } catch (error) {
      dispatch(failure(error));
      dispatch(
        showAlert(
          "danger",
          "Failed to get card request",
          error ? error.message : message.GENERIC_ERROR
        )
      );
    }
  };

  function request(request) {
    return { type: cardRequestConstants[`VIEW_${nameSpace}_REQUEST`], request };
  }
  function success(response) {
    return {
      type: cardRequestConstants[`VIEW_${nameSpace}_SUCCESS`],
      response
    };
  }
  function failure(error) {
    return { type: cardRequestConstants[`VIEW_${nameSpace}_FAILURE`], error };
  }
};

export const getCardStatus = id => {
  return async dispatch => {
    dispatch(request(id));
    try {
      const response = await cardRequestsService.getCardStatus(id);
      response && dispatch(success(response));
    } catch (error) {
      dispatch(failure(error));
      dispatch(
        showAlert(
          "danger",
          "Failed to get status for selected request",
          error ? error.message : message.GENERIC_ERROR
        )
      );
    }
  };

  function request() {
    return { type: cardRequestConstants[`GETSTATUS_${nameSpace}_REQUEST`] };
  }
  function success(response) {
    return {
      type: cardRequestConstants[`GETSTATUS_${nameSpace}_SUCCESS`],
      response
    };
  }
  function failure(error) {
    return {
      type: cardRequestConstants[`GETSTATUS_${nameSpace}_FAILURE`],
      error
    };
  }
};

export const createCardRequests = (values, history) => {
  const requestBody = createRequestBody(values);
  const configName = values.configName ? values.configName.name : null;
  const cardRequestType =
    values.cardRequestType && values.cardRequestType.value;
  return async dispatch => {
    dispatch(request(requestBody));
    try {
      const response = await cardRequestsService.createCardRequests(
        requestBody,
        configName,
        cardRequestType
      );
      dispatch(success(response));
      dispatch(reset("createcard"));
      dispatch(
        showAlert(
          "success",
          "Card request sent successfully",
          response && response.responseMessage
        )
      );
      dispatch(getAllCardRequests({page: 1, pageSize: 10}));
      dispatch(resetPost());

      dispatch(resetView());
      history.push("/card-requests");
    } catch (error) {
      dispatch(failure(error));
      dispatch(
        showAlert(
          "danger",
          "Failed to send card request",
          error ? error.message : message.GENERIC_ERROR
        )
      );
    }
  };

  function request() {
    return { type: cardRequestConstants[`POST_${nameSpace}_REQUEST`] };
  }
  function success(response) {
    return {
      type: cardRequestConstants[`POST_${nameSpace}_SUCCESS`],
      response
    };
  }
  function failure(error) {
    return { type: cardRequestConstants[`POST_${nameSpace}_FAILURE`], error };
  }
  function resetPost() {
    return { type: cardRequestConstants[`POST_${nameSpace}_RESET`] };
  }
  function resetView() {
    return { type: cardRequestConstants[`VIEW_${nameSpace}_RESET`] };
  }
};

export const resetPost = () => {
  return { type: cardRequestConstants[`POST_${nameSpace}_RESET`] };
};
