import { renderTodoItem } from './component/todoItem.ts'
import { TodoService } from './services/TodoService.ts'

const form = document.getElementById('todo-submit-form') as HTMLFormElement
const currentTodo = document.getElementById('todo-input') as HTMLInputElement
const todoListElement = document.querySelector('.open_todos') as HTMLUListElement | null

// constante
const service = new TodoService()

// submit new TodoItem
form?.addEventListener('submit', (e) => {
  e.preventDefault()

  const todoValue = currentTodo.value.trim()

  // return if currentValue is empty
  if (todoValue === '') return

  service.addTodo(todoValue)
  renderTodoList()
  currentTodo.value = ''
  currentTodo.focus()
})

// render TodoList here
function renderTodoList(): void {
  if (!todoListElement) return

  todoListElement.innerHTML = service
    .getTodos()
    .map((todo) => renderTodoItem(todo))
    .join('')
}
