import { auditService } from "../services/audit.service";
import { show as showAlert } from "../../Notifications/actions/alert.actions";
import { message } from "../../../constants/app.constants";
import { auditConstants, nameSpace } from "../constants/audit.constants";
import { appUtils } from "../../../utils/app.utils";

export const getAllAuditReports = requestParams => {
  return async dispatch => {
    dispatch(request(requestParams));
    try {
      const response = await auditService.getAllAuditReports(requestParams);
      response && dispatch(success(response));
    } catch (error) {
      dispatch(failure(error));
      dispatch(
        showAlert(
          "danger",
          "Failed to get report",
          error ? error : message.GENERIC_ERROR
        )
      );
    }
  };

  function request(request) {
    return { type: auditConstants[`GET_${nameSpace}_REQUEST`], request };
  }
  function success(response) {
    return { type: auditConstants[`GET_${nameSpace}_SUCCESS`], response };
  }
  function failure(error) {
    return { type: auditConstants[`GET_${nameSpace}_FAILURE`], error };
  }
};

export const downloadAuditReport = _requestParams => {
  const { pageSize, pageNumber, ...requestParams } = _requestParams
  return async dispatch => {
    try {
      if (!requestParams.startDate || !requestParams.endDate)
      {
        throw Error("Please pick a date range")
      }
      dispatch(request(requestParams));
      const response = await auditService.downloadAuditReport(requestParams);
      response && dispatch(success(response));
      response && appUtils.downloadFile("audit-trail.csv", response)
    } catch (error) {
      dispatch(failure(error));
      dispatch(
        showAlert(
          "danger",
          "Failed to download",
          error ? error : message.GENERIC_ERROR
        )
      );
    }
  };

  function request(request) {
    return { type: auditConstants[`DOWNLOAD_${nameSpace}_REQUEST`], request };
  }
  function success(response) {
    return { type: auditConstants[`DOWNLOAD_${nameSpace}_SUCCESS`], response };
  }
  function failure(error) {
    return { type: auditConstants[`DOWNLOAD_${nameSpace}_FAILURE`], error };
  }
};

export const getAuditReport = id => {
  return async dispatch => {
    dispatch(request(id));
    try {
      const response = await auditService.getAuditReport(id);
      response && dispatch(success(response));
    } catch (error) {
      dispatch(failure(error));
      dispatch(
        showAlert(
          "danger",
          "Failed to get report",
          error ? error : message.GENERIC_ERROR
        )
      );
    }
  };

  function request(request) {
    return { type: auditConstants[`VIEW_${nameSpace}_REQUEST`], request };
  }
  function success(response) {
    return { type: auditConstants[`VIEW_${nameSpace}_SUCCESS`], response };
  }
  function failure(error) {
    return { type: auditConstants[`VIEW_${nameSpace}_FAILURE`], error };
  }
};
