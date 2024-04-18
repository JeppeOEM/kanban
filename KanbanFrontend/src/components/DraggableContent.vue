<script setup lang="ts">

import { deleteCard } from '@/composeables/useCards'
import { loadKanbanGroups} from '@/globalState'


const props = defineProps<{
  id: number | undefined, 
  groupId: number | undefined,
  title: string,
  description: string,
  cardGroup: any
  onDrop: Function
}>()


const deleteUpdate = async () => {
  if (props.id !== undefined){

    await deleteCard(props.id)
  }
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


</script>

<template>

  <div @drop="props.onDrop($event, props.groupId)" @dragenter.prevent @dragover.prevent
    class="drop-zone mt-4 min-w-[100px] bg-white-400 rounded-md">
    <div class="cursor-pointer p-2 rounded bg-white" draggable="true" @dragstart="onDragStart" :id="String(props.id)"
      :groupId="props.groupId">
      <button @click="deleteUpdate()" class="delete-btn">&#10006;</button>
      <slot></slot>
    </div>
  </div>
</template>
