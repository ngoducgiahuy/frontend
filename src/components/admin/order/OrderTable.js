import React, { Component } from 'react'
import { Table } from 'reactstrap';
import { get } from '../../utils/httpHelper'
import Pagination from '../../homepage/pagination/Pagination';



export default class OrderTable extends Component {
    state = {
        listOrder: [],
        loading: false,
        currentPage: 1,
        postsPerPage: 9,
        responseError: "",
    };

    getOrderList() {
        const uriCall = "/orders/";
        get(uriCall)
            .then(response => {
                const listOrder = response.data;
                this.setState({ listOrder });
                this.setState({ loading: false });
            })
            .catch((error) => console.log(error));
    }



    componentDidMount() {
        this.getOrderList();
    }

    render() {
        const paginate = pageNumber => this.setState({ currentPage: pageNumber });
        const listOrder = this.state.listOrder;
        const indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
        const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
        const currentPosts = listOrder.slice(indexOfFirstPost, indexOfLastPost);

        return (
            <div>
                <Table hover>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Customer</th>
                            <th>Order Address</th>
                            <th>Order Date</th>
                            <th>Total price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentPosts.map(order =>
                            <tr key={order.id}>
                                <th scope="row">{order.id}</th>
                                <td>{order.customerUsername}</td>
                                <td>{order.orderAddress}</td>
                                <td>{order.orderDate}</td>
                                <td>{order.totalPrice}</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
                <div>
                    <Pagination postsPerPage={this.state.postsPerPage}
                        totalPost={listOrder.length}
                        paginate={paginate} />
                </div>
            </div>
        )
    }
}
