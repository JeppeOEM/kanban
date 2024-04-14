<script setup lang="ts">

import useCards from '@/composeables/useCards'
import { CardGroup } from '@/types/CardTypes';
import { onMounted, defineEmits } from 'vue';

const props = defineProps<{
  id: Number,
  groupId: Number,
  title: string,
  description: string,
  updateCardGroup: Function,
  addToCardGroup: Function,
  cardGroup: any
}>()

onMounted(() => console.log(props.cardGroup,"reactive cards"))
const emit = defineEmits(['update-groups']);


const { updateCard, deleteCard, addCard } = useCards()

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


const onDrop = async (event: DragEvent, id: Number) => {
  event.preventDefault();
  const data = event.dataTransfer?.getData('data');
  if (!data) return;
  const draggedCard = JSON.parse(data);
  let originalGroupId = draggedCard.groupId;
  draggedCard.groupId = id;
  await updateCard(draggedCard.id, draggedCard)

  console.log(id, originalGroupId)


  emit('update-groups', { from: originalGroupId, to: draggedCard.groupId, cardId: draggedCard.id });
};
</script>

<template>

  <div  @drop="onDrop($event, props.groupId)" @dragenter.prevent @dragover.prevent class="drop-zone">
    <div class="cursor-pointer" draggable="true"  @dragstart="onDragStart" :id="props.id" :groupId="props.groupId">
      <h2>lollllllllllllllllllllll</h2>
      <button @click="deleteUpdate()" class="delete-btn">&#10006;</button>
      <slot></slot>
    </div>
  </div>
</template>
