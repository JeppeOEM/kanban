import { get, post, del, put } from '@/axiosFetch'
import type { KanbanGroup, KanbanGroupDto } from '@/types/KanbanGroupTypes'

  const getKanbanGroups = async (): Promise<KanbanGroupDto[]> => {
    try {
      const data = await get<KanbanGroupDto[]>('/groups')
      return data.map((item) => ({ id: item.id, title: item.title }))
    } catch (err: any) {
      throw new Error(err.message)
    }
  }

  const addKanbanGroup = async (title: string): Promise<KanbanGroupDto> => {
    try {
      const newGroupData = await post<KanbanGroupDto>('/groups', { title })
      return { id: newGroupData.id, title: newGroupData.title }
    } catch (err: any) {
      throw new Error(err.message)
    }
  }

  const deleteKanbanGroup = async (id: Number): Promise<void> => {
    try {
      await del(`/groups/${id}`)
    } catch (err: any) {
      throw new Error(err.message)
    }
  }

  const updateKanbanGroup = async (group: KanbanGroupDto): Promise<KanbanGroupDto> => {
    try {
      const updatedGroup = await put<KanbanGroupDto>(`/groups/${group.id}`, { title: group.title })
      return { id: updatedGroup.id, title: updatedGroup.title }
    } catch (err: any) {
      throw new Error(err.message)
    }
  }

  export { getKanbanGroups, addKanbanGroup, deleteKanbanGroup, updateKanbanGroup }


