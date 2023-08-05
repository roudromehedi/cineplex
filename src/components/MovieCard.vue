<script setup>
import { defineProps } from "vue";
defineProps({ movie: Object });
</script>

<template>
  <div class="ma-2 pa-2">
    <router-link
      :to="{ name: 'MovieDetails', params: { id: movie.id } }"
      class="0 mb-5"
      max-width="344"
      ><div
        class="0 mb-5"
        :to="{ name: 'MovieDetails', params: { id: movie.id } }"
        max-width="344"
        v-bind="props"
      >
        <div class="card shadow-lg mt-5">
          <div
            class="card-header mt-n4 mx-3 p-0 bg-transparent position-relative z-index-2"
          >
            <a class="d-block blur-shadow-image"
              ><img
                :src="movie.poster"
                alt="img-blur-shadow"
                class="img-fluid shadow border-radius-lg image-class"
                loading="lazy"
            /></a>
          </div>
          <div class="card-body text-center bg-white border-radius-lg p-3 pt-0">
            <h5 class="mt-3 mb-1 d-md-block d-none text-truncate">
              {{ movie.title }}
            </h5>

            <p
              class="mb-0 text-xs font-weight-bolder text-info text-gradient text-uppercase text-truncate"
            >
              {{ movie.genere }}
            </p>
          </div>
          <v-overlay
            :model-value="isHovering"
            contained
            scrim="#036358"
            class="align-center justify-center"
          >
          </v-overlay>
        </div>
      </div>
      <!-- <v-card
        :to="{ name: 'MovieDetails', params: { id: movie.id } }"
        class="mx-auto cardColor"
        max-width="344"
        v-bind="props"
      >
        <v-img cover :src="movie.poster"></v-img>
        <div class="pa-2 ma-2">
          <v-card-title class="text-white px-0">
            {{ movie.title }} ({{ movie.year }})
          </v-card-title>
          <div class="d-flex">
            <div>
              <v-icon size="large">
                <v-img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/2560px-IMDB_Logo_2016.svg.png"
                ></v-img
              ></v-icon>
              <span class="ml-2 text-white">{{ movie.rating }}</span>
            </div>

            <div class="ml-3 text-white">
              <v-icon size="" color="warning" icon="mdi-clock-outline"></v-icon>
              <span class="ml-2">{{ movie.runtime }}</span>
            </div>
          </div>
        </div>

        <v-overlay
          :model-value="isHovering"
          contained
          scrim="#036358"
          class="align-center justify-center"
        >
        </v-overlay>
      </v-card> -->
    </router-link>
  </div>
</template>

<style scoped>
.cardColor {
  background-color: #032055;
}
</style>
