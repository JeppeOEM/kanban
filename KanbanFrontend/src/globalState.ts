import { ref, type Ref } from 'vue';
import { type Card } from '@/types/CardTypes';

export const cardGroups = ref<Record<number, Ref<Card[]>>>({});

export async function addGlobalGroup(groupId: number, cardsRef: Ref<Card[]>) {

  cardGroups.value[groupId] = cardsRef;

}

export async function getCardGroupRef(groupId: number): Promise<Ref<Card[]> | undefined> {
    console.log("accesing group")
//this prints out empty object

    //this prints out the objet with refs why?

    return cardGroups.value[groupId];
}


export async function updateGroupsRef(groupIdFrom: number, groupIdTo: number, cardId: number): Promise<void> {

    if (cardGroups.value[groupIdFrom] && cardGroups.value[groupIdTo]) {
        const groupFrom = cardGroups.value[groupIdFrom];
        const groupTo = cardGroups.value[groupIdTo];

        // Find the index of the card in groupFrom
        const idx = groupFrom.findIndex(obj => obj.id === cardId);

        // If the card is found in groupFrom
        if (idx !== -1) {
            // Remove the card from groupFrom
            const removedCard = groupFrom.splice(idx, 1)[0];

            // Add the removed card to groupTo
            groupTo.push(removedCard);

            console.log("Card moved successfully:", removedCard);
        } else {
            console.log("Card not found in group:", cardId);
        }
    } else {
        console.log("Invalid group IDs provided.");
    }
}
