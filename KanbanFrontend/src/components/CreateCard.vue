<script setup lang="ts">
import { reactive, ref } from 'vue'
import { CardGroup, type CardDto,  } from '@/types/CardTypes'
import useCards from '@/composeables/useCards'

const props = defineProps({
  groupId: Number,
 updateCardGroup: Function,
 cardGroup: Array
})

const displayForm = ref(false)

const { addCard } = useCards()

const newCard = reactive<CardDto>({
  title: '',
  description: '',
  groupId: props.groupId
})

const resetForm = () => {
  ;(displayForm.value = false), (newCard.title = ''), (newCard.description = '')
}

const onSubmit = async () => {
  console.log(newCard)
  // add new card
  await addCard({
    ...newCard
  })
  resetForm()
  props.updateCardGroup(props.groupId)
  console.log(props.cardGroup)
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
