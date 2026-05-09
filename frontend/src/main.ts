const form = document.getElementById('todo-form') as HTMLFormElement
const currentTodo = document.getElementById('todo-input') as HTMLInputElement

form?.addEventListener('submit', (e) => {
  e.preventDefault()

  console.log('List', currentTodo.value)
  console.log('event', e)
})
