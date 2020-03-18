import { createCRUDConstants } from "../../../utils/redux.utils";

export const permissionsNameSpace = "PERMISSIONS";
export const userNameSpace = "CURRENTUSER";

export const permissionConstants = createCRUDConstants(permissionsNameSpace);
export const userConstants = createCRUDConstants(userNameSpace);