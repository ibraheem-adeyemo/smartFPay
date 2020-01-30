import React, {useState} from 'react';
import {IAdminUser} from '../shared/models/user';
import UsersList from './UsersList/UsersList';
import AddUser from './AddUser/AddUser';
import {IRole} from '../shared/models/role';
import './Users.css';

interface IUsersProps {
    users: IAdminUser[];
    roles: IRole[];
}

const Users = () => {
    const users = [{name: 'Folamoluwa', authorities: ['ROLE_SUPER_ADMIN', 'ROLE_ADMIN_USER'], email: 'molu@gmail.com'}, {name: 'Anu', authorities: ['ROLE_SUPER_ADMIN', 'ROLE_ADMIN_USER'],  email: 'anu@gmail.com'}, {name: 'Folarin', authorities: ['ROLE_SUPER_ADMIN', 'ROLE_ADMIN_USER'], email: 'fola@gmail.com'}]
    const [showCreateModal, setShowCreateModal] = useState(false);

    let usersList;

    if(users.length > 0) {
        usersList = users.map((user, index) => (
            <UsersList {...user} key={index} />
        ));
    }

    return (
        <div className="admin-users">
            {/* <Button className="btn-create" onClick={showCreate}>Create Admin</Button> */}
            <AddUser />
            <div className="table-content">
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <td>Name</td>
                        <td>Role</td>
                        <td>Actions</td>
                    </tr>
                    </thead>
                    <tbody>
                    {usersList}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Users;
