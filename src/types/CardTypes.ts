export enum CardGroup {
  Resources = 'resources',
  ToDo = 'toDo',
  Doing = 'doing',
  Done = 'done',
  Questions = 'questions'
}

export interface Card {
  id: number
  title: string
  description: string
  group: CardGroup
}
