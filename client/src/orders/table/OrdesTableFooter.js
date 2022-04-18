import React from "react";

import "./OrdersTable.css";

const TableFooter = ({ range, changePage, page }) => {

  const changePageLeft = () => {
    return page > 1 ? page -1 : 1;
  }

  const changePageRight = () => {
    return page < range.length? page + 1 : page;
  }

  return (
    <div className="orders-table-footer">
      <button
        onClick={() => changePage(changePageLeft())}
        className={`orders-table-footer-button orders-table-footer-button-border orders-table-footer-button-border-left`}
      >
        {"<<<"}
      </button>
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
      <button
        onClick={() => changePage(changePageRight())}
        className={`orders-table-footer-button orders-table-footer-button-border orders-table-footer-button-border-rigth`}
      >
        {">>>"}
      </button>
    </div>
  );
};

export default TableFooter;
