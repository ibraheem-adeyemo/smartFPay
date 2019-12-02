import React, {useState} from 'react';
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from 'reactstrap';
import {IRole} from '../../shared/models/role';
import './RolesList.css';


const RolesList = () => {
const [toggle, setToggle] = useState(false); 
const [role, setRole] = useState('');

// const onChange = (e) => {
//     const name = e.target
// }

    return (
        <Dropdown color="primary" isOpen={toggle} toggle={() => setToggle(!toggle)}>
            <DropdownToggle caret>
                Asssign Role
                </DropdownToggle>
            <DropdownMenu>
                <DropdownItem value="hhhhhh" onClick={(e) => alert(e.currentTarget.value)}>System Admin</DropdownItem>
                <DropdownItem>Admin</DropdownItem>
                <DropdownItem>Administrator</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    )
}

export default RolesList;