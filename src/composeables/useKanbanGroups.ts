import { get, post, del, put } from '@/axiosFetch'
import type { KanbanGroup } from '@/types/KanbanGroupTypes'

export default () => {
  const getKanbanGroups = async (): Promise<KanbanGroup[]> => {
    try {
      const data = await get<KanbanGroup[]>('/groups')
      return data.map((item) => ({ id: item.id, title: item.title }))
    } catch (err: any) {
      throw new Error(err.message)
    }
  }

  const addKanbanGroup = async (title: string): Promise<KanbanGroup> => {
    try {
      const newGroupData = await post<KanbanGroup>('/groups', { title })
      return { id: newGroupData.id, title: newGroupData.title }
    } catch (err: any) {
      throw new Error(err.message)
    }
  }

  const deleteKanbanGroup = async (id: number): Promise<void> => {
    try {
      await del(`/groups/${id}`)
    } catch (err: any) {
      throw new Error(err.message)
    }
  }

  const updateKanbanGroup = async (group: KanbanGroup): Promise<KanbanGroup> => {
    try {
      const updatedGroup = await put<KanbanGroup>(`/groups/${group.id}`, { title: group.title })
      return { id: updatedGroup.id, title: updatedGroup.title }
    } catch (err: any) {
      throw new Error(err.message)
    }
  }

  return { getKanbanGroups, addKanbanGroup, deleteKanbanGroup, updateKanbanGroup }
}
