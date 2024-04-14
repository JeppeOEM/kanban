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
  console.log(data, "UPDATED")
  kanbanData.value = data
}





// export const cardGroups = ref<Record<number, Ref<Card[]>>>({});

// export async function addGlobalGroup(groupId: number, cardsRef: Ref<Card[]>) {

//   cardGroups.value[groupId] = cardsRef;

// }

// export async function getCardGroupRef(groupId: number): Promise<Ref<Card[]> | undefined> {
//     console.log("accesing group")
// //this prints out empty object

//     //this prints out the objet with refs why?

//     return cardGroups.value[groupId];
// }
// export async function deleteCardRef(groupId: number, cardId: number): Promise<void> {
//   try {
//     if (cardGroups[groupId]) {
//       // Find the index of the card with the specified cardId
//       const index = cardGroups[groupId].findIndex(card => card.id === cardId);
//       if (index !== -1) {
//         // Remove the card from the group's array of cards
//         cardGroups[groupId].splice(index, 1);
//         console.log(`Card with ID ${cardId} deleted from group ${groupId}`);
//       } else {
//         console.error(`No card found with ID ${cardId} in group ${groupId}`);
//       }
//     } else {
//       console.error(`No cardGroup found for groupId ${groupId}`);
//     }
//   } catch (error) {
//     console.error('Error deleting card:', error);
//   }
// }

// export async function updateGroupsRef(groupIdFrom: number, groupIdTo: number, cardId: number): Promise<void> {

//     console.log(groupIdFrom, groupIdTo)
//     if (cardGroups[groupIdFrom] && cardGroups[groupIdTo]) {
//         const groupFrom = cardGroups[groupIdFrom];
//         const groupTo = cardGroups[groupIdTo];
//         // Find the index of the card in groupFrom
//         const idx = groupFrom.findIndex(obj => obj.id === cardId);

//         // If the card is found in groupFrom
//         if (idx !== -1) {
//             // Remove the card from groupFrom
//             const removedCard = groupFrom.splice(idx, 1)[0];

//             // Add the removed card to groupTo
//             groupTo.push(removedCard);

//             console.log("Card moved successfully:", removedCard);
//         } else {
//             console.log("Card not found in group:", cardId);
//         }
//     } else {
//         console.log("Invalid group IDs provided.");
//     }
// }
