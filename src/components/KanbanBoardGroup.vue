<script setup lang="ts">
enum CardGroup {
  Resources = 'resources',
  ToDo = 'toDo',
  Done = 'done',
  Questions = 'questions'
}

interface Card {
  id: number
  title: string
  describtion: string
  group: CardGroup
}

const pendingCard: Card[] = [
  {
    id: 1,
    title: 'string',
    describtion: 'string',
    group: CardGroup.ToDo
  }
]
</script>
<template>
  <div>
    <h3>Group</h3>
    <ul>
      <li v-for="card in pendingCard" :key="card.id">{{ card.title }}</li>
    </ul>
  </div>
</template>
