import { apiCall } from "../../../utils/api.utils";
import { API_URLS } from "../../../constants/apiUrls";

export const transactionService = {
    getAllTransactions,
    downloadTransactions
};

function getAllTransactions(params) {
  return apiCall(
    "GET",
    API_URLS.TRANSACTIONS.GET_ALLTRANSACTIONS,
    null,
    null,
    params
  );
}

function downloadTransactions(params) {
  return apiCall(
    "GET",
    API_URLS.TRANSACTIONS.DOWNLOAD_TRANSACTIONS,
    null,
    null,
    params,
    'transactions.csv'
  );
}
