<script setup lang="ts">
import { ref, watch } from 'vue'
import useKanbanGroups from '@/composeables/useKanbanGroups'
import CreateCard from './CreateCard.vue'
import DraggableContent from './DraggableContent.vue'
import type { Card } from '@/types/CardTypes'
import { loadKanbanGroups } from '@/globalState'
import useCards from '@/composeables/useCards'

const props = defineProps<{
  groupId: number | undefined,
  title: string,
  cards: Array<Card>
}>()

const { updateCard } = useCards()
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

const onDrop = async (event: DragEvent, id: number | undefined) => {
  event.preventDefault();
  if (id === undefined) {
    console.error('groupId is undefined');
    return;
  }
  const data = event.dataTransfer?.getData('data');
  if (!data) return;
  const draggedCard = JSON.parse(data);
  draggedCard.groupId = id;
  await updateCard(draggedCard.id, draggedCard)
  loadKanbanGroups()

};


watch(() => props.cards, (newValue, oldValue) => {
  cardGroup.value = newValue
})


</script>
<template>
  <div class="p-2 min-h-full" @drop="onDrop($event, props.groupId)" @dragenter.prevent @dragover.prevent>
    <section class="p-4 rounded pink-bg align-top list-none drop-zone h-auto min-w-[250px]">
      <div class="w-full flex flex-row justify-between">
        <article class="cursor-pointer flex-grow" @click="startEditing($event)" @mouseover="showEditIcon = true"
          @mouseleave="showEditIcon = false">
          <h2 class="font-bold text-xl pb-2 w-full" v-if="!isEditing">
            {{ editedTitle }}
            <span v-if="showEditIcon">&#9998;</span>
          </h2>
          <input
            class="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 mb-2"
            v-model="editedTitle" v-else @keyup.enter="submitEdit()" @blur="submitEdit()" />
        </article>
        <button class="pl-4" @click="onDelete()">
          <span class="icon">&#10006;</span>
        </button>
      </div>

      <div v-if="cardGroup">
        <DraggableContent v-for="card in cardGroup" :cardGroup="cardGroup" :key="String(card.id)" :id="card.id"
          :groupId="card.groupId" :title="card.title" :description="card.description" :onDrop="onDrop">
          <h3 class="font-bold">{{ card.title }}</h3>
          <p>{{ card.description }}</p>
        </DraggableContent>
        <CreateCard :groupId="props.groupId"></CreateCard>
      </div>
      <div v-else>Loading cards...</div>
    </section>
  </div>
</template>

<style scoped>
.pink-bg {

  background-color: #F2B8B4
}
</style>