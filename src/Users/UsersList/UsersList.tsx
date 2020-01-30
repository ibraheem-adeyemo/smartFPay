import React, {useState, useEffect, useMemo} from 'react';
import {IAdminUser} from '../../shared/models/user';
import ActionButtons from '../ActionButtons/ActionButtons';
import {Modal, ModalBody, Form, ModalHeader, Button} from 'reactstrap';
import Checkbox from '../../shared/components/Checkbox/Checkbox';
import './UserList.css';

const UsersList = (props: IAdminUser) => {
    const {name, authorities, email} = props;
    const [assignedAuthorities, setAssignedAuthorities] = useState(authorities);
    const [unassignedAuthorities, setUnassignedAuthorities] = useState([] as any);
    const [modal, setModal] = useState(false);
    const [Roles, setRoles] = useState([] as any);
    const [assigning, setAssigning] = useState(false);
    const [unassigning, setUnassigning] = useState(false);

    const toggle = () => setModal(!modal);

    const allIsChecked = useMemo(() => Roles.every((role: any) => role.isChecked === true), [Roles])

    const handleAllChecked = (e:any) => {
        setAssignedAuthorities(Roles.filter((role: any) => (role.isChecked)));
        // Check if every role is checked
        // If so, set them to true. Otherwise, set them to false
        setRoles(Roles.map((role: any) => ({...role, isChecked: !allIsChecked})));
    }

    useEffect(()=> {
        setAssignedAuthorities(Roles.filter((role: any) => (role.isChecked)).map((role: any)=>role.name));
    }, [Roles]);
    
    const  changeUnassignedAuthorities = (e: any, role: any, roleIndex: number) => {
        let value = e.target.value;
        let isChecked = e.target.checked;
        // Check if target checked state is different from its respective checked state in Roles state e.g. if it's already true, no need to setRole
        if(e.target.isChecked !== role.isChecked){
            //Get roles that aren't the same as the one that we're trying to set
            setRoles(
                [...Roles.slice(0, roleIndex),
                    {...role,
                        value,
                        isChecked
                    },
                    ...Roles.slice(roleIndex + 1)
                ]);
            setUnassignedAuthorities(Roles.map((role: any)=>role.name));
        }
    }

    const  changeAssignedAuthorities = (e: any, role: any, roleIndex: number) => {
        let value = e.target.value;
        let isChecked = e.target.checked;
        // Check if target checked state is different from its respective checked state in Roles state e.g. if it's already true, no need to setRole
        if(e.target.isChecked !== role.isChecked){
            //Get roles that aren't the same as the one that we're trying to set
            setRoles(
                [...Roles.slice(0, roleIndex),
                    {...role,
                        value,
                        isChecked
                    },
                    ...Roles.slice(roleIndex + 1)
                ]);
            setAssignedAuthorities(Roles.map((role: any)=>role.name));
        }
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
                                    return (<Checkbox key={index} handleCheckFieldElement={(e: any) => changeAssignedAuthorities(e, role, index)} isChecked={role.isChecked}  {...role} />)
                                })
                            }
                            </ul>
                        <Button color="primary" onClick={handleAssign} className="assign-btn">{assigning && <i className="fa fa-spinner fa-spin"></i>}Unassign</Button> {' '}
                        </div>}
                        {assignedAuthorities.length > 0 && <div className='form'>
                        <input type="checkbox" onChange={handleAllChecked}  value="checkedall" />Unassigned Authorities
                            <ul>
                            {
                            assignedAuthorities.map((role: any, index: number) => {
                                return (<Checkbox key={index} handleCheckFieldElement={(e: any) => changeUnassignedAuthorities(e, role, index)} isChecked={role.isChecked}  {...role} />)
                            })
                            }
                            </ul>
                            <Button color="primary" onClick={handleUnassign} className="unassign-btn">{unassigning && <i className="fa fa-spinner fa-spin"></i>}Assign</Button>
                        </div>}
                        
                        {/* </FormGroup> */}
                    </Form>
                </ModalBody>
            </Modal>
        </>
    )
}

export default UsersList;