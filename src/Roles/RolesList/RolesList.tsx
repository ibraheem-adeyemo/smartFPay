import React, {useState} from 'react';
import {ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle} from 'reactstrap';
import {IRole} from '../../shared/models/role';
import './RolesList.css';


const RolesList = () => {
const [open, setToggle] = useState(false); 
const [role, setRole] = useState('');

// const onChange = (e) => {
//     const name = e.target
// }

    return (
        <ButtonDropdown isOpen={open} toggle={() => setToggle(!open)}>
            <DropdownToggle caret color="primary">
                Assign Roles
            </DropdownToggle>
            <DropdownMenu>                                                                                        
                <DropdownItem  value="user" onClick={(e) => alert(e.currentTarget.value)}>User</DropdownItem>
                <DropdownItem  value="admin">Admin</DropdownItem>
                <DropdownItem  value="">System Admin</DropdownItem>
                <DropdownItem  value="user">Administrator</DropdownItem>
            </DropdownMenu>
        </ButtonDropdown>
    )
}

export default RolesList;