import { apiCall } from "../../../utils/api.utils";
import { API_URLS } from "../../../constants/apiUrls";

export const cardSearchService = {
  searchCards, getCardProgramsFromIssuer
};

function searchCards(params) {
  return apiCall(
    "GET",
    `${API_URLS.CARD_MANAGEMENT.SEARCH_CARD}`,
    null,
    null,
    params
  );
}

function getCardProgramsFromIssuer(param) {
  return apiCall(
    "GET",
    `${API_URLS.ISSUERS.GET_CARD_PROGRAMS}/${param}`
  );
}