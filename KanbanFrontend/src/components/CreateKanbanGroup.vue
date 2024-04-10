<script setup lang="ts">
import { ref, defineEmits } from 'vue'
import { KanbanGroup } from '@/types/KanbanGroupTypes'
import useKanbanGroups from '@/composeables/useKanbanGroups'


const displayForm = ref(false)

const { getKanbanGroups, addKanbanGroup } = useKanbanGroups()

const newGroup = ref<{ title: string }>({ title: '' })

const emit = defineEmits(['new-group'])

const resetForm = () => {
  displayForm.value = false
  newGroup.value.title = ''
}

const onSubmit = async () => {
  try {
    let group = await addKanbanGroup(newGroup.value.title)
    console.log(newGroup.value.title)
    resetForm()
    emit('new-group', group)
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
