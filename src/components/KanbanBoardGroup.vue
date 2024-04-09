<script setup lang="ts">
import { computed } from 'vue'
import { CardGroup, type Card } from '@/types/CardTypes'
import useCards from '@/composeables/useCards'

interface Props {
  group: CardGroup
}

const props = defineProps<Props>()
const { getCardsByGroup } = useCards()
const cardGroup = getCardsByGroup(props.group)

// const pendingCard: Card[] = [
//   {
//     id: 1,
//     title: 'string',
//     describtion: 'string',
//     group: CardGroup.ToDo
//   }
// ]
</script>
<template>
  <section cass="flex-1 list-none">
    <h3>{{ props.group }}</h3>
    <ul class="p-0">
      <li v-for="card in cardGroup" :key="card.id">{{ card.title }}</li>
    </ul>
  </section>
</template>
