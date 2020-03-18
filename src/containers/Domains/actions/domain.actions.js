import { domainService } from "../services/domains.service";
import { domainConstants, namespace } from "../constants/domain.constants";

export const getAllDomains = () => {
  return async dispatch => {
    dispatch(request());
    try {
      const response = await domainService.getAllDomains();
      response && dispatch(success(response));
    } catch (error) {
      dispatch(failure(error));
    }
  };

  function request() {
    return { type: domainConstants[`GET_${namespace}_REQUEST`] };
  }
  function success(response) {
    return { type: domainConstants[`GET_${namespace}_SUCCESS`], response };
  }
  function failure(error) {
    return { type: domainConstants[`GET_${namespace}_FAILURE`], error };
  }
};
