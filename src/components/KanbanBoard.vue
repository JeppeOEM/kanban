<script setup lang="ts">
import { ref } from 'vue'
import KanbanBoardGroup from './KanbanBoardGroup.vue'
import CreateKanbanGroup from './CreateKanbanGroup.vue'
import useKanbanGroups from '@/composeables/useKanbanGroups'
import { onMounted } from 'vue'
import type { KanbanGroup } from '@/types/KanbanGroupTypes'

const kanbanData = ref<any[]>([])

onMounted(async () => {
  const { getKanbanGroups } = useKanbanGroups()
  const data = await getKanbanGroups()
  kanbanData.value = data
  console.log(kanbanData.value, 'DATA')
})

const handleNewGroup = async (group: KanbanGroup) => {
  kanbanData.value.push(group)
  console.log(kanbanData.value)
}

const handleDeleteGroup = async (groupId: KanbanGroup) => {
  const index = kanbanData.value.findIndex((group) => group.id === groupId)
  if (index !== -1) {
    kanbanData.value = kanbanData.value.filter((group) => group.id !== groupId)
  }
  console.log(kanbanData.value)
}

const handleUpdateTitle = async (groupId: KanbanGroup) => {
  // const index = kanbanData.value.findIndex((group) => group.id === groupId)
  // if (index !== -1) {
  //   kanbanData.value = kanbanData.value.filter((group) => group.id !== groupId)
  // }
  console.log(groupId, 'lol')
}
</script>

<template>
  <div class="flex justify-around gap-5">
    <KanbanBoardGroup
      v-for="board in kanbanData"
      :key="board.id"
      :title="board.title"
      :id="board.id"
      @delete-group="handleDeleteGroup"
      @update-title="handleUpdateTitle"
    />
    <CreateKanbanGroup @new-group="handleNewGroup"></CreateKanbanGroup>
  </div>
</template>
