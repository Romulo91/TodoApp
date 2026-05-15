import type { TodoItem } from '../../types/todoTypes.ts'
import './style.css'

export function renderTodoItem(todo: TodoItem): string {
  return `
  <li class="todo-item" data-id="${todo.id}" draggable="true">
    <span>${todo.text}</span>
  </li>
  `
}
