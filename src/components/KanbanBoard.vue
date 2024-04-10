<script setup lang="ts">
import { ref } from 'vue'
import { CardGroup } from '@/types/CardTypes'
import KanbanBoardGroup from './KanbanBoardGroup.vue'


const fetchDataFromDB = async () => {
  // Simulated data fetching
  return {
    Resources: [...], // Data for Resources group
    ToDo: [...],      // Data for ToDo group
    Done: [...],      // Data for Done group
    Questions: [...], // Data for Questions group
  }
}

// Define a ref for storing the fetched data
const cardGroups = ref<CardGroup>()

// Fetch data from database when the component is mounted
import { onMounted } from 'vue'
onMounted(async () => {
  cardGroups.value = await fetchDataFromDB()
})
</script>
<template>
  <div class="flex justify-around gap-5">
    <KanbanBoardGroup :group="CardGroup.Resources"> </KanbanBoardGroup>
    <KanbanBoardGroup :group="CardGroup.ToDo"> </KanbanBoardGroup>
    <KanbanBoardGroup :group="CardGroup.Done"> </KanbanBoardGroup>
    <KanbanBoardGroup :group="CardGroup.Questions"> </KanbanBoardGroup>
  </div>
</template>
