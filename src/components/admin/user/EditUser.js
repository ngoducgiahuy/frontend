
import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import './User.css';
import { putAuth } from '../../utils/httpHelper';
import EditIcon from '@material-ui/icons/Edit';

const EditUser = (props) => {
    const {
        buttonLabel,
        className,
        userData,
    } = props;

    const [modal, setModal] = useState(false);
    const [modalChange, setModalChange] = useState(false);
    const [responseMessage, setResponseMessage] = useState("");
    const [responseError, setResponseError] = useState("");
    const [adminCheckbox, setAdminCheckbox] = useState(false);
    const [staffCheckbox, setStaffCheckbox] = useState(false);
    const [userCheckbox, setUserCheckbox] = useState(false);

    var errorFlag = false;
    var dataUpdate = userData;

    console.log(userData);
    const toggle = () => {
        setModal(!modal);
        setModalChange(!modalChange);
    };

    const toggleCancel = () => {
        setModal(!modal)
        setModalChange(!modalChange);
        setResponseError("");
        setResponseMessage("");
    }

    function handleCheckBox(role) {
        if (role === 'admin') {
            setAdminCheckbox(!adminCheckbox);
        }
        if (role === 'staff') {
            setStaffCheckbox(!staffCheckbox);
        }
        if (role === 'user') {
            setUserCheckbox(!userCheckbox);
        }
    }

    const setRole = () => {
        userData.role.forEach(role => {
            if (role === 'ROLE_ADMIN') {
                setAdminCheckbox(true);
            }
            if (role === 'ROLE_STAFF') {
                setStaffCheckbox(true);
            }
            if (role === 'ROLE_USER') {
                setUserCheckbox(true);
            }
        });
    }

    useEffect(() => {
        setResponseError("");
        setAdminCheckbox(false);
        setStaffCheckbox(false);
        setUserCheckbox(false);
        setRole();
    }, [modal]);


    

    function validate(e) {
        if (adminCheckbox === false && staffCheckbox === false && userCheckbox === false) {
            errorFlag = true;
        }
    }


    function handleSubmit(e) {
        setResponseError("");
        e.preventDefault();
        validate(e);
        if (errorFlag === false) {
            var roleUpdate = []
            if (adminCheckbox) roleUpdate.push('admin');
            if (staffCheckbox) roleUpdate.push('staff');
            if (userCheckbox) roleUpdate.push('user');
            dataUpdate.role = roleUpdate;
            const body = JSON.stringify(dataUpdate);
            var uriCall = "/users/" + dataUpdate.id;
            putAuth(uriCall, body).then((response) => {
                if (response.status === 200) {
                    setResponseError("");
                    alert("Edit success!");
                    window.location.reload();
                }
            }).catch((error) => {
                setResponseError(error.response.data.message);
                setResponseMessage("");
            })
        } else {
            setResponseError("Please choose at least 1 role!")
        }
    }

    return (
        <div className="edit-btn">
            <Button color="primary" onClick={toggle}><EditIcon fontSize="small" />{buttonLabel}</Button>
            <Modal isOpen={modal} toggle={toggle} className={className}>
                <ModalHeader toggle={toggle}>Edit User {userData.username}</ModalHeader>
                {(responseError !== "") &&
                    <div>
                        <Alert color="danger">
                            {responseError}
                        </Alert>
                    </div>
                }
                {(responseMessage !== "") &&
                    <div>
                        <Alert color="success">
                            {responseMessage}
                        </Alert>
                    </div>
                }
                <ModalBody>
                    <Form onSubmit={(e) => handleSubmit(e)} method="post">
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            <Label for="username" className="mr-sm-2">Username</Label>
                            <Input className="mt-2" type="text" name="username" id="username" readOnly value={userData.username} />
                        </FormGroup>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            <Label for="name" className="mr-sm-2">Name</Label>
                            <Input className="mt-2" type="text" name="name" id="name" readOnly value={userData.name} />
                        </FormGroup>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            <Label for="phone" className="mr-sm-2">Phone</Label>
                            <Input className="mt-2" type="text" name="phone" id="phone" readOnly value={userData.phone} />
                        </FormGroup>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            <Label for="email" className="mr-sm-2">Email</Label>
                            <Input className="mt-2" type="text" name="email" id="email" readOnly value={userData.email} />
                        </FormGroup>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            <Label for="address" className="mr-sm-2">Address</Label>
                            <Input className="mt-2" type="text" name="address" id="address" readOnly value={userData.address} />
                        </FormGroup>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            Roles:
                            <div>
                                <span>Admin <input type="checkbox" defaultChecked={adminCheckbox} id="myCheck"
                                    onChange={() => handleCheckBox('admin')}></input></span>

                                <span className="margin-left-checkbox">Staff <input type="checkbox" defaultChecked={staffCheckbox} id="myCheck"
                                    onChange={() => handleCheckBox('staff')}></input></span>

                                <span className="margin-left-checkbox">User <input type="checkbox" defaultChecked={userCheckbox} id="myCheck"
                                    onChange={() => handleCheckBox('user')}></input></span>
                            </div>
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

export default EditUser;