import { renderTodoItem } from './component/TodoItem/todoItem.ts'
import { TodoService } from './services/TodoService.ts'
import type { BoardTypes } from './types/todoTypes.ts'

const form = document.getElementById('todo-submit-form') as HTMLFormElement
const currentTodo = document.getElementById('todo-input') as HTMLInputElement
const todoListElement = document.querySelector('.open_todos_container') as HTMLUListElement | null

// Boards
const openList = document.querySelector('.open_todos_container') as HTMLUListElement
const progressLit = document.querySelector('.progress_todos_container') as HTMLUListElement
const blockedLust = document.querySelector('.blocked_todos_container') as HTMLUListElement
const doneList = document.querySelector('.done_todos_container') as HTMLUListElement
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

  service.addTodo(todoValue, 'open')

  renderAllBoards()
  // renderTodoList()
  // bindTodoItemsEvents()
  currentTodo.value = ''
  currentTodo.focus()
}

function renderAllBoards(): void {
  renderBoard(openList, 'open')
  renderBoard(progressLit, 'in_progress')
  renderBoard(blockedLust, 'blocked')
  renderBoard(doneList, 'done')

  bindTodoItemsEvents()
}

// render TodoList here
function renderBoard(list: HTMLUListElement, board: BoardTypes): void {
  if (!list) return

  list.innerHTML = service
    .getTodos(board)
    .map((todo) => renderTodoItem(todo))
    .join('')
}

// bind Events for each TodoIte
function bindTodoItemsEvents(): void {
  const todoItemElements = document.querySelectorAll<HTMLElement>('.todo-item')
  let draggedElement: HTMLElement | null = null

  // event Binding TodoItems
  todoItemElements.forEach((todoItem) => {
    todoItem.ondragstart = null
    todoItem.addEventListener('dragstart', (e: DragEvent) => {
      draggedElement = e.currentTarget as HTMLElement
      console.log('ELEMENT%', draggedElement)
    })
  })

  // event Binding BoardList
  boardList.forEach((list) => {
    list.addEventListener('dragover', (e: Event): void => {
      e.preventDefault()
      console.log('TESTT Drag', e.currentTarget)
    })
    list.addEventListener('drop', (e) => {
      e.preventDefault()
      console.log('Drop Event', e.currentTarget)
      let targetBoard = getBoardFromList(list as Element)
      service.moveTodo(targetBoard, draggedElement)
    })
  })

  // change TodoItem in service
}

function getBoardFromList(list: Element): BoardTypes {
  if (list.classList.contains('open_todos_container')) return 'open'
  if (list.classList.contains('progress_todos_container')) return 'in_progress'
  if (list.classList.contains('blocked_todos_container')) return 'blocked'
  return 'done'
}

renderAllBoards()
