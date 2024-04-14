export enum CardGroup {
  Resources = 'resources',
  ToDo = 'toDo',
  Doing = 'doing',
  Done = 'done',
  Questions = 'questions'
}

export interface Card {
  id: Number
  title: string
  description: string
  groupId: Number
}

export interface CardDto {
  title: string
  description: string
  groupId?: Number
}
