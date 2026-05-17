import { type BoardTypes, type TodoItem } from '../types/todoTypes.ts'
import { Todo } from '../models/Todo.ts'

export class TodoService {
  private todos: TodoItem[] = []

  addTodo(text: string, board: BoardTypes): TodoItem {
    const todo = new Todo(crypto.randomUUID(), text, board)
    this.todos.push(todo)
    return todo
  }

  getTodos(board: BoardTypes): TodoItem[] {
    const source = board ? this.todos.filter((todo) => todo.board === board) : this.todos
    return [...source] // .sort((a, b) => a.order - b.order) TODO layter order the Todos
  }

  moveTodo(targetBoard: string, list: HTMLElement) {
    console.log('SERVICE MOVETOO', targetBoard, list)
    // now change the todo obj pls
  }
}
