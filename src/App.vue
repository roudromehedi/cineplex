<template>
  <div>
    <v-app app>
      <v-app-bar app>
        <v-app-bar-nav-icon
          @click="drawer = true"
          class="d-flex d-sm-none"
        ></v-app-bar-nav-icon>
        <v-toolbar-title>CINEPLEX</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>

        <template v-slot:extension>
          <v-tabs v-model="tab" align-with-title class="d-none d-sm-flex">
            <v-tabs-slider color="yellow"></v-tabs-slider>

            <v-tab v-for="item in items" :key="item" :to="item.to">
              {{ item.text }}
            </v-tab>
          </v-tabs>
        </template>
      </v-app-bar>

      <v-navigation-drawer v-model="drawer" absolute temporary>
        <v-list nav dense>
          <v-list-item-group>
            <v-list-item
              v-for="(item, index) in items"
              :key="index"
              :to="item.to"
              active-class="item-active"
            >
              <v-list-item-content>
                <v-list-item-title @click="navigateTo(item.to)">
                  {{ item.text }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>

      <v-main>
        <v-container>
          <router-view />
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const drawer = ref(false);
const router = useRouter();

let tab = ref(null);

const items = [
  { text: "Home", to: "/" },
  { text: "About", to: "/about" },
  { text: "Movies", to: "/movies" },
  { text: "Bookings", to: "/bookings" },
  { text: "Dashboard", to: "/dashboard" },
];

function navigateTo(to) {
  router.push(to);
}
</script>

<style>
/* Set the width of mini-variant navigation drawer */
.v-navigation-drawer--mini .v-list-item-icon {
  margin-right: 0;
}

/* Style the active (selected) item */
.item-active {
  background-color: rgba(
    0,
    0,
    0,
    0.1
  ); /* Add a background color for active items */
}
</style>
