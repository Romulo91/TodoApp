export interface User {
  id: string
  name: string
  email: string
}

export interface TodoItem {
  id: string
  text: string
  status: TodoStatus
  assignedUser?: User | null
  completed: boolean
}

export type TodoStatus = 'open' | 'in_progress' | 'blocked' | 'done'
