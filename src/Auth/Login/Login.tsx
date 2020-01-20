import React, {useState, useEffect} from 'react';
import base64 from 'base-64';
import {axiosInstance} from '../../lib/api/axiosClient';
import {postLogIn} from '../../lib/api/url';
import {Redirect} from 'react-router';
import logo from '../../assets/logo.png';

import {FormGroup, Label, Form, Input, Button, Alert} from 'reactstrap';
import './Login.css';

const Login = () => {
    const [showToast, setShowToast] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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
        if(email === 'admin@gmail.com' && password === 'Password12') {
            setLoading(false);
            localStorage.setItem('email', email);
            localStorage.setItem('password', password);
            setEmailExists(true);
        }   else {
            setLoading(false)
            setError('Wrong Email Address or Password');
            toggleAlert();
        }
        // axiosInstance.get(postLogIn, {
        //     headers: {
        //         Authorization: `Basic ${base64.encode(email + ":" + password)}`,
        //     },
        //     params: {},
        //     data: null
        // })
        // .then((res:any) => {
        //     setLoading(false);
        //     if(res.status === 200) {
        //         localStorage.setItem('email', email);
        //         localStorage.setItem('password', password);
        //     }   else {
        //         setError(res.message);
        //     }
        // })
        // .catch((error: any) => {
        //     setLoading(false);
        //     console.log(error);
        //     setError('Sorry, request could not be processed at the moment. Try again Later');
        //     toggleAlert();
            // if(error.reponse) {
            //     return (
            //         
            //     )
            // }   else{
                // return (
                //     
                // )
            //}
        // });
    }

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
        </div>}
        {emailExists && <Redirect to={"/dashboard"} push={true}/>}
        </>
    )
};

export default Login;
