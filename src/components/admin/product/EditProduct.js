
import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import './Product.css';
import { putAuth, get } from '../../utils/httpHelper';
import EditIcon from '@material-ui/icons/Edit';

const EditProduct = (props) => {
    const {
        buttonLabel,
        className,
        productData,
    } = props;

    const [modal, setModal] = useState(false);
    const [nameError, setNameError] = useState("");
    const [responseMessage, setResponseMessage] = useState("");
    const [responseError, setResponseError] = useState("");
    const [cateList, setCateList] = useState([]);


    const [categoryId, setCategoryId] = useState(productData.category_id);
    const [oldCategoryId, setOldCategoryId] = useState(productData.category_id);
    const [productName, setProductName] = useState(productData.name);
    const [productDescription, setProductDescription] = useState(productData.description);
    const [productPrice, setProductPrice] = useState(productData.price);
    const [productQuantity, setProductQuantity] = useState(productData.quantity);
    const [productImage, setProductImage] = useState(productData.image);


    var errorFlag = false;

    const toggle = () => setModal(!modal);


    useEffect(() => {
        getCateList();
    }, []);

    useEffect(() => {
    }, [productImage]);

    function getCateList() {
        const uriCall = "/categories/";
        get(uriCall)
            .then(response => {
                const listCategories = response.data;
                setCateList(listCategories)
            })
            .catch((error) => console.log(error));
    }



    const uploadImage = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        let image;
        const byteArr = base64.split(",");
        image = byteArr[1];
        setProductImage(image);
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
        var name = e.target.name.value.trim()
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
                quantity: e.target.quantity.value,
                price: e.target.price.value,
                category_id: categoryId,
                image: productImage,
            });
            var uriCall = "/products/" + productData.id;
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

    const handleOnChange = (e, field) => {
        if(field === 'name') {
            setProductName(e.target.value);
        }
        if(field === 'description') {
            setProductDescription(e.target.value);
        }
        if(field === 'price') {
            setProductPrice(e.target.value);
        }
        if(field === 'quantity') {
            setProductQuantity(e.target.value);
        }
    }

    return (
        
        <div className="edit-btn">
            <Button color="primary" onClick={toggle}><EditIcon fontSize="small" />{buttonLabel}</Button>
            <Modal isOpen={modal} toggle={toggle} className={className}>
                <ModalHeader toggle={toggle}>Edit product {productData.name} </ModalHeader>
                {(responseError !== "") &&
                    <div>
                        <Alert color="danger">
                            {responseError}
                        </Alert>
                    </div>
                }
                <ModalBody>
                    <Form onSubmit={(e) => handleSubmit(e)}  method="post">
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            <Label for="name" className="mr-sm-2">Name</Label>
                            <Input className="mt-2" type="text" name="name" id="name" required
                            onChange={(e) => handleOnChange(e,'name')} value={productName} />
                            <p>{nameError}</p>
                        </FormGroup>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            <Label for="category" className="mr-sm-2 mr-2">Category</Label>
                            <select className="select-cate" name="category"
                                id="category" onChange={(e) => setCategoryId(e.target.value)}>
                                {cateList.map(cate => {
                                    if (cate.id ===  oldCategoryId ) {
                                        return <option value={cate.id} selected>{cate.name}</option>
                                    } else {
                                        return <option value={cate.id}>{cate.name}</option>
                                    }
                                }
                                )}
                            </select>
                        </FormGroup>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            <Label for="price" className="mr-sm-2">Price</Label>
                            <Input className="mt-2" type="number" name="price" id="price" required
                            onChange={(e) => handleOnChange(e,'price')} value={productPrice} />
                        </FormGroup>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            <Label for="quantity" className="mr-sm-2">Quantity</Label>
                            <Input className="mt-2" type="number" name="quantity" id="quantity" required
                            onChange={(e) => handleOnChange(e,'quantity')} value={productQuantity} />
                        </FormGroup>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0 mt-3">
                            <Label for="description" className="mr-sm-2">Description</Label>
                            <Input className="mt-2" type="text" name="description" id="description" 
                            onChange={(e) => handleOnChange(e,'description')} value={productDescription} />
                        </FormGroup>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            <Label for="image" className="mr-sm-2">Product Image</Label>
                            <Input className="mt-2" type="file" name="image" id="image" onChange={(e) => {
                                uploadImage(e);
                            }} />
                            <img src={`data:image/jpeg;base64,${productImage}`} height="150px"></img>
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

export default EditProduct;