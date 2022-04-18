import React from "react";

import "./OrdersTable.css";

const OrderTableFilter = (props) => {
  console.log(props.data);
  console.log(props.collum);
  let options = props.data
    .map((element) => element[props.collum])
    .filter((value, index, self) => self.indexOf(value) === index)
    .map((element) => (
      <option value={element} key={element}>
        {element}
      </option>
    ));

  return (
    <select>
      <option>All options</option>
      {options}
    </select>
  );
};

export default OrderTableFilter;
