import { createCRUDConstants } from "../../../utils/redux.utils";

export const nameSpace = "TOKEN";
export const tokenConstants = createCRUDConstants(nameSpace, [
  "GENERATE"
]);
