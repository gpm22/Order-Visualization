import React from "react";

import "./OrdersTable.css";

const leftTriangle = "\u25C0";
const rightTriangle = "\u25B6";

const OrderTableFooter = ({ range, changePage, page }) => {
  const changePageLeft = () => {
    return page > 1 ? page - 1 : 1;
  };

  const changePageRight = () => {
    return page < range.length ? page + 1 : range.length;
  };

  const borderButton = (value, pageValue, side) => (
    <button
      onClick={() => changePage(pageValue)}
      className={
        `orders-table-footer-button` +
        ` orders-table-footer-button-border` +
        ` orders-table-footer-button-border-${side}`
      }
    >
      {value}
    </button>
  );

  return (
    <div className="orders-table-footer">
      <div className="order-table-footer-buttoms-borders">
        {borderButton(leftTriangle, changePageLeft(), "left")}
        {borderButton("First", 1, "left")}
      </div>
      {range.map((element, index) => (
        <button
          key={index}
          className={`orders-table-footer-button ${
            page === element ? `orders-table-footer-active-button` : null
          }`}
          onClick={() => changePage(element)}
        >
          {element}
        </button>
      ))}
      <div className="order-table-footer-buttoms-borders">
        {borderButton(rightTriangle, changePageRight(), "right")}
        {borderButton("Last", range.length, "right")}
      </div>
    </div>
  );
};

export default OrderTableFooter;
