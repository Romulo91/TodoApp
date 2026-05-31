export interface User {
  id: string
  name: string
  email: string
}

export interface TodoItem {
  id: string
  text: string
  title?: string
  description?: string
  tags?: string[]
  board: BoardTypes
  doneAt?: number
  // assignedUser?: User | null
}

export type BoardTypes = 'open' | 'in_progress' | 'blocked' | 'done'
