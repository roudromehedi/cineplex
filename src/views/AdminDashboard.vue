<template>
  <v-btn @click="openAddMovie">Add Movie</v-btn>
  <v-btn @click="openManageMovie">Manage Movie</v-btn>
  <AddMovie v-show="addMovieOpen"></AddMovie>
  <ManageMovie v-show="manageMovie"></ManageMovie>
</template>

<script setup>
import AddMovie from "./AddMovie.vue";
import ManageMovie from "./ManageMovie.vue";
import { ref } from "vue";

let addMovieOpen = ref(false);
let manageMovie = ref(false);

function openAddMovie() {
  addMovieOpen.value = true;
  manageMovie.value = false;
}
function openManageMovie() {
  manageMovie.value = true;
  addMovieOpen.value = false;
}
</script>

<style lang="scss" scoped></style>
