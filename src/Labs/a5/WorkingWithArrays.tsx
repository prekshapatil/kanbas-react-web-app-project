import React, { useState, useEffect } from "react";
import axios from "axios";

interface Todo {
    id: number;
    title: string;
    description: string;
    due: string;
    completed: boolean;
}

const API_BASE = process.env.REACT_APP_API_BASE;

function WorkingWithArrays() {
    const [errorMessage, setErrorMessage] = useState(null);
  const [todo, setTodo] = useState({
    id: 1,
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-09-09",
    completed: false,
  });

  const updateTodo = async () => {
    try {
        const response = await axios.put(
          `${API}/${todo.id}`, todo);
        setTodos(todos.map((t) => (
          t.id === todo.id ? todo : t)));
      } catch (error:any) {
        console.log(error);
        setErrorMessage(error.response.data.message);
      }
  
  };

  const API = `${API_BASE}/a5/todos`;

  const [todos, setTodos] = useState<Todo[]>([]);
  const fetchTodos = async () => {
    const response = await axios.get(API);
    setTodos(response.data);
  };
  useEffect(() => {
    fetchTodos();
  }, []);

  const removeTodo = async (todo: any) => {
    const response = await axios.get(`${API}/${todo.id}/delete`);
    setTodos(response.data);
  };

  const createTodo = async () => {
    const response = await axios.get(`${API}/create`);
    setTodos(response.data);
  };

  const fetchTodoById = async (id: number) => {
    const response = await axios.get(`${API}/${id}`);
    setTodo(response.data);
  };

  const updateTitle = async () => {
    const response = await axios.get(`${API}/${todo.id}/title/${todo.title}`);
    setTodos(response.data);
  };

  const postTodo = async () => {
    const response = await axios.post(API, todo);
    setTodos([...todos, response.data]);
  };

  const deleteTodo = async (todo:any) => {
    try {
      const response = await axios.delete(
        `${API}/${todo.id}`);
      setTodos(todos.filter((t) => t.id !== todo.id));
    } catch (error:any) {
      console.log(error);
      setErrorMessage(error.response.data.message);
    }
  };





  return (
    <div>
      <h3>Working with Arrays</h3>
      <h4>Retrieving Arrays</h4>
      <a className="btn btn-primary" href={API}>
        Get Todos
      </a>
      
      <h4>Retrieving an Item from an Array by ID</h4>
      <input
        value={todo.id}
        onChange={(e) => setTodo({ ...todo, id: parseInt(e.target.value) })}
      />
      <a href={`${API}/${todo.id}`}>Get Todo by ID</a>
      <h3>Filtering Array Items</h3>
      <a className="btn btn-primary" href={`${API}?completed=true`}>
        Get Completed Todos
      </a>
      <h3>Creating new Items in an Array</h3>
      <a href={`${API}/create`}>Create Todo</a>
      <br />
      <input
        type="number"
        value={todo.id}
        onChange={(e) =>
          setTodo({
            ...todo,
            id: parseInt(e.target.value),
          })
        }
      />
      <br />
      <br />
      <a className="btn btn-primary" href={`${API}/${todo.id}/delete`}>
        Delete Todo with ID = {todo.id}
      </a>
      <input
        type="text"
        value={todo.title}
        onChange={(e) =>
          setTodo({
            ...todo,
            title: e.target.value,
          })
        }
      />
      <h3>Updating an Item in an Array</h3>
      <a
        className="btn btn-primary"
        href={`${API}/${todo.id}/title/${todo.title}`}
      >
        Update Title to {todo.title}
      </a>
      <h4>Update Todo Completed</h4>
      <input
        type="number"
        value={todo.id}
        onChange={(e) => {
          setTodo({ ...todo, id: parseInt(e.target.value) });
        }}
      />
      <label>
        <input
          type="checkbox"
          onChange={(e) => setTodo({ ...todo, completed: e.target.checked })}
        />{" "}
        Completed
      </label>
      <a
        href={`${API}/${todo.id}/completed/${todo.completed}`}
        className="btn btn-primary btn-sm ms-2"
      >
        Update Assignment Completed ={todo.id}
      </a>
      <h3>Updating Todo Description</h3>
      <input
        type="number"
        value={todo.id}
        onChange={(e) =>
          setTodo({
            ...todo,
            id: parseInt(e.target.value),
          })
        }
      />
      <br></br>
      <input
        type="text"
        value={todo.description}
        onChange={(e) =>
          setTodo({
            ...todo,
            description: e.target.value,
          })
        }
      />
      <br></br>
      <a
        className="btn btn-primary"
        href={`${API}/${todo.id}/description/${todo.description}`}
      >
        Describe Todo ID = {todo.id}
      </a>
      <br></br>
      <br></br>
      <input readOnly
        type="number"
        value={todo.id}
      />
      <br></br>
      <input
        type="text"
        value={todo.title}
        onChange={(e) => setTodo({ ...todo, title: e.target.value })}
      />
      <br></br>
      <textarea value={todo.description} 
        onChange={(e) => setTodo({ ...todo,
          description: e.target.value })} />
          <br></br>
      <input value={todo.due} type="date"
        onChange={(e) => setTodo({
          ...todo, due: e.target.value })} />
          <br></br>
      <label>
        <input checked={todo.completed} type="checkbox"
          onChange={(e) => setTodo({
            ...todo, completed: e.target.checked })} />
        Completed
      </label>
      <br></br>
      <button className="btn btn-warning mb-2" onClick={postTodo}> Post Todo </button>
       <br/>     
      <button className="btn btn-success mb-2" onClick={updateTodo}>
        Update Todo
      </button>

      
      <br />
      
      <button className="btn btn-primary mb-2" onClick={createTodo}>
        Create Todo 
      </button>
      
      <br />
      
      <button className="btn btn-success mb-2" onClick={updateTitle}>
        Update Title 
      </button>

      {errorMessage && (
        <div className="alert alert-danger mb-2 mt-2">
          {errorMessage}
        </div>
      )}


      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>


            <input readOnly checked={todo.completed}
              type="checkbox"/>
            {todo.title}
            <p>{todo.description}</p>
            <p>{todo.due}</p>
            <button
              className="btn btn-danger"
              onClick={() => fetchTodoById(todo.id)}
            >
              Edit
            </button>

            <button
              className="btn btn-primary"
              onClick={() => removeTodo(todo)}
            >
              Remove
            </button>

            <button onClick={() => deleteTodo(todo)}
    className="btn btn-danger ms-2">
    Delete
  </button>

          </li>
        ))}
      </ul>
    </div>
  );
}
export default WorkingWithArrays;
