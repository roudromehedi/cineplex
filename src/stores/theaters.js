// movieStore.js

import { defineStore } from "pinia";
import axios from "axios";
import { BASE_API_URL } from "../api/api.js";

export const useTheatreStore = defineStore("theaters", {
  state: () => ({
    theaters: [],
    isLoading: false,
    failedLoading: false,
  }),
  getters: {},
  actions: {
    async getTheaters() {
      try {
        this.isLoading = true;
        const data = await axios.get(`${BASE_API_URL}/theaters`);
        this.theaters = data.data;
        console.log("Theatre", this.theaters);
      } catch (error) {
        console.error("Error fetching theaters===>", error);
        this.failedLoading = true;
      } finally {
        this.isLoading = false;
      }
    },
  },
});
