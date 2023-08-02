<template>
  <div>
    <!-- Add a dialog for editing -->
    <v-dialog v-model="editDialogVisible">
      <v-card>
        <v-card-title>Edit Movie</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="editedMovie.title"
            label="Title"
          ></v-text-field>
          <v-text-field v-model="editedMovie.year" label="Year"></v-text-field>
          <v-text-field
            v-model="editedMovie.runtime"
            label="Runtime"
          ></v-text-field>
          <v-text-field
            v-model="editedMovie.rating"
            label="Rating"
          ></v-text-field>
          <v-text-field
            v-model="editedMovie.genere"
            label="Genre"
          ></v-text-field>
          <v-text-field
            v-model="editedMovie.poster"
            label="Poster URL"
          ></v-text-field>
          <v-select
            v-model="editedMovie.theaters"
            :items="theaterOptions"
            label="Theaters"
            multiple
            required
          ></v-select>

          <v-select
            v-model="editedMovie.showTime"
            :items="showTimeOptions"
            label="Show Times"
            multiple
            required
          ></v-select>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="editDialogVisible = false">Cancel</v-btn>
          <v-btn @click="updateMovie" color="primary">Update</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <div v-if="isLoading">Loading.......</div>

    <div v-else class="card">
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
                Run Time
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
            <tr v-for="movie in movieList" :key="movie.id">
              <td>
                <div class="d-flex px-2 py-1">
                  <div>
                    <img :src="movie.poster" class="avatar avatar-sm me-3" />
                  </div>
                  <div class="d-flex flex-column justify-content-center">
                    <h6 class="mb-0 text-xs">{{ movie.title }}</h6>
                    <p class="text-xs text-secondary mb-0">
                      richard@creative-tim.com
                    </p>
                  </div>
                </div>
              </td>
              <td>
                <p class="text-xs font-weight-bold mb-0">{{ movie.year }}</p>
                <p class="text-xs text-secondary mb-0">Executive</p>
              </td>
              <td class="align-middle text-center text-sm">
                <span class="badge badge-sm badge-secondary">{{
                  movie.runtime
                }}</span>
              </td>
              <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold"
                  >04/10/21</span
                >
              </td>
              <td class="align-middle">
                <a
                  href="javascript:;"
                  class="font-weight-bold text-xs b text-warning"
                  data-toggle="tooltip"
                  data-original-title="Edit user"
                  @click="showEditDialog(movie)"
                >
                  Edit
                </a>
                <a
                  href="javascript:;"
                  class="text-danger font-weight-bold text-xs ml-2"
                  data-toggle="tooltip"
                  data-original-title="Edit user"
                  @click="deleteMovie(movie.id)"
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
      @input="loadMovies"
      rounded="circle"
    ></v-pagination>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { BASE_API_URL } from "../api/api.js";
import axios from "axios";

const theaterOptions = [1, 2, 9]; // Add available theater options here
const showTimeOptions = ["7:00 pm", "9:00 pm", "11:00 pm"]; // Add available show time options here
let movieList = ref([]);
const isLoading = ref(true);
const failedLoading = ref(false);

//const cardWidth = ref("100%"); // Set the default width to 100% of the screen

//Add a data property to track the edit dialog visibility and the selected movie for editing
const editDialogVisible = ref(false);
const editedMovie = ref({});
let selectedMovieId = null;

const showEditDialog = (movie) => {
  // Open the dialog and set the selected movie for editing
  editDialogVisible.value = true;
  selectedMovieId = movie.id;
  editedMovie.value = { ...movie }; // Create a copy of the selected movie to edit
};
const updateMovie = async () => {
  try {
    // Send the updated movie data to the server
    await axios.put(
      `${BASE_API_URL}/movies/${selectedMovieId}`,
      editedMovie.value
    );
    // Close the edit dialog
    editDialogVisible.value = false;
    console.log(`Movie with ID ${selectedMovieId} updated successfully.`);
    // Call loadMovies to update the table with the latest data
    await loadMovies();
  } catch (error) {
    console.error("Error updating movie", error);
  }
};

const deleteMovie = async (id) => {
  try {
    await axios.delete(`${BASE_API_URL}/movies/${parseInt(id)}`);
    // Remove the deleted movie from the movieList array (by filtering)
    movieList.value = movieList.value.filter((movie) => movie.id !== id);
    console.log(`Movie with ID ${id} deleted successfully.`);
    // Call loadMovies to update the table with the latest data
    loadMovies();
  } catch (error) {
    console.error("Error Deleting", error);
  }
};

import { watch } from "vue";

const PAGE_SIZE = 8;
let currentPage = ref(1);
let totalPages = ref(1);
const loadMovies = async () => {
  isLoading.value = true;
  try {
    const { data, headers } = await axios.get(
      `${BASE_API_URL}/movies?_page=${currentPage.value}&_limit=${PAGE_SIZE}`
    );
    movieList.value = data;
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
  loadMovies();
});

onMounted(async () => {
  try {
    const totalCount = (await axios.get(`${BASE_API_URL}/movies`)).headers[
      "x-total-count"
    ];
    totalPages.value = Math.ceil(totalCount / PAGE_SIZE);
    loadMovies();
  } catch (error) {
    console.error("Error fetching===>", error);
    failedLoading.value = true;
    isLoading.value = false;
  }
});
</script>

<style>
.movie-card {
  margin-bottom: 20px;
}

.movie-poster {
  width: 100%;
  max-height: 250px;
}
</style>
