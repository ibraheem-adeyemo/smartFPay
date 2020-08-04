import { show as showAlert } from "../../Notifications/actions/alert.actions";
import { message } from "../../../constants/app.constants";
import {accountService} from '../services/account.service';
import {accountConstants, nameSpace} from '../constants/account.constant';
import { reset } from "redux-form";

export const postLogin = (values, history) => {
    const requestBody = values;
    console.log(requestBody);
    return async (dispatch, getState) => {
      const state = getState();
      dispatch(request(requestBody));
      try {
        const response = await accountService.postLogin(requestBody);
        dispatch(success(response));
        dispatch(reset("login_form"));
        history.push('/dashboard');
        dispatch(resetPost());
      } catch (error) {
        dispatch(failure(error));
        dispatch(
          showAlert(
            "danger",
            "Login failed, check your credentials",
            error ? error.message : message.GENERIC_ERROR
          )
        );
      }
    };
  
    function request() {
      return { type: accountConstants[`POST_${nameSpace}_REQUEST`] };
    }
    function success(response) {
      return { type: accountConstants[`POST_${nameSpace}_SUCCESS`], response };
    }
    function failure(error) {
      return { type: accountConstants[`POST_${nameSpace}_FAILURE`], error };
    }
    function resetPost() {
      return { type: accountConstants[`POST_${nameSpace}_RESET`] };
    }
};
