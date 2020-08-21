import React, { Fragment, useEffect, useState } from 'react';
import EditTodo from './EditTodo';

const ListTodos = () => {

    const [todos, setTodos] = useState([]);

    // Delete todo function
    const deleteTodo = async (id) => {
        try {
            await fetch(`http://localhost:5000/todos/${id}`, {
                method: 'DELETE'
            });

            setTodos(todos.filter(todo => todo.todo_id !== id));
        } catch (err) {
            console.error(err.message);
        }
    }

    const getTodos = async () => {
        try {
            const response = await fetch("http://localhost:5000/todos");
            const jsonData = await response.json();
            setTodos(jsonData);
        } catch (err) {
            console.error(err.message)
        }
    }

    useEffect(() => {
        getTodos();
    }, [])

    return (
        <Fragment>
            <table className="table mt-5 text-center">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map((todo) => {
                        return (
                            <tr key={todo.todo_id}>
                                <td>{todo.description}</td>
                                <td><EditTodo todo={todo} /></td>
                                <td><button onClick={() => deleteTodo(todo.todo_id)} className="btn btn-danger">Delete</button></td>
                            </tr>
                        )
                    })}
                    {/* <tr>
                        <td>John</td>
                        <td>Doe</td>
                        <td>john@example.com</td>
                    </tr>
                    <tr>
                        <td>Mary</td>
                        <td>Moe</td>
                        <td>mary@example.com</td>
                    </tr>
                    <tr>
                        <td>July</td>
                        <td>Dooley</td>
                        <td>july@example.com</td>
                    </tr> */}
                </tbody>
            </table>
        </Fragment>
    )
}

export default ListTodos
