import React from "react";

export default function Footer(props) {
  const {
    setStatusFilter,
    activeButton,
    numOfItemsLeft,
    numOfItems,
    removeCompleted,
  } = props;

  return (
    <div className="footer">
      <span className="todo-count">
        <strong>{numOfItemsLeft} </strong>
        <span></span>
        <span>{numOfItemsLeft <= 1 ? "item" : "items"}</span>
        <span> left</span>
      </span>
      <ul className="filters">
        <li>
          <a
            className={`${activeButton === "ALL" ? "selected" : ""}`}
            onClick={() => setStatusFilter("ALL")}
          >
            All
          </a>
        </li>
        <span></span>
        <li>
          <a
            className={`${activeButton === "ACTIVE" ? "selected" : ""}`}
            onClick={() => setStatusFilter("ACTIVE")}
          >
            Active
          </a>
        </li>
        <span></span>
        <li>
          <a
            className={`${activeButton === "COMPLETED" ? "selected" : ""}`}
            onClick={() => setStatusFilter("COMPLETED")}
          >
            Completed
          </a>
        </li>
      </ul>
      {numOfItems > numOfItemsLeft && (
        <button className="clear-completed" onClick={removeCompleted}>
          Clear completed
        </button>
      )}
    </div>
  );
}
