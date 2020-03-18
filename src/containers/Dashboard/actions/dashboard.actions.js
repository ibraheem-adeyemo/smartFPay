import { dashboardService } from "../services/dashboard.service";
import { dashboardConstants } from "../constants/dashboard.constants";

export const getCardProgramCount = issuerCode => {
  return async dispatch => {
    dispatch(request(issuerCode));
    try {
      const response = await dashboardService.getCardProgramCount({
        issuerCode: issuerCode.issuerCode ? issuerCode.issuerCode : issuerCode
      });
      response && dispatch(success(response));
    } catch (error) {
      dispatch(failure(error));
    }
  };

  function request(request) {
    return { type: dashboardConstants.GET_CARDPROGRAM_COUNT_REQUEST, request };
  }
  function success(response) {
    return {
      type: dashboardConstants.GET_CARDPROGRAM_COUNT_SUCCESS,
      response
    };
  }
  function failure(error) {
    return { type: dashboardConstants.GET_CARDPROGRAM_COUNT_FAILURE, error };
  }
};
