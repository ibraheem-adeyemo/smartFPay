import { createCRUDConstants } from "../../../utils/redux.utils";

export const namespace = "ROLES"
export const permissionsNameSpace = "PERMISSIONS"
// export const rolesConstants = createCRUDConstants(namespace, ["UPDATE", "REMOVE"]);
export const rolesConstants = createCRUDConstants(namespace, ["TOGGLE"]);
