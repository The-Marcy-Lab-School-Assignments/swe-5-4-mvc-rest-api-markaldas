# Short Response Questions

Answer each question below in your own words. Aim for 3–5 sentences per answer. Be specific — use exact terms and concepts from the lesson.

Your responses will each be evaluated out of 3 points for writing quality and 3 points for technical accuracy (6 points per question, 30 points total).

---

## Question 1 — REST Principles

The Todo Tracker API is a **RESTful** API. Identify at least **3 specific design decisions** in the API that make it RESTful, and explain what each one communicates to a client developer. Consider the URL structure, HTTP methods, and status codes used.

**Your answer here**:
First the endpoint URLs describe resources not actions. For example they used an endpoint called `/api/todos` to get all todos this shows the resource that the endpoint is getting, a wrong way of doing it would be naming the endpoint `/api/getTodos` this is showing the action it is preforming which does not follow the rules of a **RESTful** API. Along with this another rule that it follows is, it uses the right HTTP methods on the endpoints, depending if the endpoint is retrieving (GET), creating (POST), updating (PATCH), or removing data (DELETE). Another rule that the Todo Tracker API is following is that the endpoints are indicating a clear hierarchy of resources. For example for one of the endpoints grabing just 1 individual resource using an ID the endpoint is `/api/todos/:id` this shows a clear hierarchy. First it is getting all the todos and then a specific task depending on the id parameter.

## Question 2 — Separation of Concerns

What problem is caused by mixing data logic and request/response logic in a single file? What does separating them into a model and controller enable? Be specific about what gets harder and what gets easier.

**Your answer here**:

The problem that is caused by mixing data logic and request/response logic in a single file, is that when the systems get more complex it gets harder to debug, it gets harder to read the code, and it becomes less organized. Seperating them into a model and controller makes it easier to understand what are the functions that are munipulating the data, and the functions that are receiving, and sending the responses. This makes it easier to debug because now you can test to see which function failed, isolating whether the issue is in the model or controller. It makes everything more organized, and easier to read because when you go into the model file you know exactly what the functions are doing and why you are in that file, same with the controller file. You are not mixing logic no more so you are able to scale up better by making it easier to add new features instead of trying to add a new feature to a large file. You are also able to resuse model functions in other areas of the application.

## Question 3 — Request Lifecycle

Walk through what happens, step by step, when the user clicks a checkbox to toggle a todo's `isDone` field. Name each file and function in your MVC structure that gets involved, in the order it runs, and describe what it does.

**Your answer here**:

Whenever a user clicks the checkbox to toggle a todo's `isDone` field it updates the task. It does this by first sending a fetch request from the front end with the right HTTP method and endpoint. Since we are updating, the method would be a `PATCH` and the enpoint would be `/api/todos/:id` and since we are updating 1 single task, they would input the specfic id number of the task they want to update in the endpoint parameter and send over data in the body that the backend will use to update the task. So first within the server folder, in the index file it will find the right method that the client sent which was a `PATCH` and match it with the right endpoint that the client used which was `/api/todos/:id`. It will then execute the function associated with this method and endpoint to update the task, which in our case would be `updateTodo` in the `controllers.js` file. In that controllers file the function `updateTodo` will receive the request and deconstruct the `req.params` object to grab the id parameter that the client sent in the endpoint it used. We need that id parameter in order for the model to know which exact task the model should update. `updateTodo` also deconstructs the `req.body` object which contains a `isDone` value. It is the information that the model needs to update the tasks `isDone` to. The function `updateTodo` then sends the deconstructed information in the `update` parameters which is a model function in the `models.js` file. The `updateTodo` controller function puts the id parameter in a `Number()` in the `update` function parameter since we are receiving the information in a string we use `Number(id)` to convert id into a number for the model function to use. In the `models.js` file, the `update` function then finds the specfic task with the id that the client sent over to update it, once it finds the task it updates the tasks `isDone` value with the new `isDone` value that the client sent. Then the `update` function returns a copy of the updated task. Then in the controllers file the `updateTodo` function sends the client back the copy of the updated task.

## Question 4 — Code Sorting

Below is a `createTodo` function that does everything in one place. For each numbered line, identify whether it belongs in the **model** or the **controller**, and explain why.

```js
const createTodo = (req, res) => {
  /* 1 */ const { task } = req.body;
  /* 2 */ if (!task)
    return res.status(400).send({ message: "task is required" });
  /* 3 */ const newTodo = { id: getId(), task, isDone: false };
  /* 4 */ todos.push(newTodo);
  /* 5 */ res.status(201).send(newTodo);
};
```

**Your answer here**:

1. This line goes in the controller because we are receiving the request that the client is giving us and deconstructing the request body. We are not modifying or managing the data yet.
2. These lines go in the controller because we are still handling and managing the request, checking if there is a task in the request body and sending the appropriate status if there is not task. We are still not managing the data so it is not a model.
3. We are managing data now, we are creating a object with values that we are then going to input into the our database, so this piece of code goes into a model.
4. We are still managing data and modifying it, we are adding the object we created and pushing it into an array, modfiying that array. This belongs in the model.
5. We are managing interaction between the model and the client, sending back a response with the created object and the appropriate status code stating that the creation was successful.
