import React from "react";
import "./OrdersTable.css";
import ordersObjects from "../utils/http-requester";

const OrdersTable = (props) => {
  const getSeller = (sellerId) =>
    ordersObjects.sellers.filter((seller) => seller.id === sellerId)[0].name;

  let counter = 0;
  const row = (order) => {
    return (
      <tr
        key={order.orderId}
        className={
          counter++ % 2 === 0 ? "table-orders-row-even" : null
        }
      >
        <td>{order.orderId}</td>
        <td>{order.product}</td>
        <td>{order.price}</td>
        <td>{getSeller(order.seller)}</td>
        <td>{order.country}</td>
      </tr>
    );
  };

  let rows = ordersObjects["orders"].map(row);

  return (
    <table id="orders-table">
      <thead>
        <tr>
          <th>Order Id</th>
          <th>Product</th>
          <th>Price</th>
          <th>Seller</th>
          <th>Country</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};

export default OrdersTable;
