<script setup lang="ts">
import { ref, defineProps, defineEmits, computed, onMounted, watch, watchEffect } from 'vue'
import useCards from '@/composeables/useCards'
import useKanbanGroups from '@/composeables/useKanbanGroups'
import CreateCard from './CreateCard.vue'
import DraggableContent from './DraggableContent.vue'
import type { Card } from '@/types/CardTypes'
import { addGlobalGroup, cardGroups, getCardGroupRef, updateGroupsRef } from '@/globalState'

const props = defineProps({
  groupId: Number,
  title: String
})

const { getCardsById } = useCards()
const { deleteKanbanGroup, updateKanbanGroup } = useKanbanGroups()
const emit = defineEmits(['delete-group, update-groups'])
const editedTitle = ref(props.title)
const showEditIcon = ref(false)
const isEditing = ref(false)
const currentTitleId = ref<Number | undefined>(undefined)


const cardGroup = ref<Card[]>([])


const updateCardGroup = async (groupId?: number) => {
  const groupIdToUpdate = groupId !== undefined ? groupId : props.groupId;

  try {
    if (groupIdToUpdate === undefined) {
      console.error("Group ID is undefined");
      return;
    }

    const cards = await getCardsById(groupIdToUpdate);
    cardGroup.value = cards;
  } catch (error) {
    console.error("Error fetching cards:", error);
  }
};

const addToCardGroup = (updatedCardGroup: Card[]) => {
 cardGroup
}

updateCardGroup()

const startEditing = async (event: Event) => {
  if (currentTitleId.value !== null) {
    isEditing.value = false
  }
  isEditing.value = true
  currentTitleId.value = props.groupId
  const target = event.target

  if (target !== null) {
    let h3 = await target.closest('h3')
    let input = h3.querySelector('input')
    input.focus()
  }
}

const submitEdit = async () => {
  if (editedTitle.value !== undefined && props.groupId !== undefined) {
    try {
      let group = { id: props.groupId, title: editedTitle.value }
      await updateKanbanGroup(group)
      isEditing.value = false
    } catch (error) {
      console.error('Error updating title:', error)
    }
  } else {
    console.error('Cannot update title: title or id is undefined')
  }
}

const onDelete = async () => {
  if (props.groupId !== undefined) {
    try {
      await deleteKanbanGroup(props.groupId)
      emit('delete-group', props.groupId)
    } catch (error) {
      console.error('Error deleting group:', error)
    }
  } else {
    console.error('props.groupId is undefined')
  }
}

// watchEffect(async () =>  {
// //excute this when groupRef gets a new value
//   const groupRef = cardGroup.value;

//   if (groupRef && Object.keys(groupRef).length > 0) {
//     if (props.groupId !== undefined ) {
//       await addGlobalGroup(props.groupId, cardGroup)
//       await getCardGroupRef(props.groupId)
//     } else {

//       console.error('props.groupId is not provided')
//     }
//   }
// });

const updateGroups = async (data: any) => {
  console.log(data.from, data.to, data.cardId, "UPDATE GROUPS")
  emit('update-groups', data); // Emit custom event to parent
  //await updateGroupsRef(data.from, data.to, data.cardId);
  // Reload all card groups after updating
  //await reloadAllCardGroups();
}

const reloadAllCardGroups = async () => {
  // Loop through each group and update it
  for (const groupId of Object.keys(cardGroups.value)) {
    await updateCardGroup(Number(groupId));
  }
}


</script>
<template>
  <section :id="props.groupId" class="flex-1 list-none drop-zone min-h-20 min-w-20">

    <article class=" cursor-pointer" @click="startEditing($event)" @mouseover="showEditIcon = true"
      @mouseleave="showEditIcon = false">
      <span v-if="!isEditing">{{ editedTitle }}</span>
      <input v-model="editedTitle" v-else @keyup.enter="submitEdit()" @blur="submitEdit()" />
      <span v-if="showEditIcon && !isEditing">&#9998;</span>
    </article>
    <button class="view-button" @click="onDelete()">
      <span class="icon">&#10006;</span>
    </button>

    <div v-if="cardGroup">
      <DraggableContent v-for="card in cardGroup" :cardGroup="cardGroup" @update-groups="updateGroups"
        :addToCardGroup="addToCardGroup" :key="card.id" :id="card.id" :groupId="card.groupId" :title="card.title"
        :description="card.description">

        <h3>
          {{ card.title }}
        </h3>
        <p>
          {{ card.description }}
        </p>
      </DraggableContent>
      <p>lol</p>

      <CreateCard :groupId="props.groupId" :cardGroup="cardGroup" :updateCardGroup="updateCardGroup"></CreateCard>
    </div>
    <div v-else>Loading cards...</div>

  </section>
</template>
