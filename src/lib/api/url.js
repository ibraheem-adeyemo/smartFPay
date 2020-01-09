import env from '../../../env.js'


export const host = env().host;

//----AUTH MANAGEMENT URLS---//

export const postLogIn = credentials  + '/oauth/token';
