import './style.css'
// import { setupCounter } from './counter.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<section id="todo-container">
    <div>
        TODO lets Beginn here
    </div>
    
    <h3>Create your first todo Application</h3>
    <input type="text" value="Test">
</section>
`

// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
