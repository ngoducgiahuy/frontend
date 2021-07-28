import React from 'react';
import { Table } from 'reactstrap';
import CartDetailTableRow from './CartDetailTableRow';

const CartDetailTable = (props) => {
  const {
    cartDetail,
  } = props;

  return (
    <Table hover>
      <thead>
        <tr>
          <th>Product Name</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Total</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(cartDetail).map((keyName, i) => (
          <CartDetailTableRow cartDetailRow={cartDetail[keyName]} />
        )
        )}
      </tbody>
    </Table>
  );
}

export default CartDetailTable;