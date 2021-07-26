import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Col, Container, Row } from 'reactstrap'
import SideBar from '../../sidebar/Sidebar'
import './ProductDetail.css'
import '../../homepage/homepage.css'
import Rating from './ratingsection/RatingSection';
import { get } from '../../../utils/httpHelper';
import { Redirect } from 'react-router'

class ProductDetail extends Component {
    state = {
        products: [
            {
                "id": "1",
                "title": "Nike Shoe s Nike Shoe s Nike Shoe s Nike Shoe s",
                "src": "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80",
                "description": "UI/UX designing, html css tutorials",
                "content": "Welcome to our channel Dev AT. Here you can learn web designing, UI/UX designing, html css tutorials, css animations and css effects, javascript and jquery tutorials and related so on.",
                "price": 23,
                "colors": ["red", "black", "crimson", "teal"],
                "count": 1
            }
        ],
        product: [],
        index: 0
    };

    getProduct() {
        const uriCall = '/products/' + this.props.match.params.productId
        get(uriCall).then(response => {
            const product = response.data;
            this.setState({ product });
            console.log(this.state.product);
        }).catch((error) => {
            console.log(error);
            alert("Product Not Found!");
            window.location.replace("/homepage");
        });
    }

    componentDidMount() {
        // alert(this.props.match.params.productId);
        this.getProduct();
    }



    render() {
        const { product } = this.state;
        return (
            <div className="margin-top">
                <Container className="no-margin-lr">
                    <Row>
                        <Col xs="3 margin-top">
                            
                        </Col>
                        <Col xs="9">
                            <div className="app margin-top-product">
                                {/* {
                                    products.map(item => ( */}
                                <div className="details">
                                    <div className="big-img">
                                        <img src="https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80"></img>
                                    </div>
                                    <div className="box">
                                        <div className="row">
                                            <h2>{product.name}</h2>
                                            <span>${product.price}</span>
                                        </div>
                                        <p>{product.description}</p>
                                        <button className="cart">Add to cart</button>
                                    </div>
                                </div>
                                {/* ))
                                } */}
                                <hr />
                                <Rating productId={this.props.match.params.productId} />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>

        )
    }
}

export default withRouter(ProductDetail);
