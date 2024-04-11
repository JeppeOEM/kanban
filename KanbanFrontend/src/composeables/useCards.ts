import type { CardDto, Card } from '@/types/CardTypes'
import { get, post, del, put } from '@/axiosFetch'

export default () => {
  const getCardsById = async (groupId: any): Promise<Card[]> => {
    try {
      const data = await get<Card[]>(`cards/${groupId}`)
      return data.map((card) => ({
        id: card.id,
        title: card.title,
        description: card.description,
        groupId: card.groupId
      }))
    } catch (err: any) {
      throw new Error(err.message)
    }
  }

  const addCard = async (card: CardDto): Promise<Card> => {
    console.log(card)
    try {
      const newCard = await post<Card>('/cards', card)
      return {
        id: newCard.id,
        title: newCard.title,
        description: newCard.description,
        groupId: newCard.groupId
      }
    } catch (err: any) {
      throw new Error(err.message)
    }
  }

  // const addCard = (card: CardDto) => {
  //   if (!cardStore[card.groupId]) {
  //     cardStore[card.groupId] = []
  //   }
  //   cardStore[card.groupId].push(card)
  // }
  const deleteCard = async (id: number): Promise<number> => {
    try {
      await del(`/cards/${id}`)
      return id; // Return the ID of the deleted card
    } catch (err: any) {
      throw new Error(err.message)
    }
  }
  return { getCardsById, addCard, deleteCard }
}
