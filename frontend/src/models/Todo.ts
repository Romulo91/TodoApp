import type { BoardTypes } from '../types/todoTypes.ts'

export class Todo {
  public id: string
  public text: string
  public board: BoardTypes

  constructor(id: string, text: string, board: BoardTypes) {
    this.id = id
    this.text = text
    this.board = board
  }
}
