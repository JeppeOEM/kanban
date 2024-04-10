import { get } from '@/axiosFeth'

interface KanbanBoard {
  id: number
  name: string
}

export default () => {
  const fetchKanbanData = async (): Promise<KanbanBoard[]> => {
    try {
      const data = await get<KanbanBoard[]>('/lists')
      return data.map((item) => ({ id: item.id, name: item.name }))
    } catch (err: any) {
      throw new Error(err.message)
    }
  }

  return { fetchKanbanData }
}
