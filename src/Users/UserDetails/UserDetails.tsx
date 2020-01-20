import React, {useState} from 'react';
import {Modal, ModalBody, Form, ModalHeader, Button} from 'reactstrap';
import {postAdminUser, getRoles} from '../../lib/api/url';
import { apiRequest } from "../../lib/api/api";
import Checkbox from '../../shared/components/Checkbox/Checkbox';
import { IAdminUser } from '../../shared/models/user';

const UserDetails = (props: any) => {
    const [modal, setModal] = useState(false);
    const [checkedItems, setCheckedItems] = useState(new Map());
    const [Roles, setRoles] = useState([] as any);
    const [assigning, setAssigning] = useState(false);
    const [unassigning, setUnassigning] = useState(false);

    const toggle = () => setModal(!props.show);

    const handleAllChecked = (e:any) => {
        let roles = Roles;
        roles.forEach((role:any) => role.isChecked = e.target.checked) 
        setRoles(roles);
        console.log(roles)
    }
    
    const  handleCheckFieldElement = (e: any) => {
        Roles.forEach((role: any) => {
            if (role.value === e.target.value)
                role.isChecked =  e.target.checked
        })
        console.log(Roles)
        setRoles(Roles);
    }

    const handleAssign = (roles: any) => {
        console.log(roles);
    }

    const handleUnassign = (roles: any) => {
        console.log(roles);
    }

    return (<Modal isOpen={modal} modalTransition={{ timeout: 200 }} toggle={toggle}>
                <ModalHeader toggle={toggle}>Add User</ModalHeader>
                <ModalBody>
                    <Form>
                        {props.authorities.length > 0 && <div>
                        <input type="checkbox" onChange={handleAllChecked}  value="checkedall" /> Authorities
                            <ul>
                            {
                            Roles.map((role: any, index: number) => {
                                return (<Checkbox key={index} handleCheckFieldElement={handleCheckFieldElement}  {...role} />)
                            })
                            }
                            </ul>

                        </div>}
                        <Button color="primary" onClick={handleAssign} className="assign-btn">{assigning && <i className="fa fa-spinner fa-spin"></i>}Assign Roles</Button>
                        <Button color="primary" onClick={handleUnassign} className="unassign-btn">{unassigning && <i className="fa fa-spinner fa-spin"></i>}Unassign Roles</Button>
                        {/* </FormGroup> */}
                    </Form>
                </ModalBody>
            </Modal>)
}

export default UserDetails;
