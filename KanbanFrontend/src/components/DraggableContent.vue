<script setup lang="ts">

import useCards from '@/composeables/useCards'
import { CardGroup } from '@/types/CardTypes';
import { onMounted } from 'vue';

const props = defineProps<{
  id: number,
  groupId: number,
  title: string,
  description: string,
  updateCardGroup: Function,
  addToCardGroup: Function,
  cardGroup: any
}>()

onMounted(() => console.log(props.cardGroup,"reactive cards"))

const { getCardsById, deleteCard, addCard } = useCards()

const deleteUpdate = async () => {
  await deleteCard(props.id)
  props.updateCardGroup(props.groupId)
}

const onDragStart = (event: DragEvent) => {
  if (event.dataTransfer) {
    const propsData = JSON.stringify({ id: props.id, title: props.title, description: props.description, groupId: props.groupId})
    console.log(props.groupId,"the starting group id")
    event.dataTransfer.setData('data', propsData)
    console.log("startdata",propsData)
    event.dataTransfer.dropEffect = 'move'
    event.dataTransfer.effectAllowed = 'move'
  }
}

const onDragOver = (event: DragEvent) => {
  event.preventDefault()
}

const onDrop = (event: DragEvent,id: number) => {
  event.preventDefault()
  const data = event.dataTransfer?.getData('data')

  const draggedCard = data ? JSON.parse(data) : null
  console.log("box",id)
  console.log(data)
  console.log(props.cardGroup[0].groupId,"destinatio id")
  deleteCard(draggedCard.id)
  const { cardId, ...cardData } = draggedCard
  cardData.groupId = id
  addCard(draggedCard)

}
</script>

<template>

  <div @drop="onDrop($event, props.groupId)" @dragenter.prevent @dragover.prevent class="drop-zone">
    <div class="cursor-pointer" draggable="true"  @dragstart="onDragStart" :id="props.id" :groupId="props.groupId">
      <h2>lollllllllllllllllllllll</h2>
      <button @click="deleteUpdate()" class="delete-btn">&#10006;</button>
      <slot></slot>
    </div>
  </div>
</template>
