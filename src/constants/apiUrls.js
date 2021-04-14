import { appConfig } from "../config/config";


const { apiBaseUrl, apiVersion } = appConfig;
export const API_URLS = {
  AUTH: {
    LOGIN: `${apiBaseUrl}/auth/admin`
  },
  USERS: {
    GET_USERS: `${apiBaseUrl}/admin`,
    GET_USER: `${apiBaseUrl}/admin/`,
    POST_USER_ADMIN: `${apiBaseUrl}/admin`,
    FIND_USERS: `${apiBaseUrl}/users/find`,
    POST_USER_DOMAIN: `${apiBaseUrl}/domain`,
    GET_USER_DOMAIN: `${apiBaseUrl}/users/domains`,
    GET_USER_ROLE: `${apiBaseUrl}/users/role-mapping`,
    GET_ROLES_ADMIN: `${apiBaseUrl}/users/roles`,
    GET_ROLES_DOMAINS: `${apiBaseUrl}/users/domain`,

    ENABLE_USER: `${apiBaseUrl}/users/enable`,
    DISABLE_USER: `${apiBaseUrl}/users/disable`,

    GET_CURRENT_USER: `/${apiVersion}/user`,
    GET_PERMISSION: `/${apiVersion}/user/permissions`
  },
  LIMITS: {
    GET_CONTROLS: `${apiBaseUrl}/limit`,
    GET_CONTROL: `${apiBaseUrl}/limit`,
    POST_CONTROL: `${apiBaseUrl}/limit/account`,
    POST_CARD_CONTROL: `${apiBaseUrl}/limit/card`,

    ENABLE_ACCOUNT_LIMIT: `${apiBaseUrl}/controls/account/enable`,
    DISABLE_ACCOUNT_LIMIT: `${apiBaseUrl}/controls/account/disable`,

    ENABLE_CARD_LIMIT: `${apiBaseUrl}/controls/card/enable`,
    DISABLE_CARD_LIMIT: `${apiBaseUrl}/controls/card/disable`,

    DOWNLOAD_CONTROLS: `${apiBaseUrl}/limit/download`,
  },
  CUSTOMERS: {
    POST_CUSTOMER: `${apiBaseUrl}/customers/create`,
    GET_CUTOMER_BY_ACCOUNT: `${apiBaseUrl}/customers`,
    GET_CUSTOMERS: `${apiBaseUrl}/customers`,
    SUBSCRIBE_CUSTOMERS: `${apiBaseUrl}/customers/subscribe`,
    UNSUBSCRIBE_CUSTOMERS: `${apiBaseUrl}/customers/unsubscribe`
  },
  ISSUERS: {
    DOMAIN_MAPPINGS_URI: `${apiBaseUrl}/issuer`,
    GET_ALL_MAPPINGS: `${apiBaseUrl}/issuer/all`,
    GET_ALL_ISSUERS: `${apiBaseUrl}/issuer/list-all`,
    DOMAIN_MAPPINGS_URI_ADMIN: `${apiBaseUrl}/admin/issuer`,
    GET_CARD_PROGRAMS: `${apiBaseUrl}/issuer/card-programs`
  },
  SMARTCARDPROCESS: {
    GET_CONFIG_SETUP: `${apiBaseUrl}/scp/config`, //Query issuer code
    GET_PERSO_FORMATS: `${apiBaseUrl}/scp/perso-format`, // Query perso id
    GET_EMV_PROFILES: `${apiBaseUrl}/scp/emv-profile`, // Query issuer code & card profile code
    GET_SCP_ISSUERS: `${apiBaseUrl}/scp/issuers`,
    GET_CARDPROGRAM_COUNT: `${apiBaseUrl}/scp/card-program/count`
  },
  ISSUER_CONFIG: {
    GET_CONFIGS: `${apiBaseUrl}/config/all`, // Query Issuer code
    CONFIG_URI: `${apiBaseUrl}/config` // *3
  },
  CREATE_CARD_ADMIN: {
    GET_CARD_REQUESTS: `${apiBaseUrl}/admin/card/request`
  },
  DASHBOARD_STATS: {
    SUMMARY: `${apiBaseUrl}/dashboard`
  },
  CREATE_CARD: {
    GET_CARD_REQUESTS: `${apiBaseUrl}/card/request`,
    CREATE_SINGLE_CARD: `${apiBaseUrl}/card`,
    CREATE_MULTIPLE_CARD: `${apiBaseUrl}/card/multiple`
  },
  CARD_MANAGEMENT:{
    GET_DOMAIN_CUSTOMERS: `${apiBaseUrl}/card-record/customers`,
    GET_DOMAIN_CUSTOMERS_ADMIN: `${apiBaseUrl}/admin/card-record/customers`,
    GET_DOMAIN_CUSTOMER: `${apiBaseUrl}/card-record/customer`,
    GET_DOMAIN_CUSTOMER_ADMIN: `${apiBaseUrl}/admin/card-record/customer`,

    GET_CARD_RECORDS: `${apiBaseUrl}/card-record/cards`,
    GET_CARD_RECORD: `${apiBaseUrl}/card-record/card`,
    GET_CARD_RECORDS_ADMIN: `${apiBaseUrl}/admin/cards`,
    GET_CARD_RECORD_ADMIN: `${apiBaseUrl}/admin/card`,
    GET_CARD_STATEMENT: `${apiBaseUrl}/card/statements`,
    

    GET_CUSTOMERS_CARD: `${apiBaseUrl}/card-record/customer/cards`,
    GET_CUSTOMERS_CARD_ADMIN: `${apiBaseUrl}/admin/customer/cards`,

    GET_BATCH_CUSTOMERS: `${apiBaseUrl}/card-record/customer/batch`,
    GET_BATCH_CUSTOMER: `${apiBaseUrl}/card-record/batch/customers`,
    GET_ADMIN_BATCH_CUSTOMER: `${apiBaseUrl}/admin/card-record/batch/customers`,
    GET_BATCH_CUSTOMERS_BATCH: `${apiBaseUrl}/admin/card-record/customer/batch`,

    SEARCH_CARD: `${apiBaseUrl}/card-record/cards/search`,

    PIN_REISSUE: `${apiBaseUrl}/card/pins/reset`,
    BLOCK_CARD: `${apiBaseUrl}/card-record/cards/block`,
    UNBLOCK_CARD: `${apiBaseUrl}/card-record/cards/unblock`
  },
  AUDIT: {
    GET_AUDIT_REPORTS: `${apiBaseUrl}/audit/logs`,
    DOWNLOAD_AUDIT_REPORT: `${apiBaseUrl}/audit/download`,
  },
  ROLES: {
    GET_ALL_ROLES: `${apiBaseUrl}/role`,
    CREATE_ROLE: `${apiBaseUrl}/role`,
    REASSIGN_PERMISSIONS: `${apiBaseUrl}/role/permissions/reassign`,
    TOGGLE_ROLE: `${apiBaseUrl}/role`
  },
  PERMISSIONS: {
    GET_ALL_PERMISSIONS: `${apiBaseUrl}/role/permissions`
  },
  TRANSACTIONS: {
    GET_ALLTRANSACTIONS: `${apiBaseUrl}/transactions`,
    DOWNLOAD_TRANSACTIONS: `${apiBaseUrl}/transactions/download`,
  },
  TOKEN: {
    GENERATE_CHANNEL_TOKEN: `${apiBaseUrl}/auth/channel`,
  },
};
