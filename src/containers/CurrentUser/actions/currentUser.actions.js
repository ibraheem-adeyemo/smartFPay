import { currentUserService } from "../services/currentUser.service";
import {
  userConstants,
  userNameSpace,
  permissionConstants,
  permissionsNameSpace
} from "../constants/currentUser.constants";

export const getCurrentUser = () => {
  return async dispatch => {
    dispatch(request());
    try {
      const response = await currentUserService.getCurrentUser();
      response && dispatch(success(response));
    } catch (error) {
      dispatch(failure(error));
    }
  };

  function request() {
    return { type: userConstants[`GET_${userNameSpace}_REQUEST`] };
  }
  function success(response) {
    return { type: userConstants[`GET_${userNameSpace}_SUCCESS`], response };
  }
  function failure(error) {
    return { type: userConstants[`GET_${userNameSpace}_FAILURE`], error };
  }
};

export const getPermissions = () => {
  return async dispatch => {
    dispatch(request());
    try {
      const response = await getPermissionsArray();
      response && dispatch(success(response));
    } catch (error) {
      dispatch(failure(error));
    }
  };

  function request() {
    return { type: permissionConstants[`GET_${permissionsNameSpace}_REQUEST`] };
  }
  function success(response) {
    return {
      type: permissionConstants[`GET_${permissionsNameSpace}_SUCCESS`],
      response
    };
  }
  function failure(error) {
    return {
      type: permissionConstants[`GET_${permissionsNameSpace}_FAILURE`],
      error
    };
  }
};  

export const getPermissionsArray = () => {
  return permissionsArray
}

const permissionsArray = [
  {authority: "ROLE_VIEW_CUSTOMER_CARDS"}, 
  {authority: "ROLE_CREATE_ISSUER_CONFIGURATION"},

  {authority: "ROLE_CREATE_USER"},
  {authority: "ROLE_ENABLE_USER"},
  {authority: "ROLE_VIEW_USERS"},
  {authority: "ROLE_VIEW_USER"},
  {authorityR: "ROLE_UPDATE_USER"},
  {authorityER: "ROLE_DISABLE_USER"},

  {authority: "ROLE_CHANGE_USER_ROLE"},
  {authority: "ROLE_DELETE_USER_ROLE"},
  {authority: "ROLE_DISABLE_USER_ROLE"},
  {authority: "ROLE_ASSIGN_USER_ROLE"},
  {authority: "ROLE_VIEW_DOMAINS"},

  {authority: "ROLE_CREATE_LIMIT"},
  {authority: "ROLE_VIEW_LIMIT_REQUEST"},

  {authority: "ROLE_VIEW_ADMIN"},


  {authority: "ROLE_VIEW_CUSTOMER_CARDS"},
  {authority: "ROLE_VIEW_CUSTOMER"},

  {authority: "ROLE_VIEW_CARD_DETAILS"},
  {authority: "ROLE_VIEW_CARDS"},

  {authority: "ROLE_BLOCK_CARD"},
  {authority: "ROLE_UNBLOCK_CARD"}

]