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

})

const handleNewGroup = async (group: KanbanGroup) => {
  kanbanData.value.push(group)

}

const handleDeleteGroup = async (groupId: KanbanGroup) => {
  const index = kanbanData.value.findIndex((group) => group.id === groupId)
  if (index !== -1) {
    kanbanData.value = kanbanData.value.filter((group) => group.id !== groupId)
  }
  console.log(kanbanData.value)
}

const handleUpdateGroups = async (data: any) => {
  console.log("HIIIIIIIT")
  const { from, to, cardId } = data;
  const updatedFromGroup = kanbanData.value.find((group: any) => group.id === from);
  const updatedToGroup = kanbanData.value.find((group: any) => group.id === to);

  if (updatedFromGroup && updatedToGroup) {
    const fromIndex = kanbanData.value.findIndex((group: any) => group.id === from);
    const toIndex = kanbanData.value.findIndex((group: any) => group.id === to);

    if (fromIndex !== -1) {
      kanbanData.value[fromIndex] = updatedFromGroup;
    }

    if (toIndex !== -1) {
      kanbanData.value[toIndex] = updatedToGroup;
    }
  }

  const { getKanbanGroups } = useKanbanGroups()
  const D = await getKanbanGroups()
  kanbanData.value = D
};

</script>

<template>
  <div class="flex justify-around gap-5">
    <KanbanBoardGroup v-for="board in kanbanData" :key="board.id" :title="board.title" :groupId="board.id"
      @delete-group="handleDeleteGroup" @update-groups="handleUpdateGroups" />
    <CreateKanbanGroup @new-group="handleNewGroup"></CreateKanbanGroup>
  </div>
</template>
