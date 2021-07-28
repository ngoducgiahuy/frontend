import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import './Login.css';

export default class Login extends Component {
    render() {
        return (
            <div className="div-container">
                <div className="div-form">

                    <h2 className="login-title">Login Form</h2>
                    <Form className="login-form">
                        <FormGroup className="login-item">
                            <Label for="username" className="mr-sm-2 label-username">Username</Label>
                            <Input className="mt-2 input-username" type="text" name="username" id="username" placeholder="username" />
                        </FormGroup>
                        <FormGroup className="login-item">
                            <Label for="password" className="mr-sm-2 label-password">Password</Label>
                            <Input className="mt-2" type="password" name="password" id="password" placeholder="password" />
                        </FormGroup>
                        <FormGroup className="login-item">
                            <Button className="btn-login" color="primary" type="submit">Login</Button>
                        </FormGroup>
                    </Form>
                </div>
            </div>
        )
    }
}
