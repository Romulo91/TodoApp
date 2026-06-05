import { type BoardTypes, type TodoItem } from '../types/todoTypes.ts'
import { Todo } from '../models/Todo.ts'

export class TodoService {
  private todos: TodoItem[] = []
  constructor() {
    // set or get storage
    const stored = localStorage.getItem('todos')
    stored
      ? (this.todos = JSON.parse(stored))
      : localStorage.setItem('todos', JSON.stringify(this.todos))

    // look if todoItem are older than 1day
    console.log(this.todos)
  }

  addTodo(text: string, board: BoardTypes): TodoItem {
    console.info('added an ToDo item')
    const todo = new Todo(crypto.randomUUID(), text, board)
    this.todos.push(todo)
    localStorage.setItem('todos', JSON.stringify(this.todos))
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

    if (targetBoard === 'done') todo.doneAt = Date.now()

    // set todoItem to targetBoard
    todo.board = targetBoard
    localStorage.setItem('todos', JSON.stringify(this.todos))
  }

  reorderTodos(board: BoardTypes, orderedIds: string[]): void {
    const boardTodos = this.todos.filter((todo) => todo.board === board)
    const remainingTodos = this.todos.filter((todo) => todo.board !== board)
    const boardTodoMap = new Map(boardTodos.map((todo) => [todo.id, todo]))

    const reorderedBoardTodos = orderedIds
      .map((id) => boardTodoMap.get(id))
      .filter((todo): todo is TodoItem => Boolean(todo))

    // Keep any board items not present in orderedIds at the end for safety.
    const missingBoardTodos = boardTodos.filter((todo) => !orderedIds.includes(todo.id))

    this.todos = [...remainingTodos, ...reorderedBoardTodos, ...missingBoardTodos]
    localStorage.setItem('todos', JSON.stringify(this.todos))
  }

  removeTodo(todoId: string): void {
    console.info('remove Todo item')
    this.todos = this.todos.filter((li) => li.id !== todoId)
    localStorage.setItem('todos', JSON.stringify(this.todos))
  }
}
