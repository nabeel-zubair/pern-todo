const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const cors = require('cors');
const pool = require('./db');

// Middleware
app.use(cors());
app.use(express.json());

// Create todo
app.post('/todos', async(req, res) => {
    try {
        const { description } = req.body;
        const newTodo = await pool.query('INSERT INTO todo (description) VALUES($1) RETURNING *', [description]);  
        res.json(newTodo.rows);
    } catch (err) {
        console.log(err.body);
    } 
 });

 //Get all Todos
 app.get('/todos', async(req, res) => {
     try {
         const allTodos = await pool.query('SELECT * FROM todo');
         res.json(allTodos.rows);
     } catch (err) {
         console.log(err);
     }
 });

 // Get Todo
 app.get('/todos/:id', async(req, res) => {
     try {
         const { id } = req.params;
         const todo =  await pool.query('SELECT * FROM todo WHERE todo_id = $1', [id]);
         res.json(todo.rows);
     } catch (err) {
         console.log(err);
     }
 });

 app.put('/todos/:id', async(req, res) => {
     try {
         const { id } = req.params;
         const { description } = req.body;
         const updateTodo = await pool.query('UPDATE todo SET description = $1 WHERE todo_id = $2', [description, id]);
         res.json('Todo with ID ' + id + ' was updated');
     } catch (err) {
         console.log(err);
     }
 })

 app.delete('/todos/:id', async(req, res) => {
     try {
         const { id } = req.params;
         const deleteTodo = await pool.query('DELETE FROM todo WHERE todo_id = $1', [id]);
         res.json('Todo with ID ' + id + ' was deleted' );
     } catch (err) {
         console.log(err);
     }
 })

app.listen(5000, () => {
    console.log('Server has started on port 5000');
});
