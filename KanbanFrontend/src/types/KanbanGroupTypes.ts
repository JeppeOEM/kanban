import type { Card } from "./CardTypes"

export interface KanbanGroup {
  id?: number
  title: string
  cards?: Card[] | undefined
}

export interface KanbanGroupDto {
  id?: number
  title: string
  cards?: Card[] | undefined

}
