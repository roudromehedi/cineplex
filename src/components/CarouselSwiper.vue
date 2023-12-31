<template>
  <div v-if="isLoading" class="text-white">Loading</div>
  <div v-else>
    <swiper
      :slides-per-view="value"
      :modules="[Navigation, Autoplay]"
      :space-between="30"
      :navigation="true"
      :loop="true"
      :autoplay="autoplay"
    >
      <!-- Use the "slides" slot to render custom swiper-slide elements -->
      <template #slides>
        <swiper-slide v-for="movie in movieList" :key="movie.id">
          <router-link
            :to="{ name: 'MovieDetails', params: { id: movie.id } }"
            class="0 mb-5"
            max-width="344"
          >
            <div class="0 mb-5">
              <div class="card shadow-lg mt-5">
                <div
                  class="card-header mt-n4 mx-3 p-0 bg-transparent position-relative z-index-2"
                >
                  <a class="d-block blur-shadow-image"
                    ><img
                      :src="movie.poster"
                      alt="img-blur-shadow"
                      class="img-fluid shadow border-radius-lg image-class w-100"
                      loading="lazy"
                  /></a>
                </div>
                <div
                  class="card-body text-center bg-white border-radius-lg p-3 pt-0"
                >
                  <h5 class="mt-3 mb-1 d-md-block d-none text-truncate">
                    {{ movie.title }}
                  </h5>

                  <p
                    class="mb-0 text-xs font-weight-bolder text-info text-gradient text-uppercase text-truncate"
                  >
                    {{ movie.genere }}
                  </p>
                </div>
              </div>
            </div>
          </router-link>
        </swiper-slide>
      </template>
    </swiper>
  </div>
</template>

<script setup>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-cube";

// Your data to populate the swiper-slide elements

import { ref, onMounted } from "vue";

import axios from "axios";
import { BASE_API_URL } from "../api/api.js";

const autoplay = {
  delay: 3000,
  disableOnInteraction: false,
};

const PAGE_SIZE = 10;

const movieList = ref([]);
let isLoading = ref(true);

let currentPage = ref(1);

const loadMovies = async () => {
  try {
    const { data } = await axios.get(
      `${BASE_API_URL}/movies?_page=${currentPage.value}&_limit=${PAGE_SIZE}`
    );
    movieList.value = data;
    isLoading.value = false;
  } catch (error) {
    console.error("Error fetching===>", error);
  }
};

onMounted(async () => {
  loadMovies();
});
console.log(movieList);

import { onBeforeUnmount } from "vue";

const screenWidth = ref(0);
const value = ref(5);

const isSmallScreen = ref(false);
const isMediumScreen = ref(false);

const handleResize = () => {
  screenWidth.value = window.innerWidth;
  isSmallScreen.value = screenWidth.value < 768; // Define your small screen width here
  isMediumScreen.value = screenWidth.value >= 768 && screenWidth.value < 1024; // Define your medium screen width here

  // Set the value to 2 when the screen is small
  if (isSmallScreen.value) {
    value.value = 1;
  } else {
    // Reset to 5 when the screen is not small
    value.value = 5;
  }
};

onMounted(() => {
  // Get the initial screen size
  screenWidth.value = window.innerWidth;
  // Add event listener to handle resizing
  window.addEventListener("resize", handleResize);
});

onBeforeUnmount(() => {
  // Remove the event listener when the component is unmounted
  window.removeEventListener("resize", handleResize);
});
</script>

<style>
.image-class {
  height: 100%;
  object-fit: cover;
  aspect-ratio: 3 / 5 !important;
}
</style>
