import { ref, type Ref } from 'vue';
import { type Card } from '@/types/CardTypes';

export const cardGroups = ref<Record<number, Ref<Card[]>>>({});

export async function addGlobalGroup(groupId: number, cardsRef: Ref<Card[]>) {
      console.log('Adding global group:', groupId, cardsRef);
  cardGroups.value[groupId] = cardsRef;
  console.log(cardGroups)
}

export async function getCardGroupRef(groupId: number): Promise<Ref<Card[]> | undefined> {
    console.log("accesing group")
//this prints out empty object
    console.log(cardGroups.value[groupId])
    //this prints out the objet with refs why?
    console.log(cardGroups)
    return cardGroups.value[groupId];
}