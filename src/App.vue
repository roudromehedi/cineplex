<template>
  <div>
    <v-app app>
      <v-app-bar app>
        <v-app-bar-nav-icon
          v-if="!appDrawer"
          @click="openAppDrawer()"
          class="d-flex d-sm-none"
        >
          <v-icon> mdi-menu </v-icon></v-app-bar-nav-icon
        ><v-app-bar-nav-icon
          v-else
          @click="openAppDrawer()"
          class="d-flex d-sm-none"
        >
          <v-icon> mdi-close </v-icon></v-app-bar-nav-icon
        >
        <div class="ms-10 mt-10">
          <v-img
            :width="150"
            src="https://www.kinowerbung.de/media/63/10/94/1647336202/Cinedom_Logo_FixHeight-120px_unicolor.png"
          ></v-img>
        </div>

        <v-spacer></v-spacer>

        <v-btn icon>
          <v-icon color="white">mdi-magnify</v-icon>
        </v-btn>

        <v-btn icon color="white">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>

        <template v-slot:extension>
          <div class="ml-auto mr-auto">
            <v-tabs v-model="tab" class="d-none d-sm-flex">
              <v-tabs-slider color="yellow"></v-tabs-slider>

              <v-tab
                class="text-white"
                v-for="item in items"
                :key="item"
                :to="item.to"
              >
                {{ item.text }}
              </v-tab>
            </v-tabs>
          </div>
        </template>
      </v-app-bar>

      <v-navigation-drawer v-model="appDrawer" absolute temporary>
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

      <v-main
        class="purple-darken-4 backgroundColor"
        color="purple-darken-4"
        background-color="black"
      >
        <v-container
          fluid
          class="background-color px-0 py-0"
          color="primary"
          background-color="black"
        >
          <router-view />
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const appDrawer = ref(false);
let tab = ref(null);

const items = [
  { text: "Home", to: "/" },
  { text: "About", to: "/about" },
  { text: "Movies", to: "/movies" },

  { text: "Dashboard", to: "/dashboard" },
];

function navigateTo(to) {
  router.push(to);
}
function openAppDrawer() {
  appDrawer.value = !appDrawer.value;
  console.log(appDrawer.value);
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
.backgroundColor {
  background-color: #001232;
}
.navBackgroundColor {
  background-color: #0a1e5e;
}
.v-toolbar {
  background-color: #0a1e5e !important;
}
</style>
