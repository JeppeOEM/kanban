import { ref, type Ref } from 'vue';
import { type Card } from '@/types/CardTypes';
import type { KanbanGroup } from './types/KanbanGroupTypes';
import useKanbanGroups from './composeables/useKanbanGroups';
import useCards from './composeables/useCards';








export const kanbanData = ref<KanbanGroup[]>([])

export const loadKanbanGroups = async () => {
  const { getKanbanGroups } = useKanbanGroups()
  const { getCardsById } = useCards()
  const data = await getKanbanGroups()

  for (const obj of data) {
    obj.cards = await getCardsById(obj.id)
  }

  kanbanData.value = data
}



