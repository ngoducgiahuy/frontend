import React, { Component } from 'react'
import { Table } from 'reactstrap';
import { Button } from 'reactstrap';
import DeleteIcon from '@material-ui/icons/Delete';
import { get, deleteAuth } from '../../utils/httpHelper'
import Pagination from '../../homepage/pagination/Pagination';
import EditProduct from './EditProduct';



export default class ProductTale extends Component {
    state = {
        listProduct: [],
        loading: false,
        currentPage: 1,
        postsPerPage: 9,
        responseError: "",
        listCate: this.props.listCate,
    };

    getProductList() {
        const uriCall = "/products/";
        get(uriCall)
            .then(response => {
                const listProduct = response.data;
                this.setState({ listProduct });
                this.setState({ loading: false });
            })
            .catch((error) => console.log(error));
    }



    componentDidMount() {
        this.getProductList();
    }

    deleteCate = (productId, productName) => {
        if (window.confirm('Delete product ' + productName + '?')) {
            var uriCall = "/products/" + productId;
            deleteAuth(uriCall).then((response) => {
                if (response.status === 200) {
                    alert("Delete success!");
                    this.setState({responseError: ""});
                    window.location.reload();
                }
            }).catch((error) => {
                alert(error.response.data.message);
            })
        }
        else {
        }
    }

    render() {
        const paginate = pageNumber => this.setState({ currentPage: pageNumber });
        const listProducts = this.state.listProduct;
        const indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
        const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
        const currentPosts = listProducts.slice(indexOfFirstPost, indexOfLastPost);
        const listCategory = this.state.listCate;

        return (
            <div>
                <Table hover>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th className="action-column">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentPosts.map(product =>
                            <tr key={product.id}>
                                <th scope="row">{product.id}</th>
                                <td>{product.name}</td>
                                <td>{product.description}</td>
                                <td className="action-column">
                                    <EditProduct productData={product} listCate={listCategory}
                                        buttonLabel="Update" />
                                    <Button className="margin-left" color="danger" onClick={() => this.deleteCate(product.id, product.name)}>
                                        <DeleteIcon fontSize="small" /> Delete
                                    </Button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
                <div>
                    <Pagination postsPerPage={this.state.postsPerPage}
                        totalPost={listProducts.length}
                        paginate={paginate} />
                </div>
            </div>
        )
    }
}
