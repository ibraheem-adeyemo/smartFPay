import React, {useState} from 'react';
import {Modal, ModalBody, ModalHeader, ModalFooter, Button, Form, FormGroup, Label, Input,CustomInput} from 'reactstrap';
import './FormModal.css';

interface IFormModal {
    title: string;
    primaryButtonLabel: string;
}

const FormModal = (props: IFormModal) => {
    const {title, primaryButtonLabel} = props;
    const [modal, setModal] = useState(false);

    const Roles = [{label: 'Role 1', value: 'ROLE_1'},{label: 'Role 2', value: 'ROLE_2'},{label: 'Role 3', value: 'ROLE_3'},{label: 'Role 4', value: 'ROLE_4'},{label: 'Role 5', value: 'ROLE_5'},{label: 'Role 6', value: 'ROLE_6'}]

    const toggle = () => setModal(!modal);
    return (
        <>
            <Button className="btn-create" onClick={toggle}>Create Admin</Button>
            <Modal isOpen={modal} modalTransition={{ timeout: 200 }} toggle={toggle}>
                <ModalHeader toggle={toggle}>{title}</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="userName">Username</Label>
                            <Input
                            type="text"
                            name="userName"
                            placeholder="userName"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            />
                        </FormGroup>                        
                        <FormGroup>
                            <Label for="exampleCheckbox">Checkboxes</Label>
                            <div>
                                {Roles.map((role, index) => (
                                    <CustomInput key={index} type="checkbox" label={role.label} />
                                ))}
                            </div>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                <Button color="primary" onClick={toggle}>{primaryButtonLabel}</Button>{' '}
                <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default FormModal;