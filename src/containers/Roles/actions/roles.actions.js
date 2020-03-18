import { rolesService } from "../services/roles.service";
import { rolesConstants, namespace } from "../constants/roles.constants";

export const getRoles = domainCode => {
  return async dispatch => {
    dispatch(request({ domainCode }));
    try {
      const response = await rolesService.getRoles({ domainCode });
      response && dispatch(success(response));
    } catch (error) {
      dispatch(failure(error));
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

export const addRolesToStore = domainCode => {
  return async dispatch => {
    dispatch(request({ domainCode }));
    try {
      const response = await rolesService.getRoles({ domainCode });
      response && dispatch(success(response));
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
};

export const removeRolesFromStore = domainCode => {
  return async dispatch => {
    dispatch(request({ domainCode }));
    try {
      const response = await rolesService.getRoles({ domainCode });
      response && dispatch(success(response));
    } catch (error) {
      dispatch(failure(error));
    }
  };

  function request(request) {
    return { type: rolesConstants[`GET_${namespace}_REQUEST`], request };
  }
  function success(response) {
    return { type: rolesConstants[`REMOVE_${namespace}_SUCCESS`], response };
  }
  function failure(error) {
    return { type: rolesConstants[`GET_${namespace}_FAILURE`], error };
  }
};

export const resetRoles = () => {
  return { type: rolesConstants[`GET_${namespace}_RESET`] };
}