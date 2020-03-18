import { apiCall } from "../../../utils/api.utils";
import { API_URLS } from "../../../constants/apiUrls";
import {store} from '../../../store';

export const cardRecordService = {
  getCardRecords,
  getCardRecord,
  reissuePin,
  blockCard,
  unblockCard
};

function getCardRecords(requestBody) {
  const domain = store.getState().currentUser.response.domainCode
  let customerUrl = API_URLS.CARD_MANAGEMENT.GET_CUSTOMERS_CARD;
  if(domain === "ISW") {
    customerUrl = API_URLS.CARD_MANAGEMENT.GET_CUSTOMERS_CARD_ADMIN
  }

  return apiCall(
    "POST",
    customerUrl,
    null,
    requestBody
  );
}

function reissuePin(encryptedPan){
  return apiCall("POST", API_URLS.CARD_MANAGEMENT.PIN_REISSUE, null, encryptedPan);
}

function blockCard(encryptedPan){
  return apiCall("POST", API_URLS.CARD_MANAGEMENT.BLOCK_CARD, null, encryptedPan);
}

function unblockCard(encryptedPan){
  return apiCall("POST", API_URLS.CARD_MANAGEMENT.UNBLOCK_CARD, null, encryptedPan);
}

function getCardRecord(requestObj) {
  const domain = store.getState().currentUser.response.domainCode
  let url = API_URLS.CARD_MANAGEMENT.GET_CARD_RECORD;
  if(domain === "ISW") {
    url = API_URLS.CARD_MANAGEMENT.GET_CARD_RECORD_ADMIN
  }
  return apiCall("POST", url, null, requestObj);
}
