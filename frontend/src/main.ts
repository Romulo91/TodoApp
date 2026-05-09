import type { TodoItem } from './types/todo.ts'
import { v4 as uuidv4 } from 'uuid'

const form = document.getElementById('todo-submit-form') as HTMLFormElement
const currentTodo = document.getElementById('todo-input') as HTMLInputElement

// constante
const taskList: TodoItem[] = []

// submit new TodoItem
form?.addEventListener('submit', (e) => {
  e.preventDefault()

  // return if currentValue is empty
  if (currentTodo.value === '' || currentTodo.value === null) return

  createTodoItem(currentTodo.value)
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
}
