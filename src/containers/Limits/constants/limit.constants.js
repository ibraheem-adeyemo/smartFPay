import { createCRUDConstants } from "../../../utils/redux.utils";

export const nameSpace = "CONTROLS";
export const controlConstants = createCRUDConstants(nameSpace, [
  "TOGGLE_ACCOUNT_CONTROL",
  "TOGGLE_CARD_CONTROL"
]);
