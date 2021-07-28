import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import {
    Card, CardImg, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';
import Rating from '@material-ui/lab/Rating';
import './listproduct.css'
import { addCart } from '../cart/CartFunction';




export default class CardProduct extends Component {
    
    render() {
        return (
            <div>
                <Card className="product-div">
                    <Link className="product-link" to={`/product/${this.props.productData.id}`}>
                        <CardImg className="product-img" top src={`data:image/jpeg;base64,${this.props.productData.image}`} alt="Card image cap" />
                    </Link>
                    <CardBody>
                        <div className="product-data">
                            <CardTitle tag="h5">
                                <Link className="product-link" to={`/product/${this.props.productData.id}`}>
                                    {this.props.productData.name}
                                </Link>
                            </CardTitle>
                            <CardSubtitle tag="h6" className="mb-2 text-muted">{this.props.productData.price}</CardSubtitle>
                            <Rating name="half-rating-read" defaultValue={this.props.productData.ratingPoint} precision={0.1} readOnly />
                        </div>
                    </CardBody>
                    <Button color="primary" className="btn-add-cart" onClick={() => addCart(this.props.productData.id, this.props.productData.name,
                        this.props.productData.price, 1)}>Add to cart</Button>
                </Card>
            </div>
        )
    }
}
