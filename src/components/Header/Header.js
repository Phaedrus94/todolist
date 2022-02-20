import React, { useState } from "react";
import { AnimatedInput } from "./AnimatedInput";
import Radium, { StyleRoot } from "radium";
export default function Header(props) {
  const [text, setText] = useState("");
  const { addItem } = props;
  const onAddItem = (e) => {
    if (e.key === "Enter" && text) {
      addItem({
        id: new Date().valueOf(),
        text,
        isCompleted: false,
      });
      setText("");
    }
  };
  const style = {
    "@media (max-width: 640px)": {
      fontSize: 80,
    },
  };
  return (
    <StyleRoot>
      <h1 style={style}>Todo List App</h1>
      <AnimatedInput
        placeholder="Add Task!!!"
        className="new-todo"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => onAddItem(e)}
      />
    </StyleRoot>
  );
}
