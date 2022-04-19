import React, { useState } from "react";
import OrderTableFooter from "./OrdesTableFooter";
import OrderTableFilter from "./OrderTableFilter";
import "./OrdersTable.css";

const rowsPerPage = 6;
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
  const falseState = () => {
    let falseState = {};

    let orders = props["orders"] || [{}];

    Object.keys(orders[0]).forEach((key) => (falseState[key] = false));

    return falseState;
  };

  const [state, setState] = useState({
    page: 1,
    tableRange: [],
    slice: [],
    data: false,
  });

  const [orderFlags, setOrderFlags] = useState(falseState());

  const [isCollumSelected, setIsCollumSelected] = useState(falseState());

  const initialFiltersState = () => {
    let initialFiltersState = {};

    let orders = props["orders"] || [{}];

    Object.keys(orders[0])
      .filter((collumn) => collumn !== "orderId" && collumn !== "price")
      .forEach((key) => (initialFiltersState[key] = "all"));

    return initialFiltersState;
  };

  const [filters, setFilters] = useState(initialFiltersState());

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
    let newOrderFlags = { ...falseState() };
    newOrderFlags[collumId] = !orderFlags[collumId];
    setOrderFlags({
      ...newOrderFlags,
    });
  };

  const changeIsCOllumSelected = (collumId) => {
    let newIsCollumSelected = { ...falseState() };
    newIsCollumSelected[collumId] = true;
    setIsCollumSelected({
      ...newIsCollumSelected,
    });
  };

  const updateData = (data) => {
    const newState = { ...state };
    newState.data = data;
    newState.tableRange = calculateRange(newState.data, rowsPerPage);
    newState.page = 1;
    newState.slice = sliceData(newState.data, newState.page, rowsPerPage);

    setState({ ...newState });
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

    return state.data
      ? state.data.sort(compareRows)
      : props["orders"].sort(compareRows);
  };

  const handleSortRows = (event) => {
    event.preventDefault();
    changeOrderFlags(event.target.id);
    changeIsCOllumSelected(event.target.id);
    updateData(sortRows(event.target.id));
  };

  const filterRows = (data, collum, value) => {
    return data.filter(
      value === "all" ? () => true : (element) => element[collum] === value
    );
  };

  const handleFilter = (collum, event) => {
    let newFilters = { ...filters };
    newFilters[collum] = event.target.value;
    setFilters({ ...newFilters });
    changeOrderFlags(null);
    changeIsCOllumSelected(null);

    let data = props["orders"];
    Object.entries(newFilters).forEach(([collum, value]) => {
      data = filterRows(data, collum, value);
    });
    updateData(data);
  };

  const changePage = (element) => {
    const newState = { ...state };

    if (!state.data) {
      newState.data = props["orders"];
      newState.tableRange = calculateRange(newState.data, rowsPerPage);
    }

    newState.page = element;
    newState.slice = sliceData(newState.data, newState.page, rowsPerPage);

    setState({ ...newState });
  };

  let collumns = Object.keys(props["orders"][0]);
  let initialSlice = props["orders"].slice(0, rowsPerPage).map(row);
  let initialRange = calculateRange(props["orders"], rowsPerPage);

  const orderTableFilters = Object.keys(props["orders"][0])
    .filter((collumn) => collumn !== "orderId" && collumn !== "price")
    .map((collumn) => (
      <OrderTableFilter
        key={collumn}
        data={props["orders"]}
        collum={collumn}
        handleFilter={handleFilter}
      />
    ));

  const emptyRow = collumns.map(() => <td>-</td>);

  return (
    <>
      <div id="table-filters">{orderTableFilters}</div>
      <table id="orders-table">
        <thead>
          <tr>{collumns.map(headRow)}</tr>
        </thead>
        <tbody>
          {state.data ? (
            !(state.slice > 0) ? (
              <tr className="table-orders-row-even">{emptyRow}</tr>
            ) : (
              state.slice.map(row)
            )
          ) : (
            initialSlice
          )}
        </tbody>
      </table>
      <OrderTableFooter
        range={state.data ? state.tableRange : initialRange}
        changePage={changePage}
        page={state.page}
      />
    </>
  );
};

export default OrdersTable;
