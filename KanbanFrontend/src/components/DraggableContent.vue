<script setup lang="ts">

import useCards from '@/composeables/useCards'

const props = defineProps<{
  id: number,
  groupId: number,
  updateCardGroup: Function
}>()

const { deleteCard } = useCards()

const deleteUpdate = async () => {
  await deleteCard(props.id)
  props.updateCardGroup(props.groupId)
}

const onDragStart = (event: DragEvent) => {
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = 'move'
    event.dataTransfer.effectAllowed = 'move'
    const propsData = JSON.stringify({id: props.id, groupId: props.groupId})
    event.dataTransfer.setData('data', propsData)
  }
}

const onDragOver = (event: DragEvent) => {
  event.preventDefault()
}

const onDrop = (event: DragEvent) => {
  event.preventDefault()
  const data = event.dataTransfer?.getData('data')

  const draggedCard = data ? JSON.parse(data) : null

  console.log(draggedCard.id)
}
</script>

<template>

  <div @drop="onDrop($event)" @dragenter.prevent @dragover.prevent class="drop-zone">
    <div class="cursor-pointer" draggable="true" @dragstart="onDragStart" :id="props.id" :groupId="props.groupId">
      <h2>lollllllllllllllllllllll</h2>
      <button @click="deleteUpdate()" class="delete-btn">&#10006;</button>
      <slot></slot>
    </div>
  </div>
</template>
