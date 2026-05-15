import { renderTodoItem } from './component/TodoItem/todoItem.ts'
import { TodoService } from './services/TodoService.ts'
import type { BoardTypes } from './types/todoTypes.ts'

const form = document.getElementById('todo-submit-form') as HTMLFormElement
const currentTodo = document.getElementById('todo-input') as HTMLInputElement
const todoListElement = document.querySelector('.open_todos_container') as HTMLUListElement | null
const boardList = document.querySelectorAll(
  '.open_todos_container, .progress_todos_container, .blocked_todos_container, .done_todos_container',
)

// import TodoService and store it
const service = new TodoService()

// submit new TodoItem
form?.addEventListener('submit', submitTodoItem)

function submitTodoItem(e: Event): void {
  e.preventDefault()

  const todoValue = currentTodo.value.trim()

  // return if currentValue is empty
  if (todoValue === '') return

  service.addTodo(todoValue)
  renderTodoList()
  bindTodoItemsEvents()
  currentTodo.value = ''
  currentTodo.focus()
}

// render TodoList here
function renderTodoList(): void {
  if (!todoListElement) return

  todoListElement.innerHTML = service
    .getTodos()
    .map((todo) => renderTodoItem(todo))
    .join('')
}

boardList.forEach((list) => {
  list.addEventListener('dragover', (e: Event): void => {
    e.preventDefault()
    console.log('TESTT Drag', e.currentTarget)
  })

  list.addEventListener('drop', (e) => {
    e.preventDefault()
    const targetBoard = getBoardFromList(list as Element)
    console.log('targetBoard', targetBoard)
  })
})

addEventListener('drag', (event) => {
  console.log('Hello', event.currentTarget)
})

function getBoardFromList(list: Element): BoardTypes {
  if (list.classList.contains('open_todos_container')) return 'open'
  if (list.classList.contains('progress_todos_container')) return 'in_progress'
  if (list.classList.contains('blocked_todos_container')) return 'blocked'
  return 'done'
}

// todoItemElement events
function bindTodoItemsEvents(): void {
  const todoItemElements = document.querySelectorAll<HTMLElement>('.todo-item')

  todoItemElements.forEach((todoItem) => {
    todoItem.addEventListener('dragstart', (e: DragEvent) => {
      console.log('ROM TODO ITEM', e.currentTarget)
    })
  })
}
