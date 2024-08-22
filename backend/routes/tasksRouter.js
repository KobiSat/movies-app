import { Router } from "express"
import tasksControllers from './../controllers/tasksControllers.js'

const router = Router()

router.route('/')
.get(tasksControllers.getAllTasks)
.post(tasksControllers.addTask)

router.route('/:id')
.get(tasksControllers.getTaskById)
.patch(tasksControllers.editTask)
.delete(tasksControllers.deleteTask)

export default router