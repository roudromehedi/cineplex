<template>
  <v-app>
    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>{{ pageTitle }}</v-toolbar-title>
      <v-spacer></v-spacer>

      <!-- Add Vuetify navigation links here -->
      <v-btn text="Home" to="/" />
      <v-btn text="About" to="/about" />
      <v-btn text="Movies" to="/movies" />
      <v-btn text="Bookings" to="/bookings" />
      <v-btn text="Add Movie" to="/add-movie" />
      <v-btn text="Dashboard" to="/dashboard" />
    </v-app-bar>

    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
const pageTitle = "Live Cinema";
</script>
