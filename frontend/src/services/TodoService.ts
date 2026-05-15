import { type TodoItem } from '../types/todoTypes.ts'
import { Todo } from '../models/Todo.ts'

export class TodoService {
  private todos: TodoItem[] = []

  addTodo(text: string) {
    const id = crypto.randomUUID()
    this.todos.push(new Todo(id, text, 'open'))
  }

  getTodos(): TodoItem[] {
    return [...this.todos]
  }
}
