<script setup lang="ts">
import { ref, defineProps, defineEmits, computed } from 'vue'
import useCards from '@/composeables/useCards'
import useKanbanGroups from '@/composeables/useKanbanGroups'
import CreateCard from './CreateCard.vue'
import DraggableContent from './DraggableContent.vue'
import type { Card } from '@/types/CardTypes'


const props = defineProps({
  id: Number,
  title: String
})

const { getCardsById } = useCards()
const { deleteKanbanGroup, updateKanbanGroup } = useKanbanGroups()
const emit = defineEmits(['delete-group'])
const editedTitle = ref(props.title)
const showEditIcon = ref(false)
const isEditing = ref(false)
const currentTitleId = ref<number | undefined>(undefined)

const cardGroup = ref<Card[]>([])
console.log(cardGroup)
const updateCardGroup = async () => {
  try {
    const cards = await getCardsById(props.id)
    cardGroup.value = cards
  } catch (error) {
    console.error('Error fetching cards:', error)
  }
}

updateCardGroup()
const startEditing = async (event: Event) => {
  if (currentTitleId.value !== null) {
    isEditing.value = false
  }
  isEditing.value = true
  currentTitleId.value = props.id
  const target = event.target

  if (target !== null) {
    let h3 = await target.closest('h3')
    let input = h3.querySelector('input')
    input.focus()
  }
}

const submitEdit = async () => {
  if (editedTitle.value !== undefined && props.id !== undefined) {
    try {
      let group = { id: props.id, title: editedTitle.value }
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
  if (props.id !== undefined) {
    try {
      await deleteKanbanGroup(props.id)
      emit('delete-group', props.id)
    } catch (error) {
      console.error('Error deleting group:', error)
    }
  } else {
    console.error('props.id is undefined')
  }
}
</script>
<template>
  <section class="flex-1 list-none drop-zone">
    <h3
      class="cursor-pointer"
      @click="startEditing($event)"
      @mouseover="showEditIcon = true"
      @mouseleave="showEditIcon = false"
    >
      <span v-if="!isEditing">{{ editedTitle }}</span>
      <input v-model="editedTitle" v-else @keyup.enter="submitEdit()" @blur="submitEdit()" />
      <span v-if="showEditIcon && !isEditing">&#9998;</span>
    </h3>
    <button class="view-button" @click="onDelete()">
      <span class="icon">&#10006;</span>
    </button>
    <div v-if="cardGroup">
      <DraggableContent v-for="card in cardGroup" :key="card.id" :data="card">
        {{ card }}
      </DraggableContent>
      <p>lol</p>
      <CreateCard :groupId="props.id"></CreateCard>
    </div>
    <div v-else>Loading cards...</div>
  </section>
</template>
