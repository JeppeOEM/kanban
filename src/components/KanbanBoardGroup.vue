<script setup lang="ts">
import { ref, defineProps, defineEmits, computed } from 'vue'
import useCards from '@/composeables/useCards'
import useKanbanGroups from '@/composeables/useKanbanGroups'
import CreateCard from './CreateCard.vue'
import DraggableContent from './DraggableContent.vue'

const props = defineProps({
  id: Number,
  title: String
})

const { getCardsByGroupId } = useCards()
const { deleteKanbanGroup, updateKanbanGroup } = useKanbanGroups()
const emit = defineEmits(['delete-group', 'update-title'])

const cardGroup = getCardsByGroupId(props.id)
const editedTitle = ref(props.title)
const showEditIcon = ref(false)
const isEditing = ref(false)
const currentTitleId = ref<number | null>(null)

const startEditing = (id: number) => {
  if (currentTitleId.value !== null) {
    cancelEdit()
  }

  currentTitleId.value = id
  isEditing.value = true
}

const submitEdit = async () => {
  if (editedTitle.value !== undefined && props.id !== undefined) {
    try {
      await updateKanbanGroup({ id: props.id, title: editedTitle.value })
      isEditing.value = false
    } catch (error) {
      console.error('Error updating title:', error)
    }
  } else {
    console.error('Cannot update title: title or id is undefined')
  }
}

const cancelEdit = () => {
  isEditing.value = false
  editedTitle.value = props.title
}

const onDelete = async () => {
  try {
    await deleteKanbanGroup(props.id)
    emit('delete-group', props.id)
  } catch (error) {
    console.error('Error adding new group:', error)
  }
}

const computedTitle = computed(() => (isEditing.value ? editedTitle.value : props.title))
</script>

<template>
  <section class="flex-1 list-none drop-zone">
    <h3
      class="cursor-pointer"
      @click="startEditing"
      @mouseover="showEditIcon = true"
      @mouseleave="showEditIcon = false"
    >
      <span v-if="!isEditing">{{ editedTitle }}</span>
      <input
        v-model="editedTitle"
        v-else
        @keyup.enter="submitEdit()"
        @blur="submitEdit()"
        autofocus
      />
      <span v-if="showEditIcon && !isEditing" @click="startEditing">&#9998;</span>
    </h3>
    <button class="view-button" @click="onDelete()">
      <span class="icon">&#10006;</span>
      <!-- Red X icon -->
    </button>
    <DraggableContent v-for="card in cardGroup" :key="card.id" :data="card">
      {{ card.title }} {{ card.description }} {{ card.id }}
    </DraggableContent>
    <CreateCard></CreateCard>
  </section>
</template>
