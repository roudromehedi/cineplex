<template>
  <div>
    <!-- Add a dialog for editing -->
    <v-dialog v-model="editDialogVisible">
      <v-card>
        <v-card-title>Edit Movie</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="editedMovie.title"
            label="Title"
          ></v-text-field>
          <v-text-field v-model="editedMovie.year" label="Year"></v-text-field>
          <v-text-field
            v-model="editedMovie.runtime"
            label="Runtime"
          ></v-text-field>
          <v-text-field
            v-model="editedMovie.rating"
            label="Rating"
          ></v-text-field>
          <v-text-field
            v-model="editedMovie.genere"
            label="Genre"
          ></v-text-field>
          <v-text-field
            v-model="editedMovie.poster"
            label="Poster URL"
          ></v-text-field>
          <v-select
            v-model="editedMovie.theaters"
            :items="theaterOptions"
            label="Theaters"
            multiple
            required
          ></v-select>

          <v-select
            v-model="editedMovie.showTime"
            :items="showTimeOptions"
            label="Show Times"
            multiple
            required
          ></v-select>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="editDialogVisible = false">Cancel</v-btn>
          <v-btn @click="updateMovie" color="primary">Update</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <div v-if="isLoading">Loading.......</div>

    <div v-else class="card">
      <div class="container-fluid py-4 px-0">
        <div class="row">
          <div class="col-12">
            <div class="card shadow-none">
              <!-- Card header -->
              <div class="card-header pb-0">
                <div class="d-lg-flex">
                  <div>
                    <h5 class="mb-0">All Shows</h5>
                    <p class="text-sm mb-0">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Esse, unde?
                    </p>
                  </div>
                  <div class="ms-auto my-auto mt-lg-0 mt-4">
                    <div class="ms-auto my-auto">
                      <a
                        href="./new-product.html"
                        class="btn bg-gradient-primary btn-sm mb-0 mr-2"
                        target="_blank"
                        >+&nbsp; New Product</a
                      >
                      <button
                        type="button"
                        class="btn btn-outline-primary btn-sm mb-0 mr-2"
                        data-bs-toggle="modal"
                        data-bs-target="#import"
                      >
                        Import
                      </button>
                      <div
                        class="modal fade"
                        id="import"
                        tabindex="-1"
                        aria-hidden="true"
                      >
                        <div class="modal-dialog mt-lg-10">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h5 class="modal-title" id="ModalLabel">
                                Import CSV
                              </h5>
                              <i
                                class="fas fa-upload ms-3"
                                aria-hidden="true"
                              ></i>
                              <button
                                type="button"
                                class="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              ></button>
                            </div>
                            <div class="modal-body">
                              <p>You can browse your computer for a file.</p>
                              <input
                                type="text"
                                placeholder="Browse file..."
                                class="form-control mb-3"
                                onfocus="focused(this)"
                                onfocusout="defocused(this)"
                              />
                              <div class="form-check">
                                <input
                                  class="form-check-input"
                                  type="checkbox"
                                  value=""
                                  id="importCheck"
                                  checked=""
                                />
                                <label
                                  class="custom-control-label"
                                  for="importCheck"
                                  >I accept the terms and conditions</label
                                >
                              </div>
                            </div>
                            <div class="modal-footer">
                              <button
                                type="button"
                                class="btn bg-gradient-secondary btn-sm"
                                data-bs-dismiss="modal"
                              >
                                Close
                              </button>
                              <button
                                type="button"
                                class="btn bg-gradient-primary btn-sm"
                              >
                                Upload
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <button
                        class="btn btn-outline-primary btn-sm export mb-0 mt-sm-0 mt-1"
                        data-type="csv"
                        type="button"
                        name="button"
                      >
                        Export
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card-body px-0 pb-0">
                <div class="table-responsive">
                  <div
                    class="dataTable-wrapper dataTable-loading no-footer sortable searchable fixed-columns"
                  >
                    <div class="dataTable-top">
                      <div class="dataTable-dropdown">
                        <label
                          ><select
                            class="form-select form-select-sm"
                            aria-label=".form-select-sm example"
                            v-model="PAGE_SIZE"
                            @change="onPageSizeChange"
                          >
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                            <option value="25">25</option>
                          </select>

                          entries per page</label
                        >
                      </div>
                      <div class="dataTable-search">
                        <input
                          class="dataTable-input"
                          v-model="searchQuery"
                          placeholder="Search..."
                          type="text"
                        />
                        <button
                          type="button"
                          class="btn btn-outline-primary btn-sm mb-0 ml-2"
                          @click="loadMovies"
                        >
                          Search
                        </button>
                      </div>
                    </div>
                    <div class="dataTable-container">
                      <table
                        class="table table-flush dataTable-table"
                        id="products-list"
                      >
                        <thead class="thead-light">
                          <tr>
                            <th data-sortable="" style="width: 32.9242%">
                              <a href="#" class="dataTable-sorter">Title</a>
                            </th>
                            <th
                              data-sortable=""
                              style="width: 11.8051%"
                              class=""
                            >
                              <a href="#" class="dataTable-sorter">Year</a>
                            </th>
                            <th
                              data-sortable=""
                              style="width: 9.9639%"
                              class="desc"
                            >
                              <a href="#" class="dataTable-sorter">Run time</a>
                            </th>
                            <th data-sortable="" style="width: 12.13%" class="">
                              <a href="#" class="dataTable-sorter">Rating</a>
                            </th>
                            <th
                              data-sortable=""
                              style="width: 13.8628%"
                              class="asc"
                            >
                              <a href="#" class="dataTable-sorter">Genere</a>
                            </th>
                            <th data-sortable="" style="width: 12.13%">
                              <a href="#" class="dataTable-sorter">Status</a>
                            </th>
                            <th data-sortable="" style="width: 14.1877%">
                              <a href="#" class="dataTable-sorter">Action</a>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="movie in movieList" :key="movie.id">
                            <td>
                              <div class="d-flex">
                                <div class="form-check my-auto">
                                  <input
                                    class="form-check-input"
                                    type="checkbox"
                                    id="customCheck11"
                                    checked=""
                                  />
                                </div>
                                <img
                                  class="w-10 ms-3"
                                  src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/soft-ui-design-system/assets/img/ecommerce/yellow-chair.jpg"
                                  alt="coco"
                                />
                                <h6 class="ms-3 my-auto">{{ movie.title }}</h6>
                              </div>
                            </td>
                            <td class="text-sm">{{ movie.year }}</td>
                            <td class="text-sm">{{ movie.runtime }}</td>
                            <td class="">
                              <span class="badge badge-warning badge-sm">{{
                                movie.rating
                              }}</span>
                            </td>
                            <td class="text-sm">{{ movie.genere }}</td>
                            <td>
                              <span class="badge badge-success badge-sm"
                                >Live</span
                              >
                            </td>
                            <td class="text-sm">
                              <a
                                href="javascript:;"
                                data-bs-toggle="tooltip"
                                data-bs-original-title="Preview product"
                              >
                                <i
                                  class="fas fa-eye text-success"
                                  aria-hidden="true"
                                ></i>
                              </a>
                              <a
                                href="javascript:;"
                                class="mx-3"
                                data-bs-toggle="tooltip"
                                data-bs-original-title="Edit product"
                                @click="showEditDialog(movie)"
                              >
                                <i
                                  class="fas fa-edit text-warning"
                                  aria-hidden="true"
                                ></i>
                              </a>
                              <a
                                href="javascript:;"
                                data-bs-toggle="tooltip"
                                data-bs-original-title="Delete product"
                                @click="deleteMovie(movie.id)"
                              >
                                <i
                                  class="fas fa-trash text-danger"
                                  aria-hidden="true"
                                ></i>
                              </a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <nav class="dataTable-pagination">
                      <v-pagination
                        color="black"
                        v-model="currentPage"
                        class="my-4"
                        :length="totalPages"
                        @input="loadMovies"
                        rounded="circle"
                      ></v-pagination>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { BASE_API_URL } from "../api/api.js";
