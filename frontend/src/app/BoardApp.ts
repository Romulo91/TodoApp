import { TodoService } from '../services/TodoService.ts'
import type { BoardTypes } from '../types/todoTypes.ts'
import { renderTodoItem } from '../component/TodoItem/todoItem.ts'
import { getDragAfterElement } from '../ui/dragDrop.ts'

export class BoardApp {
  private service = new TodoService()
  private form = document.getElementById('todo-submit-form') as HTMLFormElement
  private input = document.getElementById('todo-input') as HTMLInputElement

  private lists = {
    open: document.querySelector('.open_todos_container') as HTMLUListElement,
    in_progress: document.querySelector('.progress_todos_container') as HTMLUListElement,
    blocked: document.querySelector('.blocked_todos_container') as HTMLUListElement,
    done: document.querySelector('.done_todos_container') as HTMLUListElement,
  }

  private boards = document.querySelectorAll<HTMLUListElement>(
    '.open_todos_container, .progress_todos_container, .blocked_todos_container, .done_todos_container',
  )

  private draggedElement: HTMLElement | null = null
  private boardEventsBound = false

  init() {
    this.form.addEventListener('submit', (e) => this.handleSubmit(e))
    this.bindBoardEvents()
    this.renderAllBoards()
  }

  private handleSubmit(e: Event) {
    e.preventDefault()
    const value = this.input.value.trim()
    if (!value) return
    this.service.addTodo(value, 'open')
    this.renderAllBoards()
    this.input.value = ''
    this.input.focus()
  }

  private renderAllBoards() {
    for (const [board, list] of Object.entries(this.lists)) {
      list.innerHTML = this.service
        .getTodos(board as BoardTypes)
        .map(renderTodoItem)
        .join('')
    }
    this.bindEvents()
  }

  private bindEvents() {
    document.querySelectorAll<HTMLElement>('.todo-item').forEach((item) => {
      item.addEventListener('dragstart', (e) => {
        this.draggedElement = e.currentTarget as HTMLElement
        ;(e.target as HTMLElement).classList.add('dragging')
      })
      item.addEventListener('dragend', (e) => {
        ;(e.target as HTMLElement).classList.remove('dragging')
        this.draggedElement = null
      })

      item.querySelector('.close-button')?.addEventListener('click', (e) => {
        const id = (e.currentTarget as HTMLElement).dataset['id']
        if (id) {
          this.service.removeTodo(id)
          this.renderAllBoards()
        }
      })
    })

  }

  private bindBoardEvents() {
    if (this.boardEventsBound) return

    this.boards.forEach((list) => {
      list.addEventListener('dragover', (e: DragEvent) => {
        e.preventDefault()
        if (!this.draggedElement) return

        const afterElement = getDragAfterElement(list, e.clientY)

        if (!afterElement) {
          list.appendChild(this.draggedElement)
          return
        }

        list.insertBefore(this.draggedElement, afterElement)
      })
      list.addEventListener('drop', (e: DragEvent) => {
        e.preventDefault()
        if (!this.draggedElement) return

        const targetBoard = this.getBoardFromList(list)
        this.service.moveTodo(targetBoard, this.draggedElement)

        const orderedIds = [...list.querySelectorAll<HTMLElement>('.todo-item')]
          .map((item) => item.dataset['id'])
          .filter((id): id is string => Boolean(id))

        this.service.reorderTodos(targetBoard, orderedIds)
        this.renderAllBoards()
      })
    })

    this.boardEventsBound = true
  }

  private getBoardFromList(list: Element): BoardTypes {
    if (list.classList.contains('open_todos_container')) return 'open'
    if (list.classList.contains('progress_todos_container')) return 'in_progress'
    if (list.classList.contains('blocked_todos_container')) return 'blocked'
    return 'done'
  }
}

new BoardApp().init()
