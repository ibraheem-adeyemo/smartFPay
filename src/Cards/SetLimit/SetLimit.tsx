import React, {useState} from 'react';
import {Alert, Modal, ModalBody, ModalHeader, ModalFooter, Button, Form, FormGroup, Label, Input} from 'reactstrap';
import {postLimitControl} from '../../lib/api/url';
import { apiRequest } from "../../lib/api/api";

const SetLimit = () => {
    const [modal, setModal] = useState(true);
    const [error, setError] = useState('');
    const [visible, setVisible] = useState(false);
    const [token, setToken] = useState([] as any);
    const [duration, setDuration] = useState('');
    const [frequency, setFrequency] = useState(0);
    const [amount, setAmount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const toggle = () => setModal(!modal);

    const onDismiss = () => {
        setVisible(false);
        setError('');
    };

    const clearForm = () => {
        setDuration('');
        setFrequency(0);
        setAmount(0);
    }

    const toggleAlert = () => {
        setVisible(true);
        setTimeout(()=>onDismiss(), 5000);
    };

    const handleSetLimit = () => {
        alert(`${amount}${duration}${frequency}`)
        setLoading(true);
            apiRequest(postLimitControl, 'post', {
                token: [
                    {
                        "token": "1903939093939395",
                        "tokenType": "PAN"
                    }
                ],
                amountLimit: amount,
                labelSecurity: "heritage",
                limitDuration: duration,
                frequencyLimit: frequency,
                limitType: "BANK_TO_BANK_TRAN_LIMIT"
            }).then(res => {
                clearForm();
                if(res.responseMessage.toLowerCase() === "successful") {
                    console.log(res.responseMessage);
                    setSuccessMessage('Limit Set Successfully!');
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

    const validate = async (e: any) => {
        e.preventDefault();
        if(duration === "" || frequency === 0 || amount === 0) {
            console.log(duration);
            console.log(frequency);
            console.log(amount);
            setError('Kindly Enter the the required fields');
            toggleAlert();
        }
        else{
            handleSetLimit();
        }
    }

    return (
        <>
        {successMessage &&<Alert color="success" isOpen={visible} toggle={onDismiss} fade={false}>
                {successMessage}
            </Alert>}
        <Modal isOpen={modal} modalTransition={{ timeout: 200 }} toggle={toggle}>
                <ModalHeader toggle={toggle}>Add User</ModalHeader>
                <ModalBody>
        {error && <Alert color="danger" isOpen={visible} toggle={onDismiss} fade={false}>
                {error}
            </Alert>}
                    <Form onSubmit={validate}>
                        <FormGroup>
                            <Label for="amount">Amount</Label>
                            <Input
                            type="number"
                            name="amount"
                            placeholder="Amount Limit"
                            onChange={e => setAmount(parseInt(e.target.value))}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="duration">Duration</Label>
                            <Input
                            type="text"
                            name="duration"
                            placeholder="Limit Duration"
                            onChange={e => setDuration(e.target.value.trim())}
                            />
                        </FormGroup>  
                        <FormGroup>
                            <Label for="frequency">Frequency</Label>
                            <Input
                            type="number"
                            name="frequency"
                            placeholder="Frequency Limit"
                            onChange={e => setFrequency(parseInt(e.target.value))}
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
                    </Form>
                </ModalBody>
                <ModalFooter>
                <Button color="primary" onClick={validate} className="setLimit-btn">{loading && <i className="fa fa-spinner fa-spin"></i>}Set Limit</Button>
                <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
            </>
    );
};

export default SetLimit;
