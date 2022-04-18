import React from "react";

import "./OrdersTable.css";

const TableFooter = ({ range, changePage, page }) => {
  return (
    <div className="orders-table-footer">
      {range.map((element, index) => (
        <button
          key={index}
          className={`orders-table-footer-button ${
            page === element
              ? `orders-table-footer-active-button`
              : `orders-table-footer-inactive-button`
          }`}
          onClick={() => changePage(element)}
        >
          {element}
        </button>
      ))}
    </div>
  );
};

export default TableFooter;
