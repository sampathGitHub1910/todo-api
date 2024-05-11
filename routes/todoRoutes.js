const express = require("express")

const router = express.Router()

const {getTodoTask, getTodoTasks, createTodoTask, updateTodoTask, deleteTodoTask} = require("../Controllers/todoController")
const { validate } = require("../Model/todoModel")
const validateToken = require("../Middleware/validateTokenHandler")

router.use(validateToken)
router.route("/").get(getTodoTasks).post(createTodoTask)
router.route("/:id").get(getTodoTask).put(updateTodoTask).delete(deleteTodoTask)

module.exports = router