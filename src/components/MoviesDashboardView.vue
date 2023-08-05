<template>
  <div class="card">
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
        <div class="text-center mt-52" v-if="isLoading">
          <v-progress-circular
            :size="50"
            :width="5"
            indeterminate
            color="primary"
          ></v-progress-circular>
        </div>
        <tbody v-else>
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
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { BASE_API_URL } from "../api/api.js";
import axios from "axios";

let movieList = ref([]);
const isLoading = ref(true);

const PAGE_SIZE = 5;

let currentPage = ref(1);

const loadMovies = async () => {
  isLoading.value = true;
  try {
    const { data } = await axios.get(
      `${BASE_API_URL}/movies?_page=${currentPage.value}&_limit=${PAGE_SIZE}`
    );
    movieList.value = data;
    isLoading.value = false;
    console.log("First Page", movieList);
  } catch (error) {
    console.error("Error fetching===>", error);
  }
};

onMounted(async () => {
  loadMovies();
});
</script>

<style scoped></style>
