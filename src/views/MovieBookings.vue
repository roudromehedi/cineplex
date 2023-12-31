<template>
  <v-container class="mt-15 pt-10"
    ><div v-if="isLoading">Loading bookings.....</div>
    <div v-else class="card">
      <div class="d-flex justify-content-center my-5">Manage Bookings</div>
      <div class="table-responsive">
        <table class="table align-items-center mb-0">
          <thead>
            <tr>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Title
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
              >
                Theateres
              </th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                No. of tickets
              </th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Status
              </th>
              <th class="text-secondary opacity-7"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="booking in bookingList" :key="booking.id">
              <td>
                <div class="d-flex px-2 py-1">
                  <div>
                    <img
                      alt="crypto"
                      :src="`https://source.unsplash.com/random/?Prople&id=${booking.id}`"
                      class="avatar avatar-sm me-3"
                    />
                  </div>
                  <div class="d-flex flex-column justify-content-center">
                    <h6 class="mb-0 text-xs">{{ booking.title }}</h6>
                    <p class="text-xs text-secondary mb-0">4k</p>
                  </div>
                </div>
              </td>
              <td>
                <p class="text-xs font-weight-bold mb-0">
                  {{ booking.selectedShowTime }}
                </p>
                <p class="text-xs text-secondary mb-0">Executive</p>
              </td>
              <td class="align-middle text-center text-sm">
                <span class="badge badge-sm badge-secondary">{{
                  booking.selectedQuantity
                }}</span>
              </td>
              <td class="align-middle text-center">
                <span class="text-red text-xs font-weight-bold">Live</span>
              </td>
              <td class="align-middle">
                <a
                  href="javascript:;"
                  class="font-weight-bold text-xs b text-warning"
                  data-toggle="tooltip"
                  data-original-title="Edit user"
                  @click="showEditDialog(booking)"
                >
                  Edit
                </a>
                <a
                  href="javascript:;"
                  class="text-danger font-weight-bold text-xs ml-2"
                  data-toggle="tooltip"
                  data-original-title="Edit user"
                  @click="deleteBooking(booking.id)"
                >
                  Delete
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <v-pagination
      color="white"
      v-model="currentPage"
      class="my-4"
      :length="totalPages"
      @input="loadBookings"
      rounded="circle"
    ></v-pagination>
  </v-container>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { BASE_API_URL } from "../api/api.js";
import axios from "axios";
import Swal from "sweetalert2";
import { watch } from "vue";

let bookingList = ref([]);
const isLoading = ref(true);
const failedLoading = ref(false);
const editDialogVisible = ref(false);
const editedBooking = ref({});

const showEditDialog = (booking) => {
  // Open the dialog and set the selected booking for editing
  editDialogVisible.value = true;
  editedBooking.value = { ...booking }; // Create a copy of the selected booking to edit
};

const deleteBooking = async (id) => {
  try {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
    if (result.isConfirmed) {
      await axios.delete(`${BASE_API_URL}/bookings/${parseInt(id)}`);
      console.log(`Booking with ID ${id} deleted successfully.`);
      // Call loadBookings to update the table with the latest data
      loadBookings();
      Swal.fire("Deleted!", "Booking has been deleted.", "success");
    }
  } catch (error) {
    console.error("Error Deleting", error);
  }
};

const PAGE_SIZE = 8;
let currentPage = ref(1);
let totalPages = ref(1);
const loadBookings = async () => {
  isLoading.value = true;
  try {
    const { data, headers } = await axios.get(
      `${BASE_API_URL}/bookings?_page=${currentPage.value}&_limit=${PAGE_SIZE}`
    );
    bookingList.value = data;
    isLoading.value = false;
    const totalCount = headers["x-total-count"];
    totalPages.value = Math.ceil(totalCount / PAGE_SIZE);
  } catch (error) {
    console.error("Error fetching===>", error);
    failedLoading.value = true;
    isLoading.value = false;
  }
};

console.log(totalPages.value);
watch(currentPage, () => {
  loadBookings();
});

onMounted(async () => {
  try {
    const totalCount = (await axios.get(`${BASE_API_URL}/bookings`)).headers[
      "x-total-count"
    ];
    totalPages.value = Math.ceil(totalCount / PAGE_SIZE);
    loadBookings();
  } catch (error) {
    console.error("Error fetching===>", error);
    failedLoading.value = true;
    isLoading.value = false;
  }
});
</script>

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
