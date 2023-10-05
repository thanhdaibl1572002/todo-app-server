import mongoose, { Schema, Document } from 'mongoose'
import { ITodo } from '@/interfaces/todo.interface'

const TodoSchema: Schema = new Schema({
  text: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})


export const TodoModel = mongoose.model<ITodo>('Todo', TodoSchema)