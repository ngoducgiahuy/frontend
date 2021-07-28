import React, { Component } from 'react'
import './Cart.css'
import { getCartTotalPrice } from './CartFunction'
import CartDetailTable from './CartDetailTable'
import Cookies from 'js-cookie';
import DoneIcon from '@material-ui/icons/Done';

export default class CartDetailSection extends Component {

    orderDetails = JSON.parse(Cookies.get('orderDetails'));
    cartTotal = getCartTotalPrice();

    render() {
        return (
            <div>
                <div className="cart-detail-section allSides">
                    <h5>Cart Details</h5>
                    <hr />
                    <div className="cart-table">
                        <CartDetailTable cartDetail={this.orderDetails} />
                    </div>
                </div>
                <div className="cart-total-section allSides">
                    <table className="cart-total-table">
                        <tr style={{ textAlign: "center" }}>
                            <th colSpan="2">Cart Total</th>
                        </tr>
                        <tr>
                            <td style={{ fontWeight: "bold" }}>
                                Subtotal
                            </td>
                            <td>
                                {this.cartTotal}
                            </td>
                        </tr>
                        <tr>
                            <td style={{ fontWeight: "bold" }}>
                                Total
                            </td>
                            <td>
                                {this.cartTotal}
                            </td>
                        </tr>
                        <tr>
                            <td style={{ textAlign: "center" }} colSpan="2">
                                <a href="/checkout" className="btn btn-primary">
                                    <DoneIcon fontSize="small" /> Checkout
                                </a>
                            </td>
                        </tr>
                    </table>

                </div>
            </div>
        )
    }
}
