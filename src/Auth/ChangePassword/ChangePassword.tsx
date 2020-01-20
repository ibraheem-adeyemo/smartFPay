import React, {useState, useEffect} from 'react';
import base64 from 'base-64';
import { apiRequest } from "../../lib/api/api";
import {changePassword} from '../../lib/api/url';
import {Redirect} from 'react-router';
// import logo from '../../assets/logo.png';

import {FormGroup, Label, Form, Input, Button, Alert} from 'reactstrap';
import './Login.css';

const Login = () => {
    const [showToast, setShowToast] = useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [toastType, setToastType] = useState('');
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

    const toggleToast = () => setShowToast(!showToast);

    const validate = async (e: any) => {
        e.preventDefault();
        if(oldPassword === "" || password === "") {
            setError('Kindly Enter the required details');
            toggleAlert();
        }
        else{
            handleChangePassword();
        }
    }

    const handleChangePassword = () => {
        alert(`${oldPassword}${password}`)
        setLoading(true);
            apiRequest(changePassword, 'post', {
                oldPassword: oldPassword,
                password: password,
                confirmPassword: confirmPassword,
                redirectUrl: 'http://localhost:9090/'
            }).then(res => {
                clearForm();
                console.log(res)
                setLoading(false);
                setSuccessMessage('Admin User Created Successfully!');
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
                    clearForm();
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
        {!emailExists && <div className='login-screen'>
                <div className="login-card">
                    {/* <div className="logo">
                        <img src={logo} />
                    </div> */}
                    
                    <Form className="login-form" onSubmit={validate}>
                        <FormGroup>
                            <Label for="oldPassword">Old Password</Label>
                            <Input
                            type="text"
                            name="oldPassword"
                            placeholder="Old Password"
                            onChange={e => setOldPassword(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={e => setPassword(e.target.value)}
                            />
                        </FormGroup>   
                        <FormGroup>
                            <Label for="confirmPassword">Confirm Password</Label>
                            <Input
                            type="text"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            onChange={e => setConfirmPassword(e.target.value)}
                            />
                        </FormGroup>
        <Button color="primary" className="login-btn">{loading && <i className="fa fa-spinner fa-spin"></i>}Change Password</Button>
                    </Form>
                </div>
        </div>}
        {emailExists && <Redirect to={"/dashboard"} push={true}/>}
        </>
    )
};

export default Login;
