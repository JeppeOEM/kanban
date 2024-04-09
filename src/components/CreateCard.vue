<script setup lang="ts">
import { reactive, ref } from 'vue'
import { CardGroup, type Card } from '@/types/CardTypes'
import useCards from '@/composeables/useCards'

const displayForm = ref(false)

const { addNewCard } = useCards()

const newCard = reactive<Omit<Card, 'id'>>({
  title: '',
  description: '',
  group: CardGroup.Done
})

const resetForm = () => {
  ;(displayForm.value = false), (newCard.title = ''), (newCard.description = '')
}

const props = defineProps<Props>()

interface Props {
  group: CardGroup
}
const onSubmit = () => {
  // add new card
  addNewCard({
    id: Math.random() * 999999999999,
    ...newCard
  })
  resetForm()
}
</script>

<template>
  <div>
    <h3 v-if="!displayForm" @click="displayForm = !displayForm">Add card</h3>
    <template v-else>
      <form @submit.prevent="onSubmit">
        <div>
          <input type="text" placeholder="Title" v-model="newCard.title" />
        </div>
        <div>
          <textarea type="text" placeholder="Text" v-model="newCard.description" />
        </div>
        <button type="submit">Save</button>
        <button type="submit">Cancel</button>
      </form>
    </template>
  </div>
</template>
