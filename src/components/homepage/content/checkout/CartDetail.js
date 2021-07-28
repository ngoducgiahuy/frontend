import React, { Component } from 'react'
import {
    Card, CardHeader, CardFooter, CardBody,
    CardTitle
} from 'reactstrap';
import Cookies from 'js-cookie';
import { getCartTotalPrice } from '../../cart/CartFunction'

export default class CartDetail extends Component {
    render() {
        const orderDetails = JSON.parse(Cookies.get('orderDetails'));
        const cartTotal = getCartTotalPrice();
        return (
            <div>
                <Card>
                    <CardHeader style={{fontWeight: 'bold', textAlign:"center"}}>Cart Detail</CardHeader>
                    {Object.keys(orderDetails).map((keyName, i) => (
                        <CardBody className="card-body">
                            <CardTitle className="card-title" tag="h6">
                                {orderDetails[keyName].productName}  
                                <span className="span-quantity">x{orderDetails[keyName].orderQuantity}</span>
                            </CardTitle>
                            <span className="product-total-price">{orderDetails[keyName].total}</span>
                        </CardBody>
                    )
                    )}
                    <CardFooter className="card-footer">
                        <p className="total-cart">Total</p>
                        <p className="total-cart-price">{cartTotal}</p>
                    </CardFooter>
                </Card>
            </div>
        )
    }
}
