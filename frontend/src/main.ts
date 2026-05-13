import type { TodoItem } from './types/todo.ts'
import { renderTodoItem } from './component/todoItem.ts'
import { v4 as uuidv4 } from 'uuid'

const form = document.getElementById('todo-submit-form') as HTMLFormElement
const currentTodo = document.getElementById('todo-input') as HTMLInputElement
const todoListElement = document.querySelector('.open_todos') as HTMLUListElement | null

// constante
const taskList: TodoItem[] = []

// submit new TodoItem
form?.addEventListener('submit', (e) => {
  e.preventDefault()

  const todoValue = currentTodo.value.trim()

  // return if currentValue is empty
  if (todoValue === '') return

  createTodoItem(todoValue)
  currentTodo.value = ''
  currentTodo.focus()
})

// function to create new TodoItem
function createTodoItem(value: string): void {
  const newTask: TodoItem = {
    id: uuidv4(),
    text: value,
    status: 'open',
    completed: false,
  }

  taskList.push(newTask)
  toggleTodoItemView()
}

function toggleTodoItemView(): void {
  if (!todoListElement) return

  todoListElement.innerHTML = taskList.map((todo) => renderTodoItem(todo)).join('')
}
