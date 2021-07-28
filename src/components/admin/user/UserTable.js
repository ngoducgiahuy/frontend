import React, { Component } from 'react'
import { Table } from 'reactstrap';
import { Button } from 'reactstrap';
import { get, putAuth } from '../../utils/httpHelper'
import Pagination from '../../homepage/pagination/Pagination';
import EditUser from './EditUser';


export default class UserTable extends Component {
    state = {
        listUser: [],
        loading: false,
        currentPage: 1,
        postsPerPage: 9,
        responseError: "",
    };

    getUserList() {
        const uriCall = "/users/";
        get(uriCall)
            .then(response => {
                const listUser = response.data;
                this.setState({ listUser });
                this.setState({ loading: false });
            })
            .catch((error) => console.log(error));
    }

    componentDidMount() {
        this.getUserList();
    }

    updateActiveUser(user, active) {
        user.active = !active;
        const body = JSON.stringify(user);
        var uriCall = "/users/" + user.id;
        putAuth(uriCall, body).then((response) => {
            if (response.status === 200) {
                alert("Update success!");
                window.location.reload();
            }
        }).catch((error) => {
            alert(error.response.data.message);
        })
    }

    createBtnActive(active, user) {
        if (active) {
            return <Button onClick={() => this.updateActiveUser(user, active)} className="margin-left" color="primary">
                Active
            </Button>
        } else {
            return <Button onClick={() => this.updateActiveUser(user, active)} className="margin-left" color="danger">
                Banned
            </Button>
        }
    }

    render() {
        const paginate = pageNumber => this.setState({ currentPage: pageNumber });
        const listUsers = this.state.listUser;
        const indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
        const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
        const currentPosts = listUsers.slice(indexOfFirstPost, indexOfLastPost);

        return (
            <div>
                <Table hover>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Username</th>
                            <th>Role</th>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th>Active</th>
                            <th className="action-column">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentPosts.map(user =>
                            <tr key={user.id}>
                                <th scope="row">{user.id}</th>
                                <td>{user.username}</td>
                                <td>{user.roleString}</td>
                                <td>{user.name}</td>
                                <td>{user.phone}</td>
                                <td>{user.address}</td>
                                <td>
                                    {this.createBtnActive(user.active, user)}
                                </td>
                                <td className="action-column">
                                        <EditUser buttonLabel="Update" userData={user}/>
                                    {/* <Button className="margin-left" color="danger">
                                        <DeleteIcon fontSize="small" /> Delete
                                    </Button> */}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
                <div>
                    <Pagination postsPerPage={this.state.postsPerPage}
                        totalPost={listUsers.length}
                        paginate={paginate} />
                </div>
            </div>
        )
    }
}
