import { createCRUDConstants } from "../../../utils/redux.utils";

export const nameSpace = "AUDIT";
export const auditConstants = createCRUDConstants(nameSpace, [
  "DOWNLOAD"
]);
