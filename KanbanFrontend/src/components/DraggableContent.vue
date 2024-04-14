<script setup lang="ts">

import useCards from '@/composeables/useCards'
import { onMounted } from 'vue';
import { loadKanbanGroups} from '@/globalState'


const props = defineProps<{
  id: number,
  groupId: number,
  title: string,
  description: string,
  cardGroup: any
}>()

onMounted(() => console.log(props.cardGroup,"reactive cards"))


const { updateCard, deleteCard} = useCards()

const deleteUpdate = async () => {
  await deleteCard(props.id)
 await loadKanbanGroups()
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
  draggedCard.groupId = id;
  await updateCard(draggedCard.id, draggedCard)
  loadKanbanGroups()

};
</script>

<template>

  <div  @drop="onDrop($event, props.groupId)" @dragenter.prevent @dragover.prevent class="drop-zone">
    <div class="cursor-pointer" draggable="true"  @dragstart="onDragStart" :id="String(props.id)" :groupId="props.groupId">
      <button @click="deleteUpdate()" class="delete-btn">&#10006;</button>
      <slot></slot>
    </div>
  </div>
</template>
