<script setup lang="ts">
const props = defineProps<{
  data: any //
}>()

const onDragStart = (event: DragEvent) => {
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = 'move'
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData('data', props.data)
    console.log(props.data)
  }
}

const onDragOver = (event: DragEvent) => {
  event.preventDefault()
}

const onDrop = (event: DragEvent) => {
  event.preventDefault()
  const draggedCard = event.dataTransfer?.getData('data')
  console.log(draggedCard)
}
</script>

<template>
  <div @drop="onDrop($event)" @dragenter.prevent @dragover.prevent class="drop-zone">
    <div class="cursor-pointer" draggable="true" @dragstart="onDragStart" :id="props.data.id">
      <h2>lol</h2>
      <slot></slot>
    </div>
  </div>
</template>
