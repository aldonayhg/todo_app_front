import React, { useState, useEffect } from 'react';

const App = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');

    useEffect(() => {
        fetch('/api/todos')
            .then((response) => response.json())
            .then((data) => setTodos(data));
    }, []);

    const addTodo = () => {
        fetch('/api/todos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: newTodo, completed: false }),
        })
            .then((response) => response.json())
            .then((todo) => setTodos([...todos, todo]));
        setNewTodo('');
    };

    const deleteTodo = (id) => {
        fetch(`/api/todos/${id}`, {
            method: 'DELETE',
        })
            .then(() => {
                // Filtrar la tarea eliminada del estado
                setTodos(todos.filter((todo) => todo.id !== id));
            })
            .catch((error) => console.error('Error deleting todo:', error));
    };

    return (
        <div>
            <h1>To-Do App</h1>
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>
                        {todo.title}{' '}
                        <button onClick={() => deleteTodo(todo.id)}>
                            Delete
                        </button>
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