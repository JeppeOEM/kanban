<script setup lang="ts">
import { ref } from 'vue'
import KanbanBoardGroup from './KanbanBoardGroup.vue'
import useKanbanData from '@/composeables/useKanbanData'
import { onMounted } from 'vue'

const cardGroups = ref<number[]>([])

onMounted(async () => {
  const { fetchKanbanData } = useKanbanData()
  const data = await fetchKanbanData()
  console.log(data) 
})
</script>

<template>
  <div class="flex justify-around gap-5">
    <KanbanBoardGroup v-for="groupId in cardGroups" :key="groupId" :groupId="groupId" />
  </div>
</template>
