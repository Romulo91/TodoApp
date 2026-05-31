import { type BoardTypes, type TodoItem } from '../types/todoTypes.ts'
import { Todo } from '../models/Todo.ts'

export class TodoService {
  private todos: TodoItem[] = []

  addTodo(text: string, board: BoardTypes): TodoItem {
    console.info('added an ToDo item')
    const todo = new Todo(crypto.randomUUID(), text, board)
    this.todos.push(todo)
    return todo
  }

  getTodos(board: BoardTypes): TodoItem[] {
    const source = board ? this.todos.filter((todo) => todo.board === board) : this.todos
    return [...source] // .sort((a, b) => a.order - b.order) TODO layter order the Todos
  }

  moveTodo(targetBoard: BoardTypes, list: HTMLElement) {
    if (list === null) return
    const todo = this.todos.find((item) => item.id === list.dataset['id'])
    if (!todo) return console.error(`something went wrong:  ${todo}`)
    console.info(`moved todo to ${targetBoard}`)
    todo.board = targetBoard
  }

  removeTodo(todoId: string): void {
    console.info('remove Todo item')
    this.todos = this.todos.filter((li) => li.id !== todoId)
  }
}
