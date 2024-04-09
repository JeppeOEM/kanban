<script setup lang="ts">


const props = defineProps<{
  data: any //
}>()

const onDragStart = (event: DragEvent) => {
  event.dataTransfer?.setData('text/plain', props.data)
}
</script>

<template>
  <div class="drag" draggable="true" @dragstart="onDragStart">
    <slot></slot>
  </div>
</template>

<style scoped>
.drag {
}
</style>
