import env from '../../env.js'


export const host = env().host;

//----AUTH MANAGEMENT URLS---//

export const postLogIn = host + '/oauth/token';
export const postAdminUser = host + '/api/v1/admin/users';
export const getRoles = host + '/api/v1/admin/users/roles';
export const changePassword = host + '/api/v1/admin/users/change-password';
export const putSetPassword = host + '/api/v1/admin/users/set-password';
export const postLimitControl = host + '/api/v1/controls/limit';
