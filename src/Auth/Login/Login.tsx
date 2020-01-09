import React, {useState} from 'react';
import {FormGroup, Toast, ToastBody, ToastHeader, Label, Form, Input, Card, CardBody, Button, Alert} from 'reactstrap';
import './Login.css';

const Login = () => {
    const [showToast, setShowToast] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const toggleToast = () => setShowToast(!showToast);
    const hideToast = () => setShowToast(false);

    const validate = async (e: any) => {
        e.preventDefault();
        if(email === "" || password === "") {
            toggleToast();
            setTimeout(()=>setShowToast(false), 5000);
        }
        else{
            handleLogin();
        }
    }

    const handleLogin = () => {
        alert('User logged in!');
    }

    return(
        <div className="login_screen">
            <Card className='login-screen'>
                <CardBody>
                <Toast isOpen={showToast}>
                    <ToastHeader toggle={toggleToast}>Error</ToastHeader>
                    <ToastBody>
                        Kindly Enter your email address and password
                    </ToastBody>
                </Toast>
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
                    <Button color="primary" className="login-btn">Sign In</Button>
                </Form>
            </CardBody>
        </Card>
        </div>
    )
};

export default Login;
