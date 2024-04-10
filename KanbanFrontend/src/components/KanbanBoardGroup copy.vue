<template>
  <section class="flex-1 list-none drop-zone">
    <div v-if="cardGroup">
      <DraggableContent v-for="card in cardGroup" :key="card.id" :data="card">
        {{ card }}
      </DraggableContent>
      <p>lol</p>
      <CreateCard :groupId="props.id"></CreateCard>
    </div>
    <div v-else>Loading cards...</div>
  </section>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, computed } from 'vue'
import axios from 'axios'
import CreateCard from './CreateCard.vue'
import DraggableContent from './DraggableContent.vue'

const props = defineProps({
  id: Number,
  title: String
})
interface Card {
  id: number
  title: string
  description: string
  groupId: number
}

const get = async <T,>(url: string): Promise<T> => {
  try {
    const response = await axiosInstance.get<T>(url)
    return response.data
  } catch (error: any) {
    throw new Error(`Failed to fetch data from ${url}. ${error.message}`)
  }
}

const getCardsById = async (groupId: any): Promise<Card[]> => {
  try {
    const data = await get<Card[]>(`cards/${groupId}`)
    return data.map((card) => ({
      id: card.id,
      title: card.title,
      description: card.description,
      groupId: card.groupId
    }))
  } catch (err: any) {
    throw new Error(err.message)
  }
}

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000'
})

//I resolve Card[]

let cardGroup = getCardsById(props.id)
console.log(cardGroup)
</script>
