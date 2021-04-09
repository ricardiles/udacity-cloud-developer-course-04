import * as uuid from 'uuid'

import { TodoItem } from '../../models/TodoItem'
import { TodoAccess } from '../dataLayer/todoAccess'
import { getUserId } from '../auth/utils'

interface CreateTodoRequest {
    name: string
    dueDate: string
  }

const todoAccess = new TodoAccess()

export async function getAllTodos(): Promise<TodoItem[]> {
  return todoAccess.getAllTodos()
}

export async function createTodo(
  createTodoRequest: CreateTodoRequest,
  jwtToken: string
): Promise<TodoItem> {

  const itemId = uuid.v4()
  const userId = getUserId(jwtToken)

  return await todoAccess.createTodo({
    todoId: itemId,
    userId: userId,
    name: createTodoRequest.name,
    dueDate: createTodoRequest.dueDate,
    done: true,
    createdAt: new Date().toISOString()
  })
}