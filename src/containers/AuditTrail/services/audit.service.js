import { apiCall } from "../../../utils/api.utils";
import { API_URLS } from "../../../constants/apiUrls";

export const auditService = {
    getAllAuditReports,
    getAuditReport,
    downloadAuditReport
};

function getAllAuditReports(params) {
  return apiCall(
    "GET",
    API_URLS.AUDIT.GET_AUDIT_REPORTS,
    null,
    null,
    params
  );
}

function downloadAuditReport(params) {
  return apiCall(
    "GET",
    API_URLS.AUDIT.DOWNLOAD_AUDIT_REPORT,
    null,
    null,
    params
  );
}

function getAuditReport(id) {
  return apiCall("GET", `${API_URLS.AUDIT.GET_AUDIT_REPORT}${id}`);
}
