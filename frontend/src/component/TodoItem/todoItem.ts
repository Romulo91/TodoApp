import type { TodoItem } from '../../types/todoTypes.ts'
import './style.css'

export function renderTodoItem(todo: TodoItem): string {
  const title = todo.title ?? 'Todo'
  const description = todo.description ?? todo.text
  const tags = todo.tags ?? []

  return `
  <li class='todo-item todo-item-${todo.id}' data-id="${todo.id}" draggable="true" >
        <div class="todo-header">
            <h4 class="todo-title">${title}</h4>
            <button class='close-button close-button-${todo.id}' type="button" data-id="${todo.id}" aria-label="Close">x</button>
        </div>
        <div class="todo-body todo-body-${todo.id}">
            <p class="todo-text">${description}</p>
        </div>
        <div class="todo-tags" aria-label="Todo tags">
            ${tags.length ? tags.map((tag) => `<span class="todo-tag">${tag}</span>`).join('') : '<span data-id="${todo.id}" class="todo-tag todo-tag-placeholder">No tags yet</span>'}
        </div>
  </li>
  `
}
