export interface User {
  id: string
  name: string
  email: string
}

export interface TodoItem {
  id: string
  text: string
  board: BoardTypes
  // assignedUser?: User | null
}

export type BoardTypes = 'open' | 'in_progress' | 'blocked' | 'done'
