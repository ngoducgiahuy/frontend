import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';
import './listproduct.css'




export default class CardProduct extends Component {
    componentDidMount() {
        console.log("did mount");
    }
    render() {
        return (
            <div>
                <Card className="product-div">
                    <Link className="product-link" to={`/product/${this.props.productData.id}`}>
                    <CardImg className="product-img" top src="https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80" alt="Card image cap" />
                    </Link>
                    <CardBody>
                        <div className="product-data">
                            <CardTitle tag="h5">
                                <Link className="product-link" to={`/product/${this.props.productData.id}`}>
                                    {this.props.productData.name}
                                </Link>
                            </CardTitle>
                            <CardSubtitle tag="h6" className="mb-2 text-muted">{this.props.productData.price}</CardSubtitle>
                        </div>
                        <Button>Button</Button>
                    </CardBody>
                </Card>
            </div>
        )
    }
}
