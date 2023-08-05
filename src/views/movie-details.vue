<script setup>
import { ref, onMounted, defineProps } from "vue";
import { BASE_API_URL } from "../api/api.js";
import Swal from "sweetalert2";

import axios from "axios";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

let movieDetails = ref({});
let isLoading = ref(true);

const selectedShowTime = ref("chose"); // Set the default value for selectedShowTime
const selectedQuantity = ref("select"); // Set the default value for selectedQuantity

const buyTicket = () => {
  const { id, title } = movieDetails;
  addBooking(id, title, selectedShowTime.value, selectedQuantity.value);
  console.log(selectedShowTime, selectedQuantity);
  showSuccessAlert();
  Swal.fire({
    title: "Thanks for your purchase!!!",
    icon: "success",
    confirmButtonText: "Close",
  });
};
const isBuyButtonDisabled = () => {
  return (
    selectedShowTime.value === "chose" || selectedQuantity.value === "select"
  );
};

const showSuccessAlert = () => {
  // Show the success alert
  // You can use Vuetify's Snackbar or Dialog component for the alert
  // For simplicity, let's assume you are using the Dialog component
  // Make sure to declare the `successAlert` ref
  successAlert.value = true;
  // Hide the success alert after 5 seconds
  setTimeout(() => {
    successAlert.value = false;
  }, 5000);
  // Reset the dropdown fields
  selectedShowTime.value = "chose";
  selectedQuantity.value = "select";
};

// Declare the `successAlert` ref to control the success alert display
const successAlert = ref(false);

onMounted(async () => {
  try {
    const response = await axios.get(
      `${BASE_API_URL}/movies/${parseInt(props.id)}`
    );
    movieDetails.value = response.data;
    isLoading.value = false;
  } catch (error) {
    console.error("Error Fetching", error);
    isLoading.value = false;
  }
});

const addBooking = async (
  movieId,
  title,
  selectedShowTime,
  selectedQuantity
) => {
  try {
    const data = { movieId, title, selectedShowTime, selectedQuantity };
    await axios.post(`${BASE_API_URL}/bookings`, data);
    console.log("Movie added successfully!");
  } catch (error) {
    console.error("Error adding movie:", error);
  }
};
</script>

<template>
  <v-container fluid class="py-8 px-6">
    <div v-if="isLoading">Loading</div>
    <v-row v-else>
      <v-col cols="12">
        <v-card
          elevation="5"
          class="card-shadow border-radius-xl px-10 py-10 text-blue-grey-darken-3"
        >
          <div class="card-padding">
            <h5
              color="grey-darken-2"
              class="text-h5 text-typo font-weight-bold mb-6 grey-darken-2 text-blue-grey-darken-3"
            >
              Movie Details
            </h5>
            <v-row>
              <v-col lg="5" md="6" class="text-center">
                <v-img
                  class="w-100 border-radius-lg shadow-lg mx-auto"
                  :src="movieDetails.poster"
                >
                </v-img>
              </v-col>
              <v-col lg="5" class="mx-auto">
                <h3
                  class="text-h3 text-typo font-weight-bold mt-lg-0 mt-4 mb-2"
                >
                  {{ movieDetails.title }}
                </h3>
                <div class="d-flex">
                  <div>
                    <v-icon size="large">
                      <v-img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/2560px-IMDB_Logo_2016.svg.png"
                      ></v-img
                    ></v-icon>
                    <span class="ml-2">{{ movieDetails.rating }}</span>
                  </div>

                  <div class="ml-5">
                    <v-icon
                      size="large"
                      color="green-darken-2"
                      icon="mdi-clock-outline"
                    ></v-icon>
                    <span class="ml-2">{{ movieDetails.runtime }}</span>
                  </div>
                  <div class="ml-5 d-flex">
                    <div>{{ movieDetails.year }} -</div>
                    <div class="ml-1">{{ movieDetails.genere }}</div>
                  </div>
                </div>
                <br />

                <v-btn
                  elevation="1"
                  :ripple="true"
                  outlined
                  class=""
                  color="teal"
                  >Watch Trailer
                  <v-icon end icon="mdi-play" color="white" size=""></v-icon
                ></v-btn>
                <br />
                <br />
                <label class="text-sm text-body ms-1 mt-6">Description</label>
                <ul
                  class="text-body font-weight-light mt-2 text-blue-grey-darken-1"
                >
                  <li>
                    The most beautiful curves of this swivel stool adds an
                    elegant touch to any environment
                  </li>
                  <li>Memory swivel seat returns to original seat position</li>
                  <li>
                    Comfortable integrated layered chair seat cushion design
                  </li>
                  <li>Fully assembled! No assembly required</li>
                </ul>
                <v-row class="mt-6">
                  <v-col lg="5">
                    <label class="text-sm text-body mb-0">Show Time</label>
                    <v-select
                      :items="movieDetails.showTime"
                      v-model="selectedShowTime"
                      color="#e91e63"
                      class="font-size-input input-style placeholder-light border-radius-md select-style mt-0"
                      height="36"
                    ></v-select>
                  </v-col>
                  <v-col>
                    <label class="text-sm text-body mb-0">Tickets</label>
                    <v-select
                      :items="[1, 2, 3, 4, 5]"
                      color="#e91e63"
                      v-model="selectedQuantity"
                      class="font-size-input input-style placeholder-light border-radius-md select-style mt-0"
                      height="36"
                    ></v-select>
                  </v-col>
                </v-row>
                <v-row class="mt-0">
                  <v-col>
                    <v-btn
                      elevation="1"
                      :ripple="false"
                      color="primary"
                      @click="buyTicket"
                      :disabled="isBuyButtonDisabled()"
                      >Buy Ticket</v-btn
                    >
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Vuetify Dialog for the success alert -->

    <!-- <v-dialog v-model="successAlert" max-width="400">
      <v-card>
        <v-card-title class="text-h5">Success!</v-card-title>
        <v-card-text>Thanks for your purchase!</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="successAlert = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog> -->
  </v-container>
</template>
