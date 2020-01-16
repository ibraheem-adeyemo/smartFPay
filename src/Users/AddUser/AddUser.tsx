import React, {useState, useEffect} from 'react';
import {Alert, Modal, ModalBody, ModalHeader, ModalFooter, Button, Form, FormGroup, Label, Input,CustomInput} from 'reactstrap';
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
    const [checkedItems, setCheckedItems] = useState(new Map());
    const [Roles, setRoles] = useState([] as any);
    const [autorities, setAuthorities] = useState([] as any);
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

    const someroles = [{label: 'Role 1', value: 'ROLE_1', name:'role_1'},{label: 'Role 2', value: 'ROLE_2', name:'role_2'},{label: 'Role 3', value: 'ROLE_3', name:'role_3'},{label: 'Role 4', value: 'ROLE_4', name:'role_4'},{label: 'Role 5', value: 'ROLE_5', name:'role_5'},{label: 'Role 6', value: 'ROLE_6', name:'role_6'}]
    
    // setRoles(someroles);
    const toggle = () => setModal(!modal);

    const mapArray = (arr: string[]) => {
        let mappedArray = [] as any;
        arr.map(element => {
            mappedArray.push({name: element, value: element, isChecked: false});
        });
        console.log(mappedArray);
        setRoles(mappedArray);
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
        setCheckedItems(new Map());
    }

    const onGetRoles = () => {
        apiRequest(getRoles, 'get', {

        }).then(res => {
            console.log(res);
            mapArray([...res]);
            setSuccessMessage('Roles fetched Successfully!');
            toggleAlert();
        }) .catch((error:any) => {
            console.log(error.response.statusText);
            if(error.response) {
                setError(`Error ${error.response.status}: ${error.response.message}`);
            }
            setError(`Error ${error.response.status}: ${error.response.statusText}`);
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
                authorities: checkedItems,
                email,
                redirectUrl: 'http://localhost:9090/'
            }).then(res => {
                clearForm();
                console.log(res)
                setLoading(false);
                setSuccessMessage('Admin User Created Successfully!');
                toggle();
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

    const handleAllChecked = (e:any) => {
        let roles = Roles;
        roles.forEach((role:any) => role.isChecked = e.target.checked) 
        setRoles(roles);
        console.log(roles)
      }
    
     const  handleCheckChieldElement = (e: any) => {
        Roles.forEach((role: any) => {
           if (role.value === e.target.value)
              role.isChecked =  e.target.checked
        })
        setRoles(Roles);
      }
    
    return (
        <>
        {error && <Alert color="danger" isOpen={visible} toggle={onDismiss} fade={false}>
                {error}
            </Alert>}
            {successMessage &&<Alert color="success" isOpen={visible} toggle={onDismiss} fade={false}>
                {successMessage}
            </Alert>}
            <Button className="btn-create" onClick={toggle}>Create Admin</Button>
            <Modal isOpen={modal} modalTransition={{ timeout: 200 }} toggle={toggle}>
                <ModalHeader toggle={toggle}>Add User</ModalHeader>
                <ModalBody>
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
                        <input type="checkbox" onClick={handleAllChecked}  value="checkedall" /> Authorities
                            <ul>
                            {
                            Roles.map((role: any, index: number) => {
                                return (<Checkbox key={index} handleCheckChieldElement={handleCheckChieldElement}  {...role} />)
                            })
                            }
                            </ul>

                        </div>}
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