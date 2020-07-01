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

export const CHANNELS_OPTIONS = [
  {label: "WEB", value: "WEB"},
  {label: "POS", value: "POS"},
  {label: "ATM", value: "ATM"}
];

export const CARD_STATUS_OPTIONS = [
  {label: "SUBSCRIBED", value: "SUBSCRIBED"},
  {label: "BLOCKED", value: "BLOCKED"}
];

export const BATCH_UPLOAD_TEMPLATE = `${appConfig.mufasaTemplateUrl}/batch_card_issuance.xlsx`;

export const CARD_REQUEST_TYPE = [
  { value: "single", label: "Single Card Request" },
  { value: "bulk", label: "Bulk Card Request" }
];

export const MAX_BATCH_FILE_SIZE = 512000;
