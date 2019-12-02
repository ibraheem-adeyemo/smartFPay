import {IRole} from './role';

export interface IUser {
    user: {
        id?: string;
        lastLoggedIn?: Date | any;
        lastResetPasswordOn?: Date | any;
        username?: string;
        enabled?: boolean;
    };
    contact: {
        emailAddress: string;
        phoneNo: string;
    },
    address: {
        addressLine1: string;
        addressLine2: string;
        city: string;
        state: { id: string, name?: string }
        country: { id: string, name?: string },
    },
    person: {
        firstName: string;
        lastName: string;
    };
    domain: {
        id?: any,
        name?: string;
    };
    role: [{
        id?: any,
        name?: string;
    }];
}

export interface IAdminUser {
    id?: string | any;
    name: string;
    authorities: string[];
}