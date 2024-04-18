import { ref} from 'vue';
import type { KanbanGroup } from '../types/KanbanGroupTypes';
import { getKanbanGroups } from '../hooks/useKanbanGroups';
import {getCardsById} from '../hooks/useCards';

export const kanbanData = ref<KanbanGroup[]>([])

export const loadKanbanGroups = async () => {

  const data = await getKanbanGroups()

  for (const group of data) {
    group.cards = await getCardsById(group.id)
  }

  kanbanData.value = data
}



