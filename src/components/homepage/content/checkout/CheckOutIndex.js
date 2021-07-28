import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import './Checkout.css'
import CartDetail from './CartDetail';
import Cookies from 'js-cookie';
import { getCartTotalPrice } from '../../cart/CartFunction';
import { postAuth } from '../../../utils/httpHelper';

export default class CheckOutIndex extends Component {

    state = {
        addressError: "",
        errorFlag: false,
        responseError: "",
    }

    validate(e) {
        var errorFlag = false
        var addressErrorTemp = "";
        var address = e.target.address.value.toString().trim()
        if (address === "") {
            addressErrorTemp = addressErrorTemp + "Address must not empty!";
            errorFlag = true;
        }
        this.setState({ addressError: addressErrorTemp });
        return errorFlag;
    }


    handleSubmit(e) {
        e.preventDefault();
        var errorFlag = this.validate(e);
        if (!errorFlag) {
            var customerId = Cookies.get('id');
            const orderDetailsObject = JSON.parse(Cookies.get('orderDetails'));
            const cartTotal = getCartTotalPrice();
            var orderDetailArray = [];

            for (const [productId, productData] of Object.entries(orderDetailsObject)) {
                orderDetailArray.push(productData)
            }

            const body = JSON.stringify({
                customerId: customerId,
                orderAddress: e.target.address.value,
                note: e.target.note.value,
                totalPrice: cartTotal,
                orderDetails: orderDetailArray
            });

            var uriCall = "/orders/";
            postAuth(uriCall, body).then((response) => {
                if (response.status === 201) {
                    alert("Submit order success");
                    Cookies.remove('orderDetails');
                    window.location.href = "/cart";
                }
            }).catch((error) => {
                this.setState({responseError: error.response.data.message});
            })

        }
    }
    render() {
        return (
            <div className="checkout-section">
                <div className="checkout-information-section allSides">
                    <h5>Checkout</h5>
                    {(this.state.responseError !== "") &&
                        <div>
                            <Alert color="danger">
                                {this.stateresponseError}
                            </Alert>
                        </div>
                    }
                    <hr />
                    <div className="checkout-form">
                        <Form onSubmit={(e) => this.handleSubmit(e)} method="post">
                            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                <Label for="address" className="mr-sm-2">Receive order address</Label>
                                <Input className="mt-2" type="text" name="address" id="address" placeholder="Address" />
                                <p style={{ color: "red", fontStyle: "italic" }}>{this.state.addressError}</p>
                            </FormGroup>
                            <FormGroup className="mb-2 mr-sm-2 mb-sm-0 mt-3">
                                <Label for="note" className="mr-sm-2">Note</Label>
                                <textarea className="text-area-note" id="note" name="note" rows="4" cols="80" />
                            </FormGroup>
                            <FormGroup className="mt-4">
                                <Button color="primary" type="submit">Checkout</Button>
                            </FormGroup>
                        </Form>
                    </div>
                </div>
                <div className="cart-detail allSides">
                    <CartDetail />
                </div>
            </div>
        )
    }
}
