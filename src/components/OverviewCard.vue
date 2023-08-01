<template>
  <div class="col-lg-3 col-md-6 col-12">
    <div class="card mb-4">
      <div class="card-body p-3">
        <div class="row">
          <div class="col-8">
            <div class="numbers">
              <p class="text-sm mb-0 text-uppercase font-weight-bold">
                {{ cardTitle }}
              </p>
              <h5 class="font-weight-bolder">{{ movieList.length }}</h5>
              <p class="mb-0">
                <span class="text-success text-sm font-weight-bolder"
                  >+{{ movieList.length }}%</span
                >
                than last month
              </p>
            </div>
          </div>
          <div class="col-4 text-end">
            <div
              class="icon icon-shape bg-gradient-warning shadow-warning text-center rounded-circle"
            >
              <i class="ni ni-cart text-lg opacity-10" aria-hidden="true"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
const props = defineProps({ movieList: Array, cardTitle: String });
console.log(props.movieList.length);

//const theaterOptions = [1, 2, 9]; // Add available theater options here
//const showTimeOptions = ["7:00 pm", "9:00 pm", "11:00 pm"]; // Add available show time options here

//const cardWidth = ref("100%"); // Set the default width to 100% of the screen

// Add a data property to track the edit dialog visibility and the selected movie for editing
// const editDialogVisible = ref(false);
// const editedMovie = ref({});
// let selectedMovieId = null;

// const showEditDialog = (movie) => {
//   // Open the dialog and set the selected movie for editing
//   editDialogVisible.value = true;
//   selectedMovieId = movie.id;
//   editedMovie.value = { ...movie }; // Create a copy of the selected movie to edit
// };

// const updateMovie = async () => {
//   try {
//     // Send the updated movie data to the server
//     await axios.put(
//       `${BASE_API_URL}/movies/${selectedMovieId}`,
//       editedMovie.value
//     );
//     // Update the movieList with the edited movie
//     movieList.value = movieList.value.map((movie) =>
//       movie.id === selectedMovieId ? editedMovie.value : movie
//     );
//     // Close the edit dialog
//     editDialogVisible.value = false;
//     console.log(`Movie with ID ${selectedMovieId} updated successfully.`);
//   } catch (error) {
//     console.error("Error updating movie", error);
//   }
// };

// const deleteMovie = async (id) => {
//   try {
//     await axios.delete(`${BASE_API_URL}/movies/${parseInt(id)}`);
//     // Remove the deleted movie from the movieList array (by filtering)
//     movieList.value = movieList.value.filter((movie) => movie.id !== id);
//     console.log(`Movie with ID ${id} deleted successfully.`);
//   } catch (error) {
//     console.error("Error Deleting", error);
//   }
// };
</script>

<style lang="scss" scoped></style>
