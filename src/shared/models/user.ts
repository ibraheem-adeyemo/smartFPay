import {IRole} from './role';

export interface IAdminUser {
    name: string,
    authorities: string[],
    email: string,
    redirectUrl?: string
}
