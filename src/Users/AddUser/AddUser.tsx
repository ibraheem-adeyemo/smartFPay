import React, {useState, useEffect, useMemo} from 'react';
import {Alert, Modal, ModalBody, ModalHeader, ModalFooter, Button, Form, FormGroup, Label, Input} from 'reactstrap';
import './AddUser.css';
import {postAdminUser, getRoles} from '../../lib/api/url';
import { apiRequest } from "../../lib/api/api";
import Checkbox from '../../shared/components/Checkbox/Checkbox';

interface IFormModal {
    title: string;
    primaryButtonLabel: string;
}

const AddUser = () => {
    const [modal, setModal] = useState(false);
    const [Roles, setRoles] = useState([] as any);
    const [authorities, setAuthorities] = useState([] as any);
    const [userName, setUsername] = useState('');
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [visible, setVisible] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        onGetRoles();
        // console.log('Add usets')
    }, []);
    
    useEffect(()=> {
        setAuthorities(Roles.filter((role: any) => (role.isChecked)).map((role: any)=>role.name));
    }, [Roles]);

    const someroles = [{label: 'Role 1', value: 'ROLE_1', name:'role_1'},{label: 'Role 2', value: 'ROLE_2', name:'role_2'},{label: 'Role 3', value: 'ROLE_3', name:'role_3'},{label: 'Role 4', value: 'ROLE_4', name:'role_4'},{label: 'Role 5', value: 'ROLE_5', name:'role_5'},{label: 'Role 6', value: 'ROLE_6', name:'role_6'}]
    
    const toggle = () => setModal(!modal);

    const mapArray = (arr: string[]) => {
        setRoles(arr.map(role => {
            return {
                name: role,
                value: role,
                isChecked: false
            }}));
    }

    const onDismiss = () => {
        setVisible(false);
        setError('');
    };

    const toggleAlert = () => {
        setVisible(true);
        setTimeout(()=>onDismiss(), 5000);
    }

    const validate = async (e: any) => {
        e.preventDefault();
        if(email === "" || userName === "") {
            setError('Kindly Enter the email address and username of the user');
            toggleAlert();
        }
        else{
            handleAddUser();
        }
    }

    const clearForm = () => {
        setEmail('');
        setUsername('');
        setAuthorities([]);
    }

    const onGetRoles = () => {
        apiRequest(getRoles, 'get', {
        }).then(res => {
            console.log(res);
            mapArray([...res]);
            setSuccessMessage('Roles fetched Successfully!');
            toggleAlert();
        }) .catch((error:any) => {
            console.log(error);
            if(error.response) {
                setError(`Error ${error.response.status}: ${error.response.message}`);
            }
            setError(`Roles could not be fetched. Try again later`);
            toggleAlert();
            // if(error.reponse) {
            //     return (
            //         
            //     )
            // }   else{
                // return (
                //     
                // )
            //}
        });
    }

    const handleAddUser = () => {
        alert(`${email}${userName}`)
        setLoading(true);
            apiRequest(postAdminUser, 'post', {
                name: userName,
                authorities,
                email,
                redirectUrl: 'http://localhost:9090/'
            }).then(res => {
                clearForm();
                if(res.responseMessage.toLowerCase() === "successful") {
                    console.log(res.responseMessage);
                    setSuccessMessage('Admin User Created Successfully!');
                }
                if(res.status === 200) {
                    console.log(res)
                }
                setLoading(false);
                toggleAlert();
            })
                .catch((error:any) => {
                    setLoading(false);
                    console.log(error);
                    setError('Sorry, request could not be processed at the moment. Try again Later');
                    toggleAlert();
                    // if(error.reponse) {
                    //     return (
                    //         
                    //     )
                    // }   else{
                        // return (
                        //     
                        // )
                    //}
                    toggle();
                    clearForm();
                });
    };

    const allIsChecked = useMemo(() => Roles.every((role: any) => role.isChecked === true), [Roles])

    const handleAllChecked = (e:any) => {
        setAuthorities(Roles.filter((role: any) => (role.isChecked)));
        // Check if every role is checked
        // If so, set them to true. Otherwise, set them to false
        setRoles(Roles.map((role: any) => ({...role, isChecked: !allIsChecked})));
      }
    
    const  handleCheckFieldElement = (e: any, role: any, roleIndex: number) => {
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
            setAuthorities(Roles.map((role: any)=>role.name));
        }
    }
    
    return (
        <>
            {successMessage &&<Alert color="success" isOpen={visible} toggle={onDismiss} fade={false}>
                {successMessage}
            </Alert>}
            <Button className="btn-create" onClick={toggle}>Create Admin</Button>
            <Modal isOpen={modal} modalTransition={{ timeout: 200 }} toggle={toggle}>
                <ModalHeader toggle={toggle}>Add User</ModalHeader>
                <ModalBody>
        {error && <Alert color="danger" isOpen={visible} toggle={onDismiss} fade={false}>
                {error}
            </Alert>}
                    <Form onSubmit={validate}>
                        <FormGroup>
                            <Label for="userName">Username</Label>
                            <Input
                            type="text"
                            name="userName"
                            placeholder="Username"
                            onChange={e => setUsername(e.target.value.trim())}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            onChange={e => setEmail(e.target.value.trim())}
                            />
                        </FormGroup>                        
                        {/* <FormGroup check> */}
                            {/* <Label for="exampleCheckbox">Authorities</Label> */}
                            {/* <div>
                                {Roles.map((role, index) => (
                                    <CustomInput key={index} type="checkbox" name={role.name} checked={checkedItems.get(role.name)} label={role.label} onChange={handleCheckboxChange}/>
                                    <div key ={index}>
                                        <Label check>
                                        <Input type="checkbox" name={role.name} checked={checkedItems.get(role.name)} onChange={handleCheckboxChange}/>{' '}
                                        {role.name}
                                    </Label>
                                    </div>
                                ))}
                            </div> */}
                        {Roles.length > 0 && <div>
                        <input type="checkbox" onChange={handleAllChecked} checked={allIsChecked} /> Authorities
                            <ul>
                            {
                            Roles.map((role: any, index: number) => {
                                return (<Checkbox key={index} handleCheckFieldElement={(e: any) => handleCheckFieldElement(e, role, index)} isChecked={role.isChecked}  {...role} />)
                            })
                            }
                            </ul>
                        {allIsChecked && <div>You are assigning all authorities to this user</div>}
                        </div>}
                        <Input type="checkbox" />{' '}
          Check me out
                        {/* </FormGroup> */}
                    </Form>
                </ModalBody>
                <ModalFooter>
                <Button color="primary" onClick={validate} className="login-btn">{loading && <i className="fa fa-spinner fa-spin"></i>}Add User</Button>
                <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </>
    )
};

export default AddUser;
