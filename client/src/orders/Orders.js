import React from "react";
import "./Orders.css";
import ordersObjects from "../utils/http-requester";

const Orders = (props) => {
  const calculateTotal = (seller) =>
    ordersObjects["orders"]
      .filter((value) => value.seller === seller)
      .map((value) => value.price)
      .reduce((sum, actual) => sum + actual, 0);

  const sellerInfo = ordersObjects["sellers"].map((seller) => {
    let total = calculateTotal(seller.id);
    return total > 0
      ? {
          name: seller.name,
          total,
        }
      : null;
  });

  const sellerTotal = (seller) => {
    return (
      <div className="sellers-total-block">
        <p className="sellers-total-first-line">Total of {seller.name}</p>
        <p className="sellers-total-second-line">${seller.total}</p>
      </div>
    );
  };

  const sellers = sellerInfo
    .filter((seller) => seller !== null)
    .map((seller) => sellerTotal(seller));

  return <section id="sellers-total">{sellers}</section>;
};

export default Orders;
