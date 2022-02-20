import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
export default function Item(props) {
  const {
    item,
    getEditId,
    editId,
    onEditItem,
    index,
    tickCompleted,
    deleteItem,
  } = props;
  const isEditing = editId === item.id;
  const [text, setText] = useState(item.text);
  const editItem = () => {
    onEditItem(
      {
        ...item,
        text,
      },
      index
    );
  };
  return (
    <div>
      <li
        className={`${isEditing ? "editing" : ""} ${
          item.isCompleted ? "completed" : ""
        }`}
      >
        {!isEditing ? (
          <div className="view">
            <input
              className="toggle"
              type="checkbox"
              checked={item.isCompleted}
              onClick={() => tickCompleted(item.id)}
            />
            <label onDoubleClick={() => getEditId(item.id)}>{item.text}</label>

            <button className="delete" onClick={() => deleteItem(item.id)}>
              <FaTrash />
            </button>
          </div>
        ) : (
          <input
            className="edit"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onBlur={editItem}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                editItem();
              }
            }}
          />
        )}
      </li>
    </div>
  );
}
