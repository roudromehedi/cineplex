<script setup>
import { reactive, ref, onMounted } from "vue";
import { BASE_API_URL } from "../api/api.js";
import axios from "axios";
let bookingList = reactive([]);
let isLoading = ref(true);
let failedLoading = ref(false);
onMounted(async () => {
  try {
    const { data } = await axios.get(`${BASE_API_URL}/bookings`);
    bookingList = data;
    isLoading.value = false;
    console.log("Bookings", bookingList);
  } catch (error) {
    console.error("Error fetching===>", error);
    failedLoading.value = true;
    isLoading.value = false;
  }
});
</script>
<template>
  <v-container
    ><div v-if="isLoading"></div>

    <v-table v-else density="compact" class="backgroundColor textWhite">
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
    </v-table></v-container
  >
</template>

<style lang="scss" scoped>
.backgroundColor {
  background-color: transparent;
}
.textWhite {
  color: white !important;
}
::v-deep .v-data-table-header {
  color: black;
  background-color: white;
}
</style>
