import { type BoardTypes, type TodoItem } from '../types/todoTypes.ts'
import { Todo } from '../models/Todo.ts'

export class TodoService {
  private todos: TodoItem[] = []

  addTodo(text: string, board: BoardTypes): TodoItem {
    const todo = new Todo(crypto.randomUUID(), text, board)
    this.todos.push(todo)
    console.log('TODOS', this.todos)
    return todo
  }

  getTodos(board: BoardTypes): TodoItem[] {
    const source = board ? this.todos.filter((todo) => todo.board === board) : this.todos
    return [...source] // .sort((a, b) => a.order - b.order) TODO layter order the Todos
  }

  moveTodo(targetBoard: BoardTypes, list: HTMLElement) {
    console.log('SERVICE MOVETODO', targetBoard, list)
    if (list === null) return
    const todo = this.todos.find((item) => item.id === list.dataset['id'])
    if (!todo) return console.error(`something went wrong:  ${todo}`)
    todo.board = targetBoard
  }

  removeTodo(list: HTMLElement): void {
    this.todos.filter((li) => li.id !== list.dataset['id'])
  }
}
