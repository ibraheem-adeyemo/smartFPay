import React, {useState} from 'react';
import {Modal, ModalBody, ModalHeader, ModalFooter, Button, Form, FormGroup, Label, Input} from 'reactstrap';
import './FormModal.css';

interface IFormModal {
    title: string;
    primaryButtonLabel: string;
}

const FormModal = (props: IFormModal) => {
    const {title, primaryButtonLabel} = props;
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);
    return (
        <>
            <Button className="btn-create" onClick={toggle}>Create Admin</Button>
            <Modal isOpen={modal} modalTransition={{ timeout: 200 }} toggle={toggle}>
                <ModalHeader toggle={toggle}>{title}</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input
                            type="password"
                            name="password"
                            placeholder="Password"
                            />
                        </FormGroup>                        
                        <FormGroup>
                            <Label for="confirmpassword">Confirm Password</Label>
                            <Input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            />
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