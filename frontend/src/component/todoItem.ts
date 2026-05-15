import type { TodoItem } from '../types/todoTypes.ts'

export function renderTodoItem(todo: TodoItem): string {
  return `
  <li data-id="${todo.id}">
    <span>${todo.text}</span>
    <span>${todo.board}</span>
  </li>
  `
}
