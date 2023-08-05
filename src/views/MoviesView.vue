<template>
  <div class="mt-15 pt-10">
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
      </v-container>
    </div>

    <div class="text-center">
      <v-container>
        <v-row justify="center">
          <v-col cols="8">
            <v-container class="max-width">
              <v-pagination
                color="white"
                v-model="currentPage"
                class="my-4"
                :length="totalPages"
                @input="loadMovies"
                rounded="circle"
              ></v-pagination>
            </v-container>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import MovieCard from "../components/MovieCard.vue";
import axios from "axios";
import { BASE_API_URL } from "../api/api.js";

const PAGE_SIZE = 8;

let movieList = ref([]);
let isLoading = ref(true);
let failedLoading = ref(false);
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

<style lang="scss" scoped></style>
