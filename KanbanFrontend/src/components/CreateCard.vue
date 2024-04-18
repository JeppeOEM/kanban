<script setup lang="ts">
import { ref, reactive } from 'vue'
import { type CardDto } from '@/types/CardTypes'
import { addCard } from '@/composeables/useCards'
import { loadKanbanGroups } from '@/globalState'

const props = defineProps<{
  groupId: number,
}>()

const displayForm = ref(false)


const newCard = reactive<CardDto>({
  title: '',
  description: '',
  groupId: props.groupId
})

const resetForm = () => {
  displayForm.value = false
  newCard.title = ''
  newCard.description = ''
}

const onSubmit = async () => {
  await addCard({ ...newCard })
  resetForm()
  loadKanbanGroups()
}
</script>

<template>
  <div>
    <h3 v-if="!displayForm" @click="displayForm = !displayForm" class="mt-4 font-bold cursor-pointer">+ Add card</h3>
    <template v-else>
      <form @submit.prevent="onSubmit">
        <div class="mb-4">
          <input type="text" placeholder="Title (optional)" v-model="newCard.title"
            class="mt-4 w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500" />
        </div>
        <div class="mb-4">
          <textarea type="text" placeholder="Text" v-model="newCard.description"
            class="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"></textarea>
        </div>
        <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-md mr-2">Save</button>
        <button type="button" @click="resetForm" class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md">Cancel</button>
      </form>
    </template>
  </div>
</template>
