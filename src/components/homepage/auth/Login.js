import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';
import { post } from '../../utils/httpHelper';
import './Auth.css'

const Login = (props) => {
    const {
        buttonLabel,
        className
    } = props;

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    function handleLogin(e) {
        e.preventDefault();

        const body = JSON.stringify({
            username: e.target.username.value.trim(),
            password: e.target.password.value,
        });
        post("/auth/signin", body).then((response) => {
            if (response.status === 200) {
                Cookies.set('token', response.data.accessToken, { expires: 1 });
                Cookies.set('username', response.data.username, { expires: 1 });
                Cookies.set('email', response.data.email, { expires: 1 });
                Cookies.set('id', response.data.id, { expires: 1 });
                const roles = JSON.stringify(response.data.roles);
                Cookies.set('roles', roles, { expires: 1 });
                alert("Login success");
                window.location.reload();
            }
        }).catch((error) => {
            if (error.response.status === 404) {
                alert("The username or password is incorrect!");
            } else {
                alert(error.response.data.message);
            }
            e.target.username.value = "";
            e.target.password.value = "";
        })
    }

    return (
        <div>
            <a onClick={toggle}>{buttonLabel}</a>
            <Modal isOpen={modal} toggle={toggle} className={className}>
                <ModalHeader toggle={toggle}>Login form</ModalHeader>
                <ModalBody>
                    <Form onSubmit={(e) => handleLogin(e)} method="post">
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            <Label for="username" className="mr-sm-2">Username</Label>
                            <Input className="mt-2" type="text" name="username" id="username" placeholder="username" />
                        </FormGroup>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0 mt-3">
                            <Label for="password" className="mr-sm-2">Password</Label>
                            <Input className="mt-2" type="password" name="password" id="password" placeholder="password" />
                        </FormGroup>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0 mt-3 float-right">
                            <Button color="primary" type="submit">Login</Button>
                            <Button color="secondary" onClick={toggle}>Cancel</Button>
                        </FormGroup>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    );
}

export default Login;