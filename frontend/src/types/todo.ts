export interface User {
  id: string
  name: string
  email: string
}

export interface TodoItem {
  id: string
  text: string
  status: string
  assignedUser: User | null
}
