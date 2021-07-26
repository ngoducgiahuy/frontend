
import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
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
    // const [descriptionError, setDescriptionError] = useState("");

    var errorFlag = false;

    const toggle = () => setModal(!modal);

    function validate(e) {
        errorFlag = false
        var nameErrorTemp = "";
        var name = e.target.name.value.toString().trim()
        if (name == "") {
            nameErrorTemp = nameErrorTemp + "Name must not empty!";
            errorFlag = true;
        }
        setNameError(nameErrorTemp);
    }

    function handleSubmit(e) {
        e.preventDefault();
        validate(e);
        if (errorFlag === false) {
            const body = JSON.stringify({
                name: e.target.name.value,
                description: e.target.description.value,
            });
            console.log(body);
            var uriCall = "/categories/" + categoryId;
            putAuth(uriCall, body).then((response) => {
                if (response.status === 200) {
                    // setResponseMessage("Edit success!")
                    setResponseError("");
                    alert("Edit success!");
                    window.location.reload();
                }
            }).catch((error) => {
                console.log(error.response.data.message);
                setResponseError(error.response.data.message);
                setResponseMessage("");
            })
        }

        console.log({ responseMessage });
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
                    <Form onSubmit={(e) => handleSubmit(e)}>
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
                            <Button color="secondary" onClick={toggle}>Cancel</Button>
                        </FormGroup>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    );
}

export default EditCategory;