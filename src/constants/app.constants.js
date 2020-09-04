import { appConfig } from "../config/config";

export const portalUrl = `${appConfig.portalUrl}/home`;
export const logoutUrl = `${appConfig.portalUrl}/logout`;

export const message = {
  GENERIC_ERROR:
    "Could not perform requested action. Please contact your administrator",
  OUTDATED_DATA:
    "The data displayed below might be outdated. Click 'Refresh' to update."
};

export const PAGE_SIZE_OPTIONS = [5, 10, 20, 30, 40, 50];

export const TITLE = [
  { name: "Mr", value: "mr" },
  { name: "Miss", value: "miss" },
  { name: "Mrs.", value: "mrs" }
];

export const ACCOUNT_TYPES = [
  { id: "1", value: "00", label: "Not sure" },
  { id: "2", value: "20", label: "Current Account" },
  { id: "3", value: "10", label: "Savings Account" }
];

export const FREQUENCY_OPTIONS = [
  {label: "DAILY", value: "DAILY"},
  {label: "WEEKLY", value: "WEEKLY"},
  {label: "MONTHLY", value: "MONTHLY"}
];

export const ACTION_TYPES = [
  {label: "Create User", value: "CREATE_USER"}
,{label: "View User", value: "VIEW_USER"}
,{label: "Delete User", value: "DELETE_USER"}
,{label: "Create Role", value: "CREATE_ROLE"}
,{label: "Create Admin User", value: "CREATE_ADMIN_USER"}
,{label: "Update Admin User", value: "UPDATE_ADMIN_USER"}
,{label: "View Admin Users", value: "VIEW_ADMIN_USERS"}
,{label: "Admin User login", value: "ADMIN_USER_LOGIN"}
,{label: "Update Role", value: "UPDATE_ROLE"}
,{label: "Reassign Role", value: "REASSIGN_ROLE"}
,{label: "View Permissions", value: "VIEW_PERMISSIONS"}
,{label: "View Roles", value: "VIEW_ROLES"}
,{label: "Download Action Logs", value: "DOWNLOAD_ACTION_LOGS"}
,{label: "View Tranactions", value: "VIEW_TRANSACTIONS"}
,{label: "Download Trasactions", value: "DOWNLOAD_TRANSACTIONS"}
,{label: "Update User Info", value: "UPDATE_USER_INFO"}
,{label: "Create Customer", value: "CREATE_CUSTOMER"}
,{label: "Change Customer Status", value: "CHANGE_CUSTOMER_STATUS"}
,{label: "Subscribe Customer", value: "SUBSCRIBE_CUSTOMER"}
,{label: "Unsubscribe Customer", value: "UNSUBSCRIBE_CUSTOMER"}
,{label: "View Customer Info", value: "VIEW_CUSTOMER_INFO"}
,{label: "View Customers", value: "VIEW_CUSTOMERS"}
,{label: "Set Account Limit", value: "SET_ACCOUNT_LIMIT"}
,{label: "Set Card Limit", value: "SET_CARD_LIMIT"}
,{label: "View Limits", value: "VIEW_LIMITS"}
,{label: "Download Limits", value: "DOWNLOAD_LIMITS"}
,{label: "Channel Configuration", value: "CHANNEL_CONFIGURATION"}
,{label: "View Action Logs", value: "VIEW_ACTIONS_LOGS"}
,{label: "Generate Channel Token", value: "GENERATE_CHANNEL_TOKEN"}
,{label: "Send Notification", value: "SEND_NOTIFICATION"}
]

export const CHANNELS_OPTIONS = [
  {label: "WEB", value: "WEB"},
  {label: "POS", value: "POS"},
  {label: "ATM", value: "ATM"}
];

export const CARD_STATUS_OPTIONS = [
  {label: "ACTIVE", value: "ACTIVE"},
  {label: "BLOCKED", value: "BLOCKED"}
];

export const BATCH_UPLOAD_TEMPLATE = `${appConfig.mufasaTemplateUrl}/batch_card_issuance.xlsx`;

export const CARD_REQUEST_TYPE = [
  { value: "single", label: "Single Card Request" },
  { value: "bulk", label: "Bulk Card Request" }
];

export const MAX_BATCH_FILE_SIZE = 512000;
