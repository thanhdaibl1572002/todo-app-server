import express from 'express'
import { getAllTodos, getTodoById, createTodo, updateTodo, deleteTodo } from '@/controllers/todo.controller'

const todoRouter = express.Router()

todoRouter.post('/todos/getall', getAllTodos)
todoRouter.post('/todos/getbyid', getTodoById)
todoRouter.post('/todos/create', createTodo)
todoRouter.put('/todos/update', updateTodo)
todoRouter.delete('/todos/delete/:_id', deleteTodo)

export default todoRouter