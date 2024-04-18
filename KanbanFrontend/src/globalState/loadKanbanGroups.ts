import { ref, type Ref } from 'vue';
import { type Card } from '@/types/CardTypes';
import type { KanbanGroup } from '../types/KanbanGroupTypes';
import { getKanbanGroups } from '../composeables/useKanbanGroups';
import {getCardsById} from '../composeables/useCards';

export const kanbanData = ref<KanbanGroup[]>([])

export const loadKanbanGroups = async () => {


  const data = await getKanbanGroups()

  for (const group of data) {
    group.cards = await getCardsById(group.id)
  }

  kanbanData.value = data
}



