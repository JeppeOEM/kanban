import type { Card } from "./CardTypes"

export interface KanbanGroup {
  id: Number
  title: string
  cards: Array<Card>
}

export interface KanbanGroupDto {
  id: Number
  title: string

}
