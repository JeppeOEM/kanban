<script setup lang="ts">
import { ref } from 'vue'
import { addKanbanGroup } from '@/hooks/useKanbanGroups'
import { loadKanbanGroups } from '@/globalState/loadKanbanGroups'

const displayForm = ref(false)
const newGroup = ref<{ title: string }>({ title: '' })

const resetForm = () => {
  displayForm.value = false
  newGroup.value.title = ''
}

const onSubmit = async () => {
  try {
    await addKanbanGroup(newGroup.value.title)
    console.log(newGroup.value.title)
    resetForm()
    loadKanbanGroups()
  } catch (error) {
    console.error('Error adding new group:', error)
  }
}

</script>

<template>
  <div class="p-2 mr-4">
    <button v-if="!displayForm" @click="displayForm = !displayForm"
      class="whitespace-nowrap py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none">
      Add column
    </button>
    <div v-else>
      <form @submit.prevent="onSubmit">
        <div>
          <input class="w-full px-2 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
            type="
            text" placeholder="Title" v-model="newGroup.title" />
        </div>
        <div></div>
        <button class="pr-2" type="submit">Save</button>
        <button type="button" @click="resetForm">Cancel</button>
      </form>
    </div>
  </div>
</template>
@/globalState/loadKanbanGroups/globalState/loadKanbanGroups@/hooks/useKanbanGroups