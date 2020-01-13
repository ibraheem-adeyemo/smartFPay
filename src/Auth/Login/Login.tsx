import React, {useState} from 'react';
import base64 from 'base-64';
import {axiosInstance} from '../../lib/api/axiosClient';
import {postLogIn} from '../../lib/api/url';
import logo from '../../assets/logo.png';

import {FormGroup, Toast, ToastBody, ToastHeader, Label, Form, Input, Card, CardBody, Button, Alert} from 'reactstrap';
import './Login.css';

const Login = () => {
    const [showToast, setShowToast] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState('');
    const [visible, setVisible] = useState(true);

    const onDismiss = () => {
        setVisible(false);
        setError('');
    };

    const toggleAlert = () => {
        setVisible(true);
            setTimeout(()=>onDismiss(), 5000);
    }

    const toggleToast = () => setShowToast(!showToast);

    const validate = async (e: any) => {
        e.preventDefault();
        if(email === "" || password === "") {
            setError('Kindly Enter your email address and password');
            toggleAlert();
        }
        else{
            handleLogin();
        }
    }

    const handleLogin = () => {
        setLoading(true);
        axiosInstance.get(postLogIn, {
            headers: {
                Authorization: `Basic ${base64.encode(email + ":" + password)}`,
            },
            params: {},
            data: null
        })
        .then((res:any) => {
            setLoading(false);
            if(res.status === 200) {
                localStorage.setItem('email', email);
                localStorage.setItem('password', password);
            }   else {
                setError(res.message);
            }
        })
        .catch((error: any) => {
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
        });
    }

    return(
        <>
            {error && <Alert color="danger" isOpen={visible} toggle={onDismiss} fade={false}>
                {error}
            </Alert>}
            {successMessage &&<Alert color="success" isOpen={visible} toggle={onDismiss} fade={false}>
                {successMessage}
            </Alert>}
        <div className='login-screen'>
            {/* <Card>
                <CardBody> */}
                {/* <Toast isOpen={showToast}>
                    <ToastHeader toggle={toggleToast}>Error</ToastHeader>
                    <ToastBody>
                        Kindly Enter your email address and password
                    </ToastBody>
                </Toast> */}
                <div className="login-card">
                    <div className="logo">
                        <img src={logo} />
                    </div>
                    
                    <Form className="login-form" onSubmit={validate}>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            onChange={e => setEmail(e.target.value.trim())}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={e => setPassword(e.target.value.trim())}
                            />
                        </FormGroup>   
        <Button color="primary" className="login-btn">{loading && <i className="fa fa-spinner fa-spin"></i>}Sign In</Button>
                    </Form>
                </div>
            {/* </CardBody>
        </Card> */}
        </div>
        </>
    )
};

export default Login;
