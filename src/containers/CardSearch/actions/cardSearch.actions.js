import { cardSearchService } from "../services/cardSearch.service";
import { show as showAlert } from "../../Notifications/actions/alert.actions";
import { message } from "../../../constants/app.constants";
import {
  cardSearchConstants,
  nameSpace
} from "../constants/cardSearch.constants";
import { createRequestBody } from "../factories/cardSearch.factory";
import { store } from "../../../store";


export const searchCards = requestParams => {
  return async dispatch => {
    const requestObject = createRequestBody(requestParams);

    const issuerData = store.getState().cardProgramCount.request;
    if(issuerData && issuerData.domainCode !== "ISW") {
      requestObject.issuerNumber = issuerData.issuerNr
    }

    dispatch(request(requestObject));
    try {
      const response = await cardSearchService.searchCards(requestObject);
      response && dispatch(success(response));
    } catch (error) {
      dispatch(failure(error));
      dispatch(
        showAlert(
          "danger",
          "Failed to get card records",
          error ? error.message : message.GENERIC_ERROR
        )
      );
    }
  };

  function request(request) {
    return {
      type: cardSearchConstants[`GET_${nameSpace}_REQUEST`],
      request
    };
  }
  function success(response) {
    return {
      type: cardSearchConstants[`GET_${nameSpace}_SUCCESS`],
      response
    };
  }
  function failure(error) {
    return { type: cardSearchConstants[`GET_${nameSpace}_FAILURE`], error };
  }
};

export const resetSearch = () => {
  return { type: cardSearchConstants[`GET_${nameSpace}_RESET`] };
};
