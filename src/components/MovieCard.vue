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
                class="img-fluid shadow border-radius-lg image-class w-100"
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
    </router-link>
  </div>
</template>
<script setup>
import { defineProps } from "vue";
defineProps({ movie: Object });
</script>
<style scoped>
.cardColor {
  background-color: #032055;
}
</style>
