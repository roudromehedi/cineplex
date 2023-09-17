<template>
  <v-container
    ><div class="mb-5 mt-15 pt-5">
      <v-btn @click="openAddMovie" color="success">Add Movie</v-btn>
      <v-btn @click="openManageMovie" class="ml-2" color="warning"
        >Manage Movie</v-btn
      >
    </div>
    <AddMovie v-if="addMovie"></AddMovie>
    <EditMovie v-if="manageMovie"></EditMovie
  ></v-container>
</template>

<script setup>
import AddMovie from "./AddMovie.vue";
import EditMovie from "./EditMovie.vue";
import { ref } from "vue";

const addMovie = ref(false);
const manageMovie = ref(true);

function openAddMovie() {
  addMovie.value = true;
  manageMovie.value = false;
}
function openManageMovie() {
  console.log("Opening Manage Movie");
  manageMovie.value = true;
  addMovie.value = false;
}
</script>

<style lang="scss" scoped></style>
