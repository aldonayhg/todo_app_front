import React, { useState, useEffect } from 'react';

const App = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');

    // Base URL desde la variable de entorno
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        fetch(`${backendUrl}/api/todos`)
            .then((response) => response.json())
            .then((data) => setTodos(data));
    }, [backendUrl]);

    const addTodo = () => {
        fetch(`${backendUrl}/api/todos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: newTodo, completed: false }),
        })
            .then((response) => response.json())
            .then((todo) => setTodos([...todos, todo]));
        setNewTodo('');
    };

    const deleteTodo = (id) => {
        fetch(`${backendUrl}/api/todos/${id}`, {
            method: 'DELETE',
        })
            .then(() => setTodos(todos.filter((todo) => todo.id !== id)));
    };

    return (
        <div>
            <h1>To-Do App</h1>
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>
                        {todo.title}{' '}
                        <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <input
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
            />
            <button onClick={addTodo}>Add</button>
        </div>
    );
};

export default App;