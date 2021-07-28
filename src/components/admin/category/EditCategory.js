
import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import './Category.css';
import { putAuth } from '../../utils/httpHelper';
import EditIcon from '@material-ui/icons/Edit';

const EditCategory = (props) => {
    const {
        buttonLabel,
        className,
        categoryId,
        categoryName,
        categoryDes,
    } = props;

    const [modal, setModal] = useState(false);
    const [nameError, setNameError] = useState("");
    const [responseMessage, setResponseMessage] = useState("");
    const [responseError, setResponseError] = useState("");
    const [cateName, setCateName] = useState(categoryName);
    const [cateDes, setCateDes] = useState(categoryDes);

    var errorFlag = false;

    const toggle = () => setModal(!modal);

    const toggleCancel = () => {
        setModal(!modal)
        setResponseError("");
        setResponseMessage("");
        setNameError("");
    }

    useEffect(() => {
        setResponseError("");
        setCateName(categoryName);
        setCateDes(categoryDes);
    }, [modal]);

    function validate(e) {
        setResponseError("");
        errorFlag = false
        var nameErrorTemp = "";
        var name = e.target.name.value.trim()
        if (name === "") {
            nameErrorTemp = nameErrorTemp + "Name must not empty!";
            errorFlag = true;
        }
        if (name===cateName.trim()&&e.target.description.value.trim()===cateDes.trim()) {
            setResponseError("Nothing change");
            errorFlag = true;
        }
        setNameError(nameErrorTemp);
    }

    function handleSubmit(e) {
        e.preventDefault();
        validate(e);
        if (errorFlag === false) {
            const body = JSON.stringify({
                name: e.target.name.value.trim(),
                description: e.target.description.value.trim(),
            });
            var uriCall = "/categories/" + categoryId;
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
        }
    }

    const changeName = e => {
        setCateName(e.target.value);
    }

    const changeDescription = e => {
        setCateDes(e.target.value);
    }

    return (
        <div className="edit-btn">
            <Button color="primary" onClick={toggle}><EditIcon fontSize="small" />{buttonLabel}</Button>
            <Modal isOpen={modal} toggle={toggle} className={className}>
                <ModalHeader toggle={toggle}>Edit category {categoryName}</ModalHeader>
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
                            <Label for="name" className="mr-sm-2">Name</Label>
                            <Input className="mt-2" type="text" name="name" id="name"
                                onChange={(e) => changeName(e)} value={cateName} />
                            <p>{nameError}</p>
                        </FormGroup>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0 mt-3">
                            <Label for="description" className="mr-sm-2">Description</Label>
                            <Input className="mt-2" type="text" name="description" id="description"
                                onChange={(e) => changeDescription(e)}
                                value={cateDes} />
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

export default EditCategory;