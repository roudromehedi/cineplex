<script setup>
import { defineProps } from 'vue'
defineProps({ movie: Object })
</script>

<template>
  <v-card class="ma-2 pa-2" max-width="344">
    <v-img :src="movie.poster" height="200px" cover></v-img>

    <v-card-title> {{ movie.title }} </v-card-title>

    <v-card-subtitle> {{ movie.year }} </v-card-subtitle>

    <v-card-actions>
      <v-btn
        :to="{ name: 'MovieDetails', params: { id: movie.id } }"
        color="orange-lighten-2"
        variant="text"
      >
        Explore
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<style lang="scss" scoped></style>
