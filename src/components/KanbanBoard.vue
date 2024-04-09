<script setup lang="ts">
import { CardGroup } from '@/types/CardTypes'

import KanbanBoardGroup from './KanbanBoardGroup.vue'
</script>

<template>
  <div class="flex justify-around gap-5">
    <KanbanBoardGroup :group="CardGroup.Resources"> </KanbanBoardGroup>
    <KanbanBoardGroup :group="CardGroup.ToDo"> </KanbanBoardGroup>
    <KanbanBoardGroup :group="CardGroup.Done"> </KanbanBoardGroup>
    <KanbanBoardGroup :group="CardGroup.Questions"> </KanbanBoardGroup>
  </div>
</template>
