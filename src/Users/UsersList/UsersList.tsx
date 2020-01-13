import React from 'react';
import {IAdminUser} from '../../shared/models/user';
import ActionButtons from '../ActionButtons/ActionButtons';

const showRow = (user: IAdminUser) => {
    console.log(user);
}

const UsersList = (props: IAdminUser) => {
    const {name, authorities, email} = props;
    const roleName: any = authorities ? authorities[0] : '-';

    return (
        <tr onClick={()=>showRow({name, authorities, email})}>
            <td className="ellipsis">{name}</td>
            <td className="ellipsis">{roleName}</td>
            <td><ActionButtons name={name}/></td>
        </tr>
    )
}

export default UsersList;