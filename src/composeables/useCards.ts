import { computed, reactive } from 'vue'
import type { Card } from '@/types/CardTypes'

interface CardStore {
  [groupId: number]: Card[]
}

const cardStore: CardStore = reactive({})

export default () => {
  const getCardsByGroupId = (groupId: number) => {
    return computed(() => cardStore[groupId] || [])
  }

  const addCard = (card: Card) => {
    if (!cardStore[card.groupId]) {
      cardStore[card.groupId] = []
    }
    cardStore[card.groupId].push(card)
  }

  const deleteCard = (cardToDelete: Card) => {
    if (cardStore[cardToDelete.groupId]) {
      cardStore[cardToDelete.groupId] = cardStore[cardToDelete.groupId].filter(
        (card) => card.id !== cardToDelete.id
      )
    }
  }

  return { getCardsByGroupId, addCard, deleteCard }
}
