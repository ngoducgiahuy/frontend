import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Col, Container, Row } from 'reactstrap'
import './ProductDetail.css'
import '../../homepage/homepage.css'
import RatingSection from './ratingsection/RatingSection';
import { get } from '../../../utils/httpHelper';
import StarIcon from '@material-ui/icons/Star';
import { ratingPointFixed, priceFormat } from '../../../utils/functionHelper';
import { addCart } from '../../cart/CartFunction';

class ProductDetail extends Component {
    state = {
        product: [],
        index: 0
    };

    rating_point = 0;

    getProduct() {
        const uriCall = '/products/' + this.props.match.params.productId
        get(uriCall).then(response => {
            const product = response.data;
            this.setState({ product });
        }).catch((error) => {
            alert("Product Not Found!");
            window.location.replace("/homepage");
        });
    }

    componentDidMount() {
        this.getProduct();
    }



    render() {
        const { product } = this.state;
        console.log(product);
        this.rating_point = this.state.product.ratingPoint;
        return (
            <div className="margin-top">
                <Container className="no-margin-lr">
                    <Row>
                        <Col xs="3 margin-top">

                        </Col>
                        <Col xs="9">
                            <div className="app margin-top-product">
                                <div className="details">
                                    <div className="big-img">
                                        <img src={`data:image/jpeg;base64,${product.image}`}></img>
                                    </div>
                                    <div className="box">
                                        <div className="row">
                                            <h2>{product.name}</h2>
                                            <span>{priceFormat(product.price)}</span>
                                        </div>
                                        <div>
                                            Rating point:
                                            <span className="rating-avg">
                                                {ratingPointFixed(this.rating_point)}<StarIcon className="star-rating" />/5
                                                <StarIcon className="star-rating" />
                                            </span>
                                        </div>
                                        <p>{product.description}</p>
                                        <button className="cart" 
                                        onClick={() => addCart(product.id, product.name, product.price, 1)}> Add to cart
                                        </button>
                                    </div>
                                </div>
                                <hr />
                                <RatingSection productId={this.props.match.params.productId} />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>

        )
    }
}

export default withRouter(ProductDetail);
