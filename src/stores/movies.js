// movieStore.js

import { defineStore } from "pinia";
import axios from "axios";
import { BASE_API_URL } from "../api/api.js";

export const useMovieStore = defineStore("movies", {
  state: () => ({
    movies: [],
    movie: {},
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

    async getSingleMovie(id) {
      try {
        const response = await axios.get(
          `${BASE_API_URL}/movies/${parseInt(id)}`
        );
        this.movie = response.data;
        this.isLoading = false;
      } catch (error) {
        console.error("Error Fetching", error);
        this.isLoading = false;
      }
    },
  },
});
