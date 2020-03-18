import { alertConstants } from "../constants/alert.constants";

export function show(alertType, title, message) {
  return { type: alertConstants.SHOW, alertType, title, message };
}

export function clear() {
  return { type: alertConstants.CLEAR };
}
