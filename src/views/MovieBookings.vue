<script setup>
import { reactive, ref, onMounted } from 'vue'
import axios from 'axios'
let bookingList = reactive([])
let isLoading = ref(true)
let failedLoading = ref(false)
onMounted(async () => {
  try {
    const { data } = await axios.get('http://localhost:8000/bookings')
    bookingList = data
    isLoading.value = false
    console.log('Bookings', bookingList)
  } catch (error) {
    console.error('Error fetching===>', error)
    failedLoading.value = true
    isLoading.value = false
  }
})
</script>
<template>
  <div v-if="isLoading"></div>

  <v-table v-else density="compact">
    <thead>
      <tr>
        <th class="text-left">Id</th>
        <th class="text-left">Movie Id</th>
        <th class="text-left">Title</th>
        <th class="text-left">Show Time</th>
        <th class="text-left">Quantity</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="booking in bookingList" :key="booking.id">
        <td>{{ booking.id }}</td>
        <td>{{ booking.movieId }}</td>
        <td>{{ booking.title }}</td>
        <td>{{ booking.selectedShowTime }}</td>
        <td>{{ booking.selectedQuantity }}</td>
      </tr>
    </tbody>
  </v-table>
</template>

<style lang="scss" scoped></style>
