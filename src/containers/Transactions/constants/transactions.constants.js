import { createCRUDConstants } from "../../../utils/redux.utils";

export const nameSpace = "TRANSACTION";
export const transactionConstants = createCRUDConstants(nameSpace, [
  "DOWNLOAD"
]);
