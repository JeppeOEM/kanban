<script setup lang="ts">
import { CardGroup, type Card } from '@/types/CardTypes'

interface Props {
  group: string
}

const props = defineProps<Props>()
const pendingCard: Card[] = [
  {
    id: 1,
    title: 'string',
    describtion: 'string',
    group: 'lol'
  }
]
</script>
<template>
  <div>
    <h3>{{ props.group }}</h3>
    <ul>
      <li v-for="card in pendingCard" :key="card.id">{{ card.title }}</li>
    </ul>
  </div>
</template>
@/types/CardTypes
