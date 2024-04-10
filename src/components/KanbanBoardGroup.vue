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
const currentTitleId = ref<number | undefined>(undefined)

function closestChild(element, selector) {
  var children = element.childNodes
  for (var i = 0; i < children.length; i++) {
    var child = children[i]
    if (child.nodeType === 1 && child.matches(selector)) {
      return child
    }
  }
  return null
}

const startEditing = async (event: Event) => {
  if (currentTitleId.value !== null) {
    cancelEdit()
    isEditing.value = false
  }
  isEditing.value = true
  currentTitleId.value = props.id
  const target = event.target

  let h3 = await target?.closest('h3')
  let input = h3.querySelector('input')
  console.log(h3)
  console.log(input)
  //submits old selection on blur
  input.focus()
}

const submitEdit = async () => {
  if (editedTitle.value !== undefined && props.id !== undefined) {
    try {
      let group = { id: props.id, title: editedTitle.value }
      await updateKanbanGroup(group)
      emit('update-title', group)
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
  // editedTitle.value = props.title
}

const onDelete = async () => {
  try {
    await deleteKanbanGroup(props.id)
    emit('delete-group', props.id)
  } catch (error) {
    console.error('Error adding new group:', error)
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
      <input
        v-model="editedTitle"
        v-else
        @keyup.enter="submitEdit()"
        @blur="submitEdit()"
        autofocus
      />
      <span v-if="showEditIcon && !isEditing">&#9998;</span>
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
