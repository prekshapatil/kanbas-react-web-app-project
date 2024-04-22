import React, { useState, useEffect } from "react";
import axios from "axios";

function WorkingWithArrays() {
    const [errorMessage, setErrorMessage] = useState(null);
    const [todo, setTodo] = useState({
        id: 1,
        title: "NodeJS Assignment",
        description: "Create a NodeJS server with ExpressJS",
        due: "2021-09-09",
        completed: false,
      });
    const [todos, setTodos] = useState<any[]>([]);
    const postTodo = async () => {
        const response = await axios.post(API, todo);
        setTodos([...todos, response.data]);
      };
    
    const fetchTodos = async () => {
        const response = await axios.get(API);
        setTodos(response.data);
    };

    const updateTodo = async () => {
        try {
        const response = await axios.put(`${API}/${todo.id}`, todo);
        setTodos(todos.map((t) => (t.id === todo.id ? todo : t)));
        } catch (error:any) {
            console.log(error);
            setErrorMessage(error.response.data.message);
        }
      };
    

    const updateTitle = async () => {
        const response = await axios.get(`${API}/${todo.id}/title/${todo.title}`);
        setTodos(response.data);
    }


    const fetchTodoById = async (id: any) => {
        const response = await axios.get(`${API}/${id}`);
        setTodo(response.data);
    }
    useEffect(() => {
        fetchTodos();
    }, []);
    const deleteTodo = async (todo:any) => {
        try {
            const response = await axios.delete(`${API}/${todo.id}`);
            setTodos(todos.filter((t) => t.id !== todo.id));
        } catch (error:any) {
            console.log(error);
            setErrorMessage(error.response.data.message);
      }
    };
    
    
    const createTodo = async () => {
        const response = await axios.post(`${API}/`,todo);
        setTodos([...todos, response.data]);
    };
    
    
    const API = "https://kanbas-server-app-k7lj.onrender.com/a5/todos";
    return (
      <div>
        <h3>Working with Arrays</h3>
        <h4>Retrieving Arrays</h4>
        <a className="btn btn-primary" href={API}>
          Get Todos
        </a>
        <h4>Retrieving an Item from an Array by ID</h4>
        <div className="input-group mt-2">
        <input className="form-control" value={todo.id}
        onChange={(e) => setTodo({ ...todo,
          id: parseInt(e.target.value )})}/>
        <a className="btn btn-primary ms-2" href={`${API}/${todo.id}`}>
        Get Todo by ID
        </a>
        </div>
        <h3>Filtering Array Items</h3>
        <a className="btn btn-primary" href={`${API}?completed=true`}>
            Get Completed Todos
        </a>
        <h3>Creating new Items in an Array</h3>
        <a className="btn btn-primary" href={`${API}/create`}>
            Create Todo
        </a>
        <h3>Deleting from an Array</h3>
        <a className="btn btn-primary" href={`${API}/${todo.id}/delete`}>
            Delete Todo with ID = {todo.id}
        </a>
        <h3>Updating an Item in an Array</h3>
        <input className="form-control mt-3" type="number" value={todo.id}
        onChange={(e) => setTodo({
          ...todo, id: parseInt(e.target.value )})}/>
        <input className="form-control" type="text" value={todo.title}
        onChange={(e) => setTodo({
          ...todo, title: e.target.value })}/>
        <a className="btn btn-primary" href={`${API}/${todo.id}/title/${todo.title}`} >
            Update Title to {todo.title}
        </a>
        <input className="form-control mt-3" type="number" value={todo.id}
        onChange={(e) => setTodo({
          ...todo, id: parseInt(e.target.value )})}/>
        <input className="form-control" type="text" value={todo.description}    
        onChange={(e) => setTodo({
          ...todo, description: e.target.value })}/>
        <a className="btn btn-primary" href={`${API}/${todo.id}/description/${todo.description}`} >
            Update Description to {todo.description}
        </a>
        <input className="form-control mt-3" type="number" value={todo.id}
        onChange={(e) => setTodo({
          ...todo, id: parseInt(e.target.value )})}/>
        <label className="form-label" htmlFor="completedTodo">Completed</label>
        <input className="form-check-input" type="checkbox" id="completedTodo"
                onChange={(e) => setTodo({ ...todo,
                    completed: e.target.checked })}
                checked={todo.completed}/>
            <a className="btn btn-primary ms-2" href={`${API}/${todo.id}/completed/${todo.completed}`}>
                Update Completed
            </a>
    <br/>
    <br/>
    {errorMessage && (
        <div className="alert alert-danger mb-2 mt-2">
          {errorMessage}
        </div>
      )}
    <input className="form-control mt-3" type="number" value={todo.id}/>
        <input className="form-control mt-2" type="text" value={todo.title}
        onChange={(e) => setTodo({
          ...todo, title: e.target.value })}/>
    <textarea className="form-control mt-2" value={todo.description}
        onChange={(e) => setTodo({ ...todo,
          description: e.target.value })} />
      <input className="form-control mt-2" value={todo.due} type="date"
        onChange={(e) => setTodo({
          ...todo, due: e.target.value })} />
      <label className="mt-2">
        <input className="form-check-input" checked={todo.completed} type="checkbox"
          onChange={(e) => setTodo({
            ...todo, completed: e.target.checked })} />
        Completed
      </label>
      <button className="btn btn-warning w-100 mt-2" onClick={postTodo}> Post Todo </button>
    <button className="btn btn-primary w-100 mt-2" onClick={createTodo} >
        Create Todo
      </button>
      <button className="btn btn-success w-100 mt-2" onClick={updateTodo} >
        Update Todo
      </button>
        <ul className="list-group mt-3">
        {todos.map((todo:any) => (
          <li className="list-group-item" key={todo.id}>
            <button className="btn btn-warning float-end ms-2" onClick={() => fetchTodoById(todo.id)} >
            Edit
            </button>
            <button className="btn btn-danger float-end" onClick={() => deleteTodo(todo)} >
            Remove
            </button>
            <input checked={todo.completed} className="form-check-input me-2"
              type="checkbox" readOnly />
            {todo.title}
            <p>{todo.description}</p>
            <p>{todo.due}</p>
          </li>
        ))}
      </ul>
      </div>
    );
  }
  export default WorkingWithArrays;