<template>
  <div class="mt-15 pt-10">
    <div>
      <div class="text-center mt-52" v-if="movieStore.isLoading">
        <v-progress-circular
          :size="50"
          :width="5"
          indeterminate
          color="primary"
        ></v-progress-circular>
      </div>
      <h1 class="text-center mt-52" v-else-if="movieStore.failedLoading">
        Failed to load movie, Please try again
      </h1>
      <v-container v-else class="">
        <v-row no-gutters>
          <v-col
            v-for="movie in movieStore.movies"
            :key="movie.id"
            cols="12"
            xs="12"
            sm="6"
            md="4"
            lg="3"
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
import { onMounted, ref, watch } from "vue";
import { useMovieStore } from "../stores/movies.js";
import MovieCard from "../components/MovieCard.vue";

const movieStore = useMovieStore();
const PAGE_SIZE = 8;

const isLoading = ref(true);
const currentPage = ref(1);
const totalPages = ref(1);

const loadMovies = async () => {
  isLoading.value = true;
  try {
    await movieStore.getMovies(currentPage.value, PAGE_SIZE);
    totalPages.value = movieStore.totalPages;
  } catch (error) {
    console.error("Error fetching===>", error);
    isLoading.value = false;
  }
};
watch(currentPage, () => {
  loadMovies();
});
console.log(currentPage.value);

onMounted(async () => {
  loadMovies();
});
</script>

<style lang="scss" scoped></style>
