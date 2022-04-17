import React from "react";
import "./OrdersTable.css";


const triangleUp = String.fromCharCode(9650);
const triangleDown = String.fromCharCode(9660);

const OrdersTable = (props) => {
  if (!props.orders || !props.sellers) {
    return <section id="sellers-total">Carregando ...</section>;
  }

  const getSeller = (sellerId) =>
    props.sellers.filter((seller) => seller.id === sellerId)[0].name;

  let counter = 0;
  const row = (order) => {
    return (
      <tr
        key={order.orderId}
        className={counter++ % 2 === 0 ? "table-orders-row-even" : null}
      >
        <td>{order.orderId}</td>
        <td>{order.product}</td>
        <td>{"$"+order.price.toFixed(2)}</td>
        <td>{getSeller(order.seller)}</td>
        <td>{order.country}</td>
      </tr>
    );
  };

  let rows = props["orders"].map(row);

  return (
    <table id="orders-table">
      <thead>
        <tr>
          <th><span>{triangleUp}</span> Order Id</th>
          <th><span>{triangleDown}</span> Product</th>
          <th><span>{triangleUp}</span> Price</th>
          <th><span>{triangleDown}</span> Seller</th>
          <th><span>{triangleUp}</span> Country</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};

export default OrdersTable;
