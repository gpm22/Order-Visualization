import React from "react";
import "./Orders.css";

const Orders = (props) => {

  if(!props.orders || !props.sellers){
    return <section id="sellers-total">Carregando ...</section>
  }

  const calculateTotal = (seller) =>
    props["orders"]
      .filter((value) => value.seller === seller)
      .map((value) => value.price)
      .reduce((sum, actual) => sum + actual, 0);

  const sellerInfo = props["sellers"].map((seller) => {
    let total = calculateTotal(seller.id).toFixed(2);
    return total > 0
      ? {
          name: seller.name,
          total,
        }
      : null;
  });

  const sellerTotal = (seller) => {
    return (
      <div className="sellers-total-block" key={seller.name}>
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
