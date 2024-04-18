import type { CardDto, Card } from '@/types/CardTypes';
import { get, post, del, put } from '@/axiosFetch';

const getCardsById = async (groupId: any): Promise<Card[]> => {
  try {
    const data = await get<Card[]>(`cards/${groupId}`);
    return data.map((card) => ({
      id: card.id,
      title: card.title,
      description: card.description,
      groupId: card.groupId,
    }));
  } catch (err: any) {
    throw new Error(err.message);
  }
};

const addCard = async (card: CardDto): Promise<Card> => {
  console.log(card);
  try {
    const newCard = await post<Card>('/cards', card);
    return {
      id: newCard.id,
      title: newCard.title,
      description: newCard.description,
      groupId: newCard.groupId,
    };
  } catch (err: any) {
    throw new Error(err.message);
  }
};

const updateCard = async (id: number, updatedCardData: Card): Promise<Card> => {
  try {
    const updatedCard = await put<Card>(`/cards/${id}`, updatedCardData);
    return {
      id: updatedCard.id,
      title: updatedCard.title,
      description: updatedCard.description,
      groupId: updatedCard.groupId,
    };
  } catch (err: any) {
    throw new Error(err.message);
  }
};

const deleteCard = async (id: number): Promise<number> => {
  try {
    await del(`/cards/${id}`);
    return id;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

export { getCardsById, addCard, updateCard, deleteCard };
