import { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";
import "../App.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import nodata from "../assets/no-data.png";

function TodoList() {
  const [title, setTitle] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [filterState, setFilterState] = useState("all");

  function fetchTodoList() {
    invoke("get_todos")
      .then((response) => {
        console.log("Response from Rust:", response);
        if (filterState === "completed") {
          response = response.filter((todo) => todo.completed);
        } else if (filterState === "remaining") {
          response = response.filter((todo) => !todo.completed);
        } 
        setTodoList(response);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  function addTodo() {
    invoke("add_todo", {title})
      .then(() => {
        setTitle("");
        fetchTodoList();
      })
      .catch((error) => {
        console.error("Error adding todo:", error);
      });
  }

  function deleteTodo(id) {
    invoke("delete_todo", {id})
      .then(() => {
        fetchTodoList();
      })
      .catch((error) => {
        console.error("Error delete todo :", error);
      })
  }

  function toggleTodo(id) {
    invoke("toggle_todo", {id})
      .then(() => {
        fetchTodoList();
      })
      .catch((error) => {
        console.log("Error toggling todo:", error); 
      })
  }

  useEffect(() => {
    fetchTodoList();
  }, [filterState]);

  let completed_todo_count = todoList.filter((todo) => todo.completed).length;
  let incolmplete_todo_count = todoList.length - completed_todo_count;

  return (
    <main className="container">
      <div>
        <p className="title">To-Do List 🗓️</p>
        <div className="todoHeader">
          <div className="todoCounts">
            <div className="completedTaskCount">Completed Tasks: {completed_todo_count}</div>
            <div className="remainingTaskCount">Remaining Tasks: {incolmplete_todo_count}</div>
          </div>
          <select
            className="filterDropdown"
            onChange={(e) => setFilterState(e.target.value)}
          >
            <option value="all" className="filterOption">All</option>
            <option value="completed" className="filterOption">Completed</option>
            <option value="remaining" className="filterOption">Remaining</option>
          </select>
        </div>
      </div>
      <div className="inputContainer">
        <input
          type="text"
          placeholder="Add your task here"
          onChange={(e) => setTitle(e.target.value)}
          className="inputField"
          value={title}
        />
        <button className="addButton" onClick={() => addTodo()}>Add new</button>
      </div>
      <div className="taskList">
        {todoList.length === 0 ? (
          <div className="noDataSection">
            <img src={nodata} className="noDataImage" />
            <p className="noDataText" >Data not found.</p>
          </div>
        ) : (
          todoList.map((todo) => (
          <div key={todo.id}>
            <div className="taskItem">
              <div>
                <input 
                  type="checkbox" 
                  className="taskCheckbox" 
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  required
                />
                <span className={`tasktext ${todo.completed ? "completed" : ""}`}>{todo.title}</span>
              </div>
              <button className="deleteButton" onClick = {() => deleteTodo(todo.id)}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
            <hr className="customhr" />
          </div>
        ))
        )}
      </div>
    </main>
  );
}

export default TodoList;
