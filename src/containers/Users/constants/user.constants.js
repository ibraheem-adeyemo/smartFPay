import { createCRUDConstants } from "../../../utils/redux.utils";

export const nameSpace = "USERS";
export const userConstants = createCRUDConstants(nameSpace, [
  "TOGGLE",
  "ROLE",
  "ROLECHANGE"
]);
