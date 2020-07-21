import { apiCall } from "../../../utils/api.utils";
import { API_URLS } from "../../../constants/apiUrls";
import {store} from '../../../store';

export const customersService = {
  getCustomers,
  getCustomerByAccountNumber,
  postCustomer,
  subscribeCustomer,
  unsubscribeCustomer
};

function postCustomer(request) {
  // const method = id ? "PUT" : "POST";
  return apiCall("POST", API_URLS.CUSTOMERS.POST_CUSTOMER, null, request);
}

function getCustomers(params) {
  // const domain = store.getState().currentUser.response.domainCode
  // let url = API_URLS.CARD_MANAGEMENT.GET_DOMAIN_CUSTOMERS;
  // let urlBatch = API_URLS.CARD_MANAGEMENT.GET_BATCH_CUSTOMERS
  // if(domain === "ISW") {
  //   url = API_URLS.CARD_MANAGEMENT.GET_DOMAIN_CUSTOMERS_ADMIN
  //   urlBatch = API_URLS.CARD_MANAGEMENT.GET_BATCH_CUSTOMERS_BATCH
  // }
  return apiCall(
    "GET",
    API_URLS.CUSTOMERS.GET_CUSTOMERS ,
    null,
    null,
    params
  );
}

// function getCustomerByAccountNumber(requestBody) {
//   const domain = store.getState().currentUser.response.domainCode
//   let url = API_URLS.CARD_MANAGEMENT.GET_DOMAIN_CUSTOMER;
//   if(domain === "ISW") {
//     url = API_URLS.CARD_MANAGEMENT.GET_DOMAIN_CUSTOMER_ADMIN
//   }
//   return apiCall("POST", url, null, requestBody);
// }

function getCustomerByAccountNumber(accountNumber) {
  const domain = store.getState().currentUser.response.domainCode
  let url = API_URLS.CUSTOMERS.GET_CUTOMER_BY_ACCOUNT;
  // if(domain === "ISW") {
  //   url = API_URLS.CARD_MANAGEMENT.GET_ADMIN_BATCH_CUSTOMER
  // }
  return apiCall("GET", `${url}/${accountNumber}`);
}

function subscribeCustomer(accountNumber) {
  return apiCall("POST", API_URLS.CUSTOMERS.SUBSCRIBE_CUSTOMERS, null, accountNumber);
}

function unsubscribeCustomer(accountNumber) {
  return apiCall("POST", API_URLS.CUSTOMERS.UNSUBSCRIBE_CUSTOMERS, null, accountNumber);
}

