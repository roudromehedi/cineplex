<template>
  <v-form ref="form" v-model="valid" lazy-validation color="white">
    <v-text-field
      v-model="movieData.title"
      :rules="nameRules"
      label="Title"
      required
    ></v-text-field>

    <v-text-field v-model="movieData.year" label="Year" required></v-text-field>

    <v-text-field
      v-model="movieData.runtime"
      label="Runtime"
      required
    ></v-text-field>

    <v-text-field
      v-model="movieData.rating"
      label="Rating"
      required
    ></v-text-field>

    <v-text-field
      v-model="movieData.genere"
      label="Genre"
      required
    ></v-text-field>

    <v-text-field
      v-model="movieData.poster"
      label="Poster URL"
      required
    ></v-text-field>

    <v-select
      v-model="selectedTheaters"
      :items="theaterOptions"
      :rules="[(v) => !!v.length || 'At least one theater must be selected']"
      label="Theaters"
      multiple
      required
    ></v-select>

    <v-select
      v-model="selectedShowTimes"
      :items="showTimeOptions"
      :rules="[(v) => !!v.length || 'At least one show time must be selected']"
      label="Show Times"
      multiple
      required
    ></v-select>

    <v-btn
      color="success"
      class="mr-4"
      @click="addMovie"
      :disabled="isFormIncomplete"
    >
      Add
    </v-btn>

    <v-btn color="error" class="mr-4" @click="reset"> Reset Form </v-btn>
  </v-form>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import axios from "axios";

const movieData = reactive({
  title: "",
  year: "",
  runtime: "",
  rating: "",
  genere: "",
  poster: "",
  theaters: [],
  showTime: [],
});

const theaterOptions = [1, 2, 3, 4]; // Add available theater options here
const showTimeOptions = ["7:00 pm", "9:00 pm", "11:00 pm"]; // Add available show time options here

const selectedTheaters = ref([]);
const selectedShowTimes = ref([]);

const nameRules = [(v) => !!v || "Field is required"];

const addMovie = () => {
  movieData.theaters = selectedTheaters.value;
  movieData.showTime = selectedShowTimes.value;
  addMovieData(movieData);
};

const addMovieData = async (data) => {
  try {
    await axios.post("http://localhost:8000/movies", data);
    console.log("Movie added successfully!");
    // Clear form data after successful submission
    reset();
  } catch (error) {
    console.error("Error adding movie:", error);
  }
};

const reset = () => {
  // Reset form data
  movieData.title = "";
  movieData.year = "";
  movieData.runtime = "";
  movieData.rating = "";
  movieData.genere = "";
  movieData.poster = "";
  selectedTheaters.value = [];
  selectedShowTimes.value = [];
  // Reset form validation state
};

const isFormIncomplete = computed(() => {
  return (
    !movieData.title ||
    !movieData.year ||
    !movieData.runtime ||
    !movieData.rating ||
    !movieData.genere ||
    !movieData.poster ||
    selectedTheaters.value.length === 0 ||
    selectedShowTimes.value.length === 0
  );
});
</script>

<style scoped>
.v-form {
  margin: 0 auto;
}

.v-form {
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.v-text-field {
  width: 100%;
  margin-bottom: 20px;
}

.v-btn {
  min-width: 100px;
}

.v-btn + .v-btn {
  margin-left: 10px;
}

.v-select {
  width: 100%;
  margin-bottom: 20px;
}

.v-form > *:last-child {
  margin-bottom: 0;
}
</style>
