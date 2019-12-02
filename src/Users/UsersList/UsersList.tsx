import React from 'react';
import {IAdminUser, IUser} from '../../shared/models/user';
import ActionButtons from '../ActionButtons/ActionButtons';

const showRow = (user: IAdminUser) => {
    console.log(user);
}

const UsersList = (props: IAdminUser) => {
    const {id, name, authorities} = props;
    const roleName: any = authorities ? authorities[0] : '-';

    return (
        <tr onClick={()=>showRow({name, authorities})}>
            <td className="ellipsis">{name}</td>
            <td className="ellipsis">{roleName}</td>
            <td><ActionButtons /></td>
        </tr>
    )
}

export default UsersList;