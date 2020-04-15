import { apiCall } from "../../../utils/api.utils";
import { API_URLS } from "../../../constants/apiUrls";

export const auditService = {
    getAllAuditReports,
    getAuditReport
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

function getAuditReport(id) {
  return apiCall("GET", `${API_URLS.AUDIT.GET_AUDIT_REPORT}${id}`);
}
