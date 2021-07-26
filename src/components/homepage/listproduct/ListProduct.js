import React, { Component } from 'react'
import { Col, Container, Row } from 'reactstrap'
import CardProduct from './CardProduct';
import Pagination from '../pagination/Pagination';
import { get } from '../../utils/httpHelper';
import './listproduct.css';

export default class ListProduct extends Component {
    state = {
        listProduct: [],
        loading: false,
        currentPage: 1,
        postsPerPage: 9,
    };


    componentDidMount() {
        this.getProductList();
    }

    getProductList() {
        const uriCall = this.props.uriCall;
        get(uriCall)
            .then(response => {
                const listProduct = response.data;
                this.setState({ listProduct });
                this.setState({ loading: false });
                // console.log(listProduct);
            })
            .catch((error) => console.log(error));
    }

    componentDidUpdate(prevProps) {
        if(prevProps.uriCall !== this.props.uriCall){
            this.getProductList();
            // console.log("DO update");
        }
    }

    render() {
    
        const paginate = pageNumber => this.setState({ currentPage: pageNumber });
        const listP = this.state.listProduct;
        const indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
        const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
        const currentPosts = listP.slice(indexOfFirstPost, indexOfLastPost);
        return (
            <div>
                <h3>{this.props.listTitle}</h3>
                <hr />
                <div className="div-flex">
                    {currentPosts.map(product =>
                        <div key={product.id} className="flex-item">
                            <CardProduct productData={product} />
                        </div>
                    )}
                </div>
                <Pagination postsPerPage={this.state.postsPerPage}
                    totalPost={listP.length}
                    paginate={paginate} />
            </div>
        )
    }
}
