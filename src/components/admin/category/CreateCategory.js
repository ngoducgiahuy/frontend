
import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import './Category.css';
import { postAuth } from '../../utils/httpHelper';

const CreateCategory = (props) => {
  const {
    buttonLabel,
    className
  } = props;

  const [modal, setModal] = useState(false);
  const [nameError, setNameError] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [responseError, setResponseError] = useState("");

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
  }, [modal]);

  function validate(e) {
    errorFlag = false
    var nameErrorTemp = "";
    var name = e.target.name.value.trim();
    if (name === "") {
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
        name: e.target.name.value.trim(),
        description: e.target.description.value.trim(),
      });
      postAuth("/categories", body).then((response) => {
        if (response.status === 201) {
          setResponseError("");
          alert("Create success!");
          window.location.reload();
        }
      }).catch((error) => {
        setResponseError(error.response.data.message);
        setResponseMessage("");
      })
    }

  }

  return (
    <div className="create-cate-btn">
      <Button color="success" onClick={toggle}>{buttonLabel}</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Create new category</ModalHeader>
        {(responseError !== "") &&
          <div>
            <Alert color="danger">
              {responseError}
            </Alert>
          </div>
        }
        <ModalBody>
          <Form onSubmit={(e) => handleSubmit(e)} method="post">
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Label for="name" className="mr-sm-2">Name</Label>
              <Input className="mt-2" type="text" name="name" id="name" placeholder="name" />
              <p>{nameError}</p>
            </FormGroup>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0 mt-3">
              <Label for="description" className="mr-sm-2">Description</Label>
              <Input className="mt-2" type="text" name="description" id="description" placeholder="description" />
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

export default CreateCategory;