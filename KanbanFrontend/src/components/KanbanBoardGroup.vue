<script setup lang="ts">
import { ref, defineProps, watch } from 'vue'
import useKanbanGroups from '@/composeables/useKanbanGroups'
import CreateCard from './CreateCard.vue'
import DraggableContent from './DraggableContent.vue'
import type { Card } from '@/types/CardTypes'
import { loadKanbanGroups } from '@/globalState'
import useCards from '@/composeables/useCards'

const props = defineProps({
  groupId: Number,
  title: String,
  cards: Array
})

const { updateCard} = useCards()
const { deleteKanbanGroup, updateKanbanGroup } = useKanbanGroups()

const editedTitle = ref(props.title)
const showEditIcon = ref(false)
const isEditing = ref(false)
const currentTitleId = ref<Number | undefined>(undefined)


const cardGroup = ref<Card[]>([])
cardGroup.value = props.cards


const startEditing = async (event: Event) => {
  if (currentTitleId.value !== null) {
    isEditing.value = false
  }
  isEditing.value = true
  currentTitleId.value = props.groupId
  const target = event.target

  if (target !== null) {
    // let h3 = await target.closest('h3')
    // let input = h3.querySelector('input')
    // input.focus()
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
      await loadKanbanGroups()
    } catch (error) {
      console.error('Error deleting group:', error)
    }
  } else {
    console.error('props.groupId is undefined')
  }
}

const onDrop = async (event: DragEvent, id: Number) => {
  event.preventDefault();
  const data = event.dataTransfer?.getData('data');
  if (!data) return;
  const draggedCard = JSON.parse(data);
  draggedCard.groupId = id;
  await updateCard(draggedCard.id, draggedCard)
  loadKanbanGroups()

};


const onDropInParent = (event: DragEvent) => {
  event.preventDefault();
  const data = event.dataTransfer?.getData('data');
  if (!data) return;
  const draggedCard = JSON.parse(data);
  // Handle drop event in the parent component
}

watch(() => props.cards, (newValue, oldValue) => {
  cardGroup.value = newValue
})


</script>
<template>
  <section @drop="onDrop($event, props.groupId)" @dragenter.prevent @dragover.prevent class="flex-1 list-none drop-zone min-h-20 min-w-20">
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
      <DraggableContent  v-for="card in cardGroup" 
        :cardGroup="cardGroup" 
        :key="String(card.id)" 
        :id="card.id" 
        :groupId="card.groupId" 
        :title="card.title"
        :description="card.description"
        :onDrop ="onDrop">
        
        <h3>
          {{ card.title }}
        </h3>
        <p>
          {{ card.description }}
        </p>
      </DraggableContent>
      <CreateCard :groupId="props.groupId"></CreateCard>
    </div>
    <div v-else>Loading cards...</div>

  </section>
</template>
