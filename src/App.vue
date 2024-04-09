<script setup lang="ts">
import KanbanBoard from './components/KanbanBoard.vue'
</script>

<template>
  <div class="flex flex-col h-screen w-screen">
    <header class="bg-gray-800 text-white p-4"></header>

    <main class="flex-grow bg-gray-200 p-4">
      <KanbanBoard></KanbanBoard>
    </main>
  </div>
</template>

<style scoped>
@media (min-width: 1024px) {
}
</style>