import axios from "axios";
import Swal from "sweetalert2";
import { watch } from "vue";

const theaterOptions = [1, 2, 9]; //  available theater options
const showTimeOptions = ["7:00 pm", "9:00 pm", "11:00 pm"]; //  available show time options
let movieList = ref([]);
const isLoading = ref(true);
const failedLoading = ref(false);
const editDialogVisible = ref(false);
const editedMovie = ref({});
let selectedMovieId = null;

const showEditDialog = (movie) => {
  // Open the dialog and set the selected movie for editing
  editDialogVisible.value = true;
  selectedMovieId = movie.id;
  editedMovie.value = { ...movie }; // Create a copy of the selected movie to edit
};
const updateMovie = async () => {
  try {
    // Send the updated movie data to the server
    await axios.put(
      `${BASE_API_URL}/movies/${selectedMovieId}`,
      editedMovie.value
    );
    // Close the edit dialog
    editDialogVisible.value = false;
    console.log(`Movie with ID ${selectedMovieId} updated successfully.`);
    // Call loadMovies to update the table with the latest data
    await loadMovies();
  } catch (error) {
    console.error("Error updating movie", error);
  }
};

const deleteMovie = async (id) => {
  try {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      await axios.delete(`${BASE_API_URL}/movies/${parseInt(id)}`);
      // Remove the deleted movie from the movieList array (by filtering)
      movieList.value = movieList.value.filter((movie) => movie.id !== id);
      console.log(`Movie with ID ${id} deleted successfully.`);
      // Call loadMovies to update the table with the latest data
      loadMovies();

      // Show a success Swal popup after successful deletion
      Swal.fire("Deleted!", "Your file has been deleted.", "success");
    }
  } catch (error) {
    console.error("Error Deleting", error);
  }
};

