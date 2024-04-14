<script setup lang="ts">
import { ref } from 'vue'
import useKanbanGroups from '@/composeables/useKanbanGroups'
import { loadKanbanGroups } from '@/globalState'

const displayForm = ref(false)

const {addKanbanGroup } = useKanbanGroups()

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
  <div>
    <h3 v-if="!displayForm" @click="displayForm = !displayForm">Add column</h3>
    <template v-else>
      <form @submit.prevent="onSubmit">
        <div>
          <input type="text" placeholder="Title" v-model="newGroup.title" />
        </div>
        <div></div>
        <button type="submit">Save</button>
        <button type="button" @click="resetForm">Cancel</button>
      </form>
    </template>
  </div>
</template>
