<script setup lang="ts">
import KanbanBoard from './components/KanbanBoard.vue'
</script>

<template>


    <main class="bg p-4 min-h-screen overflow-x-auto box-border">
      <KanbanBoard></KanbanBoard>
    </main>

</template>

<style scoped>
@media (min-width: 1024px) {
}

.bg{
  background-color: #FFECBE;
}

</style>
