import React, { Component } from 'react'
import { updateCart, deleteCartDetail } from './CartFunction';
import { Button } from 'reactstrap';
import DeleteIcon from '@material-ui/icons/Delete';

export default class CartDetailTableRow extends Component {
    state = {
        productId: this.props.cartDetailRow.productId,
        productName: this.props.cartDetailRow.productName,
        orderPrice: this.props.cartDetailRow.orderPrice,
        orderQuantity: this.props.cartDetailRow.orderQuantity,
        total: this.props.cartDetailRow.total,
    }
    handleQuantityChange(productId, e) {
        var orderQuantity = e.target.value;
        this.setState({ orderQuantity });
        updateCart(productId, e.target.value);
    }
    handleDeleteCartDetail(productId, productName) {
        if (window.confirm('Remove product ' + productName + '?')) {
            deleteCartDetail(productId);
        }
    }
    render() {
        return (
            // <div></div>
            <tr>
                <td>{this.state.productName}</td>
                <td>{this.state.orderPrice}</td>
                <td><input className="order-quantity-input" min="1" value={this.state.orderQuantity}
                    type="number" id="quantity" name="quantity" onChange={(e) => this.handleQuantityChange(this.state.productId, e)} /></td>
                <td>{this.state.total}</td>
                <td>
                    <Button className="margin-left" color="danger" onClick={()=> this.handleDeleteCartDetail(this.state.productId,this.state.productName)}>
                        <DeleteIcon fontSize="small" /> Delete
                    </Button>
                </td>
            </tr>
        )
    }
}
