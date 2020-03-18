import { createCRUDConstants } from "../../../utils/redux.utils";

export const namespace = "ROLES"
export const rolesConstants = createCRUDConstants(namespace, ["UPDATE", "REMOVE"]);
