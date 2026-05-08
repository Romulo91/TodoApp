import './style.css'
// import { setupCounter } from './counter.ts'

document.querySelector<HTMLDivElement>('#input-container')!.innerHTML = `
<section id="container">
    <input id="todo-input" type="text" value="Test">
    <div id="todo-container"></div>
</section>
`

const todoInput = document.querySelector<HTMLInputElement>('#todo-input')

if (todoInput) {
  todoInput.addEventListener('change', addInput)
}

function addInput(event: Event) {
  const input = event.currentTarget as HTMLInputElement | null
  console.log(`test ${input?.value ?? ''}`)
}
