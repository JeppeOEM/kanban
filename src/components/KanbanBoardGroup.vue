<script setup lang="ts">
import { computed } from 'vue'
import type { Card } from '@/types/CardTypes'
import CreateCard from './CreateCard.vue'
import DraggableContent from './DraggableContent.vue'
import useCards from '@/composeables/useCards'

interface Props {
  groupId: number
}

const props = defineProps<Props>()
const { getCardsByGroupId } = useCards()
const cardGroup = getCardsByGroupId(props.groupId)
</script>

<template>
  <section class="flex-1 list-none drop-zone">
    <h3>{{ props.groupId }}</h3>
    <DraggableContent v-for="card in cardGroup" :key="card.id" :data="card">
      {{ card.title }} {{ card.description }} {{ card.id }}
    </DraggableContent>
    <CreateCard></CreateCard>
  </section>
</template>
