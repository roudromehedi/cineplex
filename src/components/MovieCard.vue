<script setup>
import { defineProps } from "vue";
defineProps({ movie: Object });
</script>

<template>
  <div class="ma-2 pa-2">
    <v-hover v-slot="{ isHovering, props }">
      <v-card
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
      </v-card>
    </v-hover>
  </div>
</template>

<style scoped>
.cardColor {
  background-color: #032055;
}
</style>
