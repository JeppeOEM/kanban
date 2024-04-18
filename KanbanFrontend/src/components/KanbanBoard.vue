<script setup lang="ts">
import KanbanBoardGroup from './KanbanBoardGroup.vue'
import CreateKanbanGroup from './CreateKanbanGroup.vue'
import { onMounted } from 'vue'
import { kanbanData, loadKanbanGroups } from '@/globalState/loadKanbanGroups'

onMounted(async () => {
  await loadKanbanGroups()
})

</script>

<template>
  <div class="flex flex-row">
    <div class="h-full flex flex-nowrap">
      <KanbanBoardGroup v-for="board in kanbanData" :key="String(board.id)" :title="board.title" :groupId="board.id"
        :cards="board.cards" />
    </div>
    <CreateKanbanGroup class="flex-shrink-0 w-32"></CreateKanbanGroup>
  </div>
</template>
