// movieStore.js

import { defineStore } from "pinia";
import axios from "axios";
import { BASE_API_URL } from "../api/api.js";

export const useMovieStore = defineStore("movies", {
  state: () => ({
    movies: [],
    isLoading: false,
    query: "",
    singleMovie: {},
    year: 2000,
    totalPages: 0,
    failedLoading: false,
  }),
  getters: {
    totalMovies() {
      return this.filterMovies.length;
    },
    filterMovies() {
      return this.movies.filter((movie) => {
        return movie.year >= this.year;
      });
    },
  },
  actions: {
    async getMovies(page, pageSize) {
      try {
        this.isLoading = true;
        const { data, headers } = await axios.get(
          `${BASE_API_URL}/movies?_page=${page}&_limit=${pageSize}`
        );
        this.movies = data;
        const totalCount = headers["x-total-count"];
        this.totalPages = Math.ceil(totalCount / pageSize);
      } catch (error) {
        console.error("Error fetching movies===>", error);
        this.failedLoading = true;
      } finally {
        this.isLoading = false;
      }
    },
    // movieStore.js

    async setCurrentPage(page) {
      this.currentPage = page;
      await this.getMovies(); // Load movies for the new page
    },
  },
});
