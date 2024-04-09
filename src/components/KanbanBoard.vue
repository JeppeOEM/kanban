<script setup lang="ts">
import { CardGroup } from '@/types/CardTypes'

import KanbanBoardGroup from './KanbanBoardGroup.vue'
</script>

<template>
  <div>
    <KanbanBoardGroup :group="'Additional Resources'"> </KanbanBoardGroup>
    <KanbanBoardGroup :group="'To Do'"> </KanbanBoardGroup>
    <KanbanBoardGroup :group="'Doing'"> </KanbanBoardGroup>
    <KanbanBoardGroup :group="'Done'"> </KanbanBoardGroup>
    <KanbanBoardGroup :group="'Additional Questions'"> </KanbanBoardGroup>
  </div>
</template>
