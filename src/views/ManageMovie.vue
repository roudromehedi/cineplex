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
    <v-card
      v-else
      v-for="movie in movieList"
      :key="movie.id"
      class="movie-card"
      :width="cardWidth"
    >
      <v-row no-gutters>
        <v-col cols="3">
          <img :src="movie.poster" class="movie-poster" alt="Movie Poster" />
        </v-col>
        <v-col cols="7">
          <v-card-title>{{ movie.title }} ({{ movie.year }})</v-card-title>
          <v-card-subtitle
            >{{ movie.genere }} | {{ movie.runtime }}</v-card-subtitle
          >
          <v-card-text>
            <p>Rating: {{ movie.rating }}</p>
            <p v-for="time in movie.showTime" :key="time">
              Showtime: {{ time }}
            </p>
          </v-card-text>
        </v-col>
        <v-col cols="2" class="d-flex justify-end">
          <!-- Add an edit button with click event -->
          <v-btn icon @click="showEditDialog(movie)">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn icon @click="deleteMovie(movie.id)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { BASE_API_URL } from "../api/api.js";
import axios from "axios";

const theaterOptions = [1, 2, 9]; // Add available theater options here
const showTimeOptions = ["7:00 pm", "9:00 pm", "11:00 pm"]; // Add available show time options here
const movieList = ref([]);
const isLoading = ref(true);
const failedLoading = ref(false);

const fetchMovieList = async () => {
  try {
    const { data } = await axios.get(`${BASE_API_URL}/movies`);
    movieList.value = data; // Update the ref value
    isLoading.value = false;
    failedLoading.value = false;
  } catch (error) {
    console.error("Error fetching===>", error);
    failedLoading.value = true;
    isLoading.value = false;
  }
};
onMounted(fetchMovieList);

const cardWidth = ref("100%"); // Set the default width to 100% of the screen

// Add a data property to track the edit dialog visibility and the selected movie for editing
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
    // Update the movieList with the edited movie
    movieList.value = movieList.value.map((movie) =>
      movie.id === selectedMovieId ? editedMovie.value : movie
    );
    // Close the edit dialog
    editDialogVisible.value = false;
    console.log(`Movie with ID ${selectedMovieId} updated successfully.`);
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
  } catch (error) {
    console.error("Error Deleting", error);
  }
};
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
