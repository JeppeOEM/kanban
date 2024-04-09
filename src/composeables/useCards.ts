import { CardGroup, type Card } from '@/types/CardTypes'
import { computed, reactive } from 'vue'

interface CardStore {
  [CardGroup.Resources]: Card[]
  [CardGroup.ToDo]: Card[]
  [CardGroup.Doing]: Card[]
  [CardGroup.Done]: Card[]
  [CardGroup.Questions]: Card[]
}

const defaultValue = {
  [CardGroup.Resources]: [],
  [CardGroup.ToDo]: [
    {
      id: 1,
      title: 'string',
      description: 'string',
      group: CardGroup.ToDo
    }
  ],
  [CardGroup.Doing]: [],
  [CardGroup.Done]: [],
  [CardGroup.Questions]: []
}

const cardStore = reactive<CardStore>(defaultValue)

export default () => {
  const getCardsByGroup = (cardGroup: CardGroup) => {
    return computed(() => cardStore[cardGroup])
  }

  const addNewCard = (card: Card) => {
    cardStore[card.group].push(card)
  }

  const deleteCard = (cardToDelete: Card) => {
    cardStore[cardToDelete.group] = cardStore[cardToDelete.group].filter(
      (card) => card.id !== cardToDelete.id
    )
  }

  return { getCardsByGroup, addNewCard, deleteCard }
}
