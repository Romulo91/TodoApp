import { renderTodoItem } from './component/TodoItem/todoItem.ts'
import { TodoService } from './services/TodoService.ts'
import type { BoardTypes } from './types/todoTypes.ts'

const form = document.getElementById('todo-submit-form') as HTMLFormElement
const currentTodo = document.getElementById('todo-input') as HTMLInputElement

// Boards
const openList = document.querySelector('.open_todos_container') as HTMLUListElement
const progressList = document.querySelector('.progress_todos_container') as HTMLUListElement
const blockedList = document.querySelector('.blocked_todos_container') as HTMLUListElement
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

export function renderAllBoards(): void {
  renderBoard(openList, 'open')
  renderBoard(progressList, 'in_progress')
  renderBoard(blockedList, 'blocked')
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
      draggedElement = e.currentTarget as HTMLElement | null

      // make it half transparent
      ;(e.target as HTMLInputElement).classList.add('dragging')
    })

    todoItem.addEventListener('dragend', (e: DragEvent): void => {
      // reset the transparency
      ;(e.target as HTMLElement).classList.remove('dragging')
      draggedElement = null
    })
  })

  // event Binding BoardList
  boardList.forEach((list) => {
    list.addEventListener('dragover', (e: Event): void => {
      // Prevent default to allow drop
      e.preventDefault()
    })
    list.addEventListener('drop', (e) => {
      // prevent default action (open as link for some elements)
      e.preventDefault()

      if (!draggedElement) return
      let targetBoard = getBoardFromList(list as Element)
      service.moveTodo(targetBoard, draggedElement)

      // render all boards if dragged
      renderAllBoards()
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
