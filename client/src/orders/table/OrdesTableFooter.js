import React from "react";

import "./OrdersTable.css";

const TableFooter = ({ range, changePage, page }) => {
  const changePageLeft = () => {
    return page > 1 ? page - 1 : 1;
  };

  const changePageRight = () => {
    return page < range.length ? page + 1 : page;
  };

  return (
    <div className="orders-table-footer">
      <div className="order-table-footer-buttoms-borders">
        <button
          onClick={() => changePage(changePageLeft())}
          className={`orders-table-footer-button orders-table-footer-button-border orders-table-footer-button-border-left`}
        >
          {"\u25C0"}
        </button>
        <buton
        onClick={() => changePage(1)}
          className={`orders-table-footer-button orders-table-footer-button-border orders-table-footer-button-border-left`}
        >
          Older
        </buton>
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
        <button
          onClick={() => changePage(changePageRight())}
          className={`orders-table-footer-button orders-table-footer-button-border orders-table-footer-button-border-rigth`}
        >
          {"\u25B6"}
        </button>

        <buton
        onClick={() => changePage(range.length)}
          className={`orders-table-footer-button orders-table-footer-button-border orders-table-footer-button-border-rigth`}
        >
          Newer
        </buton>
      </div>
    </div>
  );
};

export default TableFooter;
