import React, { useState, useEffect } from "react";
import {
  OrderedListOutlined,
  PlusOutlined,
  HolderOutlined,
} from "@ant-design/icons";
//Initial tasks
const tasks = [
  { name: "Công việc chưa làm 1", done: false },
  { name: "Công việc 2", done: false },
  { name: "Công việc 3", done: true },
];

function TodoWork() {
  const [todos, setTodos] = useState(tasks);
  const [inputValue, setInputValue] = useState("");
  useEffect(() => {
    let count = 0;
    todos.map((todo) => (!todo.done ? count++ : null));
  });
  const _handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue === "") return alert("Chưa đặt tên công việc");
    const newArr = todos.slice();
    newArr.splice(0, 0, { name: inputValue, done: false });
    setTodos(newArr);
    setInputValue("");
  };
  const _handleBntClick = ({ type, index }) => {
    const newArr = todos.slice();
    if (type === "remove") newArr.splice(index, 1);
    else if (type === "completed") newArr[index].done = !newArr[index].done;
    return setTodos(newArr);
  };
  return (
    <>
      <div className="TodoWork-wrapper">
        <h2>
          <OrderedListOutlined />
          Công việc cần làm
        </h2>
        <form onSubmit={_handleSubmit}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Công việc mới..."
          />
          <button type="submit">
            <PlusOutlined /> Thêm
          </button>
        </form>
        <ul>
          {todos.map((todo, index) => (
            <>
              <li className={todo.done ? "done" : ""} key={index}>
                <div>
                  <HolderOutlined className="list" />
                  <input
                    className="todo-item-input"
                    type="checkbox"
                    style={{ backgroundColor: "#fff" }}
                    checked={todo.done}
                    onChange={() => {
                      _handleBntClick({ type: "completed", index });
                    }}
                  />
                  <span> {todo.name}</span>
                </div>

                <i
                  class="fas fa-times"
                  onClick={() => _handleBntClick({ type: "remove", index })}
                ></i>
              </li>
            </>
          ))}
        </ul>
      </div>
    </>
  );
}

export default TodoWork;
