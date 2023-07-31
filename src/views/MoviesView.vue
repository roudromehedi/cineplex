<template>
  <div>
    <div class="text-center mt-52" v-if="isLoading">
      <v-progress-circular
        :size="50"
        :width="5"
        indeterminate
        color="primary"
      ></v-progress-circular>
    </div>
    <h1 class="text-center mt-52" v-else-if="failedLoading">
      Failed to load movie, Please try again
    </h1>
    <v-container v-else class="">
      <v-row no-gutters>
        <v-col
          v-for="movie in movieList"
          :key="movie.id"
          cols="12"
          sm="6"
          md="4"
          lg="3"
          xs="12"
        >
          <MovieCard :movie="movie"></MovieCard>
        </v-col>
      </v-row>
      <!-- Add New Movie Button -->
      <v-btn @click="addNewMovie">Add New Movie</v-btn>
    </v-container>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import MovieCard from "../components/MovieCard.vue";
import axios from "axios";
import { BASE_API_URL } from "../api/api.js";

let movieList = reactive([]);
let isLoading = ref(true);
let failedLoading = ref(false);

const addMovie = async (newMovie) => {
  try {
    const response = await axios.post(`${BASE_API_URL}/movies`, newMovie);
    movieList.push(response.data);
  } catch (error) {
    console.error("Error adding movie===>", error);
  }
};

const addNewMovie = () => {
  const newMovie = {
    id: movieList.length + 1, // Replace this with a proper ID generation logic on the server-side
    title: "New Movie",
    year: "2023",
    runtime: "120 min",
    poster: "https://example.com/new-movie-poster.jpg",
  };

  addMovie(newMovie);
};

onMounted(async () => {
  try {
    const { data } = await axios.get(`${BASE_API_URL}/movies`);
    movieList = data;
    isLoading.value = false;
  } catch (error) {
    console.error("Error fetching===>", error);
    failedLoading.value = true;
    isLoading.value = false;
  }
});
</script>

<style lang="scss" scoped></style>
