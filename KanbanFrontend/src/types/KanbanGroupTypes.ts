import type { Card } from "./CardTypes"

export interface KanbanGroup {
  id?: Number
  title: String
  cards?: Card[]
}

export interface KanbanGroupDto {
  id?: Number
  title: String
  cards?: Card[]

}
