import { createCRUDConstants } from "../../../utils/redux.utils";

export const namespace = "CLIENTS"
export const permissionsNameSpace = "APP_PERMISSIONS"
// export const rolesConstants = createCRUDConstants(namespace, ["UPDATE", "REMOVE"]);
export const clientsConstants = createCRUDConstants(namespace, ["TOGGLE", "CRED", "REFRESH"]);
