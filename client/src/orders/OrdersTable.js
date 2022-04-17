import React, { useState } from "react";
import "./OrdersTable.css";

const triangleUp = String.fromCharCode(9650);
const triangleDown = String.fromCharCode(9660);

const compareStrings = (firstString, secondString, isAscending) => {
  if (firstString > secondString) {
    return isAscending ? -1 : 1;
  }
  if (firstString < secondString) {
    return isAscending ? 1 : -1;
  }
  return 0;
};

const compareNumbers = (firstNumber, secondNumber, isAscending) => {
  let difference = firstNumber - secondNumber;

  return isAscending ? -difference : difference;
};

const OrdersTable = (props) => {
  const [rows, setRows] = useState(null);
  const [orderFlags, setOrderFlags] = useState({
    "span-order-id": false,
    "span-product": false,
    "span-price": false,
    "span-seller": false,
    "span-country": false,
  });

  const [isCollumSelected, setIsCollumSelected] = useState({
    "span-order-id": false,
    "span-product": false,
    "span-price": false,
    "span-seller": false,
    "span-country": false,
  });

  if (!props.orders || !props.sellers) {
    return <section id="sellers-total">Carregando ...</section>;
  }

  const row = (order, index) => {
    return (
      <tr
        key={order.orderId}
        className={index % 2 === 0 ? "table-orders-row-even" : null}
      >
        <td>{order.orderId}</td>
        <td>{order.product}</td>
        <td>{"$" + order.price.toFixed(2)}</td>
        <td>{order.seller}</td>
        <td>{order.country}</td>
      </tr>
    );
  };

  const changeOrderFlags = (collumId) => {
    let newOrderFlags = {
      "span-orderId": false,
      "span-product": false,
      "span-price": false,
      "span-seller": false,
      "span-country": false,
    };
    newOrderFlags[collumId] = !orderFlags[collumId];
    setOrderFlags({
      ...newOrderFlags,
    });
  };

  const changeIsCOllumSelected = (collumId) => {
    let newIsCollumSelected = {
      "span-orderId": false,
      "span-product": false,
      "span-price": false,
      "span-seller": false,
      "span-country": false,
    };
    newIsCollumSelected[collumId] = true;
    setIsCollumSelected({
      ...newIsCollumSelected,
    });
  };

  const sortRows = (collumId) => {
    let collum = collumId.split("-")[1];
    const compareRows = (firstRow, secondRow) => {
      if (typeof firstRow[collum] === "string") {
        return compareStrings(
          firstRow[collum],
          secondRow[collum],
          orderFlags[collumId]
        );
      }

      if (typeof firstRow[collum] === "number") {
        return compareNumbers(
          firstRow[collum],
          secondRow[collum],
          orderFlags[collumId]
        );
      }
    };

    setRows(props["orders"].sort(compareRows).map(row));
  };

  const handleSortRows = (event) => {
    event.preventDefault();
    changeOrderFlags(event.target.id);
    changeIsCOllumSelected(event.target.id);
    sortRows(event.target.id);
    console.log("ordenando para a coluna: " + event.target.id);
  };

  let initialRows = props["orders"].map(row);

  return (
    <table id="orders-table">
      <thead>
        <tr>
          <th>
            <span
              id="span-orderId"
              className={
                isCollumSelected["span-orderId"] ? "collum-selected" : null
              }
              onClick={handleSortRows}
            >
              {orderFlags["span-orderId"] ? triangleDown : triangleUp}
            </span>{" "}
            Order Id
          </th>
          <th>
            <span
              id="span-product"
              className={
                isCollumSelected["span-product"] ? "collum-selected" : null
              }
              onClick={handleSortRows}
            >
              {orderFlags["span-product"] ? triangleDown : triangleUp}
            </span>{" "}
            Product
          </th>
          <th>
            <span
              id="span-price"
              className={
                isCollumSelected["span-price"] ? "collum-selected" : null
              }
              onClick={handleSortRows}
            >
              {orderFlags["span-price"] ? triangleDown : triangleUp}
            </span>{" "}
            Price
          </th>
          <th>
            <span
              id="span-seller"
              className={
                isCollumSelected["span-seller"] ? "collum-selected" : null
              }
              onClick={handleSortRows}
            >
              {orderFlags["span-seller"] ? triangleDown : triangleUp}
            </span>{" "}
            Seller
          </th>
          <th>
            <span
              id="span-country"
              className={
                isCollumSelected["span-country"] ? "collum-selected" : null
              }
              onClick={handleSortRows}
            >
              {orderFlags["span-country"] ? triangleDown : triangleUp}
            </span>{" "}
            Country
          </th>
        </tr>
      </thead>
      <tbody>{rows ? rows : initialRows}</tbody>
    </table>
  );
};

export default OrdersTable;
