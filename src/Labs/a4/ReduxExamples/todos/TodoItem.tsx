import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";
import { LabState } from "../../../store";
function TodoItem({todo} : {todo: { id: string; title: string } }) {
  const dispatch = useDispatch();
  return (
    <li key={todo.id} className="list-group-item">
      <button className="btn btn-danger float-end me-2" onClick={() => dispatch(deleteTodo(todo.id))}> Delete </button>
      <button className="btn btn-secondary float-end me-2" onClick={() => dispatch(setTodo(todo))}> Edit </button>
      {todo.title}
    </li>
  );
}
export default TodoItem;