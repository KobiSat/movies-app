import Task from './../models/taskModel.js'
import factory from './factoryHandlers.js'

const getAllTasks =factory.getAll(Task)

const getTaskById = factory.getOne(Task)

const addTask = factory.createOne(Task)

const editTask = factory.editOne(Task)

const deleteTask = factory.deleteOne(Task)

export default {getAllTasks, getTaskById, addTask, editTask, deleteTask }