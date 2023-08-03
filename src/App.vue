<template>
  <div>
    <v-app app>
      <div class="container position-sticky z-index-sticky top-0">
        <div class="row">
          <div class="col-12">
            <!-- Navbar -->
            <nav
              class="navbar navbar-expand-lg blur border-radius-lg top-0 z-index-3 shadow position-absolute mt-4 py-2 start-0 end-0 mx-4"
            >
              <div class="container-fluid ps-2 pe-0">
                <a
                  class="navbar-brand font-weight-bolder ms-lg-0 ms-3"
                  href="../../../pages/dashboards/default.html"
                >
                  CINEPLEX
                </a>
                <button
                  class="navbar-toggler shadow-none ms-2"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navigation"
                  aria-controls="navigation"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span class="navbar-toggler-icon mt-2">
                    <span class="navbar-toggler-bar bar1"></span>
                    <span class="navbar-toggler-bar bar2"></span>
                    <span class="navbar-toggler-bar bar3"></span>
                  </span>
                </button>
                <div
                  class="collapse navbar-collapse w-100 pt-3 pb-2 py-lg-0"
                  id="navigation"
                >
                  <ul class="navbar-nav navbar-nav-hover mx-auto">
                    <li
                      class="nav-item dropdown mx-2 cursor-pointer"
                      v-for="item in items"
                      :key="item"
                      @click="navigateTo(item.to)"
                    >
                      {{ item.text }}
                    </li>
                  </ul>
                  <ul class="navbar-nav d-lg-block d-none">
                    <li class="nav-item">
                      <a
                        href="https://www.creative-tim.com/product/argon-dashboard-pro"
                        class="btn btn-sm btn-white mb-0 me-1"
                        onclick="smoothToPricing('pricing-argon')"
                        >Buy Now</a
                      >
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
            <!-- End Navbar -->
          </div>
        </div>
      </div>

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
import { useRouter } from "vue-router";

const router = useRouter();

const items = [
  { text: "Home", to: "/" },
  { text: "About", to: "/about" },
  { text: "Movies", to: "/movies" },
  { text: "Bookings", to: "/bookings" },
  { text: "Admin Dashboard", to: "/admin-dashboard" },
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
