import { Request, Response } from 'express'
import { Types } from 'mongoose'
import { TodoModel } from '@/models/todo.model'
import { ITodo } from '@/interfaces/todo.interface'
import { IResponse } from '@/interfaces/response'
import { HTTP_STATUS_CREATED, HTTP_STATUS_INTERNAL_SERVER_ERROR, HTTP_STATUS_NOT_FOUND, HTTP_STATUS_OK } from '@/utils/http_codes'
import { INTERNAL_SERVER_ERROR_MESSAGE, NOT_FOUND_MESSAGE } from '@/errors/todo.error'

export const createTodo = async (req: Request, res: Response): Promise<Response<IResponse>> => {
  try {
    const { text, completed, createdAt }: ITodo = req.body
    const newTodo: ITodo = new TodoModel({ text, completed, createdAt })
    const savedTodo: ITodo = await newTodo.save()
    return res.status(HTTP_STATUS_CREATED).json({ 
      data: savedTodo
    } as IResponse)
  } catch (error) {
    console.error(error)
    return res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).json({ 
      message: INTERNAL_SERVER_ERROR_MESSAGE
    } as IResponse)
  }
}

export const getAllTodos = async (req: Request, res: Response): Promise<Response<IResponse>> => {
  try {
    const todos: Array<ITodo> = await TodoModel.find()
    return res.status(HTTP_STATUS_OK).json({ 
      data: todos
    } as IResponse)
  } catch (error) {
    console.error(error)
    return res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).json({ 
      message: INTERNAL_SERVER_ERROR_MESSAGE
    } as IResponse)
  }
}

export const getTodoById = async (req: Request, res: Response): Promise<Response<IResponse>> => {
  try {
    const { _id }: ITodo = req.body
    const todo = await TodoModel.findById({ _id }) as ITodo
    if (!todo)
      return res.status(HTTP_STATUS_NOT_FOUND).json({ 
        message: NOT_FOUND_MESSAGE 
      } as IResponse)
    return res.status(HTTP_STATUS_OK).json({ 
      data: todo
    } as IResponse)
  } catch (error) {
    console.error(error)
    return res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).json({ 
      message: INTERNAL_SERVER_ERROR_MESSAGE
    } as IResponse)
  }
}

export const updateTodo = async (req: Request, res: Response): Promise<Response<IResponse>> => {
  try {
    const { _id, text, completed, createdAt }: ITodo = req.body
    if (!_id || !Types.ObjectId.isValid(_id)) 
      return res.status(HTTP_STATUS_NOT_FOUND).json({ 
        message: NOT_FOUND_MESSAGE 
      } as IResponse)
    const updatedTodo = await TodoModel.findByIdAndUpdate(_id, {text, completed, createdAt }) as ITodo
    if (!updatedTodo)
      return res.status(HTTP_STATUS_NOT_FOUND).json({ 
        message: NOT_FOUND_MESSAGE 
      } as IResponse)
    return res.status(HTTP_STATUS_OK).json({ 
      data: updatedTodo
    } as IResponse)
  } catch (error) {
    return res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).json({ 
      message: INTERNAL_SERVER_ERROR_MESSAGE
    } as IResponse)
  }
}

export const deleteTodo = async (req: Request, res: Response): Promise<Response<IResponse>> => {
  try {
    const { _id } = req.params
    if (!_id || !Types.ObjectId.isValid(_id)) 
      return res.status(HTTP_STATUS_NOT_FOUND).json({ 
        message: NOT_FOUND_MESSAGE 
      } as IResponse)
    const deletedTodo = await TodoModel.findByIdAndDelete(_id) as ITodo
    if (!deletedTodo) 
      return res.status(HTTP_STATUS_NOT_FOUND).json({ 
        message: NOT_FOUND_MESSAGE
      } as IResponse)
      return res.status(HTTP_STATUS_OK).json({ 
        data: deletedTodo
      } as IResponse)
  } catch (error) {
    console.error(error)
    return res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
      error: INTERNAL_SERVER_ERROR_MESSAGE 
    })
  }
}