import React, { Component } from "react";
import Radium, { StyleRoot } from "radium";

import "./css/style.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import ListItem from "./components/List/ListItem";

const isNotCheckAll = (items = []) => items.find((item) => !item.isCompleted);
const filterByStatus = (todoList = [], status = "", id) => {
  switch (status) {
    case "ACTIVE":
      return todoList.filter((item) => !item.isCompleted);
    case "COMPLETED":
      return todoList.filter((item) => item.isCompleted);
    case "DELETE":
      return todoList.filter((item) => item.id !== id);
    default:
      return todoList;
  }
};

class App extends Component {
  state = {
    todoList: [],
    editId: " ",
    isCheckedAll: false,
    status: "ALL",
  };
  componentWillUnmount() {
    this.setState({
      isCheckedAll: !isNotCheckAll(this.state.todoList),
    });
  }
  addItem = (item = {}) => {
    this.setState((preState) => ({
      todoList: [...preState.todoList, item],
    }));
  };

  getEditId = (id = "") => {
    this.setState({ editId: id });
  };
  onEditItem = (item = {}, index = -1) => {
    if (index >= 0) {
      const { todoList: list } = this.state;
      list.splice(index, 1, item);
      this.setState({ todoList: list, editId: "" });
    }
  };
  tickCompleted = (id = "") => {
    const { todoList } = this.state;
    const updatedList = todoList.map((item) =>
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    );
    this.setState(() => ({
      todoList: updatedList,
      isCheckedAll: !isNotCheckAll(updatedList),
    }));
  };
  checkAllItem = () => {
    const { todoList, isCheckedAll } = this.state;
    this.setState((preState) => ({
      todoList: todoList.map((item) => ({
        ...item,
        isCompleted: !isCheckedAll,
      })),
      isCheckedAll: !preState.isCheckedAll,
    }));
  };
  setStatusFilter = (status = "") => {
    this.setState({
      status,
    });
  };
  removeCompleted = () => {
    const { todoList } = this.state;
    this.setState({
      todoList: filterByStatus(todoList, "ACTIVE"),
    });
  };

  deleteItem = (id = "") => {
    this.setState((prevState) => ({
      todoList: filterByStatus(prevState.todoList, "DELETE", id),
    }));
  };
  render() {
    const style = {
      "@media (max-width: 640px)": {
        width: 500,
      },
    };
    const { todoList, editId, isCheckedAll, status } = this.state;
    return (
      <StyleRoot>
        <div className="todoapp" style={style}>
          <Header addItem={this.addItem} />
          <ListItem
            todoList={filterByStatus(todoList, status)}
            getEditId={this.getEditId}
            editId={editId}
            onEditItem={this.onEditItem}
            tickCompleted={this.tickCompleted}
            isCheckedAll={isCheckedAll}
            checkAllItem={this.checkAllItem}
            deleteItem={this.deleteItem}
          />
          <Footer
            setStatusFilter={this.setStatusFilter}
            activeButton={status}
            removeCompleted={this.removeCompleted}
            numOfItems={todoList.length}
            numOfItemsLeft={filterByStatus(todoList, "ACTIVE").length}
          />
        </div>
      </StyleRoot>
    );
  }
}

export default App;
