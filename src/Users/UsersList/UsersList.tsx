import React, {useState} from 'react';
import {IAdminUser} from '../../shared/models/user';
import ActionButtons from '../ActionButtons/ActionButtons';
import {Modal, ModalBody, Form, ModalHeader, Button} from 'reactstrap';
import Checkbox from '../../shared/components/Checkbox/Checkbox';
import './UserList.css';

const UsersList = (props: IAdminUser) => {
    const {name, authorities, email} = props;
    const [assignedAuthorities, setAssignedAuthorities] = useState(authorities);
    const [modal, setModal] = useState(false);
    const [Roles, setRoles] = useState([] as any);
    const [assigning, setAssigning] = useState(false);
    const [unassigning, setUnassigning] = useState(false);

    const toggle = () => setModal(!modal);

    const handleAllChecked = (e:any) => {
        let roles = assignedAuthorities;
        roles.forEach((role:any) => role.isChecked = e.target.checked) 
        setAssignedAuthorities(roles);
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

    const showRow = (user: any) => {
        toggle();
        mapArray(user.authorities);
    }

    const mapArray = (arr: string[]) => {
        let mappedArray = [] as any;
        arr.map(element => {
            mappedArray.push({name: element, value: element, isChecked: false});
        });
        console.log(mappedArray);
        setAssignedAuthorities(mappedArray);
    }

    const roleName: any = authorities ? authorities[0] : '-';

    return (
        <>
            <tr>
                <td className="ellipsis">{name}</td>
                <td className="ellipsis">{roleName}</td>
                <td><ActionButtons handleEdit={()=>showRow({name, authorities, email} as IAdminUser)}/></td>
            </tr>
            <Modal isOpen={modal} modalTransition={{ timeout: 200 }} toggle={toggle}>
                <ModalHeader toggle={toggle}>{name}</ModalHeader>
                <ModalBody>
                    <Form>
                        {assignedAuthorities.length > 0 && <div className='form'>
                        <input type="checkbox" onChange={handleAllChecked}  value="checkedall" />Assigned Authorities
                            <ul>
                            {
                            assignedAuthorities.map((role: any, index: number) => {
                                return (<Checkbox key={index} handleCheckFieldElement={handleCheckFieldElement}  {...role} />)
                            })
                            }
                            </ul>
                        <Button color="primary" onClick={handleAssign} className="assign-btn">{assigning && <i className="fa fa-spinner fa-spin"></i>}Assign</Button> {' '}
                        </div>}
                        {assignedAuthorities.length > 0 && <div className='form'>
                        <input type="checkbox" onChange={handleAllChecked}  value="checkedall" />Unassigned Authorities
                            <ul>
                            {
                            assignedAuthorities.map((role: any, index: number) => {
                                return (<Checkbox key={index} handleCheckFieldElement={handleCheckFieldElement}  {...role} />)
                            })
                            }
                            </ul>
                            <Button color="primary" onClick={handleUnassign} className="unassign-btn">{unassigning && <i className="fa fa-spinner fa-spin"></i>}Unassign</Button>
                        </div>}
                        
                        {/* </FormGroup> */}
                    </Form>
                </ModalBody>
            </Modal>
        </>
    )
}

export default UsersList;