const PAGE_SIZE = ref(5);
let currentPage = ref(1);
let totalPages = ref(1);
const searchQuery = ref("");

const loadMovies = async () => {
  isLoading.value = true;
  try {
    let apiUrl = `${BASE_API_URL}/movies?_page=${currentPage.value}&_limit=${PAGE_SIZE.value}`;

    // Add search query to the API URL if it's provided
    if (searchQuery.value) {
      apiUrl += `&q=${encodeURIComponent(searchQuery.value)}`;
    }

    const { data, headers } = await axios.get(apiUrl);
    movieList.value = data;
    isLoading.value = false;
    const totalCount = headers["x-total-count"];
    totalPages.value = Math.ceil(totalCount / PAGE_SIZE.value);
  } catch (error) {
    console.error("Error fetching===>", error);
    failedLoading.value = true;
    isLoading.value = false;
  }
};

console.log(totalPages.value);
watch(currentPage, () => {
  loadMovies();
});

const onPageSizeChange = () => {
  // Whenever the page size changes, load the movies with the updated PAGE_SIZE
  loadMovies();
};

onMounted(async () => {
  try {
    const totalCount = (await axios.get(`${BASE_API_URL}/movies`)).headers[
      "x-total-count"
    ];
    totalPages.value = Math.ceil(totalCount / PAGE_SIZE.value);
    loadMovies();
  } catch (error) {
    console.error("Error fetching===>", error);
    failedLoading.value = true;
    isLoading.value = false;
  }
});
</script>

<style lang="scss" scoped>
.movie-card {
  margin-bottom: 20px;
}

.movie-poster {
  width: 100%;
  max-height: 250px;
}

.v-form {
  max-width: 600px;
  margin: 0 auto;
}

.v-form {
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.v-text-field {
  width: 100%;
  margin-bottom: 20px;
}

.v-select {
  width: 100%;
  margin-bottom: 20px;
}

.v-btn {
  min-width: 100px;
}

.v-btn + .v-btn {
  margin-left: 10px;
}

.v-form > *:last-child {
  margin-bottom: 0;
}

.v-dialog {
  max-width: 600px;
}

.v-dialog .v-card-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 16px;
}

.v-dialog .v-text-field {
  width: 100%;
  margin-bottom: 16px;
}

.v-dialog .v-card-actions {
  justify-content: flex-end;
}

.loading-message {
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  margin-top: 20px;
}

.card {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
  padding: 20px;
}

.movie-card {
  margin-bottom: 20px;
}

.movie-poster {
  width: 100%;
  max-height: 250px;
}
</style>
