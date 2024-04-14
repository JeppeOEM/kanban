<script setup lang="ts">
import KanbanBoardGroup from './KanbanBoardGroup.vue'
import CreateKanbanGroup from './CreateKanbanGroup.vue'
import { onMounted } from 'vue'
import type { KanbanGroup } from '@/types/KanbanGroupTypes'
import { kanbanData, loadKanbanGroups } from '@/globalState'



onMounted(async () => {
  await loadKanbanGroups()
})

const handleNewGroup = async (group: KanbanGroup) => {
  kanbanData.value.push(group)

}

</script>

<template>
  <div class="flex justify-around gap-5">
    <KanbanBoardGroup v-for="board in kanbanData" 
    :key="String(board.id)" 
    :title="board.title" 
    :groupId="board.id" 
    :cards="board.cards"/>
    <CreateKanbanGroup @new-group="handleNewGroup"></CreateKanbanGroup>
  </div>
  
</template>
