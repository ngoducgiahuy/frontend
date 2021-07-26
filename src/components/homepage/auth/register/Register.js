import Cookies from 'js-cookie';
import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import { post } from '../../../utils/httpHelper';
import '../Auth.css'

const Register = (props) => {
    const {
        buttonLabel,
        className
    } = props;

    const [modal, setModal] = useState(false);
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [responseError, setResponseError] = useState("");
    const [passwordRetypeError, setPasswordRetypeError] = useState("");


    var errorFlag = false

    const toggle = () => setModal(!modal);
    
    const toggleCancel = () => {
        setModal(!modal);
        setUsernameError("");
        setPasswordError("");
        setPhoneError("");
        setResponseError("");
        setPasswordRetypeError("");
    };

    function validate(e) {
        errorFlag = false
        var nameErrorTemp = "";
        var passwordErrorTemp = "";
        var passwordRetypeErrorTemp = "";
        var phoneErrorTemp = "";
        if (e.target.username.value.indexOf(' ') >= 0) {
            nameErrorTemp = nameErrorTemp + "Username cannot contain spaces!";
            // setUsernameError("Username cannot contain spaces!");
            errorFlag = true;   
        }

        if (e.target.username.value.toString().length<6) {
            nameErrorTemp = nameErrorTemp + " Username must contain 6 characters or more!";
            errorFlag = true;   
        }

        if (e.target.password.value.toString().length < 6) {
            passwordErrorTemp = passwordErrorTemp + "Password must contain 6 characters or more!"
            errorFlag = true;
        }

        if (e.target.password.value.indexOf(' ') >= 0) {
            passwordErrorTemp = passwordErrorTemp + " Password cannot contain spaces!";
            // setUsernameError("Username cannot contain spaces!");
            errorFlag = true;   
        }

        if (e.target.phone.value.toString().length != 10) {
            phoneErrorTemp = phoneErrorTemp + "Phone number must contain 10 characters!"
            errorFlag = true;
        }

        if(e.target.password.value.toString()!=e.target.passwordRetype.value.toString()) {
            passwordRetypeErrorTemp = passwordRetypeErrorTemp + "Password re-type is not correct!"
            errorFlag = true;
        }

        setUsernameError(nameErrorTemp);
        setPasswordError(passwordErrorTemp);
        setPhoneError(phoneErrorTemp);
        setPasswordRetypeError(passwordRetypeErrorTemp);
        
    }

    function handleRegister(e) {
        e.preventDefault();
        validate(e);
        console.log(e.target.username.value);
        console.log(errorFlag);
        if (errorFlag === false) {
            const body = JSON.stringify({
                username: e.target.username.value,
                password: e.target.password.value,
                email: e.target.email.value,
                phone: e.target.phone.value,
                address: e.target.address.value,
                name: e.target.name.value,
            });
            console.log(body);
            post("/auth/signup", body).then((response) => {
                if (response.status === 200) {
                    setResponseError("");
                    alert("Register success");
                    window.location.reload();
                }
            }).catch((error) => {
                console.log(error.response.data.message);
                setResponseError(error.response.data.message);

                e.target.password.value = "";
                e.target.passwordRetype.value = "";

            })
        }

    }

    return (
        <div>
            <a onClick={toggle}>{buttonLabel}</a>
            <Modal isOpen={modal} toggle={toggle} className={className}>
                <ModalHeader toggle={toggle}>Register form</ModalHeader>
                {(responseError!=="") &&
                <div>
                    <Alert color="danger">
                        {responseError}
                    </Alert>
                </div>
            }
                <ModalBody>
                    <Form onSubmit={(e) => handleRegister(e)}>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            <Label for="username" className="mr-sm-2">Username</Label>
                            <Input className="mt-2" type="text" name="username" id="username" placeholder="username" />
                            <p className="error-message">{usernameError}</p>
                        </FormGroup>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0 mt-3">
                            <Label for="password" className="mr-sm-2">Password</Label>
                            <Input className="mt-2" type="password" name="password" id="password" placeholder="password" />
                            <p className="error-message">{passwordError}</p>
                        </FormGroup>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0 mt-3">
                            <Label for="passwordRetype" className="mr-sm-2">Re-type Password</Label>
                            <Input className="mt-2" type="password" name="passwordRetype" id="passwordRetype" placeholder="Re-type Password" />
                            <p className="error-message">{passwordRetypeError}</p>
                        </FormGroup>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0 mt-3">
                            <Label for="name" className="mr-sm-2">Fullname</Label>
                            <Input className="mt-2" type="text" name="name" id="name" placeholder="name" />
                        </FormGroup>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            <Label for="email" className="mr-sm-2">Email</Label>
                            <Input className="mt-2" type="email" name="email" id="email" placeholder="email" />
                        </FormGroup>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            <Label for="phone" className="mr-sm-2">Phone Number</Label>
                            <Input className="mt-2" type="number" name="phone" id="phone" placeholder="phone" />
                            <p className="error-message">{phoneError}</p>
                        </FormGroup>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            <Label for="address" className="mr-sm-2">Address</Label>
                            <Input className="mt-2" type="text" name="address" id="address" placeholder="address" />
                        </FormGroup>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0 mt-3 float-right">
                            <Button color="primary" type="submit">Submit</Button>
                            <Button color="secondary" onClick={toggleCancel}>Cancel</Button>
                        </FormGroup>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    );
}

export default Register;