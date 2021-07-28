
import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import './Product.css';
import { postAuth, get } from '../../utils/httpHelper';

const CreateProduct = (props) => {
    const {
        buttonLabel,
        className,
    } = props;



    const [modal, setModal] = useState(false);
    const [nameError, setNameError] = useState("");
    const [responseMessage, setResponseMessage] = useState("");
    const [responseError, setResponseError] = useState("");
    const [cateList, setCateList] = useState([]);
    const [categoryId, setCategoryId] = useState("");


    const [base64, setBase64] = useState("");

    var errorFlag = false;

    const toggle = () => setModal(!modal);


    useEffect(() => {
        getCateList();
    }, []);

    function getCateList() {
        const uriCall = "/categories/";
        get(uriCall)
            .then(response => {
                const listCategories = response.data;
                setCateList(listCategories);
                setCategoryId(listCategories[0].id);
            })
            .catch((error) => console.log(error));
    }

    const uploadImage = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        setBase64(base64);
    };

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    function validate(e) {
        errorFlag = false
        var nameErrorTemp = "";
        var name = e.target.name.value.toString().trim();
        if (name === "") {
            nameErrorTemp = nameErrorTemp + "Name must not empty!";
            errorFlag = true;
        }
        setNameError(nameErrorTemp);
    }

    function handleSubmit(e) {
        e.preventDefault();
        let image;
        if (e.target.image.files.length !== 0) {
            const byteArr = base64.split(",");
            image = byteArr[1];
        }
        validate(e);
        if (errorFlag === false) {
            const body = JSON.stringify({
                name: e.target.name.value.trim(),
                description: e.target.description.value.trim(),
                quantity: e.target.quantity.value,
                price: e.target.price.value,
                category_id: categoryId,
                image: image,
            });
            postAuth("/products", body).then((response) => {
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
                            <Input className="mt-2" type="text" name="name" id="name" placeholder="name" required/>
                            <p>{nameError}</p>
                        </FormGroup>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            <Label for="category" className="mr-sm-2 mr-2">Category</Label>
                            <select className="select-cate" name="category"
                                id="category" onChange={(e) => setCategoryId(e.target.value)}>
                                {cateList.map(cate =>
                                    <option value={cate.id}>{cate.name}</option>
                                )}
                            </select>
                        </FormGroup>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            <Label for="price" className="mr-sm-2">Price</Label>
                            <Input className="mt-2" type="number" name="price" id="price" placeholder="price" required/>
                        </FormGroup>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            <Label for="quantity" className="mr-sm-2">Quantity</Label>
                            <Input className="mt-2" type="number" name="quantity" id="quantity" required placeholder="quantity" />
                        </FormGroup>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0 mt-3">
                            <Label for="description" className="mr-sm-2">Description</Label>
                            <Input className="mt-2" type="text" name="description" id="description" placeholder="description" />
                        </FormGroup>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            <Label for="image" className="mr-sm-2">Product Image</Label>
                            <Input className="mt-2" type="file" name="image" id="image" required onChange={(e) => {
                                uploadImage(e);
                            }} />
                            <img src={base64} height="150px"></img>
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
export default CreateProduct;