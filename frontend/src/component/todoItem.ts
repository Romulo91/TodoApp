import type { TodoItem } from '../types/todo.ts'

export function renderTodoItem(todo: TodoItem): string {
  return `
  <li data-id="${todo.id}">
    <span>${todo.text}</span>
    <span>${todo.status}</span>
  </li>
  `
}
