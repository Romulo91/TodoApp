import { renderTodoItem } from './component/TodoItem/todoItem.ts'
import { TodoService } from './services/TodoService.ts'

const form = document.getElementById('todo-submit-form') as HTMLFormElement
const currentTodo = document.getElementById('todo-input') as HTMLInputElement
const todoListElement = document.querySelector('.open_todos_container') as HTMLUListElement | null
const boardList = document.querySelectorAll(
  '.open_todos_container, .progress_todos_container, .blocked_todos_container, .done_todos_container',
)

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

boardList.forEach((list) => {
  list.addEventListener('dragover', (e) => {
    e.preventDefault()
    console.log('TESTT Drag', e)
  })

  list.addEventListener('drop', (e) => {
    e.preventDefault()
    console.log('TEST DROP', e)
    const targetBoard = getBoardFromList(list as Element)
    console.log('targetBoard', targetBoard)
  })
})

function getBoardFromList(list: Element): 'open' | 'in_progress' | 'blocked' | 'done' {
  if (list.classList.contains('open_todos')) return 'open'
  if (list.classList.contains('progress_todos')) return 'in_progress'
  if (list.classList.contains('blocked_todos')) return 'blocked'
  return 'done'
}
