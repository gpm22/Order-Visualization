import React, { useState } from "react";
import OrderTableFooter from "./OrdesTableFooter";
import OrderTableFilter from "./OrderTableFilter";
import "./OrdersTable.css";

const rowsPerPage = 6;
const triangleUp = String.fromCharCode(9650);
const triangleDown = String.fromCharCode(9660);

const falseState = {
  "span-orderId": false,
  "span-product": false,
  "span-price": false,
  "span-seller": false,
  "span-country": false,
};

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

const calculateRange = (data, rowsPerPage) => {
  const range = [];
  const num = Math.ceil(data.length / rowsPerPage);

  for (let i = 1; i <= num; i++) {
    range.push(i);
  }
  return range;
};

const sliceData = (data, page, rowsPerPage) => {
  return data.slice((page - 1) * rowsPerPage, page * rowsPerPage);
};

const OrdersTable = (props) => {
  const [state, setState] = useState({
    page: 1,
    tableRange: [],
    slice: [],
    data: [],
  });

  const [orderFlags, setOrderFlags] = useState(falseState);

  const [isCollumSelected, setIsCollumSelected] = useState(falseState);

  if (!props.orders || !props.sellers) {
    return <section id="sellers-total">Carregando ...</section>;
  }

  const row = (order, index) => {
    return (
      <tr
        key={order.orderId}
        className={index % 2 === 0 ? "table-orders-row-even" : null}
      >
        {Object.entries(order).map(([key, value]) => (
          <td>{key === "price" ? "$" + value.toFixed(2) : value}</td>
        ))}
      </tr>
    );
  };

  const headRow = (collum, index) => (
    <th key={index}>
      <span
        id={"span-" + collum}
        className={
          isCollumSelected["span-" + collum] ? "collum-selected" : null
        }
        onClick={handleSortRows}
      >
        {orderFlags["span-" + collum] ? triangleDown : triangleUp}
      </span>{" "}
      {collum === "orderId"
        ? "Order Id"
        : collum.charAt(0).toUpperCase() + collum.slice(1)}
    </th>
  );

  const changeOrderFlags = (collumId) => {
    let newOrderFlags = { ...falseState };
    newOrderFlags[collumId] = !orderFlags[collumId];
    setOrderFlags({
      ...newOrderFlags,
    });
  };

  const changeIsCOllumSelected = (collumId) => {
    let newIsCollumSelected = { ...falseState };
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

    const newState = { ...state };

    newState.data = props["orders"].sort(compareRows);
    newState.tableRange = calculateRange(newState.data, rowsPerPage);
    newState.page = 1;
    newState.slice = sliceData(newState.data, newState.page, rowsPerPage);

    setState({ ...newState });
  };

  const handleSortRows = (event) => {
    event.preventDefault();
    changeOrderFlags(event.target.id);
    changeIsCOllumSelected(event.target.id);
    sortRows(event.target.id);
  };

  const changePage = (element) => {
    const newState = { ...state };
    newState.page = element;
    newState.slice =
      state.data.length === 0
        ? sliceData(props["orders"], newState.page, rowsPerPage)
        : sliceData(newState.data, newState.page, rowsPerPage);

    setState({ ...newState });
  };

  let collumns = Object.keys(props["orders"][0]);
  let initialSlice = props["orders"].slice(0, rowsPerPage).map(row);
  let initialRange = calculateRange(props["orders"], rowsPerPage);

  return (
    <>
    <div id="table-filters">
      <OrderTableFilter key="seller" data={props["orders"]} collum={"seller"}/>
      <OrderTableFilter key="country" data={props["orders"]} collum={"country"}/>
    </div>
      <table id="orders-table">
        <thead>
          <tr>{collumns.map(headRow)}</tr>
        </thead>
        <tbody>
          {state.slice.length === 0 ? initialSlice : state.slice.map(row)}
        </tbody>
      </table>
      <OrderTableFooter
        range={state.tableRange.length === 0 ? initialRange : state.tableRange}
        changePage={changePage}
        page={state.page}
      />
    </>
  );
};

export default OrdersTable;
