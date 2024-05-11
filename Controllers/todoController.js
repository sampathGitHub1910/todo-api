const asyncHandler = require("express-async-handler")

const Todo = require("../Model/todoModel")
//@dec Get all tasks
//@route Get /api/tasks
//@access private

const getTodoTasks = asyncHandler(async (req, res) => {
    const todos = await Todo.find({user_id: req.user.id})
    res.status(200).json(todos)
})

//@dec Get task
//@route Get /api/tasks/id
//@access private

const getTodoTask = asyncHandler(async (req, res) => {
    const todos = await Todo.findById(req.params.id)
    if(!todos){
        res.status(404)
        throw new Error("Task Not Found")
    }
    res.status(200).json(todos)
})

//@dec Create new task
//@route POST /api/tasks
//@access private

const createTodoTask = asyncHandler(async (req, res) => {
    const {title, description } = req.body
    if(!title || !description){
        res.status(400)
        throw new Error("All fields are mandatory!")
    }
    const todos = await Todo.create({title, description, user_id: req.user.id})
    res.status(201).json(todos)
})

//@dec Update task
//@route PUT /api/tasks/id
//@access private

const updateTodoTask = asyncHandler(async (req, res) => {
    const todos = await Todo.findById(req.params.id)
    if(!todos){
        res.status(404)
        throw new Error("Task Not Found")
    }

    if(todos.user_id.toString() !== req.user.id){
        res.status(403)
        throw new Error("User don't have permission to update other user tasks")
    }

    const updatedTask = await Todo.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    )

    res.status(200).json(updatedTask)
})

//@dec Delete task
//@route DELETE /api/tasks/id
//@access private

const deleteTodoTask = asyncHandler(async (req, res) => {
    const todos = await Todo.findById(req.params.id)
    if(!todos){
        res.status(404)
        throw new Error("Task Not Found")
    }

    if(Todo.user_id.toString() !== req.user.id){
        res.status(403)
        throw new Error("User don't have permission to delete other user tasks")
    }

    await Todo.findByIdAndDelete({_id: req.params.id})
    res.status(200).json({msg:"Task deleted", todos})
})

module.exports = { getTodoTask, getTodoTasks, createTodoTask, updateTodoTask, deleteTodoTask }