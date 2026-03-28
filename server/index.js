const express = require('express');
const path = require('path');

const app = express();
const pathToFrontend = path.join(__dirname, '../frontend');


////////////////////////
// Middleware
////////////////////////

const logRoutes = (req, res, next) => {
  const time = (new Date()).toLocaleString();
  console.log(`${req.method}: ${req.originalUrl} - ${time}`);
  next();
};

app.use(logRoutes);
app.use(express.static(pathToFrontend));
app.use(express.json());

////////////////////////
// In-Memory Database
////////////////////////


// Increments and returns a unique id each time it is called.
let id = 1;
const getId = () => id++;

// Seed data — do not remove
const todos = [
  { id: getId(), task: 'Buy groceries', isDone: false },
  { id: getId(), task: 'Walk the dog', isDone: true },
  { id: getId(), task: 'Read a book', isDone: false },
];

////////////////////////
// Endpoints
////////////////////////
// const todoControllers = require('./controllers/controllers.js')

const listTodos = (req, res) => {
  res.send(todos);
}

const findTodo = (req, res) => {
  const { id } = req.params;
  const task = todos.find((task) => task.id === Number(id));
  if (!task) {
    return null;
  }
  if (!findTodo) {
    res.status(404).send({ message: `no task with the id ${id} was found` });
  }
  res.send(task);
}

const createTodo = (req, res) => {
  const { task } = req.body;
  if (!task) {
    res.status(400).send({ message: 'Please input task' });
  }
  const newTask = { id: getId(), task, isDone: false };
  todos.push(newTask);
  res.status(201).send(newTask);
}

const updateTodo = (req, res) => {
  const { id } = req.params;
  const { isDone } = req.body;
  if (!id) {
    res.status(404).send({ message: `no task with the id ${id} was found` })
  }

  const updateTask = todos.find((task) => task.id === Number(id));
  if (!updateTask) {
    res.status(404).send({ message: 'id not found' });
  }
  updateTask.isDone = isDone;
  res.send(updateTask);
}

const deleteTodo = (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(404).send({ message: `no task with the id ${id} was found` })
  }
  const deleteTask = todos.findIndex((task) => task.id === Number(id));
  if (deleteTask < 0) {
    res.status(404).send({ message: 'Not found' });
  }
  todos.splice(deleteTask, 1);
  res.sendStatus(204)
}
// TODO: GET /api/todos
// Response: 200, array of all todos

const apiNotFound = (req, res) => {
  res.status(404).send({ error: `Not found: ${req.originalUrl}` })
}
app.get('/api/todos', listTodos);
app.get('/api/todos/:id', findTodo);
app.post('/api/todos', createTodo);
app.patch('/api/todos/:id', updateTodo);
app.delete('/api/todos/:id', deleteTodo);
app.use(apiNotFound);


// TODO: GET /api/todos/:id
// Response: 200, single todo object
// Error: 404 if no todo with that id



// TODO: POST /api/todos
// Request body: { task }
// Response: 201, the newly created todo object
// Error: 400 if task is missing from the request body


// TODO: PATCH /api/todos/:id
// Request body: { isDone }
// Response: 200, the updated todo object
// Error: 404 if no todo with that id


// TODO: DELETE /api/todos/:id
// Response: 204, no content
// Error: 404 if no todo with that id


// TODO: Catch-all handler — send a 404 JSON error for unmatched /api routes,
// or serve index.html for all other routes (SPA fallback)


const port = 8080;
app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
