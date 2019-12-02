import React, {useState} from 'react';
import {Button} from 'reactstrap';
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
    const users = [{name: 'Folamoluwa', authorities: ['SYS_ADMIN']}, {name: 'Anu', authorities: ['SYS_ADMIN']}, {name: 'Folarin', authorities: ['SYS_ADMIN']}];
    const roles= [{name:'SYS_ADMIN'}, {name:'ADMIN'}, {name:'SOME_ROLE'}, {name:'ANOTHER_ROLE'}];
    const [showCreateModal, setShowCreateModal] = useState(false);
    const showCreate = () => {
        console.log(showCreateModal);
        setShowCreateModal(!showCreateModal);
    };

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