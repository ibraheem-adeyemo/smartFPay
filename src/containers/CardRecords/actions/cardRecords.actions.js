import { cardRecordService } from "../services/cardRecords.service";
import { show as showAlert } from "../../Notifications/actions/alert.actions";
import { message } from "../../../constants/app.constants";
import {
  cardRecordConstants,
  nameSpace
} from "../constants/cardRecords.constants";

export const getCardRecords = encryptedCustomerId => {
  const requestBody = {
    encryptedCustomerId
  };
  return async dispatch => {
    dispatch(request(requestBody));
    try {
      const response = await cardRecordService.getCardRecords(requestBody);
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
    return { type: cardRecordConstants[`GET_${nameSpace}_REQUEST`], request };
  }
  function success(response) {
    return { type: cardRecordConstants[`GET_${nameSpace}_SUCCESS`], response };
  }
  function failure(error) {
    return { type: cardRecordConstants[`GET_${nameSpace}_FAILURE`], error };
  }
};

export const getCardRecord = requestObj => {
  return async dispatch => {
    dispatch(request(requestObj));
    try {
      const response = await cardRecordService.getCardRecord(requestObj);
      response && dispatch(success(response));
    } catch (error) {
      dispatch(failure(error));
      dispatch(
        showAlert(
          "danger",
          "Failed to get card record",
          error ? error.message : message.GENERIC_ERROR
        )
      );
    }
  };

  function request(request) {
    return { type: cardRecordConstants[`VIEW_${nameSpace}_REQUEST`], request };
  }
  function success(response) {
    return {
      type: cardRecordConstants[`VIEW_${nameSpace}_SUCCESS`],
      response
    };
  }
  function failure(error) {
    return { type: cardRecordConstants[`VIEW_${nameSpace}_FAILURE`], error };
  }
};

export const pinReissue = encryptedPan => {
  return async dispatch => {
    dispatch(request(encryptedPan));
    try {
      const response = await cardRecordService.reissuePin(encryptedPan);
      if (response) {
        dispatch(success(response));
        dispatch(
          showAlert("success", "Successful", !!response && response.message)
        );
      }
    } catch (error) {
      dispatch(failure(error));
      dispatch(
        showAlert(
          "danger",
          "Failed to re-issue PIN",
          error ? error.message : message.GENERIC_ERROR
        )
      );
    }
  };

  function request(request) {
    return { type: "PINREISSUE_REQUEST", request };
  }
  function success(response) {
    return { type: "PINREISSUE_SUCCESS", response };
  }
  function failure(error) {
    return { type: "PINREISSUE_FAILURE", error };
  }
};

export const blockCard = encryptedPan => {
  return async dispatch => {
    dispatch(request(encryptedPan));
    try {
      const response = await cardRecordService.blockCard(encryptedPan);
      if (response) {
        dispatch(success(response));
        dispatch(
          showAlert("success", "Successful", "Card blocked successfully")
        );
        dispatch(
          getCardRecord(encryptedPan)
        );
      }
    } catch (error) {
      dispatch(failure(error));
      dispatch(
        showAlert(
          "danger",
          "Failed to block card",
          error ? error.message : message.GENERIC_ERROR
        )
      );
    }
  };

  function request(request) {
    return { type: "BLOCKCARD_REQUEST", request };
  }
  function success(response) {
    return { type: "BLOCKCARD_SUCCESS", response };
  }
  function failure(error) {
    return { type: "BLOCKCARD_FAILURE", error };
  }
};

export const unblockCard = (encryptedPan) => {
  return async dispatch => {
    dispatch(request(encryptedPan));
    try {
      const response = await cardRecordService.unblockCard(encryptedPan);
      if (response) {
        dispatch(success(response));
        dispatch(
          showAlert("success", "Successful", "Card unblocked successfully")
        );
        dispatch(
          getCardRecord(encryptedPan)
        );
      }
    } catch (error) {
      dispatch(failure(error));
      dispatch(
        showAlert(
          "danger",
          "Failed to unblock card",
          error ? error.message : message.GENERIC_ERROR
        )
      );
    }
  };

  function request(request) {
    return { type: "UNBLOCKCARD_REQUEST", request };
  }
  function success(response) {
    return { type: "UNBLOCKCARD_SUCCESS", response };
  }
  function failure(error) {
    return { type: "UNBLOCKCARD_FAILURE", error };
  }
};

export const pinReissueReset = () => {
  return { type: "PINREISSUE_RESET" };
};

export const blockCardReset = () => {
  return { type: "BLOCKCARD_RESET" };
};

export const unblockCardReset = () => {
  return { type: "UNBLOCKCARD_RESET" };
};
