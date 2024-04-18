import type { CardDto, Card } from '@/types/CardTypes';
import { get, post, del, put } from '@/axios/axiosFetch';

const getCardsById = async (groupId: any): Promise<Card[]> => {
    const data = await get<Card[]>(`cards/${groupId}`);
    return data.map((card) => ({
      id: card.id,
      title: card.title,
      description: card.description,
      groupId: card.groupId,
    })); 
};

const addCard = async (card: CardDto): Promise<Card> => {
    const newCard = await post<Card>('/cards', card);
    return {
      id: newCard.id,
      title: newCard.title,
      description: newCard.description,
      groupId: newCard.groupId,
    };
};

const updateCard = async (id: number, updatedCardData: Card): Promise<Card> => {
    const updatedCard = await put<Card>(`/cards/${id}`, updatedCardData);
    return {
      id: updatedCard.id,
      title: updatedCard.title,
      description: updatedCard.description,
      groupId: updatedCard.groupId,
    };
  }

const deleteCard = async (id: number): Promise<number> => {
    await del(`/cards/${id}`);
    return id;
};

export { getCardsById, addCard, updateCard, deleteCard };
