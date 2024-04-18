import { get, post, del, put } from '@/axios/axiosFetch'
import type { KanbanGroupDto } from '@/types/KanbanGroupTypes'

  const getKanbanGroups = async (): Promise<KanbanGroupDto[]> => {
      const data = await get<KanbanGroupDto[]>('/groups')
      return data.map((item) => ({ id: item.id, title: item.title }))
  }

  const addKanbanGroup = async (title: string): Promise<KanbanGroupDto> => {
      const newGroupData = await post<KanbanGroupDto>('/groups', { title })
      return { id: newGroupData.id, title: newGroupData.title }
  }

  const deleteKanbanGroup = async (id: Number): Promise<void> => {
      await del(`/groups/${id}`)
  }

  const updateKanbanGroup = async (group: KanbanGroupDto): Promise<KanbanGroupDto> => {
      const updatedGroup = await put<KanbanGroupDto>(`/groups/${group.id}`, { title: group.title })
      return { id: updatedGroup.id, title: updatedGroup.title }
  }

  export { getKanbanGroups, addKanbanGroup, deleteKanbanGroup, updateKanbanGroup }


