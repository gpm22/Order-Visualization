import React from "react";

import "./OrdersTable.css";

const pluralize = (word) => {

  if (word.substring(word.length - 3) === "try") {
    return word.substring(0, word.length - 1) + "ies";
  }

  return word + "s";
};

const capitalize = (word) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

const OrderTableFilter = (props) => {
  let options = props.data
    .map((element) => element[props.collum])
    .filter((value, index, self) => self.indexOf(value) === index)
    .map((element) => (
      <option value={element} key={element}>
        {element}
      </option>
    ));

  return (
    <select onChange={(value) => props.handleFilter(props.collum, value)}>
      <option value="all">{`All ${capitalize(pluralize(props.collum))}`}</option>
      {options}
    </select>
  );
};

export default OrderTableFilter;
