import React, {useState, useEffect} from 'react';
import { apiRequest } from "../../lib/api/api";
import {changePassword} from '../../lib/api/url';
import {Redirect} from 'react-router';
import logo from '../../assets/logo.png';
import {FormGroup, Label, Form, Input, Button, Alert} from 'reactstrap';
import './ChangePassword.css';

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [visible, setVisible] = useState(true);
    const [emailExists, setEmailExists] = useState(localStorage.getItem('email') as any);

    const onDismiss = () => {
        setVisible(false);
        setError('');
    };

    const clearForm = () => {
        setOldPassword('');
        setPassword('');
        setConfirmPassword('');
    }

    useEffect(()=>{
        console.log(localStorage.getItem('email'));
        console.log(localStorage.getItem('password'));
        // window.location.href = window.location.origin + '/dashboard';
    }, [emailExists])

    const toggleAlert = () => {
        setVisible(true);
        setTimeout(()=>onDismiss(), 5000);
    }

    const validate = async (e: any) => {
        e.preventDefault();
        if(oldPassword === "" || password === "" || confirmPassword === "") {
            setError('Kindly Enter the required details');
            toggleAlert();
        }
        else if(password !== confirmPassword) {
            setError('Kindly Confirm your new password');
            toggleAlert();
        }
        else{
            handleChangePassword();
        }
    }

    const handleChangePassword = () => {
        alert(`${oldPassword}${password}`)
        setLoading(true);
            apiRequest(changePassword, 'put', {
                oldPassword: oldPassword,
                password: password,
                confirmPassword: confirmPassword,
                redirectUrl: 'http://localhost:9090/'
            }).then(res => {
                console.log(res)
                setLoading(false);
                setSuccessMessage('Password Changed Successfully');
                // toggle();
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
                    // toggle();
                });
    };

    return(
        <>
            {error && <Alert color="danger" isOpen={visible} toggle={onDismiss} fade={false}>
                {error}
            </Alert>}
            {successMessage &&<Alert color="success" isOpen={visible} toggle={onDismiss} fade={false}>
                {successMessage}
            </Alert>}
        {emailExists && <div className='login-screen'>
                <div className="login-card">
                    <div className="logo">
                        <img src={logo} />
                    </div>
                    
                    <Form className="login-form" onSubmit={validate}>
                        <FormGroup>
                            <Label for="oldPassword">Old Password</Label>
                            <Input
                            type="password"
                            name="oldPassword"
                            placeholder="Old Password"
                            onChange={e => setOldPassword(e.target.value.trim())}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">New Password</Label>
                            <Input
                            type="password"
                            name="password"
                            placeholder="New Password"
                            onChange={e => setPassword(e.target.value.trim())}
                            />
                        </FormGroup>   
                        <FormGroup>
                            <Label for="confirmPassword">Confirm Password</Label>
                            <Input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            onChange={e => setConfirmPassword(e.target.value.trim())}
                            />
                        </FormGroup>
        <Button color="primary" className="login-btn">{loading && <i className="fa fa-spinner fa-spin"></i>}Change Password</Button>
                    </Form>
                </div>
        </div>}
        {!emailExists && <Redirect to={"/login"} push={true}/>}
        </>
    )
};

export default ChangePassword;
