import React from "react";
import Item from "./Item";

export default function ListItem(props) {
  const { todoList, isCheckedAll, checkAllItem } = props;
  return (
    <div className="main">
      <input className="tick-all" type="checkbox" checked={isCheckedAll} />
      <label htmlFor="tick-all" onClick={checkAllItem}></label>
      <ul className="todo-list">
        {todoList.map((item, index) => (
          <Item {...{ item }} key={index} {...props} index={index} />
        ))}
      </ul>
    </div>
  );
}
